// ============================================================
// 12단계 · 불필요한 작업 줄이기 — 최적화 (React.memo / useMemo / useCallback)
// ============================================================
// 리액트는 상태가 바뀌면 그 컴포넌트와 자식들을 다시 그린다(리렌더).
// 대부분은 이 리렌더가 싸서 신경 쓸 필요가 없지만, 가끔 비싼 경우가 있다.
// 그럴 때 "필요 없는 작업을 건너뛰게" 해주는 세 도구가 있다:
//   ① React.memo   — props가 같으면 자식 컴포넌트의 렌더를 건너뛴다
//   ② useMemo      — 입력이 같으면 무거운 '계산 결과'를 재사용한다
//   ③ useCallback  — 함수의 '정체성(참조)'을 고정한다 (memo 자식과 짝)
// 세 데모 모두 렌더 지문(Math.random)으로 "다시 그려졌는지"를 눈으로 확인한다.

import { MemoDemo } from './MemoDemo.jsx'
import { UseMemoDemo } from './UseMemoDemo.jsx'
import { UseCallbackDemo } from './UseCallbackDemo.jsx'
import SourceTrace from '../../components/SourceTrace.jsx'

// React.memo — 부모가 리렌더돼도 props가 같으면 자식 렌더를 건너뛴다.
const MEMO_CODE = `const Child = memo(function Child({ label }) {
  return <div>{label} · {Math.random()}</div>   // 렌더 지문
})

function Parent() {
  const [count, setCount] = useState(0)
  return (
    <>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <Child label="고정" />        // props가 안 바뀐다
    </>
  )
}`

const MEMO_STEPS = [
  {
    hl: [9],
    tag: '① +1 클릭',
    t: 'Parent가 리렌더된다',
    d: (<><code>setCount</code>로 <code>count</code>가 바뀌어 <code>Parent</code>가 다시 렌더된다. <b>기본이라면</b> 자식 <code>Child</code>도 따라 리렌더된다.</>),
  },
  {
    hl: [1, 10],
    tag: '② props 비교',
    t: 'memo가 이전 props와 비교한다',
    d: (<><code>Child</code>는 <code>memo</code>로 감쌌다. 리액트가 이전 props와 이번 props를 비교한다 — <code>label</code>은 <b>'고정' → '고정'</b>, 같다.</>),
  },
  {
    hl: [2],
    tag: '③ 건너뛴다',
    t: 'props가 같으니 렌더를 생략',
    d: (<>props가 같으니 <code>Child</code> 함수를 <b>다시 실행하지 않고</b> 이전 결과를 재사용한다 → 렌더 지문(<code>Math.random</code>)이 <b>안 바뀐다</b>.</>),
    note: 'Child 지문 유지 = 리렌더 안 함',
  },
  {
    hl: [10],
    tag: '④ 무력화 주의',
    t: '매 렌더 새 참조를 넘기면 memo가 깨진다',
    d: (<>만약 <code>&lt;Child onClick={'{() => {}}'} /&gt;</code>처럼 <b>매 렌더 새 함수/새 객체</b>를 넘기면 참조가 달라 "props 바뀜"으로 오해 → memo 무력화. <code>useCallback</code>/<code>useMemo</code>로 참조를 <b>고정</b>해야 짝이 맞는다.</>),
  },
  {
    tag: '⑤ 기본은 안 씀',
    t: '측정으로 특정했을 때만',
    d: (<>리렌더는 대개 <b>싸다</b>. memo·useMemo·useCallback도 비교/기억 비용이 있어, 가벼운 곳에 바르면 오히려 손해다. <b>측정으로 진짜 비싼 곳</b>을 특정했을 때만 쓴다.</>),
  },
]

