var BikeABI = require('./../build/contracts/Bike.json').abi;
var BikeInstance = global.web3.eth.contract(BikeABI);
var BikeContractAddress = '0xc565c7c4590465fa7f6d8d33fc8e462a5f643c6e';

var BikeTokenABI = require('./../build/contracts/BikeToken.json').abi;
var BikeTokenInstance = global.web3.eth.contract(BikeTokenABI);
var BikeTokenContractAddress = '0xe20719de11ba477b03d88f0eddc26c5d264117d2';

module.exports = {
    bikeContract: BikeInstance,
    bikeContractAddress: BikeContractAddress,
    bikeTokenContract: BikeTokenInstance,
    bikeTokenContractAddress: BikeTokenContractAddress
}



