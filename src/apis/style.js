const API = process.env.REACT_APP_API_URL;

export const listStyles = (userId, token, filter) => {
    const { search, sortBy, order, limit, page, categoryId } = filter;
    return fetch(
        `${API}/styles/${userId}?search=${search}&categoryId=${categoryId}&sortBy=${sortBy}&order=${order}&limit=${limit}&page=${page}`,
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

export const createStyle = (userId, token, style) => {
    return fetch(`${API}/style/create/${userId}`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(style),
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));
};

export const updateStyle = (userId, token, styleId, style) => {
    return fetch(`${API}/style/${styleId}/${userId}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(style),
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));
};

export const removeStyle = (userId, token, styleId) => {
    return fetch(`${API}/style/${styleId}/${userId}`, {
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

export const restoreStyle = (userId, token, styleId) => {
    return fetch(`${API}/style/restore/${styleId}/${userId}`, {
        method: 'GET',
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

//style value
export const listStyleValues = (userId, token, styleId) => {
    return fetch(`${API}/style/values/by/style/${styleId}/${userId}`, {
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

export const removeStyleValue = (userId, token, styleValueId) => {
    return fetch(`${API}/style/value/${styleValueId}/${userId}`, {
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

export const restoreStyleValue = (userId, token, styleValueId) => {
    return fetch(`${API}/style/value/restore/${styleValueId}/${userId}`, {
        method: 'GET',
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
