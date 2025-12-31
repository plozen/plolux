'use server'




import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

/**
 * 서버 액션: 로그인 처리 함수
 *
 * 클라이언트(브라우저)의 Form에서 넘어온 데이터를 받아서
 * Supabase 인증을 수행하고 결과를 반환합니다.
 *
 * @param formData - HTML Form에서 전송된 데이터 (email, password)
 */
export async function login(formData: FormData) {
  // 1. 서버용 Supabase 클라이언트 생성
  const supabase = await createClient()

  // 2. Form 데이터 추출
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // 3. Supabase 이메일/비밀번호 로그인 시도
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  // 4. 실패 시 에러 처리
  if (error) {
    // 보안상 너무 구체적인 에러보다는 일반적인 메시지를 주거나
    // 필요하다면 에러 코드를 반환해서 UI가 처리하게 합니다.
    // 여기서는 간단히 에러와 함께 리다이렉트합니다.
    return redirect('/admin/login?error=Invalid credentials')
  }

  // 5. 성공 시 처리
  // 캐시를 비워줘서 최신 상태(로그인된 상태)를 반영하게 합니다.
  revalidatePath('/admin', 'layout')
  
  // 대시보드로 이동
  redirect('/admin')
}