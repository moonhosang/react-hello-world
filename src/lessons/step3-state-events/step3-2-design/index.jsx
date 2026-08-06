// 3-2 · 상태 설계·함정 (여러 상태 vs 객체, 연속 setState)
// 상태를 어떻게 나눌지, 그리고 초보가 자주 빠지는 함정을 본다.

import MultiState from './MultiState.jsx'
import ObjectState from './ObjectState.jsx'
import ArrayMutationDemo from './ArrayMutationDemo.jsx'
import ObjectMutationDemo from './ObjectMutationDemo.jsx'
import TrapCounter, { SetStateStoreViz } from './TrapCounter.jsx'
import QuickQuiz from '../../../components/QuickQuiz.jsx'
import SourceTrace from '../../../components/SourceTrace.jsx'

// 연속 setState 함정 — 값을 넣으면 왜 +3이 아니라 +1인지 한 줄씩 짚는다.
const SNAP_CODE = `// count는 지금 0 (이 렌더의 '스냅샷'으로 고정돼 있다)
function handleClick() {
  setCount(count + 1)   // 0 + 1 → "다음 count를 1로"
  setCount(count + 1)   // 여전히 0 + 1 → "1로"
  setCount(count + 1)   // 여전히 0 + 1 → "1로"
}
// 결과: 1  (+3이 아니다!)`

const SNAP_STEPS = [
  {
    hl: [1, 2],
    tag: '① 전제',
    t: 'count는 이 이벤트 동안 0으로 고정',
    d: (<>한 번의 클릭이 처리되는 동안 <code>count</code>는 <b>이 렌더의 스냅샷</b>이라 <b>0에 고정</b>이다. 이 함수 안에서 <code>count</code>는 무슨 일이 있어도 <b>계속 0</b>이다.</>),
    note: 'count = 0 (고정)',
  },
  {
    hl: [3],
    tag: '② 첫 줄',
    t: 'setCount(0 + 1) → "1로 바꿔줘"',
    d: (<><code>count</code>가 0이니 <code>setCount(count + 1)</code>은 <code>setCount(1)</code>이다. "다음 렌더의 count를 <b>1</b>로" 하라고 큐에 넣는다.</>),
    note: '큐: [1]',
  },
  {
    hl: [4],
    tag: '③ 둘째 줄',
    t: 'count는 아직도 0 → 또 setCount(1)',
    d: (<>여기서도 <code>count</code>는 <b>여전히 0</b>이다(set은 이 함수 안 값을 바꾸지 않는다). 그래서 또 <code>setCount(0 + 1)</code> = <code>setCount(1)</code>. 앞의 1을 <b>덮어쓴다</b>.</>),
    note: '큐: [1, 1]',
  },
  {
    hl: [5],
    tag: '④ 셋째 줄',
    t: '똑같이 setCount(1)',
    d: (<>세 번째도 <code>count</code>는 0이라 <code>setCount(1)</code>. 세 줄이 <b>전부 같은 값 1</b>을 큐에 넣었다.</>),
    note: '큐: [1, 1, 1]',
  },
  {
    hl: [7],
    tag: '⑤ 결과',
    t: '리렌더는 한 번, 마지막 값 1',
    d: (<>이벤트가 끝나면 리액트가 <b>리렌더를 한 번</b> 한다. 큐의 값들이 전부 1이라 <code>count</code>는 <b>1</b>. 세 번 불렀는데 <b>+3이 아니라 +1</b>인 이유가 이것이다.</>),
    note: 'count = 1',
  },
  {
    tag: '⑥ 고치려면',
    t: 'setCount(c => c + 1) — 값 대신 계산 방법',
    d: (<>함수를 넘기면 리액트가 <b>직전 결과</b>를 <code>c</code>로 넘겨 차례로 계산한다: <b>0 → 1 → 2 → 3</b>. "고정된 값"이 아니라 "직전 값에 +1"이라 <b>+3</b>이 된다. 아래 데모·표에서 두 방식을 나란히 확인하라.</>),
  },
]

