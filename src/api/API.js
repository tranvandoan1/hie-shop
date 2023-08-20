import axios from "axios"
export const axiosClient = axios.create({
    baseURL: "http://localhost:1991/api",
    headers: {
        'Content-Type': 'application/json',
    }
})

// dành cho form data
const axiosClientMultipart = axios.create({
    baseURL: 'http://localhost:1991/api',
});

axiosClientMultipart.interceptors.request.use((req) => {
    // const token = getLocal();
    // req.headers['Authorization'] = 'Bearer ' + token.accessToken;
    req.headers['Content-Type'] = 'multipart/form-data';
    return req;
});
axiosClientMultipart.interceptors.response.use(
    (res) => {
        return res;
    },
    (error) => {
        return error.response;
    }
);

export { axiosClientMultipart };
