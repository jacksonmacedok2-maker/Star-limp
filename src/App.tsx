import React, { useEffect, useMemo, useRef, useState } from 'react';
import { HashRouter, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Sparkles, Feather } from 'lucide-react';

// ✅ HERO IMAGE (Vite / Hostinger-safe)
// Usando import direto para que o Vite processe o asset corretamente no build
import heroHorseUrl from './assets/hero-horse-DSUKCTkd.webp';

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

type Product = {
  id: 'shampoo' | 'repelente' | 'abrilhantador';
  name: string;
  desc: string;
  volumes: string[];
  defaultVolume: string;
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
      <NavLink
        to="/"
        className="logo"
        style={{ textDecoration: 'none', color: 'inherit' }}
        onClick={() => setShowWppPopup(false)}
      >
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
        <a
          href={headerWppLink}
          className="btn-cta-header"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setShowWppPopup(false)}
        >
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
    <motion.div
      role="dialog"
      aria-label="Menu"
      onClick={closeMobileMenu}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
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
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ delay: 0.1, duration: 0.3, ease: 'easeOut' }}
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
      </motion.div>
    </motion.div>
  );
}

function SiteFooter({ headerWppLink }: { headerWppLink: string }) {
  const year = new Date().getFullYear();

  const InstagramIcon = ({ className }: { className?: string }) => (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M12 16.2a4.2 4.2 0 1 0 0-8.4 4.2 4.2 0 0 0 0 8.4Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M17.6 6.6h.01" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );

  const WhatsAppIcon = ({ className }: { className?: string }) => (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20.52 3.48A11.9 11.9 0 0 0 12.06 0C5.46 0 .1 5.36.1 11.96c0 2.1.55 4.15 1.6 5.96L0 24l6.25-1.64a11.9 11.9 0 0 0 5.81 1.49h.01c6.6 0 11.96-5.36 11.96-11.96 0-3.2-1.25-6.2-3.51-8.41Zm-8.45 18.37h-.01a9.93 9.93 0 0 1-5.06-1.39l-.36-.22-3.71.97.99-3.62-.24-.37a9.9 9.9 0 0 1-1.52-5.26C2.16 6.46 6.56 2.06 12.07 2.06c2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.9 6.99c0 5.5-4.4 9.9-9.89 9.9Zm5.76-7.4c-.31-.16-1.82-.9-2.1-1-.28-.1-.49-.16-.7.16-.2.31-.8 1-1 1.2-.18.2-.37.23-.68.08-.31-.16-1.3-.48-2.48-1.53-.92-.82-1.54-1.83-1.72-2.14-.18-.31-.02-.47.14-.63.14-.14.31-.37.47-.55.16-.18.2-.31.31-.52.1-.2.05-.39-.03-.55-.08-.16-.7-1.68-.96-2.3-.25-.6-.5-.52-.7-.52h-.6c-.2 0-.52.08-.8.39-.28.31-1.05 1.02-1.05 2.48 0 1.45 1.08 2.86 1.23 3.06.16.2 2.12 3.23 5.14 4.53.72.31 1.28.5 1.72.64.72.23 1.37.2 1.89.12.58-.09 1.82-.74 2.07-1.45.26-.71.26-1.31.18-1.45-.08-.13-.28-.2-.6-.36Z"
        fill="currentColor"
      />
    </svg>
  );

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

        .star-footer .star-footer-pill-ico{
          width: 16px;
          height: 16px;
          color: var(--color-gold);
          opacity: 0.95;
          filter: drop-shadow(0 0 10px rgba(212,175,55,0.18));
          flex: 0 0 auto;
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
                <InstagramIcon className="star-footer-pill-ico" />
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
                <WhatsAppIcon className="star-footer-pill-ico" />
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
              <button type="button" className="star-footer-btn" onClick={() => { }}>
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
    <>
      <style>{`
        .whatsapp-float-container {
          position: fixed;
          bottom: 18px;
          right: 4%; /* Alinhamento mobile cravado com o header */
          z-index: 9999;
          display: flex;
          align-items: flex-end;
          gap: 12px;
        }
        @media (min-width: 768px) {
          .whatsapp-float-container {
            right: 5%; /* Alinhamento desktop cravado com o header */
          }
        }
      `}</style>

      <div className="whatsapp-float-container">
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
    </>
  );
}

function PremiumMarquee() {
  const words = ["Alta Performance", "•", "Padrão Ouro", "•", "Resultados Visíveis", "•", "Brilho e Proteção", "•"];

  return (
    <div style={{
      width: '100%',
      backgroundColor: '#030303',
      borderTop: '1px solid rgba(212,175,55,0.15)',
      borderBottom: '1px solid rgba(212,175,55,0.15)',
      padding: '12px 0',
      overflow: 'hidden',
      position: 'relative',
      display: 'flex',
      alignItems: 'center'
    }}>
      <style>{`
        @keyframes scrollMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-content {
          display: flex;
          white-space: nowrap;
          animation: scrollMarquee 25s linear infinite;
          will-change: transform;
        }
        .marquee-item {
          color: rgba(212,175,55,0.7);
          font-size: 0.75rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          margin: 0 2rem;
        }
      `}</style>
      <div className="marquee-content">
        {/* Renderizamos duas vezes para dar o efeito infinito */}
        {[...words, ...words, ...words, ...words].map((w, i) => (
          <span key={i} className="marquee-item">{w}</span>
        ))}
      </div>
    </div>
  );
}

function HomePillars() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const pillars = [
    {
      icon: <Shield size={32} strokeWidth={1} color="var(--color-gold)" />,
      title: "Fórmulas Balanceadas",
      desc: "Limpeza profunda sem irritações. Ingredientes rigorosamente selecionados para a saúde da pele equina."
    },
    {
      icon: <Sparkles size={32} strokeWidth={1} color="var(--color-gold)" />,
      title: "Proteção Constante",
      desc: "Repelência duradoura contra moscas e carrapatos, garantindo foco e tranquilidade nos treinos."
    },
    {
      icon: <Feather size={32} strokeWidth={1} color="var(--color-gold)" />,
      title: "Brilho Indiscutível",
      desc: "O padrão ouro em acabamento. Pelagem radiante, macia e desembaraçada já na primeira aplicação."
    }
  ];

  return (
    <section style={{ backgroundColor: '#030303', padding: '8rem 5%', position: 'relative' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <motion.div
          style={{ textAlign: 'center', marginBottom: '5rem' }}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 2.75rem)', color: 'white', letterSpacing: '0.05em', marginBottom: '1rem', fontWeight: 400 }}>
            A Essência do <span className="gold-text-gradient">Cuidado Premium</span>
          </h2>
          <p style={{ color: 'rgba(229,231,235,0.6)', fontSize: '1.05rem', maxWidth: '650px', margin: '0 auto', lineHeight: 1.6 }}>
            Alta performance e sofisticação em cada frasco. Soluções desenvolvidas para elevar o padrão estético e o bem-estar do seu cavalo.
          </p>
        </motion.div>

        <motion.div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
          }}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {pillars.map((pillar, i) => (
            <SpotlightCard key={i} pillar={pillar} variants={itemVariants} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Sub-componente mágico do Bento Grid (21st.dev style)
function SpotlightCard({ pillar, variants }: any) {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <motion.div variants={variants}>
      <div
        ref={divRef}
        onMouseMove={handleMouseMove}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          overflow: 'hidden',
          borderRadius: '24px',
          border: '1px solid rgba(255,255,255,0.08)',
          backgroundColor: '#0a0a0a',
          padding: '2.5rem',
          height: '100%',
          boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)',
          transition: 'all 0.3s ease',
        }}
        className="bento-spotlight-card"
      >
        {/* Camada luminosa do hover escondida atrás do conteúdo */}
        <div
          style={{
            pointerEvents: 'none',
            position: 'absolute',
            inset: 0,
            opacity: opacity,
            transition: 'opacity 0.5s ease',
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(212,175,55,0.08), transparent 40%)`
          }}
        />

        {/* Borda Glow Externa que se move com o mouse */}
        <div
          style={{
            position: 'absolute',
            inset: '-1px',
            borderRadius: '24px',
            pointerEvents: 'none',
            zIndex: 1,
            opacity: opacity,
            background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(212,175,55,0.4), transparent 40%)`,
            WebkitMaskImage: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            padding: '1px' // espessura da borda falsa
          }}
        />

        <div style={{
          width: 56, height: 56, borderRadius: '16px', marginBottom: '2rem',
          background: 'linear-gradient(135deg, rgba(30,30,30,0.8), rgba(10,10,10,1))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.1), 0 4px 12px rgba(0,0,0,0.4)',
          position: 'relative', zIndex: 2
        }}>
          {pillar.icon}
        </div>

        <h3 style={{ color: 'white', fontSize: '1.25rem', marginBottom: '1rem', fontFamily: 'var(--font-serif)', letterSpacing: '0.02em', position: 'relative', zIndex: 2 }}>
          {pillar.title}
        </h3>

        <p style={{ color: 'rgba(229,231,235,0.55)', fontSize: '0.95rem', lineHeight: 1.6, position: 'relative', zIndex: 2 }}>
          {pillar.desc}
        </p>

        <style>{`
          .bento-spotlight-card:hover {
            transform: translateY(-4px);
            border-color: rgba(212,175,55,0.2) !important;
          }
        `}</style>
      </div>
    </motion.div>
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
    <section
      ref={(n) => (heroRef.current = n)}
      className="hero-section"
      onMouseMove={onHeroMouseMove}
      onMouseLeave={onHeroMouseLeave}
      style={{
        position: 'relative',
        overflow: 'hidden',

        // ✅ FIX DEFINITIVO: background direto com camadas (gradientes + imagem)
        backgroundImage: `
          linear-gradient(to bottom, rgba(10,10,10,0.72), rgba(10,10,10,0.98)),
          radial-gradient(1000px 700px at 72% 45%, rgba(212,175,55,0.16), rgba(0,0,0,0) 60%),
          url("${heroHorseUrl}"),
          radial-gradient(circle at 2px 2px, rgba(212,175,55,0.03) 1px, transparent 0)
        `,
        backgroundSize: '100% 100%, 100% 100%, cover, 40px 40px',
        backgroundPosition: 'center, center, right center, center',
        backgroundRepeat: 'no-repeat, no-repeat, no-repeat, repeat',

        // fallback visual
        backgroundColor: '#000',
      }}
    >
      {heroCanUseMouse ? (
        <canvas
          ref={(n) => (canvasRef.current = n)}
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
            pointerEvents: 'none',
            mixBlendMode: 'normal',
            // O canvas em si já pinta uma máscara em rgba(3,3,3, 0.75 a 0.92)
            opacity: 1,
          }}
        />
      ) : (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            background: 'radial-gradient(1200px 700px at 70% 30%, rgba(3,3,3,0.75), rgba(3,3,3,0.92))',
          }}
        />
      )}

      <motion.div
        className="hero-container"
        style={{ position: 'relative', zIndex: 2 }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="hero-badge"
        >
          Padrão Ouro em Cuidados
        </motion.div>

        <h1 className="hero-title">
          ELEVANDO O PADRÃO DO <br />
          <span className="gold-text-gradient">CUIDADO EQUINO</span>.
        </h1>

        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Higiene, Proteção, Brilho e Bem-Estar Animal em cada detalhe.
        </motion.p>

        <motion.div
          className="hero-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <NavLink to="/produtos" className="btn-gold">
            CONHEÇA NOSSOS PRODUTOS
          </NavLink>
          <NavLink to="/sobre" className="btn-outline">
            SOBRE A MARCA
          </NavLink>
        </motion.div>
      </motion.div>
    </section>
  );
}

