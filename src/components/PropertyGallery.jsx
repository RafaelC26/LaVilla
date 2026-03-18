import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

export default function PropertyGallery({ images, title, language = 'es' }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  }, []);

  const nextImage = useCallback((e) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback((e) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, closeLightbox, nextImage, prevImage]);

  if (!images || images.length === 0) return null;

  const viewGalleryText = language === 'es' ? 'Ver galeria' : 'View gallery';
  const showAllPhotosText = language === 'es' ? 'Mostrar todas las fotos' : 'Show all photos';
  const imageAlt = language === 'es' ? 'Imagen' : 'Image';
  const ofText = language === 'es' ? 'de' : 'of';

  return (
    <>
      {/* Grid de imágenes */}
      <div className="property-gallery detailGalleryGrid">
        {/* Imagen principal grande */}
        <div 
          className="property-gallery-main detailHeroImageWrap"
          onClick={() => openLightbox(0)}
        >
          <img 
            src={images[0]?.url || images[0]} 
            alt={`${title} - ${imageAlt} 1`}
            className="property-gallery-main-img detailHeroImage"
          />
          <div className="property-gallery-overlay">
            <div className="property-gallery-zoom">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
                <path d="M11 8v6M8 11h6"/>
              </svg>
              <span>{viewGalleryText}</span>
            </div>
          </div>
        </div>

        {/* Grid de miniaturas */}
        <div className="property-gallery-grid detailThumbCol">
          {images.slice(1, 5).map((img, idx) => (
            <div 
              key={idx}
              className="property-gallery-thumb detailThumbBtn"
              onClick={() => openLightbox(idx + 1)}
            >
              <img 
                src={img.url || img} 
                alt={`${title} - ${imageAlt} ${idx + 2}`}
                className="detailThumb"
              />
              <div className="property-gallery-thumb-overlay">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="M21 21l-4.35-4.35"/>
                  <path d="M11 8v6M8 11h6"/>
                </svg>
              </div>
              {idx === 3 && (
                <button
                  type="button"
                  className="galleryShowAllBtn"
                  onClick={(e) => {
                    e.stopPropagation();
                    openLightbox(0);
                  }}
                >
                  {showAllPhotosText}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox - Premium Carousel Mode */}
      {lightboxOpen && createPortal(
        <div 
          className="property-lightbox-backdrop"
          onClick={closeLightbox}
        >
          <div className="property-lightbox-content carousel-mode" onClick={(e) => e.stopPropagation()}>
            <div className="property-lightbox-header overlay">
              <button className="property-lightbox-close white" onClick={closeLightbox}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="24" height="24">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            <div className="property-lightbox-carousel">
              <button className="carousel-nav-btn prev-btn" onClick={prevImage} aria-label="Previous image">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="24" height="24">
                  <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <div className="carousel-main-stage">
                <img 
                  key={currentImageIndex}
                  src={images[currentImageIndex]?.url || images[currentImageIndex]} 
                  alt={`${title} - ${imageAlt} ${currentImageIndex + 1}`}
                  className="lightbox-carousel-image"
                />
              </div>

              <button className="carousel-nav-btn next-btn" onClick={nextImage} aria-label="Next image">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="24" height="24">
                  <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <div className="carousel-counter">
                {currentImageIndex + 1} / {images.length}
              </div>
            </div>

            {/* Thumbnails at the bottom */}
            <div className="carousel-thumbnails-container">
              <div className="carousel-thumbnails">
                {images.map((img, idx) => (
                  <div 
                    key={idx}
                    className={`thumbnail-item ${idx === currentImageIndex ? 'active' : ''}`}
                    onClick={() => setCurrentImageIndex(idx)}
                  >
                    <img src={img.url || img} alt={`${imageAlt} ${idx + 1}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

