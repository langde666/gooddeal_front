const API = process.env.REACT_APP_API_URL;

export const getStoreProfile = (userId, token, storeId) => {
    return fetch(`${API}/store/profile/${storeId}/${userId}`, {
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

export const createStore = (userId, token, store) => {
    return fetch(`${API}/store/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(store),
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));
}

export const updateAvatar = (userId, token, photo, storeId) => {
    return fetch(`${API}/store/avatar/${storeId}/${userId}`, {
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

export const updateCover = (userId, token, photo, storeId) => {
    return fetch(`${API}/store/cover/${storeId}/${userId}`, {
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

export const updateProfile = (userId, token, store, storeId) => {
    return fetch(`${API}/store/${storeId}/${userId}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(store),
    })
        .then(res => res.json())
        .catch(error => console.log(error));
}

export const getStoreLevel = (storeId) => {
    return fetch(`${API}/store/level/${storeId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));
}