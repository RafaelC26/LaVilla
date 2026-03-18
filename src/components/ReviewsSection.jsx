import React, { useState, useRef, useEffect, useCallback } from 'react';

const UserAvatar = ({ gender }) => {
  if (gender === 'female') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="reviewerAvatarSVG">
        <circle cx="12" cy="8" r="4.5" />
        <path d="M12 12.5c-4 0-7 2-7 5.5v1.5h14v-1.5c0-3.5-3-5.5-7-5.5z" strokeLinecap="round" />
        <path d="M8.5 7.5c0-1.5 1.5-3 3.5-3s3.5 1.5 3.5 3" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="reviewerAvatarSVG">
      <circle cx="12" cy="9" r="5" />
      <path d="M12 14c-4.5 0-8 2.5-8 6v1h16v-1c0-3.5-3.5-6-8-6z" strokeLinecap="round" />
    </svg>
  );
};

const ReviewsSection = ({ t }) => {
  const originalReviews = t?.reviews?.items || [];
  // Clone first and last for infinite effect
  const reviews = [
    originalReviews[originalReviews.length - 1],
    ...originalReviews,
    originalReviews[0]
  ];
  
  const duplicatedReviews = [...originalReviews, ...originalReviews, ...originalReviews]; // Triple for seamless looping

  if (originalReviews.length === 0) return null;

  return (
    <section className="reviewsSectionSection" id="reviews">
      <div className="reviewsMaxWidthContainer">
        <div className="reviewsHeaderEnhanced">
          <div className="reviewsTitleGroup">
            <h2 className="reviewsHeadingMain">
              <span className="headingAccentLine" style={{ fontSize: '32px', letterSpacing: '0.4em' }}>{t.reviews.title.split(' ')[0]}</span>
              <span className="headingMainText">{t.reviews.title.substring(t.reviews.title.indexOf(' ')).trim()}</span>
            </h2>
            <div className="reviewStatsBar">
              <div className="statItem">
                <span className="statValue">{t.reviews.overview}</span>
                <span className="statLabel">{t.reviews.overviewLabel || "Total"}</span>
              </div>
              <div className="statDivider" />
              <div className="statItem">
                <span className="statValue">{t.reviews.guestCount}</span>
                <span className="statLabel">{t.reviews.guestsLabel || "Guests"}</span>
              </div>
              <div className="statDivider" />
              <div className="statItem">
                <span className="statValue">{t.reviews.hostCount}</span>
                <span className="statLabel">{t.reviews.hostCountLabel || "Host Reviews"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="reviewsCarouselWrapper">
          {/* Strict infinite auto-carousel */}
          <div className="reviewsViewport">
            <div className="reviewsFlexTrack marquee-track">
              {duplicatedReviews.map((review, idx) => (
                <div key={`${review.id}-${idx}`} className="reviewSlide">
                  <div className="reviewGlassCard">
                    <div className="reviewCardHeader">
                      <div className="reviewerInfo">
                        <div className="avatarPulse">
                          <UserAvatar gender={review.gender} />
                        </div>
                        <div className="reviewerText">
                          <h4 className="reviewerName">{review.name}</h4>
                          <span className="reviewerLoc">{review.location}</span>
                        </div>
                      </div>
                      <div className="reviewRatingStars">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`revStar ${i < review.rating ? 'filled' : ''}`}>★</span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="reviewBodyContent">
                      <p className="reviewTextContent">
                        <span className="quoteSymbol">“</span>
                        {review.comment}
                        <span className="quoteSymbol">”</span>
                      </p>
                    </div>

                    <div className="reviewCardFooter">
                      <span className="reviewTimestamp">{review.date}</span>
                      <div className="verifiedBadge">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                        Verificado
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
    </section>
  );
};

export default ReviewsSection;
