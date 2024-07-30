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
        }
    }
})

export const {setAllActivePosts,setAllPosts}=PostsSlice.actions;


export default PostsSlice.reducer