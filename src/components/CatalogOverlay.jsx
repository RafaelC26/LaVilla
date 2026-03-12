import DatePicker from "react-datepicker";
import { differenceInCalendarDays } from "date-fns";
import { useEffect, useMemo, useRef, useState } from "react";

const isoToDate = (isoValue) => {
  if (!isoValue) {
    return null;
  }

  const [year, month, day] = isoValue.split("-").map(Number);
  if (!year || !month || !day) {
    return null;
  }

  return new Date(year, month - 1, day);
};

const dateToIso = (date) => {
  if (!date) {
    return "";
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

function CatalogRangeField({
  language,
  startValue,
  endValue,
  placeholder,
  className,
  minDateValue,
  onChangeCheckIn,
  onChangeCheckOut
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoverDate, setHoverDate] = useState(null);

  const startDate = useMemo(() => isoToDate(startValue), [startValue]);
  const endDate = useMemo(() => isoToDate(endValue), [endValue]);
  const minDate = useMemo(() => isoToDate(minDateValue), [minDateValue]);

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
      return placeholder;
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
        onChangeCheckIn(nextStart ? dateToIso(nextStart) : "");
        onChangeCheckOut(nextEnd ? dateToIso(nextEnd) : "");

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
        <button type="button" className={className}>
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

function CatalogOverlay({
  t,
  language,
  breadcrumbText,
  heroFilters,
  catalogFilters,
  catalogListings,
  onFilterChange,
  checkInDate,
  checkOutDate,
  minCheckIn,
  onChangeCheckIn,
  onChangeCheckOut,
  onCatalogFilterChange,
  onToggleService,
  onSearch,
  onSelectListing,
  perNightLabel,
  onToggleLanguage,
  isUserMenuOpen,
  setIsUserMenuOpen,
  userMenuRef,
  onUserMenuAction,
  isAuthenticated = true,
  onAuthAction,
  onClose,
  logoImg
}) {
  const [isRoomsOpen, setIsRoomsOpen] = useState(false);
  const roomsRef = useRef(null);
  const destinationPlaceholder = t.catalog.placeholders.destination;
  const datePlaceholder = t.catalog.placeholders.date;
  const roomOptions = [
    { value: "any", label: t.catalog.filters.anyRoom },
    { value: "2", label: "2+" },
    { value: "4", label: "4+" },
    { value: "6", label: "6+" }
  ];
  const selectedRoomLabel = roomOptions.find((option) => option.value === catalogFilters.minGuests)?.label || t.catalog.filters.anyRoom;

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (roomsRef.current && !roomsRef.current.contains(event.target)) {
        setIsRoomsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, []);

  const formatPrice = (rawPrice) => {
    const [amount] = rawPrice.split("/");
    return perNightLabel ? `${amount}/${perNightLabel}` : amount;
  };

  return (
    <div className="catalogOverlay" role="dialog" aria-modal="true" aria-label={t.catalog.title}>
      <div className="catalogTopBar">
        <button className="catalogBrand" type="button" onClick={onClose}>
          <div className="logo catalogLogo">
            <img src={logoImg} alt="Horizon Stays" className="logoImg" />
          </div>
        </button>

        <div className="catalogSearchShell">
          <div className="catalogSearchSegment">
            <span className="catalogSearchLabel">{t.hero.location}</span>
            <div className="catalogSearchValue">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="#10b981"/>
              </svg>
              <input
                className="catalogSearchInput"
                type="text"
                value={heroFilters.location}
                onChange={(event) => onFilterChange("location", event.target.value)}
                placeholder={destinationPlaceholder}
              />
            </div>
          </div>

          <div className="catalogSearchSegment">
            <span className="catalogSearchLabel">{t.hero.date}</span>
            <div className="catalogSearchValue">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="4" width="18" height="18" rx="2" stroke="#10b981" strokeWidth="2"/>
                <path d="M16 2V6M8 2V6M3 10H21" stroke="#10b981" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <CatalogRangeField
                language={language}
                startValue={checkInDate}
                endValue={checkOutDate}
                placeholder={datePlaceholder}
                className="catalogRangeTrigger catalogSearchDatePicker"
                minDateValue={minCheckIn}
                onChangeCheckIn={onChangeCheckIn}
                onChangeCheckOut={onChangeCheckOut}
              />
            </div>
          </div>

          <button className="catalogSearchBtn" type="button" onClick={onSearch}>{t.hero.searchBtn}</button>
        </div>

        <div className="catalogRightControls">
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

      <div className="catalogContent">
        <div className="catalogTitleRow">
          <div>
            <div className="catalogBreadcrumbRow">
              <button className="catalogClose" type="button" onClick={onClose} aria-label={t.catalog.closeLabel}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M14.5 6.5L9 12L14.5 17.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <p className="catalogBreadcrumb">{breadcrumbText || t.catalog.breadcrumb}</p>
            </div>
            <h2>{t.catalog.title}</h2>
            <p>{t.catalog.subtitle}</p>
          </div>
          <button className="catalogMapBtn" type="button">{t.catalog.showMap}</button>
        </div>

        <div className="catalogBody">
          <aside className="catalogSidebar">
            <div className="catalogFilterBlock">
              <h4>{t.catalog.filters.destination}</h4>
              <input
                className="catalogFilterInput"
                type="text"
                value={heroFilters.location}
                onChange={(event) => onFilterChange("location", event.target.value)}
                placeholder={destinationPlaceholder}
              />
            </div>

            <div className="catalogFilterBlock">
              <h4>{t.catalog.filters.date}</h4>
              <CatalogRangeField
                language={language}
                startValue={checkInDate}
                endValue={checkOutDate}
                placeholder={datePlaceholder}
                className="catalogRangeTrigger catalogDatePicker"
                minDateValue={minCheckIn}
                onChangeCheckIn={onChangeCheckIn}
                onChangeCheckOut={onChangeCheckOut}
              />
            </div>

            <div className="catalogFilterBlock">
              <h4>{t.catalog.filters.price}</h4>
              <input
                type="range"
                min="150000"
                max="255000"
                step="5000"
                value={catalogFilters.maxPrice}
                onChange={(event) => onCatalogFilterChange("maxPrice", Number(event.target.value))}
              />
              <p>{`${t.catalog.filters.minPrice}: ${new Intl.NumberFormat(language === "es" ? "es-CO" : "en-US", {
                style: "currency",
                currency: "COP",
                maximumFractionDigits: 0
              }).format(catalogFilters.maxPrice)}`}</p>
            </div>

            <div className="catalogFilterBlock">
              <h4>{t.catalog.filters.rooms}</h4>
              <div className="catalogRoomsSelect" ref={roomsRef}>
                <button
                  className="catalogRoomsTrigger"
                  type="button"
                  onClick={() => setIsRoomsOpen((prev) => !prev)}
                  aria-expanded={isRoomsOpen}
                  aria-haspopup="listbox"
                >
                  <span>{selectedRoomLabel}</span>
                  <span className={`catalogRoomsChevron ${isRoomsOpen ? "open" : ""}`}>⌄</span>
                </button>

                {isRoomsOpen && (
                  <div className="catalogRoomsMenu" role="listbox">
                    {roomOptions.map((option) => (
                      <button
                        key={option.value}
                        className={`catalogRoomsOption ${catalogFilters.minGuests === option.value ? "active" : ""}`}
                        type="button"
                        role="option"
                        aria-selected={catalogFilters.minGuests === option.value}
                        onClick={() => {
                          onCatalogFilterChange("minGuests", option.value);
                          setIsRoomsOpen(false);
                        }}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </aside>

          <div className="catalogGrid">
            {catalogListings.map((listing) => (
              <button
                key={`catalog-${listing.id}`}
                className="catalogCard"
                type="button"
                onClick={() => onSelectListing?.(listing.id)}
              >
                <img src={listing.image} alt={listing.title} />
                <div className="catalogCardContent">
                  <h3>{listing.title}</h3>
                  <p className="catalogCardLocation">{listing.location}</p>
                  <div className="catalogCardFooter">
                    <span>{formatPrice(listing.price)}</span>
                    <span>★ {listing.rating}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CatalogOverlay;
