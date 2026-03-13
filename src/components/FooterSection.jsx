function FooterSection({ t, logoImg, footerImage, language = "es" }) {
  const rightsText = language === "es"
    ? "® La Villa. Todos los derechos reservados."
    : "® La Villa. All rights reserved.";
  const creditPrefix = language === "es" ? "Experiencia Digital por " : "Digital experience by ";

  return (
    <footer id="footer" className="footer">
      <div className="footerAtmosphere" aria-hidden="true">
        <img src={footerImage} alt="" className="footerAtmosphereImage" loading="lazy" decoding="async" />
        <div className="footerAtmosphereFade" />
      </div>

      <div className="footerMain">
        <div className="footerBrand">
          <img src={logoImg} alt="La Villa" className="footerLogo" loading="lazy" decoding="async" />
          <p>{t.footer.description}</p>
        </div>

        <div className="footerLinks">
          <div className="footerColumn">
            <h4>{t.footer.supportTitle}</h4>
            {t.footer.supportLinks.map((link, i) => (
              <a key={i} href="#">{link}</a>
            ))}
          </div>
          <div className="footerColumn">
            <h4>{t.footer.connectTitle}</h4>
            {t.footer.connectLinks.map((link, i) => (
              <a key={i} href="#">{link}</a>
            ))}
          </div>
        </div>
      </div>

      <div className="footerBottom">
        <span className="footerReservedText">{rightsText}</span>
        <div className="footerCreditText">
          <span>{creditPrefix}</span>
          <a href="#" className="footerCreditLink">Horizon</a>
        </div>
      </div>
    </footer>
  );
}

export default FooterSection;
