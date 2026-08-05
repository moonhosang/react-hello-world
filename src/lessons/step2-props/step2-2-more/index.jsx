// 2-2 · 더 넘겨보기 (함수 · 상태 · 객체 전달)
// props로는 값뿐 아니라 함수도 넘기고, 부모의 상태나 객체도 통째로 내려줄 수 있다.

import { useState } from 'react'
import GreetButton from './GreetButton.jsx'
import LikeParent from './LikeParent.jsx'
import UserParent from './UserParent.jsx'
import SourceTrace from '../../../components/SourceTrace.jsx'

// 부모 상태 → prop → 자식 갱신. 부모가 상태를 바꾸면 그걸 받은 자식이 왜 따라 바뀌는지 짚는다.
const LIKE_CODE = `function LikeParent() {
  const [likes, setLikes] = useState(0)   // 부모가 상태를 '소유'

  return (
    <>
      <LikeDisplay likes={likes} />        // 상태를 prop으로 내려준다
      <button onClick={() => setLikes(likes + 1)}>👍</button>
    </>
  )
}

function LikeDisplay({ likes }) {          // 자식은 받기만
  return <div>❤️ {likes}</div>
}`

const LIKE_STEPS = [
  {
    hl: [1, 2],
    tag: '① 부모가 소유',
    t: 'likes 상태는 부모가 가진다',
    d: (<>상태 <code>likes</code>는 부모 <code>LikeParent</code>가 가진다(0으로 시작). 자식은 상태가 없다.</>),
    note: 'likes = 0',
  },
  {
    hl: [6, 12],
    tag: '② 내려주기',
    t: '상태를 prop으로 자식에게',
    d: (<>부모가 <code>&lt;LikeDisplay likes={'{likes}'} /&gt;</code>로 그 값을 내려준다. 자식은 <code>{'{ likes }'}</code>로 받아 <b>❤️ 0</b>을 그린다.</>),
    note: '화면: ❤️ 0',
  },
  {
    hl: [7],
    tag: '③ 👍 클릭',
    t: 'setLikes로 부모 상태를 바꾼다',
    d: (<>버튼을 누르면 <code>setLikes(0 + 1)</code>. <b>부모</b>의 <code>likes</code>가 1로 바뀌며 <b>부모</b> 리렌더가 예약된다.</>),
    note: 'likes = 1',
  },
  {
    hl: [1, 6],
    tag: '④ 부모 리렌더',
    t: '부모가 새 값으로 다시 실행',
    d: (<>부모가 다시 돌며 이번엔 <code>likes = 1</code>. <code>&lt;LikeDisplay likes={'{1}'} /&gt;</code>로 <b>새 값</b>을 내려준다.</>),
  },
  {
    hl: [11, 12],
    tag: '⑤ 자식도 갱신',
    t: '새 prop을 받은 자식이 다시 그려진다',
    d: (<>바뀐 prop을 받은 자식도 다시 그려져 <b>❤️ 1</b>. → <b>부모 상태가 바뀌면, 그걸 받은 자식이 자동으로 따라 바뀐다.</b></>),
    note: '화면: ❤️ 1',
  },
  {
    hl: [11],
    tag: '⑥ 자식은 못 바꾼다',
    t: '값의 주인은 늘 부모',
    d: (<>자식은 <code>likes</code>를 <b>읽기만</b> 한다. 자식이 바꾸고 싶으면? 부모에게 받은 <b>함수를 호출해 신호를 보낸다</b>(위 ④ 함수 prop, 그리고 '상태 끌어올리기'). 상태의 주인은 그대로 부모다.</>),
  },
]

