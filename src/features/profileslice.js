import { createSlice } from "@reduxjs/toolkit";


const profileslice=createSlice({
    name:"profileslice",
    initialState:{
        AllProfile:[],
    },

    reducers:{
        SetAllProfile:(state,action)=>{
            state.AllProfile=action.payload.AllProfile;
        },
        setprofile:(state,action)=>{
            state.AllProfile=state.AllProfile.map((each)=>(each.$id===action.payload.profile.$id? action.payload.profile:each))
        }
    }
})

export const{SetAllProfile,setprofile}=profileslice.actions;

export default profileslice.reducer;