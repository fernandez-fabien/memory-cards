import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { LOGIN_API } from '../config';

let token;

function setup() {
    const token = window.localStorage.getItem("authToken")

    if (token) {
        const { exp: expiration } = jwtDecode(token)
        if (expiration * 1000 > new Date().getTime()) {
            setAxiosToken(token)
            return true
        } 
    }

    return false
}

function setAxiosToken(token) {
    axios.defaults.headers["Authorization"] = "Bearer " + token
}

function logout() {
    window.localStorage.removeItem("authToken")
    delete axios.defaults.headers["Authorization"]
}

function authentificate(credentials) {
    return axios
        .post(LOGIN_API, credentials)
        .then(response => response.data.token)
        .then(token => {
            // Stockage du token dans le localStorage
            window.localStorage.setItem("authToken", token)
            // On prévient axios qu'on a maintenant un header par défaut
            setAxiosToken(token)

            return true
        })
}

export default {
    setup,
    logout,
    authentificate
}