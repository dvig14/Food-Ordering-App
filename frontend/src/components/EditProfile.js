import {useState,useRef} from 'react'
import axios from 'axios'
import {host} from '../utils/constants'

const EditProfile = ({phoneNum,email,id}) => {

  const [inpChng,setInpChng] = useState([phoneNum,email])
  const [showIdx,setShowIdx] = useState()
  const [otp,setOtp] = useState({
    otpVal: '',
    showOtp : false
  })
  const type = useRef()

  const items = ['PhoneNumber','Email']
  const value = [phoneNum,email]

  const handleChng = (e,index) => {
      const val = e.target.value
      const newArr = [...inpChng]
      newArr[index] = val
      if(newArr[0].length > 10 ) newArr[0] = val.substring(0,10)
      setInpChng(newArr)
  }

  const handleError = (inx,msg='') => {

    if(inpChng[inx] === ''){
        type.current.innerText = `Enter your ${items[inx]}`
        type.current.classList.add('text-red-500')
    }
    else if(inpChng[0].length < 10 || !inpChng[1].match(/^\w+([/.-]?\w+)*@\w+([/.-]?\w+)*(\.\w{2,3})+$/)){
        type.current.innerText = `Invalid ${items[inx]}`
        type.current.classList.add('text-red-500')
    } 
    else if(msg === 'Number use by other user' || msg === 'Enter your Otp' || msg === 'Invalid Otp'){
      type.current.innerText = msg
      type.current.classList.add('text-red-500')
    }
    else if(msg === 'Email id already exist'){
      type.current.innerText = msg
      type.current.classList.add('text-red-500')
    }
    else{
        type.current.innerText = items[inx]
        type.current.classList.remove('text-red-500')
    }

  }
  
  const handleVerify = async(index) => {

    if(inpChng[index] !== value[index]){

       if(index === 0 && inpChng[0].length < 10) handleError(index) 
       else if(index === 1 && !inpChng[1].match(/^\w+([/.-]?\w+)*@\w+([/.-]?\w+)*(\.\w{2,3})+$/)) handleError(index)
       else{
        handleError(index)
        if(index === 0){
          const res = await axios.patch(`${host}auth/signUp/${id}`,{index,phoneNumber : inpChng[0],verified:false})
          if(res.data.msg === 'Number use by other user') handleError(0,res.data.msg)
          else setOtp({...otp ,showOtp :true})
        } 
        else if(index === 1){
          const res = await axios.patch(`${host}auth/signUp/${id}`,{index,email : inpChng[1]})
          if(res.data.msg === 'Email id already exist') handleError(1,res.data.msg)
          else localStorage.setItem('newEmail',JSON.stringify(inpChng[1]))
        }
      }

    } 

  }

  const verifyOtp = async(index) => {
    if(otp.otpVal === '') handleError(0,'Enter your Otp')  
    else if(otp.otpVal.length !== 6) handleError(0,'Invalid Otp')  
    else{
      handleError(0,'')  
      const verify = await axios.post(`${host}auth/otpVerify`,{
        otp : Number(otp.otpVal),
        phoneNumber : inpChng[0]
       })
       if(verify.data.msg === "Invalid Otp Please Try Again") handleError(0,'Invalid Otp')
       else if(verify.data.msg === "verified"){
         const res = await axios.patch(`${host}auth/signUp/${id}`,{index,phoneNumber : inpChng[0],verified:true})
         const {updateProfile} = res.data
         localStorage.removeItem('user')
         localStorage.setItem('user',JSON.stringify(updateProfile))
         window.location.reload()
       }
    }
  }

  const handleRefresh = (index) => {
    setShowIdx(index)
    setInpChng(value)   
    setOtp({otpVal : '',showOtp : false})
  }
    
    return(
        <div className='flex flex-col items-center font-medium gap-[3rem] mt-[3rem] mx-[0.5rem]'>
           <span className='laptop:text-2xl text-xl'>Edit Profile</span>
           <div className='flex flex-col gap-[2rem] w-[50%] mobile:w-[80%]'>
             { 
                items.map((val,index)=>(
                 <div className='flex flex-col gap-[0.5rem]' key={index}>
                    <span className='laptop:text-xl text-lg'>{val}</span>
                    { showIdx !== index && 
                      <p className='flex justify-between'>
                       <span className='laptop:text-xl text-lg text-gray-700'>{value[index]}</span>
                       <span className='text-lg smallM:text-base cursor-pointer mr-[2rem] text-orange-500' 
                         onClick={()=> handleRefresh(index)}>
                         change
                       </span>
                      </p>
                    }
                    { showIdx === index && 
                      <div className='flex justify-between'>
                        <div className='relative w-[60%] mobile:w-[70%]'>
                        {
                          !otp.showOtp ?<>
                          <input type='text' className='border-2 w-[100%] px-[1rem] pt-[1.5rem] pb-[0.5rem] border-gray-400 
                          outline-none'
                           value={inpChng[index]} onChange={(e) => handleChng(e,index)}
                         />
                          <span className='absolute text-xs left-0 px-[1rem] pt-[0.5rem]' ref={type}>{val}</span>
                          </> : <>
                           <input type='text'  className='border-2 w-[100%] px-[1rem] pt-[1.5rem] pb-[0.5rem] border-gray-400 
                            outline-none' value={otp.otpVal} onChange={(e)=>setOtp({...otp,otpVal : e.target.value})}/>
                            <span className='absolute text-xs left-0 px-[1rem] pt-[0.5rem]' ref={type}>Otp</span>
                          </>
                        }
                        </div>
                        <button className='cursor-pointer bg-orange-500 text-white px-[1rem]' 
                         onClick={()=> !otp.showOtp ? handleVerify(index) : verifyOtp(index)}>
                          Verify
                        </button>
                      </div>
                    }
                  </div>
                ))
             }
            
           </div>
        </div>
    )
}
export default EditProfile