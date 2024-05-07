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
  keywords: [
    "resgate",
    "rs",
    "pessoas",
    "animais",
    "ajuda",
    "voluntariado",
    "ONG",
    "ONGs",
    "Enchentes",
    "Desaparecidos",
    "Desaparecido",
    "Resgatado",
    "Resgatados",
    "Cachorro",
    "Cachorros",
    "Gato",
    "Gatos",
    "Animal",
    "Animais",
    "Pessoa",
    "Pessoas",
    "Voluntário",
    "Voluntários",
    "Voluntariado",
    "Ajuda",
    "Ajuda Humanitária",
    "Ajuda Animal",
    "Ajuda aos Animais",
    "Ajuda às Pessoas",
    "Ajuda Humanitária aos Animais",
    "Ajuda Humanitária às Pessoas",
    "Ajuda Humanitária aos Animais e Pessoas",
    "Ajuda Humanitária às Pessoas e Animais",
    "Ajuda Humanitária aos Animais e Pessoas do RS",
    "Ajuda Humanitária às Pessoas e Animais do RS",
    "Ajuda Humanitária aos Animais e Pessoas do Rio Grande do Sul",
    "Ajuda Humanitária às Pessoas e Animais do Rio Grande do Sul",
    "Ajuda Humanitária aos Animais e Pessoas do RS Resgate",
    "Ajuda Humanitária às Pessoas e Animais do RS Resgate",
    "Ajuda Humanitária aos Animais e Pessoas do Rio Grande do Sul Resgate",
    "Ajuda Humanitária às Pessoas e Animais do Rio Grande do Sul Resgate",
    "Ajuda Humanitária aos Animais e Pessoas do RS Resgate",
    "Ajuda Humanitária às Pessoas e Animais do RS Resgate",
    "Ajuda Humanitária aos Animais e Pessoas do Rio Grande do Sul Resgate",
    "Ajuda Humanitária às Pessoas e Animais do Rio Grande do Sul Resgate",
    "Ajuda Humanitária aos Animais e Pessoas do RS Resgate",
    "Ajuda Humanitária às Pessoas e Animais do RS Resgate",
    "Ajuda Humanitária aos Animais e Pessoas do Rio Grande do Sul Resgate",
    "Ajuda Humanitária às Pessoas e Animais do Rio Grande do Sul Resgate",
    "Ajuda Humanitária aos Animais e Pessoas do RS Resgate",
    "Ajuda Humanitária às Pessoas e Animais do RS Resgate",
    "Ajuda Humanitária aos Animais e Pessoas do Rio Grande do Sul Resgate",
    "Ajuda Humanitária às Pessoas e Animais do Rio Grande do Sul Resgate",
    "Ajuda Humanitária aos Animais e Pessoas do RS Resgate",
    "Ajuda Humanitária às Pessoas e Animais do RS Resgate",
    "Ajuda Humanitária aos Animais e Pessoas do Rio Grande do Sul Resgate",
    "Ajuda Humanitária às Pessoas e Animais do Rio Grande do Sul Resgate",
    "Ajuda Humanitária aos Animais e Pessoas do RS Resgate",
    "Ajuda Humanitária às Pessoas e Animais do RS Resgate",
    "Ajuda Humanitária aos Animais e Pessoas do Rio Grande do Sul Resgate",
    "Ajuda Humanitária às Pessoas e Animais do Rio Grande do Sul Resgate",
    "Ajuda Humanitária aos Animais e Pessoas do RS Resgate",
    "Ajuda Humanitária às Pessoas e Animais do RS Resgate",
    "Ajuda Humanitária aos Animais e Pessoas do Rio Grande do Sul Resgate",
    "Ajuda Humanitária às Pessoas e Animais do Rio Grande do Sul Resgate",
    "Ajuda Humanitária aos Animais e Pessoas do RS Resgate",
    "Ajuda Humanitária às Pessoas e Animais do RS Resgate",
    "Ajuda Humanitária aos Animais e Pessoas do Rio Grande do Sul Resgate",
    "Ajuda Humanitária às Pessoas e Animais do Rio Grande do Sul Resgate",
    "Ajuda Humanitária aos Animais e Pessoas do RS Resgate",
    "Ajuda Humanitária às Pessoas e Animais do RS Resgate",
    "Ajuda Humanitária aos Animais e Pessoas do Rio Grande do Sul Resgate",
    "Ajuda Humanitária às Pessoas e Animais do Rio Grande do Sul Resgate",
    "Ajuda Humanitária aos Animais e Pessoas do RS Resgate",
    "Ajuda Humanitária às Pessoas e Animais do RS Resgate",
    "Ajuda Humanitária aos Animais e Pessoas do Rio Grande do Sul Resgate",
  ],
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
