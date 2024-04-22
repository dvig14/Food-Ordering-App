import ReasCard , {withVegReasCard} from "./ReasCard";
import {useState,useEffect,useRef} from "react";
import Shimmer from "./Shimmer"
import {Link} from "react-router-dom"
import Filters from './Filters'
import {setListOfCards,setFilterCards} from '../utils/restListSlice'
import {useDispatch,useSelector} from 'react-redux'
import { IoArrowForward,IoArrowBack } from "react-icons/io5";
import { CDN_URL,host } from "../utils/constants";
import {useNavigate} from 'react-router-dom'

const Main = () => {

    const [itemNotFound,setItemNotFound] = useState(false)
    const ListOfCards = useSelector((store) => store.restList.ListOfCards)
    const FilterCards = useSelector((store) => store.restList.FilterCards)
    const [cuisines,setCuisines] = useState([])
    const cuisineImgContainer = useRef([])
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
      fetchData()
    },[])

    const handelScroll = (type) => {
      let container = cuisineImgContainer.current 
      if(container.clientWidth >= 930){
        container.scrollBy({
          top:0,
          left: type === 'frwd' ?  +500 : -500,
          behavior:'smooth'
       })
      } 
      else if(container.clientWidth < 930 && container.clientWidth >= 550){
        container.scrollBy({
         top:0,
         left: type === 'frwd' ?  +420 : -420,
         behavior:'smooth'
        }) 
      }
      else {
        container.scrollBy({
          top:0,
          left: type === 'frwd' ?  +200 : -200,
          behavior:'smooth'
         }) 
      }  
    }
   
    const fetchData = async () => {
        try{
          const data = await fetch(`${host}api/restaurants?lat=31.6339793&lng=74.8722642&page_type=DESKTOP_WEB_LISTING`);
          const json = await data.json();
    
          const getResCards = async (jsonData) => {
    
            const cards = jsonData?.data?.cards
    
            for(let i=0 ; i<cards.length; i++) {
              const checkRestaurants = cards[i]?.card?.card?.gridElements?.infoWithStyle?.restaurants
              if(checkRestaurants !== undefined) return checkRestaurants
            }
    
          }

          const getCuisines = async (jsonData) => {
    
            const cards = jsonData?.data?.cards
    
            for(let i=0 ; i<cards.length; i++) {
              const checkCuisines = cards[i]?.card?.card?.gridElements?.infoWithStyle?.info
              if(checkCuisines !== undefined) return checkCuisines
            }
    
          }
    
          const resCards = await getResCards(json)
          dispatch(setListOfCards(resCards))
          dispatch(setFilterCards(resCards))
          const cuisineCards = await getCuisines(json) 
          setCuisines(cuisineCards)
          //console.log(cuisineCards)
        }
        catch(e){
           console.log(e)
        }
    
    }
   
    const ReasCardVeg = withVegReasCard(ReasCard)

    return ListOfCards.length === 0 || cuisines === undefined || cuisines.length === 0 ? <Shimmer/> : (

        <div className="mt-[7rem] w-10/12 mobile:w-[100%] mx-auto">

          <div className='w-11/12 mx-auto border-b-2'>
            <div className='flex items-center justify-between'>
              <h2 className='font-bold laptop:text-2xl tablet:text-xl mobile:text-lg text-[#02060cc3]'>
                What's on your mind?
              </h2>
              <div className='flex laptop:text-[2.1rem] gap-2 cursor-pointer text-[1.8rem]'>
                <IoArrowBack className='laptop:p-2 bg-gray-200 rounded-[50%] p-[0.4rem]' onClick={()=>handelScroll('back')}/>
                <IoArrowForward className='laptop:p-2 bg-gray-200 rounded-[50%] p-[0.4rem]' onClick={()=>handelScroll('frwd')}/>
              </div>
            </div>
            <div className='flex my-[1rem] overflow-hidden gap-[1rem] pb-[1rem] mobile:pb-[0.6rem] laptop:gap-[2rem]'
             ref={cuisineImgContainer}>
              { 
                cuisines.map((res,index)=>{
                  const id = res.action.link.split('?')[0].split('/')[4]
                  const type = res.action.text
                  return(
                  <img src={CDN_URL + res.imageId} key={res.id} alt='' className='laptop:h-[180px] w-[144px] 
                  cursor-pointer tablet:h-[170px] mobile:h-[130px]'
                  ref={(img)=> cuisineImgContainer.current !== null ? cuisineImgContainer.current[index] = img : ''}
                  onClick={()=> navigate(`/cuisine/${id}?collection=${id}&tags=layout_CCS_${type}`)}/>
                  )
                })
              }
            </div>
          </div>
          
          <h2 className='font-bold laptop:text-2xl text-xl mobile:text-lg w-11/12 mx-auto my-[2rem] text-[#02060cc3]'>
            Restaurants with online food delivery in Amritsar
          </h2>

          <Filters setItemNotFound={setItemNotFound} 
            ListOfRest={ListOfCards}
            FilterRest={FilterCards}
            setFilterRest={(items) => dispatch(setFilterCards(items))}
          />
  
          <div className="flex flex-wrap gap-y-5 py-6 justify-evenly relative">

            { itemNotFound ?
              <h2 className='text-gray-700 font-medium h-[100vh] mobile:text-base'>
                No match found 
              </h2>
              :
              FilterCards.map((rest)=>(
                <Link key={rest.info.id} to={"/restaurants/"+ rest.info.id}>
                  { 
                    rest.info.veg ? (<ReasCardVeg {...rest.info}/>) : 
                    (<ReasCard {...rest.info}/>)
                  }
                </Link>
              ))
            }

          </div>
        </div>
    )
      
   
}
export default Main