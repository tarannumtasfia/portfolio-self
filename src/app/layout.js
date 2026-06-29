import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { CvProvider } from './components/CvProvider';
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Tasfia Tarannum | Software Engineer",
  description: "Portfolio dashboard — projects, experience, skills, and contact for Tasfia Tarannum, Junior Software Engineer.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      > 
        <CvProvider>
          <Navbar />

          <div>{children}</div>

          <Footer />
        </CvProvider>
        <Script id="tawk-api-init" strategy="beforeInteractive">
          {`(function(){if(window.__tawkInitDone)return;window.__tawkInitDone=1;var n=function(){};window.Tawk_API=window.Tawk_API||{};["onBeforeLoad","onStatusChange","onLoad","onChatStarted","onChatEnded","onChatMaximized","onChatMinimized","onOffline","onOnline"].forEach(function(k){if(typeof window.Tawk_API[k]!=="function")window.Tawk_API[k]=n});if(!window.__tawkConsolePatched){window.__tawkConsolePatched=1;var ce=console.error;console.error=function(){if(arguments.length===1&&arguments[0]===true)return;return ce.apply(console,arguments)}}})();`}
        </Script>
        <Script src="/tawk-loader.js?v=7" strategy="lazyOnload" />
      </body>
    </html>
  );
}
