import {createSlice} from "@reduxjs/toolkit";
import {loadRegisteredUsers} from "../thunks/loadRegisteredUsers.js";

/**
 * @description Slice to handle contact list
 * @type {Slice<{registeredUsers: *[], loading: boolean, error: null}, {}, string>}
 */
const contactListSlice = createSlice({
    name: "contactList",
    initialState: {
        loading: false,
        error: null,
        registeredUsers: [],
    },
    reducers: {},

    extraReducers(builder) {
        builder.addCase(loadRegisteredUsers.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(loadRegisteredUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.registeredUsers = action.payload;


        });

        builder.addCase(loadRegisteredUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;

        });

    },
});

export const contactListReducer = contactListSlice.reducer;

