import axios from "axios"
import LZString from 'lz-string'
console.log(localStorage.getItem('data'),'e3fewrefd')
const decodedString =localStorage.getItem('data')==null?'': JSON.parse(LZString.decompressFromBase64(localStorage.getItem('data')));
// console.log(decodedString,'decodedString2e32rr')
export const axiosClient = axios.create({
    baseURL: "https://hieshop-backend.onrender.com/api",
    // baseURL: "http://localhost:1991/api",
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${decodedString?.token}`
    }
})

// dành cho form data
const axiosClientMultipart = axios.create({
    baseURL: 'https://hieshop-backend.onrender.com/api',
    // baseURL: "http://localhost:1991/api",
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
