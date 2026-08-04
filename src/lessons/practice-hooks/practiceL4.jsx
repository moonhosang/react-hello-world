import { useState } from 'react'

// 🟣 어려움 — 커스텀 훅 '정의'와 '사용'을 둘 다 만든다.
// TODO A: useToggle 안을 채운다(useState + toggle → [on, toggle] 반환).
function useToggle(initial = false) {
  // TODO A: const [on, setOn] = useState(initial); const toggle = () => setOn((v) => !v); return [on, toggle]
  return [false, () => {}]
}

export default function PracticeL4() {
  // TODO B: useToggle을 최상위에서 호출해 [on, toggle]로 받는다.
  const on = false
  const toggle = undefined // ← TODO B로 바꾼다: const [on, toggle] = useToggle(false)

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
