// 🛠️ Lv3-1 · 회원가입 폼 '조립'
// app-signup(Lv3-2)은 검증·파생 로직까지 만드는 완성 단계다. 그 앞에 '조립만' 하는 단계를 둔다.
// 로직(state·검증·핸들러)은 useSignupForm으로 이미 주어지고, 학습자는 완성된 조각
// (Field·ChipSelect)을 배치하고 value·onChange·error props로 '연결'만 한다.
// → 앱 규모의 데이터 흐름(부모가 state 소유 → props 아래로 → onChange 위로)을 조립으로 체감한다.

import PracticeLevels from '../../components/PracticeLevels.jsx'
import SolutionAssembly from './solutionAssembly.jsx'
import PracticeEasy from './practiceEasy.jsx'
import PracticeMedium from './practiceMedium.jsx'
import PracticeHard from './practiceHard.jsx'

export default function AssembleSignup() {
  return (
    <section>
      <header className="lesson-header">
        <span className="badge">🛠️ 실전 앱 · Lv3-1</span>
        <h2>회원가입 폼 — 조립</h2>
        <p>완성된 조각(Field·ChipSelect)을 배치하고 props로 연결해 폼을 구성한다. <b>조립만</b> 한다 — 검증·로직은 <b>Lv3-2</b>에서.</p>
      </header>

      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 학습 포인트</span>
        <p>
          로직은 <code>useSignupForm</code>이 이미 준다. <b>부모가 form state를 소유</b>하고, 각 조각에
          <b> value·onChange·error</b>(관심분야는 <b>selected·onToggle</b>)를 내려 연결하는 <b>배선</b>만 하면 된다.
          이게 앱을 이루는 <b>데이터 흐름</b>이다 (→ 🔀 props vs state의 '누가 소유하나').
        </p>
      </div>

      <PracticeLevels
        goal="완성된 조각을 배치·연결(배선)해 회원가입 폼을 조립한다. 로직은 이미 주어진다."
        solutionFile="app-assemble-signup/solutionAssembly.jsx"
        solution={<SolutionAssembly />}
        levels={[
          {
            label: '쉬움',
            file: 'app-assemble-signup/practiceEasy.jsx',
            task: "조각 하나만 남았다 — '경력' 셀렉트를 배치하고 연결하자. (나머지는 이미 배선돼 있다)",
            hints: [
              '① 먼저 체험 — 지금 폼엔 경력 셀렉트가 없다. 그래서 경력을 못 고르고 제출도 막힌다.',
              '② 어디 — practiceEasy.jsx의 닉네임 Field 아래 🟢 TODO.',
              "③ 어떻게 — <Field label=\"경력\" name=\"level\" type=\"select\" options={LEVEL_OPTIONS} value={f.form.level} onChange={f.handleChange} error={f.shownError('level')} />.",
              '④ 확인 — 경력 셀렉트가 뜨고, 고르면 에러가 사라진다.',
            ],
            node: <PracticeEasy />,
          },
          {
            label: '중간',
            file: 'app-assemble-signup/practiceMedium.jsx',
            task: 'form 껍데기와 제출 버튼만 있다. 그 안에 Field 4개와 ChipSelect를 전부 배치·연결하자.',
            hints: [
              '① 무엇·왜 — 부모(f)가 form state를 쥐고, 각 조각에 props로 값을 내리고 콜백을 받는다. 그 배선을 채운다.',
              '② 어디 — practiceMedium.jsx의 <form> 안 🟡 TODO.',
              '③ Field — 이름·이메일·닉네임·경력. 공통: value={f.form.필드} onChange={f.handleChange} error={f.shownError(\'필드\')}. 경력은 type="select" options={LEVEL_OPTIONS}.',
              '④ ChipSelect — options={INTEREST_OPTIONS} selected={f.form.interests} onToggle={f.toggleInterest} error={f.shownError(\'interests\')}. 👀 정답과 비교하라.',
            ],
            node: <PracticeMedium />,
          },
          {
            label: '어려움',
            file: 'app-assemble-signup/practiceHard.jsx',
            task: '로직(f)만 주어진다. <form>부터 조각·제출 버튼까지 폼 전체를 처음부터 조립하자.',
            hints: [
              '① 감싸기 — <form className="demo-card" onSubmit={f.handleSubmit}> … </form>.',
              '② 조각 — Field 4개 + ChipSelect를 순서대로 배치하고 f의 값·핸들러로 연결한다.',
              '③ 완료 화면 — 맨 위에 if (f.done) return <SignupDone form={f.form} onReset={f.reset} />.',
              '④ 제출 버튼 — <button type="submit" style={submitBtnStyle}>가입하기</button>. 👀 정답 보기로 확인.',
            ],
            node: <PracticeHard />,
          },
        ]}
      />

      <div className="try-it">
        <h4>💡 이 단계에서 얻는 것</h4>
        <ul>
          <li><b>조립 = 데이터 흐름 배선</b> — 부모가 state를 소유하고, 조각엔 props로 내리고 콜백으로 받는다.</li>
          <li><b>같은 조각, 다른 값</b> — Field 하나 정의로 이름·이메일·경력을 다 그린다(재사용).</li>
          <li>여기선 <b>로직을 건드리지 않는다</b> — 검증·파생 에러를 직접 만드는 건 <b>Lv3-2</b>다.</li>
        </ul>
      </div>
    </section>
  )
}
