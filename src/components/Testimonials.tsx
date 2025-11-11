// src/components/Testimonials.tsx
import  { useState } from 'react'; // 1. Import useState
import TestimonialCard from './TestimonialCard';
import { motion } from 'framer-motion'; // 2. Import motion

// 3. Import the Lightbox component and its styles
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const testimonialData = [
  { name: 'Ganesh K.', beforeSrc: 'https://placehold.co/300x400/eee/333?text=Ganesh+Before', afterSrc: 'https://placehold.co/300x400/ddd/333?text=Ganesh+After', reviewEnglish: 'This program changed my life! I have more energy than ever.', reviewTamil: 'இந்த திட்டம் என் வாழ்க்கையை மாற்றியது! எனக்கு முன்பை விட அதிக ஆற்றல் உள்ளது.', },
  { name: 'Priya S.', beforeSrc: 'https://placehold.co/300x400/eee/333?text=Priya+Before', afterSrc: 'https://placehold.co/300x400/ddd/333?text=Priya+After', reviewEnglish: 'I lost 10 kgs in the 21-day challenge. The coaching was excellent.', reviewTamil: '21 நாள் சேலஞ்சில் 10 கிலோ இழந்தேன். பயிற்சி மிகவும் அருமையாக இருந்தது.', },
  { name: 'Arjun M.', beforeSrc: 'https://placehold.co/300x400/eee/333?text=Arjun+Before', afterSrc: 'https://placehold.co/300x400/ddd/333?text=Arjun+After', reviewEnglish: 'The online Zoom sessions were very convenient and effective.', reviewTamil: 'ஆன்லைன் ஜூம் அமர்வுகள் மிகவும் வசதியாகவும் பயனுள்ளதாகவும் இருந்தன.', },
  { name: 'Meena R.', beforeSrc: 'https://placehold.co/300x400/eee/333?text=Meena+Before', afterSrc: 'https://placehold.co/300x400/ddd/333?text=Meena+After', reviewEnglish: 'My digestive health has improved so much. I feel fantastic!', reviewTamil: 'எனது செரிமான ஆரோக்கியம் மிகவும் மேம்பட்டுள்ளது. நான் அருமையாக உணர்கிறேன்!', },
  { name: 'Vikram L.', beforeSrc: 'https://placehold.co/300x400/eee/333?text=Vikram+Before', afterSrc: 'https://placehold.co/300x400/ddd/333?text=Vikram+After', reviewEnglish: 'Great support from the team. The kids nutrition plan was perfect for my family.', reviewTamil: 'குழுவினரிடமிருந்து சிறந்த ஆதரவு. குழந்தைகள் ஊட்டச்சத்து திட்டம் என் குடும்பத்திற்குப் பொருத்தமாக இருந்தது.', },
];

// 4. Create the 'slides' for the lightbox from our data
// We'll just use the "After" images for the gallery
const slides = testimonialData.map(client => ({
  src: client.afterSrc,
  title: `${client.name} - After`,
  description: client.reviewEnglish,
}));

// Animation for the grid
const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const Testimonials = () => {
  // 5. Add state to track which image is open
  // -1 means the lightbox is closed
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  return (
    <section className="bg-gray-50 py-16 md:py-24 overflow-hidden"> {/* Added overflow-hidden */}
      <div className="container">
        
        {/* Animate the title */}
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          Real Results from Real People
        </motion.h2>
        
        {/* Animate the grid */}
        <motion.div 
          className="flex flex-wrap justify-center gap-8"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          
          {testimonialData.map((client, index) => (
            <TestimonialCard 
              key={client.name}
              name={client.name}
              beforeSrc={client.beforeSrc}
              afterSrc={client.afterSrc}
              reviewEnglish={client.reviewEnglish}
              reviewTamil={client.reviewTamil}
              // 6. Tell the card to open the lightbox at this index when clicked
              onImageClick={() => setLightboxIndex(index)}
            />
          ))}

        </motion.div>
      </div>

      {/* 7. Render the Lightbox component */}
      <Lightbox
        open={lightboxIndex > -1}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={slides}
      />
    </section>
  );
};

export default Testimonials;

