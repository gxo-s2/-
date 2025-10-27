# 개발 일지

## 프로젝트 개요
- 프로젝트명 : 수면 패턴 분석 웹 애플리케이션
- 개발 기간 : 2일
- 목표 : 사용자의 수면 기록 데이터를 분석하여 건강한 수면 습관 형성을 돕는 개인 맞춤형 대시보드

## 개발 과정

### Day1 (2025.10.26)

#### Step1 - 프로젝트 기획
- 작업 내용:
    - **GEMINI.md** 파일 생성을 통한 초기 개발 가이드라인, 기술 스택, 코딩 원칙 정의
    - 프로젝트 목표 및 핵심 기능(CRUD, 시각화, 맞춤형 팁) 구체화
    
- **Gemini CLI 사용 프롬포트** : "나는 '수면 패턴 분석' 웹 애플리케이션 개발 프로젝트를 시작하려고 해. 프로젝트 초기 설정을 위해 개발 가이드라인과 기술 스택, 코딩 스타일을 명시한 GEMINI.md 파일을 생성해줘.

- 결과 및 수정사항 : 초기 설정 완료. 개발 방향 명확화
- 학습 내용 : 프로젝트 초기 단계에서의 AI(Gemini CLI)를 활용한 환경 설정 및 문서화의 효율성

#### step2 - UI 구현(React & Tailwind 초기 환경 구축)
- 작업 내용:
    - React (Vite) 프로젝트 생성 및 Tailwind CSS 설정.
    - `App.jsx` 파일에 전체 화면 레이아웃 및 수면 기록 폼/목록 영역의 기본 컴포넌트 구조 배치.

- **Gemini CLI 사용 프롬포트** : "React(Vite)와 Tailwind CSS 설정을 포함하는 단일 App.jsx 파일을 생성해줘. 전체 화면을 차지하는 레이아웃을 구성하고, 중앙에 수면 기록을 입력할 수 있는 폼과 수면 기록 목록을 표시할 공간을 Tailwind 클래스를 사용하여 반응형으로 배치하는 기본 컴포넌트 구조만 만들어줘."

- 결과 및 수정사항 : 앱의 기본 뼈대 완성. Tailwind CSS 클래스 정렬(Class Ordering) 규칙 적용 확인.
- 학습 내용 : React의 컴포넌트 구조 이해, Tailwind CSS를 활용한 신속한 반응형 레이아웃 구성 방법.

#### step3 - LocalStorage CRUD 유틸리티 구현
- 작업 내용:
    - 'sleepStorage.js' 파일 생성.
    - 수면 기록 데이터('sleep_records')의 **CRUD** (생성, 읽기, 수정, 삭제)를 담당하는 유틸리티 함수 구현('getAllRecords','saveRecord', 'updateRecord', 'deleteRecord').

- **Gemini CLI 사용 프롬포트** : "수면 기록 데이터(sleep_records)를 LocalStorage에 저장하고 관리하는 JavaScript 유틸리티 함수들을 만들어줘. 이 함수들은 JSON.parse/stringify를 사용하여 데이터를 안전하게 다뤄야 해."

- 결과 및 수정사항 : 데이터 로직 모듈화 완료. JSON.parse/stringify 에러 처리 로직 추가(수정사항)
- 학습 내용 : LocalStorage의 비동기적 특성 및 JSON을 활용한 데이터 직렬화/역직렬화의 중요성.

#### step4 - UI와 데이터 로직 통합 및 기능 구현
- 작업 내용:
    - 'App.jsx' 수정 : React의 'useState'와 'useEffect'를 사용하여 수면 기록 상태 관리 로직 추가.
    - 컴포넌트 마운트 시 'getAllRecords()'를 호출하여 데이터 로드.
    - 새로운 기록 생성 시 'saveRecord(newRecord)'를 호출하고, UI 상태를 즉시 업데이트하도록 'handleSubmit' 함수 수정.

-**Gemini CLI 사용 프롬프트**: "현재 App.jsx 파일에서 sleepStorage.js의 getAllRecords, saveRecord 함수를 사용하여 기능을 구현할 수 있도록 코드를 수정해줘."

- 결과 및 수정사항 : 기록 생성 기능 및 목록 표시 기능 정상 작동.
- 학습 내용 : React Hooks (`useState`, `useEffect`)를 활용한 상태 관리 및 외부 모듈(LocalStorage 유틸리티)과의 연동 패턴.

### Day 2(2025.10.27)