# AIPOS.md

## AI PROCESS OPERATING STANDARD

**Version:** 1.1  
**Updated:** 2026-08-19  
**Status:** Master Standard

---

## 1. AIPOS의 역할

AIPOS(AI PROCESS OPERATING STANDARD)는 AI를 이용해 요구사항 정의부터 설계, 개발, 데이터베이스, 배포, 검증, 운영, 비용관리, 변경관리, 인수인계까지 수행할 때 적용하는 AI-Human 협업 운영표준이다.

AIPOS의 목적은 단순히 AI에게 코딩을 시키는 것이 아니다. 사람의 목표·판단·승인과 AI의 조사·분석·설계·개발·검증 능력을 결합해 실제 Production 시스템을 안전하고 반복 가능하게 만드는 것이 목적이다.

AIPOS는 다음 Lifecycle 전체를 관리한다.

`요구사항 → 설계 → 개발 → 데이터 → 배포 → 검증 → 운영 → 비용 → 변경관리 → 인수인계`

---

## 2. 제1원칙 — Cost Sustainability First

> **아무리 우수한 AI 설계와 기능이라도 고객이 지속적으로 감당할 수 없는 비용 구조라면 좋은 시스템이 아니다.**

AIPOS의 판단 기준은 다음과 같다.

> **가장 뛰어난 AI를 만드는 것이 아니라, 고객에게 필요한 수준의 AI를 가장 낮고 예측 가능한 비용으로 지속 제공한다.**

### 운영 규칙

- 필요한 경우에만 AI를 호출한다.
- 동일 결과는 Cache 또는 DB에 저장해 재사용한다.
- 동일 요청에 대한 중복 AI 호출을 방지한다.
- 최고 성능 모델보다 요구 품질을 충족하는 경제적인 모델을 우선한다.
- 거래당 AI 비용을 측정 또는 추정한다.
- 일/주/월 사용량과 비용 추세를 관리자가 확인할 수 있어야 한다.
- 월 예산을 사전 설정한다.
- Warning → Restriction → Hard Stop 체계를 적용한다.
- 사용자 증가에 따른 비용 Curve를 사전에 검토한다.

---

## 3. 제2원칙 — Production Baseline First

기능을 수정하기 전에 실제 Production 기준선을 먼저 확인한다.

반드시 다음 Chain을 확인한다.

`Production Domain → Deployment Project → GitHub Repository → Production Branch → Commit SHA → Environment Variables → Database → AI Project/API`

하나라도 불일치하면 기능 수정이나 사용자 테스트를 먼저 진행하지 않는다.

**Code가 맞는 것과 실제 Production이 맞는 것은 다른 문제다.**

---

## 4. 제3원칙 — One Production Source

운영 서비스에는 하나의 Source of Truth만 존재해야 한다.

다음 상태를 금지한다.

- Production 후보 GitHub Repository가 여러 개 존재하는 상태
- 동일 서비스를 여러 Deployment Project가 운영하는 상태
- 과거 Repository의 자동배포가 살아 있는 상태
- Preview와 Production을 혼동하는 상태
- AI가 오래된 Repository나 과거 UI를 기준으로 수정하는 상태

프로젝트 시작 시 다음을 명시적으로 고정한다.

- Production Repository
- Production Branch
- Production Domain
- Production Database
- Production Deployment Project

---

## 5. 제4원칙 — Self-Test Before Human Test

AI가 기능을 구현했다고 바로 사용자에게 반복 테스트를 요청하지 않는다.

먼저 서버 Self-Test 또는 자동 점검으로 다음을 확인한다.

- Database 연결
- 핵심 Table 접근
- API Key 존재 여부
- External AI API 접근
- Environment Variables
- Cost Guard
- Budget 설정
- 주요 Backend API 상태

**Self-Test PASS 후에만 실제 사용자 End-to-End 테스트를 수행한다.**

이는 실패 요청 중복 적재, 불필요한 AI 호출, 사용자 시간 낭비, 원인 불명 반복테스트를 방지하기 위한 원칙이다.

---

## 6. AI DevOps 장애진단 표준

### Gate 1 — Production Baseline

1. Domain 확인
2. Deployment Project 확인
3. GitHub Repository 확인
4. Production Branch 확인
5. Commit SHA 확인

### Gate 2 — Runtime Configuration

1. Environment Variables 존재 여부
2. Production Scope 적용 여부
3. Secret / Publishable Key 유형 확인
4. 환경변수 변경 후 Redeploy 여부 확인

### Gate 3 — Infrastructure

