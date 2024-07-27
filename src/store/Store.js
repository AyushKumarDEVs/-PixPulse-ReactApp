import {configureStore,} from "@reduxjs/toolkit"
import authsliceReducer from "../features/authslice"


const Store=configureStore({
    reducer: authsliceReducer
});

export default Store;
