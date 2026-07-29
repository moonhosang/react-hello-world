// 🟨 JS 4강 · truthy / falsy   (배우는 것: 불리언이 아닌 값도 조건에서 참/거짓으로 취급된다)
// falsy는 딱 6개 — 나머지는 전부 truthy. 그리고 &&는 '불리언'이 아니라 '값'을 반환한다.
// React 4.5(조건부 렌더링)의 유명한 함정 {list.length && <List/>} 가 바로 여기서 나온다.

import { useState } from 'react'

const mono = '"Consolas", ui-monospace, monospace'

// JS 1·2강 해부기와 같은 색칩 — 조각의 역할별 색
const ROLE = {
  expression: { name: '식', color: '#7c3aed' },
  term: { name: '조건/항', color: '#2563eb' },
  operator: { name: '연산자', color: '#dc2626' },
  value: { name: '값', color: '#16a34a' },
  skipped: { name: '평가 안 함', color: '#94a3b8' },
}
const chipStyle = (role) => ({
  border: `1.5px solid ${ROLE[role]?.color ?? '#888'}`,
  color: ROLE[role]?.color ?? '#888',
  background: 'transparent',
  borderRadius: 8,
  padding: '3px 9px',
  fontFamily: mono,
  fontSize: 13,
  fontWeight: 600,
})
// 해부기 스텝 카드 + 범례 (J1·J2 해부기와 동일한 모양)
function StepCards({ steps, shown }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {steps.slice(0, shown).map((s, i) => (
        <div className="card" key={i} style={{ padding: '10px 12px' }}>
          <div style={{ fontWeight: 700, fontSize: 13, marginBottom: s.note ? 3 : 8 }}>{s.title}</div>
          {s.note && <div className="demo-desc" style={{ margin: '0 0 8px' }}>🔑 {s.note}</div>}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
            {s.parts.map((p, j) => <span key={j} style={chipStyle(p.role)}>{p.label}</span>)}
            {s.result && <b style={{ marginLeft: 8, fontSize: 15 }}>{s.result}</b>}
          </div>
        </div>
      ))}
    </div>
  )
}
function Legend() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 12 }}>
      {Object.values(ROLE).map((r) => (
        <span key={r.name} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12 }}>
          <span style={{ width: 10, height: 10, borderRadius: 3, background: r.color, display: 'inline-block' }} />
          {r.name}
        </span>
      ))}
    </div>
  )
}

// 엄선된 값 목록 — 임의 입력 파싱 대신 고정 예시로. real은 실제 JS 값, label은 화면 표기.
const VALUES = [
  { label: 'false', real: false, falsy: true, why: '불리언 false 그 자체다.' },
  { label: '0', real: 0, falsy: true, why: '숫자 0은 falsy다. (⚠️ && 함정의 주범 — ④에서 본다)' },
  { label: "''", real: '', falsy: true, why: '빈 문자열은 falsy다. 글자가 하나라도 있으면 truthy.' },
  { label: 'null', real: null, falsy: true, why: '"값이 없음"을 일부러 넣은 것 — falsy다.' },
  { label: 'undefined', real: undefined, falsy: true, why: '아직 값이 정해지지 않음 — falsy다.' },
  { label: 'NaN', real: NaN, falsy: true, why: '숫자 계산이 실패한 결과(Not-a-Number) — falsy다.' },
  { label: "'0'", real: '0', falsy: false, why: "문자열 '0'은 글자가 있는 문자열 → truthy! 숫자 0과 전혀 다르다." },
  { label: "'false'", real: 'false', falsy: false, why: "문자열 'false'도 글자가 있는 문자열 → truthy! 불리언 false가 아니다." },
  { label: '[]', real: [], falsy: false, why: '빈 배열도 객체다 → truthy! "비었는지"는 arr.length === 0 으로 따로 확인한다.' },
  { label: '{}', real: {}, falsy: false, why: '빈 객체도 truthy다. 객체는 내용물과 무관하게 전부 truthy.' },
  { label: '-1', real: -1, falsy: false, why: '0이 아닌 숫자는 음수여도 truthy다. falsy인 숫자는 0(과 NaN)뿐.' },
  { label: '1', real: 1, falsy: false, why: '0이 아닌 숫자 → truthy.' },
  { label: "'hi'", real: 'hi', falsy: false, why: '글자가 있는 문자열 → truthy.' },
]

