import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const STATUSES = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading'
});


export const userSignup = createAsyncThunk('user/signup', async (userData, { rejectWithValue }) => {
    try {
        const response = await fetch('https://event-booking-app-1.onrender.com/api/v1/user/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to Register');
        }
        const data = await response.json();
        localStorage.setItem('token', data.token); 
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const userLogin = createAsyncThunk('user/login', async (userData, { rejectWithValue }) => {
    try {
        const response = await fetch('http://localhost:3000/api/v1/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to Login');
        }
        const data = await response.json();
        localStorage.setItem('token', data.token);
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const editProfile = createAsyncThunk('user/editProfile', async (userData, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return rejectWithValue('Authentication token not found');
    }

    try {
        const response = await fetch('https://event-booking-app-1.onrender.com/api/v1/user/edit', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(userData),
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

export const deleteProfile = createAsyncThunk( 'user/deleteProfile',async (arg, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return rejectWithValue('Authentication token not found');
    }

    try {
        const response = await fetch('https://event-booking-app-1.onrender.com/api/v1/user/delete', {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to delete profile');
        }

        localStorage.removeItem('token');
        return { success: true };
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        data: null,
        status: STATUSES.IDLE,
        error: null,
        isLoggedIn: Boolean(localStorage.getItem('token')) 
    },
    reducers: {
        logoutUser(state) {
            state.data = null;
            state.isLoggedIn = false;
            localStorage.removeItem('token');  
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(userSignup.pending, (state) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(userSignup.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoggedIn = true;
                state.status = STATUSES.IDLE;
            })
            .addCase(userSignup.rejected, (state, action) => {
                state.error = action.payload;
                state.status = STATUSES.ERROR;
            })
            .addCase(userLogin.pending, (state) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoggedIn = true;
                state.status = STATUSES.IDLE;
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.error = action.payload;
                state.status = STATUSES.ERROR;
            })
            .addCase(editProfile.pending, (state) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(editProfile.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = STATUSES.IDLE;
            })
            .addCase(editProfile.rejected, (state, action) => {
                state.error = action.payload;
                state.status = STATUSES.ERROR;
            })
            .addCase(deleteProfile.pending, (state) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(deleteProfile.fulfilled, (state, action) => {
                state.data = null;
                state.isLoggedIn = false;
                state.status = STATUSES.IDLE;
            })
            .addCase(deleteProfile.rejected, (state, action) => {
                state.error = action.payload;
                state.status = STATUSES.ERROR;
            });
    }
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
