pragma solidity ^0.4.18;

import "./Ownable.sol";
import "./library/StandardToken.sol";
import "./library/SafeMath.sol";


contract Bike is Ownable {
    using SafeMath for uint256;

    // using this state variable for store all bikes (consist of bike ID and time to purchase) which a user are renting.
    mapping (address => mapping ( uint256 => uint256)) public rentors;

    // list of bikes are using for rent. This variable is used for query available bikes and also for checking offline when burn tokens
    mapping(uint256 => address) public bikeList;

    //alloted time (default is 24h = 86400 seconds)
    uint256 public allotedTime = 86400 seconds; 
    uint256 public upTime = 3; // user must put up 3 time of credits
    uint256 public credit = 100000000;// 100 token for 1 credit
    //token address
    StandardToken public BikeToken;

    /**
    @notice constructor
    @param _token address of BikeToken
    */
    constructor(address _token){
        BikeToken = StandardToken(_token);
    }

    /**
    @notice check expired time for renting
    @param _bikeID ID of bike
    */
    modifier onlyValidTime(uint256 _bikeID){
        require(rentors[msg.sender][_bikeID] + allotedTime > now, "should not allow to withdraw after expire");
        _;
    }

        /**
    @notice check if Bike is available
    @param _bikeID ID of bike
    */
    modifier onlyAvailable(uint256 _bikeID){
        require(bikeList[_bikeID] == address(0x0), "this bike is not available now");
        _;
    }

    /**
    @notice check expired time for renting
    @param _deposit amount of token deposit
    */
    modifier onlyValidDeposit(uint256 _deposit){
        require(credit.mul(upTime) == _deposit, "not enough credits");
        _;
    }

    /**
    @notice user should firstly call approve for this contract using his credits
    @param _bikeID ID of bike which the user want to rent
    @param _deposit ID of bike which the user want to rent
    */
    function rentBike(uint256 _bikeID, uint256 _deposit) 
        onlyValidDeposit(_deposit)
        onlyAvailable(_bikeID)
        external{
        // transfer token from user to this contract
        require(BikeToken.transferFrom(msg.sender, address(this), _deposit));

        //update renting history 
        rentors[msg.sender][_bikeID] = now;

        //update bike status
        bikeList[_bikeID] = msg.sender;
    }

    /**
    @notice after user return bike, he call this function to withdraw deposit credits
    @param _bikeID ID of bike which the user want to rent
    */
    function withdrawToken(uint256 _bikeID) 
        onlyValidTime(_bikeID)
        external{
        
        //update renting history 
        rentors[msg.sender][_bikeID] = 0;

        //update bike status
        bikeList[_bikeID] = address(0x0);

        // transfer tokens to user
        require(BikeToken.transfer(msg.sender, credit.mul(upTime)), "can not return tokens to sender");
    }

    /** 
    @notice change alloted time for renting
    @param _value change to new value
    */
    function setAllotedTime(uint256 _value)
        onlyOwner
        external{
        require(_value > 0, "should be greater than 0");
        require(_value < now, "should not be greater than current moment");
        allotedTime = _value;
    }

    /**
    @notice change deposit value
    @param _value change to new value
    */
    function setDeposit(uint256 _value) 
        onlyOwner 
        external{
        require(_value > 0, "should be greater than 0");
        credit = _value;
    }

    /**
    @notice change up times value
    @param _value change to new value
    */
    function setUpTime(uint256 _value)
        onlyOwner 
        external{
        require(_value > 0, "should be greater than 0");
        upTime = _value;
    }

    /**
    @notice reset bike status in case user do not withdraw token in order to allow next renting. 
            In the meanwhile, burn tokens by sending to address 0x0000000000000000000000000000000000000000
    @param _bikeID bike ID
    */
    function burnExpiredToken(uint256 _bikeID, address _address) 
        onlyOwner 
        external{
        //reset bikes list status and reset rentors status
        bikeList[_bikeID] = address(0x0);
        rentors[_address][_bikeID] = 0;
        require(BikeToken.transfer(address(0x0), credit.mul(upTime)), "can not burn tokens");
    }

}
