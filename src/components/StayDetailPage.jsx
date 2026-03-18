import DatePicker from "react-datepicker";
import { addDays, differenceInCalendarDays } from "date-fns";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOptimizedImageUrl } from "../imageUtils";
import WhatsAppReservationForm from "./WhatsAppReservationForm";
import MapView from "./MapView";
import MapModal from "./MapModal";
import PropertyGallery from "./PropertyGallery";

const parseIsoDate = (isoValue) => {
  if (!isoValue) {
    return null;
  }

  const [year, month, day] = isoValue.split("-").map(Number);
  if (!year || !month || !day) {
    return null;
  }

  return new Date(year, month - 1, day);
};

const toIsoDate = (date) => {
  const safeDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
  return safeDate.toISOString().slice(0, 10);
};

function DetailDateRangeField({
  language,
  startDate,
  endDate,
  onChangeCheckIn,
  onChangeCheckOut,
  minDate
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoverDate, setHoverDate] = useState(null);

  const monthNames = language === "es"
    ? ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
    : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const yearOptions = useMemo(() => {
    const baseYear = new Date().getFullYear();
    return Array.from({ length: 9 }, (_, index) => baseYear - 2 + index);
  }, []);

  const getRangeBounds = (rangeStart, rangeEnd) => {
    if (!rangeStart || !rangeEnd) {
      return null;
    }

    return rangeStart <= rangeEnd
      ? { rangeMin: rangeStart, rangeMax: rangeEnd }
      : { rangeMin: rangeEnd, rangeMax: rangeStart };
  };

  const formatRangeLabel = () => {
    if (!startDate && !endDate) {
      return "Select dates";
    }

    const formatter = new Intl.DateTimeFormat(language === "es" ? "es-ES" : "en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });

    if (startDate && endDate) {
      return `${formatter.format(startDate)} - ${formatter.format(endDate)}`;
    }

    return formatter.format(startDate || endDate);
  };

  return (
    <DatePicker
      selected={startDate}
      onChange={(dates) => {
        const [nextStart, nextEnd] = dates;
        onChangeCheckIn?.(nextStart || null);
        onChangeCheckOut?.(nextEnd || null);

        if (nextStart && nextEnd) {
          setHoverDate(null);
          setIsOpen(false);
        }
      }}
      startDate={startDate}
      endDate={endDate}
      selectsRange
      minDate={minDate}
      shouldCloseOnSelect={false}
      open={isOpen}
      onInputClick={() => setIsOpen(true)}
      onClickOutside={() => {
        setHoverDate(null);
        setIsOpen(false);
      }}
      onCalendarClose={() => setHoverDate(null)}
      onDayMouseEnter={(date) => {
        if (startDate && !endDate) {
          setHoverDate(date);
        }
      }}
      popperPlacement="bottom-start"
      popperClassName="heroDatePickerPopper"
      calendarClassName="heroDatePickerCalendar"
      formatWeekDay={(weekday) => weekday.slice(0, 1).toUpperCase()}
      customInput={(
        <button type="button" className="detailDateRangeButton">
          {formatRangeLabel()}
        </button>
      )}
      dayClassName={(date) => {
        const committedBounds = getRangeBounds(startDate, endDate);
        const previewBounds = !endDate ? getRangeBounds(startDate, hoverDate) : null;
        const activeBounds = committedBounds || previewBounds;
        const isInRange = Boolean(activeBounds && date >= activeBounds.rangeMin && date <= activeBounds.rangeMax);
        const isPreview = Boolean(!committedBounds && previewBounds);

        if (!isInRange) {
          return undefined;
        }

        if (activeBounds && date.getTime() === activeBounds.rangeMin.getTime()) {
          return `${isPreview ? "heroDayPreview" : "heroDayInRange"} heroDayRangeStart`;
        }

        if (activeBounds && date.getTime() === activeBounds.rangeMax.getTime()) {
          return `${isPreview ? "heroDayPreview" : "heroDayInRange"} heroDayRangeEnd`;
        }

        return isPreview ? "heroDayPreview" : "heroDayInRange";
      }}
      renderDayContents={(dayOfMonth, date) => {
        const committedBounds = getRangeBounds(startDate, endDate);
        const previewBounds = !endDate ? getRangeBounds(startDate, hoverDate) : null;
        const activeBounds = committedBounds || previewBounds;
        const isInRange = Boolean(activeBounds && date >= activeBounds.rangeMin && date <= activeBounds.rangeMax);
        const rangeStep = isInRange
          ? Math.max(0, Math.min(20, differenceInCalendarDays(date, activeBounds.rangeMin)))
          : 0;

        return (
          <span
            className={`heroDayBubble ${isInRange ? "inRange" : ""}`.trim()}
            style={isInRange ? { "--hero-range-step": rangeStep } : undefined}
          >
            {dayOfMonth}
          </span>
        );
      }}
      renderCustomHeader={({ date, changeMonth, changeYear }) => (
        <div className="heroCalendarHeaderControls">
          <select
            className="heroCalendarSelect"
            value={date.getMonth()}
            onChange={(event) => changeMonth(Number(event.target.value))}
          >
            {monthNames.map((monthName, index) => (
              <option key={monthName} value={index}>{monthName}</option>
            ))}
          </select>
          <select
            className="heroCalendarSelect"
            value={date.getFullYear()}
            onChange={(event) => changeYear(Number(event.target.value))}
          >
            {yearOptions.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      )}
    />
  );
}

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

function StayDetailPage({
 t,
 language,
 heroFilters,
 checkInDate: initialCheckInDate,
 checkOutDate: initialCheckOutDate,
 onFilterChange,
 onChangeCheckIn,
 onChangeCheckOut,
 onToggleLanguage,
 isUserMenuOpen,
 setIsUserMenuOpen,
 userMenuRef,
 onUserMenuAction,
 isAuthenticated = true,
 onAuthAction,
 onReserveNow,
 onReservationConfirmed,
 listings,
 logoImg,
 perNightLabel,
 currentUser,
 userMenuOptions
}) {
  const testChatAvatar = "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face";
  const navigate = useNavigate();
  const { listingId } = useParams();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("details");
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [showStickyTitle, setShowStickyTitle] = useState(false);
  const [isCheckoutDialogOpen, setIsCheckoutDialogOpen] = useState(false);
  const [isHostDialogOpen, setIsHostDialogOpen] = useState(false);
  const [isHostChatOpen, setIsHostChatOpen] = useState(false);
  const [isHostChatWindowOpen, setIsHostChatWindowOpen] = useState(false);
  const [isHostChatExpanded, setIsHostChatExpanded] = useState(false);
  const [activeHostChatKey, setActiveHostChatKey] = useState("primary");
  const [hostChatDraft, setHostChatDraft] = useState("");
  const [isWhatsAppDialogOpen, setIsWhatsAppDialogOpen] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isImageLightboxOpen, setIsImageLightboxOpen] = useState(false);
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0);
  const [hostChatThreads, setHostChatThreads] = useState(() => ({
    primary: t.detail.hostChat.messages,
    test: [
      {
        id: "test-1",
        sender: "host",
        text: t.detail.hostChat.testPreviewSnippet.replace(/^✓✓\s*/, ""),
        time: t.detail.hostChat.testPreviewTime
      }
    ]
  }));
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState(
    t.profileDashboard.payments.initialValues.selectedMethodId
  );
  const titleRef = useRef(null);

  const renderUserMenu = () => (
    <div className="userMenuContainer" ref={userMenuRef}>
      <button
        className="avatarButton"
        onClick={() => setIsUserMenuOpen((prev) => !prev)}
        type="button"
      >
        <div className="userAvatar">
          <img src={currentUser?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face"} alt="User" />
        </div>
      </button>

      {isUserMenuOpen && (
        <div className="userDropdown" role="menu">
          {(userMenuOptions || t.userMenu.options).map((option) => (
            <div key={option.key} className="userMenuRowWrap">
              {option.key === "logout" && <div className="userMenuDivider" />}
              <button
                className={`userMenuItem ${option.key === "logout" ? "danger" : ""}`}
                type="button"
                onClick={() => {
                  onUserMenuAction?.(option.key);
                  setIsUserMenuOpen(false);
                }}
              >
                <span className="userMenuItemIcon">{USER_MENU_ICONS[option.key]}</span>
                {option.label}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const listing = useMemo(() => {
    const id = Number(listingId);
    return listings.find((item) => item.id === id) || listings[0];
  }, [listingId, listings]);

  const detailImages = [
    listing.image,
    "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1494526585095-c41746248156?w=800&h=500&fit=crop"
  ];

  const optimizedDetailHeroImages = useMemo(
    () => detailImages.map((image) => getOptimizedImageUrl(image, { width: 1400, height: 850, quality: 68 })),
    [detailImages]
  );

  const optimizedDetailThumbImages = useMemo(
    () => detailImages.map((image) => getOptimizedImageUrl(image, { width: 360, height: 220, quality: 62 })),
    [detailImages]
  );

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${listing.location} ${listing.title}`)}`;

  const formatPrice = (rawPrice) => {
    const [amount] = rawPrice.split("/");
    return perNightLabel ? `${amount} ${t.detail.perLabel} ${perNightLabel}` : amount;
  };

  // Lógica de cobro con descuentos semanales y mensuales
  // Precio base fijo por noche
  const nightlyRate = listing.id === 1 ? 232432 : 169360;
  const hasFullRange = Boolean(checkInDate && checkOutDate);
  const nights = hasFullRange ? Math.max(1, differenceInCalendarDays(checkOutDate, checkInDate)) : 0;
  let totalBeforeTax = 0;
  if (hasFullRange) {
    if (nights >= 30) {
      // Descuento mensual: 25% sobre el total
      totalBeforeTax = nightlyRate * nights * 0.75;
    } else if (nights >= 7) {
      // Descuento semanal: 10% sobre el total
      totalBeforeTax = nightlyRate * nights * 0.90;
    } else {
      totalBeforeTax = nightlyRate * nights;
    }
  }

  const tabKeys = ["details", "availability", "reviews", "location"];

  const listingOverride = t.detail.listingOverrides?.[String(listing.id)] || {};
  const translatedDescription = listingOverride.description || listing.description;
  const translatedAmenities = listingOverride.amenities || listing.amenities;
  const profileInitial = t.profileDashboard.personalInfo.initialValues;
  const paymentMethods = t.profileDashboard.payments.methods;
  const hostDialog = t.detail.hostDialog;
  const selectedPaymentMethod = paymentMethods.find((method) => method.id === selectedPaymentMethodId)
    || paymentMethods[0];
  const guestName = `${profileInitial.firstName} ${profileInitial.lastName}`;
  const primaryChatMessages = hostChatThreads.primary || [];
  const testChatMessages = hostChatThreads.test || [];
  const activeHostChatMessages = hostChatThreads[activeHostChatKey] || [];
  const latestPrimaryChatMessage = primaryChatMessages[primaryChatMessages.length - 1];
  const latestTestChatMessage = testChatMessages[testChatMessages.length - 1];
  const activeHostChatName = activeHostChatKey === "test" ? t.detail.hostChat.testPreviewName : hostDialog.name;
  const activeHostChatAvatar = activeHostChatKey === "test" ? testChatAvatar : hostDialog.image;
  const activeHostChatStatus = t.detail.hostChat.status;

  useEffect(() => {
    setHostChatThreads({
      primary: t.detail.hostChat.messages,
      test: [
        {
          id: "test-1",
          sender: "host",
          text: t.detail.hostChat.testPreviewSnippet.replace(/^✓✓\s*/, ""),
          time: t.detail.hostChat.testPreviewTime
        }
      ]
    });
  }, [t.detail.hostChat.messages, t.detail.hostChat.testPreviewSnippet, t.detail.hostChat.testPreviewTime]);

  useEffect(() => {
    if (paymentMethods.length === 0) {
      return;
    }

    const hasCurrentMethod = paymentMethods.some((method) => method.id === selectedPaymentMethodId);
    if (!hasCurrentMethod) {
      setSelectedPaymentMethodId(t.profileDashboard.payments.initialValues.selectedMethodId || paymentMethods[0].id);
    }
  }, [paymentMethods, selectedPaymentMethodId, t.profileDashboard.payments.initialValues.selectedMethodId]);

  useEffect(() => {
    setCheckInDate(parseIsoDate(initialCheckInDate));
  }, [initialCheckInDate]);

  useEffect(() => {
    setCheckOutDate(parseIsoDate(initialCheckOutDate));
  }, [initialCheckOutDate]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [listingId]);

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % detailImages.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + detailImages.length) % detailImages.length);
  };

  const handleDateRangeChange = (dates) => {
    const [start, end] = dates;
    setCheckInDate(start);
    setCheckOutDate(end);
    onChangeCheckIn?.(start ? toIsoDate(start) : "");
    onChangeCheckOut?.(end ? toIsoDate(end) : "");

    if (start) {
      onFilterChange("date", start);
    }
  };

  const handleCheckInChange = (date) => {
    if (!date) {
      setCheckInDate(null);
      onChangeCheckIn?.("");
      return;
    }

    const nextCheckOutDate = checkOutDate && checkOutDate <= date
      ? addDays(date, 1)
      : checkOutDate;

    setCheckInDate(date);
    setCheckOutDate(nextCheckOutDate);
    onChangeCheckIn?.(toIsoDate(date));
    if (nextCheckOutDate) {
      onChangeCheckOut?.(toIsoDate(nextCheckOutDate));
    }
    onFilterChange("date", date);
  };

  const handleCheckOutChange = (date) => {
    if (!date) {
      setCheckOutDate(null);
      onChangeCheckOut?.("");
      return;
    }

    const nextCheckOutDate = checkInDate && date <= checkInDate
      ? addDays(checkInDate, 1)
      : date;

    setCheckOutDate(nextCheckOutDate);
    onChangeCheckOut?.(toIsoDate(nextCheckOutDate));
  };

  const handleReserveClick = () => {
    setIsWhatsAppDialogOpen(true);
  };

  const closeCheckoutDialog = () => {
    setIsCheckoutDialogOpen(false);
  };

  const confirmReservation = () => {
    setIsCheckoutDialogOpen(false);
    onReservationConfirmed?.();
  };

  const closeHostDialog = () => {
    setIsHostDialogOpen(false);
  };

  const openHostDialog = () => {
    setIsHostDialogOpen(true);
  };

  const ensureChatAccess = () => {
    if (isAuthenticated) {
      return true;
    }

    onReserveNow?.();
    return false;
  };

  const openHostChat = () => {
    if (!ensureChatAccess()) {
      return;
    }

    setIsHostDialogOpen(false);
    setIsHostChatOpen(true);
    setIsHostChatWindowOpen(false);
    setIsHostChatExpanded(false);
    setActiveHostChatKey("primary");
  };

  const closeHostChat = () => {
    setIsHostChatOpen(false);
    setIsHostChatWindowOpen(false);
    setIsHostChatExpanded(false);
  };

  const openHostChatWindow = (chatKey = "primary") => {
    if (!ensureChatAccess()) {
      return;
    }

    setActiveHostChatKey(chatKey);
    setIsHostChatWindowOpen(true);
    setIsHostChatExpanded(false);
  };

  const minimizeHostChatWindow = () => {
    setIsHostChatWindowOpen(false);
    setIsHostChatExpanded(false);
  };

  const toggleHostChatSize = () => {
    setIsHostChatExpanded((prev) => !prev);
  };

  const hideHostChatToMini = () => {
    setIsHostChatWindowOpen(false);
    setIsHostChatExpanded(false);
  };

  const sendHostChatMessage = () => {
    const text = hostChatDraft.trim();
    if (!text) {
      return;
    }

    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    setHostChatThreads((prev) => ({
      ...prev,
      [activeHostChatKey]: [
        ...(prev[activeHostChatKey] || []),
        {
          id: `guest-${Date.now()}`,
          sender: "guest",
          text,
          time: `${hours}:${minutes}`
        }
      ]
    }));
    setHostChatDraft("");
  };

  const handleHostChatSubmit = (event) => {
    event.preventDefault();
    sendHostChatMessage();
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!titleRef.current) {
        setShowStickyTitle(false);
        return;
      }

      const rect = titleRef.current.getBoundingClientRect();
      setShowStickyTitle(rect.bottom < 72);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [listing.title]);

  return (
    <div className="detailPage">
      <div className={`detailTopBar ${showStickyTitle ? "scrolled" : ""}`}>
        <button className="detailBrand" type="button" onClick={() => navigate("/")}>
          <img src={logoImg} alt="La Villa" className="detailLogoImg" />
          <span className="detailBrandText">La Villa</span>
        </button>

        <div className="detailTopCenter">
          {showStickyTitle && <p className="detailTopTitle">{listing.title}</p>}
        </div>

        <div className="detailTopActions">
          <button className="languageToggle" onClick={onToggleLanguage} type="button">
            {language === "es" ? "EN" : "ES"}
          </button>
          
          {isAuthenticated && renderUserMenu()}
        </div>
      </div>

      <div className="detailContent">
        <nav className="detailBreadcrumbs">
          <button className="detailBackCrumb" type="button" onClick={() => navigate(-1)}>
            <span>{t.detail.breadcrumbPrefix}</span>
          </button>
          <span className="detailCrumbSep">/</span>
          <span>{listing.location}</span>
          <span className="detailCrumbSep">/</span>
          <span className="detailCrumbActive">{listing.title}</span>
        </nav>

        <div className="detailHeaderIntro">
          <h1 ref={titleRef}>{listing.title}</h1>
          <div className="detailHeaderMeta">
            <div className="detailRatingRow">
              <span className="detailStars">★★★★★</span>
              <span className="detailRatingScore">{listing.rating}</span>
              <span className="detailReviewCount">({listing.reviews} {t.detail.reviews})</span>
            </div>
            <div className="detailLocationRow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              <span>{listing.location}</span>
              <button
                type="button"
                className="detailMapLink"
                onClick={() => {
                  setActiveTab("location");
                  const tabsElement = document.querySelector(".detailTabsRow");
                  if (tabsElement) {
                    tabsElement.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
              >
                {t.catalog.showMap}
              </button>
            </div>
          </div>
        </div>

        <div className="detailLayout">
          <div className="detailMainColumn">
            <div className="detailGalleryGrid">
              <div 
                className="detailHeroImageWrap"
                onClick={() => {
                  setLightboxImageIndex(activeImageIndex);
                  setIsImageLightboxOpen(true);
                }}
                style={{ cursor: 'zoom-in' }}
              >
                <img
                  src={optimizedDetailHeroImages[activeImageIndex]}
                  alt={listing.title}
                  className="detailHeroImage"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
                <div className="detailGalleryNav">
                  <button 
                    className="detailSlideNav" 
                    type="button" 
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                  >
                    ‹
                  </button>
                  <button 
                    className="detailSlideNav" 
                    type="button" 
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                  >
                    ›
                  </button>
                </div>
                <span className="detailCounter">{`${activeImageIndex + 1} / ${detailImages.length}`}</span>
                <div className="detailGalleryExpand">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                  </svg>
                  <span>{language === 'es' ? 'Ver en grande' : 'View full size'}</span>
                </div>
              </div>

              <div className="detailThumbCol">
                {detailImages.slice(1, 5).map((image, index) => (
                  <button
                    key={image}
                    className={`detailThumbBtn ${index + 1 === activeImageIndex ? "active" : ""}`}
                    type="button"
                    onClick={() => setActiveImageIndex(index + 1)}
                  >
                    <img src={optimizedDetailThumbImages[index + 1]} alt={listing.title} className="detailThumb" loading="lazy" decoding="async" />
                  </button>
                ))}
              </div>
            </div>

            <div className="detailFacts">
              <span>{listing.maxGuests} huéspedes</span>
              <span>{listing.rooms || 3} habitaciones</span>
              <span>{listing.beds || 3} camas</span>
              <span>{listing.bathrooms || 2} baños</span>
            </div>

            <div className="detailDescriptionCard">
              <h3>{t.detail.hostTitle}</h3>
              {listing.id === 1 ? (
                (() => {
                  const desc = `Acerca de este espacio<br>🏡 Hermosa casa privada con zona verde y parqueadero, rodeada de cerca viva que brinda privacidad y una agradable sensación campestre. Ubicada a la entrada de Sogamoso a solo 5 minutos del centro y 10 minutos de Tibasosa o Nobsa. Espacio acogedor, ideal para descanso, viajes de trabajo o estudio. Sus ambientes luminosos y zona exterior ofrecen comodidad y tranquilidad después de una jornada laboral o un día de turismo. Perfecta para parejas y familias. Ubicada en condominio tranquilo y seguro.<br><br>El espacio<br>🏡 Refugio La Villa – Boyacá<br><br>Ubicado en la entrada de Sogamoso, a solo 5 minutos del centro y 10 minutos de Tibasosa y Nobsa. Un espacio acogedor que combina comodidad, privacidad y una agradable sensación campestre, ideal para descansar después de una jornada laboral o un día de turismo.<br><br>✨ Lo que encontrarás<br><br>🚗 Comodidades principales<br>• Parqueadero privado al ingreso de la casa<br>• Internet de alta velocidad con fibra óptica<br>• Smart TV<br>• Internet de alta velocidad<br><br>🍳 Zona social y cocina<br>• Cocina totalmente equipada<br>• Electrodomésticos menores listos para usar<br>• Sala y comedor amplios<br>• Excelente iluminación natural durante el día<br>• Conexión directa a zona exterior privada<br><br>🛏 Habitaciones<br>• 3 habitaciones amplias y bien iluminadas<br>• Cama doble en cada habitación<br>• Colchones ortopédicos<br>• Ropa de cama de alta calidad<br>• Clósets amplios<br>• Cortinas y persianas blackout<br><br>🚿 Baños<br>• 2 baños completos<br>• Baño privado en habitación principal<br>• Calentador de agua a gas<br><br>🌿 Exterior y entorno<br>• Zona verde privada ideal para desayunos al aire libre o un café en la tarde<br>• Ambiente tranquilo y seguro<br>• Condominio con seguridad 24/7<br>• Senderos peatonales para caminar o pasear con tu mascota<br><br>Se encuentra dentro de un amplio condominio con seguridad 24/7, vías adoquinadas y senderos peatonales ideales para caminar o pasear con tu mascota. Además, cuenta con zona comercial con<br>🛍 Servicios cercanos como:<br>• Tiendas y víveres<br>• Restaurantes y cafeterías<br>• Gimnasio y pilates<br>• Peluquería y salón de belleza<br><br>Un refugio pensado para parejas, familias y viajeros de trabajo que buscan confort, privacidad y una estadía tranquila.`;
                  const [showAllDesc, setShowAllDesc] = window.useState ? window.useState(false) : useState(false);
                  const shortDesc = desc.split('<br>').slice(0, 2).join(' ');
                  return (
                    <>
                      <p dangerouslySetInnerHTML={{ __html: showAllDesc ? desc : shortDesc }} />
                      <button
                        className="detailDescToggleBtn"
                        type="button"
                        onClick={() => setShowAllDesc((prev) => !prev)}
                        style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}
                      >
                        {showAllDesc ? 'Mostrar menos' : 'Mostrar más'}
                        <span style={{ fontSize: '18px', transform: showAllDesc ? 'rotate(180deg)' : 'none' }}>▼</span>
                      </button>
                    </>
                  );
                })()
              ) : listing.id === 2 ? (
                (() => {
                  const desc = `Acerca de este espacio<br>Dúplex moderno de 80 m² en el centro de Sogamoso, cerca de la Plaza de la Villa y la Plaza 6 de Septiembre. Totalmente equipado, combina diseño contemporáneo y esencia local. Ubicado en el corazón de la ciudad, es un lugar muy tranquilo, ideal para descansar o trabajar. Cuenta con cocina equipada, luz natural y todos los servicios para una estadía cómoda.<br>Perfecto para explorar la ciudad caminando, disfrutar su historia y relajarte en un espacio amplio y acogedor.<br><br>El espacio<br>Cuenta con estacionamiento privado y en su interior espacios amplios y luminosos, cocina equipada, Wi-Fi, Smart TV y todas las comodidades necesarias para una estadía placentera, ya sea de trabajo o descanso. Sus tres habitaciones bien distribuidas ofrecen descanso ideal para familias, parejas o grupos pequeños.<br><br>Acceso de los huéspedes<br>Estacionamiento privado`;
                  const [showAllDesc, setShowAllDesc] = window.useState ? window.useState(false) : useState(false);
                  const shortDesc = desc.split('<br>').slice(0, 2).join(' ');
                  return (
                    <>
                      <p dangerouslySetInnerHTML={{ __html: showAllDesc ? desc : shortDesc }} />
                      <button
                        className="detailDescToggleBtn"
                        type="button"
                        onClick={() => setShowAllDesc((prev) => !prev)}
                        style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}
                      >
                        {showAllDesc ? 'Mostrar menos' : 'Mostrar más'}
                        <span style={{ fontSize: '18px', transform: showAllDesc ? 'rotate(180deg)' : 'none' }}>▼</span>
                      </button>
                    </>
                  );
                })()
              ) : (
                <p>{translatedDescription}</p>
              )}
            </div>

            <div className="detailHighlightStrip">
              {t.detail.quickHighlights.map((highlight) => (
                <div key={highlight} className="detailHighlightItem">
                  <span>✓</span>
                  <p>{highlight}</p>
                </div>
              ))}
              <button
                type="button"
                className="detailMapBtn"
                onClick={() => {
                  setActiveTab("location");
                  const tabsElement = document.querySelector(".detailTabsRow");
                  if (tabsElement) {
                    tabsElement.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
              >
                {t.detail.mapLink}
              </button>
            </div>

            <div className="detailTabsRow">
              {t.detail.tabs.map((tab, index) => (
                <button
                  key={tab}
                  type="button"
                  className={`detailTabBtn ${activeTab === tabKeys[index] ? "active" : ""}`}
                  onClick={() => setActiveTab(tabKeys[index])}
                >
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === "availability" && (
              <div className="detailInfoSplit">
                <div className="detailCalendarCard">
                  <div className="detailDateInputs">
                    <DatePicker
                      selected={checkInDate}
                      onChange={handleCheckInChange}
                      locale={language === "es" ? "es" : "en"}
                      dateFormat="dd/MM/yyyy"
                      className="catalogDatePicker"
                      selectsStart
                      startDate={checkInDate}
                      endDate={checkOutDate}
                      placeholderText={t.catalog.placeholders.date}
                      minDate={new Date()}
                    />
                    <DatePicker
                      selected={checkOutDate}
                      onChange={handleCheckOutChange}
                      locale={language === "es" ? "es" : "en"}
                      dateFormat="dd/MM/yyyy"
                      className="catalogDatePicker"
                      selectsEnd
                      startDate={checkInDate}
                      endDate={checkOutDate}
                      placeholderText={t.catalog.placeholders.date}
                      minDate={checkInDate || new Date()}
                    />
                  </div>
                  <DatePicker
                    selected={checkInDate}
                    onChange={handleDateRangeChange}
                    locale={language === "es" ? "es" : "en"}
                    inline
                    monthsShown={1}
                    startDate={checkInDate}
                    endDate={checkOutDate}
                    selectsRange
                    dayClassName={(date) => {
                      const isWithinRange = checkInDate && checkOutDate && date >= checkInDate && date <= checkOutDate;
                      return isWithinRange ? "detailDayInRange" : undefined;
                    }}
                  />
                  <p>{t.detail.chooseDates}</p>
                </div>

                <div className="detailOfferPanel">
                  <img src={optimizedDetailHeroImages[3]} alt={listing.title} loading="lazy" decoding="async" />
                  <ul>
                    {translatedAmenities.slice(0, 5).map((amenity) => (
                      <li key={amenity}>• {amenity}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "details" && (
              <>
                <PropertyGallery 
                  images={detailImages}
                  title={listing.title}
                  language={language}
                />

                <h3 className="detailSleepTitle">{t.detail.whereYouWillSleep}</h3>
                <div className="detailSleepGrid">
                  <div className="detailSleepFeatures">
                    {t.detail.sleepFeatures.map((feature) => (
                      <article key={feature.title} className="detailSleepFeatureCard">
                        <h4>{feature.title}</h4>
                        <p>{feature.description}</p>
                      </article>
                    ))}
                  </div>

                  <div className="detailSafetyCard">
                    <h4>{t.detail.trustTitle}</h4>
                    <ul>
                      {t.detail.trustItems.map((item) => (
                        <li key={item}>✓ {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </>
            )}

            {activeTab === "reviews" && (
              <div className="detailReviewPanel">
                <div className="reviewOverviewCard">
                  <div className="reviewScoreBig">
                    <span className="reviewScoreNumber">{listing.rating}</span>
                    <div className="reviewScoreMeta">
                      <span className="reviewStarsBig">★★★★★</span>
                      <span className="reviewCountLabel">{t.detail.reviewSummary}</span>
                    </div>
                  </div>
                  <div className="reviewBarsGrid">
                    {[
                      { label: language === "es" ? "Limpieza" : "Cleanliness", score: 4.9 },
                      { label: language === "es" ? "Precisión" : "Accuracy", score: 5.0 },
                      { label: language === "es" ? "Comunicación" : "Communication", score: 4.8 },
                      { label: language === "es" ? "Ubicación" : "Location", score: 4.9 },
                      { label: language === "es" ? "Check-in" : "Check-in", score: 5.0 },
                      { label: language === "es" ? "Calidad-Precio" : "Value", score: 4.7 }
                    ].map((cat) => (
                      <div key={cat.label} className="reviewBarRow">
                        <span className="reviewBarLabel">{cat.label}</span>
                        <div className="reviewBarTrack">
                          <div className="reviewBarFill" style={{ width: `${(cat.score / 5) * 100}%` }} />
                        </div>
                        <span className="reviewBarValue">{cat.score}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="reviewCardsGrid">
                  {(() => {
                    const reviews = [
                      { name: "Paula", date: "Hace 2 días", text: "Casa con un ambiente muy acogedor, tranquilo y muy limpio", rating: 5, extra: "11 meses en Airbnb", family: true },
                    ];
                    return reviews.map((review) => (
                      <article key={review.name + review.date + review.text.slice(0,10)} className="reviewCard">
                        <div className="reviewCardHead">
                          <div className="reviewCardInfo">
                            <strong>{review.name}</strong>
                            <span>{review.date}</span>
                          </div>
                          <span className="reviewCardStars">{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</span>
                        </div>
                        <p className="reviewCardText">{review.text}</p>
                      </article>
                    ));
                  })()}
                </div>
              </div>
            )}

            {activeTab === "location" && (
              <div className="detailLocationPanel">
                <div className="detailLocationMapWrap detailLocationMapWrapEnhanced">
                  <MapView
                    location={listing.location}
                    title={listing.title}
                    coordinates={listing.coordinates}
                    language={language}
                    height="480px"
                    showExpandButton={true}
                    onExpand={() => setIsMapModalOpen(true)}
                    t={t}
                  />
                  <div className="detailLocationOverlayCard detailLocationOverlayCardEnhanced">
                    <div className="detailLocationIcon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                    </div>
                    <div className="detailLocationMeta">
                      <h4>{listing.location}</h4>
                      <p>{translatedDescription && translatedDescription.substring(0, 80)}...</p>
                    </div>
                    <button 
                      onClick={() => setIsMapModalOpen(true)}
                      className="detailLocationDirectionsBtn detailLocationExpandBtn"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                      </svg>
                      {language === "es" ? "Ver mapa completo" : "View full map"}
                    </button>
                  </div>
                </div>
                <div className="detailLocationHighlights">
                  {[
                    { icon: "🏔️", text: language === "es" ? "Zona tranquila y segura" : "Quiet and safe area" },
                    { icon: "🚗", text: language === "es" ? "Fácil acceso en carro" : "Easy car access" },
                    { icon: "🛒", text: language === "es" ? "Comercios a 5 min" : "Shops 5 min away" },
                    { icon: "☕", text: language === "es" ? "Cafeterías y restaurantes cerca" : "Cafés & restaurants nearby" }
                  ].map((item) => (
                    <div key={item.text} className="detailLocationHighlight">
                      <span>{item.icon}</span>
                      <p>{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="detailSidebar">
            <div className="detailBookingCard">
              <div className="detailPrice">
                <strong>{`$${nightlyRate.toLocaleString()} COP`}</strong>
                {hasFullRange && nights >= 30 && (
                  <div className="detailDiscountLabel" style={{ color: '#2e8b57', fontWeight: 'bold', fontSize: '15px' }}>
                    {language === 'es' ? 'Descuento mensual aplicado (25%)' : 'Monthly discount applied (25%)'}
                  </div>
                )}
                {hasFullRange && nights >= 7 && nights < 30 && (
                  <div className="detailDiscountLabel" style={{ color: '#4682b4', fontWeight: 'bold', fontSize: '15px' }}>
                    {language === 'es' ? 'Descuento semanal aplicado (10%)' : 'Weekly discount applied (10%)'}
                  </div>
                )}
              </div>
              <div className="detailBookingDates">
                <DetailDateRangeField
                  language={language}
                  startDate={checkInDate}
                  endDate={checkOutDate}
                  minDate={new Date()}
                  onChangeCheckIn={handleCheckInChange}
                  onChangeCheckOut={handleCheckOutChange}
                />
              </div>
              <button
                className="detailReserveBtn"
                type="button"
                disabled={!hasFullRange}
                onClick={handleReserveClick}
              >
                {t.navbar.bookNow}
              </button>
              <div className="detailSummary">
                <div><span>{t.detail.duration}</span><span>{hasFullRange ? `${nights} ${t.detail.nights}` : t.detail.selectDates}</span></div>
                <div><span>{t.detail.nightlyRate}</span><span>{`$${nightlyRate}`}</span></div>
                <div className="totalRow"><span>{t.detail.totalBeforeTax}</span><span>{hasFullRange ? `$${Math.round(totalBeforeTax).toLocaleString()}` : "-"}</span></div>
              </div>
            </div>

            <div className="detailAmenitiesCard">
              <h3>Lo que este lugar ofrece</h3>
              <div className="detailAmenitiesGrid">
                {(() => {
                  const amenities = listing.id === 1 ? [
                    "Baño",
                    "Productos de limpieza",
                    "Jabón corporal",
                    "Agua caliente",
                    "Gel de ducha",
                    "Dormitorio y lavadero",
                    "Ganchos para la ropa",
                    "Sábanas",
                    "Sábanas de algodón",
                    "Persianas o cortinas opacas",
                    "Plancha",
                    "Tendedero de ropa",
                    "Entretenimiento",
                    "TV",
                    "Seguridad en el hogar",
                    "Cámaras de seguridad en la parte exterior de la propiedad",
                    "Refugio La Villa está ubicado dentro de un condominio el cual cuenta con CCTV desde el ingreso en portería.",
                    "Internet y oficina",
                    "Wifi",
                    "Utensilios y vajilla",
                    "Cocina",
                    "Los huéspedes pueden cocinar en este espacio",
                    "Refrigerador",
                    "Utensilios básicos para cocinar",
                    "Ollas y sartenes, aceite, sal y pimienta",
                    "Platos y cubiertos",
                    "Bols, palitos chinos, platos, tazas, etc.",
                    "Estufa de gas de acero inoxidable",
                    "Horno doble de acero inoxidable",
                    "Cafetera: Cafetera de filtro",
                    "Copas de vino",
                    "Licuadora",
                    "Mesa del comedor",
                    "Características de la ubicación",
                    "Entrada independiente",
                    "Entrada por otra calle o edificio",
                    "Exterior",
                    "Patio trasero privado",
                    "Un espacio abierto en la propiedad generalmente cubierto de pasto",
                    "Mobiliario exterior",
                    "Zona de comida al aire libre",
                    "Tumbonas",
                    "Estacionamiento e instalaciones",
                    "Estacionamiento gratuito en las instalaciones",
                    "Estacionamiento gratuito en la calle",
                    "Gimnasio compartido cerca",
                    "Servicios",
                    "Se permiten mascotas",
                    "No hay restricciones respecto los animales de asistencia",
                    "Apto para fumadores",
                    "Llegada autónoma",
                    "Cerradura con teclado",
                    "Accede al alojamiento por tu cuenta con el código de acceso",
                    "No incluidos",
                    "No disponible: Lavadora",
                    "No disponible: Secadora",
                    "No disponible: Aire acondicionado",
                    "No disponible: Servicios básicos",
                    "No disponible: Detector de humo",
                    "Es posible que este lugar no tenga un detector de humo. Si tienes alguna pregunta, comunícate con el anfitrión.",
                    "No disponible: Detector de monóxido de carbono",
                    "Es posible que este lugar no tenga un detector de monóxido de carbono. Si tienes alguna pregunta, comunícate con el anfitrión.",
                    "No disponible: Calefacción"
                  ] : [
                    // ...existing code for other listings...
                    "Baño",
                    "Productos de limpieza",
                    "Champú",
                    "Agua caliente",
                    "Gel de ducha",
                    "Dormitorio y lavadero",
                    "Servicios básicos",
                    "Toallas, sábanas, jabón y papel higiénico",
                    "Ganchos para la ropa",
                    "Persianas o cortinas opacas",
                    "Tendedero de ropa",
                    "Espacio para guardar ropa: armario",
                    "Entretenimiento",
                    "TV",
                    "Familia",
                    "Seguros para ventanas",
                    "Seguridad en el hogar",
                    "Cámaras de seguridad en la parte exterior de la propiedad",
                    "El edificio cuenta con CCTV en todas las zonas comunas, ingreso y hall de entrada.",
                    "Extintor de incendios",
                    "Botiquín de primeros auxilios",
                    "Internet y oficina",
                    "Wifi",
                    "Utensilios y vajilla",
                    "Cocina",
                    "Los huéspedes pueden cocinar en este espacio",
                    "Refrigerador",
                    "Utensilios básicos para cocinar",
                    "Ollas y sartenes, aceite, sal y pimienta",
                    "Platos y cubiertos",
                    "Bols, palitos chinos, platos, tazas, etc.",
                    "Congelador",
                    "Estufa de gas de acero inoxidable",
                    "Horno de acero inoxidable",
                    "Cafetera: Máquina de café expreso",
                    "Licuadora",
                    "Mesa del comedor",
                    "Café",
                    "Características de la ubicación",
                    "Lavandería cercana",
                    "Estacionamiento e instalaciones",
                    "Estacionamiento gratis en las instalaciones: 1 puesto",
                    "Estacionamiento de pago en las instalaciones",
                    "Servicios",
                    "Se permiten mascotas",
                    "No hay restricciones respecto los animales de asistencia",
                    "Servicio de limpieza disponible: 2 horas al día, 3 días a la semana, costo: disponible por un costo adicional",
                    "El anfitrión te va a recibir",
                    "No incluidos",
                    "No disponible: Lavadora",
                    "No disponible: Secadora",
                    "No disponible: Aire acondicionado",
                    "No disponible: Detector de humo",
                    "Es posible que este lugar no tenga un detector de humo. Si tienes alguna pregunta, comunícate con el anfitrión.",
                    "No disponible: Detector de monóxido de carbono",
                    "Es posible que este lugar no tenga un detector de monóxido de carbono. Si tienes alguna pregunta, comunícate con el anfitrión.",
                    "No disponible: Calefacción"
                  ];
                  const [showAll, setShowAll] = window.useState ? window.useState(false) : useState(false);
                  const visibleAmenities = showAll ? amenities : amenities.slice(0, 5);
                  return (
                    <>
                      {visibleAmenities.map((amenity) => (
                        <div key={amenity} className="detailAmenityListItem">
                          <span className="detailAmenityCheck">✓</span>
                          <span>{amenity}</span>
                        </div>
                      ))}
                      {amenities.length > 5 && (
                        <button
                          className="detailAmenitiesToggleBtn"
                          type="button"
                          onClick={() => setShowAll((prev) => !prev)}
                          style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}
                        >
                          {showAll ? 'Mostrar menos' : 'Mostrar todos'}
                          <span style={{ fontSize: '18px', transform: showAll ? 'rotate(180deg)' : 'none' }}>▼</span>
                        </button>
                      )}
                    </>
                  );
                })()}
              </div>
            </div>

              <div className="detailHostCard">
                <div className="hostMiniInfo">
                  <div className="hostMiniAvatarWrap">
                    <img src={hostDialog.image} alt={hostDialog.name} className="hostMiniAvatar" />
                    <span className="hostStatusDot"></span>
                  </div>
                  <div className="hostMiniText">
                    <p className="hostLabel">{t.detail.hostBadge}</p>
                    <button className="detailHostLink" type="button" onClick={openHostDialog}>
                      {t.detail.hostName}
                    </button>
                  </div>
                </div>
                
                <div className="hostCardStats">
                  <div className="hostCardStat">
                    <span className="statIcon">★</span>
                    <span>{listing.rating}</span>
                  </div>
                  <div className="hostCardStat">
                    <span className="statIcon">🛡️</span>
                    <span>{t.detail.hostBadge}</span>
                  </div>
                </div>

                <div className="hostCardActions">
                  <button className="hostContactSidebarBtn" type="button" onClick={() => setIsWhatsAppDialogOpen(true)}>
                    {t.detail.contactHost}
                  </button>
                  <button 
                    className="hostKnowMoreSidebarBtn" 
                    type="button" 
                    onClick={openHostDialog}
                  >
                    {hostDialog.profileButton}
                    <span className="btnArrow">→</span>
                  </button>
                </div>
              </div>

              <div className="detailMapEmbed detailMapEmbedEnhanced">
                <MapView
                  location={listing.location}
                  title={listing.title}
                  coordinates={listing.coordinates}
                  language={language}
                  height="220px"
                  showExpandButton={true}
                  onExpand={() => setIsMapModalOpen(true)}
                  t={t}
                />
                <button
                  onClick={() => setIsMapModalOpen(true)}
                  className="detailMapEmbedLink detailMapEmbedLinkEnhanced"
                >
                  <span>{listing.location}</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                  </svg>
                </button>
              </div>
          </aside>
        </div>
      </div>

      {isAuthenticated && isHostChatOpen && !isHostChatWindowOpen && (
        <div className="hostChatLauncherPanel">
          <div className="hostChatLauncherPanelRail">
            <button
              type="button"
              className="hostChatLauncherArrow"
              aria-label={t.detail.hostChat.expandLabel}
              onClick={() => openHostChatWindow("primary")}
            >
              <span>‹</span>
            </button>
          </div>

          <div className="hostChatLauncherList">
            <div className="hostChatLauncher" role="button" tabIndex={0} onClick={() => openHostChatWindow("primary")} onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openHostChatWindow("primary");
              }
            }}>
              <img src={hostDialog.image} alt={hostDialog.name} className="hostChatLauncherAvatar" />
              <div className="hostChatLauncherContent">
                <div className="hostChatLauncherTop">
                  <p className="hostChatLauncherName">{`${guestName} ${t.detail.hostChat.youLabel}`}</p>
                  <span className="hostChatLauncherTime">{latestPrimaryChatMessage?.time || ""}</span>
                </div>
                <p className="hostChatLauncherSnippet">{`✓✓ ${latestPrimaryChatMessage?.text || ""}`}</p>
              </div>
            </div>

            <div className="hostChatLauncher" role="button" tabIndex={0} onClick={() => openHostChatWindow("test")} onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openHostChatWindow("test");
              }
            }}>
              <img
                src={testChatAvatar}
                alt={t.detail.hostChat.testPreviewName}
                className="hostChatLauncherAvatar"
              />
              <div className="hostChatLauncherContent">
                <div className="hostChatLauncherTop">
                  <p className="hostChatLauncherName">{t.detail.hostChat.testPreviewName}</p>
                  <span className="hostChatLauncherTime">{latestTestChatMessage?.time || t.detail.hostChat.testPreviewTime}</span>
                </div>
                <p className="hostChatLauncherSnippet">{`✓✓ ${latestTestChatMessage?.text || t.detail.hostChat.testPreviewSnippet}`}</p>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="hostChatLauncherClose"
            aria-label={t.detail.hostChat.closeLabel}
            onClick={closeHostChat}
          >
            ×
          </button>
        </div>
      )}

      {isAuthenticated && isHostChatOpen && isHostChatWindowOpen && (
        <div className={`hostChatWidget ${isHostChatExpanded ? "expanded" : ""}`} role="dialog" aria-label={t.detail.hostChat.title}>
          <header className="hostChatHeader">
            <div className="hostChatIdentity">
              <img src={activeHostChatAvatar} alt={activeHostChatName} className="hostChatAvatar" />
              <div>
                <h4>{activeHostChatName}</h4>
                <p>{activeHostChatStatus}</p>
              </div>
            </div>

            <div className="hostChatActions">
              <button
                type="button"
                className="hostChatActionBtn"
                aria-label={t.detail.hostChat.hideLabel}
                onClick={hideHostChatToMini}
              >
                ‹
              </button>
              <button
                type="button"
                className="hostChatActionBtn"
                aria-label={t.detail.hostChat.minimizeLabel}
                onClick={minimizeHostChatWindow}
              >
                —
              </button>
              <button
                type="button"
                className="hostChatActionBtn"
                aria-label={isHostChatExpanded ? t.detail.hostChat.collapseLabel : t.detail.hostChat.expandLabel}
                onClick={toggleHostChatSize}
              >
                {isHostChatExpanded ? "▢" : "□"}
              </button>
              <button
                type="button"
                className="hostChatActionBtn"
                aria-label={t.detail.hostChat.closeLabel}
                onClick={closeHostChat}
              >
                ×
              </button>
            </div>
          </header>

          <div className="hostChatBody">
            {activeHostChatMessages.map((message) => (
              <article key={message.id} className={`hostChatMessageRow ${message.sender === "guest" ? "guest" : "host"}`}>
                {message.sender === "host" && <img src={activeHostChatAvatar} alt={activeHostChatName} className="hostChatMiniAvatar" />}

                <div className="hostChatBubbleWrap">
                  <div className={`hostChatBubble ${message.sender === "guest" ? "guest" : "host"}`}>
                    {message.text}
                  </div>
                  <span className="hostChatTime">{message.time}</span>
                </div>
              </article>
            ))}
          </div>

          <form className="hostChatComposer" onSubmit={handleHostChatSubmit}>
            <input
              type="text"
              value={hostChatDraft}
              onChange={(event) => setHostChatDraft(event.target.value)}
              placeholder={t.detail.hostChat.placeholder}
            />
            <button type="submit" className="hostChatSendBtn" aria-label={t.detail.hostChat.sendLabel}>
              ➤
            </button>
          </form>
        </div>
      )}

      {isHostDialogOpen && (
        <div className="authDialogBackdrop" role="presentation" onClick={closeHostDialog}>
          <div
            className="hostSpotlightDialog"
            role="dialog"
            aria-modal="true"
            aria-label={hostDialog.name}
            onClick={(event) => event.stopPropagation()}
          >
            <button className="hostDialogClose" onClick={closeHostDialog}>×</button>
            
            <div className="hostSpotlightHeader">
              <div className="hostSpotlightImage">
                <img src={hostDialog.image} alt={hostDialog.name} />
                <span className="hostSpotlightBadge">✓</span>
              </div>
              <div className="hostSpotlightTitles">
                <h3>{hostDialog.name}</h3>
                <p>{hostDialog.badge}</p>
              </div>
            </div>

            <div className="hostSpotlightContent">
              <p className="hostSpotlightProperties">{hostDialog.properties}</p>
              <p className="hostSpotlightBio">{hostDialog.bio}</p>
            </div>

            <div className="hostSpotlightStats">
              {hostDialog.stats.map((item) => (
                <div key={item.label} className="hostSpotlightStatItem">
                  <span className="statIcon">{item.icon}</span>
                  <div className="statText">
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="hostSpotlightActions">
              <button className="hostSpotlightContact" type="button" onClick={openHostChat}>
                {hostDialog.contactButton}
              </button>
              <button className="hostSpotlightProfile" type="button" onClick={() => navigate("/hosts/andres")}>
                {hostDialog.profileButton}
              </button>
            </div>
          </div>
        </div>
      )}

      {isCheckoutDialogOpen && (
        <div className="authDialogBackdrop" role="presentation" onClick={closeCheckoutDialog}>
          <div
            className="authDialog checkoutDialog"
            role="dialog"
            aria-modal="true"
            aria-label={t.reserveCheckoutDialog.title}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="authDialogBadge">{t.reserveCheckoutDialog.badge}</div>
            <h3>{t.reserveCheckoutDialog.title}</h3>
            <p>{t.reserveCheckoutDialog.subtitle}</p>

            <div className="checkoutDialogGrid">
              <section className="checkoutCardBox">
                <h4>{t.reserveCheckoutDialog.customerTitle}</h4>
                <div className="checkoutInfoRow">
                  <span>{t.reserveCheckoutDialog.labels.name}</span>
                  <strong>{guestName}</strong>
                </div>
                <div className="checkoutInfoRow">
                  <span>{t.reserveCheckoutDialog.labels.email}</span>
                  <strong>{profileInitial.email}</strong>
                </div>
                <div className="checkoutInfoRow">
                  <span>{t.reserveCheckoutDialog.labels.phone}</span>
                  <strong>{profileInitial.phone}</strong>
                </div>
              </section>

              <section className="checkoutCardBox">
                <h4>{t.reserveCheckoutDialog.paymentTitle}</h4>
                <p className="checkoutHint">{t.reserveCheckoutDialog.paymentHint}</p>
                <div className="checkoutPaymentList" role="radiogroup" aria-label={t.reserveCheckoutDialog.paymentTitle}>
                  {paymentMethods.map((method) => {
                    const isSelected = selectedPaymentMethod?.id === method.id;
                    return (
                      <button
                        key={method.id}
                        type="button"
                        className={`checkoutPaymentOption ${isSelected ? "active" : ""}`}
                        onClick={() => setSelectedPaymentMethodId(method.id)}
                        role="radio"
                        aria-checked={isSelected}
                      >
                        <div>
                          <p>{`${method.brand} ${method.maskedNumber}`}</p>
                          <span>{method.holder}</span>
                        </div>
                        {isSelected && <span className="checkoutCheckMark">✓</span>}
                      </button>
                    );
                  })}
                </div>
              </section>
            </div>

            <div className="authDialogActions">
              <button className="authBtn authBtnSecondary" type="button" onClick={closeCheckoutDialog}>
                {t.reserveCheckoutDialog.cancel}
              </button>
              <button className="authBtn authBtnPrimary" type="button" onClick={confirmReservation}>
                {t.reserveCheckoutDialog.confirm}
              </button>
            </div>
          </div>
        </div>
      )}

      {isWhatsAppDialogOpen && (
        <WhatsAppReservationForm
          t={t}
          language={language}
          listing={listing}
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          onClose={() => setIsWhatsAppDialogOpen(false)}
        />
      )}

      {/* Map Modal */}
      <MapModal
        isOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
        location={listing.location}
        title={listing.title}
        coordinates={listing.coordinates}
        language={language}
        t={t}
      />

      {/* Image Lightbox */}
      {isImageLightboxOpen && (
        <div 
          className="detailImageLightbox"
          onClick={() => setIsImageLightboxOpen(false)}
        >
          <div className="detailImageLightboxContent" onClick={(e) => e.stopPropagation()}>
            <button 
              className="detailImageLightboxClose"
              onClick={() => setIsImageLightboxOpen(false)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>

            <button 
              className="detailImageLightboxNav prev"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxImageIndex((prev) => (prev - 1 + detailImages.length) % detailImages.length);
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>

            <button 
              className="detailImageLightboxNav next"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxImageIndex((prev) => (prev + 1) % detailImages.length);
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>

            <div className="detailImageLightboxImageContainer">
              <img 
                src={optimizedDetailHeroImages[lightboxImageIndex]}
                alt={listing.title}
                className="detailImageLightboxImage"
              />
            </div>

            <div className="detailImageLightboxInfo">
              <span className="detailImageLightboxCounter">
                {lightboxImageIndex + 1} / {detailImages.length}
              </span>
              <span className="detailImageLightboxTitle">{listing.title}</span>
            </div>

            <div className="detailImageLightboxThumbnails">
              {detailImages.map((img, idx) => (
                <button
                  key={idx}
                  className={`detailImageLightboxThumb ${idx === lightboxImageIndex ? 'active' : ''}`}
                  onClick={() => setLightboxImageIndex(idx)}
                >
                  <img src={optimizedDetailThumbImages[idx]} alt={`${listing.title} ${idx + 1}`} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Sticky Booking Bar */}
      <div className="detailMobileStickyBar">
        <div className="mobileStickyPrice">
          <strong>{formatPrice(listing.price)}</strong>
          <span>{t.detail.totalLabel} {hasFullRange ? `$${totalBeforeTax}` : "-"}</span>
        </div>
        <button 
          className="mobileStickyReserveBtn" 
          type="button"
          onClick={handleReserveClick}
        >
          {t.navbar.bookNow}
        </button>
      </div>
    </div>
  );
}

export default StayDetailPage;
