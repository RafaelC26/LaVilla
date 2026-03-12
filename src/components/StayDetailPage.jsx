import DatePicker from "react-datepicker";
import { addDays, differenceInCalendarDays } from "date-fns";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
  perNightLabel
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

  const formatPrice = (rawPrice) => {
    const [amount] = rawPrice.split("/");
    return perNightLabel ? `${amount} ${t.detail.perLabel} ${perNightLabel}` : amount;
  };

  const nightlyRate = Number(listing.price.replace(/\D/g, ""));
  const hasFullRange = Boolean(checkInDate && checkOutDate);
  const nights = hasFullRange ? Math.max(1, differenceInCalendarDays(checkOutDate, checkInDate)) : 0;
  const totalBeforeTax = hasFullRange ? (nightlyRate * nights) : 0;

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
    const canContinue = onReserveNow?.();
    if (canContinue) {
      setIsCheckoutDialogOpen(true);
    }
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
      <div className="detailTopBar">
        <button className="catalogBrand" type="button" onClick={() => navigate("/")}>
          <div className="logo catalogLogo">
            <img src={logoImg} alt="Horizon Stays" className="logoImg" />
          </div>
        </button>

        <div className="detailTopCenter">
          {showStickyTitle && <p className="detailTopTitle">{listing.title}</p>}
        </div>

        <div className="detailTopActions">
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
      </div>

      <div className="detailContent">
        <button className="detailBreadcrumb detailBackCrumb" type="button" onClick={() => navigate(-1)}>
          <span className="detailBackArrow">‹</span>
          <span>{`${t.detail.breadcrumbPrefix} / ${listing.location} / ${listing.title}`}</span>
        </button>
        <h1 ref={titleRef}>{listing.title}</h1>

        <div className="detailRatingRow">
          <span className="detailStars">★★★★★</span>
          <span>{listing.rating}</span>
          <span>{t.detail.reviews}</span>
        </div>

        <div className="detailLocationRow">
          <span>{listing.location}</span>
          <button type="button" className="detailMapBtn">{t.catalog.showMap}</button>
        </div>

        <div className="detailLayout">
          <div className="detailMainColumn">
            <div className="detailHeroImageWrap">
              <img src={detailImages[activeImageIndex]} alt={listing.title} className="detailHeroImage" />
              <button className="detailSlideNav prev" type="button" onClick={prevImage}>‹</button>
              <button className="detailSlideNav next" type="button" onClick={nextImage}>›</button>
              <span className="detailCounter">{`${activeImageIndex + 1} / ${detailImages.length}`}</span>
            </div>

            <div className="detailThumbRow">
              {detailImages.map((image, index) => (
                <button
                  key={image}
                  className={`detailThumbBtn ${index === activeImageIndex ? "active" : ""}`}
                  type="button"
                  onClick={() => setActiveImageIndex(index)}
                >
                  <img src={image} alt={listing.title} className="detailThumb" />
                </button>
              ))}
            </div>

            <div className="detailFacts">
              <span>{t.detail.entirePlace}</span>
              <span>{t.detail.beds}</span>
              <span>{`${listing.maxGuests} ${t.detail.guests}`}</span>
            </div>

            <div className="detailDescriptionCard">
              <h3>{t.detail.hostTitle}</h3>
              <p>{translatedDescription}</p>
            </div>

            <div className="detailHighlightStrip">
              {t.detail.quickHighlights.map((highlight) => (
                <div key={highlight} className="detailHighlightItem">
                  <span>✓</span>
                  <p>{highlight}</p>
                </div>
              ))}
              <button type="button" className="detailMapBtn">{t.detail.mapLink}</button>
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
                  <img src={detailImages[3]} alt={listing.title} />
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
                <div className="detailRoomGallery">
                  {detailImages.slice(1, 4).map((image) => (
                    <img key={`${image}-room`} src={image} alt={listing.title} />
                  ))}
                </div>

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
                <h3>{t.detail.reviewSummary}</h3>
                <p>{translatedDescription}</p>
              </div>
            )}

            {activeTab === "location" && (
              <div className="detailLocationPanel">
                <img
                  className="detailMapPreview large"
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1000&h=620&fit=crop"
                  alt={t.detail.mapPreviewAlt}
                />
                <p>{listing.location}</p>
              </div>
            )}
          </div>

          <aside className="detailSidebar">
            <div className="detailBookingCard">
              <p className="detailPrice">{formatPrice(listing.price)}</p>
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
                className="bookBtn detailReserveBtn"
                type="button"
                disabled={!hasFullRange}
                onClick={handleReserveClick}
              >
                {t.navbar.bookNow}
              </button>
              <p className="detailMuted">{hasFullRange ? t.detail.noCharge : t.detail.selectDates}</p>
              <div className="detailSummary">
                <div><span>{t.detail.duration}</span><span>{hasFullRange ? `${nights} ${t.detail.nights}` : t.detail.selectDates}</span></div>
                <div><span>{t.detail.nightlyRate}</span><span>{`$${nightlyRate}`}</span></div>
                <div><span>{t.detail.totalBeforeTax}</span><span>{hasFullRange ? `$${totalBeforeTax}` : "-"}</span></div>
              </div>
            </div>

            <div className="detailAmenitiesCard">
              <h3>{t.detail.whatThisPlaceOffers}</h3>
              <ul>
                {translatedAmenities.map((amenity) => (
                  <li key={amenity}>✓ {amenity}</li>
                ))}
              </ul>
            </div>

            <div className="detailHostCard">
              <h4>
                {`${t.detail.hostBadge} · `}
                <button className="detailHostLink" type="button" onClick={openHostDialog}>{t.detail.hostName}</button>
              </h4>
              <p>{t.detail.hostSince}</p>
              <p>{t.detail.reviewSummary}</p>
            </div>

            <img
              className="detailMapPreview"
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=520&fit=crop"
              alt={t.detail.mapPreviewAlt}
            />

            <button className="detailContactBtn" type="button" onClick={openHostChat}>{t.detail.contactHost}</button>
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
            <div className="hostSpotlightHeader">
              <img src={hostDialog.image} alt={hostDialog.name} className="hostSpotlightAvatar" />
              <div>
                <h3>{hostDialog.name}</h3>
                <p className="hostSpotlightBadge">{hostDialog.badge}</p>
                <p className="hostSpotlightProperties">{hostDialog.properties}</p>
              </div>
            </div>

            <p className="hostSpotlightBio">{hostDialog.bio}</p>

            <div className="hostSpotlightStats">
              {hostDialog.stats.map((item) => (
                <div key={item.label} className="hostSpotlightStatItem">
                  <p className="hostSpotlightMetric">{`${item.icon} ${item.value}`}</p>
                  <p className="hostSpotlightMetricLabel">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="hostSpotlightActions">
              <button className="detailContactBtn hostSpotlightPrimary" type="button" onClick={openHostChat}>
                {hostDialog.contactButton}
              </button>
              <button className="hostSpotlightSecondary" type="button" onClick={() => navigate("/hosts/andres")}>
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
    </div>
  );
}

export default StayDetailPage;
