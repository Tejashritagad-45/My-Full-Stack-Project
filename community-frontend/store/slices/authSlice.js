import {createSlice} from "@reduxjs/toolkit"
const initialState={
    user:null,
    isLoggedIn:false
}

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        login:(state,action)=>{
             state.user=action.payload.user
             state.isLoggedIn=true

        },
        logOut:(state)=>{
            state.user=null
            state.isLoggedIn=false
        },
        makeHost:(state,action)=>{
            if(state.user){

                state.user.role="host"
            }
        }
    }
})

export const {login,logOut,makeHost} = authSlice.actions    
export default authSlice.reducer