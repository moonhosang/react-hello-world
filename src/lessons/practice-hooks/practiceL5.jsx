import { useState } from 'react'

// ⚫ 도전 — 처음부터. 커스텀 훅 useToggle을 만들고, 그걸 써서 전등 토글을 완성한다.
// 할 일:
//   TODO A: function useToggle(initial = false) { ... return [on, toggle] } (안에서 useState 사용)
//   TODO B: 컴포넌트 최상위에서 const [on, toggle] = useToggle(false)  (훅 규칙)
//   TODO C: 💡/🌙 상태 표시 + 버튼(onClick={toggle})

// TODO A: 여기에 useToggle 커스텀 훅

export default function PracticeL5() {
  // TODO B: const [on, toggle] = useToggle(false)
  return (
    <div className="demo-card" style={{ padding: 12 }}>
      {/* TODO C: 💡/🌙 표시와 켜기/끄기 버튼 */}
      여기에 전등 토글을 만들자 (useToggle 커스텀 훅 사용)
    </div>
  )
}
