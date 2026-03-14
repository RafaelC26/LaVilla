import { useMemo, useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "./Navbar";
import { listings as allListings } from "../data";

function HostDashboardPage({
  t,
  language,
  onToggleLanguage,
  isUserMenuOpen,
  setIsUserMenuOpen,
  userMenuRef,
  logoImg,
  onUserMenuAction,
  listings = [],
  isAuthenticated,
  onAuthAction,
  currentUser
}) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const isSpanish = language === "es";
  const currentSection = searchParams.get("section") || "admin";

  const [statusMessage, setStatusMessage] = useState(null);
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [hostListings, setHostListings] = useState(listings?.length > 0 ? listings : allListings);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editListing, setEditListing] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 900);

  const showStatus = (msg) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const setSection = (section) => {
    const params = new URLSearchParams(searchParams);
    params.set("section", section);
    setSearchParams(params, { replace: true });
  };

  const footerRightsText = isSpanish
    ? "® La Villa. Todos los derechos reservados."
    : "® La Villa. All rights reserved.";
  const footerCreditPrefix = isSpanish ? "Experiencia Digital por " : "Digital experience by ";

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth > 900);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const dashboardStats = useMemo(() => {
    const totalListings = hostListings.length;
    const occupancy = "82%";
    const income = isSpanish ? "$14.8M COP" : "$14.8M COP";

    return [
      { key: "listings", label: isSpanish ? "Alojamientos activos" : "Active listings", value: String(totalListings) },
      { key: "occupancy", label: isSpanish ? "Ocupacion mensual" : "Monthly occupancy", value: occupancy },
      { key: "income", label: isSpanish ? "Ingresos estimados" : "Estimated revenue", value: income }
    ];
  }, [hostListings.length, isSpanish]);

  const reservations = useMemo(
    () => [
      {
        id: "res-1",
        guest: "Sofia Martinez",
        stay: isSpanish ? "Cabana Bosque Azul" : "Bosque Azul Cabin",
        date: isSpanish ? "20 - 23 marzo" : "Mar 20 - Mar 23",
        status: isSpanish ? "Confirmada" : "Confirmed"
      },
      {
        id: "res-2",
        guest: "Daniel Perez",
        stay: isSpanish ? "Loft Rio Claro" : "Rio Claro Loft",
        date: isSpanish ? "28 - 30 marzo" : "Mar 28 - Mar 30",
        status: isSpanish ? "Pendiente" : "Pending"
      }
    ],
    [isSpanish]
  );

  const guestHistory = useMemo(
    () => [
      {
        id: "guest-1",
        name: "Sofia Martinez",
        contact: "sofia@email.com",
        preference: isSpanish ? "Check-in tardio y vista a montana" : "Late check-in and mountain view"
      },
      {
        id: "guest-2",
        name: "Daniel Perez",
        contact: "daniel@email.com",
        preference: isSpanish ? "Suite silenciosa y desayuno temprano" : "Quiet suite and early breakfast"
      },
      {
        id: "guest-3",
        name: "Laura Gomez",
        contact: "laura@email.com",
        preference: isSpanish ? "Estadia pet-friendly" : "Pet-friendly stay"
      }
    ],
    [isSpanish]
  );

  const earningsSummary = useMemo(
    () => [
      { key: "day", label: isSpanish ? "Ingreso diario" : "Daily revenue", value: "$540K COP" },
      { key: "week", label: isSpanish ? "Ingreso semanal" : "Weekly revenue", value: "$3.2M COP" },
      { key: "month", label: isSpanish ? "Ingreso mensual" : "Monthly revenue", value: "$14.8M COP" },
      { key: "year", label: isSpanish ? "Comparativo anual" : "Yearly comparison", value: "+18%" }
    ],
    [isSpanish]
  );

  const hostMenuItems = useMemo(
    () => [
      { key: "admin", label: isSpanish ? "Panel admin" : "Admin panel" },
      { key: "earnings", label: isSpanish ? "Reportes de ganancias" : "Earnings reports" },
      { key: "reservations", label: isSpanish ? "Gestion de reservas" : "Reservation management" },
      { key: "users", label: isSpanish ? "Control de clientes" : "Client control" },
      { key: "stays", label: isSpanish ? "Gestion de alojamientos" : "Stay management" },
      { key: "exports", label: isSpanish ? "Exportacion de datos" : "Data export" },
      { key: "alerts", label: isSpanish ? "Alertas" : "Alerts" }
    ],
    [isSpanish]
  );

  function handleAddListing(e) {
    e.preventDefault();
    const form = e.target;
    const newListing = {
      id: Date.now(),
      title: form.title.value,
      location: form.location.value,
      price: form.price.value,
      image: form.image.value,
      description: form.description.value,
      amenities: form.amenities.value.split(",").map(a => a.trim())
    };
    setHostListings([...hostListings, newListing]);
    setShowAddForm(false);
    showStatus(isSpanish ? "Alojamiento añadido" : "Listing added");
    form.reset();
  }

  function handleEditListing(listing) {
    setEditListing(listing);
  }

  function handleUpdateListing(e) {
    e.preventDefault();
    const form = e.target;
    const updatedListing = {
      ...editListing,
      title: form.title.value,
      location: form.location.value,
      price: form.price.value,
      image: form.image.value,
      description: form.description.value,
      amenities: form.amenities.value.split(",").map(a => a.trim())
    };
    setHostListings(hostListings.map(l => l.id === updatedListing.id ? updatedListing : l));
    setEditListing(null);
    showStatus(isSpanish ? "Alojamiento actualizado" : "Listing updated");
  }

  function handleDeleteListing(id) {
    setHostListings(hostListings.filter(l => l.id !== id));
    showStatus(isSpanish ? "Alojamiento eliminado" : "Listing deleted");
  }

  const handleExport = (format) => {
    showStatus(isSpanish ? `Exportando datos a ${format}...` : `Exporting data to ${format}...`);
  };

  const handleReservationAction = (id, action) => {
    showStatus(isSpanish ? `Reserva ${id} ${action === "accept" ? "aceptada" : "cancelada"}` : `Reservation ${id} ${action === "accept" ? "accepted" : "canceled"}`);
  };


  return (
    <div className="profileDashPage hostDashPage">
      <Navbar
        t={t}
        language={language}
        onToggleLanguage={onToggleLanguage}
        isUserMenuOpen={isUserMenuOpen}
        setIsUserMenuOpen={setIsUserMenuOpen}
        userMenuRef={userMenuRef}
        logoImg={logoImg}
        onUserMenuAction={onUserMenuAction}
        isAuthenticated={isAuthenticated}
        onAuthAction={onAuthAction}
        currentUser={currentUser}
        showNavLinks={false}
        userMenuOptions={t.userMenu.hostOptions}
      />

      {statusMessage && (
        <div className="dashStatusToast">
          <p>{statusMessage}</p>
        </div>
      )}

      <main className="profileDashLayout">
        <aside className={`profileDashSidebar${isSidebarOpen ? " open" : " closed"}`}>
          <button className="sidebarToggleBtn" type="button" onClick={() => setIsSidebarOpen((open) => !open)}>
            <span className="sidebarToggleIcon">{isSidebarOpen ? "▼" : "►"}</span>
          </button>
          {isSidebarOpen && (
            <div>
              <div 
                className="profileDashUserBlock" 
                style={{ cursor: "pointer" }}
                onClick={() => setSection("admin-info")}
              >
                <img className="profileDashUserPhoto" src={currentUser?.avatar} alt={currentUser?.displayName || "Host"} loading="lazy" decoding="async" />
                <div>
                  <h2>{currentUser?.displayName || (isSpanish ? "Host" : "Host")}</h2>
                  <span>{isSpanish ? "Panel de anfitrión" : "Host dashboard"}</span>
                </div>
              </div>

              <ul className="profileDashMenu">
                {hostMenuItems.map((item) => (
                  <li key={item.key} className={currentSection === item.key ? "active" : ""}>
                    <button type="button" className="profileDashMenuBtn" onClick={() => setSection(item.key)}>{item.label}</button>
                  </li>
                ))}
              </ul>

              <button className="profileDashReserveBtn" type="button" onClick={() => navigate("/")}>
                {isSpanish ? "Ir al catalogo" : "Go to catalog"}
              </button>
            </div>
          )}
        </aside>

        <section className="profileDashMain hostDashMain">
          <div className="profileDashBackRow">
            <button className="catalogClose" type="button" onClick={() => navigate("/")} aria-label={isSpanish ? "Volver" : "Back"}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M14.5 6.5L9 12L14.5 17.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <header className="profileDashHeading">
            <h1>{isSpanish ? "Dashboard del host" : "Host dashboard"}</h1>
            <p>{isSpanish ? "Panel de administracion con estadisticas en tiempo real." : "Administration panel with real-time statistics."}</p>
          </header>

          {/* Panel de edición de información de anfitrión */}
          {currentSection === "admin-info" && (
            <section className="profileDashPersonalSection">
              <header className="profileDashHeading profileDashPersonalHeader">
                <h1>{t.profileDashboard.personalInfo.title}</h1>
                <p>{t.profileDashboard.personalInfo.subtitle}</p>
                <div className="profileDashPersonalActions">
                  {!isEditingPersonal ? (
                    <button type="button" className="profileDashSecondaryBtn" onClick={() => setIsEditingPersonal(true)}>
                      {t.profileDashboard.personalInfo.enableEditButton}
                    </button>
                  ) : (
                    <>
                      <button type="button" className="profileDashSecondaryBtn" onClick={() => setIsEditingPersonal(false)}>
                        {t.profileDashboard.personalInfo.cancelButton || "Cancelar"}
                      </button>
                      <button type="button" className="profileDashPrimaryBtn" onClick={() => setIsEditingPersonal(false)}>
                        {t.profileDashboard.personalInfo.saveButton || "Guardar"}
                      </button>
                    </>
                  )}
                </div>
              </header>

              <article className="profileDashPersonalCard">
                <h2>{t.profileDashboard.personalInfo.profileSectionTitle}</h2>
                <p>{t.profileDashboard.personalInfo.profileSectionHint}</p>
                <ul className="profileDashSettingList">
                  <li>
                    <span>{t.profileDashboard.personalInfo.labels.photo}</span>
                    <strong>{currentUser?.avatar || "Añade una foto para personalizar tu cuenta"}</strong>
                    <span className="chevron">›</span>
                  </li>
                  <li>
                    <span>{t.profileDashboard.personalInfo.labels.name}</span>
                    {isEditingPersonal ? (
                      <input type="text" defaultValue={currentUser?.displayName || ""} />
                    ) : (
                      <strong>{currentUser?.displayName || ""}</strong>
                    )}
                    {!isEditingPersonal && <span className="chevron">›</span>}
                  </li>
                  <li>
                    <span>{t.profileDashboard.personalInfo.labels.birthDate}</span>
                    {isEditingPersonal ? (
                      <input type="text" defaultValue={currentUser?.birthdate || ""} />
                    ) : (
                      <strong>{currentUser?.birthdate || "22 de agosto de 1996"}</strong>
                    )}
                    {!isEditingPersonal && <span className="chevron">›</span>}
                  </li>
                  <li>
                    <span>{t.profileDashboard.personalInfo.labels.gender}</span>
                    {isEditingPersonal ? (
                      <select defaultValue={currentUser?.gender || "Mujer"}>
                        {t.profileDashboard.personalInfo.genderOptions.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    ) : (
                      <strong>{currentUser?.gender || "Mujer"}</strong>
                    )}
                    {!isEditingPersonal && <span className="chevron">›</span>}
                  </li>
                  <li>
                    <span>{t.profileDashboard.personalInfo.labels.idDocument}</span>
                    {isEditingPersonal ? (
                      <input type="text" defaultValue={currentUser?.document || ""} />
                    ) : (
                      <strong>{currentUser?.document || "DNI 74283915"}</strong>
                    )}
                    {!isEditingPersonal && <span className="chevron">›</span>}
                  </li>
                  <li>
                    <span>{t.profileDashboard.personalInfo.labels.password}</span>
                    <strong>{t.profileDashboard.personalInfo.passwordStatus || "Última modificación: 6 jul. 2016"}</strong>
                    <span className="chevron">›</span>
                  </li>
                </ul>
              </article>

              <article className="profileDashPersonalCard">
                <h2>{t.profileDashboard.personalInfo.contactSectionTitle}</h2>
                <ul className="profileDashSettingList">
                  <li>
                    <span>{t.profileDashboard.personalInfo.labels.email}</span>
                    {isEditingPersonal ? (
                      <input type="email" defaultValue={currentUser?.email || ""} />
                    ) : (
                      <strong>{currentUser?.email || "host.demo@horizon.test"}</strong>
                    )}
                    {!isEditingPersonal && <span className="chevron">›</span>}
                  </li>
                  <li>
                    <span>{t.profileDashboard.personalInfo.labels.phone}</span>
                    {isEditingPersonal ? (
                      <input type="tel" defaultValue={currentUser?.phone || ""} />
                    ) : (
                      <strong>{currentUser?.phone || "+34 600 123 456"}</strong>
                    )}
                    {!isEditingPersonal && <span className="chevron">›</span>}
                  </li>
                  <li>
                    <span>{t.profileDashboard.personalInfo.labels.address}</span>
                    {isEditingPersonal ? (
                      <input type="text" defaultValue={currentUser?.address || ""} />
                    ) : (
                      <strong>{currentUser?.address || "Calle Aribau 128"}</strong>
                    )}
                    {!isEditingPersonal && <span className="chevron">›</span>}
                  </li>
                  <li>
                    <span>{t.profileDashboard.personalInfo.labels.city}</span>
                    {isEditingPersonal ? (
                      <input type="text" defaultValue={currentUser?.city || ""} />
                    ) : (
                      <strong>{currentUser?.city || "Barcelona"}</strong>
                    )}
                    {!isEditingPersonal && <span className="chevron">›</span>}
                  </li>
                  <li>
                    <span>{t.profileDashboard.personalInfo.labels.country}</span>
                    {isEditingPersonal ? (
                      <input type="text" defaultValue={currentUser?.country || ""} />
                    ) : (
                      <strong>{currentUser?.country || "España"}</strong>
                    )}
                    {!isEditingPersonal && <span className="chevron">›</span>}
                  </li>
                </ul>
              </article>
            </section>
          )}

          {currentSection === "admin" && (
            <section className="hostDashStatsGrid">
              {dashboardStats.map((item) => (
                <article key={item.key} className="hostDashStatCard">
                  <p>{item.label}</p>
                  <h3>{item.value}</h3>
                </article>
              ))}
            </section>
          )}

          {currentSection === "earnings" && (
            <section className="hostDashPanel">
              <h2>{isSpanish ? "Reportes de ganancias" : "Earnings reports"}</h2>
              <div className="hostDashKpiGrid">
                {earningsSummary.map((item) => (
                  <article key={item.key} className="hostDashKpiCard">
                    <p>{item.label}</p>
                    <strong>{item.value}</strong>
                  </article>
                ))}
              </div>
            </section>
          )}

          {currentSection === "reservations" && (
            <section className="hostDashPanel">
              <h2>{isSpanish ? "Gestion de reservas" : "Reservation management"}</h2>
              <ul className="hostDashReservationList">
                {reservations.map((reservation) => (
                  <li key={reservation.id}>
                    <div>
                      <strong>{reservation.guest}</strong>
                      <p>{`${reservation.stay} · ${reservation.date}`}</p>
                    </div>
                    <span>{reservation.status}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {currentSection === "users" && (
            <section className="hostDashPanel">
              <h2>{isSpanish ? "Control de usuarios/clientes" : "User/client control"}</h2>
              <ul className="hostDashReservationList">
                {guestHistory.map((guest) => (
                  <li key={guest.id}>
                    <div>
                      <strong>{guest.name}</strong>
                      <p>{guest.contact}</p>
                    </div>
                    <span>{guest.preference}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {currentSection === "stays" && (
            <section className="hostManageStaysSection">
              <header className="profileDashHeading profileDashPersonalHeader">
                <h1>{isSpanish ? "Gestión de alojamientos" : "Stay Management"}</h1>
                <p>{isSpanish ? "Administra tus alojamientos, añade, edita o elimina propiedades." : "Manage your stays, add, edit or delete properties."}</p>
                <button className="profileDashPrimaryBtn" type="button" onClick={() => setShowAddForm(true)}>
                  {isSpanish ? "Añadir alojamiento" : "Add stay"}
                </button>
              </header>
              <div className="listingsGrid improvedGrid">
                {hostListings.map((listing) => (
                  <article key={listing.id} className="listingCard improvedCard">
                    <div className="listingImage">
                      <img src={listing.image} alt={listing.title} />
                    </div>
                    <div className="listingInfo">
                      <h3>{listing.title}</h3>
                      <p className="listingLocation">{listing.location}</p>
                      <p className="listingPrice">{listing.price}</p>
                      <p className="listingDescription">{listing.description}</p>
                      <div className="listingAmenities">
                        {listing.amenities.map((amenity, idx) => (
                          <span key={idx} className="amenityTag">{amenity}</span>
                        ))}
                      </div>
                      <div className="listingActions">
                        <button className="profileDashSecondaryBtn" type="button" onClick={() => handleEditListing(listing)}>
                          {isSpanish ? "Modificar" : "Edit"}
                        </button>
                        <button className="profileDashSecondaryBtn danger" type="button" onClick={() => handleDeleteListing(listing.id)}>
                          {isSpanish ? "Eliminar" : "Delete"}
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              {showAddForm && (
                <div className="hostAddStayModal">
                  <form className="hostAddStayForm" onSubmit={handleAddListing}>
                    <h2>{isSpanish ? "Añadir alojamiento" : "Add stay"}</h2>
                    <label>{isSpanish ? "Título" : "Title"}<input name="title" required /></label>
                    <label>{isSpanish ? "Ubicación" : "Location"}<input name="location" required /></label>
                    <label>{isSpanish ? "Precio" : "Price"}<input name="price" required /></label>
                    <label>{isSpanish ? "Imagen (URL)" : "Image (URL)"}<input name="image" required /></label>
                    <label>{isSpanish ? "Descripción" : "Description"}<textarea name="description" required /></label>
                    <label>{isSpanish ? "Servicios" : "Amenities"}<input name="amenities" placeholder="WiFi, Piscina, Cocina..." /></label>
                    <button className="profileDashPrimaryBtn" type="submit">{isSpanish ? "Guardar" : "Save"}</button>
                    <button className="profileDashSecondaryBtn" type="button" onClick={() => setShowAddForm(false)}>{isSpanish ? "Cancelar" : "Cancel"}</button>
                  </form>
                </div>
              )}
              {editListing && (
                <div className="hostEditStayModal">
                  <form className="hostAddStayForm" onSubmit={handleUpdateListing}>
                    <h2>{isSpanish ? "Modificar alojamiento" : "Edit stay"}</h2>
                    <label>{isSpanish ? "Título" : "Title"}<input name="title" defaultValue={editListing.title} required /></label>
                    <label>{isSpanish ? "Ubicación" : "Location"}<input name="location" defaultValue={editListing.location} required /></label>
                    <label>{isSpanish ? "Precio" : "Price"}<input name="price" defaultValue={editListing.price} required /></label>
                    <label>{isSpanish ? "Imagen (URL)" : "Image (URL)"}<input name="image" defaultValue={editListing.image} required /></label>
                    <label>{isSpanish ? "Descripción" : "Description"}<textarea name="description" defaultValue={editListing.description} required /></label>
                    <label>{isSpanish ? "Servicios" : "Amenities"}<input name="amenities" defaultValue={editListing.amenities?.join(", ") || ""} /></label>
                    <button className="profileDashPrimaryBtn" type="submit">{isSpanish ? "Guardar" : "Save"}</button>
                    <button className="profileDashSecondaryBtn" type="button" onClick={() => setEditListing(null)}>{isSpanish ? "Cancelar" : "Cancel"}</button>
                  </form>
                </div>
              )}
            </section>
          )}

          {currentSection === "exports" && (
            <section className="hostDashPanel">
              <h2>{isSpanish ? "Exportacion de datos" : "Data export"}</h2>
              <div className="hostDashExportActions">
                <button type="button" className="profileDashSecondaryBtn" onClick={() => handleExport("CSV")}>CSV</button>
                <button type="button" className="profileDashSecondaryBtn" onClick={() => handleExport("Excel")}>Excel</button>
                <button type="button" className="profileDashSecondaryBtn" onClick={() => handleExport("PDF")}>PDF</button>
              </div>
            </section>
          )}

          {currentSection === "alerts" && (
            <section className="hostDashPanel">
              <h2>{isSpanish ? "Alertas y notificaciones" : "Alerts and notifications"}</h2>
              <ul className="hostDashReservationList">
                <li>
                  <div style={{ flex: 1 }}>
                    <strong>{isSpanish ? "Reserva nueva" : "New reservation"}</strong>
                    <p>{isSpanish ? "Cabana Bosque Azul · Sofia Martinez" : "Bosque Azul Cabin · Sofia Martinez"}</p>
                  </div>
                  <div className="listingActions" style={{ gap: "8px" }}>
                    <button className="profileDashSecondaryBtn" onClick={() => handleReservationAction("res-1", "accept")}>
                      {isSpanish ? "Aceptar" : "Accept"}
                    </button>
                    <button className="profileDashSecondaryBtn danger" onClick={() => handleReservationAction("res-1", "cancel")}>
                      {isSpanish ? "Rechazar" : "Reject"}
                    </button>
                  </div>
                </li>
                <li>
                  <div>
                    <strong>{isSpanish ? "Pago recibido" : "Payment received"}</strong>
                    <p>{isSpanish ? "Transferencia verificada en Loft Rio Claro" : "Verified transfer for Rio Claro Loft"}</p>
                  </div>
                  <span>{isSpanish ? "Hace 15 min" : "15 min ago"}</span>
                </li>
                <li>
                  <div>
                    <strong>{isSpanish ? "Cancelacion" : "Cancellation"}</strong>
                    <p>{isSpanish ? "Reserva #2381 cancelada por el huesped" : "Booking #2381 canceled by guest"}</p>
                  </div>
                  <span>{isSpanish ? "Hoy" : "Today"}</span>
                </li>
              </ul>
            </section>
          )}
        </section>
      </main>

      <footer className="profileDashFooter">
        <div className="profileDashFooterBrand">{footerRightsText}</div>
        <div className="profileDashFooterLinks">
          {t.profileDashboard.footer.links.map((link) => (
            <Link key={link.path} to={link.path}>{link.label}</Link>
          ))}
        </div>
        <div className="profileDashFooterCredit">
          <span>{footerCreditPrefix}</span>
          <a href="#" className="profileDashFooterCreditLink">Horizon</a>
        </div>
      </footer>
    </div>
  );
}

export default HostDashboardPage;
