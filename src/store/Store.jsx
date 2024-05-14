import {configureStore} from "@reduxjs/toolkit";

import userReducer from './userSlice'
import organizerReducer from './organizerSlice'
import eventReducer from './eventsSlice';
import bookReducer from './BookingSlice';


const store = configureStore({
    reducer:{
        user:userReducer,
        organizer: organizerReducer,
        events:eventReducer,
        book:bookReducer
    }
})

export default store;