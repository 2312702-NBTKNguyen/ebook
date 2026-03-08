import { AuthProvider } from "../contexts/AuthContext";
import "./globals.css";
import Navbar from "../components/common/Navbar";

export const metadata = {
  title: "Ebook",
  description: "Ebook frontend",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body suppressHydrationWarning>
        <AuthProvider>
          <Navbar />
          <main style={{ padding: "20px" }}>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
