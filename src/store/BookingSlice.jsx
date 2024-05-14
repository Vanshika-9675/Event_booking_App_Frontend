import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const STATUSES = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading'
});

export const Bookticket = createAsyncThunk('user/book', async (bookingData, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('token');
        const {ticketId,eventId} = bookingData;
        const response = await fetch(`http://localhost:3000/api/v1/user/book/${eventId}/${ticketId}`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
             },

            body: JSON.stringify(bookingData),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to Register');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});


const bookingSlice = createSlice({
    name: 'bookings',
    initialState: {
        data: null,
        status: STATUSES.IDLE,
        error: null,
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(Bookticket.pending, (state) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(Bookticket.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = STATUSES.IDLE;
                state.error = null; 
            })
            .addCase(Bookticket .rejected, (state, action) => {
                state.error = action.payload;
                state.status = STATUSES.ERROR;
            });
    }
});

export default bookingSlice.reducer;
