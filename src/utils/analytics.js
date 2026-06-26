/**
 * EVOKE Reconnect – Analytics Tracker
 * Tracks page events and stores them locally.
 * Optional: POST to a backend / Google Sheets webhook.
 */

import { updateLeadAnalytics } from './slugUtils';

const SHEETS_ENDPOINT = import.meta.env.VITE_SHEETS_ENDPOINT || null;

/**
 * Track a page view for a lead.
 * Records the visit timestamp.
 */
export function trackPageView(slug) {
  updateLeadAnalytics(slug, {
    visited: true,
    visitedAt: new Date().toISOString(),
  });
}

/**
 * Track time on page (call on unmount or visibility change)
 */
export function trackTimeOnPage(slug, seconds) {
  updateLeadAnalytics(slug, { timeOnPage: Math.round(seconds) });
  postToSheets({ event: 'time_on_page', slug, seconds: Math.round(seconds) });
}

/**
 * Track lead response (YES / MAYBE / NOT ANYMORE)
 */
export function trackResponse(slug, response) {
  updateLeadAnalytics(slug, { response });
  postToSheets({ event: 'response', slug, response });
}

/**
 * Track objection selected (MAYBE flow)
 */
export function trackObjection(slug, objection) {
  updateLeadAnalytics(slug, { objection });
  postToSheets({ event: 'objection', slug, objection });
}

/**
 * Track WhatsApp button click
 */
export function trackWhatsApp(slug) {
  updateLeadAnalytics(slug, { whatsappClicked: true });
  postToSheets({ event: 'whatsapp_click', slug });
}

/**
 * POST analytics event to Google Sheets webhook (if configured)
 */
async function postToSheets(payload) {
  if (!SHEETS_ENDPOINT) return;
  try {
    await fetch(SHEETS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...payload,
        timestamp: new Date().toISOString(),
      }),
    });
  } catch {
    // Fail silently – analytics should never break the UX
  }
}
