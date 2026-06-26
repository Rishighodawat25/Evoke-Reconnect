/**
 * EVOKE Reconnect – Slug & Lead Utilities
 * Generates secure non-guessable 6-character slugs for each lead.
 * Slugs do NOT expose any PII in the URL.
 */

const SLUG_CHARS = 'abcdefghijkmnpqrstuvwxyz23456789'; // no confusable chars

/**
 * Generate a random 6-char slug
 */
export function generateSlug(length = 6) {
  let slug = '';
  const arr = new Uint8Array(length);
  crypto.getRandomValues(arr);
  for (let i = 0; i < length; i++) {
    slug += SLUG_CHARS[arr[i] % SLUG_CHARS.length];
  }
  return slug;
}

/**
 * Load leads from localStorage (persisted after CSV import)
 */
export function getLeads() {
  try {
    const raw = localStorage.getItem('evoke_leads');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Save leads array to localStorage
 */
export function saveLeads(leads) {
  localStorage.setItem('evoke_leads', JSON.stringify(leads));
}

/**
 * Find a lead by their slug
 */
export function getLeadBySlug(slug) {
  const leads = getLeads();
  return leads.find((l) => l.slug === slug) || null;
}

/**
 * Process raw CSV rows → leads with unique slugs
 * Skips duplicates by email
 */
export function processLeadsFromCSV(rows) {
  const existing = getLeads();
  const existingEmails = new Set(existing.map((l) => l.email?.toLowerCase()));
  const existingSlugs = new Set(existing.map((l) => l.slug));

  const newLeads = [];

  for (const row of rows) {
    const email = (row.email || '').trim().toLowerCase();
    const name = (row.name || '').trim();
    const phone = (row.phone || '').toString().trim();
    const city = (row.city || '').trim();

    if (!name || !email) continue;
    if (existingEmails.has(email)) continue;

    // Generate a unique slug
    let slug;
    do {
      slug = generateSlug(6);
    } while (existingSlugs.has(slug));

    existingSlugs.add(slug);
    existingEmails.add(email);

    newLeads.push({
      id: `lead_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      slug,
      name,
      email,
      phone,
      city,
      createdAt: new Date().toISOString(),
      // Analytics fields (updated on visit)
      visited: false,
      visitedAt: null,
      timeOnPage: 0,
      response: null,        // 'yes' | 'maybe' | 'no'
      objection: null,       // only for 'maybe'
      whatsappClicked: false,
    });
  }

  const merged = [...existing, ...newLeads];
  saveLeads(merged);
  return { added: newLeads.length, total: merged.length };
}

/**
 * Update a lead's analytics data
 */
export function updateLeadAnalytics(slug, updates) {
  const leads = getLeads();
  const idx = leads.findIndex((l) => l.slug === slug);
  if (idx === -1) return;
  leads[idx] = { ...leads[idx], ...updates };
  saveLeads(leads);
}

/**
 * Clear all leads (admin action)
 */
export function clearAllLeads() {
  localStorage.removeItem('evoke_leads');
}
