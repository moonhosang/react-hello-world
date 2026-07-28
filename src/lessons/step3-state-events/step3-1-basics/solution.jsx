import { useState } from 'react'

export default function SolutionSwitch() {
  const [on, setOn] = useState(false)
  return (
    <div className="demo-card center">
      <div className="demo-emoji">{on ? '💡' : '🌑'}</div>
      <button onClick={() => setOn(!on)}>{on ? '끄기' : '켜기'}</button>
    </div>
  )
}
