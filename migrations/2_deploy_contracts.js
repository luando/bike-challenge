// var ConvertLib = artifacts.require("./ConvertLib.sol");
// var MetaCoin = artifacts.require("./MetaCoin.sol");
var BikeToken = artifacts.require("./BikeToken.sol");
var Bike = artifacts.require('./Bike.sol');

module.exports = function (deployer) {
    //   deployer.deploy(ConvertLib);
    //   deployer.link(ConvertLib, MetaCoin);
    //   deployer.deploy(MetaCoin);
    return deployer.deploy(BikeToken).then((token) => {
        return deployer.deploy(Bike, token.address);
    })

};
