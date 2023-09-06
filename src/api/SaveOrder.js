// @ts-ignore
import { axiosClient, axiosClientMultipart } from "./API";


const SaveOrderAPI = {
  getAll() {
    const url = `/saveoders`;
    return axiosClient.get(url);
  },
  get(id) {
    const url = `/saveoders/${id}`;
    return axiosClient.get(url);
  },
};
export default SaveOrderAPI;
export const add = (data) => {
  const url = `/saveoder-add`;
  return axiosClient.post(url, data);
};

export const remove_order = (data) => {
  const url = `/saveoder-order`;
  return axiosClient.post(url,data);
};
export const removes_order = (data) => {
  const url = `/removes-saveoders`;
  return axiosClient.post(url, data);
};
export const upload = (data) => {
  const url = `/upload-saveoder`;
  return axiosClient.post(url, data);
};

export const uploadSaveoderCart = (data) => {
  const url = `/upload-saveoderCart`;
  return axiosClient.post(url, data);
};

export const uploadSaveOrders = (data) => {
  const url = `/saveoders/check`;
  return axiosClient.patch(url, data);
};
