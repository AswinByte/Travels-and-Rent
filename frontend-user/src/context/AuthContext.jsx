import { createContext, useState } from "react";

export const AuthContext =
  createContext();

export const AuthProvider = ({
  children,
}) => {

  const [token, setToken] =
    useState(
      localStorage.getItem(
        "token"
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
    "token",
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
      "token"
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