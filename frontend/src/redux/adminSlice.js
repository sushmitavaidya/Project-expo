// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// // Thunks for fetching data
// export const fetchUsers = createAsyncThunk('admin/fetchUsers', async (_, thunkAPI) => {
//   try {
//     const response = await axios.get('/api/admin/users');
//     return response.data.users;
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error.response.data.message || 'Failed to fetch users');
//   }
// });

// export const fetchBookings = createAsyncThunk('admin/fetchBookings', async (_, thunkAPI) => {
//   try {
//     const response = await axios.get('/api/admin/bookings');
//     return response.data.bookings;
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error.response.data.message || 'Failed to fetch bookings');
//   }
// });

// export const deleteUser = createAsyncThunk('admin/deleteUser', async (userId, thunkAPI) => {
//   try {
//     await axios.delete(`/api/admin/users/${userId}`);
//     return userId;
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error.response.data.message || 'Failed to delete user');
//   }
// });

// export const updateBookingStatus = createAsyncThunk(
//   'admin/updateBookingStatus',
//   async ({ bookingId, status }, thunkAPI) => {
//     try {
//       const response = await axios.put(`/api/admin/bookings/${bookingId}`, { status });
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data.message || 'Failed to update booking');
//     }
//   }
// );

// // Admin slice
// const adminSlice = createSlice({
//   name: 'admin',
//   initialState: {
//     users: [],
//     bookings: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     // Fetch Users
//     builder
//       .addCase(fetchUsers.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchUsers.fulfilled, (state, action) => {
//         state.loading = false;
//         state.users = action.payload;
//       })
//       .addCase(fetchUsers.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });

//     // Fetch Bookings
//     builder
//       .addCase(fetchBookings.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchBookings.fulfilled, (state, action) => {
//         state.loading = false;
//         state.bookings = action.payload;
//       })
//       .addCase(fetchBookings.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });

//     // Delete User
//     builder
//       .addCase(deleteUser.fulfilled, (state, action) => {
//         state.users = state.users.filter((user) => user._id !== action.payload);
//       });

//     // Update Booking Status
//     builder
//       .addCase(updateBookingStatus.fulfilled, (state, action) => {
//         const updatedBooking = action.payload;
//         state.bookings = state.bookings.map((booking) =>
//           booking._id === updatedBooking._id ? updatedBooking : booking
//         );
//       });
//   },
// });

// export default adminSlice.reducer;
