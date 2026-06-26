/**
 * EVOKE Reconnect – Response: NOT ANYMORE
 *
 * Graceful, dignified acknowledgment. No pressure.
 */

import { motion } from 'framer-motion';

export default function ResponseNo({ firstName }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-24 text-center relative">
      <div className="max-w-md relative z-10">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
          className="w-8 h-px bg-stone mx-auto mb-12"
        />

        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="font-display text-4xl md:text-5xl font-light text-ivory/70 mb-6"
        >
          Thank you for<br />
          <em className="text-ivory/50">your time.</em>
        </motion.h3>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="text-slate text-sm font-light leading-relaxed max-w-xs mx-auto"
        >
          Plans evolve. We understand completely.
          <br /><br />
          If something ever brings you back to the idea of Goa — we'll be here, quietly.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="mt-16 flex items-center justify-center gap-3"
        >
          <div className="w-6 h-px bg-stone/40" />
          <span className="text-stone/30 font-display italic text-sm">EVOKE</span>
          <div className="w-6 h-px bg-stone/40" />
        </motion.div>
      </div>
    </div>
  );
}
