import { Inter } from "next/font/google";
import "./globals.css";
import ClientProvider from "./ClientProvider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "Litchies",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <script src="https://unpkg.com/flowbite@1.5.1/dist/flowbite.js"></script>
        <ClientProvider>
          <Toaster toastOptions={{
            success: {
              style: {
                background: 'green',
                color: 'white'
              },
            },
            error: {
              style: {
                background: 'red',
                color: 'white'
              }
            }
          }}
            position="top-right" />
          {children}
        </ClientProvider>
      </body>
    </html>
  );
}