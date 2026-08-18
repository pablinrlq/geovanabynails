import type { Metadata } from "next";
import BookingForm from "../BookingForm";

export const metadata: Metadata = {
  title: "Agendar horário | Geovanna Alves",
  description: "Escolha o procedimento, a data e um horário disponível para solicitar seu atendimento com Geovanna Alves.",
  openGraph: {
    title: "Agendar horário | Geovanna Alves",
    description: "Escolha seu procedimento e veja os horários disponíveis.",
    images: [],
  },
  twitter: {
    title: "Agendar horário | Geovanna Alves",
    description: "Escolha seu procedimento e veja os horários disponíveis.",
    images: [],
  },
};

export default function BookingPage() {
  return (
    <main className="booking-page">
      <header className="booking-page-header">
        <a className="brand" href="/" aria-label="Voltar para o início">
          <span>Geovanna</span><small>Alves · nail designer</small>
        </a>
        <a className="back-link" href="/"><span aria-hidden="true">←</span> Voltar ao site</a>
      </header>
      <section className="booking section">
        <div className="booking-intro">
          <p className="eyebrow">Agendamento</p>
          <h1>Reserve seu<br /><em>momento.</em></h1>
          <p>Escolha o procedimento, a data e um dos horários disponíveis. Ao finalizar, seu pedido também será preparado para envio no WhatsApp da Geovanna.</p>
        </div>
        <BookingForm />
      </section>
    </main>
  );
}
