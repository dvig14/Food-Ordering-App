import {useEffect,useState} from 'react'
import SrchShimmer from "./SrchShimmer"
import SearchRest from './SearchRest'
import {Link,useSearchParams} from 'react-router-dom'
import { suggestImg_Url,trackId } from "../utils/constants";
import { FaStar,FaArrowRight } from "react-icons/fa6"
import {host} from '../utils/constants'


const SearchCards = ({cardType,setCardType,name,inpVal}) => {

    const [searchParams] = useSearchParams();
    const queryVal = searchParams.get('query')
    const [searchListCards,setSearchListCards] = useState([])
    const [btnClicked,setBtnClicked] = useState(false)
    const activeLink = 'bg-[#3E4152] py-2 px-3 rounded-full text-white'
    const normalLink = 'text-[#3E4152] border py-2 px-3 rounded-full'
    
    const fetchData = async () => {
        try{
          const data = name === 'restaurant' && cardType !== 'dish' ? 
          await fetch(`${host}api/search?lat=31.6339793&lng=74.8722642&str=${queryVal}`)
          : 
          await fetch(
            `${host}api/search?lat=31.6339793&lng=74.8722642&str=${queryVal}${trackId}${btnClicked && `&selectedPLTab=${cardType.toUpperCase()}`}`
          ) 
          const json = await data.json();
          const typeOfCard = json?.data?.cards.find((x)=>x.groupedCard)?.groupedCard?.cardGroupMap
          typeOfCard?.DISH ?  setSearchListCards(typeOfCard?.DISH?.cards)
          :  
          setSearchListCards(typeOfCard?.RESTAURANT?.cards)
          setBtnClicked(false)
          //console.log(cardType,typeOfCard)
        }
        catch(e){
           console.log(e)
        }
     
    }

    useEffect(()=>{
        fetchData()
      // console.log('render')
    },[cardType])

    if(searchListCards === undefined) return (
     <p className='font-bold text-gray-500 w-8/12 mobile:w-11/12 px-[1rem] text-sm mx-auto mt-[1rem]'>
       No match found for {`"${inpVal}"`}
     </p>
    )

    return  searchListCards.length === 0 || btnClicked ? <SrchShimmer/> : (
      <>
        <div className='pt-[1rem] pb-[0.5rem] text-sm font-bold flex gap-2 fixed bg-white w-[100%] smallM:left-0 smallM:px-[1.5rem]'>
          <button className={cardType !== 'dish' ? activeLink : normalLink} onClick={()=> {
            setCardType('restaurant')
            setBtnClicked(true)}}>
            Restaurants
          </button>
          <button className={cardType === 'dish' ? activeLink : normalLink} onClick={()=> {setCardType('dish')
          setBtnClicked(true)}}>
            Dishes
          </button>
        </div>

        <div className='px-[1rem] py-[6rem] bg-[#F5F6F8] smallM:bg-white smallM:border-t-4 smallM:p-0 smallM:py-[4rem]'>
        {  
          cardType === 'dish' ? <GetDish searchCardList={searchListCards}/> : <GetRestaurant searchCardList={searchListCards}/>
        }
        </div>
     </>
    )

}

export const GetDish = ({searchCardList}) => {

  const dishes = searchCardList.filter((x)=> x?.card?.card?.["@type"] === 'type.googleapis.com/swiggy.presentation.food.v2.Dish')

  return(
     <div className='flex flex-wrap gap-1 justify-evenly smallM:mt-0 gap-y-[2rem]'>
       {
         dishes.map((res)=>{
           const {name,price,finalPrice,description,imageId,id} = res?.card?.card?.info
           const {avgRating,sla} = res?.card?.card?.restaurant?.info

           return(
             <div key={id} className="flex flex-col w-[420px] p-[1.5rem] gap-[1.5rem] bg-white smallM:p-[1rem] rounded-3xl
              smallM:border smallM:shadow-lg smallM:shadow-gray-100">
               <Link to={'/restaurants/' + res?.card?.card?.restaurant?.info?.id} className='flex items-center justify-between border-b-2 border-dotted w-[100%] pb-[1rem] 
                cursor-pointer'>
                 <div>
                   <span className='font-bold text-[0.8rem] text-[#686B78] '>By {res?.card?.card?.restaurant?.info?.name}</span>
                   <p className='flex items-center gap-1 text-[0.8rem] text-[#7E808C] smallM:text-xs'>
                     <FaStar className='rounded-[50%]'/>
                     {avgRating}
                     <span> . {sla.minDeliveryTime}-{sla.maxDeliveryTime} MINS</span>
                    </p>
                 </div>
                 <FaArrowRight className='text-xl text-gray-500'/>
               </Link>
               <div className='flex justify-between'>
                 <div className='flex flex-col w-[60%] text-[#3E4152] '>
                   <span className='font-medium'>{name}</span>
                   {finalPrice ? 
                    <p className='flex items-center gap-1 font-medium'>
                      <span className='text-xs line-through text-[#282C3F73]'>Rs.{price/100}</span>
                      <span className='text-sm'>Rs.{(finalPrice/100).toFixed(2)}</span>
                    </p> 
                    : 
                    <span className='text-[0.8rem] font-medium'>Rs.{price/100}</span>
                   }
                   <p className='text-[#282C3F73] text-[0.8rem] mt-[0.8rem] text-ellipsis'>{description}</p>
                 </div>
                 {imageId && <img  src={suggestImg_Url + imageId} alt='' className='rounded-md h-[100px] w-[120px]'/>}
               </div>
             </div>
           )

         })
       }
     </div>
   )
}

export const GetRestaurant = ({searchCardList}) => {
 
  const val = searchCardList.find((x)=> x?.card?.card?.restaurants)
  const restaurants = val !== undefined ? searchCardList.map((x)=> x.card)[1]?.card?.restaurants : searchCardList
  const value = restaurants.find((x)=>x?.info?.id)
  // console.log(restaurants,value) 
  return(
    <>
     <Link to={'/restaurants/' + searchCardList.map((x)=> x.card)[0]?.card?.info?.id} className={val ? 'block' : 'hidden'}>
       <SearchRest {...searchCardList.map((x)=> x.card)[0]?.card?.info}/>
     </Link>

     <div className='mt-[3rem] smallM:mt-[1.5rem]'>
      <p className={`${val ? 'block' : 'hidden'} font-bold text-[#3E4152] text-center smallM:text-left smallM:px-[1rem]`}>
        More results like this
      </p>
      <div className='flex flex-wrap gap-1 justify-evenly mt-[1rem] smallM:mt-0'>
       {
         restaurants.map((rest)=>{
              const {info} = value !== undefined ? rest : rest?.card?.card
           return(
            <Link key={info?.id} to={'/restaurants/' + info?.id} className='smallM:w-[100%] py-[0.6rem]'>
              <SearchRest {...info}/>
            </Link>
           )
         })
       }
      </div>
     </div>
    </>
  )

 }

export default SearchCards