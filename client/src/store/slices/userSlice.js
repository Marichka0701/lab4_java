import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {userService} from "../../services/user.service";

const initialState = {
    user: {},
    id: null,
}

const getById = createAsyncThunk(
    'userSlice/getById',
    async ({id}) => {
        try {
            const res = await userService.getById(id);

            return res;
        } catch (error) {
            throw error;
        }
    });

const updateById = createAsyncThunk(
    'userSlice/updateById',
    async ({id, data}) => {
        try {
            const res = await userService.updateById(id, data);

            return res;
        } catch (error) {
            throw error;
        }
    });

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {},
    extraReducers: builder => builder
        .addCase(getById.fulfilled, (state, action) => {
            state.user = action.payload.data.user;
            state.id = action.payload.data.user._id;
        })
        .addCase(updateById.fulfilled, (state, action) => {
            state.user = action.payload.data.user;
        })
});

const {actions, reducer: userReducer} = userSlice;

const userActions = {
    ...actions,
    getById,
    updateById
}

export {
    userActions,
    userReducer,
}