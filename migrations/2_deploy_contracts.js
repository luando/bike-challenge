var BikeToken = artifacts.require("./BikeToken.sol");
var Bike = artifacts.require('./Bike.sol');

module.exports = function (deployer) {
    return deployer.deploy(BikeToken).then((token) => {
        return deployer.deploy(Bike, token.address);
    })

};
