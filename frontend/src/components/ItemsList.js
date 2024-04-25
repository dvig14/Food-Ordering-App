import React,{useContext} from 'react'
import {CDN_URL} from '../utils/constants'
import AddItemBtn from './AddItemBtn'
import {useSelector} from 'react-redux'
import {LocationContext} from '../utils/LocationContext'

const ItemsList = ({items}) => {

  const countVal = useSelector((store) => store.cart.count)
  const {isCart} = useContext(LocationContext)

  return(
    <div className={`${isCart ? 'w-[100%] bg-white' : 'w-full'}`}>
      {
        items.map((item)=>(
           
          <div key={item.card.info.id} className={`flex py-3 px-4 my-1 ${isCart ? 
            'items-center justify-between text-gray-800' : 'text-left gap-3 justify-between border-b-2'}`}
           >

            <div className={`flex flex-col gap-2 ${isCart ? 'text-left w-7/12 mx-1' : 'w-10/12'}`}>

              <span className={isCart ? 'font-medium text-sm': 'font-bold mobile:text-sm'}>{item.card.info.name}</span>

              <span className={isCart ? 'font-medium text-sm': 'font-medium mobile:text-sm'}>
                 Rs - {item.card.info.price ? (item.card.info.price / 100) : (item.card.info.defaultPrice / 100)}
              </span>

              <p className={`${isCart ? 'hidden' : 'text-slate-600 text-sm mb-1 mobile:text-xs'}`}>
                {item.card.info.description}
              </p>

            </div>

            <div className={`${isCart ? 'font-medium text-sm flex items-center ' : 'hidden'}`}>

            { isCart && 
              <AddItemBtn 
                 eachItemCount = {countVal.map((val)=> val.itemId === item?.card?.info?.id ? val.count : null)}
                  val = {countVal}
                  item = {item}
              />
            }
            </div>

            <div className={`${isCart ? '' : 'flex flex-col w-[120px] mobile:w-[110px] font-bold h-[100px]'}`}>

              {
                item.card.info.imageId ?
                <img src={CDN_URL + item.card.info.imageId} className={`rounded-sm ${isCart ? 'hidden' : 
                'h-20 mobile:h-16'}`} alt=''/> : ''
              }
              {
                !isCart && 
                <AddItemBtn 
                  eachItemCount = {countVal.map((val)=> val.itemId === item?.card?.info?.id ? val.count : null)}
                  val = {countVal}
                  item = {item}
                />
              }

            </div>

          </div>
        ))
     } 
    </div>
  )
}
export default ItemsList
