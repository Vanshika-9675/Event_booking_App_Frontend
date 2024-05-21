import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const STATUSES = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading'
});

export const fetchAllEvents = createAsyncThunk('fetch/events', async (_, { rejectWithValue }) => {
    try {
        const response = await fetch('https://event-booking-app-1.onrender.com/api/v1/user/events');
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
        const response = await fetch(`https://event-booking-app-1.onrender.com/api/v1/user/events/${value}`);
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


export const addEvent = createAsyncThunk(
    'add/event',
    async (eventDetails, { rejectWithValue }) => {
        try {
        const organizerToken = localStorage.getItem('organizerToken');
      const response = await fetch('https://event-booking-app-khy3.onrender.com/api/v1/organizer/event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${organizerToken}`,
        },
        body: JSON.stringify(eventDetails),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add event');
      }
      const res = await response.json();
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchOrgEvents = createAsyncThunk('fetch/OrgEvents', async (_, { rejectWithValue }) => {
    try {
        const organizerToken = localStorage.getItem('organizerToken');
        const response = await fetch('https://event-booking-app-khy3.onrender.com/api/v1/organizer/event',{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${organizerToken}`
            }  
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch events data');
        }
        const res = await response.json(); 
        return res.events; 
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const deleteEvent = createAsyncThunk(
    'delete/event',
    async (eventId, { rejectWithValue }) => {
      try {
        const organizerToken = localStorage.getItem('organizerToken');
        const response = await fetch(`https://event-booking-app-khy3.onrender.com/api/v1/organizer/event/${eventId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${organizerToken}`
          }
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to delete event');
        }
        
        const res = await response.json(); 
        return res; 
        
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );


export const editEvent = createAsyncThunk(
    'edit/event',
    async ({ eventId, newEvent } , { rejectWithValue }) => {
        
      try {
        const organizerToken = localStorage.getItem('organizerToken');
        const response = await fetch(`https://event-booking-app-khy3.onrender.com/api/v1/organizer/event/${eventId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${organizerToken}`
          },
          body: JSON.stringify(newEvent)
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to update event');
        }
  
        const res = await response.json();
        return res.data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  
  


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
            })
            .addCase(addEvent.pending, (state) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(addEvent.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = STATUSES.IDLE;
                state.error = null; 
            })
            .addCase(addEvent.rejected, (state, action) => {
                state.error = action.payload;
                state.status = STATUSES.ERROR;
            })
            .addCase(fetchOrgEvents.pending, (state) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(fetchOrgEvents.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = STATUSES.IDLE;
                state.error = null; 
            })
            .addCase(fetchOrgEvents.rejected, (state, action) => {
                state.error = action.payload;
                state.status = STATUSES.ERROR;
            }) .addCase(deleteEvent.pending, (state) => {
                state.status = STATUSES.LOADING;
              })
              .addCase(deleteEvent.fulfilled, (state, action) => {
                state.status = STATUSES.IDLE;
                state.events = action.payload;
              })
              .addCase(deleteEvent.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
                state.error = action.payload;
              })
             .addCase(editEvent.pending, (state) => {
                state.status = STATUSES.LOADING;
              })
              .addCase(editEvent.fulfilled, (state, action) => {
                state.status = STATUSES.IDLE;
                state.events = action.payload;
              })
              .addCase(editEvent.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
                state.error = action.payload;
              })
    }
});

export default eventsSlice.reducer;
