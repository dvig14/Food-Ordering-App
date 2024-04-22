import { IoIosSearch } from "react-icons/io";
import {useEffect,useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {suggestImg_Url} from '../utils/constants'
import SearchCards from './SearchCards'
import { RiArrowLeftSLine } from "react-icons/ri";
import {host} from '../utils/constants'

const Search = () => {

    const [searchQuery,setSearchQuery] = useState('')
    const [name,setName] = useState({
      value : '',
      tagName : ''
    })
    const [suggestions,setSuggestions] = useState([])
    const [cardType,setCardType] = useState('')
    const [showSearchCards,setShowSearchCards] = useState(false)
    const navigate = useNavigate()
    let timeout

    const fetchData = async () => {
      try{
          const data = await fetch(`${host}api/searchSuggest?lat=31.6339793&lng=74.8722642&str=${searchQuery}&trackingId=undefined`);
          const json = await data.json();
          const suggest = json?.data?.suggestions
          //console.log(suggest)
          setSuggestions(suggest)
      }
      catch(e){
           console.log(e)
      }
    }
    
    useEffect(()=>{
      if(searchQuery !== '') fetchData()
    },[searchQuery])

    const debounceText = (e) => {
        clearTimeout(timeout)
        timeout = setTimeout(()=>{
            setSearchQuery(e.target.value)
        },500)
    }
    
    const handelInput = (e) => {
      setName({
        ...name,
        value : e.target.value
      })
      debounceText(e)
    }

    const handelSearchQuery = (inputVal,tagName) => {
      setCardType(tagName)
      setShowSearchCards(true)
      setSuggestions(undefined) 
      setName({
        value : inputVal,
        tagName : tagName
      })
    }
    
   return (
      <div className='w-[100%] mb-[2rem]'>
        <div className='w-[100%] pt-[8rem] sticky top-0 bg-white z-20'>
        <div className='text-gray-500 flex items-center relative w-8/12 mx-auto mobile:w-11/12'>

           { showSearchCards && 
             <RiArrowLeftSLine className='absolute left-[0.3rem] text-[2rem] text-gray-600 cursor-pointer ' 
              onClick={()=>{
                setShowSearchCards(false)
                navigate('/search')
                setSuggestions(undefined)
                setSearchQuery('')
                setName({
                  ...name,
                  value : ''
                })
              }}/>
            }
            <input type='text' placeholder='Search for restaurants and food' className={`border border-gray-300 w-[100%]
             placeholder:text-gray-500 rounded font-medium outline-none text-ellipsis ${showSearchCards ? 'py-3 px-[2.5rem]' 
             : 'p-3'}`} value={name.value} autoFocus maxLength='200' onChange={handelInput} 
            />

           <IoIosSearch className='text-[1.7rem] font-bold absolute right-[1rem]'/>

         </div>
         </div>
         {  (suggestions !== undefined && name.value !== '') && <div className='p-[1.5rem] flex flex-col gap-3 w-8/12 mx-auto mobile:w-11/12'>
          {
            suggestions.map((suggestion,index)=>{

                const {text,tagToDisplay,cloudinaryId} = suggestion

                return(
                    <Link key={index} to={'/search?query=' + text} className='flex p-2 gap-4 items-center 
                     hover:bg-slate-100 rounded' onClick={()=>handelSearchQuery(text,tagToDisplay.toLowerCase())}>
                      <img src={suggestImg_Url+cloudinaryId} alt='' className='h-[70px] rounded'/>
                      <div className='flex flex-col text-sm '>
                       <span>{text}</span>
                       <span className='text-gray-500'>{tagToDisplay}</span>
                      </div>
                    </Link>
                )
                
            })
          }
         </div>
         }
        {
          suggestions !== undefined && (suggestions.length === 0 && name.value !== '') && 
          <p className='font-bold text-gray-500 w-8/12 mobile:w-11/12 px-[1rem] text-sm mx-auto mt-[-0.7rem]'>
            No match found for {`"${name.value}"`}
          </p>
        }
        <div className='w-8/12 mx-auto mobile:w-11/12'>
          {showSearchCards && suggestions === undefined && 
            <SearchCards cardType={cardType} setCardType={(name)=>setCardType(name)} name={name.tagName} inpVal={name.value}/>
          }
        </div>
      </div>
   )
  
}
export default Search;