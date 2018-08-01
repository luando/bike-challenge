var express = require('express');
var router = express.Router();
var controller = require('./controller');

/**
 * GET API
 */
router.get('/api/getAllotedTime', (req,res) => {
    controller.getAllotedTime(req,res);
});
router.get('/api/getCredit', (req,res) => {
    controller.getCreditFromSmartContract(req,res);
});
router.get('/api/getUpTime', (req,res) => {
    controller.getUpTimeFromSmartContract(req,res);
});
router.get('/api/getBikeStatus/', (req,res) => {
    controller.getBikeStatus(req,res);
});

router.get('/api/getRentingTime/', (req,res) => {
    controller.getRentingTime(req,res);
});
router.get('/api/getTokenBalance/', (req,res) => {
    controller.getTokenBalance(req,res);
});
router.get('/api/getAllowance/', (req,res) => {
    controller.getAllowance(req,res);
});
router.get('/api/getTotalSupply', (req,res) => {
    controller.getTotalSupply(req,res);
});
router.get('/api/getRate', (req,res) => {
    controller.getRate(req,res);
});


module.exports = router;