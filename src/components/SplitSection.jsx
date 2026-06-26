/**
 * EVOKE Reconnect – Split Section
 *
 * Full-screen split: city life vs. villa life.
 * Left: dark grey urban texture / Right: lush green villa aesthetic.
 * Headline asks the emotional question.
 */

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const FADE_LEFT = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } },
};

const FADE_RIGHT = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 } },
};

const FADE_UP = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 } },
};

export default function SplitSection({ firstName }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col overflow-hidden">

      {/* Split panels */}
      <div className="flex-1 flex flex-col md:flex-row relative">

        {/* LEFT – City / Urban */}
        <motion.div
          variants={FADE_LEFT}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="relative flex-1 min-h-64 md:min-h-screen overflow-hidden"
        >
          {/* Urban aesthetic – dark concrete tones */}
          <motion.video
           autoPlay
           muted
           loop
           playsInline
           className="absolute inset-0 w-full h-full object-cover"
           animate={{
            scale: [1, 1.08, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          >
          <source src="/videos/traffic_compressed.mp4" type="video/mp4" />
          </motion.video>

<div className="absolute inset-0 bg-black/50" />

          {/* Urban grid / concrete texture */}
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }}
          />
          {/* Smog/haze overlay */}
          <div
            className="absolute inset-0 opacity-60"
            style={{
              background: 'radial-gradient(ellipse at 50% 30%, rgba(80,70,55,0.3) 0%, transparent 70%)',
            }}
          />

          {/* City label */}
          <div className="absolute bottom-8 left-8 right-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8, duration: 1 }}
            >
              <span className="text-xs tracking-[0.3em] uppercase text-stone/80 font-light">
                {firstName ? `${firstName}'s city` : 'Your city'}
              </span>
              <p className="mt-2 font-display text-4xl md:text-3xl text-white/70 italic font-medium leading-snug">
                Every morning,<br />the same rush.
              </p>
            </motion.div>
          </div>

          {/* Abstract city "silhouette" */}
          
        </motion.div>

        {/* Divider line */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px z-10"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(212, 175, 122, 0.9) 30%, rgba(212, 175, 122, 0.9) 70%, transparent 100%)',
            transform: 'translateX(-50%)',
          }}
        />

        {/* RIGHT – Villa / Goa */}
        <motion.div
          variants={FADE_RIGHT}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="relative flex-1 min-h-64 md:min-h-screen overflow-hidden"
        >
          {/* Villa / Goa aesthetic – deep greens and gold */}
          <motion.video
           autoPlay
           muted
           loop
           playsInline
           className="absolute inset-0 w-full h-full object-cover"
           animate={{
            scale: [1, 1.08, 1]
  }}
           transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
  }}
>
  <source src="/videos/villa_render_compressed.mp4" type="video/mp4" />
</motion.video>

<div className="absolute inset-0 bg-black/35" />

<div className="absolute inset-0 bg-black/40" />
          {/* Dappled light texture – simulating villa / pool light */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background: `
                radial-gradient(ellipse at 30% 60%, rgba(184, 150, 92, 0.25) 0%, transparent 50%),
                radial-gradient(ellipse at 70% 30%, rgba(100, 160, 120, 0.15) 0%, transparent 50%)
              `,
            }}
          />

          {/* Abstract palm / villa geometry */}

          {/* Villa label */}
          <div className="absolute bottom-8 left-8 right-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1, duration: 1 }}
            >
              <span className="text-xs tracking-[0.3em] uppercase text-gold/60 font-medium">
                EVOKE South Goa
              </span>
              <p className="mt-2 font-display text-4xl md:text-3xl text-sand/70 italic font-medium leading-snug">
                A different life<br />was always possible.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Headline overlay */}
      <div className="relative z-20 py-20 px-6 text-center"
        style={{
          background: 'linear-gradient(to bottom, #0A0A08, #0A0A08)',
        }}
      >
        <motion.div
          variants={FADE_UP}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <p className="text-gold/80 text-xl tracking-[0.4em] uppercase mb-10 font-medium">
            A question
          </p>
          <h2 className="font-display text-6xl md:text-8xl lg:text-[7rem] font-light text-ivory leading-[1.1]"> 
            Which view would you rather<br />
            <em className="text-gold/100">wake up to?</em>
          </h2>
          <p className="mt-8 text-slate text-sm md:text-base font-light max-w-md mx-auto leading-relaxed">
            You once explored the possibility of owning a villa in Goa.
            <br />
            That conversation was never finished.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
