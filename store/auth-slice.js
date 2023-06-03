import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: null,
        userData: null,
        didTryAutoLogin: false
    },
    reducers: {
        authenticate: (state, action) => {
            const { payload } = action;
            state.token = payload.token;
            state.userData = payload.userData;
            console.log(JSON.stringify(state, 0, 2));
        },
        setDidTryAutologin: (state, action) => {
            state.didTryAutoLogin = true;
        }
    }
});
export const authenticate = authSlice.actions.authenticate;
export const setDidTryAutologin = authSlice.actions.setDidTryAutologin;

export default authSlice.reducer;