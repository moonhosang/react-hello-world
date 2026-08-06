// 7-4 · 입력 타입별 처리 (checkbox · radio · textarea · 배열)
// text/select는 value로 다뤘다. 그런데 checkbox는 value가 아니라 checked를 쓴다 — 입문자 필수 함정.
// radio 그룹, 여러 체크박스를 배열로 모으기, 그리고 공통 onChange로 타입을 갈라 처리하는 법까지.

import { useState } from 'react'
import QuickQuiz from '../../../components/QuickQuiz.jsx'
import SourceTrace from '../../../components/SourceTrace.jsx'
import TechTags from '../../../components/TechTags.jsx'

// ① checkbox — value가 아니라 checked
function CheckboxDemo() {
  const [agree, setAgree] = useState(false)
  return (
    <div className="demo-card">
      <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
        약관에 동의합니다
      </label>
      <p className="demo-desc" style={{ marginTop: 8 }}>
        지금 값: <b>{agree ? '동의함 (true)' : '동의 안 함 (false)'}</b> · 제출 <b>{agree ? '가능' : '불가'}</b>
      </p>
    </div>
  )
}

// ② radio — 그룹에서 하나만
function RadioDemo() {
  const [plan, setPlan] = useState('free')
  const OPTS = [{ v: 'free', l: '무료' }, { v: 'pro', l: '프로' }, { v: 'team', l: '팀' }]
  return (
    <div className="demo-card">
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {OPTS.map((o) => (
          <label key={o.v} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <input type="radio" name="plan" value={o.v} checked={plan === o.v} onChange={(e) => setPlan(e.target.value)} />
            {o.l}
          </label>
        ))}
      </div>
      <p className="demo-desc" style={{ marginTop: 8 }}>고른 요금제: <b>{plan}</b></p>
    </div>
  )
}

// ③ 여러 체크박스 → 배열로 모으기
function HobbiesDemo() {
  const [hobbies, setHobbies] = useState([])
  const ALL = ['독서', '게임', '운동', '요리']
  // 이미 있으면 빼고(filter), 없으면 더한다([...arr, x]) — 불변성
  const toggle = (h) =>
    setHobbies((prev) => (prev.includes(h) ? prev.filter((x) => x !== h) : [...prev, h]))
  return (
    <div className="demo-card">
      <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
        {ALL.map((h) => (
          <label key={h} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <input type="checkbox" checked={hobbies.includes(h)} onChange={() => toggle(h)} />
            {h}
          </label>
        ))}
      </div>
      <p className="demo-desc" style={{ marginTop: 8 }}>고른 취미(배열): <b>[{hobbies.join(', ')}]</b> · {hobbies.length}개</p>
    </div>
  )
}

// ⑤ 공통 onChange — 타입으로 갈라 처리
const MIX_CODE = `function handleChange(e) {
  const { name, type, value, checked } = e.target
  setForm((prev) => ({
    ...prev,
    [name]: type === 'checkbox' ? checked : value,   // 체크박스면 checked, 아니면 value
  }))
}

<input name="email" value={form.email} onChange={handleChange} />
<input name="agree" type="checkbox" checked={form.agree} onChange={handleChange} />`

const MIX_STEPS = [
  {
    hl: [9, 2],
    tag: '① text 입력',
    t: "email 칸에 'a' → e.target을 뜯어본다",
    d: (<>텍스트 칸에 치면 <code>e.target</code>에서 <code>name='email'</code>, <code>type='text'</code>, <code>value='a'</code>가 나온다(<code>checked</code>는 undefined).</>),
    note: "type='text' · value='a'",
  },
  {
    hl: [5],
    tag: '② 값 선택',
    t: 'checkbox가 아니라 → value 사용',
    d: (<><code>type</code>이 <code>'checkbox'</code>가 아니니 <code>value</code>('a')를 쓴다. <code>form.email</code>이 'a'가 된다.</>),
    note: "form.email = 'a'",
  },
  {
    hl: [10, 2],
    tag: '③ checkbox 클릭',
    t: '동의 체크 → e.target을 뜯어본다',
    d: (<>체크박스를 누르면 <code>type='checkbox'</code>, <code>checked=true</code>가 나온다. (<code>value</code>는 <code>'on'</code>이라 <b>쓸모없다</b> — 함정!)</>),
    note: "type='checkbox' · checked=true",
  },
  {
    hl: [5],
    tag: '④ 체크는 checked',
    t: 'checkbox면 → checked 사용',
    d: (<><code>type === 'checkbox'</code>가 참이라 <b><code>checked</code>(true)</b>를 쓴다. <code>form.agree</code>가 true가 된다. <b>여기가 핵심</b> — 체크박스는 <code>value</code>가 아니라 <code>checked</code>다.</>),
    note: 'form.agree = true',
  },
  {
    tag: '⑤ 한 handler로',
    t: '텍스트·체크박스·select를 하나로',
    d: (<>공통 <code>handleChange</code> 하나가 <b>타입만 갈라</b>(<code>checked</code>냐 <code>value</code>냐) 전부 처리한다. 입력이 늘어도 핸들러는 하나면 된다(7-1의 확장).</>),
  },
]

