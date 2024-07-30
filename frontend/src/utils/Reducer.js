/*import { LOGIN_SUCCESS, LOGOUT } from "../features/user/actions";
const initialState = {
    isAuthenticated: false,
    user: null,
};
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: action.playload,
            };
        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            };
        default: return state;
    }
};
export default authReducer;*/


import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
export const userStore = configureStore({
    reducer: {
        user: userReducer,
    },
});
export default userStore;