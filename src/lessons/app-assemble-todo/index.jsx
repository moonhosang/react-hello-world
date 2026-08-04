// 🛠️ Lv1-1 · 할 일 앱 조립 (완성된 조각을 배치·연결만)
// CRUD 로직 전부를 요구하는 Lv1-2 앞의 완만한 진입 단계.
// 로직(state·추가·토글·삭제)은 이미 주어지고, 학습자는 조각을 '조립(배치·연결)'만 한다.
// 취지: 앱 규모의 데이터 흐름(state는 부모 소유 → props로 내림 → 콜백으로 위에 알림)을 체감한다.

import PracticeLevels from '../../components/PracticeLevels.jsx'
import SolutionAssembly from './solutionAssembly.jsx'
import AssembleEasy from './practiceEasy.jsx'
import AssembleMedium from './practiceMedium.jsx'
import AssembleHard from './practiceHard.jsx'

export default function AssembleTodo() {
  return (
    <section>
      <header className="lesson-header">
        <span className="badge checkpoint-badge">🛠️ Lv1-1</span>
        <h2>할 일 앱 — 조립</h2>
        <p>완성된 조각(입력창·목록)을 <b>배치하고 연결</b>만 한다. CRUD 로직은 이미 있다 — 로직 완성은 <b>Lv1-2</b>에서 한다.</p>
      </header>

      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 학습 포인트</span>
        <p>
          앱의 <b>데이터 흐름</b>을 조립으로 익힌다 — <b>state는 부모가 소유</b>하고, 자식에겐 <b>props로 내려</b> 주고,
          자식은 <b>콜백(onAdd·onToggle·onDelete)으로 부모에게 알린다</b>. (→ 🔀 props vs state · 상태 끌어올리기)
        </p>
      </div>

      <div className="concept">
        <p className="concept-lead" style={{ margin: 0 }}>
          📌 조각은 이미 만들어져 있다: <code>TodoInput</code>(입력) · <code>TodoList</code>(목록) · <code>TodoItem</code>(한 줄).
          추가·토글·삭제 <b>로직도 부모에 이미 적혀 있다</b>. 너는 부모에서 이 조각들을 <b>배치하고 props·콜백으로 연결</b>만 하면 된다.
          "누가 state를 갖고, 무엇을 내려 주고, 무엇을 올려 받나"에 집중해 보자.
        </p>
      </div>

      <PracticeLevels
        goal="완성된 조각을 배치·연결해, 데이터가 부모↔자식으로 흐르게 조립한다."
        solutionFile="app-assemble-todo/solutionAssembly.jsx"
        solution={<SolutionAssembly />}
        levels={[
          {
            label: '쉬움',
            file: 'app-assemble-todo/practiceEasy.jsx',
            task: '목록은 이미 연결돼 있다. 위에 입력창(TodoInput)을 놓고 onAdd에 add를 연결해, 추가가 되게 하자.',
            hints: [
              '① 먼저 체험 — 목록은 보이는데 입력창이 없어 할 일을 추가할 수 없다. 이게 우리가 채울 곳이다.',
              '② 어디 — practiceEasy.jsx의 return 안 🟢 TODO(목록 위). 로직(add·toggle·remove)은 이미 다 돼 있으니 건드리지 않는다.',
              '③ 어떻게 — 그 자리에 <TodoInput onAdd={add} /> 한 줄을 넣는다. 입력창이 "추가해 달라"고 값과 함께 부르면(onAdd), 부모의 add가 state를 바꾼다.',
              '④ 확인 — 할 일을 쓰고 [추가]를 누르면 목록에 붙는다. 자식은 알리기만, 상태 변경은 부모가 한다.',
            ],
            node: <AssembleEasy />,
          },
          {
            label: '중간',
            file: 'app-assemble-todo/practiceMedium.jsx',
            task: '입력창·목록이 놓여 있는데 연결이 안 됐다. props·콜백을 이어 데이터를 흐르게 하자.',
            hints: [
              '① 먼저 체험 — 추가도 안 되고 목록도 비어 보인다. 조각에 값이 안 내려가서다.',
              '② 어디 — practiceMedium.jsx의 <TodoInput /> 과 <TodoList /> 의 props 자리(🟡 TODO 1·2).',
              '③ 어떻게 — 입력: <TodoInput onAdd={add} />. 목록: <TodoList todos={todos} onToggle={toggle} onDelete={remove} />.',
              '④ 확인 — 부모의 todos가 목록으로 내려가 그려지고, 체크·삭제·추가가 다 동작한다. state는 부모 하나(하나의 진실)에만 있다.',
            ],
            node: <AssembleMedium />,
          },
          {
            label: '어려움',
            file: 'app-assemble-todo/practiceHard.jsx',
            task: '조각과 로직은 다 있다. 부모의 return을 처음부터 조립해, 입력창과 목록을 놓고 전부 연결하자.',
            hints: [
              '① 무엇 — return 안이 자리표시자 한 줄뿐이다. TodoInput과 TodoList를 직접 놓고 연결한다.',
              '② 입력 — <TodoInput onAdd={add} /> 를 위에 놓는다.',
              '③ 목록 — 그 아래 <TodoList todos={todos} onToggle={toggle} onDelete={remove} /> 를 놓는다.',
              '④ 확인 — 추가·토글·삭제가 다 동작하면 조립 성공이다. 👀 정답 보기로 배선을 비교해 보라.',
            ],
            node: <AssembleHard />,
          },
        ]}
      />

      <div className="try-it">
        <h4>💡 조립에서 배운 것</h4>
        <ul>
          <li><b>state는 한 곳(부모)에만</b> — 여러 조각이 같은 데이터를 쓰니, 부모가 <code>todos</code>를 소유한다(하나의 진실).</li>
          <li><b>props로 내림</b> — 목록엔 <code>todos</code>를 내려 줘야 그릴 수 있다.</li>
          <li><b>콜백으로 올림</b> — 자식은 직접 못 바꾸고, <code>onAdd·onToggle·onDelete</code>로 부모에게 "이렇게 해 달라"고 값과 함께 알린다.</li>
          <li><b>다음(Lv1-2)</b> — 이 배선 위에 추가·토글·삭제 <b>로직을 직접 채워</b> CRUD 앱을 완성한다.</li>
        </ul>
      </div>
    </section>
  )
}
