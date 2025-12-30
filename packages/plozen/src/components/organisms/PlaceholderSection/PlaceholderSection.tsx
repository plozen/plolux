"use client";

import styles from "./PlaceholderSection.module.scss";

interface PlaceholderSectionProps {
  title: string;
  variant?: "primary" | "secondary";
  height?: string;
}

export default function PlaceholderSection({ title, variant = "primary", height = "600px" }: PlaceholderSectionProps) {
  return (
    <section 
      className={`${styles.section} ${styles[variant]}`}
      style={{ minHeight: height }}
    >
      <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>Coming Soon</p>
      </div>
    </section>
  );
}
