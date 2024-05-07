import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const STATUSES = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading'
});

export const fetchAllEvents = createAsyncThunk('fetch/events', async (_, { rejectWithValue }) => {
    try {
        const response = await fetch('http://localhost:3000/api/v1/user/events');
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch events data');
        }
        const res = await response.json(); // Parse response body
        console.log(res.data);
        return res.data; // Return the fetched data
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const fetchSingleEvent = createAsyncThunk( 'fetch/event', async (value, { rejectWithValue}) => {
    try{
        const response = await fetch(`http://localhost:3000/api/v1/user/events/${value}`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch events data');
        }
        const res = await response.json();
        return res.data; 
    } catch (error) {
        return rejectWithValue(error.message);
    }
});


const eventsSlice = createSlice({
    name: 'events',
    initialState: {
        data: null,
        status: STATUSES.IDLE,
        error: null,
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllEvents.pending, (state) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(fetchAllEvents.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = STATUSES.IDLE;
                state.error = null; 
            })
            .addCase(fetchAllEvents.rejected, (state, action) => {
                state.error = action.payload;
                state.status = STATUSES.ERROR;
            })
            .addCase(fetchSingleEvent.pending, (state) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(fetchSingleEvent.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = STATUSES.IDLE;
                state.error = null; 
            })
            .addCase(fetchSingleEvent.rejected, (state, action) => {
                state.error = action.payload;
                state.status = STATUSES.ERROR;
            });
    }
});

export default eventsSlice.reducer;
