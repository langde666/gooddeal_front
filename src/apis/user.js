import { refreshToken, getToken } from './auth';
const API = process.env.REACT_APP_API_URL;
const jwt = require('jsonwebtoken');

export const getUserProfile = async (userId, token, rfToken) => {
    //user validate
    const decoded = jwt.decode(token);
    const timeout = decoded.exp * 1000 - 60 * 1000;
    if (Date.now() >= timeout) {
        await refreshToken(rfToken);
        const { accessToken } = getToken();
        token = accessToken;
    } else {
        setTimeout(() => {
            refreshToken(rfToken);
        }, timeout);
    }

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

export const updateAccount = (userId, token, user) => {
    return fetch(`${API}/user/account/${userId}`, {
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