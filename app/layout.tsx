import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Geovanna Alves | Nail Designer em fibra de vidro e molde",
  description: "Alongamento em fibra de vidro, molde, manutenção e nail design com atendimento exclusivo. Solicite seu horário online.",
  icons: {
    icon: "/images/geovanna-profile.jpg",
    apple: "/images/geovanna-profile.jpg",
  },
  openGraph: {
    title: "Geovanna Alves | Nail Designer",
    description: "Unhas elegantes, resistentes e pensadas para combinar com você.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
