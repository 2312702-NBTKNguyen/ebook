"use client";
import React, { createContext, useState } from "react";

export const AuthContext = createContext(); // Tạo context cho authentication

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }
    // Kiểm tra xem có token trong localStorage hay không để xác định trạng thái đăng nhập ban đầu
    return Boolean(window.localStorage.getItem("access_token"));
  });

  const login = (token) => {
    localStorage.setItem("access_token", token);
    localStorage.setItem("refresh_token", token); // Lưu refresh token nếu có
    setIsLoggedIn(true); // Cập nhật trạng thái đăng nhập khi đăng nhập thành công
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setIsLoggedIn(false); // Cập nhật trạng thái đăng nhập khi đăng xuất
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
