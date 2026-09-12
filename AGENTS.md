# Project Context

## Service
1인 가구를 위한 고정비·계약 관리 웹서비스

## Core users
월세와 반복 지출을 관리하고 싶은 1인 가구

## Core features
- 월간 고정비 대시보드
- 계약 만료일 관리
- 구독 관리
- 월간 리포트

## Product direction
- 데스크톱 우선 웹서비스
- 모바일 앱과 푸시 알림은 현재 범위에 포함하지 않음
- 입력 부담이 적고 한 화면에서 비교·정리하기 쉬운 경험
- MVP 범위를 우선 구현

## Technical stack
- Next.js App Router
- TypeScript
- Supabase
- Tailwind CSS

## Working rules
- 기능 구현 전 관련 `docs/` 문서를 확인한다.
- 금액은 원 단위 정수로 다룬다.
- 개인정보를 최소한으로 수집한다.
- 기획과 구현 방향이 충돌하면 임의로 확장하지 않는다.

## Documentation
- 서비스 기획: `docs/product.md`
- 기능 요구사항: `docs/requirements.md`
- 개발 로드맵: `docs/roadmap.md`
