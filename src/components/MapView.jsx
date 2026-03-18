import { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix para los iconos de Leaflet en React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Icono personalizado para La Villa
const villaIcon = L.divIcon({
  className: 'custom-villa-marker',
  html: `
    <div class="villa-marker-container">
      <div class="villa-marker-pin">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      </div>
      <div class="villa-marker-pulse"></div>
    </div>
  `,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40]
});

// Componente para actualizar el centro del mapa
function ChangeView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

export default function MapView({ 
  location, 
  title, 
  coordinates, 
  language = 'es',
  height = '400px',
  showExpandButton = true,
  onExpand,
  t
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [showDirections, setShowDirections] = useState(false);

  // Coordenadas por defecto (Villa de Leyva, Colombia)
  const defaultCoords = [5.6364, -73.5267];
  
  // Si se proporcionan coordenadas, usarlas; si no, usar las predeterminadas
  const position = useMemo(() => {
    if (coordinates && coordinates.length === 2) {
      return coordinates;
    }
    return defaultCoords;
  }, [coordinates]);

  const googleMapsDirectionsUrl = useMemo(() => {
    const destination = encodeURIComponent(`${location} ${title || ''}`);
    return `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
  }, [location, title]);

  const wazeUrl = useMemo(() => {
    const destination = encodeURIComponent(`${location} ${title || ''}`);
    return `https://waze.com/ul?q=${destination}`;
  }, [location, title]);

  useEffect(() => {
    // Simular carga del mapa
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const directionsText = language === 'es' ? 'Cómo llegar' : 'Get directions';
  const openMapsText = language === 'es' ? 'Abrir en Maps' : 'Open in Maps';
  const viaGoogleText = language === 'es' ? 'Via Google Maps' : 'Via Google Maps';
  const viaWazeText = language === 'es' ? 'Via Waze' : 'Via Waze';
  const closeText = language === 'es' ? 'Cerrar' : 'Close';

  return (
    <div className="map-view-container" style={{ height }}>
      {isLoading && (
        <div className="map-loading-overlay">
          <div className="map-loading-spinner">
            <div className="spinner-ring"></div>
            <span>{language === 'es' ? 'Cargando mapa...' : 'Loading map...'}</span>
          </div>
        </div>
      )}

      <MapContainer
        center={position}
        zoom={15}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%', borderRadius: '16px' }}
        className="custom-leaflet-map"
      >
        <ChangeView center={position} zoom={15} />
        
        {/* Capa de OpenStreetMap */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Marcador personalizado */}
        <Marker 
          position={position} 
          icon={villaIcon}
          eventHandlers={{
            click: () => setShowDirections(true),
          }}
        >
          <Popup className="custom-popup">
            <div className="map-popup-content">
              <h4>{title || location}</h4>
              <p>{location}</p>
              <div className="map-popup-actions">
                <a 
                  href={googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="map-popup-btn primary"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0121 18.382V7.618a1 1 0 01-.894-.447L15 4m0 13V4m0 0L9 7"/>
                  </svg>
                  {directionsText}
                </a>
              </div>
            </div>
          </Popup>
        </Marker>
      </MapContainer>

      {/* Botón de expandir */}
      {showExpandButton && onExpand && (
        <button 
          className="map-expand-btn"
          onClick={onExpand}
          title={language === 'es' ? 'Ver mapa completo' : 'View full map'}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
          </svg>
        </button>
      )}

      {/* Botón de cómo llegar flotante */}
      <button 
        className="map-directions-float-btn"
        onClick={() => setShowDirections(true)}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0121 18.382V7.618a1 1 0 01-.894-.447L15 4m0 13V4m0 0L9 7"/>
        </svg>
        <span>{directionsText}</span>
      </button>

      {/* Modal de opciones de navegación */}
      {showDirections && (
        <div className="map-directions-modal" onClick={() => setShowDirections(false)}>
          <div className="map-directions-content" onClick={(e) => e.stopPropagation()}>
            <div className="map-directions-header">
              <h3>{directionsText}</h3>
              <button 
                className="map-directions-close"
                onClick={() => setShowDirections(false)}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
            
            <p className="map-directions-location">{title || location}</p>
            
            <div className="map-directions-options">
              <a 
                href={googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="map-direction-option"
              >
                <div className="direction-option-icon google">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <div className="direction-option-info">
                  <strong>Google Maps</strong>
                  <span>{viaGoogleText}</span>
                </div>
                <svg className="direction-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </a>

              <a 
                href={wazeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="map-direction-option"
              >
                <div className="direction-option-icon waze">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                  </svg>
                </div>
                <div className="direction-option-info">
                  <strong>Waze</strong>
                  <span>{viaWazeText}</span>
                </div>
                <svg className="direction-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </a>

              <button 
                className="map-direction-option"
                onClick={() => {
                  navigator.clipboard.writeText(location);
                  alert(language === 'es' ? 'Dirección copiada al portapapeles' : 'Address copied to clipboard');
                }}
              >
                <div className="direction-option-icon copy">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path>
                  </svg>
                </div>
                <div className="direction-option-info">
                  <strong>{language === 'es' ? 'Copiar dirección' : 'Copy address'}</strong>
                  <span>{language === 'es' ? 'Pegar en tu app preferida' : 'Paste in your preferred app'}</span>
                </div>
                <svg className="direction-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>
            </div>

            <button 
              className="map-directions-cancel"
              onClick={() => setShowDirections(false)}
            >
              {closeText}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
