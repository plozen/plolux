"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";
import styles from "./PerformanceSection.module.scss";

interface LighthouseGaugeProps {
  score: number;
}

export default function LighthouseGauge({ score }: LighthouseGaugeProps) {
  const [inView, setInView] = useState(false);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  // Circle properties
  const radius = 54; // 120px / 2 - strokeWidth/2 roughly
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    if (inView) {
      const controls = animate(count, score, { duration: 1.5, ease: "easeOut" });
      return controls.stop;
    }
  }, [inView, score, count]);

  return (
    <motion.div 
      className={styles.gaugeWrapper}
      onViewportEnter={() => setInView(true)}
      viewport={{ once: true }}
    >
      <svg width="100%" height="100%" viewBox="0 0 120 120">
        <circle
          cx="60"
          cy="60"
          r={radius}
          className={styles.circleBackground}
        />
        <motion.circle
          cx="60"
          cy="60"
          r={radius}
          className={styles.circleProgress}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={inView ? { strokeDashoffset: circumference - (score / 100) * circumference } : {}}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
      <motion.div className={styles.scoreText}>
        {rounded}
      </motion.div>
    </motion.div>
  );
}
