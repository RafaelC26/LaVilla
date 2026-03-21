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

idx = content.find('detailReserveBtn')
print(repr(content[idx-20:idx+200]))
