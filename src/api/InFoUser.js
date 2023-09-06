// @ts-ignore
import { axiosClient } from "./API";

const InfoUserAPI = {
  getAll() {
    const url = `/info-user`;
    return axiosClient.get(url);
  },
  get(id) {
    const url = `/info-user/${id}`;
    return axiosClient.get(url);
  },

  upload(id, data) {
    const url = `/info-user/${id}`;
    return axiosClient.put(url, data);
  },
};
export default InfoUserAPI;
export const add = (data) => {
  const url = `/info-user-add`;
  return axiosClient.post(url, data);
};
export const removeAdress = (data) => {
  const url = `/remove-adress`;
  return axiosClient.post(url, data);
};

export const upload = ( data) => {
  const url = `/info-user-upload-addres`;
  return axiosClient.post(url, data);
};

export const updateInfoAdress = ( data) => {
  const url = `/info-user-upload-info-addres`;
  return axiosClient.post(url, data);
};