function ProductsPage({
  products,
  productWppLink,
  setShowWppPopup,
}: {
  products: Product[];
  productWppLink: (p: { name: string; desc: string }, volume: string) => string;
  setShowWppPopup: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const initialSelected = useMemo(() => {
    const m: Record<string, string> = {};
    for (const p of products) m[p.id] = p.defaultVolume;
    return m;
  }, [products]);

  const [selectedById, setSelectedById] = useState<Record<string, string>>(initialSelected);

  useEffect(() => {
    setSelectedById(initialSelected);
  }, [initialSelected]);

  const setVol = (id: string, v: string) => {
    setSelectedById((prev) => ({ ...prev, [id]: v }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="products-section">
      <div className="section-container">
        <motion.div
          className="products-header"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="products-title">
            Nossa Linha <span className="gold-text-gradient">Premium</span>
          </h2>
          <p className="products-subtitle">
            Desenvolvidos com ingredientes selecionados para garantir o máximo de saúde, brilho e proteção para o seu cavalo.
          </p>
        </motion.div>

        <style>{`
          .product-meta-chooser{
            margin-top: auto;
            padding-top: 18px;
            margin-bottom: 24px;
            border-top: 1px solid rgba(255,255,255,0.05); /* Mais suave */
          }

          .product-meta-label{
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
            color: rgba(229,231,235,0.55);
            font-size: 10px;
            letter-spacing: 0.28em;
            text-transform: uppercase;
            margin-bottom: 14px;
          }

          .product-vol-chips{
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
            justify-content: center;
          }

          .product-chip{
            appearance: none;
            border: 1px solid rgba(255,255,255,0.12);
            background: rgba(0,0,0,0.4);
            color: rgba(229,231,235,0.8);
            padding: 10px 16px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 11px;
            font-weight: 600;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            transition: all .25s ease;
            user-select: none;
          }

          .product-chip:hover{
            transform: translateY(-2px);
            border-color: rgba(212,175,55,0.4);
            background: rgba(212,175,55,0.05);
            color: white;
          }

          .product-chip.is-selected{
            border-color: var(--color-gold);
            background: linear-gradient(135deg, rgba(212,175,55,0.15), rgba(212,175,55,0.05));
            color: var(--color-gold);
            box-shadow: 0 4px 12px rgba(0,0,0,0.25);
          }

          .product-chip:focus-visible{
            outline: 2px solid rgba(212,175,55,0.55);
            outline-offset: 2px;
          }

          @media (max-width: 520px){
            .product-chip{
              padding: 12px 14px;
              font-size: 11px;
            }
          }
        `}</style>

        <motion.div
          className="products-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {products.map((p) => {
            const selected = selectedById[p.id] ?? p.defaultVolume;

            return (
              <motion.div
                key={p.id}
                className="product-card"
                variants={itemVariants}
                whileHover={{ y: -6, boxShadow: "0 25px 45px rgba(0, 0, 0, 0.9)" }}
                style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
              >
                <div
                  className="product-image-placeholder"
                  style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.05) 100%)' }}
                >
                  <span>
                    {p.id === 'shampoo'
                      ? 'Imagem do Shampoo'
                      : p.id === 'repelente'
                        ? 'Imagem do Repelente'
                        : 'Imagem do Abrilhantador'}
                  </span>
                </div>

                <h3 className="product-name">{p.name}</h3>
                <p className="product-desc">{p.desc}</p>

                <div className="product-meta-chooser">
                  <div className="product-meta-label">
                    <span>{p.volumes.length > 1 ? 'Escolha o volume' : 'Volume'}</span>
                    <span style={{ color: 'var(--color-gold)', letterSpacing: '0.22em' }}>{selected.toUpperCase()}</span>
                  </div>

                  <div className="product-vol-chips" role="radiogroup" aria-label={`Volumes de ${p.name}`}>
                    {p.volumes.map((v) => {
                      const isSelected = selected === v;
                      return (
                        <button
                          key={v}
                          type="button"
                          className={`product-chip ${isSelected ? 'is-selected' : ''}`}
                          onClick={() => setVol(p.id, v)}
                          aria-pressed={isSelected}
                        >
                          {v}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <a
                  href={productWppLink({ name: p.name, desc: p.desc }, selected)}
                  className="btn-outline product-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setShowWppPopup(false)}
                >
                  SOLICITAR ORÇAMENTO
                </a>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section className="section-block">
      <div className="section-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">
            Sobre a <span className="gold-text-gradient">Marca</span>
          </h2>
          <p className="section-subtitle">
            A STAR LIMP nasceu para elevar o padrão de higiene e bem-estar equino, unindo ingredientes selecionados, performance e
            cuidado em cada fórmula.
          </p>
        </motion.div>

        <motion.div
          className="about-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.div className="about-card" variants={itemVariants}>
            <h3 className="about-title">Qualidade Premium</h3>
            <p className="about-text">Desenvolvimento focado em resultados: limpeza eficaz, brilho e proteção, sem agredir pele e pelagem.</p>
          </motion.div>

          <motion.div className="about-card" variants={itemVariants}>
            <h3 className="about-title">Fórmulas Selecionadas</h3>
            <p className="about-text">Ingredientes como óleo de citronela e óleo de coco, pensados para conforto, maciez e performance no dia a dia.</p>
          </motion.div>

          <motion.div className="about-card" variants={itemVariants}>
            <h3 className="about-title">Feito para Rotina Real</h3>
            <p className="about-text">Ideal para uso frequente em centros de treinamento, haras e cuidadores exigentes.</p>
          </motion.div>
        </motion.div>
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
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">
            Fale com um <span className="gold-text-gradient">Especialista</span>
          </h2>
          <p className="section-subtitle">Escolha o canal e o assunto. A mensagem já vai pronta (orçamento, dúvidas, revenda e etc).</p>
        </motion.div>

        <motion.div
          className="contact-card"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
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
                transition: 'all 0.3s ease'
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
                transition: 'all 0.3s ease'
              }}
            >
              E-mail
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, minmax(0, 1fr))', gap: 12, alignItems: 'end' }}>
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
                {topics.map((t) => (
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
              {contactChannel === 'WHATSAPP' ? whatsappMessageByTopic : `Assunto: ${emailSubjectAndBody.subject}\n\n${emailSubjectAndBody.body}`}
            </div>

            <div className="contact-note" style={{ marginTop: 14 }}>
              Atendimento: seg–sáb • Resposta rápida • Opções prontas (inclui revenda).
            </div>
          </div>
        </motion.div>
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
          <p className="section-subtitle">Página institucional (importante para “cara de site de verdade” e confiança). Você pode trocar o texto depois.</p>
        </div>

        <div className="contact-card" style={{ textAlign: 'left' }}>
          <div style={{ color: 'rgba(229,231,235,0.88)', lineHeight: 1.9, fontSize: 14 }}>
            <p>Este conteúdo é um placeholder premium. Substitua por seu texto real (LGPD/privacidade/termos).</p>
            <p>Recomendado incluir: coleta de dados (se houver), cookies (se houver), finalidade de contato, segurança e canal de atendimento.</p>
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

  const smoothPointerRef = useRef({ x: -1000, y: -1000 });
  const targetPointerRef = useRef({ x: -1000, y: -1000 });
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

    const dpr = Math.min(2, window.devicePixelRatio || 1);

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
    targetPointerRef.current = { x: -1000, y: -1000 };
    smoothPointerRef.current = { x: -1000, y: -1000 };
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

  const drawHeroLight = (t: number) => {
    const c = canvasRef.current;
    const heroEl = heroRef.current;
    if (!c || !heroEl) return;

    if (t - frameGateRef.current < 20) return; // 50fps max para rodar suave
    frameGateRef.current = t;

    const ctx = c.getContext('2d');
    if (!ctx) return;

    const rect = heroEl.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    const last = lastTRef.current || t;
    const dt = Math.min(0.05, (t - last) / 1000);
    lastTRef.current = t;

    // 1. Limpar e colorir de preto a máscara escura
    ctx.clearRect(0, 0, w, h);
    ctx.save();
    ctx.globalCompositeOperation = 'source-over';

    // Fumaça de fundo geral - escura porém suave (85% a 92%)
    const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
    bgGrad.addColorStop(0, 'rgba(5,5,5,0.72)');
    bgGrad.addColorStop(1, 'rgba(2,2,2,0.92)');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);
    ctx.restore();

    // Lerp (interpolação suave) da posição da luz até a posição real do mouse
    if (activeRef.current) {
      if (smoothPointerRef.current.x === -1000) {
        smoothPointerRef.current = { ...targetPointerRef.current };
      }
      smoothPointerRef.current.x += (targetPointerRef.current.x - smoothPointerRef.current.x) * (8 * dt);
      smoothPointerRef.current.y += (targetPointerRef.current.y - smoothPointerRef.current.y) * (8 * dt);
    } else {
      // Se saiu do canvas, some rápido e desliga
      smoothPointerRef.current.x = -1000;
      smoothPointerRef.current.y = -1000;
    }

    const { x, y } = smoothPointerRef.current;

    // Se estiver ativo e dentro da tela, "apagar a fumaça" e gerar a luz suave
    if (x > -500 && y > -500 && activeRef.current) {
      // 3. Modificador de máscara que cria um "buraco suave" que revela a foto linda de fundo
      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';

      // Um super holofote gigantesco para "iluminar bastante o espaço", mas com degradê de fumaça
      const sizeBase = 400; // Raio imenso e difuso

      let g = ctx.createRadialGradient(x, y, 0, x, y, sizeBase);
      // Remove 100% no meio revelando a imagem original, e vai reduzindo a fumaça sutilmente
      g.addColorStop(0, `rgba(0,0,0,1)`);
      g.addColorStop(0.3, `rgba(0,0,0,0.85)`);
      g.addColorStop(0.7, `rgba(0,0,0,0.3)`);
      g.addColorStop(1, 'rgba(0,0,0,0)');

      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, sizeBase, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 4. Tint de reflexo ouro/amarelo ultra sutil (para manter a vibe da marca Star Limp)
      ctx.save();
      ctx.globalCompositeOperation = 'source-over';
      const tintRadius = 200;
      let tintGrad = ctx.createRadialGradient(x, y, 0, x, y, tintRadius);
      tintGrad.addColorStop(0, `rgba(255,220,130,0.18)`); // Apenas 18% de amarelo claro no meio
      tintGrad.addColorStop(0.6, `rgba(212,175,55,0.06)`);
      tintGrad.addColorStop(1, 'rgba(0,0,0,0)');

      ctx.fillStyle = tintGrad;
      ctx.beginPath();
      ctx.arc(x, y, tintRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    if (!activeRef.current) {
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

    targetPointerRef.current = { x, y };

    if (!activeRef.current) {
      activeRef.current = true;
      // Para não teleportar do canto (0,0) ou (-1000,-1000) de uma vez
      smoothPointerRef.current = { x, y };
    }

    startHeroLoop();
  };

  const onHeroMouseLeave = () => {
    activeRef.current = false;
    // Opcional: Para uma fumaça que decresce/desaparece lentamente, não zeramos ainda o anim frame,
    // ele vai se redesenhar uma última vez sem o spotlight.
    targetPointerRef.current = { x: -1000, y: -1000 };
    startHeroLoop();
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

  const products = useMemo<Product[]>(() => {
    return [
      {
        id: 'shampoo',
        name: 'Shampoo Profissional',
        desc: 'Limpeza profunda e brilho natural inigualável. Fórmula exclusiva enriquecida com óleo de citronela e óleo de coco.',
        volumes: ['1L', '2L', '5L'],
        defaultVolume: '2L',
      },
      {
        id: 'repelente',
        name: 'Repelente Profissional',
        desc: 'Proteção de alta performance contra moscas e mosquitos. Garante o conforto e a tranquilidade que o animal precisa.',
        volumes: ['500ml'],
        defaultVolume: '500ml',
      },
      {
        id: 'abrilhantador',
        name: 'Abrilhantador Profissional',
        desc: 'Brilho e acabamento premium para a pelagem. Ideal para apresentação e rotina, com toque leve e resultado visível.',
        volumes: ['500ml'],
        defaultVolume: '500ml',
      },
    ];
  }, []);

  const productWppLink = (p: { name: string; desc: string }, volume: string) => {
    const msg =
      `Olá! Vim pelo site da STAR LIMP.\n` +
      `Quero orçamento do ${p.name} (${volume}).\n` +
      `Descrição: ${p.desc}\n` +
      `Pode me informar valores e condições?`;
    return buildWhatsAppLink(msg);
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const isHome = location.pathname === '/';
  const mainTopPadding = isHome ? 0 : isMobile ? 86 : 96;

  return (
    <div className="star-limp-site">
      <style>{`
        @media (min-width: 900px){
          .star-limp-site main{
            width: 100%;
          }

          .star-limp-site .section-container{
            max-width: 1160px;
            margin: 0 auto;
            padding-left: 22px;
            padding-right: 22px;
          }

          .star-limp-site .section-block{
            padding-top: 56px;
            padding-bottom: 56px;
          }

          .star-limp-site .section-header{
            margin-bottom: 26px;
          }

          .star-limp-site .about-grid{
            gap: 18px;
          }
        }

        @media (min-width: 1400px){
          .star-limp-site .section-container{
            max-width: 1240px;
          }
        }
      `}</style>

      <Header
        isMobile={isMobile}
        headerWppLink={headerWppLink}
        setShowWppPopup={setShowWppPopup}
        onOpenMobileMenu={() => setMobileMenuOpen(true)}
      />

      {isMobile && mobileMenuOpen && (
        <MobileMenu headerWppLink={headerWppLink} setShowWppPopup={setShowWppPopup} closeMobileMenu={closeMobileMenu} />
      )}

      <main style={{ paddingTop: mainTopPadding }}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HomePage
                  heroCanUseMouse={heroCanUseMouse}
                  heroRef={heroRef}
                  canvasRef={canvasRef}
                  onHeroMouseMove={onHeroMouseMove}
                  onHeroMouseLeave={onHeroMouseLeave}
                />
                <PremiumMarquee />
                <HomePillars />
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
    <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ScrollToTop />
      <AppShell />
    </HashRouter>
  );
}