import {createSlice} from '@reduxjs/toolkit'

const restListSlice = createSlice({
    name : 'restList',
    initialState : {
        ListOfCards : [],
        FilterCards : []
    },
    reducers : {
        setListOfCards : (state,action) => {
            state.ListOfCards = action.payload
        },
        setFilterCards : (state,action) => {
            state.FilterCards = action.payload
        }
    }
})

export const {setListOfCards,setFilterCards} = restListSlice.actions
export default restListSlice.reducer