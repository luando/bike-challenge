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


/**
 * POST API
 */

// router.post('/create-token', protector.isAdmin, protector.isExistedToken, sponsee.createToken);
// router.post('/get-balance', sponsee.getBalance);
// router.post('/get-sponsee', sponsee.getSponsee);
// router.post('/get-total-supply', sponsee.getTotalSupply);
// router.post('/get-total-support', sponsee.getTotalSupport);
// router.post('/mint-token', protector.isOperator, sponsee.mintToken);
// router.post('/change-sponsee-address', protector.isOperator, sponsee.changeSponseeAddress);

// router.post('/admin/get-withdraw-value', dividend.getWithdrawValue);
// router.post('/admin/submit-tx', protector.isMasterOfMultiSigWallet, dividend.submitTransaction);
// router.post('/admin/confirm-tx', dividend.confirmTransaction);
// router.post('/admin/pause', protector.isMasterOfMultiSigWallet, dividend.pause);
// router.post('/admin/unpause', protector.isMasterOfMultiSigWallet, dividend.unpause);

module.exports = router;