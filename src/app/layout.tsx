import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

export const metadata: Metadata = {
  title: "RS Resgate",
  description: "RS Resgate",
  keywords: ["resgate", "rs", "pessoas", "animais", "ajuda", "voluntariado"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        {/* <Header /> */}
        <ToastContainer />
        {children}
        <Footer />
      </body>
    </html>
  );
}
