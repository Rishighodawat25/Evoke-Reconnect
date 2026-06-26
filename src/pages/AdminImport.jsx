/**
 * EVOKE Reconnect – CSV Import Page
 *
 * Drag-and-drop CSV upload with Papa Parse.
 * Shows preview before committing.
 * Generates slugs and stores leads to localStorage.
 */

import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Papa from 'papaparse';
import { processLeadsFromCSV } from '../utils/slugUtils';

const REQUIRED_FIELDS = ['name', 'email'];
const OPTIONAL_FIELDS = ['phone', 'city'];

export default function AdminImport() {
  const navigate = useNavigate();
  const fileRef = useRef(null);

  const [dragOver, setDragOver] = useState(false);
  const [parseError, setParseError] = useState(null);
  const [preview, setPreview] = useState(null); // { rows, headers, valid }
  const [importResult, setImportResult] = useState(null); // { added, total }
  const [importing, setImporting] = useState(false);

  const processFile = useCallback((file) => {
    setParseError(null);
    setPreview(null);
    setImportResult(null);

    if (!file || !file.name.endsWith('.csv')) {
      setParseError('Please upload a .csv file.');
      return;
    }

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (h) => h.trim().toLowerCase(),
      complete: (results) => {
        const headers = results.meta.fields || [];
        const missing = REQUIRED_FIELDS.filter((f) => !headers.includes(f));

        if (missing.length > 0) {
          setParseError(`Missing required columns: ${missing.join(', ')}`);
          return;
        }

        setPreview({
          rows: results.data.slice(0, 5), // show first 5 for preview
          totalRows: results.data.length,
          allRows: results.data,
          headers,
          valid: true,
        });
      },
      error: (err) => {
        setParseError(`Parse error: ${err.message}`);
      },
    });
  }, []);

  function handleDrop(e) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    processFile(file);
  }

  function handleFileChange(e) {
    processFile(e.target.files[0]);
  }

  async function handleImport() {
    if (!preview?.allRows) return;
    setImporting(true);
    // Simulate brief async (could be an API call)
    await new Promise((r) => setTimeout(r, 600));
    const result = processLeadsFromCSV(preview.allRows);
    setImportResult(result);
    setImporting(false);
    setPreview(null);
  }

  return (
    <div className="min-h-screen bg-obsidian text-ivory">
      {/* Header */}
      <header className="border-b border-stone/20 px-6 md:px-10 py-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-light">Import Leads</h1>
          <p className="text-xs text-slate mt-1 tracking-widest uppercase">CSV Upload</p>
        </div>
        <button
          onClick={() => navigate('/admin')}
          className="text-xs text-slate hover:text-ivory tracking-widest uppercase border border-stone/20 hover:border-stone/40 px-4 py-2 transition-all"
        >
          ← Dashboard
        </button>
      </header>

      <div className="px-6 md:px-10 py-12 max-w-3xl">

        {/* CSV Format guide */}
        <div className="mb-10 p-6 border border-stone/20">
          <p className="text-xs tracking-widest uppercase text-slate mb-4">Required CSV Format</p>
          <div className="font-mono text-xs text-sand/70 bg-stone/10 p-4 overflow-x-auto">
            <div className="text-gold/60 mb-2"># Columns: name, email, phone (optional), city (optional)</div>
            <div>name,email,phone,city</div>
            <div>Amit Shah,amit@email.com,9876543210,Mumbai</div>
            <div>Rahul Mehta,rahul@email.com,9876543211,Pune</div>
          </div>
          <p className="mt-4 text-xs text-stone/50">
            Duplicate emails are automatically skipped. Slugs are generated per lead.
          </p>
        </div>

        {/* Drop Zone */}
        {!preview && !importResult && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileRef.current?.click()}
            className={`
              relative border-2 border-dashed cursor-pointer
              flex flex-col items-center justify-center py-20 px-8 text-center
              transition-all duration-300
              ${dragOver
                ? 'border-gold/60 bg-gold/5'
                : 'border-stone/30 hover:border-stone/50 hover:bg-stone/5'
              }
            `}
          >
            <input
              ref={fileRef}
              type="file"
              accept=".csv"
              className="hidden"
              onChange={handleFileChange}
            />
            <div className="w-12 h-12 border border-stone/30 flex items-center justify-center mb-6">
              <svg className="w-5 h-5 text-slate" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <p className="text-ivory/60 text-sm mb-2">Drop your CSV here</p>
            <p className="text-stone/40 text-xs">or click to browse</p>
          </motion.div>
        )}

        {/* Parse Error */}
        <AnimatePresence>
          {parseError && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 p-4 border border-red-900/40 text-red-400/80 text-sm"
            >
              {parseError}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Preview */}
        <AnimatePresence>
          {preview && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <span className="text-xs tracking-widest uppercase text-slate mr-3">Preview</span>
                  <span className="text-gold text-sm">{preview.totalRows} leads found</span>
                </div>
                <button
                  onClick={() => { setPreview(null); setParseError(null); }}
                  className="text-xs text-stone/50 hover:text-slate"
                >
                  Change file
                </button>
              </div>

              <div className="overflow-x-auto border border-stone/20 mb-6">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-stone/20">
                      {['Name', 'Email', 'Phone', 'City'].map((h) => (
                        <th key={h} className="px-4 py-3 text-left text-slate font-normal tracking-widest uppercase">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {preview.rows.map((row, i) => (
                      <tr key={i} className="border-b border-stone/10">
                        <td className="px-4 py-3 text-ivory/80">{row.name}</td>
                        <td className="px-4 py-3 text-slate">{row.email}</td>
                        <td className="px-4 py-3 text-stone/60">{row.phone || '—'}</td>
                        <td className="px-4 py-3 text-stone/60">{row.city || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {preview.totalRows > 5 && (
                  <div className="px-4 py-3 text-stone/40 text-xs border-t border-stone/10">
                    + {preview.totalRows - 5} more rows
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={handleImport}
                  disabled={importing}
                  className="px-8 py-4 border border-gold/50 text-gold hover:bg-gold/5 text-xs tracking-widest uppercase transition-all duration-300 disabled:opacity-50"
                >
                  {importing ? 'Importing...' : `Import ${preview.totalRows} leads`}
                </button>
                <p className="text-stone/40 text-xs">
                  Unique slugs will be generated for each lead.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success */}
        <AnimatePresence>
          {importResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 border border-gold/30 text-center"
            >
              <div className="font-display text-5xl text-gold mb-4">{importResult.added}</div>
              <div className="text-xs tracking-widest uppercase text-slate mb-6">
                new leads imported
              </div>
              <p className="text-stone/50 text-sm mb-8">
                {importResult.total} total leads in system.
              </p>
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => navigate('/admin')}
                  className="px-6 py-3 border border-gold/40 text-gold text-xs tracking-widest uppercase hover:bg-gold/5 transition-all"
                >
                  View Dashboard
                </button>
                <button
                  onClick={() => setImportResult(null)}
                  className="px-6 py-3 border border-stone/30 text-slate text-xs tracking-widest uppercase hover:border-stone/50 transition-all"
                >
                  Import More
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sample CSV download */}
        <div className="mt-16 p-6 border border-stone/10 bg-stone/5">
          <p className="text-xs tracking-widest uppercase text-stone/50 mb-4">Need a template?</p>
          <button
            onClick={() => {
              const csv = 'name,email,phone,city\nAmit Shah,amit@example.com,9876543210,Mumbai\nRahul Mehta,rahul@example.com,9876543211,Pune\nPreeti Nair,preeti@example.com,9876543212,Bangalore';
              const blob = new Blob([csv], { type: 'text/csv' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url; a.download = 'evoke-leads-sample.csv';
              a.click(); URL.revokeObjectURL(url);
            }}
            className="text-xs text-stone/50 hover:text-slate border border-stone/20 hover:border-stone/40 px-4 py-2 tracking-widest uppercase transition-all"
          >
            Download sample CSV
          </button>
        </div>
      </div>
    </div>
  );
}
