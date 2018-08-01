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

    it("bikeToken address should be correct", () => {
        return Bike.deployed().then((instance) => {
            return instance.BikeToken.call();
        }).then((bikeToken) => {
            assert.equal(bikeToken, BikeTokenInstance.address, "bikeToken should be correct");
        });
    })

    it("it should be true for renting a bike", () => {
        return Bike.deployed().then((instance) => {
            bikeInstance = instance;
            return web3.eth.sendTransaction({ value: web3.toWei('1', 'ether'), to: BikeTokenInstance.address, from: accounts[0] });
        }).then((tx) => {
            return BikeTokenInstance.approve(bikeInstance.address, 300000000, { from: accounts[0] });
        }).then((tx) => {
            return bikeInstance.rentBike(1, 300000000, { from: accounts[0] });
        }).then((tx) => {
            return bikeInstance.bikeList.call(1);
        }).then((add) => {
            assert.equal(add, accounts[0], 'bike rentor address should be same as accounts[0]')
        })
    })

    it("it should be failed when user try to call rentBike without approval his tokens for bike contract", () => {
        return Bike.deployed().then((instance) => {
            bikeInstance = instance;
            return web3.eth.sendTransaction({ value: web3.toWei('1', 'ether'), to: BikeTokenInstance.address, from: accounts[0] });
        }).then(async (tx) => {
            try {
                await bikeInstance.rentBike(1, 300000000, { from: accounts[0] });
            }
            catch (error) {
                assertJump(error);
            }
        })

    })

    it("it should be failed when user try to call rentBike  with less than minimum deposit", () => {
        return Bike.deployed().then((instance) => {
            bikeInstance = instance;
            return web3.eth.sendTransaction({ value: web3.toWei('1', 'ether'), to: BikeTokenInstance.address, from: accounts[0] });
        }).then((tx) => {
            return BikeTokenInstance.approve(bikeInstance.address, 300000000, { from: accounts[0] });
        }).then(async (tx) => {
            try {
                await bikeInstance.rentBike(1, 200000000, { from: accounts[0] });
            }
            catch (error) {
                assertJump(error);
            }
        })
    })

    it("it should be failed for renting a bike when this bike is not available", () => {
        return Bike.deployed().then((instance) => {
            bikeInstance = instance;
            return web3.eth.sendTransaction({ value: web3.toWei('1', 'ether'), to: BikeTokenInstance.address, from: accounts[1] });
        }).then(() => {
            return BikeTokenInstance.approve(bikeInstance.address, 300000000, { from: accounts[1] });
        }).then(async () => {
            try {
                await  bikeInstance.rentBike(1, 300000000, { from: accounts[1] });
            }
            catch(error){
                assertJump(error);
            }
        })
    })

    it("it should be successful for withdraw token", () => {
        let before;
        let after;
        return Bike.deployed().then((instance) => {
            bikeInstance = instance;
            return BikeTokenInstance.balanceOf.call(accounts[0]);
        }).then((bef) => {
            before = bef.valueOf();
            return bikeInstance.withdrawToken(1, { from: accounts[0] });
        }).then( () => {
            return BikeTokenInstance.balanceOf.call(accounts[0]);
        }).then((aft) => {
            after = aft.valueOf();
            assert.equal(after - before, 300000000, "withdraw successfully token after return bike")
        })
    })

});
