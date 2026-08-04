import { useState } from 'react'

// 🔴 중간 — useToggle의 '속'을 채운다. 컴포넌트는 이미 이 훅을 쓰고 있다.
// 커스텀 훅 안에서도 useState 같은 훅을 최상위에서 호출하고, 필요한 값을 배열로 돌려준다.
function useToggle(initial = false) {
  // TODO: 아래 자리표시자를 지우고 진짜 훅으로 만든다.
  //   const [on, setOn] = useState(initial)
  //   const toggle = () => setOn((v) => !v)
  //   return [on, toggle]
  return [false, () => {}] // ← 지금은 항상 꺼짐, toggle이 아무 일도 안 한다
}

export default function PracticeL3() {
  const [on, toggle] = useToggle(false)
  return (
    <div className="demo-card" style={{ padding: 12 }}>
      <b style={{ fontSize: 18 }}>{on ? '💡 켜짐' : '🌙 꺼짐'}</b>
      <div className="button-row" style={{ marginTop: 8 }}>
        <button className={'chip' + (on ? ' on' : '')} onClick={toggle}>
          {on ? '끄기' : '켜기'}
        </button>
      </div>
    </div>
  )
}
