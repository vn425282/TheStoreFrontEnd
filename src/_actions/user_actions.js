import axios from "axios";
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    ADD_TO_CART_USER,
    GET_CART_ITEMS_USER,
    REMOVE_CART_ITEM_USER,
    ON_SUCCESS_BUY_USER
} from "./types";
import { API_ENDPOINT } from "../components/Config.js";

export function registerUser(dataToSubmit) {
    const request = axios.post(`${API_ENDPOINT}user/register`, dataToSubmit)
        .then((response) => response.data)
        .catch((error) => error.response.data)

    return {
        type: REGISTER_USER,
        payload: request
    };
}

export function loginUser(dataToSubmit) {
    const request = axios.post(`${API_ENDPOINT}user/login`, dataToSubmit)
        .then((response) => response.data);
    return {
        type: LOGIN_USER,
        payload: request
    };
}

export function auth() {
    const request = axios.get(`${API_ENDPOINT}user/auth`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    })
        .then((response) => response.data)
        .catch((error) => error.response.status);

    return {
        type: AUTH_USER,
        payload: request
    };
}

export function logoutUser() {
    const request = axios.get(`${API_ENDPOINT}user/logout`)
        .then((response) => response.data);

    return {
        type: LOGOUT_USER,
        payload: request
    };
}

export function addToCart(_idProduct) {
    const request = axios.post(`${API_ENDPOINT}user/addToCart`, {productID: _idProduct}, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    })
        .then((response) => response.data);

    return {
        type: ADD_TO_CART_USER,
        payload: request
    };
}

export function getCartItems() {
    const request = axios.get(API_ENDPOINT + `/user/getUserCart`,{
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    })
        .then((response) => {
            console.log(response.data);
            const cartItems = response.data.data;
            return cartItems;
        });

    return {
        type: GET_CART_ITEMS_USER,
        payload: request
    };
}

export function removeCartItem(id) {
    const request = axios.get(`/api/users/removeFromCart?_id=${id}`)
        .then((response) => {
            response.data.cart.forEach((item) => {
                response.data.cartDetail.forEach((k, i) => {
                    if (item.id === k._id) {
                        response.data.cartDetail[i].quantity = item.quantity;
                    }
                });
            });
            return response.data;
        });

    return {
        type: REMOVE_CART_ITEM_USER,
        payload: request
    };
}

export function onSuccessBuy(data) {
    const request = axios.post(`${API_ENDPOINT}/user/successBuy`, data)
        .then((response) => response.data);

    return {
        type: ON_SUCCESS_BUY_USER,
        payload: request
    };
}
