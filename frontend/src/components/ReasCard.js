import { CDN_URL } from "../utils/constants";
import { FaStar } from "react-icons/fa6"
import { LuVegan } from "react-icons/lu"

const ReasCard = ({cloudinaryImageId,name,avgRating,cuisines,costForTwo}) => {
 
   return(
     <div className={`flex-col w-[300px] p-3 rounded-lg hover:scale-95 text-gray-700 vrySmall:w-screen`}>
      <img alt="" src={CDN_URL+cloudinaryImageId} className='w-[100%] h-[187px] rounded-lg shadow-xl mx-auto'/>
      <h3 className="font-medium mt-3 text-lg truncate">{name}</h3>
      <h4 className="font-semibold flex items-center gap-1">
         <FaStar className='rounded-[50%] bg-green-600 text-white p-1 text-lg'/>
         {avgRating}
      </h4>
      <h4 className='truncate'>{cuisines.join(' , ')}</h4>
      <h4>{costForTwo}</h4>
      </div>
   )
}

/* Higher Order func. */
export const withVegReasCard = (ReasCard) => {
   return (props) => {
    return (
       <div className='relative'>
         <label className='absolute left-0 top-0 text-green-500 bg-white rounded-[50%] p-1 text-[1.85rem] z-10'>
           <LuVegan />
         </label>
         <ReasCard {...props}/>
       </div>
    )
   }

}

export default ReasCard;