import { FC, ReactNode } from "react";
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'] });
interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>

      <div>{children}</div>
      </body>
    </html>

  )
  
  
};

export default AuthLayout;

