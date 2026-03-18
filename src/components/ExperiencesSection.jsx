import { useState } from "react";

function ExperiencesSection({ t, language, onSelectExperienceCategory }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleContactClick = () => {
    const footer = document.getElementById("footer");
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleKnowMoreClick = () => {
    if (onSelectExperienceCategory) {
      onSelectExperienceCategory("seller-profile");
    } else {
      window.location.href = "/hosts/andres";
    }
  };

  const yearsIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  );

  const responseIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
    </svg>
  );

  const attentionIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  );

  return (
    <>
      <section id="experiences" className="experiences premiumReveal hostSectionEnhanced">
        {/* Fondo sutil */}
        <div className="hostSectionBackground">
          <div className="hostSectionGradientOrb orb1" />
          <div className="hostSectionGradientOrb orb2" />
        </div>

        <div className="sectionHeader revealRow hostSectionHeader" style={{ "--reveal-delay": "0.1s" }}>
          <div className="hostHeaderContent">
            <span className="hostSectionTag">{language === 'es' ? 'Anfitrión Profesional' : 'Professional Host'}</span>
            <h2 className="sectionTitle premium">{t.experiences.title}</h2>
            <p className="sectionSubtitle premium">{t.experiences.subtitle}</p>
          </div>
        </div>

        <div className="hostPremiumCard revealRow hostCardGlass" style={{ "--reveal-delay": "0.3s" }}>
          <div className="hostPremiumGrid">
            {/* Solo foto de perfil del propietario */}
            <div className="hostVisualArea">
              <div className="hostImageContainer">
                <img
                  src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=800&h=1000&fit=crop"
                  alt={t.experiences.profileImageAlt}
                  className="hostMainImage"
                  onLoad={() => setImageLoaded(true)}
                  style={{ opacity: imageLoaded ? 1 : 0, transition: 'opacity 0.5s ease' }}
                />
                {!imageLoaded && (
                  <div className="hostImageSkeleton" />
                )}
                <div className="hostExperienceBadge">
                  <strong>+8</strong>
                  <span>{language === 'es' ? 'Años' : 'Years'}</span>
                </div>
              </div>
            </div>

            {/* Área de Información */}
            <div className="hostInfoArea">
              <div className="hostHeader">
                <div className="hostTagWrapper">
                  <span className="hostTagLine">{t.experiences.tag}</span>
                  <div className="hostVerifiedBadge">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>{language === 'es' ? 'Verificado' : 'Verified'}</span>
                  </div>
                </div>
                <h3 className="hostNameTitle">{t.experiences.name}</h3>
                <p className="hostRoleBadge">{t.experiences.role}</p>
              </div>

              <div className="hostPersonalFacts">
                {(t.experiences.personalFacts || [
                  { icon: "work", text: "A qué me dedico: CTO · Docente" },
                  { icon: "music", text: "Mi canción favorita en la secundaria: I don't want to miss a thing - Aerosmith" },
                  { icon: "star", text: "Porqué mi alojamiento es único: Muy acogedor y cómodo" },
                  { icon: "time", text: "A qué le dedico mucho tiempo: Ejercicio, runner, Gym." }
                ]).map((fact, idx) => (
                  <div key={idx} className="hostFactItem">
                    <span className="hostFactIcon">
                      {fact.icon === "work" && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
                          <line x1="12" y1="12" x2="12" y2="12"/><path d="M2 12h20"/>
                        </svg>
                      )}
                      {fact.icon === "music" && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
                        </svg>
                      )}
                      {fact.icon === "star" && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 2l2 6.5H21l-5.5 4 2 6.5L12 15l-5.5 4 2-6.5L3 8.5h7z"/>
                        </svg>
                      )}
                      {fact.icon === "time" && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                        </svg>
                      )}
                    </span>
                    <span className="hostFactText">{fact.text}</span>
                  </div>
                ))}

                <div className="hostVerifiedRow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    <path d="M9 12l2 2 4-4"/>
                  </svg>
                  <span className="hostVerifiedLabel">{language === "es" ? "Identidad verificada" : "Verified identity"}</span>
                </div>
              </div>

              <p className="hostDescriptionText">{t.experiences.bio}</p>

              <div className="hostFooterActions">
                <button 
                  className="hostPrimaryActionBtn"
                  onClick={handleContactClick}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                  </svg>
                  {language === 'es' ? 'Contactar ahora' : 'Contact now'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}

export default ExperiencesSection;
