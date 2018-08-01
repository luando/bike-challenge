var BikeABI = require('./../build/contracts/Bike.json').abi;
var BikeInstance = global.web3.eth.contract(BikeABI);
var BikeContractAddress = '0xb0701caef64aba4cd3f88b36728ffd6e14630efc';

module.exports = {
    bikeContract: BikeInstance,
    bikeContractAddress: BikeContractAddress
}



