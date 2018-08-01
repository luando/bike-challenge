const assertJump = require("./helpers/assertJump");
const BikeToken = artifacts.require('./BikeToken.sol');

contract('BikeToken', function (accounts) {
    it("rate should be correct", () => {
        return BikeToken.deployed().then((instance) => {
            return instance.rate.call();
        }).then((rate) => {
            assert.equal(rate.valueOf(), 31415900000, "rate should be correct");
        });
    })

    it("send 1 ether and receive correct token", () => {
        var ins;
        return BikeToken.deployed().then(async (instance) => {
            ins = instance;
            await web3.eth.sendTransaction({ value: web3.toWei("1", "ether"), from: accounts[0], to: instance.address, gas: 200000 });
        }).then(() => {
            return ins.balanceOf.call(accounts[0])
                .then((balance) => {
                    console.log('current balance: ', balance.valueOf())
                    assert.equal(balance.valueOf(), 31415900000, "should receive correct token amount for 1 ether");
                });
        });
    })

    it("send 1 ether to contract and then it's transfered to wallet", async () => {
        var ins;
        let wallet;
        let balanceBefore;
        let balanceAfter;
        return BikeToken.deployed().then(async (instance) => {
            ins = instance;
            wallet = await instance.wallet.call();
            balanceBefore = await web3.eth.getBalance(wallet);
            await web3.eth.sendTransaction({ value: web3.toWei("1", "ether"), from: accounts[0], to: instance.address, gas: 200000 });
        }).then(async () => {
            balanceAfter = await web3.eth.getBalance(wallet);
            assert.equal(balanceAfter.valueOf() - balanceBefore.valueOf(), web3.toWei("1", "ether"), "should increase for 1 ether");
        });
    })

    it("send 0 ether and transaction is failed", () => {
        var ins;
        return BikeToken.deployed().then(async (instance) => {
            ins = instance;
            try {
                web3.eth.sendTransaction({ value: web3.toWei("0", "ether"), from: accounts[0], to: instance.address, gas: 200000 });
            } catch (error) {
                return assertJump(error);
            }
        });
    })
})
