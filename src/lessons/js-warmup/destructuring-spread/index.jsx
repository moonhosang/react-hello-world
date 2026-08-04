// 🟨 JS 6강 · 구조 분해 할당 · 스프레드   (배우는 것: 꺼내 쓰기와 '원본 안 건드리고 새로 만들기')
// React props 받기(2단계)·useState(3-2)·불변성 업데이트의 핵심 전제다.

import { useState } from 'react'
import QuickQuiz from '../../../components/QuickQuiz.jsx'

const mono = 'var(--font-mono)'

// JS 1·2강 해부기와 같은 색칩 — 조각의 역할별 색 (+ 객체 '키: 값' 역할 추가)
const ROLE = {
  expression: { name: '식', color: '#7c3aed' },
  term: { name: '조건/항', color: '#2563eb' },
  operator: { name: '연산자', color: '#dc2626' },
  value: { name: '값', color: '#16a34a' },
  key: { name: '키: 값', color: '#d97706' },
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

// 데모가 공유하는 고정 사용자 객체 (임의 입력 파싱 대신 엄선된 예시)
const USER = { name: '민지', age: 20, city: '서울' }
const FIELDS = ['name', 'age', 'city']

// ① 구조 분해 라이브 데모 — 원하는 필드를 골라 꺼내 본다
function DestructurePicker() {
  const [picked, setPicked] = useState(['name'])
  const toggle = (f) =>
    setPicked((p) => (p.includes(f) ? p.filter((x) => x !== f) : [...p, f]))
  const ordered = FIELDS.filter((f) => picked.includes(f))

  return (
    <div>
      <p className="demo-desc" style={{ marginTop: 0 }}>
        user = {JSON.stringify(USER)} — 꺼낼 필드를 골라 보라.
      </p>
      <div className="button-row">
        {FIELDS.map((f) => (
          <button key={f} className={'chip' + (picked.includes(f) ? ' on' : '')} onClick={() => toggle(f)}>
            {f}
          </button>
        ))}
      </div>
      <pre className="err-code" style={{ marginTop: 10 }}>
        {ordered.length
          ? `const { ${ordered.join(', ')} } = user`
          : '// 필드를 하나 이상 골라 보라'}
      </pre>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontFamily: mono, fontSize: 13 }}>
        {ordered.map((f) => (
          <span key={f}>
            <b style={{ color: 'var(--brand)' }}>{f}</b>
            <span style={{ color: 'var(--muted)' }}> → </span>
            {JSON.stringify(USER[f])}
          </span>
        ))}
      </div>
      <p className="demo-desc" style={{ marginBottom: 0 }}>
        한 줄로 <b>필요한 값만</b> 꺼내 각각 이름 붙은 변수가 된다. <code>user.name</code>을 반복해서 쓸 필요가 없다.
      </p>
    </div>
  )
}

