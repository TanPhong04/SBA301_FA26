import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ036Y7KTmVDrR5rNJMbGIYjqx_LGVbO511ldBQMN8dqA&s://via.placeholder.com/40"
  );

  useEffect(() => {
    const storedLogin = localStorage.getItem("isLoggedIn");
    const storedUsername = localStorage.getItem("username");
    if (storedLogin === "true" && storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
  }, []);

  const login = (user) => {
    setIsLoggedIn(true);
    setUsername(user);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", user);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUsername("");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, username, avatar, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
