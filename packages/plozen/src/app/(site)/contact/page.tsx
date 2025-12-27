"use client";


import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import QuoteForm from "@/components/templates/Quote/QuoteForm";
import BoardList from "@/components/organisms/Board/BoardList";
import styles from "./page.module.scss";

function ContactPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const activeTab = searchParams.get('tab') === 'general' ? 'general' : 'project';

  const handleTabChange = (tab: 'general' | 'project') => {
    router.replace(`/contact?tab=${tab}`, { scroll: false });
  };

  return (
    <div className={styles.contactPage}>
      <header className={styles.hero}>
        <h1>
          CONTACT <span>US</span>
        </h1>
        <p>
          프로젝트 문의부터 파트너십 제안까지,<br />
          PLOZEN은 언제나 열려있습니다.
        </p>
      </header>

      {/* Tabs */}
      <div className={styles.tabContainer}>
        <button
          onClick={() => handleTabChange('general')}
          className={`${styles.tabButton} ${activeTab === 'general' ? styles.active : ''}`}
        >
          일반 문의
        </button>
        <button
          onClick={() => handleTabChange('project')}
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
            className="w-full"
          >
            <div className="w-full">
              <div className="w-full mb-8">
                <h2 className={styles.sectionTitle}>일반 문의 게시판</h2>
                <div 
                  className="w-full border-b border-[rgba(0,0,0,0.1)]"
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'flex-end',
                    marginBottom: '0.5rem'   // Force margin
                  }}
                >
                  <p className={styles.sectionDesc}>
                    궁금한 점이나 제휴 제안을 자유롭게 남겨주세요.
                  </p>
                  
                  <button 
                    className={styles.inquiryBtn}
                    onClick={() => router.push('/contact/write')}
                    style={{ flexShrink: 0, marginLeft: '2rem' }}
                  >
                    문의하기
                  </button>
                </div>
              </div>
              <BoardList />
            </div>
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

export default function ContactPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ContactPageContent />
    </Suspense>
  );
}
