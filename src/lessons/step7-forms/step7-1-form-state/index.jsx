// 7-1 · 여러 입력 → 객체 하나로 관리
// 입력이 여러 개면 각각 state로 둘 수 있다. 관련 있는 값이면 객체 하나 + 공통 onChange가 편하다.

import { useState } from 'react'
import QuickQuiz from '../../../components/QuickQuiz.jsx'
import SourceTrace from '../../../components/SourceTrace.jsx'

// 객체 하나 + 공통 onChange — name으로 칸을 구분하고, 바뀐 칸만 새 객체로 덮는다.
const FORM_CODE = `const [form, setForm] = useState({ id: '', pw: '' })

function handleChange(e) {
  setForm({ ...form, [e.target.name]: e.target.value })
}

<input name="id" value={form.id} onChange={handleChange} />
<input name="pw" value={form.pw} onChange={handleChange} />`

const FORM_STEPS = [
  {
    hl: [1],
    tag: '① 객체 하나',
    t: '두 칸을 객체 하나에 모은다',
    d: (<>입력마다 state를 두는 대신, 관련 값을 <b>객체 하나</b> <code>form</code>에 모은다.</>),
    note: "form = { id: '', pw: '' }",
  },
  {
    hl: [7, 3],
    tag: '② id칸 타이핑',
    t: "'kim' 입력 → handleChange 실행",
    d: (<>id 칸에 타이핑하면 공통 <code>handleChange</code>가 돈다. <code>e.target.name</code>은 <b>'id'</b>(어느 칸인지), <code>e.target.value</code>는 <b>'kim'</b>(무엇으로).</>),
  },
  {
    hl: [4],
    tag: '③ 바뀐 칸만',
    t: '{...form, [name]: value}로 한 칸만 덮는다',
    d: (<><code>...form</code>으로 기존 두 칸을 복사하고, <code>[e.target.name]</code>이 <b>'id'</b>라 id만 'kim'으로 덮는다. <code>[대괄호]</code>는 <b>계산된 key</b> — 변수 값을 key로 쓴다.</>),
    note: "form = { id: 'kim', pw: '' }",
  },
  {
    hl: [4],
    tag: '④ 왜 ...form?',
    t: '빼면 다른 칸이 사라진다',
    d: (<><code>...form</code>을 빼고 <code>{'{ [name]: value }'}</code>만 쓰면 새 객체엔 id만 남아 <b>pw 칸이 사라진다.</b> 그래서 항상 기존을 편 뒤 한 칸만 덮는다.</>),
  },
  {
    hl: [7, 8],
    tag: '⑤ 한 개면 충분',
    t: '입력 100개여도 handleChange는 하나',
    d: (<>두 input이 <b>같은</b> <code>handleChange</code>를 쓴다. <code>name</code>으로 칸을 구분하니, 입력이 아무리 많아도 핸들러는 하나면 된다.</>),
  },
]

