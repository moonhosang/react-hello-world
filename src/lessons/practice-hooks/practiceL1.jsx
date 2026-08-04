import { useState } from 'react'

// 🟢 아주 쉬움 — useToggle과 컴포넌트는 거의 다 됐다. 버튼 onClick 한 줄만 채운다.
// 지금은 버튼을 눌러도 반응이 없다(onClick이 없어서). toggle을 연결하면 살아난다.
function useToggle(initial = false) {
  const [on, setOn] = useState(initial)
  const toggle = () => setOn((v) => !v)
  return [on, toggle]
}

export default function PracticeL1() {
  const [on, toggle] = useToggle(false)
  return (
    <div className="demo-card" style={{ padding: 12 }}>
      <b style={{ fontSize: 18 }}>{on ? '💡 켜짐' : '🌙 꺼짐'}</b>
      <div className="button-row" style={{ marginTop: 8 }}>
        {/* TODO: 버튼에 onClick={toggle}을 붙인다 */}
        <button className={'chip' + (on ? ' on' : '')}>
          {on ? '끄기' : '켜기'}
        </button>
      </div>
    </div>
  )
}
