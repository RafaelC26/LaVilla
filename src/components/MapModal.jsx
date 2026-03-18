import { useEffect } from 'react';
import MapView from './MapView';

export default function MapModal({ 
  isOpen, 
  onClose, 
  location, 
  title, 
  coordinates, 
  language = 'es',
  t
}) {
  // Cerrar con ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const closeText = language === 'es' ? 'Cerrar' : 'Close';
  const locationText = language === 'es' ? 'Ubicación' : 'Location';

  return (
    <div className="map-modal-overlay" onClick={onClose}>
      <div className="map-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="map-modal-header">
          <div className="map-modal-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <div>
              <h3>{locationText}</h3>
              <p>{title} - {location}</p>
            </div>
          </div>
          <button className="map-modal-close" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div className="map-modal-body">
          <MapView
            location={location}
            title={title}
            coordinates={coordinates}
            language={language}
            height="100%"
            showExpandButton={false}
            t={t}
          />
        </div>

        <div className="map-modal-footer">
          <p>{language === 'es' ? 'Arrastra para mover • Haz clic en el marcador para opciones de navegación' : 'Drag to move • Click marker for navigation options'}</p>
          <button className="map-modal-close-btn" onClick={onClose}>
            {closeText}
          </button>
        </div>
      </div>
    </div>
  );
}
