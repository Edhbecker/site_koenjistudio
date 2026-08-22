"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cutPhotos, siteConfig, studioPhotos } from "@/lib/site";

type PhotoFrameProps = {
  src: string | null;
  alt: string;
  file: string;
  label?: string;
  className?: string;
  priority?: boolean;
  tone?: "dark" | "mid" | "light";
};

function PhotoFrame({ src, alt, file, label, className = "", priority = false, tone = "mid" }: PhotoFrameProps) {
  return (
    <figure className={`photo-frame photo-${tone} ${className}`}>
      {src ? (
        <Image src={src} alt={alt} fill sizes="(max-width: 720px) 100vw, 50vw" priority={priority} />
      ) : (
        <div className="photo-placeholder" role="img" aria-label={`Espaço reservado: ${alt}`}>
          <span>Foto oficial</span>
          <strong>{file}</strong>
        </div>
      )}
      {label && <figcaption>{label}</figcaption>}
    </figure>
  );
}

function BrandMark({ dark = false, compact = false }: { dark?: boolean; compact?: boolean }) {
  const logo = dark ? siteConfig.media.logoDark : siteConfig.media.logoLight;
  return logo ? (
    <Image className="real-logo" src={logo} alt="Koenji Studio" width={compact ? 130 : 420} height={compact ? 60 : 180} />
  ) : (
    <span className={`brand-fallback ${compact ? "brand-compact" : ""}`}>
      <b>KOENJI</b>
      <span>{compact ? "Studio" : "Barbershop · assinatura original pendente"}</span>
    </span>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("menu-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <a href="#top" aria-label="Koenji Studio — início"><BrandMark compact /></a>
        <nav className="desktop-nav" aria-label="Navegação principal">
          <a href="#studio">O studio</a>
          <a href="#cuts">Cortes</a>
          <a href="#bento">Bento</a>
          <a href="#instagram">Instagram</a>
          <a className="button button-light" href={siteConfig.bookingUrl} target="_blank" rel="noopener noreferrer">Agendar horário ↗</a>
        </nav>
        <button className={`menu-button ${open ? "is-open" : ""}`} type="button" aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>
          <span /><span />
        </button>
      </header>

      <div className={`mobile-menu ${open ? "is-open" : ""}`} id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu principal" aria-hidden={!open}>
        <p>Koenji / Navigation</p>
        <nav>
          <a href="#studio" onClick={close} tabIndex={open ? 0 : -1}><span>01</span> O studio</a>
          <a href="#cuts" onClick={close} tabIndex={open ? 0 : -1}><span>02</span> Cortes</a>
          <a href="#bento" onClick={close} tabIndex={open ? 0 : -1}><span>03</span> Bento</a>
          <a href="#instagram" onClick={close} tabIndex={open ? 0 : -1}><span>04</span> Instagram</a>
          <a href={siteConfig.bookingUrl} target="_blank" rel="noopener noreferrer" onClick={close} tabIndex={open ? 0 : -1}><span>05</span> Agendar ↗</a>
        </nav>
        <div className="mobile-menu-foot">Cut / Style / Culture<br />Koenji Studio®</div>
      </div>
    </>
  );
}

function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return <div className="section-label"><span>{number}</span><i /> <b>{children}</b></div>;
}

function MobileBooking() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let footerVisible = false;
    const update = () => setVisible(window.scrollY > window.innerHeight * 0.72 && !footerVisible);
    const footer = document.getElementById("footer");
    const observer = footer
      ? new IntersectionObserver(([entry]) => {
          footerVisible = entry.isIntersecting;
          update();
        }, { threshold: 0.05 })
      : null;
    if (footer) observer?.observe(footer);
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", update);
    };
  }, []);

  if (!visible) return null;
  return <a className="mobile-booking" href={siteConfig.bookingUrl} target="_blank" rel="noopener noreferrer">Agendar horário <span>↗</span></a>;
}

