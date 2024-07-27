import { createSlice } from "@reduxjs/toolkit";

const AuthSlice=createSlice({
    name:'auth',
    initialState:{
        isLogedin:false,//status
        userdata:null,
        
    },

    reducers:{

        userLogin:(state,action)=>{
            state.userdata=action.payload.userdata;
            state.isLogedin=true;
            

        },

        userLogout: (state,action)=>{
            state.userdata=null;
            state.isLogedin=false;
        },
    }


})

export const {userLogin,userLogout}=AuthSlice.actions;

export default AuthSlice.reducer;