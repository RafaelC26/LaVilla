import "./App.css";
import { lazy, Suspense, useEffect, useState, useMemo, useRef } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { listings } from "./data";
import { translations } from "./translations";
import logoImg from "./assets/logo.png";
import footerImage from "./assets/footer.jpg";
import { demoUsers, getDashboardPathForRole } from "./demoUsers";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ListingsSection from "./components/ListingsSection";
import ExperiencesSection from "./components/ExperiencesSection";
import FooterSection from "./components/FooterSection";
import ThreeIntroOverlay from "./components/ThreeIntroOverlay";

const StayDetailPage = lazy(() => import("./components/StayDetailPage"));
const CatalogOverlay = lazy(() => import("./components/CatalogOverlay"));
const ProfileDashboardPage = lazy(() => import("./components/ProfileDashboardPage"));
const HostDashboardPage = lazy(() => import("./components/HostDashboardPage"));
const AuthDemoPage = lazy(() => import("./components/AuthDemoPage"));
const LegalPage = lazy(() => import("./components/LegalPage"));

const DAY_IN_MS = 24 * 60 * 60 * 1000;

const toIsoDate = (date) => {
  const safeDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
  return safeDate.toISOString().slice(0, 10);
};

const addDays = (baseDate, days) => {
  const nextDate = new Date(baseDate);
  nextDate.setDate(nextDate.getDate() + days);
  return nextDate;
};

const isoToLocalDate = (isoValue) => {
  if (!isoValue) {
    return null;
  }

  const [year, month, day] = isoValue.split("-").map(Number);
  if (!year || !month || !day) {
    return null;
  }

  return new Date(year, month - 1, day);
};

const eachDayIso = (startIso, endIso) => {
  const startDate = new Date(`${startIso}T00:00:00`);
  const endDate = new Date(`${endIso}T00:00:00`);
  const allDates = [];

  for (let cursor = startDate; cursor < endDate; cursor = new Date(cursor.getTime() + DAY_IN_MS)) {
    allDates.push(toIsoDate(cursor));
  }

  return allDates;
};

const buildUnavailableDatesForListing = (listingId, baseDate) => {
  const unavailableDates = new Set();
  const blocks = [
    { startOffset: (listingId * 3) % 18 + 6, length: 3 + (listingId % 3) },
    { startOffset: (listingId * 5) % 30 + 30, length: 2 + (listingId % 4) },
    { startOffset: (listingId * 7) % 28 + 64, length: 3 + (listingId % 2) }
  ];

  blocks.forEach((block) => {
    const blockStart = addDays(baseDate, block.startOffset);
    for (let i = 0; i < block.length; i += 1) {
      unavailableDates.add(toIsoDate(addDays(blockStart, i)));
    }
  });

  return unavailableDates;
};

