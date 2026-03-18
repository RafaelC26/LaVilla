import { useState } from "react";

function FooterSection({ t, logoImg, footerImage, language = "es" }) {
  const isSpanish = language === "es";
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const rightsText = isSpanish
    ? "© 2026 La Villa. Todos los derechos reservados."
    : "© 2026 La Villa. All rights reserved.";
  const creditPrefix = isSpanish ? "Experiencia Digital por " : "Digital experience by ";

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const footerLinks = {
    explore: [
      { label: isSpanish ? "Inicio" : "Home", action: () => scrollToTop() },
      { label: isSpanish ? "Alojamientos" : "Stays", action: () => scrollToSection("listings") },
    ],
    support: [
      { label: isSpanish ? "Centro de ayuda" : "Help Center", href: "#" },
      { label: isSpanish ? "Políticas" : "Policies", href: "#" },
      { label: isSpanish ? "Términos" : "Terms", href: "#" },
      { label: isSpanish ? "Privacidad" : "Privacy", href: "#" },
    ],
    contact: [
      { icon: "email", label: "stay@lavilla.com" },
      { icon: "phone", label: "+57 321 000 0000" },
    ]
  };

  return (
    <footer id="footer" className="footerRedesign footerEnhanced">
      {/* Ola de mar - Transición desde la sección anterior */}
      <div className="oceanWaveDivider footerWaveAnimation">
        <svg className="oceanWaves" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <defs>
            <linearGradient id="footerWaveGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(5, 7, 10, 0.3)" />
              <stop offset="100%" stopColor="rgba(5, 7, 10, 0.7)" />
            </linearGradient>
            <linearGradient id="footerWaveGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(5, 7, 10, 0.5)" />
              <stop offset="100%" stopColor="rgba(5, 7, 10, 0.85)" />
            </linearGradient>
            <linearGradient id="footerWaveGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(5, 7, 10, 0.7)" />
              <stop offset="100%" stopColor="rgba(5, 7, 10, 0.98)" />
            </linearGradient>
          </defs>
          <path className="wave1" d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z" fill="url(#footerWaveGradient1)" />
          <path className="wave2" d="M0,70 C360,130 540,10 900,70 C1080,130 1260,10 1440,70 L1440,120 L0,120 Z" fill="url(#footerWaveGradient2)" />
          <path className="wave3" d="M0,80 C180,140 360,20 540,80 C720,140 900,20 1080,80 C1260,140 1350,60 1440,80 L1440,120 L0,120 Z" fill="url(#footerWaveGradient3)" />
        </svg>
      </div>

      {/* Background Image with Overlay */}
      <div className="footerAtmosphere" aria-hidden="true">
        <img src={footerImage} alt="" className="footerAtmosphereImage" loading="lazy" decoding="async" />
        <div className="footerAtmosphereFade" />
        <div className="footerAtmosphereGradient" />
      </div>

      <div className="footerWaveContainer">
        <div className="footerContent footerContentEnhanced">

          {/* Main Footer Grid */}
          <div className="footerMainGrid">
            {/* Column 1: Brand & Identity */}
            <div className="footerBrandCol footerBrandEnhanced">
              <div className="footerBrandHeader">
                <div className="logo footerLogoPremium">
                  <img src={logoImg} alt="La Villa" className="logoImg" style={{ height: '40px' }} />
                </div>
                <div className="footerBrandBadge">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{isSpanish ? 'Anfitrión Premium' : 'Premium Host'}</span>
                </div>
              </div>
              <p className="footerDescription">{t.footer.description}</p>

              {/* Social Links moved here for balance */}
              <div className="footerSocials footerSocialsEnhanced">
                <a href="https://www.airbnb.com" target="_blank" rel="noopener noreferrer" className="socialBtn socialBtnEnhanced" aria-label="Airbnb">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-.54 17.63c-.24.27-.57.42-.93.42s-.69-.15-.93-.42c-1.02-1.14-4.11-4.8-4.11-7.08 0-2.78 2.26-5.04 5.04-5.04s5.04 2.26 5.04 5.04c0 2.28-3.09 5.94-4.11 7.08zm.54-5.13c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
                  </svg>
                </a>
                <a href="https://www.booking.com" target="_blank" rel="noopener noreferrer" className="socialBtn socialBtnEnhanced" aria-label="Booking.com">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.91 0H3.09C1.38 0 0 1.38 0 3.09v17.82C0 22.62 1.38 24 3.09 24h17.82C22.62 24 24 22.62 24 20.91V3.09C24 1.38 22.62 0 20.91 0zM7.5 17.5H5V9h2.5v8.5zm-1.25-9.7a1.45 1.45 0 1 1 0-2.9 1.45 1.45 0 0 1 0 2.9zm11.25 9.7h-2.5v-4.25c0-1.01-.36-1.7-1.27-1.7-.69 0-1.1.47-1.28.92-.07.16-.08.39-.08.62V17.5H10v-8.5h2.4v1.16h.03c.33-.63 1.14-1.29 2.35-1.29 2.07 0 2.92 1.36 2.92 3.42V17.5z" />
                  </svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="socialBtn socialBtnEnhanced" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Column 2: Explore & Newsletter */}
            <div className="footerLinksCol footerLinksColEnhanced">
              <h4 className="footerColTitle">{isSpanish ? 'Explorar' : 'Explore'}</h4>
              <ul className="footerLinksList footerLinksListEnhanced">
                {footerLinks.explore.map((link, i) => (
                  <li key={i}>
                    <button onClick={link.action} className="footerLinkBtn">
                      <span>{link.label}</span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>

              {/* Newsletter moved here for visual parity and to fill space */}
              <div className="footerNewsletter">
                <h4>{isSpanish ? "Suscríbete" : "Subscribe"}</h4>
                <p>{isSpanish ? "Recibe las mejores ofertas y ofertas exclusivas." : "Get the best deals and exclusive offers."}</p>
                <form className="footerNewsletterForm" onSubmit={handleSubscribe}>
                  <input
                    type="email"
                    placeholder={isSpanish ? "Tu email" : "Your email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button type="submit" className="footerNewsletterBtn" aria-label="Subscribe">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 5l7 7-7 7M5 12h14" />
                    </svg>
                  </button>
                </form>
                {subscribed && (
                  <span className="footerNewsletterSuccess">
                    {isSpanish ? "¡Suscrito con éxito!" : "Successfully subscribed!"}
                  </span>
                )}
              </div>
            </div>

            {/* Column 3: Contact & Support */}
            <div className="footerLinksCol footerLinksColEnhanced">
              <h4 className="footerColTitle">{isSpanish ? 'Contacto' : 'Contact'}</h4>
              <ul className="footerContactList footerContactListEnhanced">
                {footerLinks.contact.map((item, i) => (
                  <li key={i} className="footerContactItem">
                    <span className="footerContactIcon">
                      {item.icon === 'location' && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                      )}
                      {item.icon === 'email' && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                          <polyline points="22,6 12,13 2,6" />
                        </svg>
                      )}
                      {item.icon === 'phone' && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                        </svg>
                      )}
                    </span>
                    <span className="footerContactText">{item.label}</span>
                  </li>
                ))}
              </ul>

              <a
                href="https://wa.me/573210000000"
                target="_blank"
                rel="noopener noreferrer"
                className="footerWhatsAppBtn footerWhatsAppBtnEnhanced"
              >
                <div className="footerWhatsAppIcon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div className="footerWhatsAppText">
                  <strong>{isSpanish ? "WhatsApp" : "WhatsApp"}</strong>
                  <span>{isSpanish ? "Respuesta inmediata" : "Instant reply"}</span>
                </div>
                <svg className="footerWhatsAppArrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </a>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="footerBottom footerBottomEnhanced">
            <div className="footerBottomContent">
              <div className="footerBottomLeft">
                <span className="footerReservedText">{rightsText}</span>
                <div className="footerBottomDivider" />
                <div className="footerCreditText">
                  <span>{creditPrefix}</span>
                  <a href="#" className="footerCreditLink">Horizon</a>
                </div>
              </div>

              <div className="footerBottomRight">
                <button
                  onClick={scrollToTop}
                  className="footerBackToTop"
                  title={isSpanish ? 'Volver arriba' : 'Back to top'}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 15l-6-6-6 6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}

export default FooterSection;
