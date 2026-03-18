/**
 * Minimal iCal (.ics) parser.
 * Extracts all VEVENT blocks and returns a Set of ISO date strings
 * ("YYYY-MM-DD") for every day that falls within a booked range.
 */

const parseICalDate = (raw) => {
  if (!raw) return null;
  // Support YYYYMMDD and YYYYMMDDTHHmmssZ formats
  const str = raw.replace(/[TZ]/g, "").slice(0, 8);
  const year = parseInt(str.slice(0, 4), 10);
  const month = parseInt(str.slice(4, 6), 10) - 1;
  const day = parseInt(str.slice(6, 8), 10);
  if (!year || isNaN(month) || !day) return null;
  return new Date(year, month, day);
};

const toIso = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const addOneDay = (date) => {
  const d = new Date(date);
  d.setDate(d.getDate() + 1);
  return d;
};

/**
 * Parse raw .ics text and return a Set of all blocked ISO date strings.
 * DTEND in iCal is exclusive, so we go up to (but not including) DTEND.
 */
export const parseICalToBlockedDates = (icsText) => {
  const blocked = new Set();

  if (!icsText) return blocked;

  // Split into VEVENT blocks
  const eventBlocks = icsText.split("BEGIN:VEVENT").slice(1);

  for (const block of eventBlocks) {
    // Extract DTSTART and DTEND (may have params like DTSTART;VALUE=DATE:...)
    const startMatch = block.match(/DTSTART(?:[^:]*):(\S+)/);
    const endMatch = block.match(/DTEND(?:[^:]*):(\S+)/);

    if (!startMatch || !endMatch) continue;

    const start = parseICalDate(startMatch[1].trim());
    const end = parseICalDate(endMatch[1].trim());

    if (!start || !end) continue;

    // Iterate from start up to (not including) end
    let cursor = new Date(start);
    while (cursor < end) {
      blocked.add(toIso(cursor));
      cursor = addOneDay(cursor);
    }
  }

  return blocked;
};
