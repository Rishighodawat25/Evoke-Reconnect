/**
 * EVOKE Reconnect – Decision Section
 *
 * "Is Goa still part of your plan?"
 * Three large, premium, tactile response buttons.
 */

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const OPTIONS = [
  {
    id: 'yes',
    label: 'Yes',
    sub: 'Goa is still on my mind.',
    color: 'gold',
    hoverClass: 'hover:border-gold hover:text-gold',
  },
  {
    id: 'maybe',
    label: 'Maybe',
    sub: "I'm not sure yet.",
    color: 'sand',
    hoverClass: 'hover:border-sand hover:text-sand',
  },
  {
    id: 'no',
    label: 'Not anymore.',
    sub: "My plans have changed.",
    color: 'stone',
    hoverClass: 'hover:border-slate hover:text-ivory/60',
  },
];

export default function DecisionSection({ onResponse }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [selected, setSelected] = useState(null);

  function handleSelect(id) {
    setSelected(id);
    onResponse(id);
  }

  return (
    <section
      ref={ref}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-24 relative"
    >
      {/* Background Image */}
    <img
    src="/images/c61af66e722a9161efeacfae54186ae2.jpg"
    alt="EVOKE beach"
    className="absolute inset-0 w-full h-full object-cover"
    />

      {/* Dark Overlay */}
    <div className="absolute inset-0 bg-black/75 backdrop-blur-[2px]" />
      {/* Ambient center glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(184, 150, 92, 0.04) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-20 max-w-4xl w-full text-center">
        {/* Pre-headline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-gold/40 text-xs tracking-widest uppercase mb-10"
        >
          A moment of honesty
        </motion.p>

        {/* Main question */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl md:text-7xl font-light text-ivory leading-tight mb-4 text-balance"
        >
          Is Goa still part<br />
          <em className="text-sand/80">of your plan?</em>
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="w-12 h-px bg-gold/30 mx-auto my-10"
        />

        {/* Response buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          {OPTIONS.map((opt, i) => (
            <motion.button
              key={opt.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.1 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleSelect(opt.id)}
              className={`
                group relative px-8 py-6 border rounded-none
                text-left transition-all duration-500
                ${selected === opt.id
                  ? 'border-gold bg-gold/10 text-gold'
                  : `border-stone/70 text-ivory/80 ${opt.hoverClass}`
                }
                disabled:cursor-default
              `}
              style={{ minWidth: '160px' }}
            >
              {/* Corner accent */}
              <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-current opacity-50 group-hover:opacity-100 transition-opacity" />
              <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-current opacity-50 group-hover:opacity-100 transition-opacity" />

              <div className="font-display text-3xl md:text-4xl font-light leading-none mb-2">
                {opt.label}
              </div>
              <div className="text-xs tracking-widest uppercase text-current/50 font-light">
                {opt.sub}
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Quiet note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.8 }}
          className="mt-12 text-stone/50 text-xs font-light tracking-wide"
        >
          Your answer helps us understand where you are.
          <br />
          Nothing will be sent automatically.
        </motion.p>
      </div>
    </section>
  );
}