export default function Step3_2() {
  return (
    <section>
      <header className="lesson-header">
        <span className="badge context-badge">3-2</span>
        <h2>상태 설계 · 함정</h2>
        <p>상태를 여러 개로 둘지 객체로 묶을지, 그리고 연속 setState 함정을 익힌다.</p>
      </header>

      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 학습 포인트</span>
        <p>
          상태는 어떻게 나누느냐가 설계의 핵심이고, set에 값을 넣느냐 함수를 넣느냐에 따라 결과가 달라진다.
        </p>
      </div>

      <h3 className="section-title">여러 개의 상태 vs 객체 하나</h3>
      <span className="learn-tag">📎 학습 포인트 · 독립적인 값은 각각 useState, 함께 움직이는 값은 객체 하나로 묶는다</span>
      <p className="section-desc">
        한 컴포넌트는 상태를 <b>여러 개</b> 가질 수 있다. 서로 관련 있는 값이면 <b>객체 하나</b>로 묶어도 된다.
      </p>
      <div className="two-col">
        <div className="card">
          <div className="file-label">📄 MultiState.jsx · 여러 상태 (독립적인 값)</div>
          <MultiState />
        </div>
        <div className="card">
          <div className="file-label">📄 ObjectState.jsx · 객체 하나 (관련 있는 값)</div>
          <ObjectState />
        </div>
      </div>
      <p className="section-desc">
        <b>독립적인 값</b>이면 각각 <code>useState</code>가 간단하고, <b>함께 움직이는 관련 값</b>이면 객체 하나로 묶는다.
      </p>

      <h3 className="section-title">⚠️ 상태의 규칙 — 불변성 (immutability)</h3>
      <span className="learn-tag">📎 학습 포인트 · 상태는 읽기 전용 · set으로만 바꾼다 · 배열·객체는 복사본으로 바꾼다</span>
      <p className="section-desc">📏 상태를 다루는 규칙은 셋뿐이다:</p>
      <ul className="section-list">
        <li><b>① 읽기 전용이다</b> — 상태 값을 <b>직접 바꾸지 않는다</b>. (<code>player.exp = 10</code> ❌, <code>todos.push(...)</code> ❌)</li>
        <li><b>② set 함수로만 바꾼다</b> — 반드시 <code>setPlayer(...)</code>처럼 set에 <b>새 값</b>을 넣어야 화면이 다시 그려진다.</li>
        <li><b>③ 배열·객체는 복사본으로</b> — 원본을 고치지 말고 <code>{'{ ...obj }'}</code>·<code>[...arr]</code>로 <b>새 것</b>을 만들어 넣는다. 안 그러면 <b>참조가 같아</b> 리액트가 못 알아챈다.</li>
      </ul>
      <div className="card">
        <div className="file-label">📄 새 값으로 바꾸는 법</div>
        <pre className="concept-flow">{`// 객체 — 바뀐 필드만 덮어쓴 '새 객체'
setPlayer({ ...player, exp: 10 })   // ✅   player.exp = 10; setPlayer(player) ❌

// 배열 — 원본은 그대로 두고 '새 배열'
setTodos([...todos, 새항목])         // ✅   todos.push(새항목); setTodos(todos) ❌`}</pre>
      </div>

      <p className="section-desc">
        규칙 ③을 어기면 어떻게 되나? 아래 두 데모에서 <b>❌ 버튼</b>은 값이 실제로 바뀌는데도 <b>화면이 안 바뀐다</b> —
        리액트는 <b>'새 참조(새 배열·새 객체)'</b>일 때만 바뀜을 알아채기 때문이다. 배열·객체 똑같다.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <ArrayMutationDemo />
        <ObjectMutationDemo />
      </div>
      <p className="section-desc">
        "왜 새 값이어야 하나"의 뿌리(<b>참조 vs 값</b>)는 <b>6단계 리스트</b>에서 배열로 더 깊게, 폼 입력은 <b>7단계</b>에서 이어진다.
      </p>

      <div className="concept">
        <p className="concept-lead">📚 참고 — '불변성'은 리액트 규칙이 아니라 CS의 일반 개념이다</p>
        <p className="section-desc" style={{ marginTop: 0 }}>
          "값을 고치지 말고 새로 만든다"는 <b>불변 객체(immutable object)</b>라는 오래된 설계 개념이다 —
          바뀌지 않는 값은 <b>공유해도 안전</b>하고, <b>비교가 쉽다</b>(참조만 보면 됨). 리액트는 이 성질을
          "참조가 다르면 바뀐 것"이라는 <b>빠른 변경 감지</b>에 쓰는 것뿐이다. 궁금하면 읽어 보라(건너뛰어도 된다).
        </p>
        <p className="section-desc" style={{ margin: '6px 0 0' }}>
          <a className="doc-link" href="https://ko.wikipedia.org/wiki/불변객체" target="_blank" rel="noopener noreferrer">
            위키백과 · 불변객체 (Immutable object) ↗
          </a>
        </p>
      </div>

      <h3 className="section-title">⚠️ 흔한 함정 — 연속 setState (값 vs 함수)</h3>
      <span className="learn-tag">📎 학습 포인트 · set에 값을 넣으면 스냅샷 고정이라 +1, 함수(c =&gt; c + 1)를 넣으면 직전 값 기준이라 +3</span>
      <p className="section-desc">
        <code>setCount(...)</code>의 괄호 안에 <b>값</b>을 넣느냐 <b>함수</b>를 넣느냐가 완전히 다르다.
        초보가 가장 헷갈리는 지점이다.
      </p>
      <div className="table-wrap">
        <table className="pvs-table">
          <thead>
            <tr>
              <th></th>
              <th>setCount(count + 1)</th>
              <th>setCount(c =&gt; c + 1)</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>괄호 안</td><td><b>값</b> (숫자)</td><td><b>함수</b> (updater)</td></tr>
            <tr><td>뜻</td><td>"이 값으로 바꿔줘" (고정된 숫자)</td><td>"직전 값에 +1 해줘" (계산 방법)</td></tr>
            <tr><td>연속 3번</td><td>전부 같은 <code>count</code>를 봄 → <b>+1</b></td><td>각자 <b>직전 값</b>을 받음 → <b>+3</b></td></tr>
            <tr><td>언제 쓰나</td><td>대부분 (한 번만 바꿀 때)</td><td>이전 값 기준으로 여러 번 갱신할 때</td></tr>
          </tbody>
        </table>
      </div>
      <p className="section-desc">
        <b>왜?</b> 한 번의 이벤트가 처리되는 동안 <code>count</code>는 그 렌더의 <b>스냅샷</b>으로 <b>고정</b>돼 있다.
        그래서 <code>count + 1</code>은 매번 "고정된 그 값 + 1" = 같은 결과. 반대로 <code>c =&gt; c + 1</code>은
        리액트가 큐에 쌓아 <b>직전 결과를 <code>c</code>로 넘겨</b> 차례로 계산한다.
      </p>

      {/* 🔬 소스 + 동작 과정 — 왜 +3이 아니라 +1인지 */}
      <span className="learn-tag">📎 학습 포인트 · 한 줄씩 보면 세 번 다 setCount(1) — count가 스냅샷으로 0에 고정됐기 때문</span>
      <SourceTrace file="TrapCounter.jsx · 값 버전 (왜 +1?)" code={SNAP_CODE} steps={SNAP_STEPS} />

      <TrapCounter />
      <SetStateStoreViz />
      <p className="section-desc">
        📚 더 읽기 ·{' '}
        <a className="doc-link" href="https://ko.react.dev/learn/state-as-a-snapshot" target="_blank" rel="noopener noreferrer">
          스냅샷으로서의 State ↗
        </a>{' '}
        ·{' '}
        <a className="doc-link" href="https://ko.react.dev/learn/queueing-a-series-of-state-updates" target="_blank" rel="noopener noreferrer">
          state 업데이트 큐 ↗
        </a>
      </p>

      <h3 className="section-title">🧩 확인 드릴 — 상태 규칙 손에 익히기</h3>
      <span className="learn-tag">📎 학습 포인트 · 직접 바꾸지 말고 set으로 · 배열·객체는 복사본으로 · 연속 set은 값 vs 함수 — 일곱 번 확인한다</span>
      <QuickQuiz
        intro="같은 규칙(상태는 읽기 전용 · 새 값으로만 · 스냅샷)을 상황만 바꿔 확인한다. 하나 골라 보라."
        questions={[
          {
            q: 'player 상태를 바꿔 화면에 반영하려 한다. 옳은 것은?',
            code: `const [player, setPlayer] = useState({ exp: 0 });`,
            options: ['player.exp = 10', 'setPlayer({ ...player, exp: 10 })', 'player = { exp: 10 }'],
            codeOptions: true,
            answer: 1,
            explain: '상태는 직접 못 바꾼다(읽기 전용). set에 새 객체를 넣어야 리액트가 알아채고 다시 그린다. player.exp = 10 은 값은 바뀌어도 화면이 안 바뀐다.',
          },
          {
            q: 'todos 배열에 새 항목을 더해 화면에 반영하려면?',
            code: `const [todos, setTodos] = useState([]);`,
            options: ['todos.push(newTodo)', 'setTodos([...todos, newTodo])', 'todos = [...todos, newTodo]'],
            codeOptions: true,
            answer: 1,
            explain: '원본을 고치지 말고 새 배열을 set에 넣는다. todos.push(...)는 원본을 직접 바꿔 참조가 같아 리액트가 못 알아챈다.',
          },
          {
            q: 'count가 0일 때 버튼에서 아래를 실행하면 count는 얼마가 되나?',
            code: `setCount(count + 1);
setCount(count + 1);
setCount(count + 1);`,
            options: ['3', '1', '0'],
            answer: 1,
            explain: "이 이벤트 동안 count는 스냅샷으로 0에 고정된다. 셋 다 '0 + 1'이라 결과는 1이다. 3이 되게 하려면 setCount(c => c + 1)로 직전 값 기준 계산을 넣어야 한다.",
          },
          {
            q: 'count가 0일 때 아래를 실행하면 count는 얼마가 되나?',
            code: `setCount(c => c + 1);
setCount(c => c + 1);
setCount(c => c + 1);`,
            options: ['3', '1', '0'],
            answer: 0,
            explain: '함수(updater)를 넣으면 리액트가 직전 결과를 c로 넘겨 차례로 계산한다: 0→1→2→3. 값(count + 1)을 넣었다면 스냅샷 고정이라 1에 그친다.',
          },
          {
            q: '다음 중 상태 규칙을 어긴 것은? (player는 객체 상태)',
            options: ['setPlayer({ ...player, hp: 5 })', 'setPlayer(p => ({ ...p, hp: 5 }))', 'player.hp = 5; setPlayer(player)'],
            codeOptions: true,
            answer: 2,
            explain: 'player.hp = 5 는 원본을 직접 고쳐 참조가 그대로다 → 리액트가 못 알아채 화면이 안 바뀐다. 나머지 둘은 새 객체를 만들어 넣어 안전하다.',
          },
          {
            q: 'todos.push(x) 후 setTodos(todos)를 했는데 화면이 안 바뀐다. 왜일까?',
            options: ['todos가 같은 참조라 리액트가 바뀐 걸 못 알아채서', '배열이 비어 있어서', 'push가 원래 안 되는 함수라서'],
            answer: 0,
            explain: 'push는 원본 배열을 그대로 두고 내용만 바꾼다 → 참조(주소)가 같아 리액트는 "안 바뀌었다"고 본다. [...todos, x]로 새 배열을 만들어야 한다.',
          },
          {
            q: '서로 관련 없는 값(이름, 나이)을 상태로 둘 때 보통 어떻게 하나?',
            options: ['각각 useState로 따로 둔다', '항상 객체 하나로 묶는다', '상태로 두면 안 된다'],
            answer: 0,
            explain: '독립적인 값은 각각 useState가 간단하다. 함께 움직이는 관련 값일 때 객체 하나로 묶는 게 좋다.',
          },
        ]}
      />
    </section>
  )
}
