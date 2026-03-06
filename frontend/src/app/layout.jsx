import { AuthProvider } from "../contexts/AuthContext";
import "./globals.css";

export const metadata = {
  title: "Ebook",
  description: "Ebook frontend",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>
        <AuthProvider>
          <main style={{ padding: "20px" }}>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
