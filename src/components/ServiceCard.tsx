// src/components/ServiceCard.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Tilt } from 'react-tilt'; // 1. Import Tilt

export interface ServiceCardProps {
  title: string;
  description: string;
  imageSrc: string;
}

// 2. Define default options for the tilt
const tiltOptions = {
  reverse:        false,  // reverse the tilt direction
  max:            25,     // max tilt rotation (degrees)
  perspective:    1000,   // Transform perspective, the lower the more extreme the tilt
  scale:          1.05,   // 1.05 = 105% scale on hover
  speed:          1000,   // Speed of the enter/exit transition
  transition:     true,   // Set a transition on enter/exit.
  axis:           null,   // What axis should be enabled. Can be "x", "y", or null (both)
  reset:          true,   // If the tilt effect has to be reset on exit.
  easing:         "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
}

const ServiceCard = ({ title, description, imageSrc }: ServiceCardProps) => {
  
  // 3. Define the animation properties
  const cardVariants = {
    hidden: { opacity: 0, y: 50 }, // Start hidden, 50px down
    visible: { opacity: 1, y: 0 }    // Animate to visible, 0px (original position)
  };

  return (
    // 4. Wrap the card in the <Tilt> component
    <Tilt options={tiltOptions}>
      <motion.div 
        // 5. Updated to green theme
        className="bg-white rounded-xl shadow-lg p-6 text-center m-4 
                   w-full max-w-sm flex-1 
                   transition-all duration-300 ease-in-out
                   hover:shadow-2xl" // Removed hover:-translate-y-2, tilt will handle this
        
        variants={cardVariants}
        initial="hidden"                 // Start in the 'hidden' state
        whileInView="visible"            // Animate to 'visible' when it enters the viewport
        viewport={{ once: true, amount: 0.3 }} // Trigger once, when 30% of the card is visible
        transition={{ duration: 0.5, ease: "easeOut" }} // Smooth 0.5s animation
      > 
        
        {/* --- Content with "White and Green" theme --- */}

        <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center 
                        bg-green-50 rounded-2xl shadow-inner border border-gray-200"> {/* UPDATED: bg-green-50 */}
          <img 
            src={imageSrc} 
            alt={`${title} icon`} 
            className="w-[90%] h-[90%] object-cover rounded-lg" 
          />
        </div>

        <h3 className="text-xl font-semibold text-brand-green-dark mb-2"> {/* UPDATED: text-brand-green-dark */}
          {title}
        </h3>
        <p className="text-gray-600">
          {description}
        </p>
      </motion.div>
    </Tilt> // 4. Close the <Tilt> component
  );
};

export default ServiceCard;

