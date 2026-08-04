// 📝 챕터 연습 · useEffect
// 챕터 10(useEffect)을 종합하는 핸즈온 연습 — 난이도 3단계로 직접 만들어 본다.

import PracticeLevels from '../../components/PracticeLevels.jsx'
import PracticeEasy from './practiceEasy.jsx'
import PracticeEasy2 from './practiceEasy2.jsx'
import PracticeMedium from './practiceMedium.jsx'
import PracticeMedium2 from './practiceMedium2.jsx'
import PracticeHard from './practiceHard.jsx'
import SolutionTimer from './solution.jsx'

export default function PracticeEffects() {
  return (
    <section>
      <header className="lesson-header">
        <span className="badge checkpoint-badge">📝 챕터 연습</span>
        <h2>useEffect — 종합 연습</h2>
        <p>렌더 뒤 할 일(부수 효과)을 useEffect에 적고, 의존성 배열과 정리(cleanup)를 직접 써 본다. 쉬움 → 어려움 순으로.</p>
      </header>

      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 학습 포인트</span>
        <p>의존성 배열로 <b>언제 다시 실행할지</b>를 정하고, <code>return</code>으로 <b>뒷정리(clearInterval)</b>를 돌려준다.</p>
      </div>

      <PracticeLevels
        goal="의존성 배열과 정리(cleanup)를 직접 채워 타이머·제목 동기화를 완성한다."
        solutionFile="practice-effects/solution.jsx"
        solution={<SolutionTimer />}
        levels={[
          {
            label: '1 · 의존성',
            point: '완성된 effect에 의존성 배열만 준다.',
            file: 'practice-effects/practiceEasy.jsx',
            task: '브라우저 탭 제목을 count에 맞추자. useEffect의 의존성 배열만 채운다.',
            hints: [
              '① 먼저 체험 — 지금은 의존성 배열이 없어 매 렌더마다 실행된다. count에만 맞춰 다시 실행하게 하자.',
              '② 어디 — practiceEasy.jsx의 useEffect 끝, 🟢 TODO 자리.',
              '③ 어떻게 — 두 번째 인자로 [count]를 준다: useEffect(() => {...}, [count]). count가 바뀔 때만 다시 실행된다.',
              '④ 확인 — +1을 누르면 브라우저 탭 제목이 "클릭 N"으로 따라 바뀐다.',
            ],
            node: <PracticeEasy />,
          },
          {
            label: '2 · 정리',
            point: '걸린 타이머에 정리(cleanup) 한 줄을 더한다.',
            file: 'practice-effects/practiceEasy2.jsx',
            task: '타이머는 이미 걸려 있다. return으로 정리 함수를 돌려주자.',
            hints: [
              '① 무엇·왜 — setInterval을 걸면 반드시 정리한다. 안 그러면 컴포넌트가 사라진 뒤에도 계속 돈다.',
              '② 어디 — practiceEasy2.jsx의 useEffect 안, setInterval 아래 🟢 TODO.',
              '③ 어떻게 — return () => clearInterval(id).',
              '④ 확인 — 숫자는 그대로 오르되, 이제 사라질 때 타이머가 멈춘다.',
            ],
            node: <PracticeEasy2 />,
          },
          {
            label: '3 · 타이머',
            point: '타이머 걸기와 정리를 둘 다 스스로 쓴다.',
            file: 'practice-effects/practiceMedium.jsx',
            task: '1초마다 오르는 타이머를 걸고, 정리(cleanup)까지 돌려주자.',
            hints: [
              '① 무엇·왜 — setInterval을 걸면 반드시 정리해야 한다. 안 그러면 컴포넌트가 사라진 뒤에도 타이머가 계속 돈다.',
              '② 어디 — practiceMedium.jsx의 useEffect 안 🟡 TODO 1·2.',
              '③ 어떻게 — const id = setInterval(() => setSec(s => s + 1), 1000). 그리고 return () => clearInterval(id).',
              '④ 확인 — 숫자가 1초마다 오른다. (정리를 돌려줘야 안전하다)',
            ],
            node: <PracticeMedium />,
          },
          {
            label: '4 · 시작/멈춤',
            point: 'running으로 타이머를 켜고 끄게 만든다.',
            file: 'practice-effects/practiceMedium2.jsx',
            task: '타이머·정리는 됐다. running(불리언)으로 시작/멈춤되게 두 곳을 고치자.',
            hints: [
              '① 무엇·왜 — 지금은 running과 무관하게 무조건 돈다. 조건과 의존성으로 제어한다.',
              '② TODO 1 — effect 맨 위에 if (!running) return. running이 false면 타이머를 안 건다.',
              '③ TODO 2 — 의존성 []를 [running]으로. running이 바뀔 때마다 정리 후 다시 건다.',
              '④ 확인 — 시작을 누르면 오르고, 멈춤을 누르면 선다.',
            ],
            node: <PracticeMedium2 />,
          },
          {
            label: '5 · 처음부터',
            point: '빈 화면에서 state·effect·정리를 전부 스스로.',
            file: 'practice-effects/practiceHard.jsx',
            task: '껍데기만 있다. running·sec state와 시작/멈춤 타이머를 처음부터 만들자.',
            hints: [
              '① state — const [running, setRunning] = useState(false); const [sec, setSec] = useState(0).',
              '② effect — useEffect(() => { if (!running) return; const id = setInterval(() => setSec(s => s + 1), 1000); return () => clearInterval(id) }, [running]).',
              '③ 화면 — ⏱️ {sec}초와 시작/멈춤 버튼(onClick={() => setRunning(v => !v)}).',
              '④ 확인 — 시작을 누르면 오르고, 멈춤을 누르면 선다. running이 바뀔 때마다 정리 후 다시 건다.',
            ],
            node: <PracticeHard />,
          },
        ]}
      />
    </section>
  )
}
