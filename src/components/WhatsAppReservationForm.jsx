import React, { useState } from "react";

const WhatsAppReservationForm = ({ t, language, listing, checkInDate, checkOutDate, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    guests: "2",
    comments: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const calculateTotal = () => {
    if (!checkInDate || !checkOutDate) return null;
    const start = new Date(checkInDate);
    const end = new Date(checkOutDate);
    const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    if (nights <= 0) return null;
    
    const pricePerNight = parseInt(listing.price.replace(/\D/g, ""));
    const total = pricePerNight * nights;
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0
    }).format(total);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const totalStr = calculateTotal() || listing.price;
    const formatDate = (date) => {
      if (!date) return "---";
      const d = new Date(date);
      return d.toLocaleDateString(language === "es" ? "es-ES" : "en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      });
    };

    const dateRange = checkInDate && checkOutDate 
      ? `${formatDate(checkInDate)} / ${formatDate(checkOutDate)}`
      : "Fechas a convenir";

    const messageTemplate = t.waReservation.whatsappMessage;
    const finalMessage = messageTemplate
      .replace("{listing}", listing.title)
      .replace("{dates}", dateRange)
      .replace("{guests}", formData.guests)
      .replace("{total}", totalStr)
      .replace("{name}", formData.name)
      .replace("{comments}", formData.comments ? `\n*Nota:* ${formData.comments}` : "");

    const encodedMessage = encodeURIComponent(finalMessage);
    // Using a sample host number, in a real app this would come from the listing or config
    const whatsappUrl = `https://wa.me/573100000000?text=${encodedMessage}`;
    
    window.open(whatsappUrl, "_blank");
    onClose();
  };

  return (
    <div className="wa-reservation-overlay" onClick={onClose}>
      <div className="wa-reservation-modal" onClick={(e) => e.stopPropagation()}>
        <button className="wa-close-btn" onClick={onClose}>×</button>
        
        <div className="wa-modal-header">
          <span className="wa-badge">{t.waReservation.badge}</span>
          <h2>{t.waReservation.title}</h2>
          <p>{t.waReservation.subtitle}</p>
        </div>

        <form className="wa-reservation-form" onSubmit={handleSubmit}>
          <div className="wa-form-group">
            <label>{t.waReservation.labels.name}</label>
            <input
              type="text"
              name="name"
              required
              placeholder={t.waReservation.placeholders.name}
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="wa-form-row">
            <div className="wa-form-group">
              <label>{t.waReservation.labels.phone}</label>
              <input
                type="tel"
                name="phone"
                required
                placeholder={t.waReservation.placeholders.phone}
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="wa-form-group">
              <label>{t.waReservation.labels.guests}</label>
              <select name="guests" value={formData.guests} onChange={handleChange}>
                {[1, 2, 3, 4, 5, 6].map(n => (
                  <option key={n} value={n}>{n} {t.detail.guests}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="wa-form-group">
            <label>{t.waReservation.labels.comments}</label>
            <textarea
              name="comments"
              rows="3"
              placeholder={t.waReservation.placeholders.comments}
              value={formData.comments}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="wa-summary-box">
            <div className="wa-summary-item">
              <span>{t.waReservation.summary.stay}:</span>
              <strong>{listing.title}</strong>
            </div>
            <div className="wa-summary-item">
              <span>{t.waReservation.summary.dates}:</span>
              <strong>
                {checkInDate ? checkInDate.toLocaleDateString(language === "en" ? "en-US" : "es-ES", { day: '2-digit', month: 'short' }) : "---"} 
                {" - "} 
                {checkOutDate ? checkOutDate.toLocaleDateString(language === "en" ? "en-US" : "es-ES", { day: '2-digit', month: 'short' }) : "---"}
              </strong>
            </div>
            <div className="wa-summary-item">
              <span>{t.waReservation.summary.total}:</span>
              <strong>{calculateTotal() || t.detail.selectDates}</strong>
            </div>
          </div>

          <button type="submit" className="wa-submit-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.512-2.96-2.626-.087-.114-.694-.925-.694-1.763 0-.839.44-1.25.597-1.42.157-.17.342-.213.456-.213.114 0 .228.001.328.005.105.004.246-.04.385.292.144.344.492 1.2.535 1.287.043.088.072.19.014.307-.058.117-.088.19-.174.29-.088.101-.184.225-.264.303-.092.09-.188.19-.081.374.107.184.477.788 1.025 1.275.707.629 1.303.824 1.487.909.185.086.293.072.401-.053.107-.125.461-.538.585-.72.124-.183.248-.154.417-.092.169.062 1.074.507 1.26.6.186.092.31.138.356.216.046.078.046.452-.098.857z"/>
            </svg>
            {t.waReservation.submit}
          </button>
        </form>
      </div>
    </div>
  );
};

export default WhatsAppReservationForm;
