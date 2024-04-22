import {createSlice} from '@reduxjs/toolkit'

const paymentSlice = createSlice({
    name : 'payment',
    initialState : {
       orders:[],
       payments:[]
    },
    reducers : {
        setOrders: (state,action) => {

        },
        setpayments: (state,action) => {
            
        }
    }
})

export const {setOrders,setpayments} = paymentSlice.actions
export default paymentSlice.reducer