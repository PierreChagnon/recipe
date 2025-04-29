import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "Recipes",
  description: "The diversity and variability of fictions",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={outfit.className + ' ' + {/*'lg:flex lg:flex-col hidden'*/ }}>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
