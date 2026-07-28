// 8-5 · 브라우저에 저장하기 (localStorage)
// state는 새로고침하면 사라진다. 남기고 싶으면 state가 바뀔 때마다 localStorage에 저장하고,
// 처음 렌더에서 그 값을 읽어와 초기값으로 쓴다. useEffect 챕터의 마지막 응용이다.

import { useState, useEffect } from 'react'
import Practice from '../../../components/Practice.jsx'
import PracticeStore from './practice.jsx'
import SolutionStore from './solution.jsx'

// 이 데모 전용 저장 키. 다른 데모/실습과 겹치지 않게 고유하게 둔다.
const DEMO_KEY = 'lesson8-5:demo-note'

export default function Step8_5() {
  return (
    <section>
      <header className="lesson-header">
        <span className="badge effect-badge">8-5</span>
        <h2>브라우저에 저장하기 (localStorage)</h2>
        <p>state가 바뀔 때마다 localStorage에 저장하고, 처음 렌더에서 그 값을 읽어와 초기값으로 쓴다.</p>
      </header>

      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 학습 포인트</span>
        <p>
          새로고침해도 값을 남기려면, state를 localStorage에 <b>저장</b>하고
          처음에 그걸 <b>읽어와 초기값</b>으로 쓴다. (읽기 = lazy init, 저장 = useEffect)
        </p>
      </div>

      <div className="concept">
        <p className="concept-lead">
          state는 컴포넌트가 화면에 있는 동안만 기억한다. 새로고침하면 처음부터 다시 시작해 <b>사라진다.</b>
          <code> localStorage</code>는 브라우저에 <b>문자열</b>을 계속 남겨 두는 저장소라, 여기에 적어 두면 새로고침을 넘어 살아남는다.
        </p>
        <ul className="concept-terms">
          <li><code>localStorage.setItem(키, 문자열)</code> — 저장</li>
          <li><code>localStorage.getItem(키)</code> — 읽기 (없으면 <code>null</code>)</li>
          <li><code>localStorage.removeItem(키)</code> — 지우기</li>
        </ul>
      </div>

      {/* ── ① lazy initializer ── */}
      <h3 className="section-title">① 읽기 — lazy initializer</h3>
      <span className="learn-tag">📎 학습 포인트 · <code>useState(() =&gt; 초기값)</code>은 첫 렌더에 딱 한 번만 실행된다</span>
      <p className="section-desc">
        <code>useState</code>에 <b>값</b>이 아니라 <b>함수</b>를 넘기면, 그 함수는 <b>처음 렌더 때 한 번만</b> 실행돼 초기값을 만든다.
        localStorage 읽기처럼 '무겁거나 한 번뿐인' 초기화에 쓴다. 매 렌더마다 다시 읽지 않게 하는 게 핵심이다.
      </p>
      <div className="concept">
        <p className="concept-lead">
          <code>useState(비싼계산())</code> ❌ — <b>매 렌더마다</b> <code>비싼계산()</code>이 먼저 실행되고 결과는 첫 렌더에만 쓰인다(낭비).<br />
          <code>useState(() =&gt; 비싼계산())</code> ✅ — 함수를 넘겨 <b>첫 렌더에 한 번만</b> 실행한다.
        </p>
      </div>

      {/* ── ② 저장 — useEffect ── */}
      <h3 className="section-title">② 저장 — useEffect</h3>
      <span className="learn-tag">📎 학습 포인트 · 의존성에 state를 넣어, 값이 바뀔 때마다 다시 저장한다</span>
      <p className="section-desc">
        저장은 화면 그리기 <b>외의</b> 일이니 <code>useEffect</code>에 적는다.
        <code> useEffect(() =&gt; {'{ localStorage.setItem(KEY, JSON.stringify(state)) }'}, [state])</code> —
        의존성 배열에 <code>state</code>를 넣었으니 <b>state가 바뀔 때마다</b> 새 값으로 다시 저장한다.
      </p>

      {/* ── ③ 방어 — JSON + try/catch ── */}
      <h3 className="section-title">③ 방어 — JSON + try/catch</h3>
      <span className="learn-tag">📎 학습 포인트 · localStorage는 문자열만 담는다 → JSON으로 바꾸고, 실패에 대비한다</span>
      <p className="section-desc">
        localStorage는 <b>문자열만</b> 담는다. 그래서 객체·배열은 <code>JSON.stringify</code>로 문자열로 바꿔 저장하고,
        읽을 땐 <code>JSON.parse</code>로 되돌린다. 저장된 값이 깨져 있으면 <code>JSON.parse</code>가 에러를 던지니
        <code> try/catch</code>로 감싸 실패하면 조용히 기본값으로 시작한다.
      </p>
      <div className="concept">
        <p className="concept-lead">
          문자열이 아닌 값을 그냥 넣으면 <code>"[object Object]"</code>처럼 엉뚱하게 저장된다.
          객체·배열은 <b>반드시</b> <code>JSON.stringify</code> / <code>JSON.parse</code>를 거친다.
        </p>
      </div>

      {/* ── 라이브 데모 ── */}
      <span className="learn-tag">📎 학습 포인트 · lazy init(읽기) + useEffect(저장)을 합치면 "새로고침해도 남는" 값이 된다</span>
      <div className="card">
        <div className="file-label">📄 step8-5-localstorage/index.jsx</div>
        <PersistedNote />
        <p className="demo-desc">
          👉 메모를 적고 <b>이 페이지를 새로고침</b>해 보자. 방금 적은 글자가 그대로 남아 있다.
          (같은 브라우저의 localStorage에 저장돼 있기 때문이다.)
        </p>
      </div>

      {/* ── 실습 ── */}
      <Practice
        task="저장 useEffect와 lazy init을 완성해, 새로고침해도 남는 카운터를 만들자."
        hints={[
          '무엇·왜: 새로고침해도 카운트가 남게 한다. state는 새로고침하면 사라지기 때문이다.',
          '어디: TODO 1은 useState의 초기값, TODO 2는 저장용 useEffect 안이다.',
          '어떻게(읽기): useState(() => { const saved = localStorage.getItem(KEY); return saved == null ? 0 : JSON.parse(saved) }) 처럼 함수로 넘겨 처음에 한 번만 읽는다.',
          '어떻게(저장): useEffect(() => { localStorage.setItem(KEY, JSON.stringify(count)) }, [count]) 로 count가 바뀔 때마다 저장한다.',
          '확인: 숫자를 올린 뒤 페이지를 새로고침해 그 값이 그대로 남아 있으면 성공이다.',
        ]}
        practiceFile="step8-5-localstorage/practice.jsx"
        solutionFile="step8-5-localstorage/solution.jsx"
        solution={<SolutionStore />}
      >
        <PracticeStore />
      </Practice>

      <div className="try-it">
        <h4>💡 알아두기</h4>
        <ul>
          <li>이 "읽기(lazy init) + 저장(useEffect) + JSON/try-catch" 패턴은 늘 똑같다. 그래서 <code>usePersistedReducer</code> 같은 <b>커스텀 훅</b>으로 묶어 두면 어디서든 재사용할 수 있다.</li>
          <li>실전에서 Lv7 <b>가계부</b>가 바로 그 예다. 첫 화면부터 localStorage에서 데이터를 읽어와 새로고침해도 내역이 남는다.</li>
          <li>저장 키(KEY)는 데모마다 <b>고유</b>하게 둔다. 같은 키를 쓰면 서로 값을 덮어써 섞인다.</li>
        </ul>
      </div>
    </section>
  )
}

