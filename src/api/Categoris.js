import { axiosClient, axiosClientMultipart } from "./API";

const CateAPI = {
  getAll() {
    const url = `/categoris`;
    return axiosClient.get(url);
  },
  get(id) {
    const url = `/categoris/${id}`;
    return axiosClient.get(url);
  },
};
export default CateAPI;
export const add = (cate) => {
  const url = `/categoris`;
  return axiosClientMultipart.post(url, cate);
};

export const remove = (cate) => {
  console.log(cate, '3ed')
  const url = `/categoris-remove`;
  return axiosClient.post(url, cate);
};

export const upload = (data) => {
  const url = `/categoris-upload`;
  return axiosClientMultipart.post(url, data);
};
