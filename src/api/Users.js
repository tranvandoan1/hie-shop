import { axiosClient, axiosClientMultipart } from "./API";

const UserAPI = {
    getAll() {
        const url = `/user`;
        return axiosClient.get(url);
    },

    signup(user) {
        const url = `/signup`;
        return axiosClientMultipart.post(url, user);
    },

    signOut() {
        const url = `/signout`;
        return axiosClient.get(url);
    },
    signin(user) {
        const url = `/signin`;
        return axiosClient.post(url, user)
    }
    ,
    remove(id) {
        const url = `/user/${id}`;
        return axiosClient.delete(url);
    },
    upload(id, data) {
        const url = `/user/${id}`;
        return axiosClient.put(url, data);
    },
};
export default UserAPI;
export const signupApi = (user) => {
    console.log('chào rồi')
    const url = `/signup`;
    return axiosClientMultipart.post(url, user);
};
export const signinApi = (user) => {
    const url = `/signin`;
    return axiosClient.post(url, user)
};
export const uploadInfoUser = (data) => {
    const url = `/upload-user`;
    return axiosClientMultipart.post(url, data);
};
export const uploadPassword = (data) => {
    const url = `/user/upload/password`;
    return axiosClient.post(url, data);
};
export const getInfoUser = (id) => {
    console.log(id, 'e3wds')
    const url = `/get-user/${id}`;
    return axiosClient.get(url);
};
export const checkEmailUpload = (email) => {
    const url = `/check-email-upload`;
    return axiosClient.post(url, email);
};
export const uploadEmail = (email) => {
    const url = `/upload/email`;
    return axiosClient.post(url, email);
};
export const getOtp_Email = (email) => {
    const url = `/get-otp-email`;
    return axiosClient.post(url, email);
};

