const getToken = () => {
  return localStorage.getItem("token");
};
const setToken = (value: any) => {
  localStorage.setItem("token", value);
};
const removeToken = () => {
  localStorage.removeItem("token");
};
export { getToken, setToken, removeToken };
