const {Router} = require('express')
const router = Router()
const {Register,OtpVerification,Login,UpdateProfile} = require('../controllers/auth')

router.post('/signUp',Register)
router.post('/otpVerify',OtpVerification)
router.post('/login',Login)
router.patch('/signUp/:id',UpdateProfile)

module.exports = router