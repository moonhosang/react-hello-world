import { useState } from 'react'

// 🟡 쉬움 — useToggle은 다 됐다. 반환값을 [on, toggle]로 '구조 분해'해서 받자.
// 커스텀 훅은 값을 배열로 돌려주고, 쓰는 쪽은 useState처럼 구조 분해로 받는다.
function useToggle(initial = false) {
  const [on, setOn] = useState(initial)
  const toggle = () => setOn((v) => !v)
  return [on, toggle]
}

export default function PracticeL2() {
  // TODO: 아래 자리표시자를 지우고, useToggle을 호출해 [on, toggle]로 받는다.
  //   const [on, toggle] = useToggle(false)
  const on = false
  const toggle = undefined // ← 지금은 항상 꺼짐, 버튼도 안 먹는다

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
