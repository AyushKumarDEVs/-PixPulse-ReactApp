import { createSlice } from "@reduxjs/toolkit";

const AuthSlice=createSlice({
    name:'auth',
    initialState:{
        isLogedin:false,//status
        userdata:null,
        userprofile:null,
        usserposts:[],
        
    },

    reducers:{

        userLogin:(state,action)=>{
            
            state.userdata=action.payload.userdata;
            state.isLogedin=true;
            

        },

        setuserprofile(state,action){
            state.userprofile=action.payload;
        },

        setuserposts(state,action){
            state.usserposts=action.payload.userposts;
        },

        userLogout: (state,action)=>{
            state.userdata=null;
            state.isLogedin=false;
        },
    }


})

export const {userLogin,userLogout,setuserposts,setuserprofile}=AuthSlice.actions;

export default AuthSlice.reducer;