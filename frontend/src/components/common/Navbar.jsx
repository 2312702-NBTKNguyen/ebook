"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState, useSyncExternalStore } from "react";
import { AuthContext } from "@/contexts/AuthContext";

import styles from "./Navbar.module.css";
import { Search, CircleUser } from "lucide-react";

const categories = [
  {
    name: "Văn học",
    subcategories: ["Tiểu thuyết", "Truyện ngắn", "Tác phẩm kinh điển", "Light Novel", "Trinh thám", "Ngôn tình", "Kiếm hiệp",
      "Thơ ca - Tục ngữ - Ca dao - Thành ngữ", "Chiến tranh - Lịch sử", "Hồi ký - Bút ký", "Phóng sự - Ký sự - Phê bình văn học",
      "Khoa học viễn tưởng", "Huyền bí - Giả tưởng - Kinh dị"
    ],
  },
  {
      name: "Kinh tế",
      subcategories: ["Quản trị kinh doanh", "Marketing - Bán hàng", "Kinh tế học", "Tài chính - Ngân hàng", "Khởi nghiệp - làm giàu",
        "Đầu tư - Chứng khoán", "Bất động sản", "Kinh doanh quốc tế", "Kế toán - Kiểm toán - Thuế"
      ]
  },
  {
      name: "Kỹ năng sống",
      subcategories: ["Kỹ năng sống", "Tâm lý", "Tuổi mới lớn", "Hạt giống tâm hồn", "Rèn luyện nhân cách"]
  }
]

const FLAG_VERSION = "20260215";
const languages = [
  {
    code: "vi",
    label: "Tiếng Việt",
    flagSrc: `/flags/vn.svg?v=${FLAG_VERSION}`,
    flagAlt: "Vietnam flag",
    flagWidth: 80,
    flagHeight: 60,
  },
  {
    code: "en",
    label: "English",
    flagSrc: `/flags/gb.svg?v=${FLAG_VERSION}`,
    flagAlt: "United Kingdom flag",
    flagWidth: 50,
    flagHeight: 30,
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
        <span>NHÀ SÁCH EBOOK</span>
      </Link>
      {/* Middle Section (Danh mục + Tìm kiếm) */}
      <div className={styles.middle}>
        {/* Khung tìm kiếm */}
        <div className={styles.searchContainer}>
          <Search className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Tìm kiếm tên sách, tác giả,..."
            className={styles.searchInput}
          />
          <button className={styles.searchBtn} aria-label="Tìm kiếm">
            <Search size={18} />
          </button>
        </div>
      </div>
      {/* Right Section (Đăng nhập/Đăng ký hoặc Thông tin người dùng) */}
      <div className={styles.right}>
        {/* Tai khoản */}
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

        {/* Chọn ngôn ngữ */}
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
            <span className={styles.languageLabel}>{currentLanguage.label}</span>
          </button>

          {isLanguageOpen && (
            <div className={styles.languageSelector} role="menu">
              <p className={styles.languageTitle}>Chọn ngôn ngữ</p>
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
