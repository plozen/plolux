"use client";

import { motion } from "framer-motion";
import { Project } from "@/features/portfolio/types";
import styles from "./ProjectCard.module.scss"; // Assuming SCSS module will be created

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <motion.div
      layoutId={`card-container-${project.id}`}
      className={styles.card}
      onClick={() => onClick(project)}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5 }}
    >
      <motion.div layoutId={`card-image-${project.id}`} className={styles.imageContainer}>
        <div 
          style={{ 
            width: '100%', 
            height: '100%', 
            background: project.gradient || 'linear-gradient(45deg, #333, #555)' 
          }} 
        >
           {/* Replace with <Image> when real assets are available */}
           {/* <Image src={project.imageUrl} alt={project.title} fill /> */}
        </div>
      </motion.div>

      <div className={styles.content}>
        <div className={styles.tags}>
          {project.tags.slice(0, 3).map(tag => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>
        <motion.h3 layoutId={`card-title-${project.id}`} className={styles.title}>
          {project.title}
        </motion.h3>
        <p className={styles.category}>{project.category}</p>
      </div>
    </motion.div>
  );
}
