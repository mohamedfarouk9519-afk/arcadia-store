import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { CartProvider } from "@/components/providers/CartProvider";
import BackButton from "@/components/BackButton";

export const metadata = {
  title: "Arcadia Store 🕹️",
  description: "متجر احترافي",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen bg-gradient-to-br from-purple-900 via-slate-900 to-black text-white">
        <CartProvider>
          <Navbar />
          <BackButton />
          <main className="container mx-auto px-4 py-10">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}