//Whenever there is loading time it should show some alert
//So redux is used here to handle the state of the app

import {createSlice} from '@reduxjs/toolkit';

const alertsSlice = createSlice({
    name: 'alerts',
    initialState: {
        loading : false,
    },
    reducers: {
        ShowLoading:(state, action) => {
            state.loading = true;
        },
        HideLoading:(state, action) =>{
            state.loading = false;
        }
    }
});

export const {ShowLoading, HideLoading} = alertsSlice.actions;
export default alertsSlice.reducer;