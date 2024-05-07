const {Router} = require('express')
const router = Router()
const {Register,OtpVerification,Login,UpdateProfile,GetUser} = require('../controllers/auth')

router.post('/signUp',Register)
router.post('/otpVerify',OtpVerification)
router.post('/login',Login)
router.patch('/signUp/:id',UpdateProfile)
router.get('/getUser/:id',GetUser)

module.exports = router
