import { useMemo } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "./Navbar";

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
  const footerRightsText = isSpanish
    ? "® La Villa. Todos los derechos reservados."
    : "® La Villa. All rights reserved.";
  const footerCreditPrefix = isSpanish ? "Experiencia Digital por " : "Digital experience by ";

  const hostListings = useMemo(() => listings.slice(0, 4), [listings]);

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

  const managementItems = useMemo(
    () => [
      {
        key: "availability",
        title: isSpanish ? "Disponibilidad" : "Availability",
        text: isSpanish ? "Calendario por propiedad con bloques y cupos activos." : "Per-property calendar with active blocks and capacity."
      },
      {
        key: "pricing",
        title: isSpanish ? "Precios dinamicos" : "Dynamic pricing",
        text: isSpanish ? "Ajustes automaticos por temporada y ocupacion." : "Automatic adjustments by season and occupancy."
      },
      {
        key: "promo",
        title: isSpanish ? "Promociones" : "Promotions",
        text: isSpanish ? "Cupones y descuentos por estadias largas." : "Coupons and discounts for long stays."
      }
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

  const setSection = (section) => {
    const params = new URLSearchParams(searchParams);
    params.set("section", section);
    setSearchParams(params, { replace: true });
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
      />

      <main className="profileDashLayout">
        <aside className="profileDashSidebar">
          <div className="profileDashUserBlock">
            <img className="profileDashUserPhoto" src={currentUser?.avatar} alt={currentUser?.displayName || "Host"} loading="lazy" decoding="async" />
            <div>
              <h2>{currentUser?.displayName || (isSpanish ? "Host" : "Host")}</h2>
              <span>{isSpanish ? "Panel de anfitrion" : "Host dashboard"}</span>
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
        </aside>

        <section className="profileDashMain hostDashMain">
          <header className="profileDashHeading">
            <h1>{isSpanish ? "Dashboard del host" : "Host dashboard"}</h1>
            <p>{isSpanish ? "Panel de administracion con estadisticas en tiempo real." : "Administration panel with real-time statistics."}</p>
          </header>

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
            <section className="hostDashPanel">
              <h2>{isSpanish ? "Gestion de alojamientos" : "Stay management"}</h2>
              <div className="hostDashKpiGrid">
                {managementItems.map((item) => (
                  <article key={item.key} className="hostDashKpiCard">
                    <p>{item.title}</p>
                    <strong>{item.text}</strong>
                  </article>
                ))}
              </div>
              <div className="hostDashListingGrid">
                {hostListings.map((listing) => (
                  <article key={listing.id} className="hostDashListingCard">
                    <img src={listing.image} alt={listing.title} loading="lazy" decoding="async" />
                    <div>
                      <h3>{listing.title}</h3>
                      <p>{listing.location}</p>
                      <button type="button" className="profileDashPrimaryBtn" onClick={() => navigate(`/stay/${listing.id}`)}>
                        {isSpanish ? "Ver detalle" : "View detail"}
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {currentSection === "exports" && (
            <section className="hostDashPanel">
              <h2>{isSpanish ? "Exportacion de datos" : "Data export"}</h2>
              <div className="hostDashExportActions">
                <button type="button" className="profileDashSecondaryBtn">CSV</button>
                <button type="button" className="profileDashSecondaryBtn">Excel</button>
                <button type="button" className="profileDashSecondaryBtn">PDF</button>
              </div>
            </section>
          )}

          {currentSection === "alerts" && (
            <section className="hostDashPanel">
              <h2>{isSpanish ? "Alertas y notificaciones" : "Alerts and notifications"}</h2>
              <ul className="hostDashReservationList">
                <li>
                  <div>
                    <strong>{isSpanish ? "Reserva nueva" : "New reservation"}</strong>
                    <p>{isSpanish ? "Cabana Bosque Azul · Sofia Martinez" : "Bosque Azul Cabin · Sofia Martinez"}</p>
                  </div>
                  <span>{isSpanish ? "Ahora" : "Now"}</span>
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
