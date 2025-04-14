import { Ubuntu, Jost } from "next/font/google";
import "./globals.css";
import { Footer, Header } from "./components";

const ubuntu = Ubuntu({
  variable: "--font-family",
  subsets: ["cyrillic"],
  weight: ['300', '400', '500', '700'],
});

const jost = Jost({
  variable: "--third-family",
  subsets: ["cyrillic"],
  weight: ['300', '400', '500', '700'],
});

export const metadata = {
  title: "Компас СП | Главная",
  description: "Магазин «КОМПАС» — ваш надежный проводник в мире качественной одежды и обуви для охоты, рыбалки и работы!",
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className={`${ubuntu.variable} ${jost.variable}`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
