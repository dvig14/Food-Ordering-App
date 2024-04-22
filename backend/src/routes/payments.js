const {Router} = require('express')
const router = Router()
const {Payment,Verification} = require('../controllers/payments')

router.post('/payments',Payment)
router.post('/paymentSuccess',Verification)

module.exports = router