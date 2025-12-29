"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./PasswordModal.module.scss";

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (password: string) => void;
  title?: string;
  description?: string;
  isSubmitting?: boolean;
}

export default function PasswordModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  title = "비밀번호 확인", 
  description = "게시글 작성 시 설정한 비밀번호를 입력해주세요.",
  isSubmitting = false
}: PasswordModalProps) {
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim()) {
      onSubmit(password);
      setPassword("");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={styles.overlay}>
          <motion.div 
            className={styles.modal}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <h3>{title}</h3>
            <p>{description}</p>
            
            <form onSubmit={handleSubmit}>
              <input
                type="password"
                placeholder="비밀번호 4자리 입력"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
                className={styles.input}
                disabled={isSubmitting}
              />
              <div className={styles.buttons}>
                <button 
                  type="button" 
                  onClick={onClose} 
                  className={styles.cancelBtn}
                  disabled={isSubmitting}
                >
                  취소
                </button>
                <button 
                  type="submit" 
                  className={styles.confirmBtn}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "확인 중..." : "확인"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