// ① truthy 판별기 — 값을 골라 Boolean() 결과와 이유를 본다.
function TruthyTester() {
  const [sel, setSel] = useState(null)
  const v = sel === null ? null : VALUES[sel]
  return (
    <div>
      <div className="button-row">
        {VALUES.map((x, i) => (
          <button key={x.label} className={'chip' + (i === sel ? ' on' : '')} onClick={() => setSel(i)}>
            {x.label}
          </button>
        ))}
      </div>
      {v === null ? (
        <p className="demo-desc" style={{ marginTop: 10 }}>▲ 값을 하나 골라 보라. truthy일지 falsy일지 먼저 속으로 답해 보고 누르면 좋다.</p>
      ) : (
        <div className="card" style={{ marginTop: 10, padding: '10px 12px' }}>
          <div style={{ fontFamily: mono, fontSize: 14, marginBottom: 6 }}>
            Boolean(<b>{v.label}</b>) → <b style={{ color: v.falsy ? '#dc2626' : '#16a34a' }}>{String(!v.falsy)}</b>
            <span style={{ marginLeft: 10, fontWeight: 700, color: v.falsy ? '#dc2626' : '#16a34a' }}>
              {v.falsy ? '❌ falsy' : '✅ truthy'}
            </span>
          </div>
          <p className="demo-desc" style={{ margin: 0 }}>{v.why}</p>
        </div>
      )}
    </div>
  )
}

// ④ && 함정 해부기 — 빈 배열(list.length = 0)에서 ❌/✅ 코드가 평가되는 과정을 J2 해부기처럼 한 겹씩 쪼갠다.
function ZeroTrapDemo() {
  const [fixed, setFixed] = useState(false)
  const [shown, setShown] = useState(0)
  const trapSteps = [
    { title: '① 식 전체', parts: [{ label: 'list.length && "장바구니 보기"', role: 'expression' }] },
    { title: '② 왼쪽부터 평가', note: '빈 배열이라 length는 0이다', parts: [{ label: 'list.length', role: 'term' }, { label: '0', role: 'value' }] },
    { title: '③ 0은 falsy → &&는 왼쪽 값을 그대로 반환', note: '오른쪽("장바구니 보기")은 평가조차 안 한다', parts: [{ label: '0', role: 'value' }, { label: '&&', role: 'operator' }, { label: '"장바구니 보기"', role: 'skipped' }], result: '→ 0' },
    { title: '④ 리액트는 숫자 0을 화면에 그린다', note: 'false·null·undefined는 안 그리지만 숫자 0은 그린다', parts: [{ label: '0', role: 'value' }], result: '→ 화면에 0이 남는다 ❗' },
  ]
  const fixSteps = [
    { title: '① 식 전체', parts: [{ label: 'list.length > 0 && "장바구니 보기"', role: 'expression' }] },
    { title: '② 왼쪽 평가', note: '비교식이라 결과가 진짜 불리언이 된다', parts: [{ label: '0', role: 'value' }, { label: '>', role: 'operator' }, { label: '0', role: 'value' }], result: '= false' },
    { title: '③ false는 화면에 안 나온다', note: '진짜 불리언 false는 React가 그리지 않는다', parts: [{ label: 'false', role: 'value' }], result: '→ (안 보임) ✅' },
  ]
  const steps = fixed ? fixSteps : trapSteps
  const done = shown >= steps.length
  return (
    <div>
      <div className="button-row">
        <button className={'chip' + (!fixed ? ' on' : '')} onClick={() => { setFixed(false); setShown(0) }}>{'❌ {list.length && ...}'}</button>
        <button className={'chip' + (fixed ? ' on' : '')} onClick={() => { setFixed(true); setShown(0) }}>{'✅ {list.length > 0 && ...}'}</button>
      </div>
      <p className="demo-desc" style={{ margin: '8px 0 0' }}>
        전제: <code style={{ fontFamily: mono }}>list = []</code> (빈 배열) → <code style={{ fontFamily: mono }}>list.length = 0</code>
      </p>
      <div style={{ marginTop: 10 }}>
        {shown === 0
          ? <div className="demo-desc">▶ "다음 단계로 쪼개기"를 눌러 한 겹씩 쪼개 보라.</div>
          : <StepCards steps={steps} shown={shown} />}
      </div>
      <div className="button-row" style={{ marginTop: 10 }}>
        <button className="chip on" disabled={done} onClick={() => setShown((v) => Math.min(steps.length, v + 1))}>
          {done ? '✅ 끝까지 쪼갬' : '▶ 다음 단계로 쪼개기'}
        </button>
        <button className="chip" onClick={() => setShown(0)}>↺ 처음</button>
      </div>
      <Legend />
    </div>
  )
}

