"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, ArrowLeft, Eye, Calendar, User, ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./BoardList.module.scss";
import { createClient } from "@/lib/supabase/client";
import { Database } from "@/types/database.types";
import BoardDetail from "./BoardDetail";

type Inquiry = Database['public']['Tables']['inquiries']['Row'];

// UI용 Post 타입정의 (기존 컴포넌트 호환)
export interface Post {
  id: string;
  seq_id: number;
  title: string;
  author: string;
  date: string;
  viewCount: number;
  isPrivate: boolean;
  content?: string;
  isNotice?: boolean;
}

const ITEMS_PER_PAGE = 10;

export default function BoardList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const supabase = createClient();

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    try {
      const from = (currentPage - 1) * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE - 1;

      // View 테이블 조회
      const { data: rawData, error, count } = await supabase
        .from('inquiries_list_view')
        .select('*', { count: 'exact' })
        .order('is_notice', { ascending: false })
        .order('seq_id', { ascending: false })
        .range(from, to);

      if (error) throw error;

      if (count !== null) setTotalCount(count);

      if (rawData) {
        const data = rawData;
        const mappedPosts: Post[] = data.map((item) => ({
          id: item.id,
          seq_id: item.seq_id,
          title: item.title,
          author: item.author_name,
          date: new Date(item.created_at).toLocaleDateString('ko-KR'),
          viewCount: item.view_count || 0,
          isPrivate: item.is_private || false,
          content: '', // 목록 조회 시에는 내용을 불러오지 않음 (보안)
          isNotice: item.is_notice || false
        }));
        setPosts(mappedPosts);
      }
    } catch (error) {
      console.error('Error fetching inquiries:', error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, supabase]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handlePostClick = (post: Post) => {
    // 상세 컴포넌트로 위임
    setSelectedPost(post);
  };

  const handleDeleteSuccess = () => {
    setSelectedPost(null);
    fetchPosts(); // 목록 갱신
  };

  if (selectedPost) {
    return (
      <BoardDetail 
        post={selectedPost} 
        onBack={() => setSelectedPost(null)}
        onDeleteSuccess={handleDeleteSuccess}
      />
    );
  }

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.tableHeader}>
        <div className={styles.cell}>번호</div>
        <div className={styles.cell}>제목</div>
        <div className={styles.cell}>작성자</div>
        <div className={styles.cell}>작성일</div>
        <div className={styles.cell}>조회수</div>
      </div>

      {/* List */}
      <div className={styles.list}>
        {isLoading ? (
          <div className="p-8 text-center text-gray-500">불러오는 중...</div>
        ) : (
          <AnimatePresence mode="wait">
            {posts.length === 0 ? (
                <div className="p-8 text-center text-gray-400">등록된 문의가 없습니다.</div>
            ) : (
                posts.map((post, index) => (
                <motion.div 
                    key={post.id} 
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={styles.row}
                    onClick={() => handlePostClick(post)}
                >
                    {/* ID */}
                    <div className={`${styles.cell} ${styles.desktopOnly}`}>
                    {post.isNotice ? '공지' : post.seq_id}
                    </div>

                    {/* Title */}
                    <div className={`${styles.cell} ${styles.titleCell}`}>
                    {post.isPrivate && <Lock className={styles.lockIcon} />}
                    <span>{post.title}</span>
                    </div>

                    {/* Mobile Info Row */}
                    <div className={styles.mobileInfo}>
                    <span>{post.author}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>조회 {post.viewCount}</span>
                    </div>

                    {/* Desktop Columns */}
                    <div className={`${styles.cell} ${styles.desktopOnly}`}>{post.author}</div>
                    <div className={`${styles.cell} ${styles.desktopOnly}`}>{post.date}</div>
                    <div className={`${styles.cell} ${styles.desktopOnly}`}>{post.viewCount}</div>
                </motion.div>
                ))
            )}
          </AnimatePresence>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 0 && (
        <div className={styles.pagination}>
            <button 
            className={styles.pageBtn}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            >
            <ChevronLeft size={18} />
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
                key={page}
                className={`${styles.pageBtn} ${currentPage === page ? styles.active : ''}`}
                onClick={() => handlePageChange(page)}
            >
                {page}
            </button>
            ))}

            <button 
            className={styles.pageBtn}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            >
            <ChevronRight size={18} />
            </button>
        </div>
      )}
    </div>
  );
}
