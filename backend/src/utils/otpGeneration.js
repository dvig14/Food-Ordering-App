const { Otp } = require('../db/authDb');
const nodemailer = require('nodemailer');

const otpGeneration = async (res, email) => {
  try {
   
    const otp = Math.floor(100000 + Math.random() * 900000);
    const emailExist = await Otp.findOne({ email });

    if (emailExist) {
      const id = emailExist._id;
      await Otp.findByIdAndUpdate(id, { otp }, { new: true });
      res.json({
        msg: 'otp updated'
      });
    } else {
      await Otp.create({
        otp,
        email
      });
      res.json({
        msg: 'otp generated'
      });
    }

    const transporter = nodemailer.createTransport({
      port: 465,
      host: "smtp.gmail.com",
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.EMAIL_PASS
      },
      secure: true,
    });

    await transporter.verify(); // Verify connection configuration

    const message = {
      from: process.env.MY_EMAIL,
      to: email,
      subject: 'Otp from yummy.com',
      text: `This is your Otp: ${otp}. Don't share with anyone.`
    };

    await transporter.sendMail(message);
    console.log("OTP has been sent to your Email");

  } catch (error) {
    console.error('Error sending email:', error);
    res.json({ msg: 'Error sending email' });
  }
}

module.exports = otpGeneration;
