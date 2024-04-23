import {configureStore} from "@reduxjs/toolkit";

import userReducer from './userSlice'
import organizerReducer from './organizerSlice'


const store = configureStore({
    reducer:{
        user:userReducer,
        organizer: organizerReducer,
    }
})

export default store;