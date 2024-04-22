import ItemsList from './ItemsList'
import {useDispatch,useSelector} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {host} from '../utils/constants'
import axios from 'axios'
import {useState,useContext} from 'react'
import useRazorpay from "react-razorpay";
import {clearCart} from '../utils/cartSlice'
import SuccessPg from './SuccessPg'
import Header from './Header'
import {RestNameContext} from '../utils/RestNameContext'

const Cart = () => {

    const cartItems = useSelector((store) => store.cart.items)
    const itemCount = useSelector((store) => store.cart.count)
    const [Razorpay] = useRazorpay();
    const dispatch = useDispatch()
    const [paySuccess,setPaySuccess] = useState({
      success : false,
      orderId : ''
    })
    const user = JSON.parse(localStorage.getItem('user'))
    const {setShowPg,setUser} = useContext(RestNameContext)
    const [showLoginPg,setShowLoginPg] = useState(false)
    const [tip,setTip] = useState('Add Tip')

    const itemTotal = itemCount.reduce((acc,curr)=>{   
      const {price,count} = curr
      return acc + (price/100 * count)
    },0)
    
    const Tip = tip === 'Add Tip' || tip === '' ? 0 : parseInt(tip)
    const ToPay =  ((itemTotal) + (itemTotal * Tip / 100)).toFixed(2)

    const enterTip = (e) => {
      if(tip === 'Add Tip') setTip('')
      else setTip(e.target.value)
    }
    
    const handleCheckout = () => {
      if(!user || user === undefined){
        setShowPg(true)
        setUser('Sign In')
        setShowLoginPg(true)
      }
      else{
        setShowLoginPg(false)
        handlePayment()
      }
    }

    const handlePayment = async() => {
      const res = await axios.post(`${host}cart/payments`,
        {contact:user.phoneNumber,name:user.name,email:user.email,restName:itemCount[0].restName,amount:ToPay}
      )
      if(res.data.success){
        const {key_id,amount,name,email,contact,order_id,product_name} = res.data
        const options = {
           "key":`${key_id}`,
           "amount":`${amount}`,
           "currency":`INR`,
           "name":`${product_name}`,
           "order_id":`${order_id}`,
           "handler": async function (response) {
             const data = {
                orderCreationId: order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
             };

              const res = await axios.post(`${host}cart/paymentSuccess`, data);
               if(res.data.msg === 'success') {
                 setPaySuccess({
                  success : true,
                  orderId : res.data.orderId
                 })
                 
                 dispatch(clearCart())
               }
            },
           "prefill":{
              "name":`${name}`,
              "contact":`${contact}`,
              "email":`${email}`,
           },
           "notes":{
             "address": "Razorpay Corporate Office",
           },
           "theme":{
              "color":"#FF9D00"
           }
        }
        const razorpayObject = new Razorpay(options)
        razorpayObject.on("payment.failed", function (response) {
          alert("payment failed");
        });
      
        razorpayObject.open();
      }
    }
      return(
        <>
        <div className='text-center mx-auto p-4 smallM:px-0 w-[100%] my-[3rem]'>
            {cartItems.length === 0 && !paySuccess.success ? 
              <div className='w-[100%] h-[50vh] mb-[3rem] flex flex-col gap-[1rem] mt-[6rem]'>
                <img src='https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0' 
                  alt='' className='w-[280px] h-[75%] mx-auto'/>
                <p className='flex flex-col text-gray-600'>
                 <span className='font-bold text-lg'>Your cart is empty</span>
                 <span className='text-gray-500'>You can go to home page to view more restaurants</span>
                </p>
                <button className='bg-[#fc8019] px-4 py-2 my-2 mx-auto font-semibold text-white uppercase'>
                 <NavLink to='/'>see restaurants near you</NavLink>
                </button>
              </div> 
               : 
               paySuccess.success ? <SuccessPg orderId={paySuccess.orderId}/>
               :
              <div className='flex flex-col bg-gray-100 p-4'>
              <div className='w-[400px] smallM:w-[100%] mx-auto relative my-[2rem]'>
              <p className='w-[100%] bg-white px-[2rem] py-[0.8rem] text-gray-800 font-medium text-left 
              border-b-2 border-gray-100'>
                {itemCount[0].restName}'s Order
              </p>

              <div className='overflow-y-scroll w-[100%] h-[300px] bg-white'>

                <ItemsList items={cartItems}/>

                <div className='w-[100%] bg-white font-medium text-left mt-[1rem] text-sm flex flex-col 
                  gap-[0.6rem] py-3 px-[1.5rem] relative'>
                  <span className='font-bold text-gray-800'>Bill Details</span>
                  <p className='text-gray-500 flex justify-between'>Item Total <span>Rs.{itemTotal.toFixed(2)}</span></p>
                  <p className='text-gray-500 flex justify-between'>Tip %
                    <input type='text' onChange={enterTip} value={tip} className='w-[58px] text-center outline-none 
                     text-orange-400'/>
                  </p>   
                </div>

              </div>

              <div className='bg-white w-[100%] flex justify-between border-t px-[1.5rem] py-[1rem] font-medium
              text-gray-800'>
                <span>TO PAY</span>
                <span>Rs.{ToPay}</span>
              </div>

              </div>
              <button className='bg-[#fc8019] px-4 py-2 mx-auto font-semibold text-white mb-[2rem] rounded'
                onClick={handleCheckout}
              >
                Checkout
              </button> 
             </div>
            }
        </div>
        {showLoginPg && <Header/>}
        </>
      )

}
export default Cart