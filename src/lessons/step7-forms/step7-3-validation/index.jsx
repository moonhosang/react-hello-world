// 7-3 · 폼 유효성 검사 (validation)
//
// 폼은 값을 받는 것으로 끝나지 않는다. 이메일 형식이 맞는지, 나이가 범위 안인지,
// 등급을 골랐는지 등 "규칙"을 검사해 통과하기 전엔 제출을 막아야 한다.
//
// 이 강의의 핵심 생각은 "에러는 상태가 아니라 계산 결과"라는 점이다.
//   - 진짜 상태(state)는 입력값 form 하나뿐이다.
//   - errors는 useState로 저장하지 않는다. 매 렌더마다 form을 validate()로 검사해 '파생'한다.
//     (form과 errors를 각각 state로 두면 둘이 어긋난다 — 진실은 form 한 곳에만 둔다.)
//
// 여기서 배우는 패턴(파생 errors · touched/submitted 노출 · select/number 검사)은
// 실전 Lv3 회원가입 앱(app-signup)에서 그대로 쓰인다. 이 강의는 그 앱의 사전 학습이다.

import { useState } from 'react'
import Practice from '../../../components/Practice.jsx'
import PracticeValidation from './practice.jsx'
import SolutionValidation from './solution.jsx'
import SourceTrace from '../../../components/SourceTrace.jsx'

// 파생 상태 — errors는 저장하지 않고 매 렌더 validate(form)로 계산한다.
const VALID_CODE = `const [form, setForm] = useState({ email: '', age: '', grade: '' })

const errors = validate(form)   // ★ state 아님 — 매 렌더 계산

function shownError(field) {     // 언제 보여줄지 따로 결정
  return touched[field] || submitted ? errors[field] : undefined
}`

const VALID_STEPS = [
  {
    hl: [1],
    tag: '① 진짜 상태는 form',
    t: '입력값만 useState로 둔다',
    d: (<>진짜 상태는 입력값 <code>form</code>(+ touched·submitted). <b>errors는 저장하지 않는다.</b></>),
  },
  {
    hl: [3],
    tag: '② 매 렌더 계산',
    t: 'errors = validate(form)',
    d: (<>렌더될 때마다 <code>validate(form)</code>으로 <b>errors를 새로 계산</b>한다. <code>form</code>이 바뀌면 errors도 자동으로 최신 — <b>어긋날 수가 없다.</b> (form과 errors를 각각 state로 두면 둘이 어긋난다.)</>),
  },
  {
    tag: '③ 타이핑',
    t: 'form 변경 → 리렌더 → 다시 계산',
    d: (<>이메일 칸에 타이핑하면 <code>setForm</code> → 리렌더 → 그 렌더에서 <code>validate</code>가 다시 돌아 <code>errors.email</code>이 갱신된다. 따로 <code>setErrors</code> 할 필요가 없다.</>),
    note: "email 'a' → errors.email = '이메일 형식이 아니다'",
  },
  {
    hl: [5, 6, 7],
    tag: '④ 노출 시점',
    t: 'touched/submitted일 때만 보여준다',
    d: (<>errors는 처음부터 다 계산되지만, <code>shownError</code>가 <b>그 칸을 건드렸거나(touched) 제출했을 때만</b> 보여준다. 안 건드린 칸에 빨간 에러를 미리 뿌리지 않는다.</>),
  },
  {
    tag: '⑤ 제출',
    t: '에러가 비어야 통과',
    d: (<>제출 시 <code>submitted=true</code>로 모든 칸 에러를 드러내고, <code>errors</code>가 <b>빈 객체</b>면 통과, 하나라도 있으면 막는다. 파생이라 "지금 form" 기준으로 항상 정확하다.</>),
  },
]

// 등급 셀렉트 후보 — 맨 앞 ''는 '아직 안 고름'을 뜻하는 기본값이다(고르면 에러가 사라진다).
const GRADE_OPTIONS = [
  { value: '', label: '— 등급을 선택하라 —' },
  { value: 'bronze', label: '브론즈' },
  { value: 'silver', label: '실버' },
  { value: 'gold', label: '골드' },
]

