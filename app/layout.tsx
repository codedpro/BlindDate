"use client";

import { Inter } from "next/font/google";
//import { metadata as appMetadata } from "@/config/metadata";
import { ReactNode, Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import "@/styles/global.css";
import dynamic from "next/dynamic";

const TelegramProvider = dynamic(() =>
  import("react-telegram-miniapp").then(
    (mod) => mod.TelegramProvider as React.FC<{ children: ReactNode }>
  )
);

declare global {
  interface Window {
    Telegram: {
      WebApp: any;
    };
  }
}

const inter = Inter({ subsets: ["latin"] });
//export const metadata: Metadata = appMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isReady, setIsReady] = useState(false);
  const [isTelegram, setIsTelegram] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const checkTelegram = () => {
        if (window.Telegram?.WebApp) {
          setIsTelegram(true);

          const app = window.Telegram.WebApp;
          app.ready();

          if (app.initDataUnsafe.user) {
            setIsReady(true);
          } else {
            setError("User info is not available.");
          }
        } else {
          setTimeout(checkTelegram, 300);
        }
      };
      checkTelegram();
    }
  }, []);
  return (
    <html lang="en" className="xl:hidden dark">
      <head>
        <link
          href="https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.className} bg-black overflow-y-auto`}>
        <TelegramProvider>
          {isTelegram && isReady ? (
            <Suspense fallback={<div>Loading Telegram...</div>}>
              {children}
            </Suspense>
          ) : (
            <div>
              {error
                ? `Error: ${error}`
                : "This app is not running inside Telegram."}
            </div>
          )}
        </TelegramProvider>
      </body>
    </html>
  );
}
