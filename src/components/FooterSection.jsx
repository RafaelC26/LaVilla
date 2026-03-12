function FooterSection({ t, logoImg, footerImage }) {
  return (
    <footer id="footer" className="footer">
      <div className="footerAtmosphere" aria-hidden="true">
        <img src={footerImage} alt="" className="footerAtmosphereImage" loading="eager" decoding="async" />
        <div className="footerAtmosphereFade" />
      </div>

      <div className="footerMain">
        <div className="footerBrand">
          <img src={logoImg} alt="Horizon Stays" className="footerLogo" />
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

      <div className="footerBottom">{t.footer.brandLine} {t.footer.rights}</div>
    </footer>
  );
}

export default FooterSection;
