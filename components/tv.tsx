import { motion } from "framer-motion";

const TV = () => {
  return (
    <div className="tv">
      <div className="tv-frame">
        <motion.div
          className="tv-content"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 0.5, duration: 1.5, ease: "easeInOut" },
          }}
          exit={{ opacity: 0 }}
        >
          <div className="tv-loading"></div>
        </motion.div>
      </div>
    </div>
  );
};

export default TV;
