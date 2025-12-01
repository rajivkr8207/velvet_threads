import { Outfit } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";


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
        </StoreProvider>

      </body>
    </html>
  );
}
