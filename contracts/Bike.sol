pragma solidity ^0.4.18;

import "./Ownable.sol";
import "./library/StandardToken.sol";
import "./library/SafeMath.sol";

contract Bike is Ownable {
    using SafeMath for uint256;

    // using this state variable for store all bikes (consist of bike ID and time to purchase) which a user are renting.
    mapping (address => mapping ( uint256 => Info)) public rentors;

    // list of bikes are using for rent. This variable is used for query available bikes and also for checking offline when burn tokens
    mapping(uint256 => address) public bikeList;

    //alloted time (default is 24h = 86400 seconds)
    uint256 public allotedTime = 86400 seconds; 
    uint256 public upTime = 3; // user must put up 3 time of credits
    uint256 public credit = 100000000;// 100 token for 1 credit
    uint256 public expiredTime = 86400 seconds; // if user does not return his bike, his deposit is slashing

    address public slashingTokenAddress = 0x00;
    //token address
    StandardToken public BikeToken;
    
    struct Info{
        uint256 rentingTime;
        uint256 deposit;
    }

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
        Info memory rent = rentors[msg.sender][_bikeID];
        require(rent.rentingTime + allotedTime > now, "should not allow to withdraw after expire");
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
    @notice check sender is owner of bike
    @param _bikeID amount of token deposit
    */
    modifier onlyBikeOwner(uint256 _bikeID){
        require(bikeList[_bikeID] == msg.sender, "you are not owner");
        _;
    }

    /**
    @notice user should firstly call approve for this contract using his credits
    @param _bikeID ID of bike which the user want to rent
    @param _deposit number of credits which the user want to deposit
    */
    function rentBike(uint256 _bikeID, uint256 _deposit) 
        onlyValidDeposit(_deposit)
        onlyAvailable(_bikeID)
        external{
        // transfer token from user to this contract
        require(BikeToken.transferFrom(msg.sender, address(this), _deposit));

        //update renting history 
        rentors[msg.sender][_bikeID] = Info(now, _deposit);
        

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
        
        Info memory rent = rentors[msg.sender][_bikeID];    
        uint256 amount = rent.deposit;
        //update renting history 
        rentors[msg.sender][_bikeID] = Info(0,0);

        //update bike status
        bikeList[_bikeID] = address(0x0);

        // transfer tokens to user
        require(BikeToken.transfer(msg.sender, amount), "can not return tokens to sender");
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
    @notice change expired time
    @param _value change to new value
    */
    function setExpiredTime(uint256 _value)
        onlyOwner 
        external{
        require(_value > 0, "should be greater than 0");
        expiredTime = _value;
    }

    /**
    @notice change slashing address
    @param _add change to new value
    */
    function setSlashingAddress(address _add)
        onlyOwner 
        external{
        require(_add != address(0x0), "should not be 0x0");
        slashingTokenAddress = _add;
    }

    /**
    @notice reset bike status in case user do not withdraw token in order to allow next renting. 
            In the meanwhile, burn tokens by sending to address 0x0000000000000000000000000000000000000000
    @param _bikeID bike ID
    @param _address address of user who do not withdraw or can not withdraw due to expired time
    */
    function burnExpiredToken(uint256 _bikeID, address _address) 
        onlyOwner 
        external{
        Info memory rent = rentors[msg.sender][_bikeID];
        uint256  amount = rent.deposit;
        require(rent.rentingTime + allotedTime < now, "should not allow to burn before expired");
        //reset bikes list status and reset rentors status
        bikeList[_bikeID] = address(0x0);
        rentors[_address][_bikeID] = Info(0,0);
        require(BikeToken.transfer(address(0x0), amount), "can not burn tokens");
    }

    /**
    @notice get renting time
    @param _bikeID bike ID
    */
    function getRentingTime(address _add, uint256 _bikeID)
        view 
        public
        returns(uint256){
        Info memory rent = rentors[_add][_bikeID];
        return rent.rentingTime;
    }


    /**
    @notice get deposit
    @param _bikeID bike ID
    */
    function getDeposit(address _add, uint256 _bikeID)
        view 
        public
        returns(uint256){
        Info memory rent = rentors[_add][_bikeID];
        return rent.deposit;
    }

    /**
    @notice cut off tokens if user does not return bike at right time
    @param _bikeID bike ID
    @param _address address of user who do not return his bike after expired time
    */
    function slashing(uint256 _bikeID, address _address) 
        onlyOwner 
        external{
        Info memory rent = rentors[msg.sender][_bikeID];
        uint256  amount = rent.deposit;
        
        require(bikeList[_bikeID] == _address, "this user did not rent the bike"); // check owner ship
        require(rent.deposit > 0 && rent.rentingTime > 0, "should not empty"); // check valid info
        require(rent.rentingTime + allotedTime + expiredTime < now, "should not allow to slash tokens before expired"); //check expiration
        
        //reset bikes list status and reset rentors status
        bikeList[_bikeID] = address(0x0);
        rentors[_address][_bikeID] = Info(0,0);
        require(BikeToken.transfer(slashingTokenAddress, amount), "can not slash tokens");
    }

    /**
    @notice transfer bike
    @param _bikeID bike ID
    @param _address allow this user to own the bike
    */
    function transferBike(uint256 _bikeID, address _address) 
        onlyBikeOwner(_bikeID)
        external{
        Info memory rent = rentors[msg.sender][_bikeID];
        
        require(rent.deposit > 0 && rent.rentingTime > 0, "should not be 0");
        require(rent.rentingTime + allotedTime > now, "should not allow to transfer ownership because of expiration");
        
        //reset bikes list status and reset rentors status
        rentors[msg.sender][_bikeID] = Info(0,0);

        // transfer ownership
        bikeList[_bikeID] = _address;
        rentors[_address][_bikeID] = rent;
    }

}
