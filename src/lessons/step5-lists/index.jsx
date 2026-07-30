// ============================================================
// 6단계 · 리스트 (투두)  (배우는 것: 배열 상태, map, key, 조건부 렌더링)
// ============================================================
// 이 강의는 세 개의 컴포넌트로 나뉜다:
//   - TodoInput : 입력 담당
//   - TodoList  : 목록 담당  →  TodoItem : 한 줄 담당
//
// 그런데 "할 일 데이터(todos)"는 누가 가질까?
// → 입력도, 목록도 모두 이 데이터가 필요하므로 공통 부모인 여기(index.jsx)가 가진다.
//   이렇게 상태를 공통 부모로 끌어올리는 것을 "상태 끌어올리기(lifting state up)"라고 한다.
//   부모는 데이터를 바꾸는 함수(add/toggle/delete)를 자식에게 props로 내려준다.

import { useState } from 'react'
import TodoInput from './TodoInput.jsx'
import TodoList from './TodoList.jsx'
import ImmutabilityDemo from './ImmutabilityDemo.jsx'
import Practice from '../../components/Practice.jsx'
import PracticeList from './practice.jsx'
import SolutionList from './solution.jsx'

let nextId = 4 // 새 할 일에 붙일 id (간단히 하기 위해 컴포넌트 밖에 둠)

export default function Stage5() {
  const [todos, setTodos] = useState([
    { id: 1, text: '리액트 1단계 복습하기', done: true },
    { id: 2, text: 'useState 이해하기', done: true },
    { id: 3, text: '투두 리스트 완성하기', done: false },
  ])

  // 추가: 기존 배열 뒤에 새 항목을 붙인 "새 배열"을 만든다
  function addTodo(text) {
    setTodos([...todos, { id: nextId++, text, done: false }])
  }

  // 수정(완료 토글): 클릭한 항목만 done을 뒤집은 새 배열
  function toggleTodo(id) {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)))
  }

  // 삭제: 해당 id를 제외한 항목만 남긴다
  function deleteTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const remaining = todos.filter((todo) => !todo.done).length

  return (
    <section>
      <header className="lesson-header">
        <span className="badge">6단계</span>
        <h2>투두 리스트</h2>
        <p>배열 상태를 map으로 렌더링하고, 추가/완료/삭제를 구현해 본다.</p>
      </header>

      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 학습 포인트</span>
        <p>배열 상태는 원본을 바꾸지 말고 항상 새 배열을 만들어 set 한다.</p>
      </div>

      <div className="card todo-card">
        <div className="file-label">📄 TodoInput.jsx(입력) · TodoList.jsx(목록·TodoItem 포함) · 데이터는 index.jsx</div>
        {/* 자식에게 "데이터"와 "바꾸는 함수"를 props로 내려준다 */}
        <TodoInput onAdd={addTodo} />
        <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
        <p className="todo-footer">남은 할 일: {remaining}개</p>
      </div>

      <h3 className="section-title">🧱 먼저 — 참조 vs 값 (왜 복사인가)</h3>
      <span className="learn-tag">📎 학습 포인트 · 객체·배열은 값이 아니라 '같은 상자를 가리키는 참조'라, 원본을 바꾸면 사본도 같이 바뀐다</span>
      <div className="concept">
        <p className="concept-lead">
          숫자·문자열 같은 <b>값</b>은 대입할 때 복사된다. 하지만 <b>객체·배열</b>은 <b>같은 상자(참조)</b>를 가리킨다.
        </p>
        <pre className="concept-flow">{`// 값(원시): 복사된다
let a = 1
let b = a       // b는 a의 '복사본'
b = 2
// → a는 1, b는 2   (서로 무관)

// 참조(객체·배열): 같은 상자를 가리킨다
let x = [1]
let y = x        // y는 x와 '같은 배열'
y.push(2)
// → x도 [1, 2]!   (x와 y가 한 상자를 봄)`}</pre>
        <p className="section-desc" style={{ margin: 0 }}>
          그래서 상태인 배열/객체를 <code>push</code>로 바꾸면 <b>여전히 같은 상자</b>다 → 리액트는 이전과 같다고 본다.
          <b> 새 상자</b>(<code>[...arr]</code> · <code>{'{ ...obj }'}</code>)를 만들어야 "달라졌다"고 알아챈다. 아래에서 확인해 보자. ↓
        </p>
      </div>

      <h3 className="section-title">⚠️ 왜 push가 아니라 새 배열인가 — 불변성</h3>
      <span className="learn-tag">📎 학습 포인트 · push로 원본을 바꾸면 리액트가 변화를 못 알아채 화면이 안 바뀐다</span>
      <p className="section-desc">
        배열 상태는 <b>원본을 직접 바꾸면 안 된다.</b> 리액트는 '새 배열인지'로 변화를 판단하기 때문에,
        <code>push</code>로 바꾸면 화면이 안 바뀐다. 항상 <code>[...arr, 새값]</code>처럼 <b>새 배열</b>을 만들어 set 한다.
      </p>
      <ImmutabilityDemo />

      <Practice
        task="fruits 배열을 map으로 목록(<li>)으로 그려 보자. 각 항목에 key를 준다."
        goal="배열을 map으로 JSX 목록으로 바꾸고 key를 주는, 리스트 렌더링의 기본을 익힌다."
        hints={[
          'fruits.map((fruit) => <li key={fruit}>{fruit}</li>)',
          'map으로 만든 요소엔 반드시 고유한 key.',
          '배열이 늘어나도 코드는 그대로다.',
        ]}
        practiceFile="step5-lists/practice.jsx"
        solutionFile="step5-lists/solution.jsx"
        solution={<SolutionList />}
      >
        <PracticeList />
      </Practice>

      <div className="try-it">
        <h4>🛠️ 직접 해보기</h4>
        <ol>
          <li><b>완료된 항목만 지우는</b> "완료 비우기" 버튼을 추가해 보자. (힌트: <code>filter</code>)</li>
          <li>"전체 / 진행중 / 완료" 필터 버튼을 만들어 목록을 걸러 보자.</li>
          <li>할 일을 <b>더블클릭</b>하면 내용을 수정할 수 있게 만들어 보자. (도전!)</li>
        </ol>
      </div>
    </section>
  )
}
