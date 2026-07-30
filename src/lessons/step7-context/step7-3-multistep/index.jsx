// 8-3 · 멀티스텝 폼 — Context로 상태 공유
// 3단계 회원가입 마법사를 Context로 만든다.
// 진행바·각 스텝·요약이 트리의 서로 다른 위치에서 같은 form·step 상태를 읽고 쓴다.
// props로 내리면 Wizard가 자식마다 form·onChange·step·next·prev를 줄줄이 전달해야 한다(드릴링).
// Provider로 한 번 감싸고 useForm()으로 어디서든 꺼내면 그 사슬이 사라진다.
//
// 데모는 역할별로 파일을 나눴다:
//   FormContext.jsx   · 상태 허브(FormProvider + useForm 훅)
//   SignupWizard.jsx  · Provider로 감싸고 진행바·스텝·버튼·요약을 배치
//   ProgressBar.jsx   · props 없이 step만 읽어 진행률 표시
//   StepAccount/Profile/Interests.jsx · 각 스텝이 자기 필드를 useForm으로 읽고 씀
//   Field.jsx         · 라벨+입력 한 줄(표시용)
//   NavButtons.jsx    · 이전/다음/제출
//   Review.jsx        · 완료 시 form 전체를 요약

import TechTags from '../../../components/TechTags.jsx'
import Practice from '../../../components/Practice.jsx'
import SignupWizard from './SignupWizard.jsx'
import PracticeProgress from './practice.jsx'
import SolutionProgress from './solution.jsx'

export default function Step7_3({ onGo }) {
  return (
    <section>
      <header className="lesson-header">
        <span className="badge context-badge">8-3</span>
        <h2>멀티스텝 폼 — Context로 상태 공유</h2>
        <p>3단계 회원가입 마법사. 진행바·각 스텝·요약이 같은 폼 상태를 props 없이 나눠 쓴다.</p>
      </header>

      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 학습 포인트</span>
        <p>
          여러 위치에서 같은 폼 상태를 읽고 써야 하면, props로 내리지 말고 <code>&lt;FormProvider&gt;</code>로 감싼 뒤
          어디서든 <code>useForm()</code>으로 꺼낸다.
        </p>
      </div>

      <TechTags
        items={[
          { label: 'Context', to: 7.1 },
          { label: '커스텀 훅', to: 12 },
          { label: '객체 state', to: 3.2 },
          { label: '조건부 렌더링(스텝)', to: 5 },
        ]}
        onGo={onGo}
      />

      <h3 className="section-title">🧙 3단계 회원가입 마법사</h3>
      <span className="learn-tag">
        📎 학습 포인트 · 진행바·스텝·버튼·요약이 전부 props 없이 useForm()으로 같은 상태를 공유한다
      </span>
      <p className="section-desc">
        <code>&lt;SignupWizard&gt;</code>가 안쪽을 <code>&lt;FormProvider&gt;</code>로 감싼다. 그러면
        <code> ProgressBar</code>는 step만, 각 <code>Step*</code>은 자기 필드만, <code>Review</code>는 form 전체를
        <b> 각자 필요한 만큼만</b> Context에서 꺼내 쓴다. 다음/제출을 눌러 끝까지 진행해 보자.
      </p>
      <div className="card">
        <div className="file-label">📄 SignupWizard.jsx · FormContext.jsx</div>
        <SignupWizard />
      </div>

      <div className="try-it">
        <h4>🤔 props로 했다면?</h4>
        <p className="section-desc" style={{ margin: '0 0 8px' }}>
          Context 없이 만들었다면 상태는 <code>SignupWizard</code>가 쥐고, 자식마다 이렇게 내려야 한다:
        </p>
        <ul>
          <li><code>ProgressBar</code>에 <code>step</code>,</li>
          <li>각 <code>Step*</code>에 <code>form</code>·<code>setField</code>(관심분야엔 <code>toggleInterest</code>까지),</li>
          <li><code>NavButtons</code>에 <code>step</code>·<code>prev</code>·<code>next</code>·<code>submit</code>,</li>
          <li><code>Review</code>에 <code>form</code> 전체.</li>
        </ul>
        <p className="section-desc" style={{ margin: '4px 0 0' }}>
          필드 하나만 추가해도 이 사슬을 다시 손봐야 한다. Provider로 감싸면 그 전달이 통째로 사라진다.
        </p>
      </div>

      <Practice
        task="① 무엇·왜 — ProgressBar가 step을 몰라 막대가 첫 칸에 멈춰 있다. Context에서 step을 읽어 진행률이 따라오게 하자."
        goal="멀리 있는 값을 props 없이 Context로 읽어 쓰는 법을 익힌다."
        hints={[
          '② 어디 — practice.jsx의 ProgressBar 함수 맨 위, step = 0 이라고 고정한 줄.',
          '③ 어떻게 — const { step } = useForm() 로 꺼내고, 아래 const step = 0 을 그 값으로 바꾼다.',
          '③ 힌트 — useForm()은 파일 위쪽에서 이미 import 돼 있다(FormProvider로 감싸져 있어 바로 쓸 수 있다).',
          '④ 확인 — 다음/이전을 누르면 "1/3 → 2/3 → 3/3"과 막대 너비가 함께 움직이면 성공.',
        ]}
        practiceFile="step7-context/step7-3-multistep/practice.jsx"
        solutionFile="step7-context/step7-3-multistep/solution.jsx"
        solution={<SolutionProgress />}
      >
        <PracticeProgress />
      </Practice>

      <div className="try-it">
        <h4>💡 정리</h4>
        <ul>
          <li><b>왜 Context인가</b> — 진행바·스텝·요약이 트리의 다른 위치에서 같은 상태를 읽고 쓴다. props로 내리면 드릴링, Provider로 감싸면 한 번에 공유.</li>
          <li><b>커스텀 훅 가드</b> — <code>createContext(undefined)</code> + <code>useForm()</code>에서 검사 → Provider 밖에서 쓰면 즉시 에러(조용한 버그 방지).</li>
          <li><b>각자 필요한 만큼</b> — ProgressBar는 step만, 각 스텝은 자기 필드만, Review는 form 전체를 props 없이 꺼낸다.</li>
        </ul>
      </div>
    </section>
  )
}
