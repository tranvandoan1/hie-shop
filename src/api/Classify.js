import { axiosClient } from "./API";

export const getAllClassify = () => {
    const url = `/classifies`;
    return axiosClient.get(url);
}
export const getClassify = (id) => {
    const url = `/classifies/${id}`;
    return axiosClient.get(url);
}

export const addClassify = (cate) => {
    const url = `/classifies`;
    return axiosClient.post(url, cate);
};

export const uploadClassify = (id, data) => {
    const url = `/classifies/${id}`;
    return axiosClient.put(url, data);
};


export const removesClassify = (data) => {
    const url = `/removes-classifies`;
    return axiosClient.post(url, data);
};
