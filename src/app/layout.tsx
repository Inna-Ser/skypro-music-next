import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ReduxProvider from "@/store/ReduxProvider";
import styles from "./globals.module.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReduxProvider>
        <body className={inter.className}></body>
        <div className={styles.wrapper}>
          <div className={styles.contaner}>{children}</div>
        </div>
      </ReduxProvider>
    </html>
  );
}
