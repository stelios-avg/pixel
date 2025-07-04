import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pixel Studio",
  description: "Crafting Web Pixel by Pixel",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-2BBZ3FSPXT"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-2BBZ3FSPXT');
            `,
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
