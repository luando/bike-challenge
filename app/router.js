var express = require('express');
var router = express.Router();
var controller = require('./controller');

/**
 * GET API
 */
router.get('/api/getAllotedTime', (req,res) => {
    // res.send('get api')
    controller.getAllotedTime(req,res);
});
router.get('/api/getCredit', (req,res) => {
    // res.send('get api')
    controller.getCreditFromSmartContract(req,res);
});
router.get('/api/getUpTime', (req,res) => {
    // res.send('get api')
    controller.getUpTimeFromSmartContract(req,res);
});
router.get('/api/getBikeStatus/', (req,res) => {
    // res.send('get api')
    controller.getBikeStatus(req,res);
});

router.get('/api/getRentingTime/', (req,res) => {
    // res.send('get api')
    controller.getRentingTime(req,res);
});

module.exports = router;