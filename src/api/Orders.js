// @ts-ignore
import { axiosClient } from "./API";

const OrderAPI = {
    getAll() {
        const url = `/orders`;
        return axiosClient.get(url);
    },
    get(id) {
        const url = `/orders/${id}`;
        return axiosClient.get(url);
    },
    add(orders) {
        const url = `/orders`;
        return axiosClient.post(url, orders);
    },
    remove(id) {
        const url = `/orders/${id}`;
        return axiosClient.delete(url);
    },
    upload(id, data) {
        const url = `/orders/${id}`;
        return axiosClient.put(url, data);
    },

};
export default OrderAPI;
export const add = (data) => {
  const url = `/oder-add`;
  return axiosClient.post(url, data);
};