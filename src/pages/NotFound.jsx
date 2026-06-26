/**
 * EVOKE Reconnect – 404 / Not Found
 * Elegant, brand-consistent 404.
 */

import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-obsidian flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="font-display text-8xl font-light text-stone/100 mb-8">!!!</div>

        <div className="w-12 h-px bg-gold/30 mx-auto mb-8" />

        <h1 className="font-display text-3xl font-light text-ivory/60 mb-4">
        Private Invitation Required. 
        This experience is accessible only through a personalised invitation.
        </h1>

        <p className="text-slate text-xl font-light max-w-xs mx-auto leading-relaxed">
        If you've received a private EVOKE link,
        please check that the URL is complete.

        Otherwise, contact EVOKE South Goa.
        </p>

        <div className="mt-12 flex items-center justify-center gap-3">
          <div className="w-6 h-px bg-stone/30" />
          <span className="font-display text-ivory/100 italic text-xl">EVOKE</span>
          <div className="w-6 h-px bg-stone/30" />
        </div>
      </motion.div>
    </div>
  );
}