export default function JsTruthyFalsy() {
  return (
    <section>
      <header className="lesson-header">
        <span className="badge">🟨 JS 4</span>
        <h2>truthy / falsy — 조건에서 값이 참/거짓 노릇을 한다</h2>
        <p>불리언이 아닌 값도 <code>if</code>·<code>&&</code>·<code>? :</code> 안에선 참 또는 거짓으로 취급된다. falsy는 딱 6개뿐이다.</p>
      </header>

      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 학습 포인트</span>
        <p>
          <b>falsy 6개</b>(<code>false</code>, <code>0</code>, <code>''</code>, <code>null</code>, <code>undefined</code>, <code>NaN</code>)만 외우면
          나머지는 <b>전부 truthy</b>다. 그리고 <b><code>&&</code>는 불리언이 아니라 값을 반환한다</b> — 왼쪽이 <code>0</code>이면 <code>0</code>이 그대로 나온다.
        </p>
      </div>

      {/* ⓪ 어원·어감 */}
      <h3 className="section-title">⓪ 왜 'truthy / falsy'라 부르나 — 어감과 true/false의 차이</h3>
      <span className="learn-tag">📎 학습 포인트 · true/false는 '값', truthy/falsy는 '행동' — 참인 게 아니라 참'처럼' 군다</span>
      <p className="section-desc">
        영어에서 낱말 뒤에 <b>-y</b>를 붙이면 "~같은 / ~스러운" 느낌이 된다 (sleep→sleep<b>y</b> 졸린, cat→cat<b>ty</b> 새침한).
        그래서 <b>truthy</b>는 "<b>참 같은</b>", <b>falsy</b>는 "<b>거짓 같은</b>" — 개발자들이 만든 <b>비격식 용어</b>다.
      </p>
      <p className="section-desc">
        핵심 차이: <code>true</code>·<code>false</code>는 <b>진짜 불리언 '값'</b>이고, <b>truthy/falsy는 '값'이 아니라 '행동'</b>이다 —
        불리언이 아닌 값이 <b>조건 자리(if·&&·? :)</b>에서 참/거짓 어느 쪽으로 취급되는지를 가리킨다.
      </p>
      <div className="card">
        <div className="file-label">📄 '참인 것' vs '참처럼 구는 것'</div>
        <pre className="err-code">{`'hi' === true      // → false    'hi'는 true라는 '값'이 아니다
if ('hi') { ... }  // → 실행됨    하지만 조건에선 참처럼 '행동'한다 = truthy

// 정확한 정의: Boolean(값)이 true면 truthy, false면 falsy
Boolean('hi')  // true  → truthy
Boolean(0)     // false → falsy`}</pre>
      </div>
      <p className="section-desc">
        그래서 <b>"값이 <code>true</code>다"와 "값이 truthy다"는 다르다.</b> 대부분의 값은 <code>true</code>가 아니면서도 truthy다.
      </p>

      {/* ① falsy 6개 */}
      <h3 className="section-title">① falsy는 딱 6개 — 나머지는 전부 truthy</h3>
      <span className="learn-tag">📎 학습 포인트 · 외울 건 falsy 6개뿐. '비어 보이는' 값이라고 falsy인 게 아니다</span>
      <div className="card">
        <div className="file-label">📄 falsy 전체 목록 (이게 전부다)</div>
        <pre className="err-code">{`false      // 불리언 false
0          // 숫자 0 (⚠️ && 함정의 주범)
''         // 빈 문자열
null       // "없음"을 일부러 넣은 것
undefined  // 아직 안 정해짐
NaN        // 숫자 계산 실패

// 그 외 전부 truthy — 특히 이것들을 falsy로 착각하기 쉽다:
'0'  'false'  []  {}  -1     // 전부 truthy ❗`}</pre>
      </div>
      <ul className="section-list">
        <li>문자열 <code>'0'</code>·<code>'false'</code> — <b>글자가 있는 문자열</b>은 내용과 무관하게 truthy다.</li>
        <li><code>[]</code>·<code>{'{}'}</code> — <b>객체는 비어 있어도 truthy</b>다. 배열이 비었는지는 <code>arr.length === 0</code>으로 확인한다.</li>
        <li><code>-1</code> — falsy인 숫자는 <code>0</code>(과 <code>NaN</code>)뿐이라, 음수도 truthy다.</li>
      </ul>

      {/* ② 판별기 */}
      <h3 className="section-title">② 라이브 truthy 판별기</h3>
      <span className="learn-tag">📎 학습 포인트 · 누르기 전에 먼저 예측하라 — 특히 '0', [], -1</span>
      <div className="card">
        <div className="file-label">🔬 값을 골라 Boolean(값)을 확인해 보라</div>
        <TruthyTester />
      </div>

      {/* ③ 어디서 쓰이나 */}
      <h3 className="section-title">③ 조건 자리에선 값이 truthy/falsy로 평가된다</h3>
      <span className="learn-tag">📎 학습 포인트 · if · && · ? : 의 조건 자리에 불리언이 아닌 값이 와도 동작한다</span>
      <div className="card">
        <div className="file-label">📄 세 가지 조건 자리</div>
        <pre className="err-code">{`if (name) { ... }        // name이 truthy('hi' 등)면 실행, ''·null이면 건너뜀
name && sayHi(name)      // 왼쪽이 truthy일 때만 오른쪽 평가 (2강의 단축 평가)
name ? name : '손님'      // truthy면 name, falsy면 '손님'

// ⚠️ 핵심 성질: &&는 true/false를 반환하는 게 아니다.
//    왼쪽이 falsy → '왼쪽 값'을 그대로 반환 / truthy → '오른쪽 값'을 반환
0 && 'hello'    // → 0        (false가 아니라 0!)
2 && 'hello'    // → 'hello'`}</pre>
      </div>
      <p className="section-desc">
        마지막 두 줄이 오늘의 핵심이다. <code>&&</code>가 <b>값을 그대로 반환</b>하기 때문에, 왼쪽이 <code>0</code>이면
        결과도 <code>0</code>이다 — 이 <code>0</code>이 React 화면에 그대로 찍히는 게 다음 함정이다.
      </p>

      {/* ④ 함정 라이브 데모 */}
      <h3 className="section-title">④ 함정 — 화면에 숫자 0이 찍힌다</h3>
      <span className="learn-tag">📎 학습 포인트 · {'{list.length && <List/>}'} 에서 목록이 비면 0이 렌더링된다 → 왼쪽을 불리언으로 만들어 고친다</span>
      <div className="card">
        <div className="file-label">📄 Cart.jsx — 이 한 줄이 문제다</div>
        <pre className="err-code">{`{list.length && <ul>...</ul>}
// 목록이 비면 list.length는 0(falsy) → &&가 0을 반환 → 화면에 '0' 출력 ❗

// 👉 고치는 법: 왼쪽을 비교식으로 만들어 '진짜 불리언'을 놓는다
{list.length > 0 && <ul>...</ul>}   // false는 React가 안 그린다 ✅`}</pre>
      </div>
      <div className="card">
        <div className="file-label">🔬 ❌/✅ 코드를 고르고 "▶ 다음 단계로 쪼개기"로 평가 과정을 따라가 보라</div>
        <ZeroTrapDemo />
      </div>
      <div className="card">
        <div className="file-label">🔗 React와 연결 — 4.5 조건부 렌더링</div>
        <p className="section-desc" style={{ margin: 0 }}>
          이 함정은 <b>React 4.5 · 조건부 렌더링</b>의 <code>cond && &lt;JSX/&gt;</code> 패턴에서 그대로 다시 만난다.
          React는 <code>false</code>·<code>null</code>·<code>undefined</code>는 화면에 안 그리지만 <b>숫자 <code>0</code>은 그린다</b>.
          그래서 <code>&&</code> 왼쪽엔 <b>항상 불리언</b>(<code>length &gt; 0</code>, <code>!!value</code>)을 놓는 습관을 들인다.
        </p>
        <pre className="err-code" style={{ marginTop: 10 }}>{`// 예시 1 · 장바구니 뱃지 — 개수가 0이면?
{cartCount && <span className="badge">{cartCount}</span>}      // ❌ 비면 화면에 0 이 뜬다
{cartCount > 0 && <span className="badge">{cartCount}</span>}  // ✅ 0이면 아무것도 안 보인다

// 예시 2 · 할 일 목록 — 목록이 비면?
{todos.length && <TodoList todos={todos} />}       // ❌ 비면 화면에 0 이 뜬다
{todos.length > 0 && <TodoList todos={todos} />}   // ✅ 안전`}</pre>
      </div>

      <div className="concept">
        <p className="concept-lead">📖 한 줄 요약</p>
        <p className="section-desc" style={{ marginTop: 0 }}>
          falsy는 <b>6개</b>(<code>false</code> <code>0</code> <code>''</code> <code>null</code> <code>undefined</code> <code>NaN</code>)뿐, 나머지는 전부 truthy.
          <code> &&</code>는 <b>값을 반환</b>하므로 왼쪽이 <code>0</code>이면 <code>0</code>이 화면에 찍힌다 — <b><code>length &gt; 0 &&</code></b> 처럼 불리언으로 만들어라.
        </p>
      </div>
    </section>
  )
}
