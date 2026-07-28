# 체크포인트 C · 할 일 관리 앱 (CRUD)

> 📂 파일
> - `index.jsx` — 실습 화면 (완성 앱 + 실습 블록)
> - `TodoApp.jsx` — 완성된 라이브 앱 (상태·CRUD 로직)
> - `TodoItem.jsx` — 할 일 한 줄을 그리는 컴포넌트
> - `practice.jsx` — 내가 완성할 실습 파일 (TODO 있음)
> - `solution.jsx` — 정답 예시 (앱에서 "정답 보기"로 확인)

## 목표

지금까지 배운 것을 한 앱에 엮는 **누적 프로젝트**다.

- **state** (useState 배열) · 이벤트
- **controlled input**
- **리스트 렌더** (map · key)
- **불변성** (언제나 새 배열로 set)

여기에 CRUD를 얹어 실제로 동작하는 할 일 앱을 만든다.

## 과제 (CRUD)

1. **Create** — 입력창을 controlled로 만들고, 추가 시 `todos`에 새 항목을 넣는다. 빈 값은 무시. (`[...todos, 새항목]`)
2. **Read** — `todos`를 `map`으로 목록에 그린다. `key` 필수. 개수도 표시한다.
3. **Update** — 체크박스/클릭으로 `done`을 토글한다. (`map`으로 새 배열)
4. **Delete** — `✕`로 그 항목을 뺀다. (`filter`로 새 배열)

## 규칙

- 상태는 항상 **새 배열**로 set 한다(불변성).
- id는 렌더 중 `Date.now()`/랜덤 대신 `useRef` 증가 카운터로 안전하게 만든다.

막히면 앱에서 **👀 정답 보기**로 `solution.jsx`와 비교해 보자.
