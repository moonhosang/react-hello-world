import { useState } from 'react'

// 🪝 use로 시작하는 '내 함수' = 커스텀 훅. 그 안에서 리액트 훅(useState)을 부른다(중첩 훅).
function useToggle(initial = false) {
  const [on, setOn] = useState(initial) // 👈 훅 안에서 훅 호출 — 정상이다
  const toggle = () => setOn((v) => !v)
  return [on, toggle]
}

// 같은 커스텀 훅을 두 곳에서 쓴다 — 호출마다 상태가 '각자 독립'이다.
export default function CustomHookDemo() {
  const [light, toggleLight] = useToggle(true)
  const [alarm, toggleAlarm] = useToggle(false)

  return (
    <div className="button-row">
      <button className="chip on" onClick={toggleLight}>조명 {light ? '💡 켜짐' : '🌑 꺼짐'}</button>
      <button className="chip on" onClick={toggleAlarm}>알림 {alarm ? '🔔 켜짐' : '🔕 꺼짐'}</button>
    </div>
  )
}
