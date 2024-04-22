import {useLocation,Link} from 'react-router-dom'
import {useEffect,useState} from 'react'
import Error from './Error'
import Filters from './Filters'
import Shimmer from './Shimmer'
import ReasCard,{withVegReasCard} from './ReasCard'
import {setListOfCards,setFilterCards} from '../utils/restListSlice'
import {useDispatch,useSelector} from 'react-redux'
import {host} from '../utils/constants'

const Cuisines = () => {

    const location = useLocation()
    const dispatch = useDispatch()
    const [itemNotFound,setItemNotFound] = useState(false)
    const [title,setTitle] = useState('')
    const collection = useSelector((store) => store.restList.ListOfCards)
    const filterCollection = useSelector((store) => store.restList.FilterCards)
    
    const fetchData = async () => {
        try{
            const data = await fetch(`${host}api/cuisine?lat=31.6339793&lng=74.8722642&${location.search.substring(1)}&type=rcv2`);
            const json = await data.json();
            const getResCards = async (jsonData) => {
                const cards = jsonData?.data?.cards
                const title = cards.map((x)=> x)[0]?.card?.card?.title
                setTitle(title)
                const result = cards.filter((x)=>x.card?.card?.info)
                return result.map(x=>x.card?.card)
            }
            const resCards = await getResCards(json)
            dispatch(setListOfCards(resCards))
            dispatch(setFilterCards(resCards))
            //console.log(resCards)
        }
        catch(e){
             console.log(e)
        }
      }
      
    useEffect(()=>{
        fetchData()
    },[])

    if(collection === undefined) return <Error/>
    const ReasCardVeg = withVegReasCard(ReasCard)
    
    return collection.length === 0 ? <Shimmer/> : (
        <div className='mt-[9rem] mx-auto mb-[2rem] w-[100%] mobile:mt-[7rem] mobile:mb-[4rem]'>

          <h2 className='text-4xl font-bold w-11/12 mx-auto mb-[2rem] px-1 mobile:text-3xl'>
           {title}
          </h2>
          <Filters setItemNotFound={setItemNotFound} 
            ListOfRest={collection}
            FilterRest={filterCollection}
            setFilterRest={(items) => dispatch(setFilterCards(items))}/>

          <h3 className='text-2xl font-bold w-11/12 mx-auto my-[1.5rem] px-1 mobile:text-xl'>
           {!itemNotFound ? filterCollection.length : 0} restaurants to explore
          </h3>
          <div className="flex flex-wrap gap-y-5 justify-evenly relative w-[96%] mx-auto">
            { 
              itemNotFound ?
              <h2 className='text-gray-700 font-medium h-[100vh] text-lg mobile:text-base'>
                No match found 
              </h2>                                              
               :
               filterCollection.map((res)=>(
                    <Link key={res.info.id} to={'/restaurants/'+ res.info.id}>
                        { 
                          res.info.veg ? (<ReasCardVeg {...res.info}/>) : 
                          (<ReasCard {...res.info}/>)
                        }
                    </Link>
                ))
            }
          </div>

        </div>
    )
}
export default Cuisines