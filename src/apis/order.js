const API = process.env.REACT_APP_API_URL;

export const createOrder = (userId, token, cartId, order) => {
    return fetch(`${API}/order/create/${cartId}/${userId}`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(order),
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));
};

export const listOrdersByUser = (userId, token, filter) => {
    const { sortBy, order, limit, page } = filter;
    return fetch(
        `${API}/orders/by/user/${userId}?sortBy=${sortBy}&order=${order}&limit=${limit}&page=${page}`,
        {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        },
    )
        .then((res) => res.json())
        .catch((error) => console.log(error));
};

export const listOrdersByStore = (userId, token, filter, storeId) => {
    const { sortBy, order, limit, page } = filter;
    return fetch(
        `${API}/orders/by/store/${storeId}/${userId}?sortBy=${sortBy}&order=${order}&limit=${limit}&page=${page}`,
        {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        },
    )
        .then((res) => res.json())
        .catch((error) => console.log(error));
};

export const userCancelOrder = (userId, token, status, orderId) => {
    return fetch(`${API}/order/update/by/user/${orderId}/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(status),
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));
};

export const vendorUpdateStatusOrder = (
    userId,
    token,
    status,
    orderId,
    storeId,
) => {
    return fetch(
        `${API}/order/update/by/store/${orderId}/${storeId}/${userId}`,
        {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(status),
        },
    )
        .then((res) => res.json())
        .catch((error) => console.log(error));
};
