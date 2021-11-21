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
