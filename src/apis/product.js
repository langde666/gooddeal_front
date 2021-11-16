const API = process.env.REACT_APP_API_URL;

export const getProductByIdForManager = (userId, token, productId, storeId) => {
    return fetch(
        `${API}/product/for/manager/${productId}/${storeId}/${userId}?`,
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

//list product
export const listProductsForManager = (userId, token, filter, storeId) => {
    const { search, sortBy, order, limit, page, isSelling } = filter;
    return fetch(
        `${API}/products/by/store/${storeId}/${userId}?search=${search}&isSelling=${isSelling}&sortBy=${sortBy}&order=${order}&limit=${limit}&page=${page}`,
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

//sell-store product
export const sellingProduct = (userId, token, value, storeId, productId) => {
    return fetch(`${API}/product/selling/${productId}/${storeId}/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(value),
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));
};

//crud
export const createProduct = (userId, token, product, storeId) => {
    return fetch(`${API}/product/create/${storeId}/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: product,
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));
};

export const updateProduct = (userId, token, product, productId, storeId) => {
    return fetch(`${API}/product/update/${productId}/${storeId}/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: product,
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));
};

//list listImages
export const addListImages = (userId, token, photo, productId, storeId) => {
    return fetch(`${API}/product/images/${productId}/${storeId}/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: photo,
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));
};

export const updateListImages = (
    userId,
    token,
    photo,
    index,
    productId,
    storeId,
) => {
    return fetch(
        `${API}/product/images/${productId}/${storeId}/${userId}?index=${index}`,
        {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: photo,
        },
    )
        .then((res) => res.json())
        .catch((error) => console.log(error));
};

export const removeListImages = (userId, token, index, productId, storeId) => {
    return fetch(
        `${API}/product/images/${productId}/${storeId}/${userId}?index=${index}`,
        {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
            },
        },
    )
        .then((res) => res.json())
        .catch((error) => console.log(error));
};