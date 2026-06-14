import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(
    localStorage.getItem("adminToken") || null
  );

  const login = (newToken) => {
    localStorage.setItem("adminToken", newToken);
    setToken(newToken);
  };

  const logout = () => {
  localStorage.removeItem("adminToken");

  setToken(null);

  window.location.href =
    "/login";
};

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;