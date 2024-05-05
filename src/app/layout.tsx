import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";

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
    <html lang="pt-BR">
      <body className="bg-gray-100 font-sans min-h-screen max-w-screen mx-auto">
        {/* <Header /> */}
        <AntdRegistry>
          <ToastContainer />
          {children}
          <Footer />
        </AntdRegistry>
      </body>
    </html>
  );
}
