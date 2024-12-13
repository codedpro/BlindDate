import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { metadata as appMetadata } from "@/config/metadata";
import "@/styles/global.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = appMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="xl:hidden dark">
      <head>
        <link
          href="https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css"
          rel="stylesheet"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </head>
      <body
        className={`${inter.className} bg-black overflow-x-hidden`}
        style={{ overscrollBehavior: "none" }}
      >
        {children}
      </body>
    </html>
  );
}