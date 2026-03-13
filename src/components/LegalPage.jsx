import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";

function LegalPage({
  t,
  language,
  onToggleLanguage,
  isUserMenuOpen,
  setIsUserMenuOpen,
  userMenuRef,
  logoImg,
  onUserMenuAction,
  isAuthenticated,
  onAuthAction,
  currentUser
}) {
  const navigate = useNavigate();
  const { pageKey } = useParams();
  const page = t.legalPages?.[pageKey];

  if (!page) {
    return (
      <div className="legalPage">
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
          currentUser={currentUser}
        />
        <main className="legalPageMain">
          <p className="legalNotFound">Página no encontrada.</p>
        </main>
      </div>
    );
  }

  const isSupport = pageKey === "support";

  return (
    <div className="legalPage">
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
        currentUser={currentUser}
        showNavLinks={!isSupport}
      />

      <main className="legalPageMain">
        <div className="legalPageContainer">
          <button
            className="legalBackBtn"
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Volver"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" width="18" height="18">
              <path d="M14.5 6.5L9 12L14.5 17.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Volver
          </button>

          <header className="legalPageHeader">
            <span className="legalPageBadge">{page.badge}</span>
            <h1>{page.title}</h1>
            {!isSupport && <p className="legalPageDate">{page.lastUpdated}</p>}
            {!isSupport && <p className="legalPageIntro">{page.intro}</p>}
            {isSupport && <p className="legalPageIntro">{page.subtitle}</p>}
          </header>

          {!isSupport && (
            <div className="legalPageSections">
              {page.sections.map((section) => (
                <article className="legalPageSection" key={section.title}>
                  <h2>{section.title}</h2>
                  <p>{section.body}</p>
                </article>
              ))}
            </div>
          )}

          {isSupport && (
            <>
              <section className="legalPageContactSection">
                <h2>{page.contactTitle}</h2>
                <div className="legalPageContactGrid">
                  {page.contactOptions.map((option) => (
                    <div className="legalPageContactCard" key={option.label}>
                      <span className="legalPageContactIcon">{option.icon}</span>
                      <div>
                        <strong>{option.label}</strong>
                        <p>{option.description}</p>
                        <span className="legalPageContactValue">{option.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="legalPageFaqSection">
                <h2>{page.faqTitle}</h2>
                <div className="legalPageFaqList">
                  {page.faqItems.map((item) => (
                    <details className="legalPageFaqItem" key={item.question}>
                      <summary>{item.question}</summary>
                      <p>{item.answer}</p>
                    </details>
                  ))}
                </div>
              </section>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default LegalPage;
