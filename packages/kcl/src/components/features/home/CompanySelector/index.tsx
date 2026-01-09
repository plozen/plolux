"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CompanyType } from '@/lib/mock-data';
import styles from './CompanySelector.module.scss';
import { useVote } from '@/hooks/useVote';

interface CompanySelectorProps {
  companies: CompanyType[];
  onSelect: (companyId: string) => void;
  selectedCompanyId: string;
}

export default function CompanySelector({ companies, onSelect, selectedCompanyId }: CompanySelectorProps) {
  const selectedIndex = companies.findIndex(c => c.id === selectedCompanyId);
  const [index, setIndex] = useState(selectedIndex >= 0 ? selectedIndex : 0);

  const nextCompany = () => {
    const newIndex = (index + 1) % companies.length;
    setIndex(newIndex);
    onSelect(companies[newIndex].id);
  };

  const prevCompany = () => {
    const newIndex = (index - 1 + companies.length) % companies.length;
    setIndex(newIndex);
    onSelect(companies[newIndex].id);
  };

  const currentCompany = companies[index];

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.viewport}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCompany.id}
            className={styles.card}
            initial={{ opacity: 0, x: 50, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1, zIndex: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.8, zIndex: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(e, { offset, velocity }) => {
              if (offset.x > 100) prevCompany();
              else if (offset.x < -100) nextCompany();
            }}
          >
            <div className={styles.logoArea} style={{ background: currentCompany.image }}>
               {/* Fallback to initial if no logo */}
               {currentCompany.name.en.charAt(0)}
            </div>
            <span className={styles.name}>{currentCompany.name.en}</span>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className={styles.controls}>
        <button onClick={prevCompany} aria-label="Previous">
          <ChevronLeft size={24} />
        </button>
        <div style={{ fontSize: '0.8rem', opacity: 0.5 }}>
          {index + 1} / {companies.length}
        </div>
        <button onClick={nextCompany} aria-label="Next">
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}
