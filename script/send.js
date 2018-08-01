

var bikeTokenContractAddress = require('./address');

module.exports = function (deployer) {
    web3.eth.sendTransaction({ value: web3.toWei("1", "ether"), from: web3.eth.accounts[0], to: bikeTokenContractAddress}, (err, res) =>{
        console.log(err)
        console.log(res)
    })
}