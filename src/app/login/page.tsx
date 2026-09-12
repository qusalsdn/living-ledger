import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AuthForm } from "@/components/auth-form";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export default function LoginPage() {
  return <main className="auth-page"><Link href="/" className="back-link"><ArrowLeft size={16} /> 돌아가기</Link><section className="auth-card"><Link href="/" className="brand auth-brand"><span className="brand-mark">ㅅ</span><span>혼자살림</span></Link><div className="auth-intro"><p className="eyebrow">시작하기</p><h1>생활 관리판을 만들어 볼까요?</h1><p>이메일로 가입하거나 로그인할 수 있어요.</p></div><AuthForm configured={isSupabaseConfigured()} /></section></main>;
}
