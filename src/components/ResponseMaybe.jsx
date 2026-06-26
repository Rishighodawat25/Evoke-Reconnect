/**
 * EVOKE Reconnect – Response: MAYBE
 *
 * Asks "What stopped you?" with elegant option chips.
 * Stores objection, then thanks and offers WhatsApp.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const OBJECTIONS = [
  { id: 'budget', label: 'Budget', detail: "The numbers weren't quite right." },
  { id: 'timing', label: 'Timing', detail: 'Life got in the way.' },
  { id: 'location', label: 'Location', detail: 'Still figuring out where.' },
  { id: 'alternatives', label: 'Looking at alternatives', detail: 'Exploring other options.' },
  { id: 'never_got_around', label: 'Never got around to it', detail: 'It stayed on the list.' },
];

const STAGGER = {
  container: { hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.5 } } },
  item: {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  },
};

export default function ResponseMaybe({ firstName, onObjection, onWhatsApp }) {
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  function handleSelect(id) {
    setSelected(id);
    onObjection(id);
    setTimeout(() => setSubmitted(true), 600);
  }

  const waMessage = `Hi Rishi, I visited the EVOKE page. I'm ${firstName} – I'm still considering Goa but held back by ${
    OBJECTIONS.find((o) => o.id === selected)?.label?.toLowerCase() || 'a few things'
  }. Would love to chat when you have a moment.`;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-24 text-center relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, rgba(184, 150, 92, 0.05) 0%, transparent 65%)',
        }}
      />

      <div className="max-w-2xl w-full relative z-10">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="question"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8 }}
                className="w-12 h-px bg-sand/40 mx-auto mb-12"
              />

              <h3 className="font-display text-4xl md:text-5xl font-light text-ivory mb-4">
                What stopped you<br />
                <em className="text-sand/70">from moving forward?</em>
              </h3>

              <p className="text-slate text-sm mb-14 font-light">
                Your honesty helps us understand, not pressure you.
              </p>

              <motion.div
                variants={STAGGER.container}
                initial="hidden"
                animate="visible"
                className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center"
              >
                {OBJECTIONS.map((obj) => (
                  <motion.button
                    key={obj.id}
                    variants={STAGGER.item}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleSelect(obj.id)}
                    disabled={selected !== null}
                    className={`
                      relative px-7 py-5 border text-left transition-all duration-500 group
                      ${selected === obj.id
                        ? 'border-sand/60 bg-sand/5 text-sand'
                        : 'border-stone/40 text-ivory/50 hover:border-sand/40 hover:text-ivory/80'
                      }
                      ${selected && selected !== obj.id ? 'opacity-25' : ''}
                      disabled:cursor-default
                    `}
                  >
                    <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-current opacity-40 group-hover:opacity-80 transition-opacity" />
                    <div className="font-display text-xl font-light leading-none mb-1">
                      {obj.label}
                    </div>
                    <div className="text-xs text-current/40 font-light tracking-wide">
                      {obj.detail}
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="thanks"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8 }}
                className="w-12 h-px bg-gold/50 mx-auto mb-12"
              />

              <h3 className="font-display text-4xl md:text-5xl font-light text-ivory mb-6">
                Thank you.
              </h3>

              <p className="text-sand/60 font-display text-xl italic font-light mb-4">
                Your feedback is genuinely valuable.
              </p>

              <p className="text-slate text-sm font-light max-w-sm mx-auto mb-14 leading-relaxed">
                We understand that timing and life circumstances change.
                If you ever want to revisit the conversation — on your terms — we're here.
              </p>

              <motion.button
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onWhatsApp(waMessage)}
                className="group relative inline-flex items-center gap-4 px-10 py-5 border border-sand/30 text-sand/70 hover:border-sand/60 hover:text-sand hover:bg-sand/5 transition-all duration-500"
              >
                <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-current" />
                <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-current" />

                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>

                <span className="tracking-widest text-xs uppercase">Talk to Rishi</span>
              </motion.button>

              <p className="mt-6 text-stone/40 text-xs">
                No pressure. Just a conversation.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
