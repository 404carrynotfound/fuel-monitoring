const baseUrl = 'http://localhost:5000';

export const login = async (username: string, password: string) => {
    return fetch(`${ baseUrl }/login`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });
};

export const register = async (username: string, password: string) => {
    return fetch(`${ baseUrl }/register`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });
};
