const API = process.env.REACT_APP_API_URL;

export const getCartCount = (userId, token) => {
    return fetch(`${API}/cart/count/${userId}`, {
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

export const addToCart = (userId, token, cartItem) => {
    return fetch(`${API}/cart/add/${userId}`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cartItem),
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));
};

export const listCarts = (userId, token, filter) => {
    const { limit, page } = filter;
    return fetch(`${API}/carts/${userId}?limit=${limit}&page=${page}`, {
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

export const listItemsByCard = (userId, token, cartId) => {
    return fetch(`${API}/cart/items/${cartId}/${userId}`, {
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

export const removeFromCart = (userId, token, cartItemId) => {
    return fetch(`${API}/cart/remove/${cartItemId}/${userId}`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));
};
