import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {pizzaService} from "../../services/pizza.service";


const initialState = {
    pizzas: [],
    customPizza: {
        type: 'тонке',
        size: '26см',
        ingredients: []
    },
    orders: []
}

const getAll = createAsyncThunk(
    'pizzaSlice/getAll',
    async () => {
        try {
            const res = await pizzaService.getAll();

            return res;
        } catch (error) {
            throw error;
        }
    });

const getById = createAsyncThunk(
    'pizzaSlice/getById',
    async ({id}) => {
        try {
            const res = await pizzaService.getById(id);

            return res;
        } catch (error) {
            throw error;
        }
    });




const pizzaSlice = createSlice({
    name: 'pizzaSlice',
    initialState,
    reducers: {
        setCustomPizza: (state, action) => {
            state.customPizza = action.payload;
        },
        setOrders: (state, action) => {
            state.orders = action.payload;
        }
    },
    extraReducers: builder => builder
        .addCase(getAll.fulfilled, (state, action) => {
            state.pizzas = action.payload.data.pizzas;
        })
});

const {actions, reducer: pizzaReducer} = pizzaSlice;

const pizzaActions = {
    ...actions,
    getAll,
    getById
}

export {
    pizzaActions,
    pizzaReducer,
}