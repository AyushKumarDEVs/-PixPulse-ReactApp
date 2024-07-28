import { createSlice } from '@reduxjs/toolkit'

const PostsSlice=createSlice({
    name:"postslice",
    initialState:{
        AllActivePosts:null,
        AllPosts:null,
    },
    reducers:{
        setAllActivePosts(state,action){
            state.is=true;
            console.log(action.payload.AllActivePosts)
            state.AllActivePosts=action.payload.AllActivePosts;
        },

        setAllPosts(state,action){
            state.AllPosts=action.payload.AllPosts;
        }
    }
})

export const {setAllActivePosts,setAllPosts}=PostsSlice.actions;


export default PostsSlice.reducer