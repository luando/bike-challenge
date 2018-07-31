pragma solidity ^0.4.18;

import "./library/StandardToken.sol";

contract BikeToken is StandardToken {

    uint8 public constant decimals = 6;
    uint256 public totalSupply = 0;
    uint256 public constant rate = 31415900000; // 1 ether = 31415.9 tokens  = 31415.9*(10**6)= 314159*(10**5)

    address public wallet = 0xCcCDf785Ee72830ebbf6a033f89862Bf43fffE2E;

    event LogExchange(address indexed _sender, uint256 _ETHAmount, uint256 _tokenAmount);

    // constructor
    constructor (

    ) {

    }
    
    /**
    @notice receive ether and exchange to tokens
    */
    function() payable public {

        // check validation
        require (msg.value > 0);

        // calculate token amount base on received ether amount 
        // 1 ether = 10**18 wei / (10**5) = 10**13
        uint256 amount = msg.value.mul(rate).div(10**18);

        // transfer ether to wallet for safe
        wallet.transfer(msg.value);

        // add tokens
        balances[msg.sender] = balances[msg.sender].add(amount);

        // increase total supply
        totalSupply = totalSupply.add(amount);

        // send Event
        emit LogExchange(msg.sender, msg.value, amount);
    }
    
}
