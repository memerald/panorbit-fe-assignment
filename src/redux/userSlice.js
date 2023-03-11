import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
	userDataLoading: false,
	userData: [],
	currentUser: [],
};

const userSlice = createSlice({
	name: "user",
	initialState: initialState,
	extraReducers: (builder) => {
		builder
			.addCase(getUsers.pending, (state) => {
				state.userDataLoading = true;
			})
			.addCase(getUsers.fulfilled, (state, action) => {
				state.userData = action.payload;
				state.userDataLoading = false;
			})
			.addCase(getUsers.rejected, (state) => {
				state.userDataLoading = false;
			})
			.addCase(getCurrentUser.fulfilled, (state, action) => {
				state.currentUser = action.payload;
			});
	},
});

export default userSlice.reducer;

export const getUsers = createAsyncThunk("user/userData", async () => {
	let data = await axios.get("https://panorbit.in/api/users.json");
	return data.data;
});

export const getCurrentUser = createAsyncThunk("user/currentUser", async (user) => {
	return user;
});
