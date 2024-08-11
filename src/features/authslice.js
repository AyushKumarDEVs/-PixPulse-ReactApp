import { createSlice } from "@reduxjs/toolkit";

const AuthSlice=createSlice({
    name:'auth',
    initialState:{
        isLogedin:false,//status
        userdata:null,
        userprofile:null,
        usserposts:[],
        userfollowing:[],
        userfollowers:[],
        
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

        setuserfollowing(state,action){
            state.userfollowing=action.payload.userfollowing;
        },

        setuserfollowers(state,action){
            state.userfollowers=action.payload.userfollowers;
        },

        userLogout: (state,action)=>{
            state.userdata=null;
            state.isLogedin=false;
        },
    }


})

export const {userLogin,userLogout,setuserposts,setuserprofile,setuserfollowing,setuserfollowers}=AuthSlice.actions;

export default AuthSlice.reducer;