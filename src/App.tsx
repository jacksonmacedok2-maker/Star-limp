import React, { useEffect, useMemo, useState } from 'react';

const WHATSAPP_PHONE = '5575999736047';
const EMAIL_TO = 'contato@starlimp.com.br'; // <-- TROQUE para seu email real

function buildWhatsAppLink(message: string) {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

function buildMailTo(subject: string, body: string) {
  return `mailto:${EMAIL_TO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

type ContactChannel = 'WHATSAPP' | 'EMAIL';

export default function App() {
  const [showWppPopup, setShowWppPopup] = useState(true);

  // Contato (abas + opções)
  const [contactChannel, setContactChannel] = useState<ContactChannel>('WHATSAPP');
  const [contactTopic, setContactTopic] = useState<'ORCAMENTO' | 'DUVIDAS' | 'REVENDEDOR' | 'PARCERIA' | 'OUTROS'>(
    'ORCAMENTO',
  );
  const [leadName, setLeadName] = useState('');
  const [leadCity, setLeadCity] = useState('');

  useEffect(() => {
    const t = window.setTimeout(() => setShowWppPopup(false), 6500);
    return () => window.clearTimeout(t);
  }, []);

  const defaultMessage = useMemo(() => {
    return `Olá! Vim pelo site da STAR LIMP. Quero tirar uma dúvida e solicitar um orçamento.`;
  }, []);

  const topics = useMemo(() => {
    return [
      { key: 'ORCAMENTO' as const, label: 'Solicitar orçamento' },
      { key: 'DUVIDAS' as const, label: 'Tirar dúvidas' },
      { key: 'REVENDEDOR' as const, label: 'Quero ser revendedor' },
      { key: 'PARCERIA' as const, label: 'Parcerias / Distribuição' },
      { key: 'OUTROS' as const, label: 'Outro assunto' },
    ];
  }, []);

  const topicLabel = useMemo(() => {
    return topics.find(t => t.key === contactTopic)?.label ?? 'Contato';
  }, [topics, contactTopic]);

  const makeBaseLeadLine = () => {
    const parts: string[] = [];
    if (leadName.trim()) parts.push(`Nome: ${leadName.trim()}`);
    if (leadCity.trim()) parts.push(`Cidade/UF: ${leadCity.trim()}`);
    return parts.length ? `\n\n${parts.join('\n')}` : '';
  };

  const whatsappMessageByTopic = useMemo(() => {
    const base = `Olá! Vim pelo site da STAR LIMP.\nAssunto: ${topicLabel}.\n`;

    const extras =
      contactTopic === 'ORCAMENTO'
        ? 'Quero um orçamento. Pode me informar valores e condições?'
        : contactTopic === 'DUVIDAS'
          ? 'Tenho algumas dúvidas sobre os produtos. Pode me ajudar?'
          : contactTopic === 'REVENDEDOR'
            ? 'Tenho interesse em ser revendedor. Como funciona cadastro, tabela e condições?'
            : contactTopic === 'PARCERIA'
              ? 'Gostaria de falar sobre parceria/distribuição. Como podemos avançar?'
              : 'Quero falar com um especialista.';

    return `${base}${extras}${makeBaseLeadLine()}`;
  }, [contactTopic, topicLabel, leadName, leadCity]);

  const emailSubjectAndBody = useMemo(() => {
    const subject = `STAR LIMP — ${topicLabel}`;

    const body =
      `Olá, equipe STAR LIMP!\n\n` +
      `Vim pelo site e gostaria de contato.\n` +
      `Assunto: ${topicLabel}\n\n` +
      `Mensagem:\n(Escreva aqui sua mensagem)\n` +
      `${makeBaseLeadLine()}\n\n` +
      `Obrigado(a)!`;

    return { subject, body };
  }, [topicLabel, leadName, leadCity]);

  const headerWppLink = buildWhatsAppLink(defaultMessage);

  const products = useMemo(() => {
    return [
      {
        name: 'Shampoo Profissional',
        desc:
          'Limpeza profunda e brilho natural inigualável. Fórmula exclusiva enriquecida com óleo de citronela e óleo de coco.',
        meta: 'Disponível em: 1L | 2L | 5L',
        metaShort: '1L | 2L | 5L',
      },
      {
        name: 'Repelente Profissional',
        desc:
          'Proteção de alta performance contra moscas e mosquitos. Garante o conforto e a tranquilidade que o animal precisa.',
        meta: 'Volume: 500ml',
        metaShort: '500ml',
      },
    ];
  }, []);

  const productWppLink = (p: { name: string; desc: string; metaShort: string }) => {
    const msg =
      `Olá! Vim pelo site da STAR LIMP.\n` +
      `Quero orçamento do ${p.name} (${p.metaShort}).\n` +
      `Descrição: ${p.desc}\n` +
      `Pode me informar valores e condições?`;
    return buildWhatsAppLink(msg);
  };

  return (
    <div className="star-limp-site">
      <header className="main-header">
        <div className="logo">
          STAR <span>LIMP</span>
        </div>

        <nav className="nav-menu">
          <a href="#home">INÍCIO</a>
          <a href="#sobre">SOBRE NÓS</a>
          <a href="#produtos">PRODUTOS</a>
          <a href="#contato">CONTATO</a>
        </nav>

        <a
          href={headerWppLink}
          className="btn-cta-header"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setShowWppPopup(false)}
        >
          FALAR COM ESPECIALISTA
        </a>
      </header>

      {/* HOME */}
      <section id="home" className="hero-section">
        <div className="hero-container">
          <div className="hero-badge">EXCELÊNCIA EM CUIDADO EQUINO</div>

          <h1 className="hero-title">
            STAR LIMP: O CUIDADO <br />
            <span className="gold-text-gradient">PROFISSIONAL</span> QUE <br />
            SEU EQUINO MERECE.
          </h1>

          <p className="hero-subtitle">Higiene, Proteção, Brilho e Bem-Estar Animal em cada detalhe.</p>

          <div className="hero-buttons">
            <a href="#produtos" className="btn-gold">
              CONHEÇA NOSSOS PRODUTOS
            </a>
            <a href="#sobre" className="btn-outline">
              SOBRE A MARCA
            </a>
          </div>
        </div>
      </section>

      {/* PRODUTOS */}
      <section id="produtos" className="products-section">
        <div className="products-container">
          <div className="products-header">
            <h2 className="products-title">
              Nossa Linha <span className="gold-text-gradient">Premium</span>
            </h2>
            <p className="products-subtitle">
              Desenvolvidos com ingredientes selecionados para garantir o máximo de saúde, brilho e proteção para o seu
              cavalo.
            </p>
          </div>

          <div className="products-grid">
            <div className="product-card">
              <div className="product-image-placeholder">
                <span>Imagem do Shampoo</span>
              </div>

              <h3 className="product-name">{products[0].name}</h3>
              <p className="product-desc">{products[0].desc}</p>

              <div className="product-meta">DISPONÍVEL EM: 1L | 2L | 5L</div>

              <a
                href={productWppLink(products[0])}
                className="btn-outline product-btn"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowWppPopup(false)}
              >
                SOLICITAR ORÇAMENTO
              </a>
            </div>

            <div className="product-card">
              <div className="product-image-placeholder">
                <span>Imagem do Repelente</span>
              </div>

              <h3 className="product-name">{products[1].name}</h3>
              <p className="product-desc">{products[1].desc}</p>

              <div className="product-meta">VOLUME: 500ML</div>

              <a
                href={productWppLink(products[1])}
                className="btn-outline product-btn"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowWppPopup(false)}
              >
                SOLICITAR ORÇAMENTO
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SOBRE */}
      <section id="sobre" className="section-block">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">
              Sobre a <span className="gold-text-gradient">Marca</span>
            </h2>
            <p className="section-subtitle">
              A STAR LIMP nasceu para elevar o padrão de higiene e bem-estar equino, unindo ingredientes selecionados,
              performance e cuidado em cada fórmula.
            </p>
          </div>

          <div className="about-grid">
            <div className="about-card">
              <h3 className="about-title">Qualidade Premium</h3>
              <p className="about-text">
                Desenvolvimento focado em resultados: limpeza eficaz, brilho e proteção, sem agredir pele e pelagem.
              </p>
            </div>

            <div className="about-card">
              <h3 className="about-title">Fórmulas Selecionadas</h3>
              <p className="about-text">
                Ingredientes como óleo de citronela e óleo de coco, pensados para conforto, maciez e performance no dia
                a dia.
              </p>
            </div>

            <div className="about-card">
              <h3 className="about-title">Feito para Rotina Real</h3>
              <p className="about-text">
                Ideal para uso frequente em centros de treinamento, haras e cuidadores exigentes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTATO (abas + opções) */}
      <section id="contato" className="section-block">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">
              Fale com um <span className="gold-text-gradient">Especialista</span>
            </h2>
            <p className="section-subtitle">
              Escolha o canal e o assunto. A mensagem já vai pronta (orçamento, dúvidas, revenda e etc).
            </p>
          </div>

          <div className="contact-card">
            {/* Abas */}
            <div
              style={{
                display: 'flex',
                gap: 10,
                justifyContent: 'center',
                flexWrap: 'wrap',
                paddingBottom: 16,
                marginBottom: 18,
                borderBottom: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <button
                type="button"
                onClick={() => setContactChannel('WHATSAPP')}
                style={{
                  cursor: 'pointer',
                  padding: '10px 14px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  fontSize: 11,
                  border: contactChannel === 'WHATSAPP'
                    ? '1px solid rgba(212,175,55,0.55)'
                    : '1px solid rgba(255,255,255,0.18)',
                  background: contactChannel === 'WHATSAPP' ? 'rgba(212,175,55,0.10)' : 'transparent',
                  color: contactChannel === 'WHATSAPP' ? 'var(--color-gold)' : 'rgba(229,231,235,0.85)',
                }}
              >
                WhatsApp
              </button>

              <button
                type="button"
                onClick={() => setContactChannel('EMAIL')}
                style={{
                  cursor: 'pointer',
                  padding: '10px 14px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  fontSize: 11,
                  border: contactChannel === 'EMAIL'
                    ? '1px solid rgba(212,175,55,0.55)'
                    : '1px solid rgba(255,255,255,0.18)',
                  background: contactChannel === 'EMAIL' ? 'rgba(212,175,55,0.10)' : 'transparent',
                  color: contactChannel === 'EMAIL' ? 'var(--color-gold)' : 'rgba(229,231,235,0.85)',
                }}
              >
                E-mail
              </button>
            </div>

            {/* Seletor de assunto + dados */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
                gap: 12,
                alignItems: 'end',
              }}
            >
              <div style={{ gridColumn: 'span 12' }}>
                <div
                  style={{
                    color: 'rgba(229,231,235,0.7)',
                    fontSize: 11,
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    marginBottom: 8,
                  }}
                >
                  Assunto
                </div>

                <select
                  value={contactTopic}
                  onChange={(e) => setContactTopic(e.target.value as any)}
                  style={{
                    width: '100%',
                    background: 'rgba(0,0,0,0.25)',
                    color: 'rgba(229,231,235,0.92)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    padding: '12px 12px',
                    letterSpacing: '0.04em',
                    outline: 'none',
                  }}
                >
                  {topics.map(t => (
                    <option key={t.key} value={t.key}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ gridColumn: 'span 6' }}>
                <div
                  style={{
                    color: 'rgba(229,231,235,0.7)',
                    fontSize: 11,
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    marginBottom: 8,
                  }}
                >
                  Nome (opcional)
                </div>
                <input
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  placeholder="Seu nome"
                  style={{
                    width: '100%',
                    background: 'rgba(0,0,0,0.25)',
                    color: 'rgba(229,231,235,0.92)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    padding: '12px 12px',
                    outline: 'none',
                  }}
                />
              </div>

              <div style={{ gridColumn: 'span 6' }}>
                <div
                  style={{
                    color: 'rgba(229,231,235,0.7)',
                    fontSize: 11,
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    marginBottom: 8,
                  }}
                >
                  Cidade/UF (opcional)
                </div>
                <input
                  value={leadCity}
                  onChange={(e) => setLeadCity(e.target.value)}
                  placeholder="Ex.: Feira de Santana/BA"
                  style={{
                    width: '100%',
                    background: 'rgba(0,0,0,0.25)',
                    color: 'rgba(229,231,235,0.92)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    padding: '12px 12px',
                    outline: 'none',
                  }}
                />
              </div>
            </div>

            {/* CTA principal */}
            <div
              style={{
                marginTop: 16,
                display: 'flex',
                flexWrap: 'wrap',
                gap: 12,
                justifyContent: 'center',
              }}
            >
              {contactChannel === 'WHATSAPP' ? (
                <a
                  className="btn-gold contact-btn"
                  href={buildWhatsAppLink(whatsappMessageByTopic)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setShowWppPopup(false)}
                  style={{ minWidth: 280 }}
                >
                  ENVIAR NO WHATSAPP
                </a>
              ) : (
                <a
                  className="btn-gold contact-btn"
                  href={buildMailTo(emailSubjectAndBody.subject, emailSubjectAndBody.body)}
                  style={{ minWidth: 280 }}
                >
                  ENVIAR E-MAIL
                </a>
              )}

              <a className="btn-outline contact-btn" href="#produtos">
                VER PRODUTOS
              </a>
            </div>

            {/* Preview da mensagem */}
            <div
              style={{
                marginTop: 16,
                borderTop: '1px solid rgba(255,255,255,0.08)',
                paddingTop: 16,
              }}
            >
              <div
                style={{
                  color: 'rgba(229,231,235,0.7)',
                  fontSize: 11,
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  marginBottom: 10,
                  textAlign: 'center',
                }}
              >
                Prévia da mensagem
              </div>

              <div
                style={{
                  whiteSpace: 'pre-wrap',
                  color: 'rgba(229,231,235,0.78)',
                  fontSize: 13,
                  lineHeight: 1.7,
                  background: 'rgba(0,0,0,0.22)',
                  border: '1px solid rgba(255,255,255,0.10)',
                  padding: 14,
                }}
              >
                {contactChannel === 'WHATSAPP'
                  ? whatsappMessageByTopic
                  : `Assunto: ${emailSubjectAndBody.subject}\n\n${emailSubjectAndBody.body}`}
              </div>

              <div className="contact-note" style={{ marginTop: 14 }}>
                Atendimento: seg–sáb • Resposta rápida • Opções prontas (inclui revenda).
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="footer-logo">STAR</span> <span className="footer-gold">LIMP</span>
          </div>
          <div className="footer-copy">© {new Date().getFullYear()} STAR LIMP. Todos os direitos reservados.</div>
        </div>
      </footer>

      {/* WhatsApp flutuante + popup */}
      <div
        style={{
          position: 'fixed',
          right: 18,
          bottom: 18,
          zIndex: 9999,
          display: 'flex',
          alignItems: 'flex-end',
          gap: 12,
        }}
      >
        {showWppPopup && (
          <div
            role="dialog"
            aria-label="Mensagem do WhatsApp"
            style={{
              width: 270,
              background: 'rgba(0,0,0,0.78)',
              border: '1px solid rgba(212,175,55,0.35)',
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)',
              padding: '12px 12px 10px 12px',
              color: 'white',
              boxShadow: '0 18px 40px rgba(0,0,0,0.55)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 }}>
              <div style={{ fontSize: 12, letterSpacing: 2, color: 'var(--color-gold)', textTransform: 'uppercase' }}>
                Atendimento rápido
              </div>

              <button
                onClick={() => setShowWppPopup(false)}
                aria-label="Fechar"
                style={{
                  border: 'none',
                  background: 'transparent',
                  color: 'rgba(255,255,255,0.75)',
                  cursor: 'pointer',
                  fontSize: 16,
                  lineHeight: 1,
                  padding: 2,
                }}
              >
                ×
              </button>
            </div>

            <div style={{ marginTop: 8, fontSize: 13, color: 'rgba(229,231,235,0.85)', lineHeight: 1.5 }}>
              Quer um orçamento agora? Clique no WhatsApp e fale com um especialista.
            </div>

            <div style={{ marginTop: 10 }}>
              <a
                href={headerWppLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowWppPopup(false)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  padding: '10px 12px',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  letterSpacing: 2,
                  fontSize: 11,
                  fontWeight: 700,
                  color: 'black',
                  background:
                    'linear-gradient(to right, var(--color-gold-dark), var(--color-gold), var(--color-gold-light))',
                }}
              >
                CHAMAR NO WHATSAPP
              </a>
            </div>
          </div>
        )}

        <a
          href={headerWppLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Abrir WhatsApp"
          title="Falar no WhatsApp"
          style={{
            width: 58,
            height: 58,
            borderRadius: 999,
            background: 'linear-gradient(to right, var(--color-gold-dark), var(--color-gold), var(--color-gold-light))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none',
            boxShadow: '0 18px 40px rgba(0,0,0,0.55)',
            border: '1px solid rgba(0,0,0,0.25)',
          }}
          onClick={() => setShowWppPopup(false)}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M20.52 3.48A11.9 11.9 0 0 0 12.06 0C5.46 0 .1 5.36.1 11.96c0 2.1.55 4.15 1.6 5.96L0 24l6.25-1.64a11.9 11.9 0 0 0 5.81 1.49h.01c6.6 0 11.96-5.36 11.96-11.96 0-3.2-1.25-6.2-3.51-8.41Zm-8.45 18.37h-.01a9.93 9.93 0 0 1-5.06-1.39l-.36-.22-3.71.97.99-3.62-.24-.37a9.9 9.9 0 0 1-1.52-5.26C2.16 6.46 6.56 2.06 12.07 2.06c2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.9 6.99c0 5.5-4.4 9.9-9.89 9.9Zm5.76-7.4c-.31-.16-1.82-.9-2.1-1-.28-.1-.49-.16-.7.16-.2.31-.8 1-1 1.2-.18.2-.37.23-.68.08-.31-.16-1.3-.48-2.48-1.53-.92-.82-1.54-1.83-1.72-2.14-.18-.31-.02-.47.14-.63.14-.14.31-.37.47-.55.16-.18.2-.31.31-.52.1-.2.05-.39-.03-.55-.08-.16-.7-1.68-.96-2.3-.25-.6-.5-.52-.7-.52h-.6c-.2 0-.52.08-.8.39-.28.31-1.05 1.02-1.05 2.48 0 1.45 1.08 2.86 1.23 3.06.16.2 2.12 3.23 5.14 4.53.72.31 1.28.5 1.72.64.72.23 1.37.2 1.89.12.58-.09 1.82-.74 2.07-1.45.26-.71.26-1.31.18-1.45-.08-.13-.28-.2-.6-.36Z"
              fill="rgba(0,0,0,0.85)"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}