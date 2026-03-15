import { AuthProvider } from "../contexts/AuthContext";
import "./globals.css";
import Navbar from "../components/common/Navbar";
import { icons } from "lucide-react";

export const metadata = {
  title: "Tải Ebook miễn phí - Thư viện sách điện tử trực tuyến",   
  description: "Ebook frontend",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <header>
        <AuthProvider>
          <Navbar />
        </AuthProvider>
      </header>

      <body suppressHydrationWarning>
          <main style={{ padding: "20px" }}>
            {children}
          </main>
      </body>
    </html>
  );
}