export default function Step6_4({ onGo }) {
  return (
    <section>
      <header className="lesson-header">
        <span className="badge form-badge">7-4</span>
        <h2>입력 타입별 처리 — checkbox · radio · 배열</h2>
        <p>text·select는 value로 다뤘다. checkbox는 <b>value가 아니라 checked</b>를 쓴다 — 타입마다 다루는 법이 다르다.</p>
      </header>

      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 학습 포인트</span>
        <p>
          <b>checkbox는 <code>checked</code></b>, radio는 그룹에서 하나, 여러 체크박스는 <b>배열</b>로 모은다.
          공통 onChange로 <b>타입만 갈라</b> 다 처리한다.
        </p>
      </div>

      <div className="concept">
        <p className="concept-lead">
          지금까지 입력은 <code>value + onChange</code>로 다뤘다(→ <b>4단계·7-1</b>). 그런데 <b>checkbox·radio</b>는 조금 다르다 —
          "켜짐/꺼짐"이라 <b>value가 아니라 <code>checked</code></b>(true/false)를 읽는다. 입문자가 가장 많이 막히는 지점이다.
        </p>
      </div>

      {/* ① checkbox */}
      <h3 className="section-title">① checkbox — <code>value</code>가 아니라 <code>checked</code></h3>
      <span className="learn-tag">📎 학습 포인트 · 체크박스는 e.target.checked(true/false)를 읽고, checked={'{state}'}로 화면과 묶는다</span>
      <div className="card">
        <div className="file-label">📄 약관 동의 — checked로 다룬다</div>
        <pre className="err-code">{`const [agree, setAgree] = useState(false)

<input
  type="checkbox"
  checked={agree}                          // ✅ value 아님! checked로 묶는다
  onChange={(e) => setAgree(e.target.checked)}   // ✅ e.target.checked (true/false)
/>`}</pre>
        <CheckboxDemo />
        <p className="demo-desc" style={{ marginTop: 8 }}>
          ❌ 흔한 실수: <code>value={'{agree}'}</code>·<code>e.target.value</code>를 쓰면 안 된다 — 체크박스의 <code>value</code>는
          체크 여부와 무관한 <code>'on'</code> 같은 값이라 <b>켜졌는지 알 수 없다</b>.
        </p>
      </div>

      {/* ② radio */}
      <h3 className="section-title">② radio — 그룹에서 하나만</h3>
      <span className="learn-tag">📎 학습 포인트 · 같은 name으로 묶고, checked={'{state === 그 값}'}으로 선택을 표시한다</span>
      <div className="card">
        <div className="file-label">📄 요금제 선택 — 같은 name, value로 구분</div>
        <pre className="err-code">{`const [plan, setPlan] = useState('free')

<input type="radio" name="plan" value="free"
  checked={plan === 'free'} onChange={(e) => setPlan(e.target.value)} />
<input type="radio" name="plan" value="pro"
  checked={plan === 'pro'}  onChange={(e) => setPlan(e.target.value)} />
// 같은 name="plan"이라 '한 묶음' → 하나만 켜진다`}</pre>
        <RadioDemo />
        <p className="demo-desc" style={{ marginTop: 8 }}>
          radio는 <b>같은 <code>name</code></b>으로 묶여 <b>하나만</b> 선택된다. 값은 <code>value</code>로 읽고(체크박스와 다름),
          어느 게 켜졌는지는 <code>checked={'{plan === 그 값}'}</code>으로 표시한다.
        </p>
      </div>

      {/* ③ 여러 체크박스 → 배열 */}
      <h3 className="section-title">③ 여러 체크박스 → 배열로 모으기</h3>
      <span className="learn-tag">📎 학습 포인트 · 고른 것들을 배열 state로 · 있으면 filter로 빼고, 없으면 [...arr, x]로 더한다(불변성)</span>
      <div className="card">
        <div className="file-label">📄 취미 선택 — 배열 state로 여러 개</div>
        <pre className="err-code">{`const [hobbies, setHobbies] = useState([])

const toggle = (h) =>
  setHobbies((prev) =>
    prev.includes(h)
      ? prev.filter((x) => x !== h)   // 이미 있으면 뺀다
      : [...prev, h]                  // 없으면 더한다
  )

<input type="checkbox" checked={hobbies.includes(h)} onChange={() => toggle(h)} />`}</pre>
        <HobbiesDemo />
        <p className="demo-desc" style={{ marginTop: 8 }}>
          여러 개를 고르는 체크박스는 <b>배열 state</b>로 모은다. <code>includes</code>로 체크 여부를 정하고,
          <code> filter</code>(빼기)·<code>[...arr, x]</code>(더하기)로 <b>새 배열</b>을 만든다 — 6단계 리스트의 불변성 그대로다.
        </p>
      </div>

      {/* ④ textarea */}
      <h3 className="section-title">④ textarea — text와 똑같다</h3>
      <span className="learn-tag">📎 학습 포인트 · textarea도 value + onChange (HTML과 달리 태그 사이가 아니라 value로)</span>
      <div className="card">
        <div className="file-label">📄 여러 줄 입력 — value로</div>
        <pre className="err-code">{`const [bio, setBio] = useState('')

<textarea value={bio} onChange={(e) => setBio(e.target.value)} />
// HTML은 <textarea>내용</textarea>지만, React는 input처럼 value로 묶는다`}</pre>
      </div>

      {/* ⑤ 공통 onChange — 타입 분기 */}
      <h3 className="section-title">⑤ 공통 onChange — 타입만 갈라 다 처리</h3>
      <span className="learn-tag">📎 학습 포인트 · type이 checkbox면 checked, 아니면 value — 이 한 줄로 한 핸들러가 모든 타입을 처리한다</span>
      <p className="section-desc">
        7-1에서 <b>객체 하나 + 공통 onChange</b>를 배웠다. 여기에 <b>타입 분기</b> 한 줄만 더하면, 텍스트·체크박스·select를
        <b> 핸들러 하나</b>로 다 받는다. <b>다음 ▶</b>으로 흐름을 짚어 보라.
      </p>
      <SourceTrace file="공통 onChange — 타입 분기" code={MIX_CODE} steps={MIX_STEPS} />

      <div className="try-it">
        <h4>💡 알아두기</h4>
        <ul>
          <li><b>checkbox</b> = <code>checked</code>(true/false), <b>그 외</b>(text·select·textarea·radio 값) = <code>value</code>.</li>
          <li><b>radio</b>는 같은 <code>name</code>으로 묶어 하나만 선택, <b>여러 체크박스</b>는 <b>배열</b>로 모은다.</li>
          <li>공통 핸들러는 <code>type === 'checkbox' ? checked : value</code> 한 줄로 타입을 가른다.</li>
        </ul>
      </div>

      <TechTags
        items={[
          { label: '7-1 · 여러 입력 → 객체', to: 6.1 },
          { label: '4단계 · controlled 입력', to: 4 },
          { label: '6단계 · 배열 불변성', to: 5 },
        ]}
        onGo={onGo}
      />

      <h3 className="section-title">🧩 확인 드릴 — 입력 타입 손에 익히기</h3>
      <span className="learn-tag">📎 학습 포인트 · checkbox=checked · radio=name 묶음 · 여러 체크박스=배열 — 네 번 확인한다</span>
      <QuickQuiz
        intro="입력 타입마다 다루는 법(checked vs value, 배열)을 상황만 바꿔 확인한다. 하나 골라 보라."
        questions={[
          {
            q: '체크박스가 켜졌는지 값을 읽으려면 무엇을 쓰나?',
            code: `<input type="checkbox" onChange={(e) => ...} />`,
            options: ['e.target.checked', 'e.target.value', 'e.target.selected'],
            answer: 0,
            explain: '체크박스는 켜짐/꺼짐이라 e.target.checked(true/false)를 읽는다. value는 체크 여부와 무관한 값(보통 "on")이라 쓸모없다.',
          },
          {
            q: '체크박스를 화면 state와 묶을 때 input에 무엇을 주나?',
            options: ['checked={agree}', 'value={agree}', 'selected={agree}'],
            codeOptions: true,
            answer: 0,
            explain: 'controlled 체크박스는 checked={state}로 묶는다. text input의 value={state}에 대응하는 자리다.',
          },
          {
            q: '라디오 버튼 3개를 한 묶음(하나만 선택)으로 만들려면?',
            options: ['셋 다 같은 name을 준다', '셋 다 다른 name을 준다', 'name을 안 준다'],
            answer: 0,
            explain: '같은 name으로 묶인 라디오는 한 그룹이 되어 하나만 선택된다. name이 다르면 각자 따로 켜진다.',
          },
          {
            q: '여러 체크박스로 고른 취미들을 배열 state에 넣을 때, 이미 있는 항목을 다시 누르면?',
            code: `setHobbies(prev =>
  prev.includes(h) ? ??? : [...prev, h])`,
            options: ['prev.filter(x => x !== h) 로 뺀다', 'prev.push(h) 로 또 넣는다', 'prev 그대로 둔다'],
            codeOptions: true,
            answer: 0,
            explain: '이미 있으면 filter로 빼서 토글한다. push는 원본을 직접 바꿔(불변성 위반) 화면이 안 바뀐다 — 새 배열을 만들어야 한다.',
          },
        ]}
      />
    </section>
  )
}
