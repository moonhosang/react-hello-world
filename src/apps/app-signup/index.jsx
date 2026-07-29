// ============================================================
// 실전 앱 · 회원가입 폼 (유효성 검사) — 파생 상태로서의 '에러'
// ============================================================
// 이번 앱의 핵심은 "에러를 저장하지 않는다"는 것이다.
//   - 진짜 상태(state)는 입력값 form 하나뿐이다. (이름·이메일·닉네임·경력·관심분야[])
//   - 각 필드의 에러는 그 form을 규칙으로 검사해 '계산'되는 값이라, 따로 state로 두지 않는다.
//   - 규칙을 통과하기 전에는 제출을 막는다(preventDefault + 에러 검사).
//   - 아직 건드리지도 않은 필드에 빨간 에러를 미리 뿌리지 않는다(touched·submitted로 노출 시점 제어).
//
// 입력 종류를 일부러 섞었다 — 텍스트(이름·이메일·닉네임) / 셀렉트(경력) / 칩 다중 선택(관심분야).
// 텍스트·셀렉트는 공통 onChange 하나로, 관심분야는 칩 토글 함수로 갱신한다.

import SignupForm from './SignupForm.jsx'
import TechTags from '../../components/TechTags.jsx'
import PracticeLevels from '../../components/PracticeLevels.jsx'
import PracticeSignupEasy from './practiceEasy.jsx'
import PracticeSignupMedium from './practiceMedium.jsx'
import PracticeSignupHard from './practiceHard.jsx'
import SolutionSignup from './solution.jsx'

