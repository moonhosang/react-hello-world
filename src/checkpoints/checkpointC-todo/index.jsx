// ============================================================
// 체크포인트 C · 할 일 관리 앱 (CRUD)   (누적 프로젝트)
// ============================================================
// 지금까지 배운 것을 한 앱에 엮는 누적 프로젝트다.
//   - state(useState 배열)     : 할 일들을 담고, 바뀔 때마다 화면을 다시 그린다
//   - controlled input          : 입력창의 값을 state로 다룬다
//   - 리스트 렌더(map / key)     : 배열을 목록으로 그린다
// 여기에 CRUD(추가·조회·수정·삭제)를 얹어 실제로 동작하는 앱을 만든다.

import TodoApp from './TodoApp.jsx'
import PracticeLevels from '../../components/PracticeLevels.jsx'
import PracticeTodoEasy from './practiceEasy.jsx'
import PracticeTodoMedium from './practiceMedium.jsx'
import PracticeTodoHard from './practiceHard.jsx'
import SolutionTodo from './solution.jsx'
import TechTags from '../../components/TechTags.jsx'

export default function CheckpointC({ onGo }) {
  return (
    <section>
      <header className="lesson-header">
        <span className="badge checkpoint-badge">✅ 체크포인트 C</span>
        <h2>할 일 관리 앱 (CRUD)</h2>
        <p>state · controlled input · 리스트 렌더(map/key)를 한 앱에 엮어, 추가·완료 토글·삭제가 모두 되는 할 일 앱을 만든다.</p>
      </header>

      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 학습 포인트</span>
        <p>지금까지 배운 state · controlled input · 리스트 렌더(map/key)를 한 앱에 엮어, 추가·완료 토글·삭제(CRUD)가 모두 되는 할 일 앱을 완성한다.</p>
      </div>

      <TechTags
        onGo={onGo}
        items={[
          { label: 'useState', to: 3.1 },
          { label: '배열 불변성(map/filter/spread)', to: 5 },
          { label: 'controlled input', to: 4 },
          { label: '리스트 + key', to: 5 },
          { label: 'localStorage', to: null },
        ]}
      />

      <h3 className="section-title">완성된 앱 — CRUD가 실제로 동작한다</h3>
      <span className="learn-tag">📎 학습 포인트 · 상태는 항상 '새 배열'로 set 한다(불변성)</span>
      <p className="section-desc">할 일 하나로 CRUD 네 동작이 다 돈다. 정리하면:</p>
      <ul className="section-list">
        <li><b>추가(C)</b> — 입력창에 쓰고 [추가]를 누르면 새 할 일이 목록에 붙는다.</li>
        <li><b>조회(R)</b> — <code>todos</code> 배열을 목록으로 그리고, 전체·남은 개수를 함께 보여준다.</li>
        <li><b>완료 토글(U)</b> — 체크박스나 글자를 누르면 그 항목의 완료 여부가 바뀐다.</li>
        <li><b>삭제(D)</b> — ✕를 누르면 그 항목만 목록에서 빠진다.</li>
        <li><b>파일 구성</b> — <code>TodoApp.jsx</code>(상태·CRUD) + <code>TodoItem.jsx</code>(한 줄)로 나뉘어 있다.</li>
      </ul>
      <div className="card">
        <div className="file-label">📄 TodoApp.jsx · TodoItem.jsx</div>
        <TodoApp />
      </div>

      <PracticeLevels
        solutionFile="checkpointC-todo/solution.jsx"
        solution={<SolutionTodo />}
        levels={[
          {
            label: '쉬움',
            file: 'checkpointC-todo/practiceEasy.jsx',
            task: '지금은 [추가]를 눌러도 목록에 안 생기고 ✕를 눌러도 안 지워진다. 두 곳만 채워 추가·삭제를 되살리자.',
            hints: [
              '① 먼저 체험 — 할 일을 써서 [추가]를 눌러보라. 아무것도 안 늘어난다. ✕도 눌러보라. 그대로다. 이 두 가지가 우리가 고칠 문제다.',
              '② 어디 — practiceEasy.jsx에 🟢 TODO가 둘 있다. addTodo() 함수 안(추가)과 deleteTodo() 함수 안(삭제)이다. 둘 다 지금은 setTodos(todos)라 아무 변화가 없다.',
              '③ 어떻게(추가) — 🟢 TODO 1에서 setTodos(todos)를 기존 배열 뒤에 새 항목을 붙인 새 배열로 바꾼다: setTodos([...todos, { id: nextId.current++, text: value, done: false }]).',
              '③ 어떻게(삭제) — 🟢 TODO 2에서 setTodos(todos)를 그 id만 뺀 새 배열로 바꾼다: setTodos(todos.filter((t) => t.id !== id)).',
              '④ 확인 — 다시 추가하면 목록에 뜨고, ✕를 누르면 그 줄만 사라진다. state는 원본을 고치지 말고 늘 새 배열로 set 해야 화면이 다시 그려진다.',
            ],
            node: <PracticeTodoEasy />,
          },
          {
            label: '중간',
            file: 'checkpointC-todo/practiceMedium.jsx',
            task: '지금은 [추가]를 눌러도 안 생기고 체크박스를 눌러도 완료가 안 된다. 비어 있는 추가(C)·토글(U)을 채우자. (삭제는 예시로 되어 있다)',
            hints: [
              '① 먼저 체험 — 할 일을 추가해 보고, 있는 항목의 체크박스를 눌러보라. 둘 다 반응이 없다. 삭제(✕)만 이미 동작한다.',
              '② 어디 — practiceMedium.jsx에 🟡 TODO가 둘이다. addTodo()에는 newTodo까지 만들어져 있고 set 한 줄만 빠졌고, toggleTodo()는 통째로 비어 있다.',
              '③ 어떻게(추가) — addTodo() 안, 이미 만든 newTodo를 기존 배열 뒤에 붙여 set 한다: setTodos([...todos, newTodo]).',
              '③ 어떻게(토글) — toggleTodo(id) 안, 같은 id인 항목만 done을 뒤집은 새 배열로 set 한다: setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t))). 아래 deleteTodo가 filter로 새 배열을 만드는 예시이니 모양을 참고하라.',
              '④ 확인 — 추가하면 목록에 뜨고, 체크박스를 누르면 그 줄에 취소선이 생기고 남은 개수가 바뀐다.',
            ],
            node: <PracticeTodoMedium />,
          },
          {
            label: '어려움',
            file: 'checkpointC-todo/practiceHard.jsx',
            task: '지금은 UI 껍데기만 있어 글자도 안 써지고 목록도 안 나온다. 상태·추가·토글·삭제·목록 렌더를 처음부터 만들어 살아 있는 앱으로 만들자.',
            hints: [
              '① 먼저 체험 — 입력창에 타이핑해도 글자가 안 들어가고, 목록 자리에는 자리표시자 한 줄만 있다. 아래 🔴 TODO 다섯 곳을 채우면 살아난다.',
              '② 상태(🔴 TODO 1) — 함수 맨 위 가짜 const todos/text를 진짜 state로 바꾼다: const [todos, setTodos] = useState([]) / const [text, setText] = useState(\'\') / const nextId = useRef(1).',
              '③ 입력·목록(🔴 TODO 2·3) — input을 controlled로 연결하고(value={text}, onChange로 setText), 자리표시자 대신 todos.map으로 목록을 그린다(각 <li>에 key={todo.id} 필수). 전체·남은 개수도 실제 값으로 표시한다.',
              '④ 추가·토글·삭제(🔴 TODO 2·4·5) — addTodo는 빈 값을 무시하고 [...todos, 새항목]으로 추가한 뒤 setText(\'\')로 입력창을 비운다. toggleTodo는 map으로 done을 뒤집고, deleteTodo는 filter로 그 항목을 뺀다. 셋 다 늘 새 배열로 set 한다.',
              '⑤ 확인 — 타이핑이 반영되고, 추가하면 목록과 개수가 늘고, 체크박스로 완료 토글, ✕로 삭제까지 다 된다.',
            ],
            node: <PracticeTodoHard />,
          },
        ]}
      />

      <div className="try-it">
        <h4>💡 배운 개념이 어디에 쓰였나</h4>
        <ul>
          <li><b>state (useState 배열)</b> — 할 일들을 <code>todos</code> 배열에 담고, set 할 때마다 화면이 다시 그려진다.</li>
          <li><b>controlled input</b> — 입력창의 값을 <code>text</code> state로 다뤄, 추가 후 <code>setText('')</code>로 비운다. (Create)</li>
          <li><b>리스트 렌더 (map / key)</b> — <code>todos.map</code>으로 목록을 그리고, 각 항목에 <code>key={'{todo.id}'}</code>를 준다. (Read)</li>
          <li><b>불변성</b> — 추가는 <code>[...todos, 새항목]</code>, 토글은 <code>map</code>, 삭제는 <code>filter</code> — 언제나 <b>새 배열</b>로 set 한다.</li>
          <li><b>안전한 id</b> — 렌더 중 <code>Date.now()</code>/랜덤 대신 <code>useRef</code> 증가 카운터로 만든다.</li>
          <li><b>컴포넌트 분리 + props</b> — 한 줄은 <code>TodoItem</code>이 그리고, 토글·삭제는 부모가 넘긴 함수(<code>onToggle</code>·<code>onDelete</code>)를 호출한다.</li>
        </ul>
      </div>
    </section>
  )
}
