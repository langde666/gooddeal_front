const API = process.env.REACT_APP_API_URL;

export const listReviews = (filter) => {
    const { productId, storeId, userId, rating, sortBy, order, limit, page } =
        filter;

    return fetch(
        `${API}/reviews?productId=${productId}&storeId=${storeId}&userId=${userId}&rating=${rating}&sortBy=${sortBy}&order=${order}&limit=${limit}&page=${page}`,
        {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        },
    )
        .then((res) => res.json())
        .catch((error) => console.log(error));
};
