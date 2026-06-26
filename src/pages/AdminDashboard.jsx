/**
 * EVOKE Reconnect – Admin Dashboard
 *
 * Overview metrics + full lead table.
 * Export WhatsApp CSV.
 * Protected by a simple PIN (set in env vars).
 */

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getLeads, clearAllLeads } from '../utils/slugUtils';
import { exportWhatsAppCSV, downloadCSV } from '../utils/whatsappUtils';

const BASE_URL = import.meta.env.VITE_BASE_URL || 'https://evoke-reconnect.vercel.app';
const ADMIN_PIN = import.meta.env.VITE_ADMIN_PIN || '1234';

function MetricCard({ label, value, sub, accent }) {
  return (
    <div className={`border p-6 relative ${accent ? 'border-gold/40' : 'border-stone/30'}`}>
      <span className={`absolute top-0 left-0 w-3 h-3 border-t border-l ${accent ? 'border-gold/60' : 'border-stone/40'}`} />
      <div className={`font-display text-4xl font-light mb-1 ${accent ? 'text-gold' : 'text-ivory/80'}`}>
        {value}
      </div>
      <div className="text-xs tracking-widest uppercase text-slate">{label}</div>
      {sub && <div className="text-xs text-stone/50 mt-2">{sub}</div>}
    </div>
  );
}

const RESPONSE_LABELS = {
  yes: 'Interested',
  maybe: 'Maybe',
  no: 'Not Anymore',
};

