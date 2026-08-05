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
import QuickQuiz from '../../components/QuickQuiz.jsx'
import SourceTrace from '../../components/SourceTrace.jsx'

// 배열 상태 — map으로 목록 렌더 + 추가 시 '새 배열'을 만들어 set → 리렌더 → 목록 갱신.
const LIST_CODE = `function addTodo(text) {
  setTodos([...todos, { id: nextId++, text, done: false }])  // 새 배열!
}

// 화면 — 배열을 map으로 목록으로
{todos.map((todo) => (
  <li key={todo.id}>{todo.text}</li>    // 항목마다 <li> + 고유 key
))}`

const LIST_STEPS = [
  {
    hl: [6, 7, 8],
    tag: '① 렌더',
    t: '배열을 map으로 목록으로 그린다',
    d: (<><code>todos</code> 배열을 <code>map</code>으로 돌려 항목마다 <code>&lt;li&gt;</code> 하나. <code>key={'{todo.id}'}</code>로 각 줄에 이름표를 붙여 리액트가 항목을 <b>구별</b>한다.</>),
    note: 'todos 3개 → <li> 3개',
  },
  {
    hl: [2],
    tag: '② 추가',
    t: '[...todos, 새항목]으로 새 배열을 만든다',
    d: (<><code>addTodo('산책')</code> 호출. <code>[...todos, 새항목]</code>으로 기존을 <b>복사한 새 배열</b>을 만든다(<code>push</code> ❌).</>),
    note: '새 배열: 기존 3 + 1 = 4개',
  },
  {
    hl: [2],
    tag: '③ 왜 새 배열?',
    t: 'push는 같은 상자 → 리액트가 못 알아챈다',
    d: (<><code>push</code>로 원본을 바꾸면 <b>같은 참조(상자)</b>라 리액트는 "안 바뀜"으로 본다. <code>[...todos, x]</code>는 <b>새 상자</b>라 "달라졌다"를 알아채 리렌더한다. (불변성)</>),
  },
  {
    hl: [6, 7, 8],
    tag: '④ 리렌더',
    t: 'map이 다시 돌아 <li> 4개',
    d: (<><code>setTodos</code>가 리렌더를 일으켜 <code>map</code>이 다시 돈다. 이번엔 <code>&lt;li&gt;</code> 4개. <code>key</code> 덕에 리액트가 <b>새로 생긴 항목만</b> 화면에 붙인다.</>),
    note: '화면: <li> 4개',
  },
  {
    tag: '⑤ toggle · delete',
    t: '수정·삭제도 "새 배열을 만들어 set"',
    d: (<>완료 토글은 <code>map</code>으로 그 항목만 바꾼 새 배열, 삭제는 <code>filter</code>로 뺀 새 배열. 추가·수정·삭제 <b>셋 다 같은 패턴</b> — 원본을 건드리지 않고 새 배열을 만든다.</>),
  },
]

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

      <h3 className="section-title">🔬 코드가 도는 순서 — 추가하면 목록이 늘어나기까지</h3>
      <span className="learn-tag">📎 학습 포인트 · map으로 목록을 그리고, 추가는 '새 배열'을 만들어 set → 리렌더로 목록이 갱신된다</span>
      <SourceTrace file="투두 — 배열 렌더 & 추가" code={LIST_CODE} steps={LIST_STEPS} />

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

      <h3 className="section-title">🧩 확인 드릴 — map · key 손에 익히기</h3>
      <span className="learn-tag">📎 학습 포인트 · 배열은 map으로 목록이 되고, 각 항목엔 고유 key를 준다 — 다섯 번 확인한다</span>
      <QuickQuiz
        intro="같은 규칙(배열 → map → 목록, 항목마다 고유 key)을 상황만 바꿔 다섯 번 확인한다."
        questions={[
          {
            q: '배열 fruits를 화면 목록으로 그리려면?',
            options: ['fruits.map(fruit => <li key={fruit}>{fruit}</li>)', 'fruits.push(<li>...</li>)', 'for 문으로 fruits를 직접 바꾼다'],
            codeOptions: true,
            answer: 0,
            explain: '배열을 map으로 돌려 원소마다 <li>를 만들면 JSX 목록이 된다. 이게 리스트 렌더링의 기본이다.',
          },
          {
            q: 'map으로 목록을 만들 때 key는 어디에 붙이나?',
            options: ['map이 돌려주는 가장 바깥 요소(<li>)에', '가장 안쪽 텍스트에', 'map을 부르는 배열 이름에'],
            answer: 0,
            explain: 'key는 map이 돌려주는 각 항목의 가장 바깥 요소(<li>)에 붙인다. 그래야 리액트가 항목들을 구별한다.',
          },
          {
            q: 'key 값으로 가장 알맞은 것은?',
            options: ['항목마다 고유한 값 (예: todo.id)', '모든 항목에 똑같은 문자열', '매번 새로 만드는 랜덤 숫자'],
            answer: 0,
            explain: 'key는 항목을 구별하는 이름표라 항목마다 고유해야 한다. 보통 데이터의 id를 쓴다. 같은 값이면 구별이 안 된다.',
          },
          {
            q: 'map으로 만든 목록에 key를 안 주면 어떻게 되나?',
            options: ['화면엔 나오지만 콘솔에 경고가 뜬다', '빌드가 아예 안 된다', '항목이 거꾸로 나온다'],
            answer: 0,
            explain: 'key가 없어도 화면엔 그려지지만 리액트가 콘솔에 경고를 남긴다. 항목을 제대로 구별하려면 고유 key가 필요하다.',
          },
          {
            q: '아래 map의 콜백은 원소마다 무엇을 돌려주나?',
            code: `todos.map(todo => <li key={todo.id}>{todo.text}</li>)`,
            options: ['원소마다 <li> 하나 (JSX)', 'todos 배열을 직접 바꾼다', '아무것도 안 돌려준다'],
            answer: 0,
            explain: '화살표 함수 본문이 식(JSX)이면 그 값이 그대로 반환된다. 원소마다 <li> 하나가 나와 새 JSX 배열이 되고, 원본 todos는 안 바뀐다.',
          },
        ]}
      />
    </section>
  )
}
