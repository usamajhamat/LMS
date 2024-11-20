import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user: null,
    isAuthenticated: false
}

const authReducer = createSlice({
    name:'AuthSlice',
    initialState,
    reducers:{
        userLoggedIn:(state, action) =>{
            state.user = action.payload.user
            state.isAuthenticated = true
        },
        userLoggedOut:(state) =>{
            state.user = null
            state.isAuthenticated = false
        }
    }
})

export const {userLoggedIn, userLoggedOut} = authReducer.actions
export default authReducer.reducer