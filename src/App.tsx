import React, { useEffect, useMemo, useRef, useState } from 'react';
import { HashRouter, NavLink, Route, Routes, useLocation } from 'react-router-dom';

const WHATSAPP_PHONE = '5575999736047';
const EMAIL_TO = 'contato@starlimp.com.br'; // <-- TROQUE para seu email real
const INSTAGRAM_HANDLE = 'star_limp_shampo';
const INSTAGRAM_URL = `https://instagram.com/${INSTAGRAM_HANDLE}`;

function buildWhatsAppLink(message: string) {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

function buildMailTo(subject: string, body: string) {
  return `mailto:${EMAIL_TO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

type ContactChannel = 'WHATSAPP' | 'EMAIL';

type TrailPoint = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number; // 0..1
};

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);
  return null;
}

function Header({
  isMobile,
  headerWppLink,
  setShowWppPopup,
  onOpenMobileMenu,
}: {
  isMobile: boolean;
  headerWppLink: string;
  setShowWppPopup: React.Dispatch<React.SetStateAction<boolean>>;
  onOpenMobileMenu: () => void;
}) {
  return (
    <header className="main-header">
      <NavLink to="/" className="logo" style={{ textDecoration: 'none', color: 'inherit' }} onClick={() => setShowWppPopup(false)}>
        STAR <span>LIMP</span>
      </NavLink>

      {!isMobile && (
        <nav className="nav-menu">
          <NavLink to="/" end>
            INÍCIO
          </NavLink>
          <NavLink to="/sobre">SOBRE NÓS</NavLink>
          <NavLink to="/produtos">PRODUTOS</NavLink>
          <NavLink to="/contato">CONTATO</NavLink>
        </nav>
      )}

      {!isMobile && (
        <a href={headerWppLink} className="btn-cta-header" target="_blank" rel="noopener noreferrer" onClick={() => setShowWppPopup(false)}>
          FALAR COM ESPECIALISTA
        </a>
      )}

      {isMobile && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <a
            href={headerWppLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setShowWppPopup(false)}
            style={{
              border: '1px solid rgba(212, 175, 55, 0.45)',
              color: 'var(--color-gold)',
              padding: '8px 10px',
              fontSize: 10,
              letterSpacing: 2,
              textDecoration: 'none',
              textTransform: 'uppercase',
              background: 'rgba(0,0,0,0.25)',
            }}
          >
            WhatsApp
          </a>

          <button
            type="button"
            onClick={onOpenMobileMenu}
            aria-label="Abrir menu"
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              border: '1px solid rgba(255,255,255,0.12)',
              background: 'rgba(0,0,0,0.25)',
              color: 'rgba(255,255,255,0.9)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 18,
            }}
          >
            ☰
          </button>
        </div>
      )}
    </header>
  );
}

function MobileMenu({
  headerWppLink,
  setShowWppPopup,
  closeMobileMenu,
}: {
  headerWppLink: string;
  setShowWppPopup: React.Dispatch<React.SetStateAction<boolean>>;
  closeMobileMenu: () => void;
}) {
  return (
    <div
      role="dialog"
      aria-label="Menu"
      onClick={closeMobileMenu}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9998,
        background: 'rgba(0,0,0,0.65)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        padding: 16,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          marginTop: 10,
          marginLeft: 'auto',
          width: 'min(92vw, 420px)',
          border: '1px solid rgba(255,255,255,0.10)',
          background: 'rgba(0,0,0,0.78)',
          boxShadow: '0 18px 40px rgba(0,0,0,0.55)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 14,
            borderBottom: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div style={{ fontFamily: 'var(--font-serif)', letterSpacing: 2, textTransform: 'uppercase' }}>Menu</div>
          <button
            type="button"
            onClick={closeMobileMenu}
            aria-label="Fechar menu"
            style={{
              border: 'none',
              background: 'transparent',
              color: 'rgba(255,255,255,0.75)',
              cursor: 'pointer',
              fontSize: 18,
            }}
          >
            ×
          </button>
        </div>

        <div style={{ padding: 14, display: 'grid', gap: 10 }}>
          {[
            { to: '/', label: 'Início' },
            { to: '/sobre', label: 'Sobre nós' },
            { to: '/produtos', label: 'Produtos' },
            { to: '/contato', label: 'Contato' },
          ].map((i) => (
            <NavLink
              key={i.to}
              to={i.to}
              onClick={closeMobileMenu}
              style={{
                textDecoration: 'none',
                color: 'rgba(255,255,255,0.92)',
                letterSpacing: 2,
                fontSize: 12,
                padding: '12px 10px',
                border: '1px solid rgba(255,255,255,0.10)',
                background: 'rgba(255,255,255,0.03)',
                textTransform: 'uppercase',
              }}
            >
              {i.label}
            </NavLink>
          ))}

          <a
            href={headerWppLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMobileMenu}
            style={{
              textDecoration: 'none',
              textTransform: 'uppercase',
              letterSpacing: 2,
              fontSize: 11,
              fontWeight: 800,
              padding: '12px 12px',
              color: 'black',
              background: 'linear-gradient(to right, var(--color-gold-dark), var(--color-gold), var(--color-gold-light))',
              border: '1px solid rgba(0,0,0,0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 6,
            }}
          >
            Falar com especialista
          </a>
        </div>
      </div>
    </div>
  );
}

function SiteFooter({ headerWppLink }: { headerWppLink: string }) {
  const year = new Date().getFullYear();

  return (
    <footer
      className="site-footer star-footer"
      style={{
        marginTop: 40,
        borderTop: '1px solid rgba(255,255,255,0.08)',
        background: 'linear-gradient(180deg, rgba(0,0,0,0.78), rgba(0,0,0,0.95))',
      }}
    >
      <style>{`
        .star-footer .star-footer-inner{
          width: 100%;
          max-width: 1160px;
          margin: 0 auto;
          padding: 40px 18px 18px 18px;
        }

        .star-footer .star-footer-grid{
          display: grid;
          grid-template-columns: 1fr;
          gap: 26px;
          align-items: start;
        }

        .star-footer .star-footer-col-title{
          color: var(--color-gold);
          letter-spacing: 0.28em;
          text-transform: uppercase;
          font-size: 11px;
          margin-bottom: 12px;
        }

        .star-footer .star-footer-links{
          display: grid;
          gap: 10px;
        }

        .star-footer a.star-footer-link{
          text-decoration: none;
          color: rgba(229,231,235,0.86);
          font-size: 13px;
          line-height: 1.55;
          transition: color .18s ease, transform .18s ease, opacity .18s ease;
          will-change: transform;
        }

        .star-footer a.star-footer-link:hover{
          color: var(--color-gold);
          transform: translateX(2px);
        }

        .star-footer a.star-footer-link:active{
          opacity: 0.9;
        }

        .star-footer .star-footer-brand{
          display: grid;
          gap: 12px;
        }

        .star-footer .star-footer-pillrow{
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-top: 2px;
        }

        .star-footer .star-footer-pill{
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 12px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.03);
          text-decoration: none;
          color: rgba(229,231,235,0.9);
          font-size: 12px;
          letter-spacing: 0.02em;
          transition: border-color .18s ease, background .18s ease, color .18s ease;
        }

        .star-footer .star-footer-pill:hover{
          border-color: rgba(212,175,55,0.32);
          background: rgba(212,175,55,0.06);
          color: rgba(255,255,255,0.92);
        }

        .star-footer .star-footer-pill-dot{
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: var(--color-gold);
          box-shadow: 0 0 0 4px rgba(212,175,55,0.10);
        }

        .star-footer .star-footer-news-row{
          display: flex;
          gap: 10px;
          align-items: center;
          flex-wrap: wrap;
          margin-top: 12px;
        }

        .star-footer .star-footer-input{
          flex: 1 1 220px;
          min-width: 220px;
          background: rgba(255,255,255,0.04);
          color: rgba(229,231,235,0.92);
          border: 1px solid rgba(255,255,255,0.12);
          padding: 12px 12px;
          outline: none;
          border-radius: 12px;
        }

        .star-footer .star-footer-btn{
          padding: 12px 14px;
          border-radius: 12px;
          border: 1px solid rgba(212,175,55,0.45);
          background: rgba(212,175,55,0.12);
          color: var(--color-gold);
          letter-spacing: 0.18em;
          font-size: 11px;
          text-transform: uppercase;
          cursor: pointer;
          transition: transform .18s ease, background .18s ease, border-color .18s ease;
        }

        .star-footer .star-footer-btn:hover{
          transform: translateY(-1px);
          border-color: rgba(212,175,55,0.60);
          background: rgba(212,175,55,0.16);
        }

        .star-footer .star-footer-bottom{
          margin-top: 22px;
          border-top: 1px solid rgba(255,255,255,0.08);
          padding-top: 14px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          color: rgba(229,231,235,0.58);
          font-size: 12px;
        }

        @media (min-width: 920px){
          .star-footer .star-footer-grid{
            grid-template-columns: 1.35fr 0.9fr 0.9fr 1.05fr;
            gap: 34px;
          }
        }
      `}</style>

      <div className="star-footer-inner">
        <div className="star-footer-grid">
          <div className="star-footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 999,
                  border: '1px solid rgba(212,175,55,0.35)',
                  background: 'rgba(212,175,55,0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-gold)',
                  fontFamily: 'var(--font-serif)',
                  letterSpacing: 2,
                }}
                aria-hidden="true"
              >
                ★
              </div>

              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 18, letterSpacing: 2, textTransform: 'uppercase' }}>
                STAR <span style={{ color: 'var(--color-gold)' }}>LIMP</span>
              </div>
            </div>

            <p style={{ marginTop: 2, color: 'rgba(229,231,235,0.74)', lineHeight: 1.7, fontSize: 13, maxWidth: 520 }}>
              Higiene, proteção e brilho para equinos com padrão premium. Desenvolvido para rotina real em haras, centros de
              treinamento e cuidadores exigentes.
            </p>

            <div className="star-footer-pillrow">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="star-footer-pill"
                aria-label={`Abrir Instagram @${INSTAGRAM_HANDLE}`}
                title={`Instagram @${INSTAGRAM_HANDLE}`}
              >
                <span className="star-footer-pill-dot" aria-hidden="true" />
                Instagram @{INSTAGRAM_HANDLE}
              </a>

              <a
                href={headerWppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="star-footer-pill"
                aria-label="Abrir WhatsApp"
                title="WhatsApp"
              >
                <span className="star-footer-pill-dot" aria-hidden="true" />
                WhatsApp
              </a>
            </div>
          </div>

          <div>
            <div className="star-footer-col-title">Institucional</div>
            <div className="star-footer-links">
              <NavLink to="/sobre" className="star-footer-link">
                Sobre a Marca
              </NavLink>
              <NavLink to="/produtos" className="star-footer-link">
                Produtos
              </NavLink>
              <NavLink to="/privacidade" className="star-footer-link">
                Política de Privacidade
              </NavLink>
              <NavLink to="/termos" className="star-footer-link">
                Termos de Uso
              </NavLink>
            </div>
          </div>

          <div>
            <div className="star-footer-col-title">Suporte</div>
            <div className="star-footer-links">
              <NavLink to="/contato" className="star-footer-link">
                Fale Conosco
              </NavLink>
              <a href={headerWppLink} target="_blank" rel="noopener noreferrer" className="star-footer-link">
                Atendimento no WhatsApp
              </a>
              <a href={buildMailTo('STAR LIMP — Suporte', 'Olá! Vim pelo site e preciso de suporte.')} className="star-footer-link">
                Enviar e-mail
              </a>
              <a
                href={buildMailTo(
                  'STAR LIMP — Quero ser revendedor',
                  'Olá! Vim pelo site e tenho interesse em ser revendedor(a). Podem me enviar as condições?',
                )}
                className="star-footer-link"
              >
                Seja um Revendedor
              </a>
            </div>
          </div>

          <div>
            <div className="star-footer-col-title">Newsletter</div>
            <div style={{ color: 'rgba(229,231,235,0.74)', fontSize: 13, lineHeight: 1.7 }}>
              Receba lançamentos e novidades exclusivas no seu e-mail.
            </div>

            <div className="star-footer-news-row">
              <input className="star-footer-input" placeholder="Seu e-mail" type="email" />
              <button type="button" className="star-footer-btn" onClick={() => {}}>
                OK
              </button>
            </div>

            <div style={{ marginTop: 10, color: 'rgba(229,231,235,0.55)', fontSize: 11, lineHeight: 1.6 }}>
              Ao enviar, você concorda em receber comunicações da STAR LIMP. (Sem spam.)
            </div>
          </div>
        </div>

        <div className="star-footer-bottom">
          <div>© {year} STAR LIMP. Todos os direitos reservados.</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ opacity: 0.85 }}>Feito com</span>
            <span aria-hidden="true" style={{ color: 'var(--color-gold)' }}>
              ♥
            </span>
            <span style={{ opacity: 0.85 }}>para equinos.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function WhatsAppFloating({
  headerWppLink,
  showWppPopup,
  setShowWppPopup,
}: {
  headerWppLink: string;
  showWppPopup: boolean;
  setShowWppPopup: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
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
                background: 'linear-gradient(to right, var(--color-gold-dark), var(--color-gold), var(--color-gold-light))',
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
  );
}

function HomePage({
  heroCanUseMouse,
  heroRef,
  canvasRef,
  onHeroMouseMove,
  onHeroMouseLeave,
}: {
  heroCanUseMouse: boolean;
  heroRef: React.MutableRefObject<HTMLElement | null>;
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
  onHeroMouseMove: (e: React.MouseEvent<HTMLElement>) => void;
  onHeroMouseLeave: () => void;
}) {
  return (
    <>
      <section
        ref={(n) => (heroRef.current = n)}
        className="hero-section"
        onMouseMove={onHeroMouseMove}
        onMouseLeave={onHeroMouseLeave}
        style={{ position: 'relative', overflow: 'hidden' }}
      >
        {heroCanUseMouse && (
          <canvas
            ref={(n) => (canvasRef.current = n)}
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              zIndex: 0,
              pointerEvents: 'none',
            }}
          />
        )}

        <div className="hero-container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="hero-badge">EXCELÊNCIA EM CUIDADO EQUINO</div>

          <h1 className="hero-title">
            STAR LIMP: O CUIDADO <br />
            <span className="gold-text-gradient">PROFISSIONAL</span> QUE <br />
            SEU EQUINO MERECE.
          </h1>

          <p className="hero-subtitle">Higiene, Proteção, Brilho e Bem-Estar Animal em cada detalhe.</p>

          <div className="hero-buttons">
            <NavLink to="/produtos" className="btn-gold">
              CONHEÇA NOSSOS PRODUTOS
            </NavLink>
            <NavLink to="/sobre" className="btn-outline">
              SOBRE A MARCA
            </NavLink>
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">
              Experiência <span className="gold-text-gradient">Premium</span>
            </h2>
            <p className="section-subtitle">
              Navegue pelo site para ver detalhes da linha, informações da marca e canais de contato com mensagens prontas.
            </p>
          </div>

          <div className="about-grid">
            <div className="about-card">
              <h3 className="about-title">Produtos</h3>
              <p className="about-text">Conheça a linha e peça orçamento em 1 clique (WhatsApp com mensagem pronta).</p>
              <div style={{ marginTop: 12 }}>
                <NavLink to="/produtos" className="btn-outline" style={{ display: 'inline-flex' }}>
                  Ver produtos
                </NavLink>
              </div>
            </div>

            <div className="about-card">
              <h3 className="about-title">Marca</h3>
              <p className="about-text">Entenda a proposta e o padrão de qualidade da STAR LIMP.</p>
              <div style={{ marginTop: 12 }}>
                <NavLink to="/sobre" className="btn-outline" style={{ display: 'inline-flex' }}>
                  Sobre nós
                </NavLink>
              </div>
            </div>

            <div className="about-card">
              <h3 className="about-title">Contato</h3>
              <p className="about-text">WhatsApp e e-mail com assuntos prontos (inclui “quero ser revendedor”).</p>
              <div style={{ marginTop: 12 }}>
                <NavLink to="/contato" className="btn-outline" style={{ display: 'inline-flex' }}>
                  Falar com especialista
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ProductsPage({
  products,
  productWppLink,
  setShowWppPopup,
}: {
  products: { name: string; desc: string; meta: string; metaShort: string }[];
  productWppLink: (p: { name: string; desc: string; metaShort: string }) => string;
  setShowWppPopup: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <section className="products-section">
      <div className="section-container">
        <div className="products-header">
          <h2 className="products-title">
            Nossa Linha <span className="gold-text-gradient">Premium</span>
          </h2>
          <p className="products-subtitle">
            Desenvolvidos com ingredientes selecionados para garantir o máximo de saúde, brilho e proteção para o seu cavalo.
          </p>
        </div>

        <div className="products-grid">
          <div className="product-card">
            <div className="product-image-placeholder">
              <span>Imagem do Shampoo</span>
            </div>

            <h3 className="product-name">{products[0].name}</h3>
            <p className="product-desc">{products[0].desc}</p>

            <div className="product-meta">DISPONÍVEL EM: {products[0].metaShort}</div>

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

            <div className="product-meta">VOLUME: {products[1].metaShort.toUpperCase()}</div>

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
  );
}

function AboutPage() {
  return (
    <section className="section-block">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">
            Sobre a <span className="gold-text-gradient">Marca</span>
          </h2>
          <p className="section-subtitle">
            A STAR LIMP nasceu para elevar o padrão de higiene e bem-estar equino, unindo ingredientes selecionados, performance e cuidado em cada fórmula.
          </p>
        </div>

        <div className="about-grid">
          <div className="about-card">
            <h3 className="about-title">Qualidade Premium</h3>
            <p className="about-text">Desenvolvimento focado em resultados: limpeza eficaz, brilho e proteção, sem agredir pele e pelagem.</p>
          </div>

          <div className="about-card">
            <h3 className="about-title">Fórmulas Selecionadas</h3>
            <p className="about-text">
              Ingredientes como óleo de citronela e óleo de coco, pensados para conforto, maciez e performance no dia a dia.
            </p>
          </div>

          <div className="about-card">
            <h3 className="about-title">Feito para Rotina Real</h3>
            <p className="about-text">Ideal para uso frequente em centros de treinamento, haras e cuidadores exigentes.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactPage({
  contactChannel,
  setContactChannel,
  contactTopic,
  setContactTopic,
  topics,
  leadName,
  setLeadName,
  leadCity,
  setLeadCity,
  whatsappMessageByTopic,
  emailSubjectAndBody,
  setShowWppPopup,
}: {
  contactChannel: ContactChannel;
  setContactChannel: React.Dispatch<React.SetStateAction<ContactChannel>>;
  contactTopic: 'ORCAMENTO' | 'DUVIDAS' | 'REVENDEDOR' | 'PARCERIA' | 'OUTROS';
  setContactTopic: React.Dispatch<React.SetStateAction<'ORCAMENTO' | 'DUVIDAS' | 'REVENDEDOR' | 'PARCERIA' | 'OUTROS'>>;
  topics: { key: 'ORCAMENTO' | 'DUVIDAS' | 'REVENDEDOR' | 'PARCERIA' | 'OUTROS'; label: string }[];
  leadName: string;
  setLeadName: React.Dispatch<React.SetStateAction<string>>;
  leadCity: string;
  setLeadCity: React.Dispatch<React.SetStateAction<string>>;
  whatsappMessageByTopic: string;
  emailSubjectAndBody: { subject: string; body: string };
  setShowWppPopup: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <section className="section-block">
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
                border: contactChannel === 'WHATSAPP' ? '1px solid rgba(212,175,55,0.55)' : '1px solid rgba(255,255,255,0.18)',
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
                border: contactChannel === 'EMAIL' ? '1px solid rgba(212,175,55,0.55)' : '1px solid rgba(255,255,255,0.18)',
                background: contactChannel === 'EMAIL' ? 'rgba(212,175,55,0.10)' : 'transparent',
                color: contactChannel === 'EMAIL' ? 'var(--color-gold)' : 'rgba(229,231,235,0.85)',
              }}
            >
              E-mail
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, minmax(0, 1fr))', gap: 12, alignItems: 'end' }}>
            <div style={{ gridColumn: 'span 12' }}>
              <div style={{ color: 'rgba(229,231,235,0.7)', fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 8 }}>
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
                {topics.map((t) => (
                  <option key={t.key} value={t.key}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ gridColumn: 'span 6' }}>
              <div style={{ color: 'rgba(229,231,235,0.7)', fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 8 }}>
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
              <div style={{ color: 'rgba(229,231,235,0.7)', fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 8 }}>
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

          <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
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
              <a className="btn-gold contact-btn" href={buildMailTo(emailSubjectAndBody.subject, emailSubjectAndBody.body)} style={{ minWidth: 280 }}>
                ENVIAR E-MAIL
              </a>
            )}

            <NavLink className="btn-outline contact-btn" to="/produtos">
              VER PRODUTOS
            </NavLink>
          </div>

          <div style={{ marginTop: 16, borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 16 }}>
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
  );
}

function SimpleLegalPage({ title }: { title: string }) {
  return (
    <section className="section-block">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">
            {title} <span className="gold-text-gradient">STAR LIMP</span>
          </h2>
          <p className="section-subtitle">
            Página institucional (importante para “cara de site de verdade” e confiança). Você pode trocar o texto depois.
          </p>
        </div>

        <div className="contact-card" style={{ textAlign: 'left' }}>
          <div style={{ color: 'rgba(229,231,235,0.88)', lineHeight: 1.9, fontSize: 14 }}>
            <p>Este conteúdo é um placeholder premium. Substitua por seu texto real (LGPD/privacidade/termos).</p>
            <p>
              Recomendado incluir: coleta de dados (se houver), cookies (se houver), finalidade de contato, segurança e canal de
              atendimento.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function AppShell() {
  const location = useLocation();

  const [showWppPopup, setShowWppPopup] = useState(true);

  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const heroRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const trailRef = useRef<TrailPoint[]>([]);
  const prevPointerRef = useRef<{ x: number; y: number } | null>(null);
  const activeRef = useRef(false);
  const lastTRef = useRef<number>(0);
  const frameGateRef = useRef<number>(0);

  const heroSizeRef = useRef<{ w: number; h: number }>({ w: 0, h: 0 });

  const [contactChannel, setContactChannel] = useState<ContactChannel>('WHATSAPP');
  const [contactTopic, setContactTopic] = useState<'ORCAMENTO' | 'DUVIDAS' | 'REVENDEDOR' | 'PARCERIA' | 'OUTROS'>('ORCAMENTO');
  const [leadName, setLeadName] = useState('');
  const [leadCity, setLeadCity] = useState('');

  useEffect(() => {
    const t = window.setTimeout(() => setShowWppPopup(false), 6500);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');

    const apply = () => {
      setIsMobile(mq.matches);
      if (!mq.matches) setMobileMenuOpen(false);
    };

    apply();

    if (typeof mq.addEventListener === 'function') mq.addEventListener('change', apply);
    // @ts-ignore
    else if (typeof mq.addListener === 'function') mq.addListener(apply);

    return () => {
      if (typeof mq.removeEventListener === 'function') mq.removeEventListener('change', apply);
      // @ts-ignore
      else if (typeof mq.removeListener === 'function') mq.removeListener(apply);
    };
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    if (mobileMenuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isMobile, mobileMenuOpen]);

  const heroCanUseMouse = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  }, []);

  const ensureHeroCanvasSize = (forceClear = false) => {
    const heroEl = heroRef.current;
    const c = canvasRef.current;
    if (!heroEl || !c) return;

    const rect = heroEl.getBoundingClientRect();
    const w = Math.max(1, Math.floor(rect.width));
    const h = Math.max(1, Math.floor(rect.height));

    const prev = heroSizeRef.current;
    if (!forceClear && prev.w === w && prev.h === h) return;

    heroSizeRef.current = { w, h };

    const dpr = 1;
    c.style.width = `${w}px`;
    c.style.height = `${h}px`;
    c.width = Math.floor(w * dpr);
    c.height = Math.floor(h * dpr);

    const ctx = c.getContext('2d');
    if (ctx) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
    }
  };

  const hardStopAndClearHero = () => {
    activeRef.current = false;
    prevPointerRef.current = null;
    trailRef.current = [];
    lastTRef.current = 0;
    frameGateRef.current = 0;

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    ensureHeroCanvasSize(true);
  };

  useEffect(() => {
    if (!heroCanUseMouse) return;

    if (location.pathname !== '/') {
      hardStopAndClearHero();
      return;
    }

    requestAnimationFrame(() => ensureHeroCanvasSize(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, heroCanUseMouse]);

  const pushTrailPoint = (x: number, y: number, vx: number, vy: number) => {
    const t = trailRef.current;
    const speed = Math.min(1, Math.sqrt(vx * vx + vy * vy) / 22);
    const count = speed > 0.45 ? 2 : 1;

    for (let i = 0; i < count; i++) {
      t.push({
        x,
        y,
        vx: vx * (0.6 + Math.random() * 0.35) + (Math.random() - 0.5) * 0.6,
        vy: vy * (0.6 + Math.random() * 0.35) + (Math.random() - 0.5) * 0.6,
        life: 1,
      });
    }

    const max = 18;
    if (t.length > max) t.splice(0, t.length - max);
  };

  const drawHeroLight = (t: number) => {
    const c = canvasRef.current;
    const heroEl = heroRef.current;
    if (!c || !heroEl) return;

    if (t - frameGateRef.current < 33) return;
    frameGateRef.current = t;

    const ctx = c.getContext('2d');
    if (!ctx) return;

    const rect = heroEl.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    const last = lastTRef.current || t;
    const dt = Math.min(0.05, (t - last) / 1000);
    lastTRef.current = t;

    ctx.save();
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = `rgba(0,0,0,${activeRef.current ? 0.22 : 0.28})`;
    ctx.fillRect(0, 0, w, h);
    ctx.restore();

    const arr = trailRef.current;
    for (let i = arr.length - 1; i >= 0; i--) {
      const p = arr[i];
      p.x += p.vx * (60 * dt);
      p.y += p.vy * (60 * dt);
      p.vx *= 0.92;
      p.vy *= 0.92;
      p.life -= 1.25 * dt;
      if (p.life <= 0) arr.splice(i, 1);
    }

    ctx.save();
    ctx.globalCompositeOperation = 'lighter';

    for (let i = 0; i < arr.length; i++) {
      const p = arr[i];
      const a = Math.max(0, Math.min(1, p.life));
      const size = 52 + (1 - a) * 22;

      const vx = p.vx;
      const vy = p.vy;
      const mag = Math.max(1, Math.sqrt(vx * vx + vy * vy));
      const nx = -vx / mag;
      const ny = -vy / mag;

      const offset = 18;
      const cx = p.x + nx * offset;
      const cy = p.y + ny * offset;

      let g = ctx.createRadialGradient(cx, cy, 0, cx, cy, size * 1.9);
      g.addColorStop(0, `rgba(212,175,55,${0.12 * a})`);
      g.addColorStop(0.35, `rgba(212,175,55,${0.06 * a})`);
      g.addColorStop(1, 'rgba(0,0,0,0)');

      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, size * 1.9, 0, Math.PI * 2);
      ctx.fill();

      g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size);
      g.addColorStop(0, `rgba(249,223,123,${0.14 * a})`);
      g.addColorStop(0.25, `rgba(212,175,55,${0.09 * a})`);
      g.addColorStop(1, 'rgba(0,0,0,0)');

      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();

    if (!activeRef.current && trailRef.current.length === 0) {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    }
  };

  const startHeroLoop = () => {
    if (!heroCanUseMouse) return;
    if (rafRef.current) return;

    lastTRef.current = 0;
    frameGateRef.current = 0;

    const loop = (time: number) => {
      drawHeroLight(time);
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
  };

  useEffect(() => {
    if (!heroCanUseMouse) return;

    ensureHeroCanvasSize(true);
    const onResize = () => ensureHeroCanvasSize(true);
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [heroCanUseMouse]);

  const onHeroMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!heroCanUseMouse) return;
    const el = heroRef.current;
    if (!el) return;

    ensureHeroCanvasSize(false);

    const r = el.getBoundingClientRect();
    const x = Math.max(0, Math.min(r.width, e.clientX - r.left));
    const y = Math.max(0, Math.min(r.height, e.clientY - r.top));

    const prev = prevPointerRef.current;
    const vx = prev ? x - prev.x : 0;
    const vy = prev ? y - prev.y : 0;

    prevPointerRef.current = { x, y };
    activeRef.current = true;

    pushTrailPoint(x, y, vx, vy);
    startHeroLoop();
  };

  const onHeroMouseLeave = () => {
    activeRef.current = false;
    prevPointerRef.current = null;
  };

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
    return topics.find((t) => t.key === contactTopic)?.label ?? 'Contato';
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
        desc: 'Limpeza profunda e brilho natural inigualável. Fórmula exclusiva enriquecida com óleo de citronela e óleo de coco.',
        meta: 'Disponível em: 1L | 2L | 5L',
        metaShort: '1L | 2L | 5L',
      },
      {
        name: 'Repelente Profissional',
        desc: 'Proteção de alta performance contra moscas e mosquitos. Garante o conforto e a tranquilidade que o animal precisa.',
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

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const mainTopPadding = isMobile ? 86 : 96;

  return (
    <div className="star-limp-site">
      {/* AJUSTE PREMIUM DESKTOP (uma mudança): melhora margens/largura e remove “vazio gigante” no PC sem mexer no mobile */}
      <style>{`
        /* Evita largura “torta” e sobra lateral no desktop */
        @media (min-width: 900px){
          .star-limp-site main{
            width: 100%;
          }

          /* A maioria das páginas usa section-container e section-block */
          .star-limp-site .section-container{
            max-width: 1160px;
            margin: 0 auto;
            padding-left: 22px;
            padding-right: 22px;
          }

          /* Reduz altura sobrando entre seções no desktop */
          .star-limp-site .section-block{
            padding-top: 56px;
            padding-bottom: 56px;
          }

          /* A “Experiência Premium” estava ficando com muito espaço embaixo */
          .star-limp-site .section-header{
            margin-bottom: 26px;
          }

          .star-limp-site .about-grid{
            gap: 18px;
          }
        }

        /* Em telas muito grandes, mantém premium sem ficar “perdido” */
        @media (min-width: 1400px){
          .star-limp-site .section-container{
            max-width: 1240px;
          }
        }
      `}</style>

      <Header isMobile={isMobile} headerWppLink={headerWppLink} setShowWppPopup={setShowWppPopup} onOpenMobileMenu={() => setMobileMenuOpen(true)} />

      {isMobile && mobileMenuOpen && (
        <MobileMenu headerWppLink={headerWppLink} setShowWppPopup={setShowWppPopup} closeMobileMenu={closeMobileMenu} />
      )}

      <main style={{ paddingTop: mainTopPadding }}>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                heroCanUseMouse={heroCanUseMouse}
                heroRef={heroRef}
                canvasRef={canvasRef}
                onHeroMouseMove={onHeroMouseMove}
                onHeroMouseLeave={onHeroMouseLeave}
              />
            }
          />
          <Route path="/produtos" element={<ProductsPage products={products} productWppLink={productWppLink} setShowWppPopup={setShowWppPopup} />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route
            path="/contato"
            element={
              <ContactPage
                contactChannel={contactChannel}
                setContactChannel={setContactChannel}
                contactTopic={contactTopic}
                setContactTopic={setContactTopic}
                topics={topics}
                leadName={leadName}
                setLeadName={setLeadName}
                leadCity={leadCity}
                setLeadCity={setLeadCity}
                whatsappMessageByTopic={whatsappMessageByTopic}
                emailSubjectAndBody={emailSubjectAndBody}
                setShowWppPopup={setShowWppPopup}
              />
            }
          />
          <Route path="/privacidade" element={<SimpleLegalPage title="Política de Privacidade" />} />
          <Route path="/termos" element={<SimpleLegalPage title="Termos de Uso" />} />
          <Route path="*" element={<SimpleLegalPage title="Página não encontrada" />} />
        </Routes>

        <SiteFooter headerWppLink={headerWppLink} />
      </main>

      <WhatsAppFloating headerWppLink={headerWppLink} showWppPopup={showWppPopup} setShowWppPopup={setShowWppPopup} />
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <AppShell />
    </HashRouter>
  );
}