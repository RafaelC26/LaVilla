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

function HeroDateField({
  id,
  label,
  icon,
  value,
  minValue,
  onApplyDate,
  placeholder,
  language,
  rangeStart,
  rangeEnd
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoverDate, setHoverDate] = useState(null);

  const selectedDate = useMemo(() => isoToDate(value), [value]);
  const minDate = useMemo(() => isoToDate(minValue), [minValue]);
  const rangeStartDate = useMemo(() => isoToDate(rangeStart), [rangeStart]);
  const rangeEndDate = useMemo(() => isoToDate(rangeEnd), [rangeEnd]);

  const monthNames = language === "es"
    ? ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
    : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const yearOptions = useMemo(() => {
    const baseYear = new Date().getFullYear();
    return Array.from({ length: 9 }, (_, index) => baseYear - 2 + index);
  }, []);

  const formatDisplayDate = (rawDate) => {
    if (!rawDate) {
      return null;
    }

    return rawDate.toLocaleDateString(language === "es" ? "es-ES" : "en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };

  const handleOpen = () => {
    setHoverDate(null);
    setIsOpen(true);
  };

  const getRangeBounds = (startDate, endDate) => {
    if (!startDate || !endDate) {
      return null;
    }

    return startDate <= endDate
      ? { rangeMin: startDate, rangeMax: endDate }
      : { rangeMin: endDate, rangeMax: startDate };
  };

  return (
    <div className="searchInputWrapper heroDateField">
      <label htmlFor={id} className="searchFieldLabel">
        {icon}
        <span>{label}</span>
      </label>
      <DatePicker
        id={id}
        selected={selectedDate}
        onChange={(date) => {
          if (!date) {
            return;
          }

          setHoverDate(null);
          onApplyDate(dateToIso(date));
          setIsOpen(false);
        }}
        minDate={minDate}
        shouldCloseOnSelect
        open={isOpen}
        onClickOutside={() => {
          setHoverDate(null);
          setIsOpen(false);
        }}
        onInputClick={handleOpen}
        onCalendarClose={() => setHoverDate(null)}
        onDayMouseEnter={(date) => {
          if (rangeStartDate && !rangeEndDate) {
            setHoverDate(date);
          }
        }}
        popperPlacement="bottom-start"
        popperClassName="heroDatePickerPopper"
        calendarClassName="heroDatePickerCalendar"
        formatWeekDay={(weekday) => weekday.slice(0, 1).toUpperCase()}
        customInput={(
          <button
            className="calendarTrigger"
            type="button"
            aria-label={label}
            onClick={handleOpen}
          >
            {formatDisplayDate(selectedDate) || placeholder}
          </button>
        )}
        dayClassName={(date) => {
          const committedBounds = getRangeBounds(rangeStartDate, rangeEndDate);
          const previewBounds = !rangeEndDate ? getRangeBounds(rangeStartDate, hoverDate) : null;
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
          const committedBounds = getRangeBounds(rangeStartDate, rangeEndDate);
          const previewBounds = !rangeEndDate ? getRangeBounds(rangeStartDate, hoverDate) : null;
          const activeBounds = committedBounds || previewBounds;
          const isInRange = Boolean(
            activeBounds
            && date >= activeBounds.rangeMin
            && date <= activeBounds.rangeMax
          );
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
    </div>
  );
}

function HeroLocationField({ t, locationValue, locations, onChangeLocation }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const uniqueLocations = useMemo(() => {
    return [...new Set(locations || [])];
  }, [locations]);

  const filteredLocations = useMemo(() => {
    if (!locationValue) return uniqueLocations;
    const term = locationValue.toLowerCase();
    return uniqueLocations.filter(loc => loc.toLowerCase().includes(term));
  }, [uniqueLocations, locationValue]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div className="searchInputWrapper heroLocationField" ref={containerRef}>
      <label htmlFor="hero-location" className="searchFieldLabel">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor"/>
        </svg>
        <span>{t.hero.location}</span>
      </label>
      <input
        id="hero-location"
        className="heroLocationInput"
        type="text"
        autoComplete="off"
        value={locationValue}
        onFocus={() => setIsOpen(true)}
        onChange={(event) => {
          onChangeLocation?.(event.target.value);
          setIsOpen(true);
        }}
        placeholder={t.hero.locationPlaceholder}
      />
      {isOpen && filteredLocations.length > 0 && (
        <div className="heroLocationMenu" role="listbox">
          {filteredLocations.map((loc) => (
            <button
              key={loc}
              type="button"
              className="heroLocationOption"
              onClick={() => {
                onChangeLocation?.(loc);
                setIsOpen(false);
              }}
            >
              {loc}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function HeroGuestsField({ t, guestsValue, onChangeGuests }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const handleGuestsInput = (rawValue) => {
    const digitsOnly = rawValue.replace(/\D/g, "").slice(0, 2);
    onChangeGuests?.(digitsOnly);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, []);

  return (
    <div className="searchInputWrapper heroGuestsField" ref={containerRef}>
      <label htmlFor="hero-guests-trigger" className="searchFieldLabel">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M16 11C17.6569 11 19 9.65685 19 8C19 6.34315 17.6569 5 16 5C14.3431 5 13 6.34315 13 8C13 9.65685 14.3431 11 16 11Z" stroke="currentColor" strokeWidth="2"/>
          <path d="M8 11C9.65685 11 11 9.65685 11 8C11 6.34315 9.65685 5 8 5C6.34315 5 5 6.34315 5 8C5 9.65685 6.34315 11 8 11Z" stroke="currentColor" strokeWidth="2"/>
          <path d="M8 13C5.23858 13 3 15.2386 3 18V19H13V18C13 15.2386 10.7614 13 8 13Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
          <path d="M16 13C15.1074 13 14.2717 13.2404 13.5532 13.6608C14.4558 14.782 15 16.206 15 17.7576V19H21V18C21 15.2386 18.7614 13 16 13Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        </svg>
        <span>{t.hero.guestsLabel}</span>
      </label>

      <input
        id="hero-guests-trigger"
        type="text"
        className={`heroGuestsTrigger ${isOpen ? "open" : ""}`}
        inputMode="numeric"
        pattern="[0-9]*"
        value={guestsValue}
        placeholder={t.hero.guestsPlaceholder}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onFocus={() => setIsOpen(true)}
        onClick={() => setIsOpen(true)}
        onChange={(event) => handleGuestsInput(event.target.value)}
      />

      {isOpen && (
        <div className="heroGuestsMenu" role="listbox" aria-label={t.hero.guestsLabel}>
          <button
            type="button"
            className={`heroGuestsOption ${guestsValue === "" ? "active" : ""}`}
            role="option"
            aria-selected={guestsValue === ""}
            onClick={() => {
              onChangeGuests?.("");
              setIsOpen(false);
            }}
          >
            {t.hero.guestsPlaceholder}
          </button>
          {Array.from({ length: 10 }, (_, index) => {
            const value = String(index + 1);
            return (
              <button
                key={value}
                type="button"
                className={`heroGuestsOption ${guestsValue === value ? "active" : ""}`}
                role="option"
                aria-selected={guestsValue === value}
                onClick={() => {
                  onChangeGuests?.(value);
                  setIsOpen(false);
                }}
              >
                {value}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function HeroSection({
  t,
  language,
  locationValue,
  guestsValue,
  checkInDate,
  checkOutDate,
  minCheckIn,
  minCheckOut,
  availabilityResult,
  onChangeLocation,
  onChangeGuests,
  onChangeCheckIn,
  onChangeCheckOut,
  onCheckAvailability,
  onShowListings,
  locations
}) {
  const [isAvailabilityModalOpen, setIsAvailabilityModalOpen] = useState(false);

  useEffect(() => {
    if (availabilityResult) {
      setIsAvailabilityModalOpen(true);
    }
  }, [availabilityResult]);

  const closeAvailabilityModal = () => {
    setIsAvailabilityModalOpen(false);
  };

  const scrollToListings = () => {
    const target = document.querySelector("#listings");
    if (target) {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      target.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start"
      });
    }
  };

  return (
    <section id="hero" className="hero">
      <div className="heroOverlay" />
      <div className="heroContent">
        <h1 className="heroTitle">{t.hero.title}</h1>
        <p className="heroSubtitle">{t.hero.subtitle}</p>

        <div className="heroActions">
          <button type="button" className="heroBtnPremium primary" onClick={scrollToListings}>
            <span className="btnText">{t.hero.viewStaysBtn}</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="btnIcon">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>

  );
}

export default HeroSection;
