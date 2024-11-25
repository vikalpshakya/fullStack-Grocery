import {combineReducers } from "redux"
import userReducer from "./userReducer";
import alertReducer from "./alertReducer";
import ProductReducer from "./productReducer";
import allUserReducer from "./allUserReducer";
import cartReducer from "./cartReducer";
import displayCartReducer from "./displayCartReducer";
import ordersReducer from "./ordersReducer";

const myReducers = combineReducers({
    user : userReducer,
    alert : alertReducer,
    products: ProductReducer,
    allUsers: allUserReducer,
    cart : cartReducer,
    isCart: displayCartReducer,
    orders: ordersReducer,

});

export default myReducers;