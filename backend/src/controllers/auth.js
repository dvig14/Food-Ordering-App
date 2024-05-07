const jwt = require('jsonwebtoken')
const z = require('zod')
const {User,Otp} = require('../db/authDb')
const otpGeneration = require('../utils/otpGeneration')
const nodemailer = require('nodemailer');

const signUpSchema = z.object({
    phoneNumber : z.string(),
    name : z.string(),
    email : z.string(),
    verified:z.boolean()
})

const otpSchema = z.object({
    otp : z.number(),
    email : z.string()
})

const Register= async(req,res) => {
    
    const {phoneNumber,name,email,verified} = req.body
    const {success} = signUpSchema.safeParse(req.body)
   
    if(!success){
        return res.json({
            msg : 'Input not valid'
        })
    }
    try{
        
        const phnExist = await User.findOne({phoneNumber}) 
        const emailExist = await User.findOne({email})
        
        if(phnExist) return res.json({msg : 'Mobile number already exist'})
        else if(emailExist) return res.json({msg : 'Email id already exist'})
        else if(verified){
            const user = await User.create({
                phoneNumber,
                name,
                email
            })
            
            const id = user._id
            const accessToken = jwt.sign({id},process.env.ACCESS_TOKEN_SCERET)
            res.json({ 
                msg : 'User created successfully', 
                user,
                accessToken
            })

        }
        else otpGeneration(res,email)

    }
    catch(err){
        res.json({msg:err})
    }
}

const OtpVerification = async(req,res) => {
       
    const {otp,email} = req.body
    const {success} = otpSchema.safeParse(req.body)

    if(!success) return res.json({msg:'not valid'})
    try{
        const verifiedOtp = await Otp.findOne({
            otp,
           email
        })
        if(verifiedOtp) res.json({msg:'verified'})
        else res.json({msg:'Invalid Otp Please Try Again'})
    }
    catch(err){
        res.json({msg:err})
    }

}

const Login = async(req,res) => {

    const {email,verified} = req.body

    try{
        const user = await User.findOne({email})
        if(user && !verified) otpGeneration(res,email)
        else if(verified){
            const {_id} = user
            const accessToken = jwt.sign({_id},process.env.ACCESS_TOKEN_SCERET)
            res.json({  
                user,
                accessToken
            })
        }
        else res.json({msg:'create an account'})
    }
    catch(err){
        res.json({msg:err})
    }

}

const UpdateProfile = async(req,res) => {
    const id = req.params.id
    const {index,phoneNumber,email,verified} = req.body
    try{
        if(index === 0){
            const phnExist = await User.findOne({phoneNumber}) 
            if(phnExist) return res.json({msg : 'Number use by other user'})
            else if(verified){
             const updateProfile = await User.findByIdAndUpdate(id,{phoneNumber},{new:true}) 
             res.json({updateProfile})
            }
            else otpGeneration(res,phoneNumber)
        }
        else if(index === 1){
            const emailExist = await User.findOne({email})
            if(emailExist) return res.json({msg : 'Email id already exist'})
            else if(verified){
                const updateProfile = await User.findByIdAndUpdate(id,{email},{new:true}) 
                res.json({updateProfile})
            }
            else{
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
                subject: 'Email verification from yummy.com',
                html:` <!DOCTYPE html>
                 <html>
                 <head>
                 <title></title>
                 <style>
                  body{
                    padding:2rem; 
                    display:flex;
                    flex-direction:column;
                    align-items:center;
                  }
                  h3 {color: orange;}
                   p  {color: gray;}
                   a{
                    color:orange;
                    text-decoration:none;
                   }
                   a.disabled {
                    pointer-events: none;
                    color: gray; 
                  }
                 </style>
                 </head>
                 <body>
                   <h3>Verify your email</h3>
                   <p>
                   Hope you are having a great time with yummy.To complete your email verifcation,
                   please press button below
                   </p>
                   <a href='https://food-ordering-app-frontend-nine.vercel.app/emailConfirmed/${id}/${email}'>Confirm email</a>
                 </body>
                 </html>` 
               }  
              transporter.sendMail(mailOptions, function(error, info){
                if (error) res.json({msg:'error'})
                else res.json({msg : `Email sent: ${info.response}`});
              })

            }     
        }
    }
    catch(e){
        res.json({msg:e})
    }
}

const GetUser = async(req,res) => {
     const id = req.params.id

    try{
       if(id){
         const userData = await User.findOne({_id:id})
         res.json({msg:'success',userData})
       }
       else res.json({msg:'not found'})
    }
   catch(e) {
    res.json({msg:e})
   }
}

module.exports = {Register,OtpVerification,Login,UpdateProfile,GetUser}
