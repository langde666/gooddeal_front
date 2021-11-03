const API = process.env.REACT_APP_API_URL;

export const listActiveCommissions = () => {
    return fetch(`${API}/active/commissions`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));
};
