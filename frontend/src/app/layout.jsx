import "./globals.css";

export const metadata = {
  title: "Ebook",
  description: "Ebook frontend",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
