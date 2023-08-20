import { axiosClient } from "./API";

const ClassifyAPI = {
    getAll() {
        const url = `/classifies`;
        return axiosClient.get(url);
    },
    get(id) {
        const url = `/classifies/${id}`;
        return axiosClient.get(url);
    },


};
export default ClassifyAPI;
export const add = (cate) => {
    const url = `/classifies`;
    return axiosClient.post(url, cate);
};

export const upload = (id, data) => {
    const url = `/classifies/${id}`;
    return axiosClient.put(url, data);
};


export const removes = (data) => {
    const url = `/removes-classifies`;
    return axiosClient.post(url, data);
};
