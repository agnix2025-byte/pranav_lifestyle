// src/components/Services.tsx
import ServiceCard from './ServiceCard';
import { motion } from 'framer-motion'; // 1. Import motion

// Data is unchanged, just copied from your last version
const serviceListData = [
  { title: 'Immune & Sports Nutrition', description: 'நோய் எதிர்ப்பு சக்தி அதிகரிக்க விளையாட்டு வீரர்களுக்கான ஊக்கச்சத்து', imageSrc: '/imgs/imune.png' },
  { title: 'Kids Nutrition', description: 'குழந்தைகள் ஊட்டச்சத்து', imageSrc: '/imgs/kids_nutrition.jpg' },
  { title: 'Bone Health', description: 'எலும்பு ஆரோக்கியம்', imageSrc: '/imgs/bone_health.webp' },
  { title: 'Heart Health', description: 'இதய ஆரோக்கியம்', imageSrc: '/imgs/heart_health.jpg' },
  { title: 'Skin Nutrition', description: 'முகப்பொலிவு/தோல் ஆரோக்கியம்', imageSrc: '/imgs/skin_nutrition.jpg' },
  { title: 'Digestive Health', description: 'செரிமான ஆரோக்கியம்', imageSrc: '/imgs/digestive_health.jpg' },
  { title: 'Weight Loss / Gain & Sustain', description: 'உடல் எடை குறைக்க / அதிகரிக்க, சீராக வைத்திருக்க', imageSrc: '/imgs/weight_loss.webp' },
  { title: 'Brain Health', description: 'மூளை ஆரோக்கியம்', imageSrc: '/imgs/brain_health.jpg' },
  { title: 'Women Health', description: 'பெண்களுக்கான ஆரோக்கியம்', imageSrc: '/imgs/women_health.png' },
  { title: 'Men Health', description: 'ஆண்களுக்கான ஆரோக்கியம்', imageSrc: '/imgs/men_health.jpg' },
];

// 2. Define animation variants for the grid container
const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Each card will animate 0.1s after the previous one
    },
  },
};

const Services = () => {
  return (
    <section className="container py-16 md:py-24 overflow-hidden"> {/* 3. Add overflow-hidden */}
      
      {/* 4. Animate the title */}
      <motion.h2 
        className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        Our Services / எங்கள் சேவைகள்
      </motion.h2>
      
      {/* 5. Animate the grid container */}
      <motion.div 
        className="flex flex-wrap justify-center gap-8" // 6. Set a consistent gap
        variants={gridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }} // Trigger when 10% of the grid is visible
      >
        
        {serviceListData.map((service) => (
          // The ServiceCard component already has its own animation from the context.
          // The staggerChildren in gridVariants will make them appear one by one.
          <ServiceCard 
            key={service.title} 
            title={service.title} 
            description={service.description}
            imageSrc={service.imageSrc}
          />
        ))}

      </motion.div>
    </section>
  );
};

export default Services;

