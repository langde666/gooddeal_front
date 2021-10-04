const API = process.env.REACT_APP_API_URL;

export const getUserProfile = (userId, token) => {
    return fetch(`${API}/user/profile/${userId}`, {
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
