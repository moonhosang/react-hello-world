// 3-3 · 상태 · 상수 · 파생 — 무엇을 useState에 둘까
// 입문자가 헷갈리는 지점: "변하는 값이면 다 useState?" → 아니다.
// 판별 질문 하나("다른 값으로 계산해 낼 수 있나?")로 상태/상수/파생을 가른다.
// 챕터 3 시점엔 배열·map을 아직 모른다 → 예시는 count(숫자) 하나로만 만든다.

import { useState } from 'react'
import QuickQuiz from '../../../components/QuickQuiz.jsx'
import TechTags from '../../../components/TechTags.jsx'

// 🔬 라이브 — 파생을 '저장'하면 원본과 어긋난다(동기화 버그).
// count는 원본 상태. 2배 값을 (A) 저장해 두는 방식과 (B) 매번 계산하는 방식을 나란히 둔다.
function DerivedBugDemo() {
  const [count, setCount] = useState(0)
  const [savedDouble, setSavedDouble] = useState(0) // ❌ 파생(2배)을 '상태로 저장'

  const computedDouble = count * 2 // ✅ 파생(2배)을 '매번 계산'

  const drift = savedDouble !== computedDouble

  return (
    <div>
      <p style={{ margin: '0 0 8px' }}>
        원본 상태 <code>count</code> = <b style={{ fontSize: 20 }}>{count}</b>
      </p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
        <button
          className="btn"
          onClick={() => {
            setCount(count + 1)
            setSavedDouble((count + 1) * 2) // 저장값도 '같이' 갱신해야 함
          }}
        >
          +1 (저장값도 같이 갱신)
        </button>
        <button
          className="btn"
          onClick={() => setCount(count + 1)} // 저장값 갱신을 '깜빡'
        >
          +1 (저장값 갱신 깜빡!)
        </button>
        <button
          className="btn ghost"
          onClick={() => {
            setCount(0)
            setSavedDouble(0)
          }}
        >
          리셋
        </button>
      </div>
      <div className="two-col">
        <div className="card" style={{ borderColor: drift ? '#e5534b' : undefined }}>
          <div className="file-label">❌ 저장한 2배 (savedDouble)</div>
          <p style={{ fontSize: 22, margin: 0 }}>{savedDouble}</p>
        </div>
        <div className="card">
          <div className="file-label">✅ 계산한 2배 (count * 2)</div>
          <p style={{ fontSize: 22, margin: 0 }}>{computedDouble}</p>
        </div>
      </div>
      {drift ? (
        <p className="compare-hint" style={{ color: '#e5534b', fontWeight: 700 }}>
          ⚠️ 어긋났다! 저장값 {savedDouble} ≠ 실제 {computedDouble} — "깜빡" 버튼이 저장값 갱신을 빼먹어서다.
          '계산한 2배'는 <b>언제나 맞다</b>.
        </p>
      ) : (
        <p className="compare-hint">
          '깜빡' 버튼을 눌러 보라. 저장값은 <b>따로 갱신하지 않으면 틀어진다</b>. 계산값은 원본에서 바로 나와 <b>항상 맞다</b>.
        </p>
      )}
    </div>
  )
}

