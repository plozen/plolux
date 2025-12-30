"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import styles from "./PerformanceSection.module.scss";
import LighthouseGauge from "./LighthouseGauge";

const metrics = [
  { label: "Performance", score: 100 },
  { label: "Accessibility", score: 100 },
  { label: "Best Practices", score: 100 },
  { label: "SEO", score: 100 },
];

export default function PerformanceSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <motion.div 
            className={styles.badge}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Technical Perfection
          </motion.div>
          <motion.h2 
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            속도 1초 미만, SEO 100점.<br />
            마케팅의 시작은 '기술'입니다.
          </motion.h2>
          <motion.p 
            className={styles.description}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            아무리 예쁜 사이트도 느리면 고객은 떠납니다. PLOZEN은 Next.js 최적화를 통해 구글과 네이버 검색엔진이 가장 좋아하는 구조로 제작됩니다.
          </motion.p>
        </div>

        <div className={styles.gaugesGrid}>
          {metrics.map((metric, index) => (
            <motion.div 
              key={index} 
              className={styles.gaugeContainer}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
            >
              <LighthouseGauge score={metric.score} />
              <span className={styles.gaugeLabel}>{metric.label}</span>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className={styles.trustBadge}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <CheckCircle2 size={18} />
          <span>Google & Naver Search Optimized</span>
        </motion.div>
      </div>
    </section>
  );
}
