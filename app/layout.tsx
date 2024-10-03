import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import  Navbar  from "../components/Navbar";
import { Inter, Space_Grotesk} from 'next/font/google'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const inter = Inter({ subsets:['latin']})
const spaceGrotesk = Space_Grotesk({ subsets :['latin'], weight:[ '300', "400",'500','600'], variable: "--font-space-grotesk" })

export const metadata: Metadata = {
  title: "Price Wise",
  description: "Track Product Effortlessely and save money on your online shopping",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={` max-w-10xl mx-auto ${inter.className}`}
      >
        <main>
        <Navbar />
        {children}
        </main>
      </body>
    </html>
  );
}
