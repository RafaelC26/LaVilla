import { addDays, differenceInCalendarDays } from "date-fns";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { useNavigate, useParams } from "react-router-dom";
import anfitrionImg from "../assets/Anfitrion.png";
import { getOptimizedImageUrl } from "../imageUtils";
import MapModal from "./MapModal";
import MapView from "./MapView";
import PropertyGallery from "./PropertyGallery";
import WhatsAppReservationForm from "./WhatsAppReservationForm";

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

const getFactIcon = (iconName) => {
  switch (iconName) {
    case 'work': return <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM10 4h4v2h-4V4zm10 16H4V8h16v12z" /></svg>;
    case 'skill': return <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M7.5 5.6L10 7L8.6 4.5L10 2L7.5 3.4L5 2L6.4 4.5L5 7L7.5 5.6ZM19.5 15.4L17 14L18.4 16.5L17 19L19.5 17.6L22 19L20.6 16.5L22 14L19.5 15.4ZM22 2L20.6 4.5L22 7L19.5 5.6L17 7L18.4 4.5L17 2L19.5 3.4L22 2ZM13.38 6.38L2.38 17.38C1.88 17.88 1.88 18.66 2.38 19.16L4.84 21.62C5.34 22.12 6.12 22.12 6.62 21.62L17.62 10.62C18.12 10.12 18.12 9.34 17.62 8.84L15.16 6.38C14.66 5.88 13.88 5.88 13.38 6.38ZM15.1 11.06L12.94 8.9L14.35 7.49L16.51 9.65L15.1 11.06V11.06Z" /></svg>;
    case 'star': return <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>;
    case 'pet': return <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M4.5 11c1.38 0 2.5-1.12 2.5-2.5S5.88 6 4.5 6 2 7.12 2 8.5 3.12 11 4.5 11zM7 16c1.38 0 2.5-1.12 2.5-2.5S8.38 11 7 11s-2.5 1.12-2.5 2.5S5.62 16 7 16zm10-5c1.38 0 2.5-1.12 2.5-2.5S18.38 6 17 6s-2.5 1.12-2.5 2.5S15.62 11 17 11zm2.5 2.5c0-1.38-1.12-2.5-2.5-2.5s-2.5 1.12-2.5 2.5 1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5zM12 13c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" /></svg>;
    case 'time': return <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" /></svg>;
    case 'music': return <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" /></svg>;
    case 'love': return <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>;
    case 'language': return <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.91-4.33-3.56zm2.95-8H5.08c.96-1.65 2.49-2.93 4.33-3.56-.6 1.11-1.06 2.31-1.38 3.56zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.34.16-2h4.68c.09.66.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.24 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49-2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z" /></svg>;
    case 'location': return <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>;
    default: return null;
  }
};

