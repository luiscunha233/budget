import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Sidebar from "@/components/ui/sidebar";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Luis's Budget",
  description: "Budget app by Luis Cunha",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body
        className={cn(
          "min-h-screen w-full bg-white text-black flex",
          inter.className,
          { "debug-screens": process.env.NODE_ENV === "development" }
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Sidebar */}
          <Sidebar />
          {/* main page */}
          <div className="p-8 m-4 w-full">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
