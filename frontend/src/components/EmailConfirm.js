import {useEffect} from 'react'
import axios from 'axios'
import {host} from '../utils/constants'
import {useLocation} from 'react-router-dom'

const EmailConfirm = () => {

    const location = useLocation()
    const arr = location.pathname.split('/')
    const id = arr[arr.length - 1]
    const newEmail = JSON.parse(localStorage.getItem('newEmail'))

    const sendVerified = async() => {
        const res = await axios.patch(`${host}auth/signUp/${id}`,{index:1,email:newEmail,verified:true})
        const {updateProfile} = res.data
        console.log(updateProfile)
        if(updateProfile !== undefined) localStorage.setItem('user',JSON.stringify(updateProfile))
    }

    useEffect(()=>{
       sendVerified()
    },[])

    return(
        <div className='flex flex-col items-center justify-center h-[80vh] text-xl smallM:text-lg gap-[1rem] 
         font-medium smallM:p-2 smallM:text-center'>
            <h3 className='text-orange-400'>Thank You</h3>
            <p>Your email has been confirmed and updated</p>
        </div>
    )
}

export default EmailConfirm