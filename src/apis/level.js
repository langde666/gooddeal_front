const API = process.env.REACT_APP_API_URL;

//user level
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

// store level
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