import {IoIosArrowDown } from "react-icons/io";
import {useState} from "react";

const Filters = ({setItemNotFound,ListOfRest,FilterRest,setFilterRest}) => {
    
    const [sort,setSort] = useState(false)
    const [activeFilter,setActiveFilter] = useState([])
    const [Sibling,setSibling] = useState('')
    const normalfilter = 'flex items-center gap-1 text-gray-600 font-medium rounded-3xl border px-3 py-2 shadow-xl text-sm outline-none shadow-gray-100'
    const activefilter = `${normalfilter} bg-gray-200 border-gray-400`

    const sorting = (sortBy) => {
        const filterRest = [...FilterRest].sort((a,b)=>{ 
           let result
           const priceA = Number(a.info.costForTwo.split(' ')[0].slice(1))
           const priceB = Number(b.info.costForTwo.split(' ')[0].slice(1))
           if(sortBy === 1) result = priceB - priceA
           else if(sortBy === 2) result = priceA - priceB
           else if(sortBy === 3) result = a.info.name.localeCompare(b.info.name)
           else if(sortBy === 4) result = b.info.name.localeCompare(a.info.name)
           else if(sortBy === 5) result = b.info.avgRating - a.info.avgRating
           return result
        })
        setFilterRest(filterRest)
     }
   
    const handelSort = (e) => {
       switch(e.target.value){
         case 0 : setFilterRest(ListOfRest);
         break;
         default : sorting(e.target.value);
         break;
       }
    } 

    
    const handelFilters = (filterArr) => {
        let result 
        let arr = []
        let count = 0
        if (filterArr.length !== 0 ) {

          filterArr.map((val) => {
          
            const filterList = [...ListOfRest].filter((res) => {

              const price = Number(res.info.costForTwo.split(' ')[0].slice(1))
              if(val === '4.2+') result = res.info.avgRating > 4.2
              else if(val === 'veg') result =  res.info.veg
              else if(val === '300-600') result = 300 <= price && price <= 600  
              else if(val === '300>less') result =  price < 300
              return result
             
            })

            if(arr.length === 0 && count === 0){
              arr = filterList 
              count = 1
            }
            else if(arr.flat().length !== 0) arr = arr.flat().map((item) => filterList.filter((val) => val.info.id === item.info.id))
          
            if(filterList.length !== 0 && arr.flat().length !== 0) {
              setFilterRest(arr.flat())
              setItemNotFound(false)
            } 
            else setItemNotFound(true)
          
          }) 
        }

        else{
          setItemNotFound(false)
          setFilterRest(ListOfRest)
        }

    }

    const handelActiveFilter = (e) => {
    
      const filter = e.target.value 
      let newfilterArr = [...activeFilter]
      newfilterArr.includes(filter) ? newfilterArr = newfilterArr.filter((val) => val !== filter) : newfilterArr.push(filter)
      setActiveFilter(newfilterArr)
      handelFilters(newfilterArr) 
  
      const targetFilter = e.target
      const sibling = targetFilter.value === '300-600' ? targetFilter.nextSibling : targetFilter.value === '300>less' ?
      targetFilter.previousSibling : ''
  
      if((targetFilter.value === '300>less' || targetFilter.value === '300-600') && !Sibling){
          sibling.className = 'hidden'
          setSibling(true)
      } 
      else if(targetFilter.value === '300>less' || targetFilter.value === '300-600'){
          sibling.className = normalfilter
          setSibling(false)
      }
        
      newfilterArr.includes(targetFilter.value) ? 
      targetFilter.className = activefilter : targetFilter.className = normalfilter 
    
    }


    return(
        <div className='flex flex-wrap gap-3 mx-auto w-11/12'>

          <div className="filter flex flex-col gap-[0.1rem] text-white items-start cursor-pointer relative">
            <button className=" flex items-center gap-1 text-gray-600 font-medium rounded-3xl border px-3 py-2 shadow-xl
             text-sm outline-none shadow-gray-100" onClick={()=>setSort(!sort)}>
              Sort By 
              <IoIosArrowDown className='font-bold'/>
            </button> 
            <ul className={`${sort ? 'flex absolute top-[2.5rem]' : 'hidden'} p-1 cursor-pointer text-base flex-col 
            text-gray-600 bg-white rounded-xl border shadow font-medium z-30 w-[150px]`}
             onClick={(e)=>{
              handelSort(e)
              setSort(!sort)
             }}
            >
             <li value='0' className='hover:bg-[#FFE7C7] p-2 rounded'>Relevance</li>
              <li value='1' className='hover:bg-[#FFE7C7] p-2 rounded'>Price (high-Low)</li>
              <li value='2' className='hover:bg-[#FFE7C7] p-2 rounded'>Price (low-high)</li>
              <li value='3' className='hover:bg-[#FFE7C7] p-2  rounded'>Alphabet (a-z)</li>
              <li value='4' className='hover:bg-[#FFE7C7] p-2  rounded'>Alphabet (z-a)</li>
              <li value='5' className='hover:bg-[#FFE7C7] p-2 rounded'>Ratings</li>
           </ul>
          </div> 

          <button className={normalfilter} value='4.2+' onClick={handelActiveFilter}>
              Ratings 4.2+
          </button>
          <button className={normalfilter} value='veg' onClick={handelActiveFilter}>
              Pure Veg
          </button> 
          <button className={normalfilter} value='300-600' onClick={handelActiveFilter}>
              Rs. 300-Rs. 600
          </button>  
          <button className={normalfilter} value='300>less' onClick={handelActiveFilter}>
              Less than Rs. 300
          </button> 
        </div>
  
    )
}
export default Filters