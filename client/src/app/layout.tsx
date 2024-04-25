import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "@/styles/globals.scss";
import BootstrapBundle from "@/components/configs/BootstrapBundle";
import ReduxProvider from "@/store/ReduxProvider";
import Navbar from "@/components/layout/Navbar";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Óasis Azul Hotel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <BootstrapBundle />
      <body className={montserrat.className}>
        <ReduxProvider>
          <Navbar />
          <div className="container mt-4">{children}</div>
          <ToastContainer
            position="bottom-right"
            autoClose={2500}
            theme="colored"
          />
        </ReduxProvider>
      </body>
    </html>
  );
}