export default function Step2_2() {
  const [msg, setMsg] = useState('')

  return (
    <section>
      <header className="lesson-header">
        <span className="badge form-badge">2-2</span>
        <h2>props 더 넘겨보기 — 함수 · 상태 · 객체</h2>
        <p>props에는 값뿐 아니라 함수도, 부모의 상태도, 객체도 담을 수 있다.</p>
      </header>

      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 학습 포인트</span>
        <p>
          props로는 고정 값뿐 아니라 함수·상태·객체까지 무엇이든 자식에게 내려줄 수 있다는 걸 이해한다.
        </p>
      </div>

      <h3 className="section-title">④ props엔 함수도 담긴다</h3>
      <span className="learn-tag">📎 학습 포인트 · 함수를 넘겨 자식이 부모에게 신호를 보내기</span>
      <p className="section-desc">
        <b>함수</b>도 넘길 수 있다. 자식이 그 함수를 호출하면 <b>부모에게 신호를 보내는</b> 셈이다.
        (6단계 리스트 '상태 끌어올리기'의 씨앗)
      </p>
      <div className="card">
        <div className="file-label">📄 GreetButton.jsx · &lt;GreetButton onGreet=&#123;...&#125; /&gt;</div>
        <GreetButton onGreet={() => setMsg('자식이 인사했다! 👋')} />
        <p className="demo-desc">부모가 받은 신호: <b>{msg || '(아직 없음)'}</b></p>
      </div>

      <h3 className="section-title">⑤ 부모의 '상태'를 prop으로 내려주기</h3>
      <span className="learn-tag">📎 학습 포인트 · 부모 상태가 바뀌면 그걸 받은 자식도 함께 갱신된다</span>
      <p className="section-desc">
        지금까지 prop은 고정 값이었다. 부모가 <b>상태(state)</b>를 만들어 prop으로 내려주면,
        부모가 상태를 바꿀 때마다 <b>자식도 함께 갱신</b>된다. (상태 → prop → 자식)
      </p>
      {/* 🔬 소스 + 동작 과정 — 부모 상태가 바뀌면 자식이 따라 바뀌는 순서 */}
      <span className="learn-tag">📎 학습 포인트 · 클릭 → 부모 상태 변경 → 부모 리렌더 → 새 prop → 자식 갱신</span>
      <SourceTrace file="LikeParent → LikeDisplay (상태를 prop으로)" code={LIKE_CODE} steps={LIKE_STEPS} />

      <div className="card">
        <div className="file-label">📄 LikeParent.jsx (부모) · LikeDisplay.jsx (자식)</div>
        <LikeParent />
      </div>
      <p className="section-desc">
        👍 버튼(부모)을 누르면 <code>likes</code> 상태가 바뀌고, 그 값을 prop으로 받은 자식의 숫자가 따라 바뀐다.
        자식은 <b>받기만</b> 한다. (상태는 3단계에서 자세히!)
      </p>

      <h3 className="section-title">⑥ props를 '객체'로 전달 (상태도 객체로)</h3>
      <span className="learn-tag">📎 학습 포인트 · 여러 값을 객체 하나로 묶어 통째로 넘기기</span>
      <p className="section-desc">
        값이 여러 개면 하나씩 넘기는 대신 <b>객체 하나</b>로 묶어 넘길 수 있다. 부모의 <b>상태</b>도 객체로 가진다.
      </p>
      <div className="card">
        <div className="file-label">📄 UserParent.jsx (부모) · UserCard.jsx (자식)</div>
        <UserParent />
      </div>
      <p className="section-desc">
        <code>{'<UserCard user={user} />'}</code>로 객체를 통째로 넘기고, 자식은 <code>user.name</code>·<code>user.role</code>로 꺼낸다.<br />
        펼쳐서 <code>{'<Card {...user} />'}</code>로 넘기면 개별 prop과 같다 — <b>단</b>, 자식이 <code>user</code> 객체가 아니라 <code>name</code>·<code>role</code>을 <b>개별 prop</b>으로 받아야 한다(2-1 <code>ProfileCard</code>처럼). 위 <code>UserCard</code>는 <code>user</code> 하나를 받으니 통째로 넘겨야 한다.<br />
        객체 상태를 바꿀 땐 <b>바뀐 필드만</b> 새 객체로: <code>{"setUser({ ...user, role: '...' })"}</code> (3-2 · 객체 state에서 자세히!)
      </p>
    </section>
  )
}
