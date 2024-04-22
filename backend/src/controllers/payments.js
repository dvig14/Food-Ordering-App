const Razorpay = require('razorpay')
const {RAZORPAY_KEY_ID,RAZORPAY_SECRET} = process.env
const crypto = require('crypto')

const razorpayInstance = new Razorpay({
    key_id : RAZORPAY_KEY_ID,
    key_secret : RAZORPAY_SECRET
})

const Payment = (req,res) => {

    const {contact,name,email,restName,amount} = req.body
    try{
        const options = {
            amount:amount*100,
            currency:'INR',
            receipt:email
        }
        razorpayInstance.orders.create(options,(err,order)=>{
            if(!err){
                res.json({
                    success:true,
                    msg:'Order created',
                    order_id:order.id,
                    amount:amount*100,
                    key_id: RAZORPAY_KEY_ID,
                    product_name:restName,
                    contact:'6239578359',
                    name,
                    email
                })
            }
            else{res.json({msg:err})}
        })
    }
    catch(err){
        res.json({msg:err})
    }
}

const Verification = async(req,res) => {

    const {razorpayPaymentId,razorpayOrderId,razorpaySignature} = req.body

    const expectedSignature = crypto
      .createHmac("sha256",RAZORPAY_SECRET)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest('hex')

    if(expectedSignature !== razorpaySignature) return res.json({msg:'Failed'})
    
    res.json({
        msg:'success',
        orderId:razorpayOrderId,
        paymentId:razorpayPaymentId
    })
}

module.exports = {Payment,Verification}