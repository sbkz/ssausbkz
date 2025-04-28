import { createSlice } from "@reduxjs/toolkit";

type initialStateType = {
    mapModalCondition: boolean
}

const initialState: initialStateType = {
    mapModalCondition: false,
}

const mapModalSlice = createSlice({
    name: 'mapModal',
    initialState,
    reducers: {
        openModal(state){
            state.mapModalCondition = true;
        },
        closeModal(state){
            state.mapModalCondition = false;
        }
    }
});
export const {openModal, closeModal} = mapModalSlice.actions;
export default mapModalSlice.reducer;