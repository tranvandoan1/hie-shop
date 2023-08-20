import { axiosClient } from "./API";
import { axiosClientMultipart } from "./API";

const ProAPI = {
  getAll() {
    const url = `/get-products`;
    return axiosClient.get(url);
  },
  get(id) {
    const url = `/products/${id}`;
    return axiosClient.get(url);
  },

  // remove(id) {
  //   const url = `/products/${id}`;
  //   return axiosClient.delete(url);
  // },

};
export default ProAPI;
export const add = (data) => {
  const url = `/products`;
  return axiosClientMultipart.post(url, data);
};

export const upload = (data) => {
  const url = `/product-upload`;
  return axiosClientMultipart.post(url, data);
};
export const remove = (id) => {
  const url = `/product/${id}`;
  return axiosClient.delete(url);
};

export const removes = (dataId) => {
  const url = `/remove-products`;
  return axiosClient.post(url, dataId);
};