export default function SignupApp({ onGo }) {
  return (
    <section>
      <header className="lesson-header">
        <span className="badge">실전 앱</span>
        <h2>회원가입 폼 (유효성 검사)</h2>
        <p>입력값 하나만 state로 두고, 각 필드의 에러는 그때그때 검사해서 계산한다.</p>
      </header>

      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 학습 포인트</span>
        <p>
          에러는 <b>state로 저장하지 않는다.</b> 입력값(<code>form</code>)을 규칙으로 검사해
          <b> 렌더할 때 계산</b>하는 파생 상태다. 규칙을 <b>모두 통과하기 전에는 제출을 막고</b>,
          아직 건드리지 않은 필드에는 에러를 미리 보여주지 않는다(<code>touched</code>·<code>submitted</code>로
          노출 시점을 제어). 같은 진실을 두 곳에 두지 않으니 form과 에러가 어긋날 일이 없다.
        </p>
      </div>

      <TechTags
        onGo={onGo}
        items={[
          { label: 'controlled input', to: 4 },
          { label: '객체 state', to: 3.2 },
          { label: '조건부 렌더링(에러)', to: 5 },
          { label: '폼 제출(preventDefault)', to: 6.2 },
          { label: '유효성 검사', to: null },
          { label: '다중 선택(칩)', to: null },
        ]}
      />

      <h3 className="section-title">완성된 앱 — 입력하는 즉시 검사하고, 통과해야 가입된다</h3>
      <span className="learn-tag">📎 학습 포인트 · 에러는 저장하지 말고 계산한다</span>
      <p className="section-desc">다섯 칸을 객체 state <code>form</code> 하나에 묶었다. 정리하면:</p>
      <ul className="section-list">
        <li><b>입력 3종</b> — 텍스트(이름·이메일·닉네임) · 셀렉트(경력) · 칩 다중 선택(관심분야).</li>
        <li><b>controlled + 공통 onChange</b> — 텍스트·셀렉트는 <code>name</code>으로 필드를 구분해 갱신하고, 관심분야는 칩 토글로 배열을 불변하게 바꾼다.</li>
        <li><b>실시간 검사</b> — 이름·이메일·경력은 필수, 관심분야는 2~4개. 매 입력마다 검사해 틀린 필드에만 에러를 보여준다.</li>
        <li><b>통과해야 가입</b> — 모든 규칙을 통과했을 때만 가입 완료 화면으로 넘어간다.</li>
        <li><b>파일 구성</b> — <code>SignupForm.jsx</code>(상태·검증) + <code>Field.jsx</code>(한 줄) + <code>ChipSelect.jsx</code>(칩 다중 선택).</li>
      </ul>
      <div className="card">
        <div className="file-label">📄 SignupForm.jsx · Field.jsx · ChipSelect.jsx</div>
        <SignupForm />
      </div>

      <PracticeLevels
        goal="유효성 검사·파생 에러가 있는 회원가입 폼을 만든다."
        solutionFile="app-signup/solution.jsx"
        solution={<SolutionSignup />}
        levels={[
          {
            label: '쉬움',
            file: 'app-signup/practiceEasy.jsx',
            task: "지금은 관심분야를 1개만 골라도 가입이 된다. '최소 2개'를 강제하는 규칙 한 줄을 추가하자.",
            hints: [
              '① 먼저 체험 — 관심분야를 1개만 고르고 [가입하기]를 눌러보라. 지금은 그냥 통과된다. 이게 우리가 막을 문제다.',
              '② 어디 — practiceEasy.jsx의 validate() 함수 안, 이름·이메일·경력 검사 바로 아래에 🟢 TODO가 있다.',
              '③ 어떻게 — 고른 개수는 form.interests.length 로 안다. 이 값이 2보다 작으면 errors.interests 에 안내 문구를 넣는다. (바로 위 세 규칙이 똑같은 모양이라 그대로 따라 하면 된다)',
              '④ 확인 — 채운 뒤 다시 1개만 골라 눌러보라. 이번엔 막히고 에러가 뜬다. errors는 저장하는 값이 아니라 form을 보고 그때그때 계산하는 값이라, 한 줄만 넣어도 화면 에러와 제출 막기가 저절로 따라온다.',
            ],
            node: <PracticeSignupEasy />,
          },
          {
            label: '중간',
            file: 'app-signup/practiceMedium.jsx',
            task: '검사기(validate)가 통째로 비어 있어 무엇을 넣든 가입된다. 네 가지 규칙을 채워 실시간 검사를 되살리자.',
            hints: [
              '어디 — practiceMedium.jsx의 validate(form) 함수 안. 지금은 빈 errors 객체만 돌려준다. 여기에 규칙을 하나씩 추가한다.',
              '규칙이란 — "값이 조건에 어긋나면, 그 필드 이름으로 errors에 안내 문구를 담는다"가 전부다. 아래 넷을 그대로 옮기면 된다.',
              '이름: 비어 있으면(form.name.trim() === "") errors.name 에 문구 / 이메일: @ 나 . 이 없으면 errors.email 에 문구.',
              '경력: 안 골랐으면(form.level === "") errors.level 에 문구 / 관심분야: 2개 미만이면(form.interests.length < 2) errors.interests 에 문구.',
              '마무리 — 문제 있는 필드만 errors에 담아 돌려준다. 다 통과면 빈 객체({}). 닉네임은 선택이라 검사하지 않는다.',
            ],
            node: <PracticeSignupMedium />,
          },
          {
            label: '어려움',
            file: 'app-signup/practiceHard.jsx',
            task: '폼이 껍데기만 있다 — 입력해도 반응이 없고 가입도 안 된다. 네 부분을 이어 붙여 살아 있는 폼으로 만들자.',
            hints: [
              '지금 상태 — 입력해도 글자가 안 써지고(입력 반영 X), 칩도 안 눌리고, 가입도 안 된다. 아래 네 곳(🔴 TODO)을 채우면 살아난다.',
              '① 입력 반영(handleChange): 어떤 칸을 고쳤는지는 e.target.name 으로 안다 → setForm으로 그 칸(name)만 새 값으로 바꾼다: {...prev, [name]: value}.',
              '② 칩 토글: 이미 고른 값이면 빼고(filter), 아니면 더한다([...prev, value]). 항상 새 배열로 set 한다.',
              '③ 검사(validate): 네 규칙(이름·이메일·경력·관심분야)을 확인해 문제 있는 필드만 { 필드명: 문구 }로 돌려준다. 에러는 저장하지 말고 렌더할 때 validate(form)로 계산한다.',
              '④ 제출(handleSubmit): e.preventDefault()로 새로고침을 막고 → 제출했다고 표시(setSubmitted) → 에러가 있으면 멈추고(return), 없으면 성공 처리(setDone).',
            ],
            node: <PracticeSignupHard />,
          },
        ]}
      />

      <div className="try-it">
        <h4>💡 배운 개념이 어디에 쓰였나</h4>
        <ul>
          <li>
            <b>파생 상태로서의 에러</b> — 진짜 state는 입력값 <code>form</code> 하나뿐이다.
            에러는 <code>validate(form)</code>으로 <b>매 렌더 계산</b>하니, 입력과 에러가 어긋나지 않는다.
          </li>
          <li>
            <b>controlled input + 객체 state</b> — 텍스트·셀렉트를 <code>form</code> 객체 하나에 묶고,
            공통 <code>onChange</code>가 <code>e.target.name</code>으로 필드를 구분해
            <code>{'{ ...prev, [name]: value }'}</code>로 그 값만 바꾼다.
          </li>
          <li>
            <b>배열 state 불변 갱신(칩 다중 선택)</b> — 관심분야는 <code>interests</code> 배열에서
            이미 있으면 <code>filter</code>로 빼고, 없으면 <code>[...prev, value]</code>로 더한다. 원본을 건드리지 않고 새 배열로 set 한다.
          </li>
          <li>
            <b>노출 시점 제어</b> — <code>touched</code>(그 필드를 건드림)·<code>submitted</code>(제출 시도)가
            true일 때만 에러를 보여준다. 빈 화면부터 빨간 에러가 도배되는 것을 막는다.
          </li>
          <li>
            <b>제출 막기</b> — <code>onSubmit</code>에서 <code>e.preventDefault()</code>로 새로고침을 막고,
            <code>errors</code>가 하나라도 있으면 <code>return</code>해 가입을 통과시키지 않는다.
          </li>
          <li>
            <b>props로 부모↔자식 소통</b> — <code>Field</code>·<code>ChipSelect</code>는 상태를 갖지 않고
            <code>value</code>/<code>selected</code>·<code>onChange</code>/<code>onToggle</code>·<code>error</code>를 받아 '표시'만 한다. 상태는 부모가 쥔다.
          </li>
        </ul>
      </div>
    </section>
  )
}
