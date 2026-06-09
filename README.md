# React Todo

Vanilla JavaScript로 만든 Todo 앱을 React Function Component 구조로
마이그레이션한 프로젝트입니다.

## 실행 방법

```bash
npm install
npm run dev
```

개발 서버 실행 후 `http://localhost:5173`에서 확인할 수 있습니다.

## 구현 기능

- Todo 생성, 조회, 인라인 수정, 완료 및 삭제
- 빈 입력값과 빈 목록 안내
- 전체, 진행 중, 완료 상태 필터
- 이전 날짜와 다음 날짜로 이동하는 일간 뷰
- 선택한 날짜별 Todo 관리
- 월요일부터 일요일까지 표시하는 주간 뷰
- 저번 주와 다음 주 이동
- 날짜별 Todo 개수 및 오늘 날짜 표시
- localStorage를 이용한 Todo 자동 저장 및 복원

## 프로젝트 구조

```text
src/
├─ components/
│  ├─ DailyDateNavigator.jsx
│  ├─ TodoFilter.jsx
│  ├─ TodoForm.jsx
│  ├─ TodoItem.jsx
│  ├─ TodoList.jsx
│  └─ WeeklyDateView.jsx
├─ utils/
│  ├─ date.js
│  └─ todoStorage.js
├─ App.jsx
├─ index.css
└─ main.jsx
```

`App`에서 Todo 목록, 필터, 선택 날짜와 주간 뷰 상태를 관리합니다.
하위 컴포넌트에는 화면에 필요한 값과 이벤트 처리 함수를 props로 전달합니다.
