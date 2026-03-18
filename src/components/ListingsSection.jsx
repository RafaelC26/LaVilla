import { useState } from 'react';
import { getOptimizedImageUrl } from "../imageUtils";

function ListingCard({ listing, index, onSelectListing, favoriteListingIds, onToggleFavorite, formatPrice, perNightLabel }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = (listing.images || (listing.image ? [listing.image] : [])).map(
    (img) => (typeof img === 'object' && img !== null ? img.url : img)
  );

  const getSrc = (img, config) => {
    if (typeof img === 'string' && img.startsWith('http')) {
      return getOptimizedImageUrl(img, config);
    }
    return img;
  };

  return (
    <article
      className="listingCard revealRow"
      style={{ "--reveal-delay": `${index * 0.1}s` }}
      role="button"
      tabIndex={0}
      onClick={() => onSelectListing?.(listing.id)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelectListing?.(listing.id);
        }
      }}
    >
      <div className="listingImage">
        <div 
          className="carouselTrack" 
          style={{ 
            display: 'flex', 
            transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)', 
            transform: `translateX(-${currentImageIndex * 100}%)`,
            height: '100%',
            willChange: 'transform'
          }}
        >
          {images.map((img, i) => (
            <img
              key={i}
              src={getSrc(img, { width: 620, height: 410, quality: 70 })}
              alt={`${listing.title} - Foto ${i + 1}`}
              loading={index < 4 && i === 0 ? "eager" : "lazy"}
              decoding="async"
              fetchPriority={index < 2 && i === 0 ? "high" : "auto"}
              style={{ minWidth: '100%', height: '100%', objectFit: 'cover' }}
            />
          ))}
        </div>

        {listing.rating >= 4.8 && (
          <div className="listingBadge">FAVORITO DE LOS HUÉSPEDES</div>
        )}
        
        <button
          className={`favoriteBtn ${favoriteListingIds.includes(listing.id) ? "active" : ""}`}
          type="button"
          aria-label="Guardar alojamiento"
          onClick={(event) => {
            event.stopPropagation();
            onToggleFavorite?.(listing.id);
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor" stroke="white" strokeWidth="2"/>
          </svg>
        </button>

        {images.length > 1 && (
          <>
            <button 
              className="carouselNavBtn prev" 
              onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(prev => Math.max(prev - 1, 0)); }}
              style={{ opacity: currentImageIndex === 0 ? 0 : 1, pointerEvents: currentImageIndex === 0 ? 'none' : 'auto' }}
              aria-label="Anterior foto"
            >
              ❮
            </button>
            <button 
              className="carouselNavBtn next" 
              onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(prev => Math.min(prev + 1, images.length - 1)); }}
              style={{ opacity: currentImageIndex === images.length - 1 ? 0 : 1, pointerEvents: currentImageIndex === images.length - 1 ? 'none' : 'auto' }}
              aria-label="Siguiente foto"
            >
              ❯
            </button>
            <div className="carouselDots">
              {images.map((_, i) => (
                 <span key={i} className={`carouselDot ${i === currentImageIndex ? 'active' : ''}`} />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="listingContent">
        <div className="listingHeaderRow">
          <h4>{listing.location}</h4>
          <span className="listingRating">
             <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '12px', width: '12px', fill: 'currentcolor' }}>
               <path d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z" fillRule="evenodd"></path>
             </svg>
             {listing.rating.toString().length === 1 ? `${listing.rating}.0` : listing.rating}
          </span>
        </div>
        
        <p className="listingTitleSecondary">{listing.title}</p>
        
        <p className="listingBeds">
          {listing.bedrooms || 3} camas
        </p>

        <div className="listingFooter">
           <span className="listingPrice">
             <strong>{formatPrice(listing.price).split('/')[0]}</strong> <span className="listingPriceNight">noche</span>
           </span>
        </div>
      </div>
    </article>
  );
}

function ListingsSection({
  title,
  listings,
  label,
  viewAllText,
  onViewAll,
  perNightLabel,
  onSelectListing,
  favoriteListingIds = [],
  onToggleFavorite
}) {
  const formatPrice = (rawPrice) => {
    const [amount] = rawPrice.split("/");
    return perNightLabel ? `${amount}/${perNightLabel}` : amount;
  };

  return (
    <section id="listings" className="listings">
      {label && <span className="sectionLabel">{label}</span>}

      {(viewAllText && onViewAll) ? (
        <div className="sectionHeader">
          <div>
            <h2 className="sectionTitle premium">{title}</h2>
          </div>
          <button
            type="button"
            className="viewAllBtnPremium"
            onClick={(event) => {
              event.preventDefault();
              onViewAll();
            }}
          >
            <span>{viewAllText}</span>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      ) : (
        <h2 className="sectionTitle premium">{title}</h2>
      )}

      <div className="listingsGrid">
        {listings.map((listing, index) => (
          <ListingCard 
            key={listing.id}
            listing={listing}
            index={index}
            onSelectListing={onSelectListing}
            favoriteListingIds={favoriteListingIds}
            onToggleFavorite={onToggleFavorite}
            formatPrice={formatPrice}
            perNightLabel={perNightLabel}
          />
        ))}
      </div>
    </section>
  );
}

export default ListingsSection;
