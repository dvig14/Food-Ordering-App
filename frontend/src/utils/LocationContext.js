import {useEffect,useState,createContext} from 'react'
import {useLocation} from 'react-router-dom'

const LocationContext = createContext()

const LocationProvider = ({children}) => {

    const location = useLocation()
    const [show,setShow] = useState(false)
    const [isCart,setIsCart] = useState(false)

    const handelShow = () => {
        if(location.pathname === '/' || location.pathname === '/contact'){
            setShow(true)
            setIsCart(false)
        }
        else if(location.pathname === '/cart'){
            setShow(false)
            setIsCart(true)
        }
        else {
          setShow(false)
          setIsCart(false)
        }
    }

    useEffect(()=>{
        handelShow()
    },[location])

    return<LocationContext.Provider value={{show,isCart}}>
        {children}
    </LocationContext.Provider>

}
export {LocationContext,LocationProvider}