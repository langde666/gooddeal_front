const API = process.env.REACT_APP_API_URL;

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
