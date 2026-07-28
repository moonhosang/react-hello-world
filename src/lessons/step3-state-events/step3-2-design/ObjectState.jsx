import { useState } from 'react'

// 서로 '관련 있는 값들'을 객체 하나로 묶어 상태로 가진다.
// 레벨과 경험치는 함께 움직이는 값이라 하나로 묶으면 관리가 편하다.
// ⚠️ 객체 상태는 바뀐 필드만 '새 객체'로 만든다 (...펼치기). 원본을 직접 고치면 안 된다.

export default function ObjectState() {
  const [player, setPlayer] = useState({ level: 1, exp: 0 })

  function gainExp() {
    setPlayer({ ...player, exp: player.exp + 10 }) // 바뀐 필드만 새 객체로
  }
  function levelUp() {
    setPlayer({ ...player, level: player.level + 1, exp: 0 })
  }

  return (
    <div>
      <p className="demo-desc">
        레벨: <b>{player.level}</b> · 경험치: <b>{player.exp}</b>
      </p>
      <div className="button-row">
        <button onClick={gainExp}>✨ 경험치 +10</button>
        <button onClick={levelUp}>⬆️ 레벨업</button>
      </div>
    </div>
  )
}
