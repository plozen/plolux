"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./HeroSection.module.scss";
import SparkGrid from "./SparkGrid";

// Simple Spark SVG Component
const SparkIcon = () => (
  <svg width="0" height="0">
    <defs>
      <linearGradient id="sparkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#D6FF00" stopOpacity="1" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <SparkGrid className={styles.backgroundCanvas} />
      {/* Background Canvas logic is now handled by SparkGrid, CSS class used for positioning */}
      
      {/* Engine Core Pulse removed for cleaner look, Grid is enough */}

      <div className={styles.content}>
        <motion.h2 
          className={styles.slogan}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          The Reality Engine
        </motion.h2>

        <motion.h1 
          className={styles.title}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
        >
          GENERATE<br />
          YOUR <span className={styles.highlight}>PLOT</span>
        </motion.h1>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 1.0, duration: 0.8 }}
        >
          <Link href="/quote" className={styles.ctaButton}>
            프로젝트 시작하기
          </Link>
        </motion.div>
      </div>

      {/* Intro Spark Animation could be a separate overlay component if complex */}
    </section>
  );
}
