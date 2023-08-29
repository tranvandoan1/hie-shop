// @ts-ignore
import { axiosClient, axiosClientMultipart } from "./API";

export const getAllPro = () => {
  const url = `/get-products`;
  return axiosClient.get(url);
};
export const getPro = (id) => {
  const url = `/products/${id}`;
  return axiosClient.get(url);
};
export const addPro = (data) => {
  const url = `/products-add`;
  return axiosClientMultipart.post(url, data);
};

export const uploadPro = (data) => {
  const url = `/product-upload`;
  return axiosClientMultipart.post(url, data);
};
export const removePro = (id) => {
  const url = `/products-remove`;
  return axiosClient.post(url, id);
};

export const removesPro = (dataId) => {
  const url = `/products-removes`;
  return axiosClient.post(url, dataId);
};
