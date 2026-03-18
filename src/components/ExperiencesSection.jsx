import { useState } from "react";
import anfitrionImg from "../assets/Anfitrion.png";

function ExperiencesSection({ t, language }) {
  const host = t.experiences;
  const stats = host.stats || {};
  const personalFacts = host.personalFacts || [];

  return (
    <section id="host" className="hostExperienceSection">
      <div className="hostExperienceContainer">
        {/* Decorative Background Elements */}
        <div className="hostDecorCircle circle1"></div>
        <div className="hostDecorCircle circle2"></div>

        <div className="hostExperienceMainContent">
          {/* Host Card Wrapper */}
          <div className="hostProfileWrapper">
            <div className="hostProfileCard">
              <div className="hostProfileImageContainer">
                <img 
                  src={anfitrionImg} 
                  alt={host.profileImageAlt} 
                  className="hostProfileMainImage"
                />
              </div>
              
              <div className="hostInfoBasic">
                <h3 className="hostNameTitle">{host.name} <span className="verifiedCheck">✓</span></h3>
                <p className="hostRoleTagline">{host.role}</p>
                
                <div className="hostTrustBadges">
                  {host.trustHighlights.map((highlight, idx) => (
                    <div key={idx} className="trustBadgeItem">
                      <span className="trustIcon">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                          <circle cx="12" cy="12" r="10" fill="rgba(16, 185, 129, 0.2)" />
                          <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                        </svg>
                      </span>
                      <span className="trustText">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats Bar */}
              <div className="hostStatsBar">
                <div className="hostStatItem">
                  <span className="hostStatValue">{stats.reviews}</span>
                  <span className="hostStatLabel">{stats.reviewsLabel}</span>
                </div>
                <div className="hostStatDivider"></div>
                <div className="hostStatItem">
                  <span className="hostStatValue">{stats.rating} ★</span>
                  <span className="hostStatLabel">{stats.ratingLabel}</span>
                </div>
                <div className="hostStatDivider"></div>
                <div className="hostStatItem">
                  <span className="hostStatValue">{stats.months}</span>
                  <span className="hostStatLabel">{stats.monthsLabel}</span>
                </div>
              </div>
            </div>

            {/* Verification / Security Badge */}
            <div className="hostSecureBadge">
              <div className="secureIcon">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 6c1.4 0 2.5 1.1 2.5 2.5S13.4 12 12 12s-2.5-1.1-2.5-2.5S10.6 7 12 7zm0 14.1c-1.3-.3-2.6-1-3.6-2 .7-.6 1.8-1.1 3.1-1.1 0 0 .1 0 .1 0s.1 0 .1 0c1.3 0 2.4.5 3.1 1.1-1 1-2.3 1.7-3.7 2z"/>
                </svg>
              </div>
              <div className="secureInfo">
                <span className="secureTitle">{language === 'es' ? 'Identidad verificada' : 'Verified identity'}</span>
                <span className="secureDesc">
                  {language === 'es' 
                    ? 'Andrés ha completado el proceso de verificación de identidad.' 
                    : 'Andrés has completed the identity verification process.'}
                </span>
              </div>
            </div>
          </div>

          {/* Narrative Content */}
          <div className="hostExperienceNarrative">
            <div className="narrativeHeader">
              <span className="narrativePreTitle">{host.tag}</span>
              <h2 className="narrativeMainTitle">{host.title}</h2>
              <div className="titleUnderline"></div>
            </div>

            <p className="narrativeDescription">{host.bio}</p>

            {/* Personal Facts Grid */}
            <div className="personalFactsGrid">
              {personalFacts.map((fact, idx) => (
                <div key={idx} className="personalFactCard">
                  <span className="factIcon">
                    {fact.icon === 'work' && <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM10 4h4v2h-4V4zm10 16H4V8h16v12z"/></svg>}
                    {fact.icon === 'skill' && <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M7.5 5.6L10 7L8.6 4.5L10 2L7.5 3.4L5 2L6.4 4.5L5 7L7.5 5.6ZM19.5 15.4L17 14L18.4 16.5L17 19L19.5 17.6L22 19L20.6 16.5L22 14L19.5 15.4ZM22 2L20.6 4.5L22 7L19.5 5.6L17 7L18.4 4.5L17 2L19.5 3.4L22 2ZM13.38 6.38L2.38 17.38C1.88 17.88 1.88 18.66 2.38 19.16L4.84 21.62C5.34 22.12 6.12 22.12 6.62 21.62L17.62 10.62C18.12 10.12 18.12 9.34 17.62 8.84L15.16 6.38C14.66 5.88 13.88 5.88 13.38 6.38ZM15.1 11.06L12.94 8.9L14.35 7.49L16.51 9.65L15.1 11.06V11.06Z"/></svg>}
                    {fact.icon === 'star' && <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>}
                    {fact.icon === 'pet' && <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M4.5 11c1.38 0 2.5-1.12 2.5-2.5S5.88 6 4.5 6 2 7.12 2 8.5 3.12 11 4.5 11zM7 16c1.38 0 2.5-1.12 2.5-2.5S8.38 11 7 11s-2.5 1.12-2.5 2.5S5.62 16 7 16zm10-5c1.38 0 2.5-1.12 2.5-2.5S18.38 6 17 6s-2.5 1.12-2.5 2.5S15.62 11 17 11zm2.5 2.5c0-1.38-1.12-2.5-2.5-2.5s-2.5 1.12-2.5 2.5 1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5zM12 13c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/></svg>}
                    {fact.icon === 'time' && <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>}
                    {fact.icon === 'music' && <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>}
                    {fact.icon === 'love' && <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>}
                    {fact.icon === 'language' && <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.91-4.33-3.56zm2.95-8H5.08c.96-1.65 2.49-2.93 4.33-3.56-.6 1.11-1.06 2.31-1.38 3.56zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.34.16-2h4.68c.09.66.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.24 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"/></svg>}
                    {fact.icon === 'location' && <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>}
                  </span>
                  <span className="factText">{fact.text}</span>
                </div>
              ))}
            </div>

            <div className="hostActionArea">
              <button className="hostContactBtn" onClick={() => window.open('https://wa.me/573102435454', '_blank')}>
                <span className="btnIcon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.012 0C5.411 0 .031 5.38.031 11.983c0 2.112.553 4.174 1.605 6.006L0 24l6.163-1.617a11.831 11.831 0 005.833 1.543h.005c6.597 0 11.979-5.38 11.979-11.986 0-3.199-1.245-6.205-3.506-8.47z"/>
                  </svg>
                </span>
                {language === 'es' ? 'Contactar ahora' : 'Contact now'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Atmospheric Transition to next section */}
      <div className="hostSectionTransition"></div>
    </section>
  );
}

export default ExperiencesSection;
