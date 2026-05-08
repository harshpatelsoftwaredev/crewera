import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "PLOTIX Reality — Premium Real Estate Platform",
    template: "%s | PLOTIX Reality",
  },
  description:
    "Discover premium properties across India. Buy, sell, or rent residential, commercial & agricultural properties with PLOTIX Reality.",
  keywords: ["real estate", "properties", "buy property", "rent property", "India", "PLOTIX"],
  openGraph: {
    type: "website",
    siteName: "PLOTIX Reality",
    locale: "en_IN",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=Outfit:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