1. Database 연결
2. Table 및 RLS/권한
3. External API 연결
4. AI API 연결
5. Cost API 및 Budget

### Gate 4 — Application Flow

1. UI Request
2. Backend API
3. Business Logic
4. DB 저장
5. 결과 조회

### Gate 5 — End-to-End

대표 사용자 시나리오 1건을 처음부터 끝까지 실행한다.

> **상위 Gate가 실패하면 하위 Gate의 코드를 먼저 수정하지 않는다.**

---

## 7. AI Change Scope Control

AI에게 수정 요청할 때는 변경 대상과 변경 금지 대상을 동시에 정의한다.

예시:

- 변경 대상: 특정 API, 특정 화면, 특정 Business Logic
- 변경 금지: 승인된 Logo, Hero, 모바일 Layout, Result UI, Production Baseline

AI가 과거 코드를 복원하거나 요청 범위를 넘어 무관한 부분까지 변경하는 것을 방지하기 위해 승인된 화면과 기준 소스는 보호 대상으로 취급한다.

---

## 8. Secret & Environment Management

API Key와 환경변수는 코드와 별도의 Release 구성요소로 관리한다.

### 원칙

- Secret을 GitHub Repository에 저장하지 않는다.
- Secret 값을 채팅, 문서, 스크린샷에 노출하지 않는다.
- Secret 노출 시 즉시 폐기 또는 Rotate 후 새 Key로 교체한다.
- Browser용 Publishable Key와 Server용 Secret Key를 분리한다.
- Production / Preview Scope를 구분한다.
- Environment 변경 후 반드시 Production Redeploy를 수행한다.
- Release 전 Environment Checklist 또는 Self-Test로 설정을 자동 검증한다.

---

## 9. Release Definition of Done

AIPOS에서 `Code Complete`는 완료가 아니다.

Release는 다음 조건을 만족해야 완료로 인정한다.

1. Production Source 확인
2. Build 성공
3. Production Deployment 성공
4. Domain 연결 확인
5. Environment Variables 확인
6. Database 연결 및 권한 확인
7. External API/AI API 확인
8. Self-Test PASS
9. 대표 End-to-End 시나리오 성공
10. 비용 및 Budget Guard 확인
11. 사용자 최종 확인
12. Deployment Record와 변경이력 저장

> **Code Complete ≠ Project Complete**

> **Production Verified = Complete**

---

## 10. AI와 사람의 역할

### AI가 강한 영역

- 빠른 코드 생성과 수정
- Frontend / Backend / DB / API 간 연결 작업
- 로그 및 소스 비교
- 반복 테스트 및 문서화
- 요구사항 구조화
- 변경이력 및 체크리스트 생성

### 사람이 반드시 통제해야 하는 영역

- 목표
- 우선순위
- Production Baseline
- 변경 승인
- 비용
- Release
- 품질 판단
- 최종 사용자 경험

AIPOS에서 AI는 무제한 자율 개발자가 아니라 **명확한 기준선과 Release Gate 아래에서 동작하는 AI DevOps 수행자**로 정의한다.

---

## 11. 프로젝트별 AIPOS 관계

`AIPOS.md`는 모든 프로젝트의 Master Standard이다.

프로젝트별 기준문서는 Master Standard를 상속한다.

예:

- `KDN_AIPOS.md`
- `LAYAD_AIPOS.md`
- `AHAV_AIPOS.md`
- 기타 프로젝트별 `XXX_AIPOS.md`

프로젝트 수행 과정에서 발견한 새로운 원칙이 다른 프로젝트에도 적용할 가치가 있으면 `AIPOS.md` Master Standard로 승격한다.

---

## 12. 이번 업데이트의 핵심

AIPOS는 AI가 코드를 잘 만드는 방법론을 넘어 다음 단계로 확장한다.

> **AI와 사람이 실제 Production 시스템을 안전하고 경제적으로 구축·운영하기 위한 표준**

이번 업데이트에서 공통 표준으로 승격한 핵심 항목은 다음과 같다.

- Cost Sustainability First
- Production Baseline First
- One Production Source
- Self-Test Before Human Test
- Release Gate
- Change Scope Control
- Secret Management
- Production Verified Definition of Done

---

## 13. 변경이력

| Version | Date | Change |
|---|---|---|
| v1.1 | 2026-08-19 | AI DevOps Production 운영 경험을 반영해 Production Baseline, One Production Source, Self-Test, Release Gate, Change Scope Control, Secret Management, Production Verified Definition of Done을 Master Standard로 추가 |