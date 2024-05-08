const {Otp} = require('../db/authDb')
const nodemailer = require('nodemailer');

const otpGeneration = async(res,email) => {
  try { 
    let otp
    const emailExist = await Otp.findOne({email})
    
    if(emailExist){
        otp = Math.floor(100000 + Math.random() * 900000)
        const id = emailExist._id
        await Otp.findByIdAndUpdate(id,{otp},{new:true})
        res.json({
            msg:'otp updated'
        })
    }
    else{
       otp = Math.floor(100000 + Math.random() * 900000)
        await Otp.create({
          otp,
          email
       })
       res.json({
         msg:'otp generated'
       })
    }
    const transporter = nodemailer.createTransport({
        port: 465,
        host: "smtp.gmail.com",
        auth: {
          user: process.env.MY_EMAIL,
          pass: process.env.EMAIL_PASS
         },
        secure: true,
    })
    await new Promise((resolve, reject) => {
       // verify connection configuration
        transporter.verify(function (error, success) {
            if (error) {
                console.log(error);
                reject(error);
             } else {
                 console.log("OTP has been sent to your Email");
                 resolve(success);
             }
       });
    });
    const message = await transporter.sendMail({
        from: process.env.MY_EMAIL,
        to: email,
        subject: 'Otp from yummy.com',
        text:`This is your Otp:${otp}. Don't share with anyone.`
     })
      await new Promise((resolve, reject) => {
         transporter.sendMail(message, (err, info) => {
             if (err) {
                console.error(err);
                reject(err);
              } else {
                 resolve(info);
              }
        });
     });
    } 
    catch (error) { 
        console.error('Error sending email:', error); 
        res.json({ msg: 'Error sending email' });
    }
}

module.exports = otpGeneration
