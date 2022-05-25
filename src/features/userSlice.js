import { createSlice } from '@reduxjs/toolkit'

//initialState define here
const initialState = {
  user: null,
  token: "",
  inLoginPage: false,
}

export const userInfoSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        login: (state, {payload}) =>{
            return {...state, user:payload.userInfo, token:payload.token}
        },

    }
})

//Reducer Action
export const { login } = userInfoSlice.actions;

export default userInfoSlice.reducer;