const OBJECTION_LABELS = {
  budget: 'Budget',
  timing: 'Timing',
  location: 'Location',
  alternatives: 'Alternatives',
  never_got_around: 'Never Got Around',
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [authed, setAuthed] = useState(false);
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState(false);
  const [leads, setLeads] = useState([]);
  const [sortBy, setSortBy] = useState('visitedAt');
  const [filterResponse, setFilterResponse] = useState('all');
  const [confirmClear, setConfirmClear] = useState(false);

  // Check session auth
  useEffect(() => {
    if (sessionStorage.getItem('evoke_admin') === 'true') setAuthed(true);
  }, []);

  const loadLeads = useCallback(() => {
    setLeads(getLeads());
  }, []);

  useEffect(() => {
    if (authed) loadLeads();
  }, [authed, loadLeads]);

  function handlePinSubmit(e) {
    e.preventDefault();
    if (pin === ADMIN_PIN) {
      sessionStorage.setItem('evoke_admin', 'true');
      setAuthed(true);
    } else {
      setPinError(true);
      setTimeout(() => setPinError(false), 1500);
    }
    setPin('');
  }

  // Computed metrics
  const visited = leads.filter((l) => l.visited);
  const interested = leads.filter((l) => l.response === 'yes');
  const maybe = leads.filter((l) => l.response === 'maybe');
  const notAnymore = leads.filter((l) => l.response === 'no');
  const whatsappped = leads.filter((l) => l.whatsappClicked);

  // Most common objection
  const objectionCounts = {};
  leads.forEach((l) => {
    if (l.objection) objectionCounts[l.objection] = (objectionCounts[l.objection] || 0) + 1;
  });
  const topObjection = Object.entries(objectionCounts).sort((a, b) => b[1] - a[1])[0];

  // Filtered + sorted leads
  const filtered = leads
    .filter((l) => filterResponse === 'all' || l.response === filterResponse || (filterResponse === 'visited' && l.visited))
    .sort((a, b) => {
      if (sortBy === 'visitedAt') return new Date(b.visitedAt || 0) - new Date(a.visitedAt || 0);
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'timeOnPage') return (b.timeOnPage || 0) - (a.timeOnPage || 0);
      return 0;
    });

  function handleExportCSV() {
    const blob = exportWhatsAppCSV(leads);
    downloadCSV(blob);
  }

  function handleClearLeads() {
    clearAllLeads();
    setLeads([]);
    setConfirmClear(false);
  }

  function formatTime(seconds) {
    if (!seconds) return '—';
    if (seconds < 60) return `${seconds}s`;
    return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
  }

  function formatDate(iso) {
    if (!iso) return '—';
    return new Date(iso).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
    });
  }

  // PIN screen
  if (!authed) {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm text-center"
        >
          <div className="font-display text-3xl text-ivory mb-2">EVOKE</div>
          <div className="text-xs tracking-widest text-slate uppercase mb-12">Admin Access</div>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Enter PIN"
              className={`
                w-full bg-transparent border px-5 py-4 text-center text-ivory
                placeholder-stone/40 focus:outline-none tracking-widest text-sm
                transition-colors duration-300
                ${pinError ? 'border-red-800/60 text-red-400' : 'border-stone/40 focus:border-gold/50'}
              `}
            />
            <button
              type="submit"
              className="w-full py-4 border border-gold/40 text-gold text-xs tracking-widest uppercase hover:bg-gold/5 transition-all duration-300"
            >
              Enter
            </button>
          </form>

          {pinError && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-red-400/70 text-xs"
            >
              Incorrect PIN
            </motion.p>
          )}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-obsidian text-ivory">
      {/* Header */}
      <header className="border-b border-stone/20 px-6 md:px-10 py-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-light">EVOKE Reconnect</h1>
          <p className="text-xs text-slate mt-1 tracking-widest uppercase">Admin Dashboard</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/admin/import')}
            className="px-5 py-2.5 border border-stone/30 text-slate hover:border-gold/40 hover:text-gold text-xs tracking-widest uppercase transition-all duration-300"
          >
            Import CSV
          </button>
          <button
            onClick={handleExportCSV}
            className="px-5 py-2.5 border border-gold/40 text-gold hover:bg-gold/5 text-xs tracking-widest uppercase transition-all duration-300"
          >
            Export WhatsApp CSV
          </button>
        </div>
      </header>

      <div className="px-6 md:px-10 py-10">

        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
          <MetricCard label="Total Leads" value={leads.length} />
          <MetricCard label="Visited" value={visited.length} sub={`${Math.round((visited.length / Math.max(leads.length, 1)) * 100)}% rate`} />
          <MetricCard label="Interested" value={interested.length} accent />
          <MetricCard label="Maybe" value={maybe.length} />
          <MetricCard label="Not Anymore" value={notAnymore.length} />
          <MetricCard label="WhatsApp" value={whatsappped.length} sub="clicked" />
        </div>

        {/* Top Objection */}
        {topObjection && (
          <div className="mb-8 p-5 border border-stone/20 inline-flex items-center gap-4">
            <span className="text-xs text-slate tracking-widest uppercase">Top Objection</span>
            <span className="text-gold font-display text-lg">
              {OBJECTION_LABELS[topObjection[0]] || topObjection[0]}
            </span>
            <span className="text-stone text-xs">({topObjection[1]} leads)</span>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="text-xs text-slate tracking-widest uppercase">Filter:</span>
          {[
            { val: 'all', label: 'All' },
            { val: 'visited', label: 'Visited' },
            { val: 'yes', label: 'Interested' },
            { val: 'maybe', label: 'Maybe' },
            { val: 'no', label: 'Not Anymore' },
          ].map((opt) => (
            <button
              key={opt.val}
              onClick={() => setFilterResponse(opt.val)}
              className={`px-4 py-1.5 border text-xs tracking-widest uppercase transition-all duration-200
                ${filterResponse === opt.val
                  ? 'border-gold/50 text-gold'
                  : 'border-stone/30 text-stone hover:border-stone/50 hover:text-slate'
                }`}
            >
              {opt.label}
            </button>
          ))}

          <span className="text-xs text-slate tracking-widest uppercase ml-4">Sort:</span>
          {[
            { val: 'visitedAt', label: 'Recent' },
            { val: 'name', label: 'Name' },
            { val: 'timeOnPage', label: 'Time' },
          ].map((opt) => (
            <button
              key={opt.val}
              onClick={() => setSortBy(opt.val)}
              className={`px-4 py-1.5 border text-xs tracking-widest uppercase transition-all duration-200
                ${sortBy === opt.val
                  ? 'border-sand/40 text-sand'
                  : 'border-stone/30 text-stone hover:border-stone/50 hover:text-slate'
                }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-stone/20">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone/20">
                {['Name', 'City', 'Slug / URL', 'Visited', 'Time', 'Response', 'Objection', 'WhatsApp'].map((h) => (
                  <th key={h} className="px-5 py-4 text-left text-xs tracking-widest uppercase text-slate font-normal">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-5 py-12 text-center text-stone/50 text-xs">
                    No leads found. Import a CSV to get started.
                  </td>
                </tr>
              ) : (
                filtered.map((lead) => (
                  <tr key={lead.id} className="border-b border-stone/10 hover:bg-stone/5 transition-colors">
                    <td className="px-5 py-4 font-light text-ivory/90">{lead.name}</td>
                    <td className="px-5 py-4 text-slate text-xs">{lead.city || '—'}</td>
                    <td className="px-5 py-4">
                      <a
                        href={`/${lead.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gold/70 hover:text-gold font-mono text-xs transition-colors"
                      >
                        /{lead.slug}
                      </a>
                    </td>
                    <td className="px-5 py-4">
                      {lead.visited ? (
                        <div>
                          <span className="text-xs text-sand/70">✓ {formatDate(lead.visitedAt)}</span>
                        </div>
                      ) : (
                        <span className="text-stone/40 text-xs">Not yet</span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-slate text-xs">{formatTime(lead.timeOnPage)}</td>
                    <td className="px-5 py-4">
                      {lead.response ? (
                        <span className={`text-xs px-2 py-1 border ${
                          lead.response === 'yes'
                            ? 'border-gold/40 text-gold'
                            : lead.response === 'maybe'
                            ? 'border-sand/30 text-sand'
                            : 'border-stone/30 text-stone/60'
                        }`}>
                          {RESPONSE_LABELS[lead.response]}
                        </span>
                      ) : (
                        <span className="text-stone/30 text-xs">—</span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-slate text-xs">
                      {lead.objection ? (OBJECTION_LABELS[lead.objection] || lead.objection) : '—'}
                    </td>
                    <td className="px-5 py-4 text-center">
                      {lead.whatsappClicked ? (
                        <span className="text-green-500/70 text-xs">✓</span>
                      ) : (
                        <span className="text-stone/30 text-xs">—</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Danger zone */}
        <div className="mt-12 border border-red-900/20 p-6">
          <h3 className="text-xs tracking-widest uppercase text-red-900/60 mb-4">Danger Zone</h3>
          {!confirmClear ? (
            <button
              onClick={() => setConfirmClear(true)}
              className="text-xs text-red-900/50 hover:text-red-400 border border-red-900/20 hover:border-red-900/40 px-4 py-2 transition-all duration-200"
            >
              Clear all lead data
            </button>
          ) : (
            <div className="flex items-center gap-4">
              <span className="text-xs text-red-400">Are you sure? This cannot be undone.</span>
              <button onClick={handleClearLeads} className="text-xs text-red-400 border border-red-800/40 px-4 py-2 hover:bg-red-900/10">
                Yes, clear all
              </button>
              <button onClick={() => setConfirmClear(false)} className="text-xs text-slate">
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
