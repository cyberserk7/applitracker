"use client";

import { motion as m } from "framer-motion";

export const ProductShowcaseVideo = () => {
  return (
    <m.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1, ease: "easeInOut" }}
    >
      <video
        src="/videos/product-showcase.mov"
        autoPlay
        muted
        loop
        className="rounded-xl border shadow-lg bg-cover"
        poster="/images/applitrack-showcase-poster.png"
      />
    </m.div>
  );
};
