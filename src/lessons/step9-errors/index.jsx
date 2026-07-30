// ============================================================
// 10단계 · 에러 읽는 법 (고장난 코드 고치기)
// ============================================================
// 빨간 에러 화면은 무섭지만, 초보가 만나는 에러는 대부분 몇 가지 패턴이다.
// 각 에러를 "실제 메시지 + ❌원인 + ✅고치기"로 대조해 읽는 법을 익힌다.
// (크래시/무한루프는 앱을 깨뜨리므로, 여기서는 실행하지 않고 코드로 보여준다.)

// 에러 한 건을 보여주는 카드
function ErrorCard({ num, title, msg, tone = 'error', bad, good, children }) {
  return (
    <div className="err-card">
      <h3>
        <span className="err-num">{num}</span> {title}
      </h3>
      <div className={'err-msg' + (tone === 'silent' ? ' silent' : '')}>{msg}</div>
      <div className="err-cols">
        <div className="err-col">
          <div className="err-label bad">❌ 원인</div>
          <pre className="err-code">{bad}</pre>
        </div>
        <div className="err-col">
          <div className="err-label good">✅ 고치기</div>
          <pre className="err-code">{good}</pre>
        </div>
      </div>
      <p className="err-why">{children}</p>
    </div>
  )
}

export default function Stage9() {
  return (
    <section>
      <header className="lesson-header">
        <span className="badge">10단계</span>
        <h2>에러 읽는 법 — 고장난 코드 고치기</h2>
        <p>빨간 에러 화면 앞에서 당황하지 않는 법. 자주 만나는 에러 5가지를 읽고 고쳐 본다.</p>
      </header>

      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 학습 포인트</span>
        <p>에러 메시지의 첫 줄과 파일·줄 번호부터 읽고, 익숙한 5가지 패턴에 대조해 고친다.</p>
      </div>

      <div className="concept">
        <p className="concept-lead">에러를 만나면 <b>순서대로</b> 읽는다.</p>
        <ul className="concept-terms">
          <li>① 에러 메시지 <b>첫 줄</b>을 읽는다 (무엇이 문제인가)</li>
          <li>② <b>어느 파일 · 몇 번째 줄</b>인지 본다 (어디서 났나)</li>
          <li>③ 아래 <b>패턴</b>과 대조해 고친다</li>
        </ul>
      </div>

      <ErrorCard
        num="①"
        title="key 경고"
        msg={'⚠️ Warning: Each child in a list should have a unique "key" prop.'}
        bad={'items.map((it) => (\n  <li>{it.name}</li>\n))'}
        good={'items.map((it) => (\n  <li key={it.id}>{it.name}</li>\n))'}
      >
        리스트(<code>map</code>)로 만든 각 요소엔 <b>고유한 <code>key</code></b>를 준다. 보통 데이터의 id를 쓴다. (6단계 리스트 참고)
      </ErrorCard>

      <ErrorCard
        num="②"
        title="undefined.map — 데이터가 아직 없음"
        msg={"❌ Uncaught TypeError: Cannot read properties of undefined (reading 'map')"}
        bad={'const [users, setUsers] = useState() // 초기값 없음\n// ...\n{users.map((u) => u.name)}    // 💥 users가 undefined'}
        good={'const [users, setUsers] = useState([]) // 빈 배열로 시작\n// 또는 방어:\n{users?.map((u) => u.name)}'}
      >
        로딩 전이라 데이터가 <b>undefined</b>면 <code>.map</code>이 터진다. 초기값을 <b>빈 배열</b>로 두거나 <code>?.</code>로 방어한다. (9단계 참고)
      </ErrorCard>

      <ErrorCard
        num="③"
        title="화면이 안 바뀐다 — state 직접 수정 (조용한 버그)"
        tone="silent"
        msg={'🤫 에러도 경고도 없이, 그냥 화면이 안 바뀐다'}
        bad={'todos.push(newTodo) // 원본을 직접 수정 (참조 그대로)\nsetTodos(todos)      // 같은 참조 → 리렌더 안 함'}
        good={'setTodos([...todos, newTodo]) // 새 배열 → 리렌더'}
      >
        리액트는 <b>'새 배열/객체'</b>일 때만 다시 그린다. 원본을 바꾸지 말고 새로 만들어 set 한다. (6단계 불변성 참고)
      </ErrorCard>

      <ErrorCard
        num="④"
        title="무한 루프 — useEffect 의존성 배열"
        msg={'⚠️ Warning: Maximum update depth exceeded.'}
        bad={'useEffect(() => {\n  setCount(count + 1) // 매 렌더마다 실행 → setState → 또 렌더...\n})                   // ← 의존성 배열이 없다!'}
        good={'useEffect(() => {\n  setCount(count + 1)\n}, [])               // 처음 한 번만'}
      >
        의존성 배열이 없으면 effect가 <b>매 렌더마다</b> 돌고, 그 안에서 state를 바꾸면 <b>무한 반복</b>된다. 의존성 배열을 정확히 준다. (9단계 참고)
      </ErrorCard>

      <ErrorCard
        num="⑤"
        title="훅 규칙 위반 — 조건문 안에서 훅 호출"
        msg={'⚠️ React has detected a change in the order of Hooks (Rules of Hooks)'}
        bad={'if (loggedIn) {\n  const [name, setName] = useState("") // 💥 조건문 안\n}'}
        good={'const [name, setName] = useState("") // 항상 최상단에서\nif (loggedIn) { /* ... */ }'}
      >
        훅(<code>useState</code>·<code>useEffect</code> …)은 컴포넌트 <b>최상단</b>에서 <b>항상 같은 순서</b>로 부른다. <code>if</code>·<code>for</code>·함수 안에서 부르면 안 된다.
      </ErrorCard>

      <div className="try-it">
        <h4>💡 핵심</h4>
        <ul>
          <li>에러 메시지는 <b>적</b>이 아니라 <b>힌트</b>다. 첫 줄과 파일·줄 번호만 봐도 절반은 해결된다.</li>
          <li>대부분의 초보 에러는 위 5가지 패턴 안에 있다. 막히면 여기로 돌아와 대조해 보자.</li>
        </ul>
      </div>
    </section>
  )
}
