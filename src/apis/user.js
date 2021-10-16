import { refreshToken, getToken } from './auth';
const API = process.env.REACT_APP_API_URL;
const jwt = require('jsonwebtoken');

export const getUserProfile = async (userId, token) => {
    //user validate
    const { refreshToken: rfToken } = getToken();
    const decoded = jwt.decode(token);
    const timeout = decoded.exp * 1000 - 60 * 1000;
    setTimeout(() => {
        refreshToken(rfToken);
    }, timeout);

    // getuser
    return fetch(`${API}/user/profile/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));
};

export const updateAvatar = (userId, token, photo) => {
    return fetch(`${API}/user/avatar/${userId}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: photo,
    })
        .then(res => res.json())
        .catch(error => console.log(error));
}

export const updateCover = (userId, token, photo) => {
    return fetch(`${API}/user/cover/${userId}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: photo,
    })
        .then(res => res.json())
        .catch(error => console.log(error));
}

export const updateProfile = (userId, token, user) => {
    return fetch(`${API}/user/profile/${userId}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
    })
        .then(res => res.json())
        .catch(error => console.log(error));
}

export const updatePassword = (userId, token, user) => {
    return fetch(`${API}/user/password/${userId}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
    })
        .then(res => res.json())
        .catch(error => console.log(error));
}

export const getUserLevel = (userId) => {
    return fetch(`${API}/user/level/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));
}

export const sendConfirmationEmail = (userId, token) => {
    return fetch(`${API}/confirm/email/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));
}

export const verifyEmail = (emailCode) => {
    return fetch(`${API}/verify/email/${emailCode}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));
}

export const getUser = (userId) => {
    return fetch(`${API}/user/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));
}

export const addAddress = (userId, token, address) => {
    return fetch(`${API}/user/address/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(address),
    })
        .then(res => res.json())
        .catch(error => console.log(error));
}

export const removeAddresses = (userId, token, index) => {
    return fetch(`${API}/user/address/${userId}?index=${index}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })
        .then(res => res.json())
        .catch(error => console.log(error));
}

export const updateAddress = (userId, token, index, address) => {
    return fetch(`${API}/user/address/${userId}?index=${index}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(address),
    })
        .then(res => res.json())
        .catch(error => console.log(error));
}

export const getlistUsers = (filter) => {
    const { search, sortBy, order, limit, page, role } = filter;

    return fetch(`${API}/users?search=${search}&role=${role}&sortBy=${sortBy}&order=${order}&limit=${limit}&page=${page}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    })
        .then(res => res.json())
        .catch(error => console.log(error));
}