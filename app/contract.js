var BikeABI = require('./../build/contracts/Bike.json').abi;
var BikeInstance = global.web3.eth.contract(BikeABI);
var BikeContractAddress = '0xb0701caef64aba4cd3f88b36728ffd6e14630efc';

var BikeTokenABI = require('./../build/contracts/BikeToken.json').abi;
var BikeTokenInstance = global.web3.eth.contract(BikeTokenABI);
var BikeTokenContractAddress = '0xa1b3a85add279238737dcf8cb4de75c643a57b88';

module.exports = {
    bikeContract: BikeInstance,
    bikeContractAddress: BikeContractAddress,
    bikeTokenContract: BikeTokenInstance,
    bikeTokenContractAddress: BikeTokenContractAddress
}



