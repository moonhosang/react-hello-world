// 2-2 · 더 넘겨보기 (함수 · 상태 · 객체 전달)
// props로는 값뿐 아니라 함수도 넘기고, 부모의 상태나 객체도 통째로 내려줄 수 있다.

import { useState } from 'react'
import GreetButton from './GreetButton.jsx'
import LikeParent from './LikeParent.jsx'
import UserParent from './UserParent.jsx'

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
        (5단계 '상태 끌어올리기'의 씨앗)
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
        펼쳐서 <code>{'<UserCard {...user} />'}</code>로 넘기면 개별 prop과 같다.<br />
        객체 상태를 바꿀 땐 <b>바뀐 필드만</b> 새 객체로: <code>{"setUser({ ...user, role: '...' })"}</code> (6단계에서 자세히!)
      </p>
    </section>
  )
}
