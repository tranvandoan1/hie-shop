import { axiosClient } from "./API";

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
  return axiosClient.post(url, data);
};
export const upload = (id, data) => {
  const url = `/comments/${id}`;
  return axiosClient.put(url, data);
};
export const remove = (id) => {
  const url = `/comments/${id}`;
  return axiosClient.delete(url);
};
