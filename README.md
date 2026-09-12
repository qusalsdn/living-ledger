# 혼자살림

1인 가구의 고정비와 생활 계약을 한 화면에서 관리하는 데스크톱 우선 웹서비스입니다.

## 시작하기

```bash
pnpm dev
```

브라우저에서 [http://localhost:4000](http://localhost:4000)을 엽니다.

Supabase를 연결할 때는 `.env.example`을 `.env.local`로 복사하고 프로젝트 값을 입력합니다.

이메일 인증 후 돌아올 수 있도록 Supabase Authentication의 URL Configuration에 `http://localhost:4000/auth/callback`을 Redirect URL로 등록하세요.

## Phase 2 데이터베이스 설정

고정비와 계약 일정 기능을 사용하려면 Supabase SQL Editor에서 [Phase 2 마이그레이션](supabase/migrations/202609120001_phase2_core.sql)을 실행하세요. 이 마이그레이션은 두 테이블과 Row Level Security 정책을 만들며, 로그인한 사용자는 자신의 데이터만 읽고 수정할 수 있습니다.

## 문서

- 프로젝트 맥락과 작업 규칙: `AGENTS.md`
- 서비스 기획: `docs/product.md`
- 기능 요구사항: `docs/requirements.md`
- 개발 로드맵: `docs/roadmap.md`

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
