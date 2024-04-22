import { suggestImg_Url } from "../utils/constants";
import { FaStar } from "react-icons/fa6"

const SearchRest = ( {cloudinaryImageId,name,avgRating,cuisines,costForTwoMessage,costForTwo}) => {

    return(
        <>
        <div className="flex w-[420px] p-[1.5rem] pb-[2.5rem] gap-[1.5rem] text-gray-700 cursor-pointer bg-white 
         smallM:p-[1rem] smallM:w-[100%]">
          <img alt="" src={suggestImg_Url+cloudinaryImageId} className="h-[90px] rounded-lg shadow-xl smallM:h-[70px]"/>
          <div className='flex flex-col justify-center'>
            <h3 className='font-bold smallM:text-sm'>{name}</h3>
            <h4 className="font-medium flex items-center gap-1 text-sm text-gray-500 smallM:text-xs">
              <FaStar className='rounded-[50%]'/>
              {avgRating}
              <span>. {costForTwoMessage || costForTwo}</span>
            </h4>
            <h4 className='text-sm text-gray-400 smallM:text-xs'>{cuisines.join(' , ')}</h4>
          </div>
        </div>
        </>
          
    )

}
export default SearchRest