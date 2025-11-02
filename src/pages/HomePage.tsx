// src/pages/HomePage.tsx
import Hero from '../components/Hero';
import Services from '../components/Services';
import Programs from '../components/Programs';
import Testimonials from '../components/Testimonials';
import { motion } from 'framer-motion'; // 1. Import motion

// 2. Define the animation for all sections
const sectionVariants = {
  // This is the "fade away" state
  hidden: { opacity: 0.5, y: 30 }, 
  // This is the "come back" state
  visible: { opacity: 1, y: 0 },
};

const HomePage = () => {
  return (
    <>
      {/* 3. Wrap each section in a motion.section tag */}
      {/* We DO NOT use 'viewport={{ once: true }}' so it animates every time */}
      
      <motion.section 
        id="home"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.2 }} // Trigger when 20% of the section is in view
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <Hero /> 
      </motion.section>

      <motion.section 
        id="services"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.2 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <Services /> 
      </motion.section>

      <motion.section 
        id="programs"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.2 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <Programs />
      </motion.section>

      <motion.section 
        id="testimonials"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.2 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <Testimonials /> 
      </motion.section>
    </>
  );
};

export default HomePage;

