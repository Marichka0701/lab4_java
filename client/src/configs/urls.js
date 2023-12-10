const baseURL = process.env.REACT_APP_API_URL;

const api = '/api';
const auth = '/auth';
const users = '/users';

const endPoints = {
    auth: {
        login: `${baseURL}${api}${auth}/login`,
        register: `${baseURL}${api}${auth}/register`,
    },
    users: {
        base: `${baseURL}${api}${users}`,
    },
    pizza: {
        base: `${baseURL}${api}/pizza/`,
    }
}

export {
    baseURL,
    endPoints,
}