import { createSlice } from "@reduxjs/toolkit";

export const modalInitialState = {
    modelOpen: false, 
    disable: true,
};

export const modalSlice = createSlice({
    name: "modal",
    initialState: modalInitialState,
    reducers: {
        setModelStatus: (state, action) => {
            state.modelOpen = action.payload.modelOpen; 
        },
        setDisable: (state, action) => {
            state.disable = action.payload.disable;
        },
    },
});

export const { setModelStatus, setDisable } = modalSlice.actions;
