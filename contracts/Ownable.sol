pragma solidity ^0.4.18;

contract Ownable {
  address public owner;

  constructor () {
    owner = msg.sender;
  }

  modifier onlyOwner() {
    if (msg.sender != owner) {
      revert();
    }
    _;
  }
}