export default function Step3_3({ onGo }) {
  return (
    <section>
      <header className="lesson-header">
        <span className="badge context-badge">3-3</span>
        <h2>상태 · 상수 · 파생 — 무엇을 useState에 둘까</h2>
        <p>화면 값이라고 다 상태는 아니다. "이 값을 다른 값으로 계산해 낼 수 있나?" 한 질문으로 셋을 가른다.</p>
      </header>

      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 학습 포인트</span>
        <p>
          <b>상태</b>(변하고 · 원본), <b>상수</b>(안 변함), <b>파생</b>(변하지만 다른 값에서 계산됨)을 구분한다.
          파생은 <b>저장하지 말고 계산</b>한다 — 저장하면 원본과 어긋난다.
        </p>
      </div>

      {/* 판별 질문 */}
      <h3 className="section-title">한 가지 질문으로 가른다</h3>
      <span className="learn-tag">📎 학습 포인트 · "이 값을, 지금 있는 다른 값으로 계산해 낼 수 있나?"</span>
      <p className="section-desc">
        어떤 값을 <code>useState</code>에 둘지 고민될 때, 딱 이 질문을 던진다 —
        <b>"이 값을, 지금 있는 다른 값으로 계산해 낼 수 있나?"</b>
      </p>
      <div className="table-wrap">
        <table className="pvs-table">
          <thead>
            <tr>
              <th></th>
              <th>변하나?</th>
              <th>다른 값으로 계산되나?</th>
              <th>어떻게 두나</th>
              <th>예</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><b>상수 (불변)</b></td>
              <td>❌ 안 변함</td>
              <td>—</td>
              <td>그냥 상수 <code>const</code></td>
              <td>최대 글자수 100 · 사이트 이름</td>
            </tr>
            <tr>
              <td><b>상태 (state)</b></td>
              <td>⭕ 변함</td>
              <td>❌ (이게 원본이다)</td>
              <td><code>useState</code>로 저장</td>
              <td>count · 입력창 글자 · 로그인 여부</td>
            </tr>
            <tr>
              <td><b>파생 (derived)</b></td>
              <td>⭕ 변함</td>
              <td>⭕ (원본에서 나옴)</td>
              <td><b>저장 말고 계산</b></td>
              <td>count × 2 · 총액 · 유효성 에러</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="section-desc">
        즉 — <b>안 변하면 상수</b>, <b>변하는데 계산 못 하면 상태</b>, <b>변하지만 다른 값으로 계산되면 파생</b>이다.
        상태는 원본, 파생은 그 원본에서 <b>끌어낸 결과</b>일 뿐이다.
      </p>

      {/* 왜 파생을 저장하면 안 되나 — 라이브 */}
      <h3 className="section-title">왜 파생은 '저장'하면 안 될까 — 어긋난다</h3>
      <span className="learn-tag">📎 학습 포인트 · 파생을 상태로 저장하면, 원본을 바꿀 때 저장값도 매번 같이 고쳐야 한다 → 하나만 빠뜨려도 틀어짐</span>
      <p className="section-desc">
        "2배 값"은 <code>count</code>에서 계산되는 <b>파생</b>이다. 이걸 굳이 <b>상태로 저장</b>하면,
        <code>count</code>를 바꿀 때마다 저장값도 <b>같이</b> 고쳐야 한다. 한 군데라도 빼먹으면 <b>둘이 어긋난다</b>.
        아래 <b>"깜빡" 버튼</b>을 눌러 직접 어긋내 보라.
      </p>
      <div className="card">
        <div className="file-label">📄 DerivedBugDemo · step3-3-derived/index.jsx</div>
        <DerivedBugDemo />
      </div>

      <div className="card">
        <div className="file-label">📄 저장 vs 계산</div>
        <pre className="concept-flow">{`const [count, setCount] = useState(0)

// ❌ 파생을 '저장' — count 바꿀 때마다 이것도 같이 고쳐야 함 (빼먹으면 어긋남)
const [savedDouble, setSavedDouble] = useState(0)
setCount(count + 1)
setSavedDouble((count + 1) * 2)   // 이 줄 하나 빠지면 → 화면이 틀림

// ✅ 파생은 '계산' — 저장 안 하니 어긋날 수가 없다
const computedDouble = count * 2   // 매 렌더 count에서 바로 나옴 → 항상 맞음`}</pre>
      </div>
      <p className="section-desc">
        그래서 <b>파생은 저장하지 않는다.</b> "파생"은 새로 만든 규칙이 아니라 —
        <b>"이 값은 저장하면 어긋나니 계산해 써라"</b>는 회피책에 붙인 이름일 뿐이다.
      </p>

      {/* 어원 */}
      <div className="concept">
        <p className="concept-lead">📚 참고 — 왜 하필 '파생'이라 부르나</p>
        <p className="section-desc" style={{ marginTop: 0 }}>
          겉보기엔 2배 값도 화면에서 변하니 "이것도 상태 아냐?" 싶다. 하지만 진짜 원본(<code>count</code>)이 <b>따로 있고</b>,
          2배는 거기서 <b>끌어낸 결과</b>다. 원본이 아니라서 상태가 아니다. 이름 그대로다 —
          <b>파생(派生)</b>은 "갈라져 나옴", 영어 <b>derive</b>는 "끌어내다". 원천(원본 상태)에서 갈라져 나온 값이라 <b>파생</b>이다.
        </p>
      </div>

      {/* 확인 드릴 */}
      <h3 className="section-title">🧩 확인 드릴 — 상태 · 상수 · 파생 가르기</h3>
      <span className="learn-tag">📎 학습 포인트 · "다른 값으로 계산되나?"로 판단 — 계산되면 파생(저장 X)</span>
      <QuickQuiz
        intro="같은 질문(다른 값으로 계산해 낼 수 있나?)을 값만 바꿔 확인한다. 하나 골라 보라."
        questions={[
          {
            q: '쇼핑몰에서 "장바구니 총액"은 상태·상수·파생 중 무엇일까? (아이템 목록이 원본 상태일 때)',
            options: ['상태 — useState로 따로 저장한다', '파생 — 아이템들에서 계산하니 저장 안 한다', '상수 — 안 변하니 그냥 const'],
            answer: 1,
            explain: '총액은 아이템들의 가격·수량에서 계산해 낼 수 있다 → 파생. 따로 저장하면 아이템 바꿀 때마다 총액도 고쳐야 하고, 빠뜨리면 어긋난다. 매번 계산이 정답.',
          },
          {
            q: '입력창에 사용자가 치는 "이메일 글자"는?',
            options: ['상태 — 다른 값으로 계산할 수 없고 사용자가 직접 바꾼다', '파생 — 어디선가 계산된다', '상수 — 고정 값이다'],
            answer: 0,
            explain: '이메일 글자는 사용자가 직접 만들어 내는 원본이라 다른 값으로 계산할 수 없다 → 상태. useState에 담는다.',
          },
          {
            q: '"비밀번호가 8자 이상인가?"(true/false)는?',
            code: `const [pw, setPw] = useState('')`,
            options: ['상태로 따로 저장한다', '파생 — pw에서 계산한다 (pw.length >= 8)', '상수다'],
            codeOptions: true,
            answer: 1,
            explain: 'pw.length >= 8 로 pw에서 바로 계산된다 → 파생. 따로 상태로 저장하면 pw 바꿀 때마다 같이 고쳐야 해 어긋나기 쉽다.',
          },
          {
            q: '화면에 쓰는 "사이트 이름"(항상 같은 문구)은?',
            options: ['상태 — useState', '파생 — 계산한다', '상수 — 안 변하니 그냥 const'],
            answer: 2,
            explain: '시간이 지나도 언제나 같은 값이라 변하지 않는다 → 상수. 상태로 관리할 필요가 없다.',
          },
          {
            q: '파생 값을 굳이 useState로 저장하면 생기는 문제는?',
            options: ['원본을 바꿀 때 같이 안 고치면 원본과 어긋난다', '아무 문제 없다', '화면이 더 빨라진다'],
            answer: 0,
            explain: '파생을 저장하면 원본이 바뀔 때마다 저장값도 같이 갱신해야 한다. 한 군데라도 빼먹으면 화면에 틀린 값이 남는다(동기화 버그). 그래서 저장 말고 계산한다.',
          },
        ]}
      />

      <div className="try-it">
        <h4>💡 한 줄 정리</h4>
        <ul>
          <li>판별 질문 — <b>"다른 값으로 계산해 낼 수 있나?"</b></li>
          <li>안 변함 → <b>상수</b> · 변하고 원본 → <b>상태(useState)</b> · 변하지만 계산됨 → <b>파생(저장 말고 계산)</b>.</li>
          <li>파생을 저장하면 원본과 <b>어긋난다</b> — 그래서 매 렌더 계산한다.</li>
        </ul>
      </div>

      <TechTags
        items={[
          { label: '⬅ 앞: 3-2 상태 설계·함정', to: 3.2 },
          { label: '➡ 뒤: 7-3 유효성 · 파생 에러', to: 6.3 },
        ]}
        onGo={onGo}
      />
    </section>
  )
}
