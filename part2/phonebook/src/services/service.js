import axios from "axios";

const url = "/api/persons";

const getAll = () => {
  return axios.get(url);
};

const add = (newObject) => {
  return axios.post(url, newObject);
};

const update = (id, newObject) => {
  return axios.put(`${url}/${id}`, newObject);
};

const remove = (id) => {
  return axios.delete(`${url}/${id}`);
};

export default {
  getAll,
  add,
  update,
  remove,
};
