import { axiosClient, axiosClientMultipart } from "./API";

export const getAllCate = () => {
  const url = `/categoris`;
  return axiosClient.get(url);
}
export const getCate = (id) => {
  const url = `/categoris/${id}`;
  return axiosClient.get(url);
}
export const addCate = (cate) => {
  const url = `/categoris`;
  return axiosClientMultipart.post(url, cate);
};

export const removeCate = (cate) => {
  console.log(cate, '3ed')
  const url = `/categoris-remove`;
  return axiosClient.post(url, cate);
};

export const uploadCate = (data) => {
  const url = `/categoris-upload`;
  return axiosClientMultipart.post(url, data);
};
