import {configureStore,} from "@reduxjs/toolkit"
import authsliceReducer from "../features/authslice"
import PostsSlicereducer from "../features/PostsSlice";


const store = configureStore({
    reducer: {
        auth: authsliceReducer,    // Name it 'auth' or another descriptive key
        postslice: PostsSlicereducer  // Name it 'posts' or another descriptive key
    }
});

export default store;
