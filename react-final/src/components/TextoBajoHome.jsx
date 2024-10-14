import { motion } from 'framer-motion';

function TextoBajoHome() {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: false }} // Allows the animation to trigger each time the element comes into view
    >
      <p className='titulotextobajohome'>Busca, elige y disfruta:</p>
    </motion.div>
  );
}

export default TextoBajoHome;
