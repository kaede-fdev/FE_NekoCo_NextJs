"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import AuthProvider from "@/provider/AutthProvider";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { theme } = useTheme();
  return (
    <html lang="en" suppressHydrationWarning={true} className="dark">
      <body className={inter.className} suppressHydrationWarning={true}>
        <NextUIProvider>
          <NextThemesProvider attribute="class" defaultTheme="dark">
            <Provider store={store}>
              <AuthProvider>
                {children}
                <Toaster
                  position="bottom-center"
                  reverseOrder={true}
                  toastOptions={{
                    className: "",
                    duration: 3000,
                    style: {
                      background: theme == "light" ? "#fff" : "#1e1e1e",
                      color: theme == "light" ? "#000" : "#FFF",
                    },
                  }}
                />
              </AuthProvider>
            </Provider>
          </NextThemesProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