// 검증 규칙 — form을 받아 { 필드명: 에러문구 } 객체를 돌려주는 순수 함수다.
// 규칙을 어긴 필드만 담고, 문제가 없으면 그 필드는 넣지 않는다(통과하면 빈 객체).
function validate(form) {
  const errors = {}

  // 이메일 — @ 와 . 을 모두 포함해야 형식으로 본다(간단 검사).
  if (!form.email.includes('@') || !form.email.includes('.')) {
    errors.email = '이메일 형식이 아니다 (@ 와 . 를 포함해야 한다)'
  }

  // 나이 — input의 값은 항상 문자열이라 Number()로 바꿔 숫자로 검사한다.
  // 빈 칸이거나(숫자가 아니거나) 1~120 범위를 벗어나면 에러다.
  const age = Number(form.age)
  if (form.age === '' || Number.isNaN(age) || age < 1 || age > 120) {
    errors.age = '나이는 1~120 사이 숫자여야 한다'
  }

  // 등급 — select의 기본값 ''는 '미선택'이다. 그대로면 에러다.
  if (form.grade === '') {
    errors.grade = '등급을 선택하라'
  }

  return errors
}

export default function Step6_3() {
  // 진짜 상태 ① — 입력값 3개를 객체 하나로 묶는다(공통 onChange를 쓰기 위함).
  const [form, setForm] = useState({ email: '', age: '', grade: '' })
  // 진짜 상태 ② — 각 필드를 건드렸는지. 건드리기 전엔 에러를 숨겨 빈 화면 도배를 막는다.
  const [touched, setTouched] = useState({})
  // 진짜 상태 ③ — 제출을 시도했는지. 제출 순간 모든 필드 에러를 한꺼번에 드러낸다.
  const [submitted, setSubmitted] = useState(false)
  // 진짜 상태 ④ — 제출에 성공했는지. true면 성공 표시를 보여준다.
  const [done, setDone] = useState(false)

  // 🔑 파생 상태 — errors는 저장하지 않고 지금 form에서 계산한다. 렌더마다 최신이다.
  const errors = validate(form)

  // 공통 onChange — 텍스트/숫자/셀렉트가 함께 쓴다. name으로 어떤 필드인지 골라 그 값만 바꾼다.
  // 값을 바꾸는 순간 그 필드를 touched로 표시해, 그 필드 에러부터 실시간으로 보이게 한다.
  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setTouched((prev) => ({ ...prev, [name]: true }))
    setDone(false)
  }

  // 어떤 필드의 에러를 지금 보여줄지 정한다.
  // 그 필드를 건드렸거나(touched) 제출을 시도한(submitted) 뒤에만 노출한다.
  function shownError(field) {
    return touched[field] || submitted ? errors[field] : undefined
  }

  // 제출 — 새로고침을 막고, 에러가 하나라도 있으면 성공 처리를 막는다.
  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true) // 이 순간부터 모든 필드 에러를 보여준다
    if (Object.keys(errors).length > 0) return // 통과 못 하면 여기서 중단
    setDone(true) // 규칙을 모두 통과 → 성공 표시
  }

  return (
    <section>
      <header className="lesson-header">
        <span className="badge form-badge">7-3</span>
        <h2>폼 유효성 검사</h2>
        <p>입력값을 규칙으로 검사해 에러를 계산하고, 통과하기 전엔 제출을 막는다.</p>
      </header>

      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 학습 포인트</span>
        <p>
          에러는 state로 저장하지 않고 입력값에서 그때그때 계산(파생)한다. 그리고 규칙을
          통과하기 전엔 제출을 막는다.
        </p>
      </div>

      <div className="concept">
        <p className="concept-lead">
          <b>파생 상태는 errors 하나뿐</b>이다 — 매 렌더마다 <code>validate(form)</code>으로 <b>계산</b>한다.
          (<code>form·touched·submitted·done</code>은 각각 진짜 state지만, <b>errors만은 저장하지 않는다.</b>)
          form과 errors를 따로 state로 두면 둘이 어긋난다.
        </p>
      </div>

      {/* ① validate 함수 + 파생 errors */}
      <h3 className="section-title">① validate 함수 + 파생 errors</h3>
      <span className="learn-tag">📎 학습 포인트 · errors는 useState가 아니라 const errors = validate(form)로 매 렌더 계산한다</span>
      <p className="section-desc">
        <code>validate</code>는 <b>순수 함수</b>다. form을 받아 규칙을 어긴 필드만
        <code> {`{ 필드: 문구 }`}</code>로 돌려준다. 통과하면 빈 객체다.
      </p>
      <div className="card">
        <div className="file-label">📄 step7-3-validation/index.jsx · 파생 errors</div>
        <pre className="concept-flow">{`function validate(form) {
  const errors = {}
  if (!form.email.includes('@') || !form.email.includes('.'))
    errors.email = '이메일 형식이 아니다 (@ 와 . 를 포함해야 한다)'
  // ...규칙을 어긴 필드만 담는다
  return errors            // 통과하면 {}
}

const errors = validate(form)   // ★ state 아님 — 매 렌더 계산`}</pre>
      </div>

      {/* ② 노출 시점 — touched / submitted */}
      <h3 className="section-title">② 노출 시점 — touched / submitted</h3>
      <span className="learn-tag">📎 학습 포인트 · 아직 안 건드린 필드에 빨간 에러를 미리 뿌리지 않는다</span>
      <p className="section-desc">
        errors는 처음부터 다 계산되지만, <b>보여줄지</b>는 별개다. 그 필드를 건드렸거나
        (<code>touched</code>) 제출을 시도한(<code>submitted</code>) 뒤에만 그 필드 에러를 보여준다.
      </p>
      <div className="card">
        <div className="file-label">📄 step7-3-validation/index.jsx · 노출 제어</div>
        <pre className="concept-flow">{`function shownError(field) {
  // 건드렸거나 제출했을 때만 그 필드 에러를 노출
  return touched[field] || submitted ? errors[field] : undefined
}`}</pre>
      </div>

      {/* 🔬 파생 에러가 도는 순서 */}
      <span className="learn-tag">📎 학습 포인트 · errors는 저장하지 않고 매 렌더 validate(form)로 계산 → 항상 form과 일치</span>
      <SourceTrace file="유효성 — 파생 errors 흐름" code={VALID_CODE} steps={VALID_STEPS} />

      {/* ③ 다양한 입력 — select · number */}
      <h3 className="section-title">③ 다양한 입력 — select · number</h3>
      <span className="learn-tag">📎 학습 포인트 · select는 기본 '' 이면 미선택 에러, number는 Number()로 바꿔 범위 검사</span>
      <p className="section-desc">
        <code>&lt;select&gt;</code>도 controlled다. 기본값 <code>''</code>는 '아직 안 고름'을 뜻해
        그대로면 에러다. <code>type="number"</code>의 값도 <b>문자열</b>이라
        <code> Number()</code>로 바꿔 범위(예: 나이 1~120)를 검사한다.
      </p>
      <div className="card">
        <div className="file-label">📄 step7-3-validation/index.jsx · select · number</div>
        <pre className="concept-flow">{`const age = Number(form.age)               // '25' → 25 (input 값은 문자열)
if (form.age === '' || Number.isNaN(age) || age < 1 || age > 120)
  errors.age = '나이는 1~120 사이 숫자여야 한다'

if (form.grade === '') errors.grade = '등급을 선택하라'  // 미선택`}</pre>
      </div>

      {/* 라이브 데모 */}
      <h3 className="section-title">🔴 라이브 데모</h3>
      <p className="section-desc">
        건드린 필드부터 에러가 뜨고, 규칙을 다 통과해야 제출이 성공한다. 값을 이상하게 넣어 보자.
      </p>
      <div className="card">
        <div className="file-label">📄 라이브 데모 · 이메일 · 나이 · 등급</div>
        <form onSubmit={handleSubmit}>
          {/* 이메일 — controlled input. 에러가 있으면 테두리를 빨갛게 물들인다. */}
          <div className="form-row">
            <label>이메일</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              style={{ borderColor: shownError('email') ? 'var(--red)' : undefined }}
            />
          </div>
          {shownError('email') && <p className="warn">⚠ {errors.email}</p>}

          {/* 나이 — type="number"여도 값은 문자열이다. validate에서 Number()로 검사한다. */}
          <div className="form-row">
            <label>나이</label>
            <input
              name="age"
              type="number"
              value={form.age}
              onChange={handleChange}
              placeholder="1 ~ 120"
              style={{ borderColor: shownError('age') ? 'var(--red)' : undefined }}
            />
          </div>
          {shownError('age') && <p className="warn">⚠ {errors.age}</p>}

          {/* 등급 — controlled select. 기본값 ''(미선택)이면 에러다. */}
          <div className="form-row">
            <label>등급</label>
            <select
              name="grade"
              value={form.grade}
              onChange={handleChange}
              style={{ borderColor: shownError('grade') ? 'var(--red)' : undefined }}
            >
              {GRADE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          {shownError('grade') && <p className="warn">⚠ {errors.grade}</p>}

          <div className="button-row" style={{ marginTop: 12, justifyContent: 'flex-start' }}>
            <button type="submit">제출</button>
          </div>
        </form>

        {/* 성공 표시 — 에러 없이 제출을 통과했을 때만 그린다(조건부 렌더링). */}
        {done && (
          <p className="demo-desc" style={{ marginTop: 10, color: 'var(--brand)', fontWeight: 600 }}>
            ✅ 통과! · {form.email} · {form.age}세 · {form.grade}
          </p>
        )}
      </div>

      {/* 실습 */}
      <Practice
        task="validate 함수에서 '나이(1~120) 범위' 규칙을 채워, 나이가 범위를 벗어나면 에러가 뜨고 제출이 막히게 만들자."
        goal="입력값에서 파생된 에러를 계산해, 규칙 위반 시 제출을 막는 유효성 검사 패턴을 익힌다."
        hints={[
          '무엇·왜: errors는 규칙을 어긴 필드만 담는 객체다. 나이 규칙이 비어 있어 아무 나이나 통과된다.',
          '어디: practice.jsx의 validate 함수 안, 「TODO」라고 적힌 나이 검사 자리.',
          "어떻게: const age = Number(form.age) 로 숫자로 바꾼 뒤, form.age === '' || age < 1 || age > 120 이면 errors.age = '나이는 1~120 사이여야 한다' 를 넣는다.",
          '확인: 나이에 0이나 999를 넣고 제출하면 에러가 뜨고 성공 표시가 안 나오면 성공이다.',
        ]}
        practiceFile="step7-forms/step7-3-validation/practice.jsx"
        solutionFile="step7-forms/step7-3-validation/solution.jsx"
        solution={<SolutionValidation />}
      >
        <PracticeValidation />
      </Practice>

      <div className="try-it">
        <h4>💡 정리</h4>
        <ul>
          <li>에러는 <b>state가 아니라 계산 결과</b>다 — <code>const errors = validate(form)</code>.</li>
          <li>에러를 <b>언제 보여줄지</b>는 <code>touched</code>·<code>submitted</code>로 따로 정한다.</li>
          <li><code>select</code>는 기본 <code>''</code>로 미선택을, <code>number</code>는 <code>Number()</code>로 범위를 검사한다.</li>
          <li>이 패턴이 실전 <b>Lv3 회원가입 앱</b>(app-signup)에서 그대로 쓰인다. 이 강의가 그 사전 학습이다.</li>
        </ul>
      </div>
    </section>
  )
}
