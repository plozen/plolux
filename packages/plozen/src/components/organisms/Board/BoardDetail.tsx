"use client";

import { useState, useEffect } from "react";
import { User, Calendar, Eye, ArrowLeft, Edit2, Trash2 } from "lucide-react";
import DOMPurify from "dompurify";
import { useRouter } from "next/navigation";
import styles from "./BoardDetail.module.scss";
import PasswordModal from "./PasswordModal";
import { createClient } from "@/lib/supabase/client";

interface Post {
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

interface BoardDetailProps {
  post: Post;
  onBack: () => void;
  onDeleteSuccess: () => void;
}

export default function BoardDetail({ post, onBack, onDeleteSuccess }: BoardDetailProps) {
  const router = useRouter();
  const supabase = createClient();
  
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"VIEW" | "EDIT" | "DELETE">("VIEW");
  const [isVerifying, setIsVerifying] = useState(false);

  // Initial Content Load
  useEffect(() => {
    // 공개글이거나 이미 내용이 있는 경우 바로 표시
    if (!post.isPrivate && post.content) {
      setContent(post.content);
      return;
    }

    // 비밀글인데 내용이 없으면(목록에서 누른 직후) -> 비밀번호 입력 모달 띄움
    if (post.isPrivate && !post.content) {
      setModalMode("VIEW");
      setModalOpen(true);
    } else if (post.content) {
       // 비밀글이라도 이미 인증 통해서 내용을 받아온 상태라면 (혹시 모를 경우)
       setContent(post.content);
    } else {
       // 공개글인데 내용이 없는 경우 (목록에서 클릭) -> 내용만 fetch
       fetchPublicContent();
    }
  }, [post]);

  const fetchPublicContent = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.rpc('get_inquiry_content', {
        p_id: post.id,
        p_password: '' // 공개글은 비번 없이 조회 가능
      });

      if (error) throw error;
      if (data && data.length > 0) {
        setContent(data[0].content);
      }
    } catch (e) {
      console.error("Failed to fetch content", e);
      alert("내용을 불러오는데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (password: string) => {
    setIsVerifying(true);
    try {
      if (modalMode === "VIEW") {
        const { data, error } = await supabase.rpc('get_inquiry_content', {
          p_id: post.id,
          p_password: password
        });

        if (error || !data || data.length === 0) {
          alert("비밀번호가 일치하지 않습니다.");
          return; // 모달 유지
        }
        setContent(data[0].content);
        setModalOpen(false); // 성공 시 닫기
      } 
      else if (modalMode === "DELETE") {
        const { data, error } = await supabase.rpc('delete_inquiry', {
          p_id: post.id,
          p_password: password
        });
        
        if (error || !data) {
           alert("비밀번호가 일치하지 않거나 삭제에 실패했습니다.");
           return;
        }
        alert("게시글이 삭제되었습니다.");
        setModalOpen(false);
        onDeleteSuccess();
      }
      else if (modalMode === "EDIT") {
        // 수정 권한 확인용 (get_inquiry_content로 확인)
        const { data, error } = await supabase.rpc('get_inquiry_content', {
            p_id: post.id,
            p_password: password
        });

        if (error || !data || data.length === 0) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }
        
        // 인증 성공 시 수정 페이지로 이동 (비밀번호는 보안상 URL에 안 태우고, EditPage에서 다시 입력하게 하거나 Context로 넘겨야 함. 
        // 여기서는 간단히 페이지 이동 후 재인증 유도하거나, 세션 스토리지 사용. 
        // 일단 이동만 시킴.)
        setModalOpen(false);
        router.push(`/contact/edit/${post.id}`);
      }
    } catch (e) {
      console.error(e);
      alert("오류가 발생했습니다.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleEditClick = () => {
    setModalMode("EDIT");
    setModalOpen(true);
  };

  const handleDeleteClick = () => {
    setModalMode("DELETE");
    setModalOpen(true);
  };

  // 모달 닫기 시: VIEW 모드에서 닫으면 뒤로 가기 (내용 못 봤으니까)
  const handleModalClose = () => {
    setModalOpen(false);
    if (modalMode === "VIEW" && !content) {
      onBack();
    }
  };

  return (
    <div className={styles.detailContainer}>
      {/* Header */}
      <div className={styles.detailHeader}>
        <h3>{post.title}</h3>
        <div className={styles.detailMeta}>
          <span><User size={16} /> {post.author}</span>
          <span><Calendar size={16} /> {post.date}</span>
          <span><Eye size={16} /> {post.viewCount}</span>
        </div>
      </div>

      {/* Body */}
      <div className={styles.detailBody}>
        {isLoading ? (
            <div className="py-10 text-gray-400">내용을 불러오는 중...</div>
        ) : content ? (
            <div 
              className="ql-editor" // Quill 스타일 적용
              dangerouslySetInnerHTML={{ 
                __html: DOMPurify.sanitize(content) 
              }} 
            />
        ) : (
            <div className="py-10 text-gray-400">내용을 표시할 수 없습니다.</div>
        )}
      </div>

      {/* Buttons */}
      <div className={styles.buttonGroup}>
        <div className={styles.leftGroup}>
          <button className={`${styles.btn} ${styles.back}`} onClick={onBack}>
            <ArrowLeft size={16} /> 목록
          </button>
        </div>
        <div className={styles.rightGroup}>
           <button className={`${styles.btn} ${styles.edit}`} onClick={handleEditClick}>
             <Edit2 size={16} /> 수정
           </button>
           <button className={`${styles.btn} ${styles.delete}`} onClick={handleDeleteClick}>
             <Trash2 size={16} /> 삭제
           </button>
        </div>
      </div>

      {/* Password Modal */}
      <PasswordModal 
        isOpen={modalOpen}
        onClose={handleModalClose}
        onSubmit={handlePasswordSubmit}
        isSubmitting={isVerifying}
        title={
            modalMode === "VIEW" ? "비밀글 열람" :
            modalMode === "DELETE" ? "게시글 삭제" : "게시글 수정"
        }
        description={
            modalMode === "DELETE" ? "정말 삭제하시겠습니까? 삭제 후에는 복구할 수 없습니다." :
            "게시글 비밀번호를 입력해주세요."
        }
      />
    </div>
  );
}
