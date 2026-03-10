"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";

import styles from "./Navbar.module.css";
import { Search } from "lucide-react";

export default function Navbar() {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const router = useRouter();

  const openLogin = () => {
    router.push("/login");
  }
  const openRegister = () => {
    router.push("/register");
  }

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.logo}>
        <span>Nora&apos;s Ebook</span>
      </Link>
      {/* 2. Middle Section (Danh mục + Tìm kiếm + Dark Mode) */}
      <div className={styles.middle}>
        {/* Khung tìm kiếm */}
        <div className={styles.searchContainer}>
          <Search className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Tìm kiếm tên sách, tác giả, thể loại..."
            className={styles.searchInput}
          />
          <button className={styles.searchBtn} aria-label="Tìm kiếm">
            <Search size={18} />
          </button>
        </div>
      </div>

      <div>
        {isLoggedIn ? (
          <div className={styles.authSection}>
            <Link href="/profile">Tủ sách của tôi</Link>
            <button className={styles.loginBtn} onClick={handleLogout}>Đăng xuất</button>
          </div>
        ) : (
          <div className={styles.authSection}>
            <button className={styles.registerBtn} onClick={openRegister}>Đăng ký</button>
            <button className={styles.loginBtn} onClick={openLogin}>Đăng nhập</button>
          </div>
        )}
      </div>
    </nav>
  );
}
