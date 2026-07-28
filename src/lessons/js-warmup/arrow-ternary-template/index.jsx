// 🟨 JS 2강 · 화살표 함수 · 삼항 연산자 · 템플릿 리터럴   (배우는 것: React/JSX 어디에나 나오는 일상 문법 3가지)
// 셋 다 "식(expression)"과 관련된다 — JS 1강의 '문 vs 식' 구분이 그대로 이어진다.
// React에선 onClick={() => ...}, {isLogin ? <A/> : <B/>}, `안녕 ${name}` 꼴로 매일 마주친다.

import { useState } from 'react'

const mono = '"Consolas", ui-monospace, monospace'

// JS 1강 해부기와 같은 색칩 — 조각의 역할별 색
const ROLE = {
  expression: { name: '식', color: '#7c3aed' },
  term: { name: '조건/항', color: '#2563eb' },
  operator: { name: '연산자', color: '#dc2626' },
  value: { name: '값', color: '#16a34a' },
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
// 해부기 스텝 카드 + 범례 (J1 ExprDissector와 동일한 모양)
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

// ① 화살표 함수 — function 꼴을 한 단계씩 줄여 가며 '같은 함수'임을 보여준다. (엄선된 고정 예시)
const ARROW_STEPS = [
  { title: '① 원래 꼴 — function 선언', code: `function double(x) {\n  return x * 2\n}`, note: '이름 있는 함수 선언. 지금까지 봐 온 꼴이다.' },
  { title: '② function을 => 로 바꾼다', code: `const double = (x) => {\n  return x * 2\n}`, note: '함수를 값으로 만들어 const에 담는다. 괄호 뒤에 화살표(=>)를 붙일 뿐, 하는 일은 같다.' },
  { title: '③ 본문이 return 한 줄이면 — 중괄호·return 생략', code: `const double = (x) => x * 2`, note: '중괄호를 벗기면 => 오른쪽 "식"이 그대로 반환값이 된다. 이것이 암묵적 return이다.' },
  { title: '④ 인자가 1개면 — 괄호도 생략 가능', code: `const double = x => x * 2`, note: '가장 짧은 꼴. map(x => x * 2) 콜백이 바로 이 모양이다.' },
]
function ArrowMorph() {
  const [step, setStep] = useState(0)
  const maxStep = ARROW_STEPS.length - 1
  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {ARROW_STEPS.slice(0, step + 1).map((s, i) => (
          <div className="card" key={i} style={{ padding: '10px 12px' }}>
            <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{s.title}</div>
            <pre className="err-code" style={{ margin: '0 0 6px' }}>{s.code}</pre>
            <div className="demo-desc" style={{ margin: 0 }}>
              🔑 {s.note} — 확인: <code style={{ fontFamily: mono }}>double(4)</code> = <b>8</b> (네 꼴 모두 동일)
            </div>
          </div>
        ))}
      </div>
      <div className="button-row" style={{ marginTop: 10 }}>
        <button className="chip on" disabled={step >= maxStep} onClick={() => setStep((s) => Math.min(maxStep, s + 1))}>
          {step >= maxStep ? '✅ 끝까지 줄임' : '▶ 한 단계 더 짧게'}
        </button>
        <button className="chip" onClick={() => setStep(0)}>↺ 처음</button>
      </div>
    </div>
  )
}

