const API = process.env.REACT_APP_API_URL;

export const signin = (user) => {
    return fetch(`${API}/signin`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
        .then((res) => res.json())
        .catch((error) => console.error(error));
};

export const signout = (next) => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('jwt');
        next();
    }
};

export const authenticate = (data, next) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(data));
        next();
    }
};

export const isAuthenticated = () => {
    if (typeof window == 'undefined') {
        return false;
    }

    if (localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'));
    }

    return false;
};
