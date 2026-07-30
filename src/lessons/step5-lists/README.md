# 6단계 · 리스트 (투두) — map, key, 조건부 렌더링, 상태 끌어올리기

> 📂 이 폴더의 파일
> - `TodoInput.jsx` — 입력 담당 (자기 입력 상태를 가짐)
> - `TodoList.jsx` — 목록 담당 (map으로 그림)
> - `TodoItem.jsx` — 한 줄 담당
> - `index.jsx` — 할 일 데이터(todos)를 가진 **부모**

## 이 단계에서 배우는 것

- **배열**을 상태로 다루기
- 배열을 목록으로 그리는 **`map`** 과 이름표 **`key`**
- 상황에 따라 다른 화면을 보여주는 **조건부 렌더링**
- 배열 상태 변경 3패턴 (추가 / 수정 / 삭제)
- 여러 자식이 공유하는 상태를 부모로 올리는 **상태 끌어올리기**

---

## 1. 배열을 화면에 그리기 — map + key

```jsx
{todos.map((todo) => (
  <TodoItem key={todo.id} todo={todo} />
))}
```

- 배열은 `.map()`으로 각 항목을 JSX(컴포넌트)로 바꾼다
- 각 요소에는 **고유한 `key`** 를 준다 → 리액트가 항목을 구분하는 이름표
- 보통 데이터의 `id`를 key로 사용 (순서 바뀔 수 있으면 index는 피하기)

## 2. 조건부 렌더링

```jsx
if (todos.length === 0) {
  return <p>할 일이 없다 🎉</p>   // 비었을 때
}
return <ul>...목록...</ul>          // 있을 때
```

"있을 때만"은 `&&`도 자주 쓴다: `{remaining > 0 && <p>...</p>}`

## 3. 배열 상태 변경 3패턴 (핵심!)

⚠️ 원본을 직접 바꾸지 말고 **새 배열**을 만들어 `set`한다.

```jsx
setTodos([...todos, 새항목])                                   // 추가 (펼치기)
setTodos(todos.map((t) => t.id === id ? {...t, done:!t.done} : t)) // 수정
setTodos(todos.filter((t) => t.id !== id))                     // 삭제
```

## 4. 상태 끌어올리기 (lifting state up) ⭐

입력창(`TodoInput`)도, 목록(`TodoList`)도 모두 `todos` 데이터가 필요하다.
그래서 데이터를 **공통 부모인 `index.jsx`** 가 갖고,
바꾸는 함수(`addTodo`, `toggleTodo`, `deleteTodo`)를 자식에게 props로 내려준다.

```
        index.jsx  (todos 상태를 가짐)
        ├─ <TodoInput onAdd={addTodo} />
        └─ <TodoList todos={todos} onToggle={...} onDelete={...} />
              └─ <TodoItem ... />   ← 눌리면 부모에게 알림
```

자식은 "눌렸다"고 **알리기만** 하고, 실제 데이터 변경은 부모가 한다.
이 패턴은 리액트 앱 구조의 뼈대라서 꼭 익혀두자.

---

## 🛠️ 직접 해보기

1. **"완료 비우기"** 버튼 추가 (`filter`)
2. "전체 / 진행중 / 완료" **필터** 버튼
3. (도전) 더블클릭으로 할 일 **수정**하기

→ 이전: [4단계 · 입력 다루기](../step4-inputs/README.md) · 다음: [✅ 체크포인트 B](../../checkpoints/checkpointB-shopping/README.md)
