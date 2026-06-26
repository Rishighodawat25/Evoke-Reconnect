/**
 * EVOKE Reconnect – Hero Section
 *
 * Full-screen cinematic opener.
 * Dark luxury aesthetic with name, villa count animation.
 * Uses a real Goa/villa Unsplash video (or placeholder gradient).
 */

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

// Animated counter component
function AnimatedCounter({ from, to, duration = 2000, className = '' }) {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const range = to - from;
    const step = (timestamp) => {
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(from + range * eased));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, from, to, duration]);

  return (
    <span ref={ref} className={className}>
      {count}
    </span>
  );
}

const STAGGER = {
  container: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.35, delayChildren: 0.8 } },
  },
  item: {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } },
  },
};

export default function HeroSection({ firstName }) {
  const [phase, setPhase] = useState(0);
  // Phase 0: name greeting
  // Phase 1: "At that time" + 11 counter
  // Phase 2: "Today" + 4 counter

  useEffect(() => {
    // Orchestrate the reveal sequence
    const t1 = setTimeout(() => setPhase(1), 3200);
    const t2 = setTimeout(() => setPhase(2), 6000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background: cinematic gradient simulating luxury villa / Goa dusk */}
      <div
  className="absolute inset-0 z-0"
  style={{
    backgroundImage: `
      linear-gradient(
        rgba(5,5,5,0.75),
        rgba(5,5,5,0.85)
      ),
      url('/images/PHOTO-2026-06-22-14-03-36.jpg')
    `,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }}
/>

      {/* Atmospheric texture overlays */}
      <div
        className="absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.15'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />

      {/* Subtle light leak – upper right */}
      <div
        className="absolute top-0 right-0 w-96 h-96 opacity-10 z-0"
        style={{
          background: 'radial-gradient(circle, rgba(184, 150, 92, 0.4) 0%, transparent 70%)',
        }}
      />

      {/* Bottom gradient fade to next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-64 z-10"
        style={{
          background: 'linear-gradient(to bottom, transparent, #0A0A08)',
        }}
      />

      {/* EVOKE wordmark – top */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.3 }}
        className="absolute top-8 left-1/2 -translate-x-1/2 z-20"
      >
        <span className="font-display text-sand/70 tracking-[0.4em] uppercase text-sm font-semibold">
          EVOKE
        </span>
      </motion.div>

      {/* Main content */}
      <div className="relative z-20 text-center px-6 max-w-3xl mx-auto">

        {/* Phase 0: Name greeting */}
        <AnimatePresence>
          {phase >= 0 && (
            <motion.div
              key="greeting"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Thin decorative line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="w-12 h-px bg-gold/50 mx-auto mb-8"
              />

              <h1 className="font-display text-8xl md:text-[10rem] font-medium text-ivory leading-none tracking-tight">
                {firstName}<span className="text-gold">.</span>
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="mt-6 text-sand/80 text-base tracking-[0.35em] uppercase font-medium"
              >
                We first connected regarding
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="mt-2 font-display text-2xl md:text-4xl text-sand/80 italic font-medium"
              >
                EVOKE South Goa.
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Phase 1: At that time – 11 villas */}
        <AnimatePresence>
          {phase >= 1 && (
            <motion.div
              key="then"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-16"
            >
              <p className="text-gold/90 text-xl tracking-widest uppercase mb-8">
                At that time
              </p>
              <div className="flex items-end justify-center gap-3">
                <span className="font-display text-8xl md:text-[11rem] font-medium text-[#D4AF7A] leading-none"
                style={{
                  background: 'linear-gradient(135deg, #B8965C 0%,rgb(208, 179, 15) 50%, #B8965C 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  <AnimatedCounter from={0} to={11} duration={1500} className="text-[#D4AF7A]" />
                </span>
                <span className="font-display text-3xl gold/60 italic mb-4"
                style={{
                  background: 'linear-gradient(135deg, #B8965C 0%,rgb(208, 179, 15) 50%, #B8965C 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
                >
                  villas available
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Phase 2: Today – 4 villas */}
        <AnimatePresence>
          {phase >= 2 && (
            <motion.div
              key="now"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-12"
            >
              <p className="text-gold/90 text-xl tracking-widest uppercase mb-8">
                Today
              </p>
              <div className="flex items-end justify-center gap-3">
                <span className="font-display text-8xl md:text-[11rem] font-medium text-sand/90 leading-none"
                  style={{
                    background: 'linear-gradient(135deg, #B8965C 0%,rgb(208, 179, 15) 50%, #B8965C 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}>
                  <AnimatedCounter from={11} to={4} duration={1800} className="text-[#D4AF7A]" />
                </span>
                <span className="font-display text-3xl text-gold/100 italic mb-4">
                
                  villas remaining
                </span>
              </div>

              {/* Scroll cue */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="mt-20 flex flex-col items-center gap-3"
              >
                <span className="text-slate/50 text-xs tracking-widest uppercase">
                  Continue
                </span>
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                  className="w-px h-10 bg-gradient-to-b from-gold/40 to-transparent"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
