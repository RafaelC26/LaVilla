import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

function HostProfilePage({ t, listings, logoImg }) {
  const navigate = useNavigate();
  const { hostId } = useParams();

  const host = useMemo(() => {
    const fallback = {
      id: hostId || "andres",
      name: t.detail.hostName,
      badge: t.detail.hostBadge,
      since: t.detail.hostSince,
      bio: t.detail.hostBio,
      image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=320&h=320&fit=crop&crop=face"
    };

    const seedListing = listings[0];
    if (!seedListing) {
      return fallback;
    }

    return {
      ...fallback,
      specialties: [t.detail.hostSpecialtyOne, t.detail.hostSpecialtyTwo, t.detail.hostSpecialtyThree],
      rating: 4.9,
      reviews: 132
    };
  }, [hostId, listings, t]);

  return (
    <div className="detailPage">
      <div className="detailTopBar">
        <button className="catalogBrand" type="button" onClick={() => navigate(-1)}>
          <div className="logo catalogLogo">
            <img src={logoImg} alt="Horizon Stays" className="logoImg" />
          </div>
        </button>
      </div>

      <div className="detailContent">
        <div className="hostBreadcrumbRow">
          <button className="catalogClose" type="button" onClick={() => navigate(-1)} aria-label={t.profileDashboard.nav.backLabel}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M14.5 6.5L9 12L14.5 17.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <p className="detailBreadcrumb hostBreadcrumbText">{`${t.detail.breadcrumbPrefix} / ${t.detail.hostProfileTitle}`}</p>
        </div>
        <div className="hostProfileCard">
          <img src={host.image} alt={host.name} className="hostProfileImage" />
          <div>
            <h1>{host.name}</h1>
            <p>{host.badge}</p>
            <p>{host.since}</p>
            <p>{host.bio}</p>
            <p>{`★ ${host.rating} · ${host.reviews} ${t.detail.reviewWord}`}</p>
            <ul>
              {host.specialties?.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HostProfilePage;
