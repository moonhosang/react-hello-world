import { useState } from 'react'

// ✅ 정답 — 커스텀 훅 useToggle 만들어 쓰기
// 커스텀 훅은 'use'로 시작하는 그냥 함수다. 안에서 useState 같은 훅을 쓰고, 필요한 값을 돌려준다.
// 이렇게 빼 두면 on/off 로직을 여러 컴포넌트에서 한 줄로 재사용한다.
function useToggle(initial = false) {
  const [on, setOn] = useState(initial)
  const toggle = () => setOn((v) => !v)
  return [on, toggle]
}

export default function SolutionToggle() {
  // 커스텀 훅도 반드시 컴포넌트 '최상위'에서 호출한다 (훅 규칙).
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
