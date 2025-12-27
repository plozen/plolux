"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { PORTFOLIO_PROJECTS, CATEGORIES } from "@/features/portfolio/projects";
import { Project } from "@/features/portfolio/types";
import ProjectCard from "@/components/molecules/ProjectCard/ProjectCard";
import styles from "./PortfolioGrid.module.scss";

export default function PortfolioGrid() {
  const [filter, setFilter] = useState<'All' | Project['category']>('All');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filteredProjects = filter === 'All' 
    ? PORTFOLIO_PROJECTS 
    : PORTFOLIO_PROJECTS.filter(p => p.category === filter);

  const selectedProject = PORTFOLIO_PROJECTS.find(p => p.id === selectedId);

  return (
    <div className={styles.container}>
      {/* Filters */}
      <div className={styles.filter}>
        {CATEGORIES.map(category => (
          <button
            key={category.label}
            onClick={() => setFilter(category.value)}
            className={`${styles.filterBtn} ${filter === category.value ? styles.active : ''}`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div layout className={styles.grid}>
        <AnimatePresence>
          {filteredProjects.map(project => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onClick={() => setSelectedId(project.id)} 
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedId && selectedProject && (
          <motion.div 
            className={styles.modalBackdrop}
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={() => setSelectedId(null)}
          >
            <motion.div 
              layoutId={`card-container-${selectedId}`} 
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div layoutId={`card-image-${selectedId}`} className={styles.modalImage}>
                 <div 
                   style={{ 
                     width: '100%', 
                     height: '100%', 
                     background: selectedProject.gradient || 'linear-gradient(45deg, #333, #555)' 
                   }} 
                 />
              </motion.div>
              
              <button className={styles.closeBtn} onClick={() => setSelectedId(null)}>
                <X />
              </button>

              <div className={styles.modalBody}>
                <motion.h2 layoutId={`card-title-${selectedId}`} className="text-3xl font-bold mb-2">
                  {selectedProject.title}
                </motion.h2>
                <div className="flex items-center gap-3 mb-4 text-[var(--accent-primary)] font-semibold">
                  <span>{selectedProject.client}</span>
                  <span className="w-1 h-1 bg-[var(--text-secondary)] rounded-full opacity-50"></span>
                  <span>{selectedProject.year}</span>
                </div>
                
                <div className="flex gap-2 mb-6">
                  {selectedProject.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-[var(--bg-secondary)] rounded text-sm text-[var(--text-secondary)]">
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-lg leading-relaxed text-[var(--text-secondary)]">
                  {selectedProject.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
