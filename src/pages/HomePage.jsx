import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-obsidian relative overflow-hidden flex items-center justify-center px-6">

      {/* Background glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at center, rgba(184,150,92,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="relative z-10 text-center max-w-2xl"
      >

        <div className="w-12 h-px bg-gold/60 mx-auto mb-10" />

        <p className="tracking-[0.45em] uppercase text-gold/70 text-sm mb-8">
          EVOKE
        </p>

        <h1 className="font-display text-6xl md:text-8xl text-ivory font-light leading-tight">
          A private
          <br />
          invitation.
        </h1>

        <p className="mt-10 text-slate text-lg leading-8 max-w-xl mx-auto">
          This experience is reserved for individuals who previously
          expressed interest in EVOKE South Goa.
        </p>

        <p className="mt-5 text-stone/70">
          If you've received a personalised link,
          please use it to continue.
        </p>

        <div className="mt-14">
        <div className="mt-14">
        <p className="text-stone/60 italic text-lg">
        If you've received a personalised invitation,
        <br />
        please use your unique link to continue.
        </p>
</div>
        </div>

      </motion.div>
    </div>
  );
}