// ② 삼항 연산자 — J1 해부기처럼 색칩 카드로 한 겹씩 쪼갠다: 식 → 세 부분 → 조건 평가 → 가지 선택 → 값.
function TernaryLive() {
  const [age, setAge] = useState(20)
  const [shown, setShown] = useState(0)
  const pass = age >= 18
  const steps = [
    { title: '① 전체는 하나의 식 (삼항식)', parts: [{ label: 'age >= 18 ? "입장" : "미성년"', role: 'expression' }] },
    { title: '② 세 부분으로 — 조건 ? 참가지 : 거짓가지', parts: [{ label: 'age >= 18', role: 'term' }, { label: '?', role: 'operator' }, { label: '"입장"', role: 'value' }, { label: ':', role: 'operator' }, { label: '"미성년"', role: 'value' }] },
    { title: '③ 조건을 값으로 평가', parts: [{ label: String(age), role: 'value' }, { label: '>=', role: 'operator' }, { label: '18', role: 'value' }], result: `= ${pass}` },
    { title: `④ ${pass}니까 ${pass ? '참가지(? 뒤)' : '거짓가지(: 뒤)'} 선택`, note: '선택 안 된 가지는 평가조차 안 한다', parts: [{ label: pass ? '"입장"' : '"미성년"', role: 'value' }] },
    { title: '⑤ 식 전체의 값', parts: [{ label: pass ? '"입장"' : '"미성년"', role: 'value' }], result: '← 이 값이 된다' },
  ]
  const done = shown >= steps.length
  return (
    <div>
      <div className="button-row">
        {[15, 18, 20].map((a) => (
          <button key={a} className={'chip' + (a === age ? ' on' : '')} onClick={() => { setAge(a); setShown(0) }}>age = {a}</button>
        ))}
      </div>
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

// ③ 템플릿 리터럴 — 변수를 고르고 '한 단계씩' ${ } 자리를 채워 최종 문자열을 만든다.
function TemplateBuilder() {
  const [name, setName] = useState('지수')
  const [count, setCount] = useState(3)
  const [shown, setShown] = useState(0)
  // 문자열 이스케이프를 피하려 연결로 만든다
  const steps = [
    { label: '원본 (백틱 문자열)', str: '`${name}님, 알림이 ${count + 1}개 있다`', note: '백틱 안, ${ } 자리가 아직 그대로다' },
    { label: '① ${name} 자리 채우기', str: '`' + name + '님, 알림이 ${count + 1}개 있다`', note: 'name = "' + name + '" 을 꽂는다' },
    { label: '② ${count + 1} 계산해 채우기', str: '`' + name + '님, 알림이 ' + (count + 1) + '개 있다`', note: 'count = ' + count + ' → ' + count + ' + 1 = ' + (count + 1) + ' 을 꽂는다' },
    { label: '③ 완성 (백틱이 벗겨진 최종 문자열)', str: name + '님, 알림이 ' + (count + 1) + '개 있다', note: '이게 화면·변수에 담기는 값이다' },
  ]
  const done = shown >= steps.length
  return (
    <div>
      <div className="button-row">
        {['지수', '민호', '보라'].map((n) => (
          <button key={n} className={'chip' + (n === name ? ' on' : '')} onClick={() => { setName(n); setShown(0) }}>name = "{n}"</button>
        ))}
      </div>
      <div className="button-row" style={{ marginTop: 6 }}>
        {[1, 3, 10].map((c) => (
          <button key={c} className={'chip' + (c === count ? ' on' : '')} onClick={() => { setCount(c); setShown(0) }}>count = {c}</button>
        ))}
      </div>
      <div style={{ marginTop: 12 }}>
        {shown === 0
          ? <div className="demo-desc" style={{ margin: 0 }}>▶ "다음 단계"를 눌러 <code>{'${ }'}</code> 자리가 하나씩 채워지는 걸 보라.</div>
          : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {steps.slice(0, shown).map((s, i) => (
                <div className="card" key={i} style={{ padding: '10px 12px' }}>
                  <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{s.label}</div>
                  <pre className="err-code" style={{ margin: 0 }}>{s.str}</pre>
                  <div className="demo-desc" style={{ margin: '4px 0 0' }}>🔑 {s.note}</div>
                </div>
              ))}
            </div>
          )}
      </div>
      <div className="button-row" style={{ marginTop: 10 }}>
        <button className="chip on" disabled={done} onClick={() => setShown((v) => Math.min(steps.length, v + 1))}>
          {done ? '✅ 완성' : '▶ 다음 단계'}
        </button>
        <button className="chip" onClick={() => setShown(0)}>↺ 처음</button>
      </div>
      <p className="demo-desc" style={{ marginTop: 8 }}>
        🔑 <code>{'${ }'}</code> 안엔 변수뿐 아니라 <b>아무 식이나</b> 들어간다 — 위 ②는 <code>count + 1</code>을 계산해 꽂았다.
      </p>
    </div>
  )
}

// ④ JS → JSX 다리 — 오늘 배운 식이 React 한 줄로 '변해 가는' 과정을 한 단계씩 보여준다.
const BRIDGES = [
  {
    label: '이벤트 핸들러 (화살표)',
    steps: [
      { title: '① JS — "나중에 실행할 함수"를 만든다', code: '() => setCount(count + 1)', note: '화살표로 감싸야 지금 실행이 아니라 클릭 때 실행이다' },
      { title: '② onClick 속성에 그 함수를 넘긴다 (호출이 아니라 함수 자체)', code: 'onClick={ () => setCount(count + 1) }' },
      { title: '③ 완성 — 클릭하면 도는 버튼', code: '<button onClick={() => setCount(count + 1)}>+1</button>' },
    ],
  },
  {
    label: '목록 렌더링 (map)',
    steps: [
      { title: '① JS — 배열을 map으로 돈다', code: 'items.map(item => … )' },
      { title: '② 콜백이 JSX를 반환하면 → JSX들의 배열이 된다', code: 'items.map(item => <li key={item.id}>{item.name}</li>)', note: 'React가 그 배열을 받아 <li>들을 화면에 그린다. key는 항목 구별용' },
      { title: '③ 완성 — 중괄호에 넣어 화면에', code: '<ul>{items.map(item => <li key={item.id}>{item.name}</li>)}</ul>' },
    ],
  },
  {
    label: '조건부 렌더링 (삼항)',
    steps: [
      { title: '① JS — 값이 되는 조건식(삼항)', code: 'isLogin ? <Profile/> : <LoginButton/>', note: 'JSX도 값이라 삼항의 가지로 쓸 수 있다' },
      { title: '② JSX 중괄호 { } 안엔 "식"만 → 삼항을 그대로 넣는다', code: '{ isLogin ? <Profile/> : <LoginButton/> }' },
      { title: '③ 완성 — 로그인 여부로 다른 화면', code: '{isLogin ? <Profile /> : <LoginButton />}' },
    ],
  },
  {
    label: '문자열 (템플릿)',
    steps: [
      { title: '① JS — 백틱 문자열에 값을 꽂는다', code: '`${name}님 환영`' },
      { title: '② JSX 중괄호에 식으로 넣는다', code: '{ `${name}님 환영` }' },
      { title: '③ 완성 — 화면에 인사말', code: '<p>{`${name}님 환영`}</p>' },
    ],
  },
]
function ReactBridge() {
  const [idx, setIdx] = useState(0)
  const [shown, setShown] = useState(0)
  const b = BRIDGES[idx]
  const done = shown >= b.steps.length
  return (
    <div>
      <div className="button-row">
        {BRIDGES.map((x, i) => (
          <button key={i} className={'chip' + (i === idx ? ' on' : '')} onClick={() => { setIdx(i); setShown(0) }}>{x.label}</button>
        ))}
      </div>
      <div style={{ marginTop: 10 }}>
        {shown === 0
          ? <div className="demo-desc">▶ "다음 단계"를 눌러 JS 식이 JSX 한 줄로 변해 가는 걸 보라.</div>
          : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {b.steps.slice(0, shown).map((s, i) => (
                <div className="card" key={i} style={{ padding: '10px 12px' }}>
                  <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{s.title}</div>
                  <pre className="err-code" style={{ margin: 0 }}>{s.code}</pre>
                  {s.note && <div className="demo-desc" style={{ margin: '4px 0 0' }}>🔑 {s.note}</div>}
                </div>
              ))}
            </div>
          )}
      </div>
      <div className="button-row" style={{ marginTop: 10 }}>
        <button className="chip on" disabled={done} onClick={() => setShown((v) => Math.min(b.steps.length, v + 1))}>
          {done ? '✅ 완성' : '▶ 다음 단계'}
        </button>
        <button className="chip" onClick={() => setShown(0)}>↺ 처음</button>
      </div>
    </div>
  )
}

