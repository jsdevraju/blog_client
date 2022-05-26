import { createSlice } from '@reduxjs/toolkit'

//initialState define here
const initialState = {
    blog: null,
}

export const blogSlice = createSlice({
    name:'blog',
    initialState,
    reducers:{
        getPosts: (state, {payload}) =>{
            return {...state, blog:payload}
        },
        getSinglePost:(state, {payload}) =>{
            return {...state, singlePost:payload}
        }

    }
})

//Reducer Action
export const { getPosts, getSinglePost } = blogSlice.actions;

export default blogSlice.reducer;