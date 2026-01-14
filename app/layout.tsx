import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ReactQueryProvider } from "@/lib/providers/ReactQueryProvider";
import { Toaster } from "sonner";
import { AdminAuthProvider } from "@/lib/contexts/AdminAuthContext";

// Primary font - Inter
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Brand headlines font - Plus Jakarta Sans
const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "BoRide Admin Dashboard",
    template: "%s | BoRide Admin",
  },
  description: "BoRide Admin Dashboard - Manage students, drivers, and rides",
  robots: {
    index: false,
    follow: false,
  },
  icons: {
    icon: "/img/boridelogo.png",
    apple: "/img/boridelogo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${plusJakartaSans.variable} font-sans antialiased`}
        style={{
          fontFamily: "var(--font-inter), system-ui, -apple-system, sans-serif",
        }}
      >
        <Toaster position="top-right" richColors />
        <AdminAuthProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </AdminAuthProvider>
      </body>
    </html>
  );
}
