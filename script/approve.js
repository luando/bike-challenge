/**
 * interact with approve functionality of BikeToken contract by using contract abi and ganache accounts
 */
var bikeTokenContractAddress = require('./address');
var BikeTokenABI = require('./../build/contracts/BikeToken.json').abi;
var BikeTokenContract = web3.eth.contract(BikeTokenABI);

module.exports = function (deployer) {
    BikeTokenContract.at(bikeTokenContractAddress).approve(web3.eth.accounts[1], 100000000, {from: web3.eth.accounts[0]}, (err, res) => {
        console.log(err)
        console.log(res)
    })
}