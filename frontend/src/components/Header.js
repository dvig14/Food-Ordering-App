import LOGO from "../images/logo.jpg";
import {NavLink} from 'react-router-dom';
import {useSelector} from 'react-redux'
import { LuPhone } from "react-icons/lu";
import { IoIosSearch } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { MdPersonOutline } from "react-icons/md";
import {useState,useEffect,useContext} from 'react'
import SignIn from './SignIn'
import { CgClose } from "react-icons/cg";
import {RestNameContext} from '../utils/RestNameContext'

const Header = () => {

  const activeLink = 'text-orange-500';
  const normalLink = 'relative after:bg-orange-500 after:h-[0.1em] after:absolute after:-bottom-1 after:left-0 after:hover:w-[100%] after:hover:animate-[hoverWidth_0.5s_linear] mobile:after:-top-2 mobile:after:h-[0.15em]';

  const countVal = useSelector((store) => store.cart.count)
  const [isSignUp,setIsSignUp] = useState(false)
  const [existMsg,setExistMsg] = useState('')
  const {showPg,setShowPg,user,setUser} = useContext(RestNameContext)

  useEffect(()=>{
     const user = JSON.parse(localStorage.getItem('user'))
     if(user){
       setUser(user)
     }
  },[])

  const handelLogOut = () => {
    localStorage.removeItem('user') 
    setUser('Sign In')
  }
  
  const cartItems = countVal.reduce((acc,curr)=>{
    return acc + curr.count
  },null)

  const showSignInPage = () => {
    setShowPg(!showPg)
    setIsSignUp(false)
  }
 
  return(
    <>

    <div className="flex justify-between items-center tablet:shadow-lg mobile:shadow-md fixed top-0 w-[100%] bg-white z-30 tablet:p-6">
      <div className="logo-container w-36 mobile:w-32 mobile:m-5">
        <img className="w-[100%]" alt="logo" src= {LOGO}/>
      </div>
      <div className={`nav absolute tablet:right-0 desktop:w-[50%] laptop:w-[55%] tablet:w-[63%] mobile:w-[100%] mobile:fixed 
       mobile:bottom-0`}>
        <ul className='flex justify-evenly p-4 font-medium text-base items-center cursor-pointer mobile:p-2 mobile:bg-white
            text-gray-800 mobile:border-t mobile:shadow-2xl mobile:shadow-gray-600 mobile:text-sm mobile:justify-around'>
          <li>
            <NavLink to="/search" className={({isActive})=> isActive ? activeLink : normalLink}>
             <div className='flex items-center tablet:gap-2 mobile:flex-col'>
               <IoIosSearch className='text-xl font-bold'/> 
               <span>Search</span>
             </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({isActive})=> isActive ? activeLink : normalLink}>
            <div className='flex items-center tablet:gap-2 mobile:flex-col'>
               <LuPhone className='text-lg font-medium'/> 
               <span>Contact</span>
             </div>
            </NavLink>
          </li>
          <li>
            <div className={`${user === 'Sign In' ? normalLink : 'user relative'} flex items-center tablet:gap-2 mobile:flex-col `} 
              onClick={showSignInPage}>
               {
                user !== 'Sign In' ? <>
                <NavLink to='/my-account/orders' className='flex items-center tablet:gap-2 mobile:flex-col'>
                   <MdPersonOutline className='text-xl font-medium'/> 
                  {user.name} 
                </NavLink>
                <div className='absolute top-[1.6rem] -left-3 py-[0.8rem] px-[1.4rem] bg-white z-20 rounded-md shadow-lg
                 border-t-2 border-t-orange-500 hidden text-sm mobile:top-[-8.2rem]'>
                  <NavLink to='/my-account'>Profile</NavLink>
                  <NavLink to='/my-account/orders'>Orders</NavLink>
                  <NavLink to='/my-account/payments'>Payments</NavLink>
                  <NavLink to='/' onClick={handelLogOut}>LogOut</NavLink>
                </div>
                </>
                : 
                <>
                <MdPersonOutline className='text-xl font-medium'/> 
                <span>Sign In</span>
                </>
               }
             </div>
          </li>
          <li className='relative'>
            <NavLink to='/cart' className={({isActive})=> isActive ? activeLink : normalLink}>
            <div className='flex items-center tablet:gap-2 mobile:flex-col'>
               <IoCartOutline className='text-xl font-medium'/> 
               <span>Cart</span>
             </div>
            </NavLink>
            { cartItems &&
              <span className='absolute bg-orange-400 px-[0.3rem] rounded-[50%] text-white h-[1rem] w-[1rem] flex items-center
             font-bold tablet:left-2 tablet:bottom-[0.8rem] bottom-[1.8rem] right-0 text-[0.7rem]'>
             {cartItems}
            </span>
            }
          </li>
        </ul>
      </div>
    </div>
    { 
     <>
     <div className={`bg-white fixed h-screen desktop:w-[42vw] laptop:w-[50vw] tablet:w-[55vw] mobile:w-[100%]
      top-0 z-50 transition-all linear duration-[1s] px-[2.5rem] ${showPg && user === 'Sign In' ? 'right-0' : 'right-[-100vw]'} 
      flex flex-col gap-[1rem] py-[2rem] smallM:px-[1rem]`}>
      <CgClose className='text-2xl text-gray-500 cursor-pointer' onClick={showSignInPage}/> 
      <SignIn show={showPg} isSignUp={isSignUp}
       setExistMsg={(msg)=>setExistMsg(msg)} 
       setShowPg={showSignInPage}
       setIsSignUp={setIsSignUp}
       setUser={setUser}
      />
     </div>
     <div className={`fixed z-50 flex justify-center text-white w-[100%] transition-all linear duration-[0.8s]
      ${existMsg !== '' ? 'bottom-[2rem]' : 'bottom-[-100vh]'}`}>
      <span className='bg-gray-800 font-medium p-[1rem] text-sm'>{existMsg}</span>
     </div>
     <div className={`fixed bg-black/[0.6] w-[100%] top-0 h-screen z-40 ${showPg && user === 'Sign In' ? 'left-0' : 'hidden'}`} 
      onClick={showSignInPage}>
     </div>
     </>
    }
    </>
  )
}
export default Header;