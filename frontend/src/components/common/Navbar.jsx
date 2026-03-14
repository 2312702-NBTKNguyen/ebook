"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState, useSyncExternalStore } from "react";
import { AuthContext } from "@/contexts/AuthContext";

import styles from "./Navbar.module.css";
import { Search, Bell, CircleUser } from "lucide-react";

const languages = [
  {
    code: "vi",
    label: "Tiếng Việt",
    flagSrc: "/flags/vn.svg",
    flagAlt: "Vietnam flag",
    flagWidth: 20,
    flagHeight: 13,
  },
  {
    code: "en",
    label: "English",
    flagSrc: "/flags/gb.svg",
    flagAlt: "United Kingdom flag",
    flagWidth: 20,
    flagHeight: 18,
  },
];

const defaultLanguage = "vi";

function getStoredLanguage() {
  if (typeof window === "undefined") {
    return defaultLanguage;
  }

  const savedLanguage = localStorage.getItem("language");
  const isValidSavedLanguage =
    savedLanguage && languages.some((lang) => lang.code === savedLanguage);

  return isValidSavedLanguage ? savedLanguage : defaultLanguage;
}

function subscribeToLanguageChange(onStoreChange) {
  if (typeof window === "undefined") {
    return () => {};
  }

  window.addEventListener("storage", onStoreChange);
  window.addEventListener("languagechange", onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener("languagechange", onStoreChange);
  };
}

export default function Navbar() {
  const router = useRouter();
  const { isLoggedIn, logout } = useContext(AuthContext);

  const selectedLanguage = useSyncExternalStore(
    subscribeToLanguageChange,
    getStoredLanguage,
    () => defaultLanguage,
  );
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("language", selectedLanguage);
    document.documentElement.setAttribute("lang", selectedLanguage);
  }, [selectedLanguage]);

  const handleLanguageSelect = (languageCode) => {
    localStorage.setItem("language", languageCode);
    window.dispatchEvent(new Event("languagechange"));
    setIsLanguageOpen(false);
  };

  const currentLanguage =
    languages.find((lang) => lang.code === selectedLanguage) || languages[1];

  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.logo}>
        <span>EBOOK</span>
      </Link>
      {/* Middle Section (Danh mục + Tìm kiếm) */}
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
      {/* Right Section (Đăng nhập/Đăng ký hoặc Thông tin người dùng) */}
      <div className={styles.right}>
        <button className={styles.notificationBtn} aria-label="Thông báo">
          <Bell />
        </button>

        <div
          className={styles.accountWrapper}
          onMouseEnter={() => setIsAccountOpen(true)}
          onMouseLeave={() => setIsAccountOpen(false)}
        >
          <button
            className={styles.actionBtn}
            aria-label="Tài khoản"
            type="button"
          >
            <CircleUser size={18} />
            <span className={styles.actionLabel}>Tài khoản</span>
          </button>

          {isAccountOpen && (
            <div className={styles.accountMenu} role="menu">
              {isLoggedIn ? (
                <>
                  <button
                    className={`${styles.authActionBtn} ${styles.profileBtn}`}
                    onClick={() => {
                      setIsAccountOpen(false);
                      router.push("/profile");
                    }}
                    type="button"
                  >
                    Hồ sơ
                  </button>
                  <button
                    className={`${styles.authActionBtn} ${styles.logoutBtn}`}
                    onClick={() => {
                      logout();
                      setIsAccountOpen(false);
                      router.push("/");
                    }}
                    type="button"
                  >
                    Đăng xuất
                  </button>
                </>
              ) : (
                <>
                  <button
                    className={`${styles.authActionBtn} ${styles.loginBtn}`}
                    onClick={() => {
                      setIsAccountOpen(false);
                      router.push("/auth/login");
                    }}
                    type="button"
                  >
                    Đăng nhập
                  </button>
                  <button
                    className={`${styles.authActionBtn} ${styles.registerBtn}`}
                    onClick={() => {
                      setIsAccountOpen(false);
                      router.push("/auth/register");
                    }}
                    type="button"
                  >
                    Đăng ký
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        <div
          className={styles.languageWrapper}
          onMouseEnter={() => setIsLanguageOpen(true)}
          onMouseLeave={() => setIsLanguageOpen(false)}
        >
          <button
            className={styles.languageBtn}
            aria-label="Chọn ngôn ngữ"
            aria-haspopup="menu"
            aria-expanded={isLanguageOpen}
            type="button"
          >
            <Image
              src={currentLanguage.flagSrc}
              alt={currentLanguage.flagAlt}
              className={styles.flagIcon}
              width={currentLanguage.flagWidth}
              height={currentLanguage.flagHeight}
              priority={false}
            />
            <span>{currentLanguage.label}</span>
          </button>

          {isLanguageOpen && (
            <div className={styles.languageSelector} role="menu">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  className={`${styles.languageOption} ${
                    selectedLanguage === lang.code ? styles.activeLanguage : ""
                  }`}
                  onClick={() => handleLanguageSelect(lang.code)}
                  role="menuitemradio"
                  aria-checked={selectedLanguage === lang.code}
                  type="button"
                >
                  <Image
                    src={lang.flagSrc}
                    alt={lang.flagAlt}
                    className={styles.flagIcon}
                    width={lang.flagWidth}
                    height={lang.flagHeight}
                    priority={false}
                  />
                  {lang.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
