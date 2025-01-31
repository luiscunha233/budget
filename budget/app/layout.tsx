import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "next-themes";
import dynamic from "next/dynamic";
import Sidebar from "@/components/ui/sidebar";
import { populateDatabase } from "@/lib/service/test";
import AccountDisplay from "@/components/Account/AccountDisplay";
import { getAllAccountsService } from "@/lib/service/AccountService";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Luis's Budget",
  description: "Budget app by Luis Cunha",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const accounts = await getAllAccountsService();
  return (
    <html lang="en" suppressHydrationWarning>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body
        className={cn(
          "max-h-screen w-full flex",
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
          <div className="px-8 ml-4 mt-8 w-full overflow-y-hidden">
            <div className="flex flex-row mb-4 gap-2 ">{accounts.map((account) => (
              <AccountDisplay account={account} />
            ))}
            </div>
            {children}
          </div>
        </ThemeProvider>

      </body>
    </html>
  );
}
