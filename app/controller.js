var bikeContract = require('./contract').bikeContract;
var bikeContractAddress = require('./contract').bikeContractAddress;

var Container = {
    /**
     * get allotedTime value in smartcontract
     * @func getAllotedTime
     */
    getAllotedTime: function (req, res) {
        bikeContract.at(bikeContractAddress).allotedTime({}, function (er, re) {
            if (er) {
                return res.send({
                    status: 'error',
                    error: 'can not get allotedTime'
                });
            }

            return res.send({
                status: 'success',
                data: re
            });
        });
    },

    /**
     * Get rate have been saved in smartcontract
     * @func getCreditFromSmartContract
     */
    getCreditFromSmartContract: function (req, res) {
        bikeContract.at(bikeContractAddress).credit({}, function (er, re) {
            if (er) {
                return res.send({
                    status: 'error',
                    error: 'can not get credit'
                });
            }

            return res.send({
                status: 'success',
                data: re
            });
        });
    },
    
    /**
     * Get upTime in smartcontract
     * @func getUpTimeFromSmartContract
     */
    getUpTimeFromSmartContract: function (req, res) {
        bikeContract.at(bikeContractAddress).upTime({}, function (er, re) {
            if (er) {
                return res.send({
                    status: 'error',
                    error: 'can not get upTime'
                });
            }

            return res.send({
                status: 'success',
                data: re
            });
        });
    },

    /**
     * Get status of a bike in smartcontract
     * @func getBikeStatus
     */
    getBikeStatus: function (req, res) {
        var id = req.query.id;
        bikeContract.at(bikeContractAddress).bikeList(id, {}, function (er, re) {
            if (er) {
                return res.send({
                    status: 'error',
                    error: 'can not get status of this bike'
                });
            }

            return res.send({
                status: 'success',
                data: re
            });
        });
    },

     /**
     * Get renting time of a user and bikeID in smartcontract
     * @func getRentingTime
     */
    getRentingTime: function (req, res) {
        var id = req.query.id;
        var address = req.query.address;
        bikeContract.at(bikeContractAddress).rentors(address, id, {}, function (er, re) {
            if (er) {
                return res.send({
                    status: 'error',
                    error: 'can not get time for this case'
                });
            }

            return res.send({
                status: 'success',
                data: re
            });
        });
    }
}

module.exports = Container;