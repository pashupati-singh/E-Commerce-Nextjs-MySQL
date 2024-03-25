import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex-shrink-0">
          <Link href="/">
            <div className="text-white font-bold text-xl">E-Commerce</div>
          </Link>
        </div>
        <div className="flex justify-end space-x-4">
          <Link href="/login">
            <div className="text-white">Login</div>
          </Link>
          <Link href="/category">
            <div className="text-white">Category</div>
          </Link>
          <Link href="/signup">
            <div className="text-white">SignUp</div>
          </Link>
        </div>
      </div>
    </nav>


        {children}
        </body>
    </html>
  );
}