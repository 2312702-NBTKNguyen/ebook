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

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.logo}>
        <span>Trang chủ</span>
      </Link>

      <div className={styles.middle}>

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
            <button onClick={handleLogout}>Đăng xuất</button>
          </div>
        ) : (
          <div className={styles.authSection}>
            <Link href="/login">Đăng nhập</Link>
            <Link href="/register">Đăng ký</Link>
          </div>
        )}
        
      </div>
    </nav>
  );
}
