import './App.css';
import Header from "./components/Header";
import Main from "./components/Main";
import {Routes,Route} from "react-router-dom";
import Error from "./components/Error";
import Footer from './components/Footer'
import Contact from './components/Contact'
import Search from "./components/Search";
import RestaurantMenu from "./components/RestaurantMenu";
import Cart from './components/Cart'
import Cuisines from './components/Cuisines'
import MyAccount from './components/MyAccount'
import EmailConfirm from './components/EmailConfirm'
import {useContext} from 'react'
import {LocationContext} from './utils/LocationContext'

const App = () => {

  const {show} = useContext(LocationContext)

  return (
    <>
     <Header/>
     <Routes>
       <Route  path='/' element={<Main/>}/>
       <Route path='/contact' element={<Contact/>}/>
       <Route path='/search' element={<Search/>}/>
       <Route path='/restaurants/:resId' element={<RestaurantMenu/>}/>
       <Route path='/cart' element={<Cart/>}/>
       <Route path='/*' element={<Error/>}/>
       <Route path='/cuisine/:cuisineId' element={<Cuisines/>}/>
       <Route path='/my-account/*' element={<MyAccount/>}/>
       <Route path='/emailConfirmed/:id' element={<EmailConfirm/>}/>
      </Routes>
      {show && <Footer/>}
    </>
  );
}

export default App;
