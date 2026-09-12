import Link from "next/link";
import { ArrowRight, CalendarDays, ChartNoAxesCombined, WalletCards } from "lucide-react";

import { isSupabaseConfigured } from "@/lib/supabase/config";

const features = [
  { icon: WalletCards, title: "고정비를 한눈에", description: "월세부터 구독료까지, 이번 달 빠져나갈 돈을 정리합니다." },
  { icon: CalendarDays, title: "계약 일정을 놓치지 않게", description: "갱신과 만료일을 생활비 흐름과 함께 확인합니다." },
  { icon: ChartNoAxesCombined, title: "생활비 흐름을 또렷하게", description: "월별 비교로 늘어난 지출과 새는 돈을 발견합니다." },
];

export default function Home() {
  const configured = isSupabaseConfigured();

  return (
    <main className="landing-page">
      <header className="landing-header">
        <Link href="/" className="brand"><span className="brand-mark">ㅅ</span><span>혼자살림</span></Link>
        <Link href="/login" className="text-link">로그인</Link>
      </header>
      <section className="hero">
        <p className="eyebrow">1인 가구를 위한 생활 관리판</p>
        <h1>이번 달 생활비와<br />챙길 계약을, 한 화면에.</h1>
        <p className="hero-copy">매일 쓰는 가계부 대신, 월 1~2회 점검하는 나만의 생활 관리판을 만들어 보세요.</p>
        <Link href="/login" className="primary-button">무료로 시작하기 <ArrowRight size={18} /></Link>
        {!configured && <p className="setup-note">Supabase 연결을 마치면 이메일로 바로 시작할 수 있어요.</p>}
      </section>
      <section className="feature-grid" aria-label="주요 기능">
        {features.map(({ icon: Icon, title, description }) => <article className="feature-card" key={title}><span className="feature-icon"><Icon size={21} /></span><h2>{title}</h2><p>{description}</p></article>)}
      </section>
    </main>
  );
}
