"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import QuoteForm from "@/components/templates/Quote/QuoteForm";
import styles from "./page.module.scss";

export default function ContactPage() {
  // Default to 'project' as requested
  const [activeTab, setActiveTab] = useState<'general' | 'project'>('project');

  return (
    <div className={styles.contactPage}>
      <h1 className={styles.title}>Contact Us</h1>

      {/* Tabs */}
      <div className={styles.tabContainer}>
        <button
          onClick={() => setActiveTab('general')}
          className={`${styles.tabButton} ${activeTab === 'general' ? styles.active : ''}`}
        >
          일반 문의
        </button>
        <button
          onClick={() => setActiveTab('project')}
          className={`${styles.tabButton} ${activeTab === 'project' ? styles.active : ''}`}
        >
          프로젝트 시작하기
        </button>
      </div>

      {/* Content Area */}
      <AnimatePresence mode="wait">
        {activeTab === 'general' ? (
          <motion.div
            key="general"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={styles.generalInquiry}
          >
            <h2>궁금한 점이 있으신가요?</h2>
            <p>
              일반적인 문의사항이나 제휴 제안은 이메일로 보내주세요.<br />
              빠른 시일 내에 답변 드리겠습니다.
            </p>
            <a href="mailto:contact@plozen.com">
              contact@plozen.com
            </a>
          </motion.div>
        ) : (
          <motion.div
            key="project"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <QuoteForm />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
