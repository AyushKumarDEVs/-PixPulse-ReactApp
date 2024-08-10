import { createSlice } from '@reduxjs/toolkit'

const PostsSlice=createSlice({
    name:"postslice",
    initialState:{
        AllActivePosts:[],
        AllPosts:[],
    },
    reducers:{
        setAllActivePosts(state,action){
           
            state.AllActivePosts=action.payload.AllActivePosts;
        },

        setAllPosts(state,action){
            state.AllPosts=action.payload.AllPosts;
        },

        updateallpost(state,action){
state.AllPosts = state.AllPosts.map((each) =>
  each.$id === action.payload.post.$id ? action.payload.post : each
);
        }
    }
})

export const {setAllActivePosts,setAllPosts,updateallpost}=PostsSlice.actions;


export default PostsSlice.reducer