// src/components/Hero.tsx
import { HashLink } from 'react-router-hash-link';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    // 1. Apply the animated gradient
    <section 
      className="text-white py-20 md:py-32 overflow-hidden relative
                 bg-gradient-to-r from-brand-green-dark via-brand-green to-emerald-400
                 [background-size:400%_400%] animate-gradient-shift"
    >
      {/* 2. Floating Shapes (Unchanged) */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-12 h-12 bg-white/10 rounded-full"
        animate={{ 
          y: [0, -20, 0],
          x: [0, 10, 0],
        }}
        transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-1/3 right-1/4 w-16 h-16 bg-white/10 rounded-xl transform rotate-12"
        animate={{ 
          y: [0, -15, 0],
          x: [0, -10, 0],
        }}
        transition={{ duration: 8, ease: "easeInOut", repeat: Infinity, delay: 2 }}
      />
       <motion.div 
        className="absolute top-20 right-1/3 w-8 h-8 bg-white/10 rounded-lg transform rotate-45"
        animate={{ 
          y: [0, 10, 0],
          x: [0, -15, 0],
        }}
        transition={{ duration: 7, ease: "easeInOut", repeat: Infinity, delay: 1 }}
      />

      {/* 3. UPDATED: Removed the looping animation from the container */}
      <div className="container text-center relative z-10">
        
        {/* UPDATED: Text now fades in ONCE on load */}
        <motion.h1 
          className="text-4xl md:text-6xl font-bold max-w-3xl mx-auto leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          LOSE WEIGHT, GAIN ENERGY AND FEEL GREAT
        </motion.h1>
        
        {/* UPDATED: Text now fades in ONCE on load */}
        <motion.p 
          className="text-xl md:text-2xl font-light mt-6 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
        >
          Join our 21-day challenge and change your life from home.
        </motion.p>
        
        {/* UPDATED: Button now fades in ONCE on load */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
        >
          <HashLink 
            smooth 
            to="/#programs"
            className="bg-brand-green-light text-brand-green-dark font-bold py-4 px-10 rounded-lg text-lg shadow-lg 
                       inline-block
                       hover:bg-white hover:text-brand-green-dark transition-all duration: 300 
                       hover:-translate-y-1 active:scale-95
                       animate-glow" // <-- Glow animation remains
          >
            Start Your 3-Day Trial
          </HashLink>
        </motion.div>
        
      </div>
    </section>
  );
};

export default Hero;

