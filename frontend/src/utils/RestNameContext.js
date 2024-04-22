import {createContext,useState} from 'react';

const RestNameContext = createContext()

const RestNameProvider = ({children}) => {
   
    const [restName,setRestName] = useState('')
    const [otherRestaurant,setOtherRestaurant] = useState(false)
    const [showPg,setShowPg] = useState(false)
    const [user,setUser] = useState('Sign In')
    
    return <RestNameContext.Provider value={{restName,setRestName,otherRestaurant,setOtherRestaurant,showPg,setShowPg,
     user,setUser}}>
        {children}
    </RestNameContext.Provider>
}

export {RestNameContext,RestNameProvider};