const API = process.env.REACT_APP_API_URL;

export const listTransactionsByStore = (userId, token, filter, storeId) => {
    const { sortBy, order, limit, page } = filter;
    return fetch(
        `${API}/transactions/by/store/${storeId}/${userId}?sortBy=${sortBy}&order=${order}&limit=${limit}&page=${page}`,
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

export const listTransactionsForAdmin = (userId, token, filter) => {
    const { sortBy, order, limit, page } = filter;
    return fetch(
        `${API}/transactions/for/admin/${userId}?sortBy=${sortBy}&order=${order}&limit=${limit}&page=${page}`,
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

export const createTransactionByStore = (
    userId,
    token,
    transaction,
    storeId,
) => {
    return fetch(`${API}/transaction/create/by/store/${storeId}/${userId}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(transaction),
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));
};
