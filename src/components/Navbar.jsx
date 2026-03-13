import { Fragment, useEffect, useState } from "react";

const USER_MENU_ICONS = {
  profile: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  bookings: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  saved: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  settings: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  help: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  logout: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  )
};

function Navbar({
  t,
  language,
  onToggleLanguage,
  isUserMenuOpen,
  setIsUserMenuOpen,
  userMenuRef,
  logoImg,
  onUserMenuAction,
  isAuthenticated = true,
  onAuthAction,
  currentUser,
  showNavLinks = true
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const navSections = [
    { key: "home", href: "#hero", label: t.navbar.home },
    { key: "homes", href: "#listings", label: t.navbar.homes },
    { key: "host", href: "#experiences", label: t.navbar.host },
    { key: "contact", href: "#footer", label: t.navbar.contact }
  ];

  const handleNavClick = (event, href) => {
    event.preventDefault();
    const target = document.querySelector(href);
    if (!target) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start"
    });

    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logoImg} alt="La Villa" className="logoImg" />
      </div>

      {showNavLinks && (
        <div className="navLinks">
          {navSections.map((section) => (
            <a
              key={section.key}
              href={section.href}
              className="navLink"
              onClick={(event) => handleNavClick(event, section.href)}
            >
              {section.label}
            </a>
          ))}
        </div>
      )}

      <div className="navActions">
        {isAuthenticated ? (
          <div className="userMenuContainer" ref={userMenuRef}>
            <button
              className="avatarButton"
              onClick={() => setIsUserMenuOpen((prev) => !prev)}
              aria-expanded={isUserMenuOpen}
              aria-haspopup="menu"
              aria-label={t.userMenu.openLabel}
              type="button"
            >
              <div className="userAvatar">
                <img
                  src={currentUser?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face"}
                  alt={currentUser?.displayName || "User"}
                />
              </div>
            </button>

            {isUserMenuOpen && (
              <div className="userDropdown" role="menu" aria-label={t.userMenu.actionsLabel}>
                {t.userMenu.options.map((option) => (
                  <Fragment key={option.key}>
                    {option.key === "logout" && (
                      <div className="userMenuDivider" aria-hidden="true" />
                    )}
                    <button
                      className={`userMenuItem ${option.key === "logout" ? "danger" : ""}`}
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        onUserMenuAction?.(option.key);
                        setIsUserMenuOpen(false);
                      }}
                    >
                      <span className="userMenuItemIcon">{USER_MENU_ICONS[option.key]}</span>
                      {option.label}
                    </button>
                  </Fragment>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="authButtons" aria-label={t.navbar.authActionsLabel}>
            <button
              className="authBtn authBtnSecondary"
              type="button"
              onClick={() => onAuthAction?.("login")}
            >
              {t.navbar.login}
            </button>
            <button
              className="authBtn authBtnPrimary"
              type="button"
              onClick={() => onAuthAction?.("register")}
            >
              {t.navbar.register}
            </button>
          </div>
        )}
        <button className="languageToggle" onClick={onToggleLanguage} type="button">
          {language === "es" ? "EN" : "ES"}
        </button>
        {showNavLinks && (
          <button
            className={`mobileMenuToggle ${isMobileMenuOpen ? "open" : ""}`}
            type="button"
            aria-label={isMobileMenuOpen ? "Cerrar menu" : "Abrir menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav-panel"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            <span />
            <span />
            <span />
          </button>
        )}
      </div>

      {showNavLinks && (
        <div id="mobile-nav-panel" className={`mobileNavPanel ${isMobileMenuOpen ? "open" : ""}`}>
          <div className="mobileNavLinks" role="menu" aria-label={t.navbar.home}>
            {navSections.map((section) => (
              <a
                key={`mobile-${section.key}`}
                href={section.href}
                className="mobileNavLink"
                onClick={(event) => handleNavClick(event, section.href)}
              >
                {section.label}
              </a>
            ))}
          </div>

          {!isAuthenticated && (
            <div className="mobileAuthButtons" aria-label={t.navbar.authActionsLabel}>
              <button
                className="authBtn authBtnSecondary"
                type="button"
                onClick={() => {
                  onAuthAction?.("login");
                  setIsMobileMenuOpen(false);
                }}
              >
                {t.navbar.login}
              </button>
              <button
                className="authBtn authBtnPrimary"
                type="button"
                onClick={() => {
                  onAuthAction?.("register");
                  setIsMobileMenuOpen(false);
                }}
              >
                {t.navbar.register}
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
