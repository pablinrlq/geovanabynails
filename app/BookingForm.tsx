"use client";

import { useMemo, useState } from "react";

const services = [
  { id: "fibra", title: "Fibra de vidro", detail: "Alongamento completo", duration: "aprox. 2h30" },
  { id: "manutencao", title: "Manutenção", detail: "Fibra de vidro", duration: "aprox. 1h45" },
  { id: "molde", title: "Alongamento no molde", detail: "Estrutura personalizada", duration: "aprox. 2h" },
  { id: "gel", title: "Esmaltação em gel", detail: "Cor e acabamento", duration: "aprox. 1h15" },
];

const timeSlots = ["09:00", "11:30", "14:00", "16:30", "19:00"];

export default function BookingForm() {
  const [serviceId, setServiceId] = useState("fibra");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [note, setNote] = useState("");

  const minDate = useMemo(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  }, []);

  const selectedService = services.find((service) => service.id === serviceId) ?? services[0];
  const ready = Boolean(date && time && name.trim());

  function sendRequest() {
    if (!ready) return;
    const formattedDate = new Intl.DateTimeFormat("pt-BR", { dateStyle: "long", timeZone: "UTC" }).format(
      new Date(`${date}T12:00:00Z`),
    );
    const message = [
      "Olá, Geovanna! ✨ Gostaria de solicitar um horário.",
      "",
      `Nome: ${name.trim()}`,
      `Procedimento: ${selectedService.title}`,
      `Data desejada: ${formattedDate}`,
      `Horário desejado: ${time}`,
      note.trim() ? `Observação: ${note.trim()}` : "",
      "",
      "Pode confirmar a disponibilidade para mim?",
    ].filter(Boolean).join("\n");

    window.open(`https://wa.me/5531993210742?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="booking-shell">
      <div className="booking-form">
        <div className="booking-step">
          <div className="step-heading"><span>01</span><div><small>PROCEDIMENTO</small><h3>O que vamos fazer?</h3></div></div>
          <div className="service-picker" role="radiogroup" aria-label="Escolha o procedimento">
            {services.map((service) => (
              <button
                className={service.id === serviceId ? "service-option selected" : "service-option"}
                type="button"
                role="radio"
                aria-checked={service.id === serviceId}
                key={service.id}
                onClick={() => setServiceId(service.id)}
              >
                <span><strong>{service.title}</strong><small>{service.detail}</small></span>
                <em>{service.duration}</em>
              </button>
            ))}
          </div>
        </div>

        <div className="booking-step">
          <div className="step-heading"><span>02</span><div><small>DATA & HORÁRIO</small><h3>Quando fica melhor?</h3></div></div>
          <label className="date-field">
            <span>Data desejada</span>
            <input type="date" min={minDate} value={date} onChange={(event) => setDate(event.target.value)} />
          </label>
          <fieldset className="time-picker">
            <legend>Horários preferenciais</legend>
            {timeSlots.map((slot) => (
              <button
                type="button"
                className={time === slot ? "time selected" : "time"}
                aria-pressed={time === slot}
                key={slot}
                onClick={() => setTime(slot)}
              >{slot}</button>
            ))}
          </fieldset>
        </div>

        <div className="booking-step">
          <div className="step-heading"><span>03</span><div><small>SEUS DADOS</small><h3>Como podemos te chamar?</h3></div></div>
          <label className="text-field"><span>Seu nome</span><input type="text" placeholder="Digite seu nome" value={name} onChange={(event) => setName(event.target.value)} /></label>
          <label className="text-field"><span>Alguma observação? <i>opcional</i></span><textarea placeholder="Ex.: quero nail art, preciso remover alongamento..." rows={3} value={note} onChange={(event) => setNote(event.target.value)} /></label>
        </div>
      </div>

      <aside className="booking-summary" aria-label="Resumo do pedido de agendamento">
        <p className="summary-kicker">SEU AGENDAMENTO</p>
        <h3>Quase tudo pronto,<br /><em>{name.trim() || "linda"}.</em></h3>
        <div className="summary-list">
          <div><span>Procedimento</span><strong>{selectedService.title}</strong></div>
          <div><span>Data</span><strong>{date ? new Date(`${date}T12:00:00`).toLocaleDateString("pt-BR") : "Escolha uma data"}</strong></div>
          <div><span>Horário</span><strong>{time || "Escolha um horário"}</strong></div>
          <div><span>Duração estimada</span><strong>{selectedService.duration.replace("aprox. ", "")}</strong></div>
        </div>
        <button className="whatsapp-button" type="button" disabled={!ready} onClick={sendRequest}>
          <span aria-hidden="true">↗</span> Enviar pedido pelo WhatsApp
        </button>
        <p className="confirmation-note"><span aria-hidden="true">✓</span> O horário é confirmado após o retorno da Geovanna no WhatsApp.</p>
      </aside>
    </div>
  );
}
