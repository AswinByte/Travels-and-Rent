import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext =
  createContext();

export const AuthProvider = ({
  children,
}) => {

  const [token, setToken] =
    useState(
      localStorage.getItem(
        "userToken"
      )
    );

  const [userInfo, setUserInfo] =
    useState(
      JSON.parse(
        localStorage.getItem(
          "userInfo"
        )
      )
    );

  const login = (jwt, user) => {

  localStorage.setItem(
    "userToken",
    jwt
  );

  localStorage.setItem(
    "userInfo",
    JSON.stringify(user)
  );

  setToken(jwt);

  setUserInfo(user);
};
  const logout = () => {

    localStorage.removeItem(
      "userToken"
    );

    localStorage.removeItem(
      "userInfo"
    );

    setToken(null);

    setUserInfo(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        userInfo,
        login,
        logout,
        isAuthenticated:
          !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};