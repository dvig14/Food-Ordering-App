import {NavLink,useLocation} from 'react-router-dom'
import {useState,useEffect,useRef} from 'react'
import Orders from './Orders'
import Payments from './Payments'
import EditProfile from './EditProfile'

const MyAccount = () => {

    const normalLink = 'cursor-pointer hover:text-[#263134] m-[1.3rem]'
    const activeLink = 'bg-white px-[1.5rem] mt-[0.8rem] pt-[0.5rem] smallM:mx-[0.6rem]'
    const user = JSON.parse(localStorage.getItem('user'))
    const location = useLocation()
    const [activePath,setActivePath] = useState('orders')
    const tabs = useRef()
  
    useEffect(()=>{
      const {pathname} = location
      const name = pathname.split('/')[2]
      setActivePath(name)
    },[location])
    
    return (
        <div className='bg-slate-200 w-[100%] pt-[7rem] flex flex-col items-center text-gray-500'>
          <span className='first-letter:uppercase text-2xl font-medium smallM:text-xl'>{user.name}</span>
          <p className='flex gap-4 text-lg mt-[0.5rem] smallM:text-base'>
             <span>{user.phoneNumber}</span>
                .
             <span>{user.email}</span>
          </p>
          <div className='bg-white w-[95%] h-[100vh] glassmorph mx-auto flex flex-col p-[2rem] my-[2rem] smallM:p-[0.5rem]
           smallM:w-[100%]'>
            <div className='bg-slate-200 w-[100%] flex px-[1rem] justify-evenly text-lg font-medium text-gray-500
             rounded-lg smallM:text-sm smallM:justify-between smallM:px-0' ref={tabs}>
               <NavLink to='orders' className={({isActive}) => isActive ? activeLink : normalLink}>
                 Orders
               </NavLink>
               <NavLink to='payments' className={({isActive}) => isActive ? activeLink : normalLink}>
                 Payments
               </NavLink>
               <NavLink to='edit-profile' className={({isActive}) => isActive ? activeLink : normalLink}>
                 Edit
               </NavLink>
            </div>
             { 
                (activePath === 'orders' && <Orders/>) ||  (activePath === 'payments' && <Payments/>) || 
                (activePath === 'edit-profile' && <EditProfile phoneNum={user.phoneNumber} email={user.email} id={user._id}/>)
             }
          </div>
        </div>
    )

}
export default MyAccount