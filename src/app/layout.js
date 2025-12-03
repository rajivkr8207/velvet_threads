import { Outfit } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { Toaster } from "react-hot-toast";


const outfit = Outfit({ subsets: ["latin"], weight: ["400", "500", "600"] });

export const metadata = {
  title: "GoCart. - Shop smarter",
  description: "GoCart. - Shop smarter",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${outfit.className} antialiased`}
        suppressHydrationWarning={true}
      >
        <StoreProvider>
          {children}
          <Toaster
            toastOptions={{
              duration: 1000,
              style: {
                borderRadius: '30px',
                background: '#363636',
                color: '#fff',
              },
            }}
          />
        </StoreProvider>

      </body>
    </html>
  );
}
