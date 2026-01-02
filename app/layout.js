import "./globals.css";
import Navbar from "./components/Navabar";
import Footer from "./components/Footer";
import Providers from "./provider";
import { AuthProvider } from "./context/AuthProvider";

export const metadata = {
  title: "Lendenff | Official Website",
  description: "Lendenff official website. Trusted platform by Lendenff.",
  keywords: ["lendenff", "lendenff official", "lendenff website"],
  metadataBase: new URL("https://lendenff.vercel.app"),
  openGraph: {
    title: "Lendenff",
    description: "Official website of Lendenff",
    url: "https://lendenff.vercel.app",
    siteName: "Lendenff",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
          <link rel="icon" href="/logo.png" />
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@4.7.0/fonts/remixicon.css"
          rel="stylesheet"
          precedence="default"
        />
        
      </head>
      <body className={`antialiased`}>
        <Providers>
          <AuthProvider>
            <Navbar />
            {children}
            <Footer />
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
