import { axiosClient, axiosClientMultipart } from "./API";

const CommentAPI = {
  getAll() {
    const url = `/comments`;
    return axiosClient.get(url);
  },
  get(id) {
    const url = `/comments/${id}`;
    return axiosClient.get(url);
  },
};
export default CommentAPI;
export const add = (data) => {
  const url = `/comments-add`;
  return axiosClientMultipart.post(url, data);
};
export const upload = (data) => {
  const url = `/comments-upload`;
  return axiosClientMultipart.post(url, data);
};
export const remove = (data) => {
  const url = `/comments-remove`;
  return axiosClient.post(url, data);
};
