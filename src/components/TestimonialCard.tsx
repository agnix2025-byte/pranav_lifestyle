// src/components/TestimonialCard.tsx
import { motion } from 'framer-motion';

interface TestimonialCardProps {
  name: string;
  beforeSrc: string;
  afterSrc: string;
  reviewEnglish: string;
  reviewTamil: string;
  onImageClick: () => void; // 1. ADD NEW PROP to handle the click
}

const TestimonialCard = ({ name, beforeSrc, afterSrc, reviewEnglish, reviewTamil, onImageClick }: TestimonialCardProps) => {
  
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-lg p-6 m-4 w-full max-w-sm"
      
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
    >
      
      <div className="flex justify-around gap-4">
        <div className="flex-1 text-center">
          <img 
            src={beforeSrc} 
            alt="Before" 
            // 2. ADD CLICK HANDLER and hover effects
            className="w-full aspect-[3/4] object-cover rounded-lg border border-gray-200 cursor-pointer transition-transform duration-300 hover:scale-105"
            onClick={onImageClick}
          />
          <p className="text-sm font-semibold text-gray-500 mt-2 uppercase tracking-wider">
            BEFORE
          </p>
        </div>
        <div className="flex-1 text-center">
          <img 
            src={afterSrc} 
            alt="After" 
            // 3. ADD CLICK HANDLER and hover effects
            className="w-full aspect-[3/4] object-cover rounded-lg border border-gray-200 cursor-pointer transition-transform duration-300 hover:scale-105"
            onClick={onImageClick}
          />
          <p className="text-sm font-semibold text-gray-500 mt-2 uppercase tracking-wider">
            AFTER
          </p>
        </div>
      </div>

      <h3 className="text-xl font-bold text-brand-green-dark text-center mt-6 mb-4">
        {name}
      </h3>

      <div className="space-y-3">
        <p className="text-left italic text-gray-700 px-3 border-l-4 border-brand-green">
          "{reviewEnglish}"
        </p>
        <p className="text-left italic text-gray-600 px-3 border-l-4 border-brand-green-light">
          "{reviewTamil}"
        </p>
      </div>

    </motion.div>
  );
};

export default TestimonialCard;

