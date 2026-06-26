/**
 * EVOKE Reconnect – Response: YES
 *
 * "Let's reconnect." with WhatsApp CTA.
 */

import { motion } from 'framer-motion';

export default function ResponseYes({ firstName, onWhatsApp }) {
  const message = `Hi Rishi, I just saw the EVOKE page. I'm ${firstName} and I'm interested in knowing more about what's available.`;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-24 text-center relative">
      {/* Gold ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, rgba(184, 150, 92, 0.08) 0%, transparent 65%)',
        }}
      />

      <div className="max-w-xl relative z-10">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
          className="w-12 h-px bg-gold mx-auto mb-12"
        />

        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="font-display text-5xl md:text-6xl font-light text-ivory mb-4"
        >
          Let's reconnect.
        </motion.h3>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="text-slate text-sm font-light leading-relaxed max-w-sm mx-auto mb-14"
        >
          Rishi will personally walk you through what's still available,
          what's changed, and what might work for you.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onWhatsApp(message)}
          className="group relative inline-flex items-center gap-4 px-10 py-5 border border-gold/60 text-gold hover:border-gold hover:bg-gold/5 transition-all duration-500"
        >
          {/* Corner accents */}
          <span className="absolute top-0 left-0 w-4 h-4 border-t border-l border-gold" />
          <span className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-gold" />

          {/* WhatsApp icon */}
          <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>

          <span className="tracking-widest text-xs uppercase">Talk to Rishi</span>
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-8 text-slate/70 text-xs"
        >
          Opens WhatsApp. No auto-messages.
        </motion.p>
      </div>
    </div>
  );
}
