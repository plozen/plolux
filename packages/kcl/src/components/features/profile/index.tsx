"use client";

import { useState } from 'react';
import Image from 'next/image';
import styles from './ProfileLayout.module.scss';
import { Settings, Grid, Heart, MessageCircle, UserCheck, Bookmark, SquareUser } from 'lucide-react';
import classNames from 'classnames';

// Mock Data
const MOCK_PROFILE = {
  username: "kcl_official",
  realname: "KCL Studio",
  bio: "The Global Standard for K-Pop Fandom Ranking.\nProve your artist's power. 🏆",
  website: "kcl.plozen.io",
  stats: {
    posts: 42,
    followers: 8200,
    following: 15
  },
  images: Array(12).fill(null).map((_, i) => ({
    id: i,
    src: `/images/mock-post-${(i % 3) + 1}.jpg`, // Use placeholders or colors if verified
    likes: 120 + i * 10,
    comments: 5 + i
  }))
};

export default function ProfileLayout() {
  const [activeTab, setActiveTab] = useState<'posts' | 'saved' | 'tagged'>('posts');

  return (
    <div className={styles.container}>
      {/* 1. Header */}
      <header className={styles.header}>
        <div className={styles.avatarWrapper}>
          <div className={styles.avatar}>
            {/* Placeholder Avatar */}
            <div style={{width:'100%', height:'100%', borderRadius:'50%', background:'#333'}}></div>
          </div>
        </div>

        <div className={styles.info}>
          <div className={styles.topRow}>
            <h2 className={styles.username}>{MOCK_PROFILE.username}</h2>
            <div className={styles.actionBtns}>
              <button className={styles.btn}>프로필 편집</button>
              <button className={styles.btn}>보관된 스토리</button>
              <button className={styles.iconBtn}><Settings size={20} /></button>
            </div>
          </div>

          <div className={styles.stats}>
            <div className={styles.statItem}>
              <span className={styles.number}>{MOCK_PROFILE.stats.posts}</span>
              <span className={styles.label}>게시물</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.number}>{MOCK_PROFILE.stats.followers}</span>
              <span className={styles.label}>팔로워</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.number}>{MOCK_PROFILE.stats.following}</span>
              <span className={styles.label}>팔로잉</span>
            </div>
          </div>

          <div className={styles.bio}>
            <div className={styles.realname}>{MOCK_PROFILE.realname}</div>
            <div style={{whiteSpace: 'pre-line'}}>{MOCK_PROFILE.bio}</div>
            <a href={`https://${MOCK_PROFILE.website}`} target="_blank">{MOCK_PROFILE.website}</a>
          </div>
        </div>
      </header>

      {/* 2. Tabs */}
      <div className={styles.tabs}>
        <div 
          className={classNames(styles.tab, { [styles.active]: activeTab === 'posts' })}
          onClick={() => setActiveTab('posts')}
        >
          <Grid className={styles.icon} />
          <span>게시물</span>
        </div>
        <div 
          className={classNames(styles.tab, { [styles.active]: activeTab === 'saved' })}
          onClick={() => setActiveTab('saved')}
        >
          <Bookmark className={styles.icon} />
          <span>저장됨</span>
        </div>
        <div 
          className={classNames(styles.tab, { [styles.active]: activeTab === 'tagged' })}
          onClick={() => setActiveTab('tagged')}
        >
          <SquareUser className={styles.icon} /> 
          <span>태그됨</span>
        </div>
      </div>

      {/* 3. Grid Content */}
      <div className={styles.gallery}>
        {MOCK_PROFILE.images.map((img) => (
          <div key={img.id} className={styles.gridItem}>
             {/* Using colored diffs for placeholder visuals */}
             <div style={{
               width: '100%', 
               height: '100%', 
               background: `hsl(${img.id * 30}, 60%, 20%)` 
             }} />
             
             <div className={styles.overlay}>
                <div className={styles.stat}>
                  <Heart fill="white" /> {img.likes}
                </div>
                <div className={styles.stat}>
                  <MessageCircle fill="white" /> {img.comments}
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