function App() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("es");
  const [currentUserId, setCurrentUserId] = useState(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [favoriteListingIds, setFavoriteListingIds] = useState([]);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [availabilityResult, setAvailabilityResult] = useState(null);
  const [searchMatchedListingIds, setSearchMatchedListingIds] = useState(null);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [heroFilters, setHeroFilters] = useState({
    location: "",
    date: null,
    guests: ""
  });
  const [catalogFilters, setCatalogFilters] = useState({
    maxPrice: 255000,
    minGuests: "any",
    services: []
  });
  const [showIntro, setShowIntro] = useState(true);
  
  const userMenuRef = useRef(null);
  const t = translations[language];
  const currentUser = useMemo(
    () => demoUsers.find((user) => user.id === currentUserId) || null,
    [currentUserId]
  );
  const isAuthenticated = Boolean(currentUser);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "es" : "en"));
  };

  const toggleFavoriteListing = (listingId) => {
    setFavoriteListingIds((prev) => (prev.includes(listingId)
      ? prev.filter((id) => id !== listingId)
      : [...prev, listingId]));
  };

  const handleUserMenuAction = (actionKey) => {
    setIsUserMenuOpen(false);

    const role = currentUser?.role || "client";
    const baseDashboardPath = getDashboardPathForRole(role);

    if (actionKey === "logout") {
      setCurrentUserId(null);
      navigate("/");
    } else if (actionKey === "profile") {
      navigate(role === "host"
        ? `${baseDashboardPath}?section=overview`
        : `${baseDashboardPath}?section=personal`);
    } else if (actionKey === "bookings") {
      navigate(role === "host"
        ? `${baseDashboardPath}?section=reservations`
        : `${baseDashboardPath}?section=trips`);
    } else if (actionKey === "saved") {
      navigate(role === "host"
        ? `${baseDashboardPath}?section=properties`
        : `${baseDashboardPath}?section=favorites`);
    } else if (actionKey === "settings") {
      navigate(role === "host"
        ? `${baseDashboardPath}?section=settings`
        : `${baseDashboardPath}?section=security`);
    } else if (actionKey === "help") {
      navigate("/legal/support");
    }
  };

  const handleAuthAction = () => {
    navigate("/demo-login");
  };

  const handleSelectDemoUser = (userId) => {
    const selectedUser = demoUsers.find((user) => user.id === userId);
    if (!selectedUser) {
      return;
    }

    setCurrentUserId(selectedUser.id);
    setIsUserMenuOpen(false);
    navigate(getDashboardPathForRole(selectedUser.role));
  };

  const todayIso = useMemo(() => toIsoDate(new Date()), []);

  const listingUnavailableDates = useMemo(() => {
    const baseDate = new Date(`${todayIso}T00:00:00`);

    return listings.reduce((accumulator, listing) => {
      accumulator[listing.id] = buildUnavailableDatesForListing(listing.id, baseDate);
      return accumulator;
    }, {});
  }, [todayIso]);

  const isListingAvailableForRange = (listingId, startIso, endIso) => {
    const datesToCheck = eachDayIso(startIso, endIso);
    if (!datesToCheck.length) {
      return false;
    }

    const unavailableDates = listingUnavailableDates[listingId];
    return datesToCheck.every((dateIso) => !unavailableDates.has(dateIso));
  };

  const handleCheckAvailability = () => {
    const locationTerm = heroFilters.location.trim().toLowerCase();
    const hasLocation = Boolean(locationTerm);
    const guestsCount = Number(heroFilters.guests || 0);
    const hasAnyDate = Boolean(checkInDate || checkOutDate);
    const hasCompleteDateRange = Boolean(checkInDate && checkOutDate);
    const hasValidDateRange = Boolean(hasCompleteDateRange && checkOutDate > checkInDate);

    if (!hasLocation && !hasAnyDate) {
      setSearchMatchedListingIds([]);
      setAvailabilityResult({
        isAvailable: false,
        title: t.hero.missingFiltersTitle,
        message: t.hero.missingFiltersMessage,
        listingNames: []
      });
      return;
    }

    if (!hasLocation && hasAnyDate && !hasCompleteDateRange) {
      setSearchMatchedListingIds([]);
      setAvailabilityResult({
        isAvailable: false,
        title: t.hero.missingDatesTitle,
        message: t.hero.missingDatesMessage,
        listingNames: []
      });
      return;
    }

    if (!hasLocation && hasCompleteDateRange && !hasValidDateRange) {
      setSearchMatchedListingIds([]);
      setAvailabilityResult({
        isAvailable: false,
        title: t.hero.invalidRangeTitle,
        message: t.hero.invalidRangeMessage,
        listingNames: []
      });
      return;
    }

    const locationAndDateMatchedListings = listings.filter((listing) => (
      (!locationTerm
        || listing.title.toLowerCase().includes(locationTerm)
        || listing.location.toLowerCase().includes(locationTerm))
      &&
      (!hasValidDateRange || isListingAvailableForRange(listing.id, checkInDate, checkOutDate))
    ));

    const availableListings = locationAndDateMatchedListings.filter((listing) => (
      !guestsCount || listing.maxGuests >= guestsCount
    ));

    if (!availableListings.length) {
      const maxAllowedGuests = locationAndDateMatchedListings.reduce(
        (highest, listing) => Math.max(highest, listing.maxGuests || 0),
        0
      );
      const exceedsGuestCapacity = Boolean(guestsCount && maxAllowedGuests && guestsCount > maxAllowedGuests);

      setSearchMatchedListingIds([]);
      setAvailabilityResult({
        isAvailable: false,
        title: t.hero.unavailableTitle,
        message: exceedsGuestCapacity
          ? t.hero.unavailableGuestsMessage
          : hasLocation
            ? t.hero.unavailableCityMessage
            : t.hero.unavailableMessage,
        listingNames: []
      });
      return;
    }

    setSearchMatchedListingIds(availableListings.map((listing) => listing.id));

    const recommendedListings = availableListings.slice(0, 3);

    setAvailabilityResult({
      isAvailable: true,
      title: t.hero.availableTitle,
      message: t.hero.availableSearchMessage.replace("{count}", String(recommendedListings.length)),
      listingNames: recommendedListings.map((listing) => listing.title)
    });
  };

  const defaultMinCheckOut = useMemo(() => toIsoDate(addDays(new Date(`${todayIso}T00:00:00`), 1)), [todayIso]);
  const minCheckOut = checkInDate
    ? toIsoDate(addDays(new Date(`${checkInDate}T00:00:00`), 1))
    : defaultMinCheckOut;

  const handleHeroFilterChange = (field, value) => {
    setHeroFilters((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCatalogFilterChange = (field, value) => {
    setCatalogFilters((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const toggleCatalogService = (serviceKey) => {
    setCatalogFilters((prev) => ({
      ...prev,
      services: prev.services.includes(serviceKey)
        ? prev.services.filter((item) => item !== serviceKey)
        : [...prev.services, serviceKey]
    }));
  };

  const matchesService = (listing, serviceKey) => {
    const amenitiesText = listing.amenities.join(" ").toLowerCase();

    if (serviceKey === "wifi") {
      return amenitiesText.includes("wifi");
    }

    if (serviceKey === "pool") {
      return amenitiesText.includes("pool") || amenitiesText.includes("piscina");
    }

    if (serviceKey === "kitchen") {
      return amenitiesText.includes("kitchen") || amenitiesText.includes("cocina");
    }

    if (serviceKey === "parking") {
      return amenitiesText.includes("parking") || amenitiesText.includes("estacionamiento");
    }

    return true;
  };

  const dateConstrainedCatalogListings = useMemo(() => {
    if (!checkInDate || !checkOutDate || checkOutDate <= checkInDate) {
      return listings;
    }

    return listings.filter((listing) => (
      isListingAvailableForRange(listing.id, checkInDate, checkOutDate)
    ));
  }, [checkInDate, checkOutDate, listingUnavailableDates]);

  const catalogListings = useMemo(() => {
    const locationTerm = heroFilters.location.trim().toLowerCase();
    const minGuests = catalogFilters.minGuests === "any" ? 0 : Number(catalogFilters.minGuests || 0);
    const hasSearchMatches = Array.isArray(searchMatchedListingIds);
    const matchedIds = hasSearchMatches ? new Set(searchMatchedListingIds) : null;

    return dateConstrainedCatalogListings.filter((listing) => {
      const listingPrice = Number(listing.price.replace(/\D/g, ""));

      const matchesLocation = !locationTerm
        || listing.title.toLowerCase().includes(locationTerm)
        || listing.location.toLowerCase().includes(locationTerm);
      const matchesSearch = !matchedIds || matchedIds.has(listing.id);
      const matchesPrice = listingPrice <= catalogFilters.maxPrice;
      const matchesGuests = !minGuests || listing.maxGuests >= minGuests;
      const matchesServices = catalogFilters.services.every((serviceKey) => matchesService(listing, serviceKey));

      return matchesSearch && matchesLocation && matchesPrice && matchesGuests && matchesServices;
    });
  }, [catalogFilters, dateConstrainedCatalogListings, heroFilters.location, searchMatchedListingIds]);

  const openCatalogOverlay = () => {
    setIsCatalogOpen(true);
    setAvailabilityResult(null);
  };

  const routeFallback = <div className="pageLoadingState">Cargando...</div>;

  useEffect(() => {
    const introAlreadySeen = window.sessionStorage.getItem("horizon-intro-seen") === "1";
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (introAlreadySeen || prefersReducedMotion) {
      setShowIntro(false);
    }
  }, []);

  const handleIntroComplete = () => {
    window.sessionStorage.setItem("horizon-intro-seen", "1");
    setShowIntro(false);
  };

  const handleSelectListing = (listingId) => {
    navigate(`/stay/${listingId}`);
  };

  return (
    <>
      {showIntro && (
        <ThreeIntroOverlay
          language={language}
          logoImg={logoImg}
          onComplete={handleIntroComplete}
        />
      )}

      <Routes>
      <Route
        path="/demo-login"
        element={
          isAuthenticated ? (
            <Navigate to={getDashboardPathForRole(currentUser.role)} replace />
          ) : (
            <Suspense fallback={routeFallback}>
              <AuthDemoPage
                t={t}
                language={language}
                onSelectUser={handleSelectDemoUser}
              />
            </Suspense>
          )
        }
      />
      <Route
        path="/legal/:pageKey"
        element={
          <Suspense fallback={routeFallback}>
            <LegalPage
              t={t}
              language={language}
              onToggleLanguage={toggleLanguage}
              isUserMenuOpen={isUserMenuOpen}
              setIsUserMenuOpen={setIsUserMenuOpen}
              userMenuRef={userMenuRef}
              logoImg={logoImg}
              onUserMenuAction={handleUserMenuAction}
              isAuthenticated={isAuthenticated}
              onAuthAction={handleAuthAction}
              currentUser={currentUser}
            />
          </Suspense>
        }
      />
      <Route
        path="/profile"
        element={
          isAuthenticated
            ? <Navigate to={getDashboardPathForRole(currentUser.role)} replace />
            : <Navigate to="/demo-login" replace />
        }
      />
      <Route
        path="/dashboard/client"
        element={
          !isAuthenticated
            ? <Navigate to="/demo-login" replace />
            : currentUser.role !== "client"
              ? <Navigate to={getDashboardPathForRole(currentUser.role)} replace />
              : (
                <Suspense fallback={routeFallback}>
                  <ProfileDashboardPage
                    t={t}
                    language={language}
                    onToggleLanguage={toggleLanguage}
                    isUserMenuOpen={isUserMenuOpen}
                    setIsUserMenuOpen={setIsUserMenuOpen}
                    userMenuRef={userMenuRef}
                    logoImg={logoImg}
                    onUserMenuAction={handleUserMenuAction}
                    listings={listings}
                    favoriteListingIds={favoriteListingIds}
                    onToggleFavorite={toggleFavoriteListing}
                    isAuthenticated={isAuthenticated}
                    onAuthAction={handleAuthAction}
                    currentUser={currentUser}
                  />
                </Suspense>
              )
        }
      />
      <Route
        path="/dashboard/host"
        element={
          !isAuthenticated
            ? <Navigate to="/demo-login" replace />
            : currentUser.role !== "host"
              ? <Navigate to={getDashboardPathForRole(currentUser.role)} replace />
              : (
                <Suspense fallback={routeFallback}>
                  <HostDashboardPage
                    t={t}
                    language={language}
                    onToggleLanguage={toggleLanguage}
                    isUserMenuOpen={isUserMenuOpen}
                    setIsUserMenuOpen={setIsUserMenuOpen}
                    userMenuRef={userMenuRef}
                    logoImg={logoImg}
                    onUserMenuAction={handleUserMenuAction}
                    listings={listings}
                    isAuthenticated={isAuthenticated}
                    onAuthAction={handleAuthAction}
                    currentUser={currentUser}
                  />
                </Suspense>
              )
        }
      />
      <Route
        path="/stay/:listingId"
        element={
          <Suspense fallback={routeFallback}>
            <StayDetailPage
              t={t}
              language={language}
              heroFilters={heroFilters}
              checkInDate={checkInDate}
              checkOutDate={checkOutDate}
              onFilterChange={handleHeroFilterChange}
              onChangeCheckIn={(value) => {
                setCheckInDate(value);
                if (checkOutDate && value && checkOutDate <= value) {
                  setCheckOutDate(toIsoDate(addDays(new Date(`${value}T00:00:00`), 1)));
                }
              }}
              onChangeCheckOut={setCheckOutDate}
              onToggleLanguage={toggleLanguage}
              isUserMenuOpen={isUserMenuOpen}
              setIsUserMenuOpen={setIsUserMenuOpen}
              userMenuRef={userMenuRef}
              onUserMenuAction={handleUserMenuAction}
              isAuthenticated={isAuthenticated}
              onAuthAction={handleAuthAction}
              onReserveNow={() => {}}
              onReservationConfirmed={() => {}}
              listings={listings}
              logoImg={logoImg}
              perNightLabel={t.listings.perNight}
            />
          </Suspense>
        }
      />
      <Route
        path="*"
        element={
    <div className="app">
      <Navbar
        t={t}
        language={language}
        onToggleLanguage={toggleLanguage}
        isUserMenuOpen={isUserMenuOpen}
        setIsUserMenuOpen={setIsUserMenuOpen}
        userMenuRef={userMenuRef}
        logoImg={logoImg}
        onUserMenuAction={handleUserMenuAction}
        isAuthenticated={isAuthenticated}
        onAuthAction={handleAuthAction}
        currentUser={currentUser}
      />

      <HeroSection
        t={t}
        language={language}
        locationValue={heroFilters.location}
        guestsValue={heroFilters.guests}
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
        minCheckIn={todayIso}
        minCheckOut={minCheckOut}
        availabilityResult={availabilityResult}
        onChangeLocation={(value) => handleHeroFilterChange("location", value)}
        onChangeGuests={(value) => handleHeroFilterChange("guests", value)}
        onChangeCheckIn={(value) => {
          setCheckInDate(value);
          if (checkOutDate && value && checkOutDate <= value) {
            setCheckOutDate(toIsoDate(addDays(new Date(`${value}T00:00:00`), 1)));
          }
        }}
        onChangeCheckOut={setCheckOutDate}
        onCheckAvailability={handleCheckAvailability}
        onShowListings={openCatalogOverlay}
      />

      <ListingsSection
        label={t.collections.label}
        title={t.listings.additionalStays}
        listings={listings}
        perNightLabel={t.listings.perNight}
        onSelectListing={handleSelectListing}
        favoriteListingIds={favoriteListingIds}
        onToggleFavorite={toggleFavoriteListing}
      />

      <ExperiencesSection
        t={t}
        onSelectExperienceCategory={() => {}}
      />
      
      <FooterSection t={t} language={language} logoImg={logoImg} footerImage={footerImage} />

      {isCatalogOpen && (
        <Suspense fallback={routeFallback}>
          <CatalogOverlay
            t={t}
            language={language}
            heroFilters={heroFilters}
            checkInDate={checkInDate}
            checkOutDate={checkOutDate}
            minCheckIn={todayIso}
            onChangeCheckIn={setCheckInDate}
            onChangeCheckOut={setCheckOutDate}
            catalogFilters={catalogFilters}
            catalogListings={catalogListings}
            onFilterChange={handleHeroFilterChange}
            onCatalogFilterChange={handleCatalogFilterChange}
            onToggleService={toggleCatalogService}
            onSearch={() => {}}
            onSelectListing={(listingId) => {
              setIsCatalogOpen(false);
              handleSelectListing(listingId);
            }}
            perNightLabel={t.listings.perNight}
            onToggleLanguage={toggleLanguage}
            isUserMenuOpen={isUserMenuOpen}
            setIsUserMenuOpen={setIsUserMenuOpen}
            userMenuRef={userMenuRef}
            onUserMenuAction={handleUserMenuAction}
            isAuthenticated={isAuthenticated}
            onAuthAction={handleAuthAction}
            onClose={() => setIsCatalogOpen(false)}
            logoImg={logoImg}
          />
        </Suspense>
      )}
    </div>
        }
      />
      </Routes>
    </>
  );
}

export default App;
