import {configureStore} from "@reduxjs/toolkit";

import userReducer from './userSlice'
import organizerReducer from './organizerSlice'
import eventReducer from './eventsSlice';


const store = configureStore({
    reducer:{
        user:userReducer,
        organizer: organizerReducer,
        events:eventReducer
    }
})

export default store;