export default function Step6_1() {
  // 방법 A: 입력마다 state
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  // 방법 B: 객체 하나 + 공통 onChange
  const [form, setForm] = useState({ id: '', pw: '' })
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value }) // 바뀐 칸만 새 객체로
  }

  return (
    <section>
      <header className="lesson-header">
        <span className="badge form-badge">7-1</span>
        <h2>여러 입력 → 객체로 관리</h2>
        <p>입력이 여러 개인 폼. 각각 state로 두거나, 관련 값이면 객체 하나로 묶는다.</p>
      </header>

      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 학습 포인트</span>
        <p>관련 있는 입력 여러 개는 객체 상태 하나 + 공통 onChange로 묶어 관리한다.</p>
      </div>

      <div className="concept">
        <p className="concept-lead">
          입력 하나 = <b>state 하나 + onChange 하나</b>. 입력이 많아지면 번거롭다 → 관련 값은
          <b> 객체 하나</b>로 묶고 <b>공통 onChange</b>로 처리한다.
        </p>
      </div>

      <h3 className="section-title">방법 A — 입력마다 state</h3>
      <span className="learn-tag">📎 학습 포인트 · 입력 하나에 state 하나 + onChange 하나가 기본이다</span>
      <p className="section-desc">각 입력을 각자의 state에 묶는다. 입력이 늘면 state·onChange도 는다.</p>
      <div className="card">
        <div className="file-label">📄 방법 A · useState 두 개</div>
        <div className="form-row">
          <label>이름</label>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="이름" />
        </div>
        <div className="form-row">
          <label>이메일</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
        </div>
        <p className="demo-desc">이름: <b>{name || '(없음)'}</b> · 이메일: <b>{email || '(없음)'}</b></p>
      </div>

      <h3 className="section-title">방법 B — 객체 하나 + 공통 onChange</h3>
      <span className="learn-tag">📎 학습 포인트 · input의 name을 key로 써서 onChange 하나로 모든 칸을 처리한다</span>
      <p className="section-desc">
        폼 값을 <b>객체 하나</b>(<code>form</code>)에 모으고, input의 <code>name</code>을 key로 써서 onChange 하나로 처리한다.
      </p>
      <div className="card">
        <div className="file-label">📄 step7-1-form-state/index.jsx · 객체 상태</div>
        <div className="form-row">
          <label>아이디</label>
          <input name="id" value={form.id} onChange={handleChange} placeholder="아이디" />
        </div>
        <div className="form-row">
          <label>비번</label>
          <input name="pw" value={form.pw} onChange={handleChange} placeholder="비밀번호" />
        </div>
        <pre className="concept-flow">{JSON.stringify(form, null, 2)}</pre>
      </div>
      <p className="section-desc">
        <code>{`setForm({ ...form, [e.target.name]: e.target.value })`}</code> — 바뀐 칸만 새 객체로.
        입력이 100개여도 <code>handleChange</code>는 <b>하나</b>면 된다.
      </p>
      <span className="learn-tag">📎 학습 포인트 · name으로 어느 칸인지 알고, {'{...form, [name]: value}'}로 그 칸만 덮는다</span>
      <SourceTrace file="객체 폼 — 공통 onChange" code={FORM_CODE} steps={FORM_STEPS} />

      <h3 className="section-title">🧩 확인 드릴 — 객체 state와 공통 onChange</h3>
      <span className="learn-tag">📎 학습 포인트 · 바뀐 칸만 <code>{'{...form, [name]: value}'}</code>로 덮는다 — 다섯 번 확인한다</span>
      <QuickQuiz
        intro="객체 폼을 다루는 규칙(공통 onChange · 한 칸만 갱신)을 상황만 바꿔 다섯 번 확인한다."
        questions={[
          {
            q: '공통 onChange 하나로 여러 입력을 처리할 때, 어느 칸이 바뀌었는지 무엇으로 아나?',
            code: `<input name="id" value={form.id} onChange={handleChange} />
<input name="pw" value={form.pw} onChange={handleChange} />`,
            options: ['e.target.name (input의 name)', 'e.target.value', 'form.id'],
            answer: 0,
            explain: 'input마다 name을 다르게 주고, handleChange에서 e.target.name으로 어느 칸인지 구분한다. e.target.value는 "무엇으로 바꿀지"다.',
          },
          {
            q: 'id 칸만 바꾸고 pw는 그대로 두려면 setForm에 무엇을 넘겨야 하나? (form은 { id, pw })',
            options: ['{ ...form, [e.target.name]: e.target.value }', '{ [e.target.name]: e.target.value }', 'form[e.target.name] = e.target.value'],
            codeOptions: true,
            answer: 0,
            explain: '...form으로 기존 칸을 복사하고 [name]으로 바뀐 칸만 덮는다. {[name]:value}만 쓰면 나머지 칸이 사라지고, form[...] = ... 는 state 직접 변이라 안 된다.',
          },
          {
            q: 'setForm({ [e.target.name]: e.target.value }) 처럼 ...form 없이 하면 어떻게 되나? (form은 { id, pw })',
            options: ['방금 안 바꾼 칸(pw)이 사라진다', '두 칸 다 잘 유지된다', '에러가 난다'],
            answer: 0,
            explain: '새 객체에 바뀐 칸만 담아서, ...form으로 복사 안 한 나머지 칸은 없어진다. 그래서 항상 ...form을 먼저 편다.',
          },
          {
            q: '관련 입력이 여러 개일 때, 객체 하나 + 공통 onChange의 장점은?',
            options: ['입력이 늘어도 onChange가 하나면 된다', 'state를 아예 안 써도 된다', '입력마다 onChange를 새로 만들어야 한다'],
            answer: 0,
            explain: 'input의 name으로 칸을 구분하니, 입력이 100개여도 handleChange 하나로 다 처리한다.',
          },
          {
            q: '객체 폼에서 아이디 input의 value엔 무엇을 넣나? (form은 { id, pw })',
            options: ['value={form.id}', 'value={form}', 'value={id}'],
            codeOptions: true,
            answer: 0,
            explain: '각 칸은 객체의 해당 필드(form.id·form.pw)를 value로 받는다. form 전체나 없는 변수 id를 넣으면 안 된다.',
          },
        ]}
      />
    </section>
  )
}