// ② 스프레드 해부기 — { ...user, age: 21 } 이 새 객체가 되는 과정을 한 겹씩 쪼갠다 (J2 삼항 해부기와 같은 방식)
function SpreadDissector() {
  const [newAge, setNewAge] = useState(21)
  const [shown, setShown] = useState(0)
  const steps = [
    { title: '① 전체는 하나의 식 (스프레드가 든 객체 리터럴)', note: "user = { name: '민지', age: 20, city: '서울' } 일 때 — 평가하면 '새 객체'라는 값이 된다", parts: [{ label: `{ ...user, age: ${newAge} }`, role: 'expression' }] },
    { title: '② ...user 펼치기 — 원본의 모든 키·값을 복사', note: '스프레드는 user의 키·값을 그 자리에 그대로 늘어놓는다', parts: [{ label: '...user', role: 'operator' }, { label: "name: '민지'", role: 'key' }, { label: 'age: 20', role: 'key' }, { label: "city: '서울'", role: 'key' }] },
    { title: `③ age: ${newAge} 을 뒤에 덧붙임`, note: `같은 키 age가 두 번 등장 → 같은 키는 뒤가 이긴다 — age가 20 → ${newAge} 로 덮어써진다`, parts: [{ label: "name: '민지'", role: 'key' }, { label: 'age: 20', role: 'key' }, { label: "city: '서울'", role: 'key' }, { label: `age: ${newAge}`, role: 'key' }], result: `→ age는 ${newAge}만 남는다` },
    { title: '④ 새 객체 완성', parts: [{ label: `{ name: '민지', age: ${newAge}, city: '서울' }`, role: 'value' }], result: '← 식 전체의 값' },
    { title: '⑤ 원본 user는 그대로', note: '새 객체를 만든 것이지 원본을 바꾼 게 아니다 — 이게 불변성이다', parts: [{ label: "{ name: '민지', age: 20, city: '서울' }", role: 'value' }], result: '✅ 한 글자도 안 바뀜' },
  ]
  const done = shown >= steps.length
  return (
    <div>
      <p className="demo-desc" style={{ marginTop: 0 }}>
        <code style={{ fontFamily: mono }}>{"const user = { name: '민지', age: 20, city: '서울' }"}</code> — 뒤에 덧붙일 age 값을 골라 보라.
      </p>
      <div className="button-row">
        {[21, 22, 30].map((a) => (
          <button key={a} className={'chip' + (a === newAge ? ' on' : '')} onClick={() => { setNewAge(a); setShown(0) }}>age: {a}</button>
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

export default function JsDestructuring() {
  return (
    <section>
      <header className="lesson-header">
        <span className="badge">🟨 JS 6</span>
        <h2>구조 분해 할당 · 스프레드 — 꺼내 쓰기와 새로 만들기</h2>
        <p>객체·배열에서 필요한 값만 꺼내고(구조 분해), 원본을 안 건드리고 새 것을 만든다(스프레드). React 문법의 절반이 이 둘이다.</p>
      </header>

      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 학습 포인트</span>
        <p>
          <b>구조 분해</b>는 <code>{'const { name } = user'}</code>처럼 필요한 값만 꺼내 이름 붙이는 문법.
          <b> 스프레드 <code>...</code></b>는 기존 것을 펼쳐 담은 <b>새</b> 객체·배열을 만드는 문법 — <b>원본은 그대로</b>다(불변성).
          props 받기·<code>useState</code>·state 업데이트가 전부 이 둘 위에 서 있다.
        </p>
      </div>

      {/* ① 객체 구조 분해 */}
      <h3 className="section-title">① 객체 구조 분해 — 필요한 값만 꺼내 이름 붙이기</h3>
      <span className="learn-tag">📎 학습 포인트 · 왼쪽 <code>{'{ }'}</code>는 객체를 만드는 게 아니라 "이 키들을 꺼내라"는 모양이다</span>
      <p className="section-desc" style={{ marginTop: 0 }}>🔤 <b>destructuring(구조 분해)</b> = de(해체) + structure(구조) — 객체·배열의 <b>구조를 뜯어</b> 안의 값을 꺼낸다는 뜻이다.</p>
      <div className="card">
        <div className="file-label">📄 점 찍기 반복 vs 구조 분해</div>
        <pre className="err-code">{`const user = { name: '민지', age: 20, city: '서울' }

// 예전 방식 — 매번 user. 을 반복
const name = user.name
const age = user.age

// 구조 분해 — 한 줄로 같은 일
const { name, age } = user      // name = '민지', age = 20
//      └ 키 이름과 '같은 이름'의 변수가 생긴다 (순서는 무관)`}</pre>
      </div>
      <div className="card">
        <div className="file-label">🔬 골라서 꺼내 보라</div>
        <DestructurePicker />
      </div>
      <ul className="section-list">
        <li>키 <b>이름</b>으로 맞춰 꺼낸다 — 쓴 순서는 상관없고, 없는 키를 꺼내면 에러가 아니라 <code>undefined</code>다.</li>
        <li>React 연결: <code>{'function Card({ title }) { }'}</code> — 매개변수 자리에서 <b>props 객체를 바로 구조 분해</b>한 것이다 (→ React <b>2단계 · props</b>).</li>
      </ul>

      {/* ② 배열 구조 분해 */}
      <h3 className="section-title">② 배열 구조 분해 — useState의 정체</h3>
      <span className="learn-tag">📎 학습 포인트 · 배열은 키가 없으니 '순서'로 꺼낸다 → 이름은 내 마음대로</span>
      <div className="card">
        <div className="file-label">📄 순서대로 꺼내 이름 붙인다</div>
        <pre className="err-code">{`const arr = ['짜장', '짬뽕', '탕수육']
const [first, second] = arr     // first = '짜장', second = '짬뽕'

// 매일 쓰는 이 줄이 바로 '배열 구조 분해'다
const [count, setCount] = useState(0)
// useState가 [현재값, 바꾸는함수] 배열을 돌려주고,
// 0번째를 count, 1번째를 setCount 라고 '내가' 이름 붙인 것`}</pre>
      </div>
      <ul className="section-list">
        <li>객체는 <b>키 이름</b>으로, 배열은 <b>순서</b>로 꺼낸다 — 그래서 <code>[c, setC]</code>처럼 이름을 마음대로 지어도 된다.</li>
        <li><code>useState</code>가 마법이 아니라 <b>배열을 돌려주는 함수 + 구조 분해</b>일 뿐임이 보이면 성공이다 (→ React <b>3-2 · state</b>).</li>
      </ul>

      {/* ③ 스프레드 */}
      <h3 className="section-title">③ 스프레드 <code>...</code> — 원본 안 건드리고 새로 만들기</h3>
      <span className="learn-tag">📎 학습 포인트 · 복사·병합·추가 전부 "펼쳐서 새 그릇에 담기". 뒤에 쓴 키가 이긴다</span>
      <p className="section-desc" style={{ marginTop: 0 }}>
        🔤 <b>spread</b>는 잼을 빵에 "<b>펴 바르다</b>"·"흩뿌리다" — 객체·배열을 그 자리에 <b>쫙 펼친다</b>.
        같은 <code>...</code>를 <b>받는 쪽</b>(왼쪽)에 쓰면 <b>rest</b>("<b>나머지</b>")가 되어 <b>남은 걸 모은다</b> — 기호는 같고 방향만 반대다.
      </p>
      <div className="card">
        <div className="file-label">📄 객체·배열 스프레드 한눈에</div>
        <pre className="err-code">{`const user = { name: '민지', age: 20, city: '서울' }
const next = { ...user, age: 21 }   // { name: '민지', age: 21, city: '서울' } — 새 객체
//             └ user를 펼치고, 뒤의 age: 21이 이긴다. user는 그대로!

const arr = [1, 2, 3]
const more = [...arr, 4]            // [1, 2, 3, 4] — 새 배열, arr은 그대로
// ❌ arr.push(4) 는 '원본을' 바꾼다 — React state에선 금지 패턴`}</pre>
      </div>
      <div className="card">
        <div className="file-label">🔬 age 값을 고르고 "▶ 다음 단계로 쪼개기"로 한 겹씩 쪼개 보라</div>
        <SpreadDissector />
      </div>
      <ul className="section-list">
        <li><b>불변성</b>: 원본을 고치지 않고 <b>바뀐 부분만 다른 새 것</b>을 만든다. React는 <b>객체가 새 것인지</b>를 보고 리렌더를 판단하므로, state 업데이트는 반드시 <code>{'setUser({ ...user, age: 21 })'}</code>·<code>setList([...list, item])</code> 꼴로 한다 (→ React <b>3-2 · 불변 업데이트</b>).</li>
        <li><code>{'<Input {...props} />'}</code>처럼 JSX에서 props를 통째로 넘기는 전개도 같은 <code>...</code>다 (→ React <b>3.3 · props 전개</b>).</li>
        <li>덤 — <b>rest</b>: <code>{'const { id, ...rest } = obj'}</code>는 반대로 <b>남은 것들을 긁어 모아</b> 새 객체 <code>rest</code>에 담는다. "id만 빼고 나머지"를 만들 때 쓴다.</li>
      </ul>

      <div className="concept">
        <p className="concept-lead">📖 한 줄 요약</p>
        <p className="section-desc" style={{ marginTop: 0 }}>
          <b>구조 분해</b>는 꺼내기 — 객체는 <b>키 이름</b>으로(<code>{'{ name }'}</code>), 배열은 <b>순서</b>로(<code>[count, setCount]</code>).
          <b> 스프레드</b>는 펼쳐서 <b>새 것 만들기</b> — 원본은 그대로 두고, 뒤에 쓴 키가 이긴다. React props와 state 업데이트의 문법이 곧 이 둘이다.
        </p>
      </div>

      <h3 className="section-title">🧩 확인 드릴 — 꺼내기와 새로 만들기</h3>
      <span className="learn-tag">📎 학습 포인트 · 객체는 키 이름으로, 배열은 순서로 꺼낸다 · 스프레드는 원본을 안 건드리고 새 것을 만든다</span>
      <QuickQuiz
        intro="구조 분해와 스프레드를 상황만 바꿔 다섯 번 확인한다. 보기를 하나 골라 보라."
        questions={[
          {
            q: 'const { name, city } = user 이면 city에는 무엇이 담기나?',
            code: `const user = { name: '민지', age: 20, city: '서울' }
const { name, city } = user`,
            options: ["'서울'", "'민지'", 'undefined'],
            answer: 0,
            explain: "구조 분해는 키 '이름'으로 맞춰 꺼낸다. city 키의 값 '서울'이 city 변수에 담긴다(쓴 순서와 무관).",
          },
          {
            q: "const [a, b] = ['짜장', '짬뽕', '탕수육'] 이면 b는?",
            options: ["'짬뽕'", "'짜장'", "'탕수육'"],
            answer: 0,
            explain: '배열은 키가 없어 순서로 꺼낸다. 0번째가 a(짜장), 1번째가 b(짬뽕)다.',
          },
          {
            q: 'next를 만든 뒤 원본 user.age는 무엇인가?',
            code: `const user = { name: '민지', age: 20 }
const next = { ...user, age: 21 }`,
            options: ['20 — 원본은 그대로다', '21 — 원본도 바뀐다', 'undefined'],
            answer: 0,
            explain: '스프레드는 원본을 펼쳐 담은 새 객체를 만들 뿐이다. user.age는 그대로 20이고, next.age만 21이다(불변성).',
          },
          {
            q: '그럼 next.age는 무엇인가?',
            code: `const user = { name: '민지', age: 20, city: '서울' }
const next = { ...user, age: 21 }`,
            options: ['21 — 뒤에 쓴 키가 이긴다', '20 — 원본 값이 이긴다', '에러 — age가 두 번이다'],
            answer: 0,
            explain: '같은 키가 겹치면 뒤에 쓴 것이 이긴다. ...user의 age: 20을 뒤의 age: 21이 덮어써서 next.age는 21이다.',
          },
          {
            q: 'React state에서 배열에 항목을 더할 때 맞는 것은? (원본을 바꾸면 안 된다)',
            options: ['setList([...list, item])', 'list.push(item)', 'list[list.length] = item'],
            codeOptions: true,
            answer: 0,
            explain: 'push·인덱스 대입은 원본을 바꾼다(불변성 위반). [...list, item]으로 새 배열을 만들어 set 해야 React가 변화를 알아챈다.',
          },
        ]}
      />
    </section>
  )
}