// ── 라이브 데모 컴포넌트 ──
// 메모 한 줄을 localStorage에 저장하고, 처음 렌더에서 읽어와 초기값으로 쓴다.
function PersistedNote() {
  // ① 읽기(lazy init): 함수를 넘겨 첫 렌더에 딱 한 번만 localStorage를 읽는다.
  const [note, setNote] = useState(() => {
    try {
      const saved = localStorage.getItem(DEMO_KEY)
      // 저장된 게 없으면(첫 방문) 빈 문자열로 시작한다.
      return saved == null ? '' : JSON.parse(saved)
    } catch {
      // 저장값이 깨졌으면 조용히 기본값으로 시작한다.
      return ''
    }
  })

  // ② 저장(useEffect): note가 바뀔 때마다 localStorage에 다시 써 둔다.
  useEffect(() => {
    try {
      localStorage.setItem(DEMO_KEY, JSON.stringify(note))
    } catch {
      // 저장 실패(용량 초과 등)는 무시해 앱 동작을 막지 않는다.
    }
  }, [note])

  return (
    <div className="demo-card">
      <input
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="여기에 메모를 적어 보자"
      />
      <p className="demo-desc">저장된 메모: <b>{note === '' ? '(비어 있음)' : note}</b></p>
      <div className="button-row">
        <button
          onClick={() => {
            // 지우기: 저장소에서 삭제하고 state도 비운다.
            localStorage.removeItem(DEMO_KEY)
            setNote('')
          }}
        >
          🗑️ 지우기
        </button>
      </div>
    </div>
  )
}