const getAmenityIcon = (amenityStr) => {
  const lower = amenityStr.toLowerCase();
  const IconWrapper = ({ children }) => (
    <div className="amenityIconWrap">
      {children}
    </div>
  );

  if (lower.includes('wifi') || lower.includes('internet')) {
    return <IconWrapper><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0114.08 0M1.42 9a16 16 0 0121.16 0M8.53 16.11a6 6 0 016.95 0M12 20h.01" /></svg></IconWrapper>;
  }
  if (lower.includes('chimenea') || lower.includes('fuego')) {
    return <IconWrapper><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 10c0 4-4 3-4 8 0 2 1.5 3 4 3s4-1 4-3c0-5-4-4-4-8z" /><path d="M12 4c0 6-5 6-5 12 0 1 1 2 2 2 3 0 5-2 6-5 1-4-2-6-3-9z" /><path d="M16 8c0 5-4 5-4 10 0 1.5 1 2 2 2s4-1 4-3c0-6-6-6-2-9z" /></svg></IconWrapper>;
  }
  if (lower.includes('lago') || lower.includes('vista') || lower.includes('exterior')) {
    return <IconWrapper><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg></IconWrapper>;
  }
  if (lower.includes('cocina')) {
    return <IconWrapper><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 10H7M17 14H7" /></svg></IconWrapper>;
  }
  if (lower.includes('parqueadero') || lower.includes('estacionamiento')) {
    return <IconWrapper><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M9 17V7h4a3 3 0 010 6H9" /></svg></IconWrapper>;
  }
  if (lower.includes('tv') || lower.includes('televisión')) {
    return <IconWrapper><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="15" rx="2" ry="2" /><polyline points="17 2 12 7 7 2" /></svg></IconWrapper>;
  }
  if (lower.includes('zona de trabajo') || lower.includes('oficina')) {
    return <IconWrapper><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg></IconWrapper>;
  }
  // Default checkmark
  return <IconWrapper><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg></IconWrapper>;
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
      return language === "es" ? "Seleccionar fechas" : "Select dates";
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
  const [showAllDesc1, setShowAllDesc1] = useState(false);
  const [showAllDesc2, setShowAllDesc2] = useState(false);
  const [activeHostChatKey, setActiveHostChatKey] = useState("primary");
  const [hostChatDraft, setHostChatDraft] = useState("");
  const [isWhatsAppDialogOpen, setIsWhatsAppDialogOpen] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isImageLightboxOpen, setIsImageLightboxOpen] = useState(false);
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0);
  const [focusHostAboutOnOpen, setFocusHostAboutOnOpen] = useState(false);
  const [highlightHostAbout, setHighlightHostAbout] = useState(false);
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
  const hostAboutSectionRef = useRef(null);
  const hostAboutHighlightTimeoutRef = useRef(null);

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

  const detailImages = listing.images || [];

  const optimizedDetailHeroImages = useMemo(
    () => detailImages.map((image) => getOptimizedImageUrl(image.url || image, { width: 1400, height: 850, quality: 68 })),
    [detailImages]
  );

  const optimizedDetailThumbImages = useMemo(
    () => detailImages.map((image) => getOptimizedImageUrl(image.url || image, { width: 360, height: 220, quality: 62 })),
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

  const nextLightboxImage = () => {
    setLightboxImageIndex((prev) => (prev + 1) % detailImages.length);
  };

  const prevLightboxImage = () => {
    setLightboxImageIndex((prev) => (prev - 1 + detailImages.length) % detailImages.length);
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
    setFocusHostAboutOnOpen(false);
  };

  const openHostDialog = () => {
    setFocusHostAboutOnOpen(false);
    setIsHostDialogOpen(true);
  };

  const focusAndHighlightHostAbout = useCallback(() => {
    hostAboutSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setHighlightHostAbout(true);

    if (hostAboutHighlightTimeoutRef.current) {
      clearTimeout(hostAboutHighlightTimeoutRef.current);
    }

    hostAboutHighlightTimeoutRef.current = setTimeout(() => {
      setHighlightHostAbout(false);
    }, 1400);
  }, []);

  const openHostDialogAbout = () => {
    if (isHostDialogOpen) {
      focusAndHighlightHostAbout();
      return;
    }

    setFocusHostAboutOnOpen(true);
    setIsHostDialogOpen(true);
  };

  useEffect(() => {
    if (!isHostDialogOpen || !focusHostAboutOnOpen) {
      return;
    }

    const frameId = requestAnimationFrame(() => {
      focusAndHighlightHostAbout();
      setFocusHostAboutOnOpen(false);
    });

    return () => cancelAnimationFrame(frameId);
  }, [isHostDialogOpen, focusAndHighlightHostAbout, focusHostAboutOnOpen]);

  useEffect(() => () => {
    if (hostAboutHighlightTimeoutRef.current) {
      clearTimeout(hostAboutHighlightTimeoutRef.current);
    }
  }, []);

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
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '16px', width: '16px', fill: 'currentcolor' }}>
                    <path fillRule="evenodd" d="M3 11h2v-2H3v2zm4 0h2v-2H7v2zm4 0h2v-2h-2v2zm-8-4h2V5H3v2zm4 0h2V5H7v2zm4 0h2V5h-2v2z" />
                  </svg>
                  <span>{language === 'es' ? 'Mostrar todas las fotos' : 'Show all photos'}</span>
                </div>
              </div>

              <div className="detailThumbCol">
                {detailImages.slice(1, 5).map((image, index) => (
                  <button
                    key={image.url || image + index}
                    className={`detailThumbBtn ${index + 1 === activeImageIndex ? "active" : ""}`}
                    type="button"
                    onClick={() => setActiveImageIndex(index + 1)}
                  >
                    <img src={optimizedDetailThumbImages[index + 1]} alt={listing.title} className="detailThumb" loading="lazy" decoding="async" />
                    {index === 3 && (
                      <span
                        className="galleryShowAllBtn"
                        onClick={(e) => {
                          e.stopPropagation();
                          setLightboxImageIndex(0);
                          setIsImageLightboxOpen(true);
                        }}
                      >
                        {language === "es" ? "Mostrar todas las fotos" : "Show all photos"}
                      </span>
                    )}
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
                  const desc = `🏡 <strong>Acerca de este espacio</strong><br>Hermosa casa privada con zona verde y parqueadero, rodeada de cerca viva que brinda privacidad y una agradable sensación campestre. Ubicada a la entrada de Sogamoso a solo 5 minutos del centro y 10 minutos de Tibasosa o Nobsa. Espacio acogedor, ideal para descanso, viajes de trabajo o estudio. Sus ambientes luminosos y zona exterior ofrecen comodidad y tranquilidad después de una jornada laboral o un día de turismo. Perfecta para parejas y familias. Ubicada en condominio tranquilo y seguro.<br><br>🏡 <strong>Refugio La Villa – Boyacá</strong><br><br>✨ <strong>Lo que encontrarás</strong><br><br>🚗 <strong>Comodidades principales</strong><br>• Parqueadero privado al ingreso de la casa<br>• Internet de alta velocidad con fibra óptica<br>• Smart TV<br><br>🍳 <strong>Zona social y cocina</strong><br>• Cocina totalmente equipada con electrodomésticos menores<br>• Sala y comedor amplios con excelente iluminación natural<br>• Conexión directa a zona exterior privada (Patio Trasero)<br><br>🛏 <strong>Habitaciones</strong><br>• 3 habitaciones amplias con cama doble cada una<br>• Colchones ortopédicos y ropa de cama de alta calidad<br>• Clósets amplios y persianas blackout<br><br>🚿 <strong>Baños</strong><br>• 2 baños completos (incluyendo baño privado en principal)<br>• Calentador de agua a gas<br><br>🌿 <strong>Exterior y entorno</strong><br>• Zona verde privada ideal para desayunos o café al aire libre<br>• Condominio con seguridad 24/7 y senderos peatonales<br>• Zona comercial a pasos con tiendas, restaurantes y gimnasio<br><br>Un refugio pensado para quienes buscan confort, privacidad y una estadía tranquila en Boyacá.`;
                  const shortDesc = desc.split('<br>').slice(0, 2).join(' ');
                  return (
                    <>
                      <p dangerouslySetInnerHTML={{ __html: showAllDesc1 ? desc : shortDesc }} />
                      <button
                        className="detailDescToggleBtn"
                        type="button"
                        onClick={() => setShowAllDesc1((prev) => !prev)}
                        style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}
                      >
                        {showAllDesc1 ? 'Mostrar menos' : 'Mostrar más'}
                        <span style={{ fontSize: '18px', transform: showAllDesc1 ? 'rotate(180deg)' : 'none' }}>▼</span>
                      </button>
                    </>
                  );
                })()
              ) : listing.id === 2 ? (
                (() => {
                  const desc = `Acerca de este espacio<br>Dúplex moderno de 80 m² en el centro de Sogamoso, cerca de la Plaza de la Villa y la Plaza 6 de Septiembre. Totalmente equipado, combina diseño contemporáneo y esencia local. Ubicado en el corazón de la ciudad, es un lugar muy tranquilo, ideal para descansar o trabajar. Cuenta con cocina equipada, luz natural y todos los servicios para una estadía cómoda.<br>Perfecto para explorar la ciudad caminando, disfrutar su historia y relajarte en un espacio amplio y acogedor.<br><br>El espacio<br>Cuenta con estacionamiento privado y en su interior espacios amplios y luminosos, cocina equipada, Wi-Fi, Smart TV y todas las comodidades necesarias para una estadía placentera, ya sea de trabajo o descanso. Sus tres habitaciones bien distribuidas ofrecen descanso ideal para familias, parejas o grupos pequeños.<br><br>Acceso de los huéspedes<br>Estacionamiento privado`;
                  const shortDesc = desc.split('<br>').slice(0, 2).join(' ');
                  return (
                    <>
                      <p dangerouslySetInnerHTML={{ __html: showAllDesc2 ? desc : shortDesc }} />
                      <button
                        className="detailDescToggleBtn"
                        type="button"
                        onClick={() => setShowAllDesc2((prev) => !prev)}
                        style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}
                      >
                        {showAllDesc2 ? 'Mostrar menos' : 'Mostrar más'}
                        <span style={{ fontSize: '18px', transform: showAllDesc2 ? 'rotate(180deg)' : 'none' }}>▼</span>
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
              <div className="detailAvailabilitySection">
                <div className="detailCalendarCard">
                  <div className="detailCalendarSummary">
                    <div className="detailCalendarSummaryItem">
                      <span className="detailCalendarSummaryLabel">{language === "es" ? "Llegada" : "Check-in"}</span>
                      <strong>
                        {checkInDate
                          ? checkInDate.toLocaleDateString(language === "es" ? "es-CO" : "en-US")
                          : (language === "es" ? "Selecciona fecha" : "Select date")}
                      </strong>
                    </div>
                    <div className="detailCalendarSummaryItem">
                      <span className="detailCalendarSummaryLabel">{language === "es" ? "Salida" : "Check-out"}</span>
                      <strong>
                        {checkOutDate
                          ? checkOutDate.toLocaleDateString(language === "es" ? "es-CO" : "en-US")
                          : (language === "es" ? "Selecciona fecha" : "Select date")}
                      </strong>
                    </div>
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
                  <p className="calendarHint">{t.detail.chooseDates}</p>
                </div>
              </div>
            )}

            {activeTab === "details" && (
              <>
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
                    const reviews = listing.reviewsList || [];
                    if (reviews.length === 0) {
                      return (
                        <div className="reviewEmptyState">
                          <p>{language === 'es' ? 'Este alojamiento es nuevo, ¡sé el primero en reseñarlo!' : 'This listing is new – be the first to review it!'}</p>
                        </div>
                      );
                    }
                    return reviews.map((review) => (
                      <article key={review.id} className="reviewCard">
                        <div className="reviewCardHead">
                          <div className="reviewCardAvatar">
                            {review.avatar
                              ? <img src={review.avatar} alt={review.author} className="reviewCardAvatarImg" />
                              : <div className="reviewCardAvatarInitial">{review.author.charAt(0).toUpperCase()}</div>
                            }
                          </div>
                          <div className="reviewCardInfo">
                            <strong>{review.author}</strong>
                            <span className="reviewCardLocation">{review.location}</span>
                            <span className="reviewCardDate">{review.date}{review.context ? ` · ${review.context}` : ''}</span>
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
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
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
                    {language === 'es' ? '' : 'Weekly discount applied (10%)'}
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
              {listing.airbnbLink && (
                <a
                  href={listing.airbnbLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="detailReserveBtn detailAirbnbBtn"
                  style={{
                    marginTop: "12px",
                    backgroundColor: "#FF5A5F",
                    backgroundImage: "none",
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textDecoration: "none"
                  }}
                >
                  <svg viewBox="0 0 32 32" style={{ fill: 'currentColor', height: '18px', width: '18px', marginRight: '8px' }} aria-hidden="true" focusable="false" ><path d="M16 1.98l-7.23 7.22a9.01 9.01 0 0 0-2.61 6.55A8.91 8.91 0 0 0 14.86 24.6a6.56 6.56 0 0 1-1.4 1.5l-4.7 4.7 1.42 1.41 4.7-4.7a8.55 8.55 0 0 0 4.14-5.63A8.91 8.91 0 0 0 25.84 15.75c0-2.45-.96-4.75-2.61-6.55zM16 22.18c-2.4 0-4.63-1.63-5.59-4.2a6.93 6.93 0 0 1 1.76-7.39l3.83-3.83 3.83 3.83a6.93 6.93 0 0 1 1.76 7.39c-.96 2.57-3.19 4.2-5.59 4.2zM16 12a3.5 3.5 0 0 0 0 7 3.5 3.5 0 0 0 0-7z"></path></svg>
                  {t.detail.airbnbLink || 'Ver en Airbnb'}
                </a>
              )}
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
                  <img src={listing.hostImage || hostDialog.image} alt={hostDialog.name} className="hostMiniAvatar" />
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
                  <span className="statIcon" style={{ color: '#fbbf24' }}>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                  </span>
                  <span>{listing.rating}</span>
                </div>
                <div className="hostCardStat">
                  <span className="statIcon" style={{ color: '#10b981' }}>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                  </span>
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
                  onClick={openHostDialogAbout}
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
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
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
            className="hostPremiumDialog"
            role="dialog"
            aria-modal="true"
            aria-label={t.experiences.name}
            onClick={(event) => event.stopPropagation()}
          >
            <button className="hostDialogClose" onClick={closeHostDialog}>×</button>

            <div className="hostDialogLayout">
              {/* Left Side: Summary & Trust */}
              <div className="hostDialogLeft">
                <div className="hostDialogProfileCard">
                  <div className="hostDialogImageWrapper">
                    <img src={anfitrionImg} alt={t.experiences.name} className="hostDialogImg" />
                    <span className="hostDialogBadgeIcon">
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 2L15.09 8.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                    </span>
                  </div>
                  <div className="hostDialogIntro">
                    <h3>{t.experiences.name} <span className="verifiedCheck">✓</span></h3>
                    <p className="hostDialogRole">{t.experiences.role}</p>
                  </div>

                  <div className="hostDialogStatsRow">
                    <div className="hostDialogStat">
                      <span className="val">{t.experiences.stats.reviews}</span>
                      <span className="lab">{t.experiences.stats.reviewsLabel}</span>
                    </div>
                    <div className="hostDialogStat">
                      <span className="val">{t.experiences.stats.rating} ★</span>
                      <span className="lab">{t.experiences.stats.ratingLabel}</span>
                    </div>
                    <div className="hostDialogStat">
                      <span className="val">{t.experiences.stats.months}</span>
                      <span className="lab">{t.experiences.stats.monthsLabel}</span>
                    </div>
                    <div className="hostDialogStat">
                      <span className="val">{t.experiences.stats.properties}</span>
                      <span className="lab">{t.experiences.stats.propertiesLabel}</span>
                    </div>
                  </div>
                </div>

                <div className="hostDialogTrustArea">
                  <div className="trustHighlightCard">
                    <div className="trustIcon">🛡️</div>
                    <div className="trustText">
                      <strong>{language === 'es' ? 'Identidad verificada' : 'Verified identity'}</strong>
                      <span>{language === 'es' ? 'Proceso completado con éxito' : 'Successfully verified'}</span>
                    </div>
                  </div>
                  <div className="trustHighlightsList">
                    {t.experiences.trustHighlights.map((th, i) => (
                      <div key={i} className="trustListItem">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
                        <span>{th}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Side: Narrative & Facts */}
              <div className="hostDialogRight">
                <div
                  className={`hostDialogNarrative ${highlightHostAbout ? "hostAboutHighlight" : ""}`}
                  ref={hostAboutSectionRef}
                >
                  <span className="narrativeTag">{t.experiences.tag}</span>
                  <h2 className="narrativeTitle">{t.experiences.title}</h2>
                  <p className="narrativeBio">{t.experiences.bio}</p>
                </div>

                <div className="hostDialogFacts">
                  <h4>{language === 'es' ? 'Sobre mí' : 'My facts'}</h4>
                  <div className="factsGridSmall">
                    {t.experiences.personalFacts.map((fact, idx) => (
                      <div key={idx} className="factDialogItem">
                        <span className="fIcon">{getFactIcon(fact.icon)}</span>
                        <span className="fText">{fact.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="hostDialogFooter">
                  <button
                    className="hostDialogContactBtn"
                    onClick={() => {
                      setIsHostDialogOpen(false);
                      const whatsappUrl = `https://wa.me/573100000000?text=${encodeURIComponent('Hola Andrés, me gustaría obtener más información sobre tus propiedades.')}`;
                      window.open(whatsappUrl, '_blank');
                    }}
                  >
                    {hostDialog.contactButton}
                  </button>
                </div>
              </div>
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

      {/* Image Lightbox - Airbnb Style Recorrido Fotográfico */}
      {isImageLightboxOpen && (
        <div className="airbnbPhotoModal" onClick={() => setIsImageLightboxOpen(false)}>
          <div className="airbnbPhotoModalHeader" onClick={(e) => e.stopPropagation()}>
            <button className="airbnbPhotoModalClose" onClick={() => setIsImageLightboxOpen(false)} aria-label="Close photo tour">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            <div className="airbnbPhotoModalNav">
              <span className="airbnbPhotoModalNavTab active">{language === 'es' ? 'Recorrido fotográfico' : 'Photo tour'}</span>
            </div>
            <div className="airbnbPhotoModalActions">
              <button className="airbnbPhotoModalActionBtn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13" /></svg>
                {language === 'es' ? 'Compartir' : 'Share'}
              </button>
              <button className="airbnbPhotoModalActionBtn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
                {language === 'es' ? 'Guardar' : 'Save'}
              </button>
            </div>
          </div>

          <div className="airbnbPhotoModalContent" onClick={(e) => e.stopPropagation()}>
            {(() => {
              // Group images by title to avoid repeating sections
              const sections = detailImages.reduce((acc, img, idx) => {
                const title = img.title || (language === 'es' ? 'Otros' : 'Other');
                if (!acc[title]) acc[title] = [];
                acc[title].push({ ...img, originalIdx: idx });
                return acc;
              }, {});

              return Object.entries(sections).map(([title, images]) => (
                <div key={title} className="airbnbPhotoModalSection">
                  <h2 className="airbnbPhotoModalSectionTitle">{title}</h2>
                  <div className="airbnbPhotoModalGrid">
                    {images.map((img, idx) => {
                      // Logic for advanced mosaic:
                      // - First image is hero if there's more than 1 image or it's alone
                      // - If 3 images: 1 hero, then 2 smaller ones below (default grid handles this)
                      // - If even: hero might be first 2? No, let's stick to 1 hero and then the rest.
                      const isHero = idx === 0;

                      return (
                        <div key={img.originalIdx} className={`airbnbPhotoModalItem ${isHero ? 'mosaic-hero' : ''}`}>
                          <div className="airbnbPhotoModalImageWrapper">
                            <img
                              src={optimizedDetailHeroImages[img.originalIdx]}
                              alt={img.caption || title}
                              className="airbnbPhotoModalImage"
                              loading="lazy"
                            />
                          </div>
                          {img.caption && (
                            <div className="airbnbPhotoModalItemInfo">
                              <p className="airbnbPhotoModalItemCaption">{img.caption}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ));
            })()}
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
