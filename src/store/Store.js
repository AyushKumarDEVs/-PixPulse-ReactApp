import {configureStore,} from "@reduxjs/toolkit"
import authsliceReducer from "../features/authslice"
import PostsSlicereducer from "../features/PostsSlice";
import ProfileSlicereducer from "../features/profileslice";


const store = configureStore({
    reducer: {
        auth: authsliceReducer,    
        postslice: PostsSlicereducer,
        profileslice: ProfileSlicereducer,
    }
});

export default store;