export default function Home() {
  const [ownerFirstName, ...ownerRest] = siteConfig.ownerName.split(" ");

  return (
    <main>
      <Header />

      <section className="hero" id="top" aria-labelledby="hero-title">
        <PhotoFrame src={siteConfig.media.hero} alt="Bento trabalhando no Koenji Studio" file="hero/hero.jpg" className="hero-photo" priority tone="dark" />
        <div className="hero-noise" aria-hidden="true" />
        <div className="hero-shade" aria-hidden="true" />
        <div className="hero-rail hero-rail-left" aria-hidden="true">KOENJI / 001<br />BARBERSHOP<br />VOL. 001</div>
        <div className="hero-rail hero-rail-right" aria-hidden="true">STYLE · CULTURE · ATTITUDE</div>
        <div className="hero-content">
          <p className="eyebrow">Barber / Style / Culture</p>
          <h1 id="hero-title"><BrandMark /></h1>
          <div className="hero-footer">
            <p className="hero-statement">Não é só<br />sobre o corte.</p>
            <div className="hero-actions">
              <a className="button button-paper" href={siteConfig.bookingUrl} target="_blank" rel="noopener noreferrer">Agendar horário ↗</a>
              <a className="text-link" href="#studio">Conhecer o studio ↓</a>
            </div>
          </div>
        </div>
      </section>

      <div className="marquee" aria-label="Koenji Studio — corte, estilo e cultura">
        <div>
          <span>Koenji Studio — Cut — Style — Culture — Barbershop — </span>
          <span aria-hidden="true">Koenji Studio — Cut — Style — Culture — Barbershop — </span>
        </div>
      </div>

      <section className="studio-intro paper-section section-pad" id="studio">
        <SectionLabel number="01">The studio</SectionLabel>
        <div className="intro-grid">
          <p className="chapter-number" aria-hidden="true">01</p>
          <div>
            <p className="kicker">Koenji Studio / manifesto</p>
            <h2>Barbearia,<br /><em>estilo</em> e cultura.</h2>
          </div>
          <div className="intro-copy">
            <p>Koenji Studio nasce da mistura entre barbearia, identidade e cultura. Um espaço onde cada corte é pensado de acordo com quem senta na cadeira.</p>
            <p className="microcopy">Sem fórmula pronta. Técnica, conversa e uma leitura pessoal para cada visual.</p>
          </div>
        </div>
      </section>

      <section className="studio-gallery dark-section section-pad" aria-labelledby="space-title">
        <div className="gallery-heading">
          <SectionLabel number="01.1">The space</SectionLabel>
          <h2 id="space-title">CONHEÇA<br />O ESPAÇO.</h2>
          <p>Um espaço intimista, preparado para receber cada cliente com conforto, atenção e personalidade.</p>
        </div>
        <div className="studio-grid">
          {studioPhotos.map((photo, index) => (
            <PhotoFrame key={photo.file} src={siteConfig.media.studio[index]} alt={`Ambiente do Koenji Studio — ${photo.label}`} file={photo.file} label={photo.label} className={`studio-photo studio-photo-${index + 1}`} tone={index % 3 === 0 ? "light" : index % 2 ? "dark" : "mid"} />
          ))}
        </div>
      </section>

      <section className="cuts paper-section section-pad" id="cuts" aria-labelledby="cuts-title">
        <SectionLabel number="02">The cuts</SectionLabel>
        <div className="cuts-heading">
          <h2 id="cuts-title">CADA CABEÇA<br />PEDE UMA <em>LEITURA</em><br />DIFERENTE.</h2>
          <p>Contact sheet / trabalhos Koenji<br /><span>Categorias provisórias para edição.</span></p>
        </div>
        <div className="cuts-grid">
          {cutPhotos.map((cut, index) => (
            <PhotoFrame key={cut.file} src={siteConfig.media.cuts[index]} alt={`Trabalho de corte — ${cut.category}`} file={cut.file} label={`${cut.label} · ${cut.category}`} className={`cut-photo cut-photo-${index + 1}`} tone={index % 2 ? "dark" : "mid"} />
          ))}
        </div>
        <div className="section-booking">
          <p>Gostou do que viu?</p>
          <a className="button button-ink" href={siteConfig.bookingUrl} target="_blank" rel="noopener noreferrer">Quero cortar ↗</a>
        </div>
      </section>

      <section className="editorial-break" aria-labelledby="identity-title">
        <PhotoFrame src={siteConfig.media.editorialBreak} alt="Processo de corte no Koenji Studio" file="hero/editorial-break.jpg" className="break-photo" tone="dark" />
        <div className="break-overlay" aria-hidden="true" />
        <p className="break-tag">Koenji / Barbershop</p>
        <h2 id="identity-title">YOUR HAIR.<br />YOUR STYLE.<br /><em>YOUR IDENTITY.</em></h2>
        <p className="break-index">K / 02<br />VOL. 001</p>
      </section>

      <section className="bento-section dark-section section-pad" id="bento" aria-labelledby="bento-title">
        <SectionLabel number="03">The barber</SectionLabel>
        <div className="bento-grid">
          <PhotoFrame src={siteConfig.media.bento} alt="Retrato de Bento Eurides, proprietário e barbeiro" file="bento/bento-01.jpg" label="Bento / Portrait 01" className="bento-photo" tone="mid" />
          <div className="bento-copy">
            <p className="kicker">Owner / Barber / Koenji</p>
            <h2 id="bento-title">{ownerFirstName}<br /><em>{ownerRest.join(" ")}.</em></h2>
            <p>Proprietário e barbeiro à frente do Koenji Studio, Bento conduz o trabalho do studio a partir de uma visão que conecta técnica, identidade pessoal e cultura.</p>
            {siteConfig.bentoBiographyNote && (
              <p className="content-note">{siteConfig.bentoBiographyNote}</p>
            )}
            <a className="button button-paper" href={siteConfig.bookingUrl} target="_blank" rel="noopener noreferrer">Agendar com Bento ↗</a>
          </div>
          <div className="bento-words" aria-hidden="true">BARBER · OWNER · KOENJI · STYLE · CULTURE</div>
        </div>
      </section>

      <section className="experience paper-section section-pad" aria-labelledby="experience-title">
        <SectionLabel number="04">The experience</SectionLabel>
        <div className="experience-head">
          <h2 id="experience-title">DA CONVERSA<br />À FINALIZAÇÃO.</h2>
          <p>O corte começa antes da máquina.</p>
        </div>
        <ol className="steps">
          <li><span>01</span><h3>Conversa</h3><p>Entender o estilo e o resultado buscado.</p></li>
          <li><span>02</span><h3>Corte</h3><p>Respeitar cabelo, formato e identidade.</p></li>
          <li><span>03</span><h3>Finalização</h3><p>Finalizar o visual e orientar a manutenção.</p></li>
        </ol>
      </section>

      <section className="instagram-section dark-section section-pad" id="instagram" aria-labelledby="instagram-title">
        <SectionLabel number="05">Instagram</SectionLabel>
        <div className="instagram-head">
          <div><p className="kicker">Fresh cuts / Studio life / Culture</p><h2 id="instagram-title">FOLLOW<br /><em>THE CULTURE.</em></h2></div>
          <div><p className="insta-handle">{siteConfig.instagramHandle}</p><a className="text-link" href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer">Seguir no Instagram ↗</a></div>
        </div>
        <a className="instagram-grid" href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Abrir o Instagram do Koenji Studio">
          {["instagram-01.jpg", "instagram-02.jpg", "instagram-03.jpg", "instagram-04.jpg"].map((file, index) => (
            <PhotoFrame key={file} src={siteConfig.media.instagram[index]} alt={`Publicação do Koenji Studio ${index + 1}`} file={`instagram/${file}`} className="instagram-photo" tone={index % 2 ? "light" : "mid"} />
          ))}
        </a>
      </section>

      <section className="booking paper-section" id="booking" aria-labelledby="booking-title">
        <div className="booking-top"><span>KOENJI / BOOKING</span><span>BOOKSY ↗</span></div>
        <div className="booking-main">
          <p className="kicker">Your next cut / Vol. 001</p>
          <h2 id="booking-title">SEU PRÓXIMO<br />CORTE COMEÇA <em>AQUI.</em></h2>
          <a className="booking-link" href={siteConfig.bookingUrl} target="_blank" rel="noopener noreferrer"><span>Agendar horário</span><b>↗</b></a>
          <p className="booking-note">Agendamento realizado pelo Booksy.</p>
        </div>
      </section>

      <footer className="site-footer dark-section" id="footer">
        <div className="footer-brand"><BrandMark /><p>Cut / Style / Culture</p></div>
        <div className="footer-links"><a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer">Instagram ↗</a><a href={siteConfig.bookingUrl} target="_blank" rel="noopener noreferrer">Agendar ↗</a></div>
        <div className="footer-bottom"><span>© Koenji Studio</span><span>Koenji Studio® / Vol. 001</span><a href="#top">Voltar ao topo ↑</a></div>
      </footer>

      <MobileBooking />
    </main>
  );
}
