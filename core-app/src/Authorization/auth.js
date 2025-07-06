export const getToken = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  if (!token || token.expiry < Date.now()) return null;
  return token;
};

export const logout = () => {
  localStorage.removeItem("token");
};
