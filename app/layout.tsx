import { ModeToggle } from "@/components/ModeToggle";
import { ThemeProvider } from "@/components/theme-provider";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

import { Toaster } from "@/components/ui/sonner";

import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DropDownMenu } from "@/components/DropDownMenu";

export const revalidate = 0;

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: "NFVCBCoop Dashboard",
  description: "NFVCBCoop Admin Dashboard",
  twitter: {
    card: "summary",
    title: "NFVCBCoop Dashboard",
    description: "NFVCBCoop Admin Dashboard",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "NFVCBCoop Dashboard",
  },
  openGraph: {
    url: "https://nfvcbcoop-admin.vercel.app",
    siteName: "NFVCB Coop Portal",
    images: [
      {
        url: "https://res.cloudinary.com/mctony17/image/upload/v1716676461/nfvcb_coop/coop-logo_jpg.jpg", // Must be an absolute URL
        width: 100,
        height: 100,
      },
    ],
    locale: "en_US",
    type: "website",
    // authors: ["Matthew Chukwu"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0f0f0f",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={inter.className}>
          <ThemeProvider
            attribute='class'
            defaultTheme='dark'
            enableSystem
            disableTransitionOnChange>
            <div className='p-4 sticky top-0 z-50 bg-transparent backdrop-filter backdrop-blur-md flex justify-between items-center gap-3'>
              <div className='flex items-center divide-x-2 space-x-3'>
                <ModeToggle />
                <div className='pl-3'>
                  <SignedOut>
                    <SignInButton />
                  </SignedOut>
                  <SignedIn>
                    <UserButton />
                  </SignedIn>
                </div>
              </div>
              <DropDownMenu />
            </div>
            <main>{children}</main>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
