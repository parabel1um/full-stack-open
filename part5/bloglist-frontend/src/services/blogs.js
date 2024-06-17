import axios from "axios";
const baseUrl = "/api/blogs";

let Token = "";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (Object) => {
  const config = {
    headers: { Authorization: Token },
  };

  const response = await axios.post(baseUrl, Object, config);

  return response.data;
};

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject);
  return response.data;
};

const setToken = (token) => {
  Token = `Bearer ${token}`;
  return Token;
};

export default { getAll, setToken, create, update };
