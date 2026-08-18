const gallery = [
  { src: "/images/work-05.jpg", alt: "Unhas vermelhas com acabamento em gel", tag: "Cor intensa", href: "https://www.instagram.com/geovannaby_nails/p/Db_YpRNzSnR/" },
  { src: "/images/work-06.jpg", alt: "Unhas peroladas com detalhe dourado", tag: "Elegância", href: "https://www.instagram.com/geovannaby_nails/p/DbT_gvzTc_Z/" },
  { src: "/images/work-07.jpg", alt: "Francesinha branca com pontos de luz", tag: "Delicadeza", href: "https://www.instagram.com/geovannaby_nails/p/DadXKy8kxwV/" },
  { src: "/images/work-08.jpg", alt: "Francesinha artística com laço em relevo", tag: "Nail art", href: "https://www.instagram.com/agatha_mirellah/reel/DYSaGx-uBPHtXclZ9wVAjAyGUwOcHZNWoG0mb40/" },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Geovanna Alves — início">
          <span>Geovanna</span>
          <small>Alves · nail designer</small>
        </a>
        <nav aria-label="Navegação principal">
          <a href="#portfolio">Portfólio</a>
          <a href="#servicos">Serviços</a>
          <a href="#sobre">Sobre</a>
          <a className="nav-cta" href="/agendamento">Agendar horário</a>
        </nav>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p className="eyebrow">Alongamentos que parecem seus</p>
          <h1>Unhas impecáveis.<br /><em>Do seu jeito.</em></h1>
          <p className="hero-lead">Especialista em fibra de vidro e molde, Geovanna cria unhas elegantes, resistentes e pensadas para combinar com você.</p>
          <div className="hero-actions">
            <a className="primary-button" href="/agendamento">Quero agendar</a>
            <a className="text-button" href="#portfolio">Ver trabalhos <span aria-hidden="true">↘</span></a>
          </div>
          <div className="trust-row" aria-label="Diferenciais"><span>Fibra de vidro</span><i /><span>Molde</span><i /><span>Atendimento exclusivo</span></div>
        </div>

        <div className="hero-visual" aria-label="Geovanna Alves, nail designer">
          <div className="hero-arch"><img src="/images/work-03.jpg" alt="Geovanna Alves, nail designer" /></div>
          <div className="signature" aria-hidden="true">G</div>
          <a className="booking-peek" href="/agendamento">
            <span className="booking-icon" aria-hidden="true">✦</span>
            <div><small>AGENDE EM POUCOS PASSOS</small><strong>Escolha seu procedimento</strong></div>
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      <div className="marquee" aria-hidden="true"><span>BELEZA QUE DURA</span><i>✦</i><span>DELICADEZA EM CADA DETALHE</span><i>✦</i><span>SEU MOMENTO DE AUTOCUIDADO</span></div>

      <section className="portfolio section" id="portfolio">
        <div className="section-heading">
          <div><p className="eyebrow">Portfólio</p><h2>Cada detalhe,<br /><em>uma assinatura.</em></h2></div>
          <p>Dos clássicos às criações mais marcantes, cada atendimento nasce de uma conversa e termina com unhas que têm a sua cara.</p>
        </div>
        <div className="gallery-grid">
          {gallery.map((item, index) => (
            <a className={`gallery-item item-${index + 1}`} href={item.href} target="_blank" rel="noreferrer" key={item.src}>
              <figure><img src={item.src} alt={item.alt} /><figcaption><span>{item.tag}</span><small>Ver no Instagram <b aria-hidden="true">↗</b></small></figcaption></figure>
            </a>
          ))}
        </div>
        <a className="instagram-link" href="https://www.instagram.com/geovannaby_nails/" target="_blank" rel="noreferrer">Mais inspirações no Instagram <span aria-hidden="true">↗</span></a>
      </section>

      <section className="services section" id="servicos">
        <div className="section-heading light">
          <div><p className="eyebrow">Serviços</p><h2>Técnica, cuidado<br /><em>e personalidade.</em></h2></div>
          <p>Procedimentos personalizados, com atenção à saúde das unhas naturais e um acabamento impecável.</p>
        </div>
        <div className="services-grid">
          <article><span className="service-number">01</span><div className="service-symbol">◇</div><h3>Fibra de vidro</h3><p>Alongamento leve e resistente, moldado para respeitar o formato das suas mãos.</p><a href="/agendamento?servico=fibra">Agendar este serviço <span>→</span></a></article>
          <article><span className="service-number">02</span><div className="service-symbol">⌒</div><h3>Alongamento no molde</h3><p>Estrutura criada do zero para um resultado fino, elegante e totalmente personalizado.</p><a href="/agendamento?servico=molde">Agendar este serviço <span>→</span></a></article>
          <article><span className="service-number">03</span><div className="service-symbol">✦</div><h3>Manutenção & gel</h3><p>Cuidado contínuo, nova cor e brilho renovado para suas unhas permanecerem lindas.</p><a href="/agendamento?servico=manutencao">Agendar este serviço <span>→</span></a></article>
        </div>
      </section>

      <section className="experience section">
        <div className="experience-photo"><img src="/images/work-02.jpg" alt="Espaço de atendimento Geovanna Alves Nail Designer" /><span>Espaço preparado<br />para receber você</span></div>
        <div className="experience-copy">
          <p className="eyebrow">A experiência</p>
          <h2>Seu momento.<br /><em>Sem pressa.</em></h2>
          <p>Um atendimento reservado, cuidadoso e pensado para você se sentir confortável do início ao fim.</p>
          <ul><li><span>01</span><div><strong>Conversa & inspiração</strong><small>Entendemos seu estilo e o resultado que você deseja.</small></div></li><li><span>02</span><div><strong>Preparação cuidadosa</strong><small>Higiene, técnica e proteção das unhas naturais.</small></div></li><li><span>03</span><div><strong>Acabamento perfeito</strong><small>Formato, cor e detalhes finalizados com precisão.</small></div></li></ul>
        </div>
      </section>

      <section className="about section" id="sobre">
        <div className="about-copy"><p className="eyebrow">Sobre a profissional</p><h2>Prazer,<br />sou a <em>Geovanna.</em></h2><p>Especialista em alongamentos de fibra de vidro e no molde, encontrei nas unhas uma forma de valorizar a beleza e a personalidade de cada mulher.</p><p>Mais do que um procedimento, meu propósito é oferecer uma experiência de cuidado — e ver cada cliente sair daqui se sentindo ainda mais linda.</p><div className="about-stats"><div><strong>2,1 mil+</strong><span>pessoas acompanham<br />meu trabalho</span></div><div><strong>100%</strong><span>atendimento<br />personalizado</span></div></div></div>
        <div className="about-photo"><div className="about-arch"><img src="/images/work-03.jpg" alt="Retrato de Geovanna Alves" /></div><span className="about-mark" aria-hidden="true">GA</span><div className="about-seal"><strong>G</strong><span>NAIL<br />DESIGNER</span></div></div>
      </section>

      <section className="faq section">
        <div><p className="eyebrow">Antes de agendar</p><h2>Dúvidas<br /><em>frequentes.</em></h2></div>
        <div className="faq-list">
          <details><summary>Quanto tempo dura um alongamento?<span>+</span></summary><p>A durabilidade depende dos cuidados e do crescimento natural das unhas. A manutenção costuma ser recomendada em intervalos regulares definidos com a profissional.</p></details>
          <details><summary>Como funciona a confirmação do horário?<span>+</span></summary><p>Você envia seu pedido pelo site e a Geovanna confirma a disponibilidade e todas as orientações diretamente pelo WhatsApp.</p></details>
          <details><summary>Posso levar uma inspiração?<span>+</span></summary><p>Claro. Envie sua referência no WhatsApp para alinharmos cores, formato, nail art e o tempo necessário para o atendimento.</p></details>
          <details><summary>Preciso chegar com as unhas preparadas?<span>+</span></summary><p>Não. A preparação faz parte do atendimento. Se houver alongamento anterior para remoção, avise no campo de observações ao agendar.</p></details>
        </div>
      </section>

      <section className="final-cta"><p className="eyebrow">Seu próximo detalhe favorito</p><h2>Vamos criar suas<br /><em>próximas unhas?</em></h2><a className="primary-button" href="/agendamento">Agendar meu horário</a><div className="final-script" aria-hidden="true">Geovanna</div></section>

      <footer><a className="brand footer-brand" href="#inicio"><span>Geovanna</span><small>Alves · nail designer</small></a><div className="footer-links"><a href="#portfolio">Portfólio</a><a href="#servicos">Serviços</a><a href="#sobre">Sobre</a><a href="/agendamento">Agendamento</a></div><div className="footer-social"><a href="https://www.instagram.com/geovannaby_nails/" target="_blank" rel="noreferrer">Instagram ↗</a><a href="https://wa.me/5531993210742" target="_blank" rel="noreferrer">WhatsApp ↗</a></div><p>© {new Date().getFullYear()} Geovanna Alves. Todos os direitos reservados.</p></footer>

      <a className="floating-whatsapp" href="https://wa.me/5531993210742" target="_blank" rel="noreferrer" aria-label="Falar com Geovanna no WhatsApp"><span>↗</span><b>WhatsApp</b></a>
    </main>
  );
}
