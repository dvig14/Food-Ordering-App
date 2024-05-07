const {Otp} = require('../db/authDb')
const nodemailer = require('nodemailer');
/*const twilio = require('twilio')

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN

const twilioClient = new twilio(accountSid,authToken)  */ 

const otpGeneration = async(res,email) => {

    const otp = Math.floor(100000 + Math.random() * 900000)
   // const newPhnNum = `+91${phoneNumber}`
    
    const emailExist = await Otp.findOne({email})
    if(emailExist){
        const id = emailExist._id
        await Otp.findByIdAndUpdate(id,{otp},{new:true})
        res.json({
            msg:'otp updated'
        })
    }
    else{
        await Otp.create({
          otp,
          email
       })
       res.json({
         msg:'otp generated'
       })
    }
     const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.MY_EMAIL,
          pass: process.env.EMAIL_PASS
         }
    })
     const mailOptions = {
        from: process.env.MY_EMAIL,
        to: email,
        subject: 'Otp from yummy.com',
        text:`This is your Otp:${otp}. Don't share with anyone.`
      }  
    try { 
        const info = await transporter.sendMail(mailOptions); 
        res.json({ msg: `Email sent: ${info.response}` });
    } 
    catch (error) { 
        console.error('Error sending email:', error); 
        res.json({ msg: 'Error sending email' });
    }
   /*await twilioClient.messages.create({
        body : `Your OTP is: ${otp} from Yummy`,
        to : newPhnNum,
        from : process.env.TWILIO_PHONE_NUMBER
    })*/
}

module.exports = otpGeneration
