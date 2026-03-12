function ExperiencesSection({ t, onSelectExperienceCategory }) {
  return (
    <section id="experiences" className="experiences">
      <div className="sectionHeader">
        <div>
          <h2 className="sectionTitle light">{t.experiences.title}</h2>
          <p className="sectionSubtitle">{t.experiences.subtitle}</p>
        </div>
      </div>

      <div className="sellerSpotlight">
        <button
          className="sellerAvatarWrap"
          type="button"
          onClick={() => onSelectExperienceCategory?.("seller-profile")}
          aria-label={t.experiences.profileImageAlt}
        >
          <img
            src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=560&h=560&fit=crop&crop=face"
            alt={t.experiences.profileImageAlt}
            className="sellerAvatar"
            loading="eager"
            decoding="async"
          />
        </button>

        <div className="sellerIntro">
          <span className="sellerTag">{t.experiences.tag}</span>
          <h3>{t.experiences.name}</h3>
          <p className="sellerRole">{t.experiences.role}</p>
          <p className="sellerBio">{t.experiences.bio}</p>
        </div>

        <div className="sellerTrustRow" role="list">
          {t.experiences.trustHighlights.map((item) => (
            <span key={item} className="sellerTrustItem" role="listitem">{item}</span>
          ))}
        </div>

        <div className="sellerDetailsGrid">
          <button
            className="sellerDetailCard"
            type="button"
            onClick={() => onSelectExperienceCategory?.("seller-metrics")}
          >
            <h4>{t.experiences.yearsHosting}</h4>
            <p>{t.experiences.yearsHostingDesc}</p>
          </button>
          <button
            className="sellerDetailCard"
            type="button"
            onClick={() => onSelectExperienceCategory?.("seller-response")}
          >
            <h4>{t.experiences.responseTime}</h4>
            <p>{t.experiences.responseTimeDesc}</p>
          </button>
          <button
            className="sellerDetailCard"
            type="button"
            onClick={() => onSelectExperienceCategory?.("seller-attention")}
          >
            <h4>{t.experiences.personalAttention}</h4>
            <p>{t.experiences.personalAttentionDesc}</p>
          </button>
        </div>
      </div>
    </section>
  );
}

export default ExperiencesSection;
