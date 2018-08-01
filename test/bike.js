const Bike = artifacts.require('./Bike.sol');
const BikeToken = artifacts.require('./BikeToken.sol');
const assertJump = require("./helpers/assertJump");

contract('Bike', function (accounts) {
    let bikeInstance;
    let BikeTokenInstance;

    beforeEach(async () => {
        return BikeToken.deployed().then((instance) => {
            BikeTokenInstance = instance;
        })
      });

    it("allotedTime should be correct", () => {
        return Bike.deployed().then((instance) => {
            return instance.allotedTime.call();
        }).then((allotedTime) => {
            assert.equal(allotedTime.valueOf(), 86400, "allotedTime should be correct");
        });
    })

    it("upTime should be correct", () => {
        return Bike.deployed().then((instance) => {
            return instance.upTime.call();
        }).then((upTime) => {
            assert.equal(upTime.valueOf(), 3, "upTime should be correct");
        });
    })

    it("credit should be correct", () => {
        return Bike.deployed().then((instance) => {
            return instance.credit.call();
        }).then((credit) => {
            assert.equal(credit.valueOf(), 100000000, "credit should be correct");
        });
    })

    it("bikeToken should be correct", () => {
        return Bike.deployed().then((instance) => {
            return instance.BikeToken.call();
        }).then((bikeToken) => {
            assert.equal(bikeToken, BikeTokenInstance.address, "bikeToken should be correct");
        });
    })

});
