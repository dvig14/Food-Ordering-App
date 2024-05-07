const {Otp} = require('../db/authDb')
const twilio = require('twilio')

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN

const twilioClient = new twilio(accountSid,authToken)   

const otpGeneration = async(res,phoneNumber) => {

    const otp = Math.floor(100000 + Math.random() * 900000)
    const newPhnNum = `+91${phoneNumber}`
    
    const phnNumExist = await Otp.findOne({phoneNumber})
    if(phnNumExist){
        const id = phnNumExist._id
        await Otp.findByIdAndUpdate(id,{otp},{new:true})
        res.json({
            msg:'otp updated'
        })
    }
    else{
        await Otp.create({
          otp,
          phoneNumber
       })
       res.json({
         msg:'otp generated'
       })
    }
  /* await twilioClient.messages.create({
        body : `Your OTP is: ${otp} from Yummy`,
        to : newPhnNum,
        from : process.env.TWILIO_PHONE_NUMBER
    })*/
}

module.exports = otpGeneration
