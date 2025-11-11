// src/components/ServiceCard.tsx
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

export interface ServiceCardProps {
  title: string;
  description: string;
  imageSrc: string;
}

const tiltOptions = {
  reverse: false,
  max: 25,
  perspective: 1000,
  scale: 1.05,
  speed: 1000,
  transition: true,
  axis: null as null | "x" | "y",
  reset: true,
  easing: "cubic-bezier(.03,.98,.52,.99)",
};

const ServiceCard = ({ title, description, imageSrc }: ServiceCardProps) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Tilt
      tiltReverse={tiltOptions.reverse}
      tiltMaxAngleX={tiltOptions.max}
      tiltMaxAngleY={tiltOptions.max}
      perspective={tiltOptions.perspective}
      scale={tiltOptions.scale}
      transitionSpeed={tiltOptions.transition ? tiltOptions.speed : 0}
      transitionEasing={tiltOptions.easing}     // ⬅️ use this, not "easing"
      reset={tiltOptions.reset}
      tiltAxis={tiltOptions.axis ?? undefined}  // 'x' | 'y' | undefined
    >
      <motion.div
        className="bg-white rounded-xl shadow-lg p-6 text-center m-4 
                   w-full max-w-sm flex-1 transition-all duration-300 ease-in-out
                   hover:shadow-2xl"
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center 
                        bg-green-50 rounded-2xl shadow-inner border border-gray-200">
          <img
            src={imageSrc}
            alt={`${title} icon`}
            className="w-[90%] h-[90%] object-cover rounded-lg"
          />
        </div>

        <h3 className="text-xl font-semibold text-brand-green-dark mb-2">
          {title}
        </h3>
        <p className="text-gray-600">{description}</p>
      </motion.div>
    </Tilt>
  );
};

export default ServiceCard;
