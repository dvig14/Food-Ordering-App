import login from '../images/login.avif'
import {useEffect,useRef,useState} from 'react'
import {host} from '../utils/constants'
import axios from 'axios'

const SignIn = ({show,setExistMsg,setShowPg,isSignUp,setIsSignUp,setUser}) => {

    const input = useRef()
    const placeholder = useRef()
    const [registerNum,setRegisterNum] = useState(false)
    const [otp,setOtp] = useState('')
    const [inputData,setInputData] = useState({
      phoneNumber:'',
      name:'',
      email:'',
    })
   
    useEffect(()=>{
      input.current.focus()
      setInputData({
        phoneNumber:'',
        name:'',
        email:'',
      })
      setRegisterNum(false)
    },[show,isSignUp])

    const showSignUp = () => setIsSignUp(!isSignUp)
    
    const handelError = () => {
       
      const input = placeholder.current
      for(let i=0; i < placeholder.current.length - 1 ; i++){
        if(input[i].value === ''){
          input[i].nextSibling.innerText = `Enter your ${input[i].name}`
          input[i].nextSibling.classList.replace('text-gray-500','text-red-500')
        }
        else{
          input[i].nextSibling.innerText = `${input[i].name}`
          input[i].nextSibling.classList.replace('text-red-500','text-gray-500')
        }
      }
      if(input[0].value !== '' && !input[0].value.match(/^\w+([/.-]?\w+)*@\w+([/.-]?\w+)*(\.\w{2,3})+$/)){
        input[0].nextSibling.innerText = `Invalid ${input[0].name} address`
        input[0].nextSibling.classList.replace('text-gray-500','text-red-500')
      } 
      if(input[1] && input[1].value.length < 6 && input[1].name === 'One time password'){
        input[1].nextSibling.innerText = `Enter your ${input[1].name}`
        input[1].nextSibling.classList.replace('text-gray-500','text-red-500')
      }
      if(input[2] && input[2].value !== '' && input[2].value.length < 10){
        input[2].nextSibling.innerText = `Enter your ${input[2].name}`
        input[2].nextSibling.classList.replace('text-gray-500','text-red-500')
      }
    }

    const timeOut = (input,msg,delay) => {
      setTimeout(()=>{
         input(msg)
      },delay)
    }

    const handelRegister = async(e) => {
      e.preventDefault()
      const {phoneNumber,name,email} = inputData
      if(phoneNumber === '' || name === '' || email === '' ) handelError()
      else if(phoneNumber !== '' && phoneNumber.length < 10 ) handelError()
      else if(email !== '' && !email.match(/^\w+([/.-]?\w+)*@\w+([/.-]?\w+)*(\.\w{2,3})+$/)) handelError()
      else {
        handelError()
        const res = await axios.post(`${host}auth/signup`,{...inputData,verified:false}) 
        if(res.data.msg === 'Mobile number already exist' || res.data.msg === 'Email id already exist'){
          setExistMsg(res.data.msg)
          timeOut(setExistMsg,'',3000)
        } 
        else timeOut(setRegisterNum,true,400)
      } 
    }
    
    const verifyOtp = async(e) => {
      e.preventDefault()
      if(otp === ''){
        setExistMsg('Otp is empty')
        timeOut(setExistMsg,'',1500)
        timeOut(setShowPg,'',2000) 
      }
      else if(otp.length < 6) handelError()
      else {
        handelError()
        const {email} = inputData
        const res = await axios.post(`${host}auth/otpVerify`,{
           otp : Number(otp),
           email
        })
        if(res.data.msg === 'verified'){
          const response = isSignUp ? 
          await axios.post(`${host}auth/signup`,{...inputData,verified:true}) : 
          await axios.post(`${host}auth/login`,{email,verified:true}) 
          const {accessToken,user} = await response.data
          localStorage.setItem('token',JSON.stringify(accessToken))
          localStorage.setItem('user',JSON.stringify(user))
          setUser(user)
          timeOut(setShowPg,'',1000) 
        }
        else{
          setExistMsg(res.data.msg)
          timeOut(setExistMsg,'',3000)
          timeOut(setShowPg,'',2000) 
        }
        setOtp('')
        setInputData({phoneNumber:'',
          name:'',
          email:'',
        })
      }
    }

    const handelLogin = async(e) => {
      e.preventDefault()
      const {email} = inputData
      if(email === '' || !email.match(/^\w+([/.-]?\w+)*@\w+([/.-]?\w+)*(\.\w{2,3})+$/)) handelError()
      else{
        const response = await axios.post(`${host}auth/login`,{email,verified:false})
        if(response.data.msg === 'otp updated' || response.data.msg === 'otp generated') timeOut(setRegisterNum,true,600)
        else if(response.data.msg === 'create an account') setIsSignUp(true)
      }
    }

    const handelChange = (e) => {
      const {name,value} = e.target
      if(name === 'Phone number' && value.match(/^\d+$/)){
        setInputData({
          ...inputData,
          phoneNumber : value
        })   
      }
      else if(name === 'Name' || (name === 'Email' && !registerNum)){
        setInputData({
          ...inputData,
          [name.toLowerCase()] : value
        })
      }
      else if(name === 'One time password') setOtp(e.target.value)
    }

    return(
        <>
          <div className='flex items-center justify-between mb-[1rem]'>
            <div className='flex flex-col gap-1'>
              <h2 className='text-[1.75rem] font-medium'>
                {isSignUp ? 'Sign up' : 'Login'}
              </h2>
              <p className='text-sm'>
                or <span className='text-orange-500 font-medium cursor-pointer' onClick={showSignUp}>
                    {isSignUp ? 'login to your account' : 'create an account'}
                </span>
              </p>
              <hr className='border-black border w-[32px] mt-[0.8rem]'/>
            </div>
            <img src={login} alt='' className='w-[110px] mr-[2rem] smallM:w-[80px] smallM:mr-[1rem]'/>
          </div>
          <form className='flex flex-col w-11/12' ref={placeholder}>
             <div className='relative input-wrap'>
              <input type='text' className='border border-gray-300 input w-[100%]' ref={input} value={inputData.email}
               name='Email' onChange={handelChange}
              /> 
              <label className={`${inputData.email !== '' && 'validInput'} text-gray-500`}>
                Email
              </label>
             </div>
             {
              registerNum && <div className='relative input-wrap'>
              <input type='text' className='border border-t-0 border-gray-300 input w-[100%]' value={otp} 
               name='One time password' onChange={handelChange}
              /> 
              <label className={`${otp !== '' && 'validInput'} text-gray-500`}>
                One time password
              </label>
              </div>
             }
             { (isSignUp && !registerNum) &&  <>
             <div className='relative input-wrap'>
              <input type='text'  className='border border-t-0 border-gray-300 input w-[100%]' value={inputData.name}
               name='Name' maxLength={20} onChange={handelChange}
              /> 
              <label className={`${inputData.name !== '' && 'validInput'} text-gray-500`}>
                Name
              </label>
             </div>
             
             <div className='relative input-wrap'>
              <input type='text'  className='border border-t-0 border-gray-300 input w-[100%]' value={inputData.phoneNumber}
                name='Phone number'  maxLength={10} onChange={handelChange}
              /> 
              <label className={`${inputData.phoneNumber !== '' && 'validInput'} text-gray-500`}>
                Phone Number
              </label>
             </div>
             </>
             }
             <button className='validData uppercase mt-[1.5rem] bg-orange-400 text-white 
              relative font-medium p-4 text-sm overflow-hidden hover:shadow-lg' onClick={(e)=>{
                isSignUp && !registerNum ? handelRegister(e) : registerNum ? verifyOtp(e) : handelLogin(e)
              }}
             >
               {isSignUp && !registerNum ? 'continue' : registerNum ? 'verify otp' : 'login'}
             </button>
          </form>
        </>
    )

   
}
export default SignIn