export default function JsArrowTernary() {
  return (
    <section>
      <header className="lesson-header">
        <span className="badge">🟨 JS 2</span>
        <h2>화살표 함수 · 삼항 연산자 · 템플릿 리터럴</h2>
        <p>React 코드 어디에나 나오는 일상 문법 3가지. 셋 다 "값이 되는 식"이라는 공통점이 있다.</p>
      </header>

      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 학습 포인트</span>
        <p>
          <b>화살표 함수</b>는 함수를 짧게 쓰는 꼴이고, <b>삼항 연산자</b>는 if와 달리 <b>값이 되는 조건식</b>이며,
          <b> 템플릿 리터럴</b>은 백틱 + <code>{'${식}'}</code>으로 문자열에 값을 꽂는다. JSX 중괄호 안엔 <b>식만</b> 들어가므로(JS 1강),
          이 셋이 React 문법의 뼈대가 된다.
        </p>
      </div>

      {/* ① 화살표 함수 */}
      <h3 className="section-title">① 화살표 함수 — function을 짧게</h3>
      <span className="learn-tag">📎 학습 포인트 · function 꼴 ↔ 화살표 꼴은 같은 함수다. 한 줄이면 return도 생략된다</span>
      <p className="section-desc" style={{ marginTop: 0 }}>🔤 <b>화살표 함수(arrow function)</b>는 <code>=&gt;</code> 기호가 <b>화살표</b> 모양이라 붙은 이름이다.</p>
      <div className="card">
        <div className="file-label">📄 "한 단계 더 짧게"를 눌러 같은 함수가 줄어드는 걸 보라</div>
        <ArrowMorph />
      </div>
      <ul className="section-list">
        <li><b>암묵적 return</b> — <code>x =&gt; x * 2</code> 처럼 중괄호 없이 쓰면 <code>=&gt;</code> 오른쪽 식의 값이 그대로 반환된다.</li>
        <li>⚠️ 반대로 <b>중괄호를 쓰면</b> return을 직접 써야 한다. <code>x =&gt; {'{ x * 2 }'}</code> 는 <b>undefined를 반환</b>하는 흔한 함정이다.</li>
        <li>React에선 <code>onClick={'{() => setCount(count + 1)}'}</code> · <code>list.map(x =&gt; &lt;li&gt;...&lt;/li&gt;)</code> 꼴로 매일 쓴다.</li>
        <li>💡 <code>onClick={'{() => ...}'}</code>에서 화살표로 감싸는 이유 — "지금 실행"이 아니라 <b>나중에 클릭 때 실행할 함수</b>를 넘겨야 하기 때문이다.</li>
      </ul>

      {/* ② 삼항 연산자 */}
      <h3 className="section-title">② 삼항 연산자 — 값이 되는 조건식</h3>
      <span className="learn-tag">📎 학습 포인트 · 조건 ? a : b 는 문이 아니라 식 — 평가하면 a 또는 b 라는 '값'이 된다</span>
      <p className="section-desc" style={{ marginTop: 0 }}>🔤 <b>ternary(삼항)</b>의 tern-은 "<b>셋</b>"(tri-와 같은 뿌리) — 조건·참값·거짓값 <b>세 부분</b>을 쓰는 유일한 연산자라 '삼항'이다.</p>
      <div className="card">
        <div className="file-label">📄 age를 고르고 "▶ 다음 단계로 쪼개기"로 한 겹씩 쪼개 보라</div>
        <TernaryLive />
      </div>
      <div className="card">
        <div className="file-label">🔑 참고 · if 문과의 차이</div>
        <pre className="err-code">{`// if는 '문' — 값이 되지 않는다 → JSX { } 안에 못 넣는다
if (age >= 18) { msg = "입장" } else { msg = "미성년" }

// 삼항은 '식' — 그 자리에서 값이 된다 → 변수 대입·JSX 어디든 OK
const msg = age >= 18 ? "입장" : "미성년"`}</pre>
      </div>
      <ul className="section-list">
        <li>읽는 법: <b>조건 ? 참일 때 값 : 거짓일 때 값</b>. 물음표 앞이 조건, 콜론이 갈림길이다.</li>
        <li>React 조건부 렌더링 <code>{'{isLogin ? <Profile/> : <LoginButton/>}'}</code> 이 바로 이 식이다 — JSX도 값이기 때문이다.</li>
        <li>⚠️ 삼항을 삼항 안에 겹쳐 쓰면 급격히 안 읽힌다 — 두 갈래까지만 쓰고, 더 복잡하면 if 문으로 변수를 만들어 넘긴다.</li>
      </ul>

      {/* ③ 템플릿 리터럴 */}
      <h3 className="section-title">③ 템플릿 리터럴 — 문자열에 값 꽂기</h3>
      <span className="learn-tag">📎 학습 포인트 · 따옴표 대신 백틱(`), 값 꽂는 자리는 ${'{식}'} — + 연결보다 그대로 읽힌다</span>
      <div className="card">
        <div className="file-label">📄 변수를 고르고 "▶ 다음 단계"로 ${'{ }'} 채우기를 보라</div>
        <TemplateBuilder />
      </div>
      <div className="card">
        <div className="file-label">📄 옛날 방식과 비교</div>
        <pre className="err-code">{`const old = name + "님, 알림이 " + (count + 1) + "개 있다"   // + 로 이어 붙이기 — 끊겨 읽힌다
const neo = \`\${name}님, 알림이 \${count + 1}개 있다\`          // 백틱 — 문장 그대로 읽힌다`}</pre>
      </div>
      <ul className="section-list">
        <li>백틱(<code>`</code>)은 작은따옴표(<code>'</code>)와 다른 키다 — 보통 키보드 숫자 1 왼쪽에 있다.</li>
        <li><code>{'${ }'}</code> 안은 <b>식 자리</b>다 — 변수·계산·삼항(<code>{'${ok ? "성공" : "실패"}'}</code>)까지 들어간다.</li>
        <li>줄바꿈도 그대로 담긴다 — 여러 줄 문자열을 만들 때도 백틱을 쓴다.</li>
      </ul>

      {/* ④ React 연결 */}
      <h3 className="section-title">④ 셋이 React에서 만나는 자리</h3>
      <span className="learn-tag">📎 학습 포인트 · 오늘 배운 셋이 JSX의 세 관용구로 그대로 이어진다</span>
      <div className="card">
        <div className="file-label">📄 실제 React 코드 — 곧 강의에서 이 줄들을 만난다 (목적지)</div>
        <pre className="err-code">{`<button onClick={() => setCount(count + 1)}>+1</button>   // 화살표 → 이벤트 핸들러
{items.map(item => <li key={item.id}>{item.name}</li>)}   // 화살표 → 목록 렌더링
{isLogin ? <Profile /> : <LoginButton />}                 // 삼항 → 조건부 렌더링
<p>{\`\${name}님 환영\`}</p>                                 // 템플릿 리터럴 → 문자열 조립`}</pre>
      </div>
      <div className="card">
        <div className="file-label">🔬 위 줄들이 JS에서 어떻게 만들어지나 — 자리를 골라 "▶ 다음 단계"로 변화 과정을 보라</div>
        <ReactBridge />
      </div>
      <p className="section-desc">
        전부 JSX 중괄호 <code>{'{ }'}</code> 안이다 — 중괄호 안엔 <b>식만</b> 들어간다는 JS 1강의 규칙 위에서,
        화살표 함수도 삼항도 템플릿 리터럴도 <b>값이 되는 식</b>이라 들어갈 수 있는 것이다.
      </p>

      <div className="concept">
        <p className="concept-lead">📖 한 줄 요약</p>
        <p className="section-desc" style={{ marginTop: 0 }}>
          <b>화살표</b>는 함수를 짧게(<code>x =&gt; x * 2</code>), <b>삼항</b>은 조건을 값으로(<code>조건 ? a : b</code>),
          <b> 템플릿 리터럴</b>은 문자열에 식을(<code>{'`${name}님`'}</code>). 셋 다 <b>식</b>이라서 JSX 중괄호에 그대로 들어간다.
        </p>
      </div>
    </section>
  )
}
