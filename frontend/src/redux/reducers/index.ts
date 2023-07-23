import { combineReducers } from "@reduxjs/toolkit";
import authReducer ,{AuthSelector} from "./authReducer";

const rootReducer = combineReducers({
    auth: authReducer
})


export {
    rootReducer,
    AuthSelector
}