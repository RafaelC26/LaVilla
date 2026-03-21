import sys

content = open('src/components/StayDetailPage.jsx', 'r', encoding='utf-8').read()

target = """              <button
                className="detailReserveBtn"
                type="button"
                disabled={!hasFullRange}
                onClick={handleReserveClick}
              >
                {t.navbar.bookNow}
              </button>"""

target = target.replace('\r\n', '\n')

replacement = """              <button
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
              )}"""

if target in content:
    content = content.replace(target, replacement)
    open('src/components/StayDetailPage.jsx', 'w', encoding='utf-8').write(content)
    print("Replaced successfully")
else:
    print("Could not find target")
