import React from "react";
import "../styles.css";
import { AnimatePresence, easeInOut, motion } from "framer-motion";

interface AnimateProps {
  children: React.ReactElement;
}

const AnimatePage: React.FC<AnimateProps> = (props) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="page-content"
        initial={{ x: 200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -300, opacity: 0 }}
        transition={{ delay: 0.3, ease: easeInOut, duration: 1.3 }}
      >
        {props.children}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatePage;
