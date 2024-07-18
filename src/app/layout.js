import { Inter } from "next/font/google";
import "./globals.css";
import ClientProvider from "./ClientProvider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "Litchies",
  description: "Litchies Local And Easy.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
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
            },
            custom: {
              style: {
                background: 'gray',
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