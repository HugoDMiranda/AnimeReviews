import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContexProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (nameLogin, passLogin) => {
    const res = await axios.post(
      "https://server-animereviews-production.up.railway.app/api/auth/login",
      {
        username: nameLogin,
        userpassword: passLogin,
      }
    );
    setCurrentUser(res.data);
  };

  const logout = async (input) => {
    await axios.post(
      "https://server-animereviews-production.up.railway.app/api/auth/logout"
    );
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
