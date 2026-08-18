import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "geovanna-alves-nails.pablomoisesgr.chatgpt.site";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const baseUrl = `${protocol}://${host}`;
  const title = "Geovanna Alves | Nail Designer em fibra de vidro e molde";
  const description = "Alongamento em fibra de vidro, molde, manutenção e nail design com atendimento exclusivo. Solicite seu horário online.";

  return {
    title,
    description,
    icons: { icon: "/images/geovanna-profile.jpg", apple: "/images/geovanna-profile.jpg" },
    openGraph: {
      title: "Geovanna Alves | Nail Designer",
      description: "Unhas elegantes, resistentes e pensadas para combinar com você.",
      type: "website",
      locale: "pt_BR",
      images: [{ url: `${baseUrl}/og.png`, width: 1536, height: 1024, alt: "Geovanna Alves Nail Designer" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Geovanna Alves | Nail Designer",
      description: "Unhas impecáveis. Do seu jeito.",
      images: [`${baseUrl}/og.png`],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
