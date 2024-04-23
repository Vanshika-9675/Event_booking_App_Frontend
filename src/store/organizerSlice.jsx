import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const STATUSES = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading'
});


export const organizerRegister = createAsyncThunk('organizer/register', async (organizerData, { rejectWithValue }) => {
    try {
        const response = await fetch('https://event-booking-app-1.onrender.com/api/v1/organizer/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(organizerData),
        });
        if (!response.ok){
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to Register');
        }
        const data = await response.json();
        localStorage.setItem('organizerToken', data.token); 
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Organizer Login
export const organizerLogin = createAsyncThunk('organizer/login', async (loginData, { rejectWithValue }) => {
    try {
        const response = await fetch('https://event-booking-app-1.onrender.com/api/v1/organizer/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginData),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to Login');
        }
        const data = await response.json();
        localStorage.setItem('organizerToken', data.token);  
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Edit Organizer Profile
export const editOrganizerProfile = createAsyncThunk('organizer/editProfile', async (profileData, { getState, rejectWithValue }) => {
    const token = localStorage.getItem('organizerToken');
    if (!token) {
        return rejectWithValue('Authentication token not found');
    }

    try {
        const response = await fetch('https://event-booking-app-1.onrender.com/api/v1/organizer/edit', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(profileData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to edit profile');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Delete Organizer Profile
export const deleteOrganizerProfile = createAsyncThunk('organizer/deleteProfile', async (arg, { rejectWithValue }) => {
    const token = localStorage.getItem('organizerToken');
    if (!token) {
        return rejectWithValue('Authentication token not found');
    }

    try {
        const response = await fetch('https://event-booking-app-1.onrender.com/api/v1/organizer/delete', {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to delete profile');
        }

        localStorage.removeItem('organizerToken');  // Clearing token from localStorage
        return { success: true };
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Slice for handling organizer data and state
const organizerSlice = createSlice({
    name: 'organizer',
    initialState: {
        data: null,
        status: STATUSES.IDLE,
        error: null,
        isLoggedIn: Boolean(localStorage.getItem('organizerToken')) 
    },
    reducers: {
        logoutOrganizer(state) {
            state.data = null;
            state.isLoggedIn = false;
            localStorage.removeItem('organizerToken');  
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(organizerRegister.pending, (state) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(organizerRegister.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoggedIn = true;
                state.status = STATUSES.IDLE;
            })
            .addCase(organizerRegister.rejected, (state, action) => {
                state.error = action.payload;
                state.status = STATUSES.ERROR;
            })
            .addCase(organizerLogin.pending, (state) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(organizerLogin.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoggedIn = true;
                state.status = STATUSES.IDLE;
            })
            .addCase(organizerLogin.rejected, (state, action) => {
                state.error = action.payload;
                state.status = STATUSES.ERROR;
            })
            .addCase(editOrganizerProfile.pending, (state) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(editOrganizerProfile.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = STATUSES.IDLE;
            })
            .addCase(editOrganizerProfile.rejected, (state, action) => {
                state.error = action.payload;
                state.status = STATUSES.ERROR;
            })
            .addCase(deleteOrganizerProfile.pending, (state) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(deleteOrganizerProfile.fulfilled, (state, action) => {
                state.data = null;
                state.isLoggedIn = false;
                state.status = STATUSES.IDLE;
            })
            .addCase(deleteOrganizerProfile.rejected, (state, action) => {
                state.error = action.payload;
                state.status = STATUSES.ERROR;
            });
    }
});

export const { logoutOrganizer } = organizerSlice.actions;
export default organizerSlice.reducer;
