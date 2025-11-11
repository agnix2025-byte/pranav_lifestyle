// src/components/Programs.tsx
import { motion } from 'framer-motion'; // 1. Import motion

const Programs = () => {
  const check = '✓'; 

  const programFeatures = [
    'One on one Personal Coaching',
    'Wellness Talk',
    '21 Days Weight Loss Challenge',
    'Winner Celebration and Recognition',
    '3 Days Trial Program',
  ];

  // 2. Define animation variants for the list
  const listContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Each child (li) will animate 0.15s after the previous one
      }
    }
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -20 }, // Start hidden and slightly to the left
    visible: { opacity: 1, x: 0 }    // Animate to visible and original position
  };

  return (
    <section className="bg-white py-16 md:py-24 border-t border-gray-200 overflow-hidden"> {/* 3. Add overflow-hidden */}
      <div className="container">
        
        {/* 4. Animate the title */}
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          Our Coaching Program
        </motion.h2>
        
        {/* 5. Animate the subtitle */}
        <motion.p 
          className="text-lg md:text-xl text-center text-gray-600 max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
        >
          We provide a complete, personal program to help you reach your goals.
        </motion.p>

        {/* 6. Animate the list container */}
        <motion.ul 
          className="max-w-lg mx-auto space-y-4 mb-16"
          variants={listContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {programFeatures.map((feature) => (
            // 7. Animate each list item
            <motion.li 
              key={feature} 
              className="flex items-center text-lg text-gray-700"
              variants={listItemVariants} // Use the variants defined above
            >
              <span className="text-brand-green text-2xl font-bold mr-4">{check}</span>
              {feature}
            </motion.li>
          ))}
        </motion.ul>

        {/* 8. Animate the Zoom box */}
        <motion.div 
          className="bg-green-50 p-8 rounded-lg max-w-2xl mx-auto border border-green-100 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <h3 className="text-2xl font-semibold text-brand-green-dark mb-4">
            Join Us Online!
          </h3>
          <p className="text-lg text-gray-700 mb-2">
            "எளிய முறையில் உங்கள் வீட்டில் இருந்தபடியே **zoom (online)** மூலமாகவும் உங்களுக்கு உதவுகிறோம்."
          </p>
          <p className="text-lg text-gray-700 font-semibold">
            We help you right from your home through Zoom!
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default Programs;

