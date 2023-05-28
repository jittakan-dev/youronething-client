import "./globals.css";
import { Inter } from "next/font/google";
import { ProductIdProvider } from "./ProductIdContext";
import Nav from "@components/Nav";
import Footer from "@components/Footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "YourOneThing",
  description: "One thing for sale",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProductIdProvider>
          <Nav />
          {children}
          <Footer />
        </ProductIdProvider>
      </body>
    </html>
  );
}
