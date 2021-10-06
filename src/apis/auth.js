const API = process.env.REACT_APP_API_URL;

//localStorage
export const setToken = (data, next) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(data));
        next();
    }
};

export const removeJwt = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('jwt');
    }
};

export const getToken = () => {
    if (typeof window == 'undefined') {
        return false;
    }

    if (localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'));
    }

    return false;
};

export const refreshToken = (refreshToken) => {
    return fetch(`${API}/refresh/token`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
    })
        .then((res) => res.json())
        .then((data) => {
            const { accessToken, refreshToken } = data;
            if (typeof window !== 'undefined' && localStorage.getItem('jwt')) {
                const auth = JSON.parse(localStorage.getItem('jwt'));
                auth.accessToken = accessToken;
                auth.refreshToken = refreshToken;

                localStorage.setItem('jwt', JSON.stringify(auth));
            }
        });
};

//auth apis
export const signup = (user) => {
    return fetch(`${API}/signup`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));
};

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

export const signout = (refreshToken, next) => {
    return fetch(`${API}/signout`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
    })
        .then((res) => res.json())
        .then((data) => {
            removeJwt();
            next();
        });
};

export const authsocial = (user) => {
    return fetch(`${API}/auth/social`, {
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
