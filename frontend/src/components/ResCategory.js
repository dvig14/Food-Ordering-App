import React from 'react'
import ItemsList from './ItemsList'

const ResCategory = ({title,itemCards,showItemList,setShowIndex,showSign}) => {
    
  const toogleList = () => setShowIndex()

    return(

        <div className="bg-white laptop:w-7/12 tablet:w-9/12 mobile:w-[90%] my-[0.8rem] mx-auto shadow-md shadow-gary-200">

          <div className='p-4 shadow-md shadow-gray-200 font-bold flex justify-between items-center rounded'>

            <span>{`${title} (${itemCards.length })`}</span>

            <span className='text-2xl cursor-pointer text-orange-500'
              onClick={toogleList}
            >
             {showSign}
            </span>
            
          </div>

          {showItemList && <ItemsList items={itemCards}/>}

        </div>

    )
}

export default ResCategory