import React from "react";
import { LoadingImage, LoadingStyle } from "../styling/LoadingStyling";
import { motion } from "framer-motion";

const LoadingScreen = () => {
  return (
    <>
      <LoadingStyle
        as={motion.div}
        initial={{ opacity: 0 }} // Anfangszustand der Animation
        animate={{ opacity: 1 }} // Zustand, zu dem animiert werden soll
        transition={{ duration: 0.5 }} // Dauer der Animation
      >
        <LoadingImage />
      </LoadingStyle>
      <LoadingStyle
        as={motion.div}
        initial={{ opacity: 0 }} // Anfangszustand der Animation
        animate={{ opacity: 1 }} // Zustand, zu dem animiert werden soll
        transition={{ duration: 0.25 }} // Dauer der Animation
      >
        Arc-Reaktor wird geladen...
      </LoadingStyle>
    </>
  );
};

export default LoadingScreen;
