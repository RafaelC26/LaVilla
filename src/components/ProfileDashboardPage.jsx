import Navbar from "./Navbar";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

function ProfileDashboardPage({
  t,
  language,
  onToggleLanguage,
  isUserMenuOpen,
  setIsUserMenuOpen,
  userMenuRef,
  logoImg,
  onUserMenuAction,
  listings = [],
  favoriteListingIds = [],
  onToggleFavorite,
  isAuthenticated,
  onAuthAction,
  currentUser
}) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const profile = t.profileDashboard;
  const defaultSecuritySettings = {
    twoStepEnabled: false,
    alertsByEmail: true,
    ...(profile.security?.initialValues || {})
  };
  const defaultPaymentSettings = {
    autopayEnabled: false,
    selectedMethodId: null,
    ...(profile.payments?.initialValues || {})
  };
  const fallbackTripImage = "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=900&q=80";
  const sectionFromQuery = searchParams.get("section");
  const allowedSections = new Set(["personal", "security", "payments", "trips", "favorites"]);
  const [activeSidebarKey, setActiveSidebarKey] = useState(
    allowedSections.has(sectionFromQuery) ? sectionFromQuery : "personal"
  );
  const [activeTabKey, setActiveTabKey] = useState("upcoming");
  const [personalInfo, setPersonalInfo] = useState(profile.personalInfo.initialValues);
  const [personalDraft, setPersonalDraft] = useState(profile.personalInfo.initialValues);
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [securitySettings, setSecuritySettings] = useState(defaultSecuritySettings);
  const [paymentSettings, setPaymentSettings] = useState(defaultPaymentSettings);
  const recommendedStays = profile.recommendedStays || profile.recommendedImages.map((image) => ({
    image,
    country: "",
    title: "",
    price: "",
    categoryKey: "beach"
  }));

  const activeTrips = useMemo(() => {
    return profile.trips.filter((trip) => trip.status === activeTabKey);
  }, [profile.trips, activeTabKey]);

  const tabCountMap = useMemo(() => {
    return profile.trips.reduce((accumulator, trip) => {
      accumulator[trip.status] = (accumulator[trip.status] || 0) + 1;
      return accumulator;
    }, {});
  }, [profile.trips]);

  const isTripsView = activeSidebarKey === "trips";
  const isPersonalView = activeSidebarKey === "personal";
  const isSecurityView = activeSidebarKey === "security";
  const isPaymentsView = activeSidebarKey === "payments";
  const isFavoritesView = activeSidebarKey === "favorites";
  const footerRightsText = language === "es"
    ? "® La Villa. Todos los derechos reservados."
    : "® La Villa. All rights reserved.";
  const footerCreditPrefix = language === "es" ? "Experiencia Digital por " : "Digital experience by ";
  const favoriteListings = useMemo(
    () => listings.filter((listing) => favoriteListingIds.includes(listing.id)),
    [listings, favoriteListingIds]
  );

  const startPersonalEdit = () => {
    setPersonalDraft(personalInfo);
    setIsEditingPersonal(true);
  };

  const cancelPersonalEdit = () => {
    setPersonalDraft(personalInfo);
    setIsEditingPersonal(false);
  };

  const savePersonalEdit = () => {
    setPersonalInfo(personalDraft);
    setIsEditingPersonal(false);
  };

  const handleDraftChange = (field, value) => {
    setPersonalDraft((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const toggleSecuritySetting = (field) => {
    setSecuritySettings((prev) => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const selectPaymentMethod = (methodId) => {
    setPaymentSettings((prev) => ({
      ...prev,
      selectedMethodId: methodId
    }));
  };

  const toggleAutopay = () => {
    setPaymentSettings((prev) => ({
      ...prev,
      autopayEnabled: !prev.autopayEnabled
    }));
  };

  const handleSidebarSelection = (sectionKey) => {
    setActiveSidebarKey(sectionKey);
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("section", sectionKey);
    setSearchParams(nextParams, { replace: true });
  };

  useEffect(() => {
    if (allowedSections.has(sectionFromQuery) && sectionFromQuery !== activeSidebarKey) {
      setActiveSidebarKey(sectionFromQuery);
    }
  }, [sectionFromQuery, activeSidebarKey]);

  const openAllStaysOverlay = () => {
    navigate("/");
  };

  return (
    <div className="profileDashPage">
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
        showNavLinks={false}
      />

      <main className="profileDashLayout">
        <aside className="profileDashSidebar">
          <div className="profileDashUserBlock">
            <img
              className="profileDashUserPhoto"
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face"
              alt={profile.user.name}
              loading="lazy"
              decoding="async"
            />
            <div>
              <h2>{profile.user.name}</h2>
              <span>{profile.user.badge}</span>
            </div>
          </div>

          <ul className="profileDashMenu">
            {profile.sidebarItems.map((item) => (
              <li key={item.key} className={activeSidebarKey === item.key ? "active" : ""}>
                <button
                  type="button"
                  className="profileDashMenuBtn"
                  onClick={() => handleSidebarSelection(item.key)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <button
            className="profileDashReserveBtn"
            type="button"
            onClick={openAllStaysOverlay}
          >
            {profile.newStayButton}
          </button>
        </aside>

        <section className="profileDashMain">
          <div className="profileDashBackRow">
            <button className="catalogClose" type="button" onClick={() => navigate(-1)} aria-label={profile.nav.backLabel}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M14.5 6.5L9 12L14.5 17.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {isTripsView && (
            <>
              <header className="profileDashHeading">
                <h1>{profile.title}</h1>
                <p>{profile.subtitle}</p>
              </header>

              <div className="profileDashTabs">
                {profile.tabs.map((tab) => (
                  <button
                    key={tab.key}
                    className={activeTabKey === tab.key ? "active" : ""}
                    type="button"
                    onClick={() => setActiveTabKey(tab.key)}
                  >
                    {tab.label}
                    {typeof tabCountMap[tab.key] === "number" ? <span>{tabCountMap[tab.key]}</span> : null}
                  </button>
                ))}
              </div>

              <div className="profileDashTripCards">
                {activeTrips.map((trip) => (
                  <article className="profileDashTripCard" key={trip.title}>
                    <img
                      src={trip.image}
                      alt={trip.title}
                      loading="lazy"
                      decoding="async"
                      onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = fallbackTripImage;
                      }}
                    />
                    <div className="profileDashTripInfo">
                      <p className="profileDashTripLocation">{trip.location}</p>
                      <h3>{trip.title}</h3>
                      <p className="profileDashTripMeta">{trip.date} • {trip.guests}</p>
                      <div className="profileDashTripActions">
                        <button type="button">{profile.editButton}</button>
                        <button
                          type="button"
                          className="primary"
                          onClick={() => navigate(`/stay/${trip.listingId}`)}
                        >
                          {profile.detailsButton}
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}

          {isPersonalView && (
            <section className="profileDashPersonalSection">
              <header className="profileDashHeading profileDashPersonalHeader">
                <h1>{profile.personalInfo.title}</h1>
                <p>{profile.personalInfo.subtitle}</p>
                <div className="profileDashPersonalActions">
                  {!isEditingPersonal ? (
                    <button type="button" className="profileDashSecondaryBtn" onClick={startPersonalEdit}>
                      {profile.personalInfo.enableEditButton}
                    </button>
                  ) : (
                    <>
                      <button type="button" className="profileDashSecondaryBtn" onClick={cancelPersonalEdit}>
                        {profile.personalInfo.cancelButton}
                      </button>
                      <button type="button" className="profileDashPrimaryBtn" onClick={savePersonalEdit}>
                        {profile.personalInfo.saveButton}
                      </button>
                    </>
                  )}
                </div>
              </header>

              <article className="profileDashPersonalCard">
                <h2>{profile.personalInfo.profileSectionTitle}</h2>
                <p>{profile.personalInfo.profileSectionHint}</p>
                <ul className="profileDashSettingList">
                  <li>
                    <span>{profile.personalInfo.labels.photo}</span>
                    <strong>{personalInfo.photo}</strong>
                    <span className="chevron">›</span>
                  </li>
                  <li>
                    <span>{profile.personalInfo.labels.name}</span>
                    {isEditingPersonal ? (
                      <div className="profileDashInlineFields">
                        <input
                          type="text"
                          value={personalDraft.firstName}
                          onChange={(event) => handleDraftChange("firstName", event.target.value)}
                        />
                        <input
                          type="text"
                          value={personalDraft.lastName}
                          onChange={(event) => handleDraftChange("lastName", event.target.value)}
                        />
                      </div>
                    ) : (
                      <strong>{`${personalInfo.firstName} ${personalInfo.lastName}`}</strong>
                    )}
                    {!isEditingPersonal && <span className="chevron">›</span>}
                  </li>
                  <li>
                    <span>{profile.personalInfo.labels.birthDate}</span>
                    {isEditingPersonal ? (
                      <input
                        type="text"
                        value={personalDraft.birthDate}
                        onChange={(event) => handleDraftChange("birthDate", event.target.value)}
                      />
                    ) : (
                      <strong>{personalInfo.birthDate}</strong>
                    )}
                    {!isEditingPersonal && <span className="chevron">›</span>}
                  </li>
                  <li>
                    <span>{profile.personalInfo.labels.gender}</span>
                    {isEditingPersonal ? (
                      <select
                        value={personalDraft.gender}
                        onChange={(event) => handleDraftChange("gender", event.target.value)}
                      >
                        {profile.personalInfo.genderOptions.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    ) : (
                      <strong>{personalInfo.gender}</strong>
                    )}
                    {!isEditingPersonal && <span className="chevron">›</span>}
                  </li>
                  <li>
                    <span>{profile.personalInfo.labels.idDocument}</span>
                    {isEditingPersonal ? (
                      <input
                        type="text"
                        value={personalDraft.idDocument}
                        onChange={(event) => handleDraftChange("idDocument", event.target.value)}
                      />
                    ) : (
                      <strong>{personalInfo.idDocument}</strong>
                    )}
                    {!isEditingPersonal && <span className="chevron">›</span>}
                  </li>
                  <li>
                    <span>{profile.personalInfo.labels.password}</span>
                    <strong>{personalInfo.passwordStatus}</strong>
                    <span className="chevron">›</span>
                  </li>
                </ul>
              </article>

              <article className="profileDashPersonalCard">
                <h2>{profile.personalInfo.contactSectionTitle}</h2>
                <ul className="profileDashSettingList">
                  <li>
                    <span>{profile.personalInfo.labels.email}</span>
                    {isEditingPersonal ? (
                      <input
                        type="email"
                        value={personalDraft.email}
                        onChange={(event) => handleDraftChange("email", event.target.value)}
                      />
                    ) : (
                      <strong>{personalInfo.email}</strong>
                    )}
                    {!isEditingPersonal && <span className="chevron">›</span>}
                  </li>
                  <li>
                    <span>{profile.personalInfo.labels.phone}</span>
                    {isEditingPersonal ? (
                      <input
                        type="tel"
                        value={personalDraft.phone}
                        onChange={(event) => handleDraftChange("phone", event.target.value)}
                      />
                    ) : (
                      <strong>{personalInfo.phone}</strong>
                    )}
                    {!isEditingPersonal && <span className="chevron">›</span>}
                  </li>
                  <li>
                    <span>{profile.personalInfo.labels.address}</span>
                    {isEditingPersonal ? (
                      <input
                        type="text"
                        value={personalDraft.address}
                        onChange={(event) => handleDraftChange("address", event.target.value)}
                      />
                    ) : (
                      <strong>{personalInfo.address}</strong>
                    )}
                    {!isEditingPersonal && <span className="chevron">›</span>}
                  </li>
                  <li>
                    <span>{profile.personalInfo.labels.city}</span>
                    {isEditingPersonal ? (
                      <input
                        type="text"
                        value={personalDraft.city}
                        onChange={(event) => handleDraftChange("city", event.target.value)}
                      />
                    ) : (
                      <strong>{personalInfo.city}</strong>
                    )}
                    {!isEditingPersonal && <span className="chevron">›</span>}
                  </li>
                  <li>
                    <span>{profile.personalInfo.labels.country}</span>
                    {isEditingPersonal ? (
                      <input
                        type="text"
                        value={personalDraft.country}
                        onChange={(event) => handleDraftChange("country", event.target.value)}
                      />
                    ) : (
                      <strong>{personalInfo.country}</strong>
                    )}
                    {!isEditingPersonal && <span className="chevron">›</span>}
                  </li>
                </ul>
              </article>
            </section>
          )}

          {isSecurityView && (
            <section className="profileDashSecuritySection">
              <header className="profileDashHeading">
                <h1>{profile.security.title}</h1>
                <p>{profile.security.subtitle}</p>
              </header>

              <article className="profileDashPersonalCard">
                <h2>{profile.security.twoStep.title}</h2>
                <p>{profile.security.twoStep.description}</p>
                <div className="profileDashToggleRow">
                  <span>{profile.security.twoStep.toggleLabel}</span>
                  <button
                    type="button"
                    className={`profileDashSwitch ${securitySettings.twoStepEnabled ? "on" : ""}`}
                    onClick={() => toggleSecuritySetting("twoStepEnabled")}
                    aria-pressed={securitySettings.twoStepEnabled}
                  >
                    <span />
                  </button>
                </div>
                {securitySettings.twoStepEnabled && (
                  <p className="profileDashSecurityInfo">{profile.security.twoStep.enabledHint}</p>
                )}
              </article>

              <article className="profileDashPersonalCard">
                <h2>{profile.security.activeSessionsTitle}</h2>
                <ul className="profileDashSettingList">
                  {profile.security.sessions.map((session) => (
                    <li key={session.device}>
                      <span>{session.device}</span>
                      <strong>{session.lastAccess}</strong>
                      <span className="chevron">•</span>
                    </li>
                  ))}
                </ul>
                <div className="profileDashSecurityActionRow">
                  <button type="button" className="profileDashSecondaryBtn">{profile.security.closeOthersButton}</button>
                </div>
              </article>

              <article className="profileDashPersonalCard">
                <h2>{profile.security.alertsTitle}</h2>
                <div className="profileDashToggleRow">
                  <span>{profile.security.alertsByEmailLabel}</span>
                  <button
                    type="button"
                    className={`profileDashSwitch ${securitySettings.alertsByEmail ? "on" : ""}`}
                    onClick={() => toggleSecuritySetting("alertsByEmail")}
                    aria-pressed={securitySettings.alertsByEmail}
                  >
                    <span />
                  </button>
                </div>
                <div className="profileDashToggleRow">
                  <span>{profile.security.recoveryCodeLabel}</span>
                  <button type="button" className="profileDashSecondaryBtn">{profile.security.generateCodeButton}</button>
                </div>
              </article>
            </section>
          )}

          {isPaymentsView && (
            <section className="profileDashPaymentsSection">
              <header className="profileDashHeading">
                <h1>{profile.payments.title}</h1>
                <p>{profile.payments.subtitle}</p>
              </header>

              <article className="profileDashPersonalCard">
                <h2>{profile.payments.methodsTitle}</h2>
                <ul className="profileDashSettingList">
                  {profile.payments.methods.map((method) => {
                    const isSelected = (paymentSettings.selectedMethodId || profile.payments.initialValues.selectedMethodId) === method.id;
                    return (
                      <li key={method.id}>
                        <span>{method.brand}</span>
                        <strong>{`${method.maskedNumber} • ${method.holder}`}</strong>
                        <button
                          type="button"
                          className={`profileDashTinyBtn ${isSelected ? "active" : ""}`}
                          onClick={() => selectPaymentMethod(method.id)}
                        >
                          {isSelected ? profile.payments.defaultLabel : profile.payments.setDefaultButton}
                        </button>
                      </li>
                    );
                  })}
                </ul>
                <div className="profileDashSecurityActionRow">
                  <button type="button" className="profileDashSecondaryBtn">{profile.payments.addMethodButton}</button>
                </div>
              </article>

              <article className="profileDashPersonalCard">
                <h2>{profile.payments.billingTitle}</h2>
                <div className="profileDashToggleRow">
                  <span>{profile.payments.autopayLabel}</span>
                  <button
                    type="button"
                    className={`profileDashSwitch ${paymentSettings.autopayEnabled ? "on" : ""}`}
                    onClick={toggleAutopay}
                    aria-pressed={paymentSettings.autopayEnabled}
                  >
                    <span />
                  </button>
                </div>
                <ul className="profileDashSettingList">
                  {profile.payments.invoices.map((invoice) => (
                    <li key={invoice.id}>
                      <span>{invoice.period}</span>
                      <strong>{`${invoice.amount} • ${invoice.status}`}</strong>
                      <button type="button" className="profileDashTinyBtn">{profile.payments.downloadButton}</button>
                    </li>
                  ))}
                </ul>
              </article>
            </section>
          )}

          {isFavoritesView && (
            <section className="profileDashFavoritesSection">
              <header className="profileDashHeading">
                <h1>{profile.favorites.title}</h1>
                <p>{profile.favorites.subtitle}</p>
              </header>

              {favoriteListings.length === 0 ? (
                <article className="profileDashPersonalCard">
                  <p>{profile.favorites.emptyMessage}</p>
                  <div className="profileDashSecurityActionRow">
                    <button
                      type="button"
                      className="profileDashPrimaryBtn"
                      onClick={openAllStaysOverlay}
                    >
                      {profile.favorites.exploreButton}
                    </button>
                  </div>
                </article>
              ) : (
                <div className="profileDashFavoritesGrid">
                  {favoriteListings.map((listing) => (
                    <article key={`favorite-${listing.id}`} className="profileDashFavoriteCard">
                      <img src={listing.image} alt={listing.title} loading="lazy" decoding="async" />
                      <button
                        type="button"
                        className="profileDashFavoriteHeart"
                        onClick={() => onToggleFavorite?.(listing.id)}
                        aria-label={profile.favorites.removeFavoriteLabel}
                      >
                        ♥
                      </button>
                      <div className="profileDashFavoriteContent">
                        <h3>{listing.title}</h3>
                        <p>{listing.location}</p>
                        <div className="profileDashFavoriteActions">
                          <button
                            type="button"
                            className="profileDashSecondaryBtn"
                            onClick={() => onToggleFavorite?.(listing.id)}
                          >
                            {profile.favorites.removeButton}
                          </button>
                          <button
                            type="button"
                            className="profileDashPrimaryBtn"
                            onClick={() => navigate(`/stay/${listing.id}`)}
                          >
                            {profile.favorites.viewButton}
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          )}

          {!isTripsView && !isPersonalView && !isSecurityView && !isPaymentsView && !isFavoritesView && (
            <section className="profileDashPersonalSection">
              <header className="profileDashHeading">
                <h1>{profile.title}</h1>
                <p>{profile.subtitle}</p>
              </header>
            </section>
          )}
        </section>
      </main>

      <footer className="profileDashFooter">
        <div className="profileDashFooterBrand">{footerRightsText}</div>
        <div className="profileDashFooterLinks">
          {profile.footer.links.map((link) => (
            <Link key={link.path} to={link.path}>{link.label}</Link>
          ))}
        </div>
        <div className="profileDashFooterCredit">
          <span>{footerCreditPrefix}</span>
          <a href="#" className="profileDashFooterCreditLink">Horizon</a>
        </div>
      </footer>
    </div>
  );
}

export default ProfileDashboardPage;
