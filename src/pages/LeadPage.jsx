/**
 * EVOKE Reconnect – Lead Personalized Page
 * The full cinematic experience for each lead.
 *
 * Sections:
 *   1. Hero – cinematic with name + villa count
 *   2. Split – city vs. villa lifestyle comparison
 *   3. Decision – "Is Goa still part of your plan?"
 *   4A/4B/4C – Response flows (YES / MAYBE / NO)
 *   Footer
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import NotFound from './NotFound';

import { getLeadBySlug } from '../utils/slugUtils';
import {
  trackPageView,
  trackTimeOnPage,
  trackResponse,
  trackObjection,
  trackWhatsApp,
} from '../utils/analytics';
import { getWhatsAppUrl } from '../utils/whatsappUtils';

import HeroSection from '../components/HeroSection';
import SplitSection from '../components/SplitSection';
import DecisionSection from '../components/DecisionSection';
import ResponseYes from '../components/ResponseYes';
import ResponseMaybe from '../components/ResponseMaybe';
import ResponseNo from '../components/ResponseNo';

const FADE = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
};

export default function LeadPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [lead, setLead] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [response, setResponse] = useState(null); // 'yes' | 'maybe' | 'no'

  const startTimeRef = useRef(Date.now());
  const pageTimerRef = useRef(null);

  // Resolve lead from slug
  useEffect(() => {
    const found = getLeadBySlug(slug);
    if (!found) {
      setNotFound(true);
      return;
    }
    setLead(found);
    trackPageView(slug);

    // Track time on page every 10 seconds
    pageTimerRef.current = setInterval(() => {
      const elapsed = Math.round((Date.now() - startTimeRef.current) / 1000);
      trackTimeOnPage(slug, elapsed);
    }, 10000);

    // Track on page leave
    const onUnload = () => {
      const elapsed = Math.round((Date.now() - startTimeRef.current) / 1000);
      trackTimeOnPage(slug, elapsed);
    };
    window.addEventListener('beforeunload', onUnload);

    return () => {
      clearInterval(pageTimerRef.current);
      window.removeEventListener('beforeunload', onUnload);
      onUnload();
    };
  }, [slug]);

  const handleResponse = useCallback(
    (choice) => {
      setResponse(choice);
      trackResponse(slug, choice);
      // Smooth scroll to response section
      setTimeout(() => {
        document.getElementById('response-section')?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 200);
    },
    [slug]
  );

  const handleObjection = useCallback(
    (objection) => {
      trackObjection(slug, objection);
    },
    [slug]
  );

  const handleWhatsApp = useCallback(
    (message) => {
      trackWhatsApp(slug);
      const url = getWhatsAppUrl(lead, message);
      window.open(url, '_blank', 'noopener,noreferrer');
    },
    [slug, lead]
  );

  if (notFound) {
    return <NotFound />;
  }
  

  if (!lead) {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-1 h-1 rounded-full bg-gold animate-ping"
        />
      </div>
    );
  }

  const firstName = lead.name.split(' ')[0];

  return (
    <div className="bg-obsidian min-h-screen overflow-x-hidden">
      {/* SECTION 1: Cinematic Hero */}
      <HeroSection firstName={firstName} city={lead.city} />

      {/* SECTION 2: Split Comparison */}
      <SplitSection firstName={firstName} />

      {/* SECTION 3: Decision */}
      <DecisionSection onResponse={handleResponse} />

      {/* SECTION 4: Response Flow */}
      <section id="response-section" className="min-h-screen">
        <AnimatePresence mode="wait">
        {response === null && (
        <motion.div
        key="quote"
        variants={FADE}
        initial="hidden"
        animate="visible"
        className="min-h-screen flex items-center justify-center px-6"
      >
        <div className="text-center max-w-4xl">

        <p className="text-gold/50 uppercase tracking-[0.4em] text-sm mb-10">
         A Thought
        </p>

        <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-ivory leading-tight">
        The right time.
        The right place.
        The right view.
        <br />
        <span className="text-gold italic">
        Perhaps all that's left is the decision. <br />
        4 Left.
        </span>
         </h2>

        </div>
        
        </motion.div>
          )}
          {response === 'yes' && (
            <motion.div key="yes" variants={FADE} initial="hidden" animate="visible" exit="hidden">
              <ResponseYes firstName={firstName} onWhatsApp={handleWhatsApp} />
            </motion.div>
          )}
          {response === 'maybe' && (
            <motion.div key="maybe" variants={FADE} initial="hidden" animate="visible" exit="hidden">
              <ResponseMaybe firstName={firstName} onObjection={handleObjection} onWhatsApp={handleWhatsApp} />
            </motion.div>
          )}
          {response === 'no' && (
            <motion.div key="no" variants={FADE} initial="hidden" animate="visible" exit="hidden">
              <ResponseNo firstName={firstName} />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 text-center border-t border-stone/30">
        <p className="text-slate text-xs tracking-widest uppercase font-light max-w-md mx-auto leading-relaxed">
          This page was created because you had previously expressed interest in EVOKE South Goa.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <div className="w-8 h-px bg-gold/30" />
          <span className="text-gold/40 font-display italic text-sm">EVOKE</span>
          <div className="w-8 h-px bg-gold/30" />
        </div>
      </footer>
    </div>
  );
}
