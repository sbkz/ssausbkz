import { createSlice } from "@reduxjs/toolkit";

type initialStatesType = {
    menuCondition: boolean
}

const initialState: initialStatesType = {
    menuCondition: false,
}

const MenuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        openMenu(state){
            state.menuCondition = true;
        },
        closeMenu(state){
            state.menuCondition = false;
        }
    }
})
export const {openMenu, closeMenu} = MenuSlice.actions;
export default MenuSlice.reducer;