export default function Step11Optimize() {
  return (
    <section>
      <header className="lesson-header">
        <span className="badge">12단계</span>
        <h2>불필요한 작업 줄이기 — 최적화</h2>
        <p>리렌더와 무거운 계산을 건너뛰는 세 도구: React.memo · useMemo · useCallback.</p>
      </header>

      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 학습 포인트</span>
        <p>
          최적화 3종은 모두 <b>“입력이 그대로면 이전 결과를 재사용해 작업을 건너뛴다”</b>는 한 가지 아이디어다 —
          <b> memo</b>는 컴포넌트 렌더를, <b>useMemo</b>는 계산 결과를, <b>useCallback</b>은 함수 참조를 재사용한다.
        </p>
      </div>

      <div className="concept">
        <p className="concept-lead">
          기본값은 <b>“그냥 다시 그린다”</b>이다. 리액트의 리렌더는 대개 싸기 때문이다.
          아래 세 도구는 <b>그 리렌더/계산이 실제로 비쌀 때만</b> 골라 쓰는 장치다.
          렌더 지문(<code>렌더 0.xxx</code>) 숫자가 바뀌면 = 다시 그려진 것이다.
        </p>
      </div>

      <h3 className="section-title">① React.memo — props가 같으면 자식은 다시 안 그린다</h3>
      <span className="learn-tag">📎 학습 포인트 · memo로 감싼 자식은 부모가 리렌더돼도 props가 그대로면 렌더를 건너뛴다</span>
      <p className="section-desc">
        부모가 리렌더되면 자식도 따라 리렌더되는 게 기본이다. <code>memo</code>로 감싸면
        <b> props가 이전과 같을 때</b> 그 자식의 렌더를 건너뛴다. 아래 두 자식은 받는 props가 똑같은데,
        memo 없는 쪽만 지문이 계속 바뀐다.
      </p>
      <div className="card">
        <div className="file-label">📄 MemoDemo.jsx · memo 없는 자식 vs memo 자식</div>
        <MemoDemo />
      </div>
      <span className="learn-tag">📎 학습 포인트 · 부모 리렌더 → memo가 props 비교 → 같으면 자식 렌더를 건너뛴다</span>
      <SourceTrace file="React.memo — 렌더 건너뛰기" code={MEMO_CODE} steps={MEMO_STEPS} />

      <h3 className="section-title">② useMemo — 입력이 같으면 무거운 계산을 건너뛴다</h3>
      <span className="learn-tag">📎 학습 포인트 · useMemo는 의존성이 안 바뀌면 이전 계산 결과를 그대로 재사용한다</span>
      <p className="section-desc">
        컴포넌트는 상태가 바뀔 때마다 함수 본문을 처음부터 다시 실행한다 — 무거운 계산이 있으면
        <b> 관련 없는 상태가 바뀔 때도 매번 다시 계산</b>한다. <code>useMemo(() =&gt; 계산, [입력])</code>은
        <b> [입력]이 바뀔 때만</b> 계산하고, 아니면 이전 결과를 재사용한다.
      </p>
      <div className="card">
        <div className="file-label">📄 UseMemoDemo.jsx · 계산 실행 횟수 대조</div>
        <UseMemoDemo />
      </div>

      <h3 className="section-title">③ useCallback — 함수의 정체성을 고정한다</h3>
      <span className="learn-tag">📎 학습 포인트 · memo 자식에 매 렌더 새 함수를 넘기면 memo가 무력화 → useCallback으로 참조를 고정한다</span>
      <p className="section-desc">
        함수도 렌더마다 <b>새로 만들어진다</b>. memo 자식에게 <code>onClick={'{() => {}}'}</code>처럼 인라인 함수를 주면,
        값은 같아도 <b>참조가 매번 달라</b> memo가 “props가 바뀌었다”고 오해해 자식을 다시 그린다.
        <code> useCallback</code>은 그 함수를 <b>같은 참조로 유지</b>해 이 문제를 없앤다.
      </p>
      <div className="card">
        <div className="file-label">📄 UseCallbackDemo.jsx · 새 함수 vs useCallback 고정 함수</div>
        <UseCallbackDemo />
      </div>

      <div className="try-it">
        <h4>⚠️ 언제 쓰지 말아야 하나</h4>
        <ul>
          <li>
            <b>대부분은 필요 없다.</b> 리액트의 리렌더는 원래 싸다. memo/useMemo/useCallback도
            <b> 비교·기억에 드는 비용</b>이 있어, 가벼운 곳에 쓰면 오히려 <b>더 느리고 코드만 복잡</b>해진다.
          </li>
          <li>
            <b>측정이 먼저다.</b> “느낄 만큼 느리다”를 React DevTools Profiler 등으로 확인한 <b>다음에</b> 적용한다.
            추측으로 미리 바르지 않는다.
          </li>
          <li>
            <b>새 객체·배열·함수 참조를 조심하라.</b> memo 자식에 <code>style={'{{...}}'}</code>나
            <code> arr.map(...)</code> 결과, 인라인 함수를 넘기면 매 렌더 <b>새 참조</b>라서 memo가 무력화된다 —
            그럴 땐 <code>useMemo</code>/<code>useCallback</code>과 <b>짝으로</b> 써야 효과가 난다.
          </li>
          <li>
            <b>useCallback/useMemo는 memo(또는 의존성 배열)와 짝일 때만 의미가 있다.</b> 받는 쪽이 memo도 아니고
            effect 의존성도 아니면, 참조를 고정해도 <b>얻는 게 없다.</b>
          </li>
          <li>
            결론: <b>기본은 아무것도 안 쓰는 것</b>이다. 정말 비싼 렌더/계산을 <b>측정으로 특정</b>했을 때만 골라 쓴다.
          </li>
        </ul>
      </div>
    </section>
  )
}
