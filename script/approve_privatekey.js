/**
 * interact with approve functionality of BikeToken contract by creating raw transaction
 * and then sign with private key
 * and finally using web3 for sending
 */

var bikeTokenContractAddress = require('./address');
var BikeTokenABI = require('./../build/contracts/BikeToken.json').abi;
var BikeTokenContract = web3.eth.contract(BikeTokenABI);

var Tx = require('ethereumjs-tx');
const abi = require('ethereumjs-abi');
module.exports = function (deployer) {

    var from = '0x75F33b9774BDFE14B56c9f48e48d1F85CFe30739'
    var privateKey = new Buffer('cfb6cc81712b257dc69096310fd29900753822e0ca011a480c36d82ce17f3c09', 'hex')

    let encoded = abi.simpleEncode("approve(address,uint256)", web3.eth.accounts[3], 100000000);
    var buffer = '0x' + encoded.toString('hex');
    var rawTx = {
        nonce: web3.eth.getTransactionCount(from),
        gasPrice: '0x09184e72a000',
        gasLimit: '0x20000',
        to: bikeTokenContractAddress,
        value: '0x00',
        data: buffer
    }

    var tx = new Tx(rawTx);
    tx.sign(privateKey);

    var serializedTx = tx.serialize();

    web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function (err, hash) {
        if (!err)
            console.log(hash);
    });
}



