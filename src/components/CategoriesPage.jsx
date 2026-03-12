import Navbar from "./Navbar";

const categoryImages = [
  "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1464890100898-a385f744067f?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"
];

const fallbackImage =
  "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80";

const categoryRouteKeys = [
  "aframe",
  "vineyards",
  "forest",
  "beach",
  "mountain",
  "glamping",
  "rustic",
  "modern",
  "lake"
];

function CategoriesPage({
  t,
  language,
  onToggleLanguage,
  isUserMenuOpen,
  setIsUserMenuOpen,
  userMenuRef,
  logoImg,
  onSelectCategory,
  onBack,
  onUserMenuAction,
  isAuthenticated,
  onAuthAction
}) {
  return (
    <div className="categoriesPage">
      <Navbar
        t={t}
        language={language}
        onToggleLanguage={onToggleLanguage}
        isUserMenuOpen={isUserMenuOpen}
        setIsUserMenuOpen={setIsUserMenuOpen}
        userMenuRef={userMenuRef}
        logoImg={logoImg}
        onUserMenuAction={onUserMenuAction}
        isAuthenticated={isAuthenticated}
        onAuthAction={onAuthAction}
      />

      <section className="categoriesHero">
        <div className="categoriesBackRow">
          <button className="catalogClose" type="button" onClick={onBack} aria-label="Volver">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M14.5 6.5L9 12L14.5 17.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className="categoriesHeader">
          <h1>{t.categoriesPage.title}</h1>
          <p>{t.categoriesPage.subtitle}</p>
        </div>

        <div className="categoriesGrid">
          {t.categoriesPage.cards.map((cardTitle, index) => (
            <button
              className="categoryCard"
              key={cardTitle}
              type="button"
              onClick={() => onSelectCategory?.(categoryRouteKeys[index])}
            >
              <img
                src={categoryImages[index]}
                alt={cardTitle}
                loading="eager"
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = fallbackImage;
                }}
              />
              <div className="categoryCardOverlay" />
              <div className="categoryCardContent">
                {index === 0 && <span className="categoryTag">{t.categoriesPage.tag}</span>}
                <h3>{cardTitle}</h3>
                <p>{t.categoriesPage.propertiesCount}</p>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

export default CategoriesPage;
