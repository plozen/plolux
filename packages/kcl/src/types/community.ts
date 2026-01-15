/**
 * 커뮤니티 게시판 관련 타입 정의
 */

/** 게시글 타입 */
export interface Post {
  id: string;
  nickname: string;
  title: string;
  content: string;
  view_count: number;
  comment_count: number;
  created_at: string;
  updated_at?: string;
}

/** 댓글 타입 */
export interface Comment {
  id: string;
  post_id: string;
  nickname: string;
  content: string;
  created_at: string;
}

/** 신고 타입 */
export interface Report {
  id: string;
  target_type: 'post' | 'comment';
  target_id: string;
  reason: ReportReason;
  detail?: string;
  created_at: string;
}

/** 신고 사유 타입 */
export type ReportReason = 'spam' | 'inappropriate' | 'harassment' | 'other';

/** 게시글 작성 폼 데이터 */
export interface PostFormData {
  nickname: string;
  title: string;
  content: string;
}

/** 댓글 작성 폼 데이터 */
export interface CommentFormData {
  nickname: string;
  content: string;
}

/** 신고 폼 데이터 */
export interface ReportFormData {
  reason: ReportReason;
  detail?: string;
}

/** 페이지네이션 응답 */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
