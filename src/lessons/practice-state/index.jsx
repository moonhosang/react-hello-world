// 📝 챕터 연습 · 상태(State)
// 챕터 04(상태와 이벤트)를 종합하는 핸즈온 연습 — 난이도 3단계로 직접 만들어 본다.

import PracticeLevels from '../../components/PracticeLevels.jsx'
import PracticeEasy from './practiceEasy.jsx'
import PracticeMedium from './practiceMedium.jsx'
import PracticeHard from './practiceHard.jsx'
import SolutionLikeCard from './solution.jsx'

export default function PracticeState() {
  return (
    <section>
      <header className="lesson-header">
        <span className="badge checkpoint-badge">📝 챕터 연습</span>
        <h2>상태(State) — 종합 연습</h2>
        <p>useState·이벤트·객체 state를 직접 손으로 써 본다. 쉬움 → 어려움 순으로 하나씩.</p>
      </header>

      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 학습 포인트</span>
        <p>값이 바뀌면 <b>set 함수</b>로만 바꾼다. 숫자·불리언·객체 state를 이벤트와 이어 화면을 움직인다.</p>
      </div>

      <PracticeLevels
        goal="숫자·불리언·객체 state를 이벤트와 연결해 '좋아요 카드'를 완성한다."
        solutionFile="practice-state/solution.jsx"
        solution={<SolutionLikeCard />}
        levels={[
          {
            label: '쉬움',
            file: 'practice-state/practiceEasy.jsx',
            task: '좋아요 버튼을 누르면 ❤️ 숫자가 오르게, onLike 안 한 줄만 채우자.',
            hints: [
              '① 먼저 체험 — 지금은 버튼을 눌러도 0에서 안 오른다. 이게 고칠 문제다.',
              '② 어디 — practiceEasy.jsx의 onLike 함수 안 🟢 TODO.',
              '③ 어떻게 — setLikes(likes + 1). 값은 =로 못 바꾸고 set 함수로만 바꾼다.',
              '④ 확인 — 누를 때마다 숫자가 1씩 오른다.',
            ],
            node: <PracticeEasy />,
          },
          {
            label: '중간',
            file: 'practice-state/practiceMedium.jsx',
            task: '객체 state에서 이름만 바꾸고 role은 유지하자. onName을 채운다.',
            hints: [
              '① 무엇·왜 — 객체 state는 바뀐 필드만 새 객체로 갱신한다. 통째로 { name: ... }만 넣으면 role이 사라진다.',
              '② 어디 — practiceMedium.jsx의 onName 안 🟡 TODO.',
              '③ 어떻게 — setProfile({ ...profile, name: e.target.value }). ...profile로 기존 값을 펼치고 name만 덮어쓴다.',
              '④ 확인 — 입력하면 이름이 바뀌고, 옆의 role(프론트엔드)은 그대로 남는다.',
            ],
            node: <PracticeMedium />,
          },
          {
            label: '어려움',
            file: 'practice-state/practiceHard.jsx',
            task: '껍데기만 있다. liked(불리언)와 count(숫자)를 처음부터 만들어, 하트 토글 + 숫자 반영을 완성하자.',
            hints: [
              '① state — const [liked, setLiked] = useState(false); const [count, setCount] = useState(0).',
              '② 토글 — 버튼 클릭 시 setLiked(v => !v). count는 켜질 때 +1, 꺼질 때 -1: setCount(c => liked ? c - 1 : c + 1).',
              '③ 화면 — {liked ? "❤️" : "🤍"} {count}와 버튼(onClick={toggle}).',
              '④ 확인 — 누를 때마다 하트가 채워지고/비워지고, 숫자가 따라 오르내린다.',
            ],
            node: <PracticeHard />,
          },
        ]}
      />
    </section>
  )
}
