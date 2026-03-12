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
  onAuthAction
}) {
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
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logoImg} alt="Horizon Stays" className="logoImg" />
      </div>

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
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face" alt="User" />
              </div>
            </button>

            {isUserMenuOpen && (
              <div className="userDropdown" role="menu" aria-label={t.userMenu.actionsLabel}>
                {t.userMenu.options.map((option) => (
                  <button
                    key={option.key}
                    className={`userMenuItem ${option.key === "logout" ? "danger" : ""}`}
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      onUserMenuAction?.(option.key);
                      setIsUserMenuOpen(false);
                    }}
                  >
                    {option.label}
                  </button>
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
      </div>
    </nav>
  );
}

export default Navbar;
