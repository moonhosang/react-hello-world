import { useState } from 'react'

// ⚠️ 객체 상태를 '원본째' 고치면(참조 그대로) 리액트가 변화를 못 알아채 화면이 안 바뀐다.
// 리액트는 이전 값과 '참조가 다른가(새 객체인가)'로 바뀜을 판단하기 때문이다.
// → 항상 바뀐 필드만 덮어쓴 '새 객체'({ ...player })로 set 한다.
export default function ObjectMutationDemo() {
  const [player, setPlayer] = useState({ level: 1, exp: 0 })

  // ❌ 원본을 직접 수정한다 — 참조는 그대로라 리액트가 모른다
  function wrongGain() {
    player.exp += 10 // 원본을 바꿈 (같은 객체)
    setPlayer(player) // 참조가 같아 리렌더하지 않음 → 화면 그대로
  }

  // ✅ 바뀐 필드만 덮어쓴 '새 객체' → 참조가 달라 화면이 갱신된다
  function rightGain() {
    setPlayer({ ...player, exp: player.exp + 10 })
  }

  return (
    <div className="card">
      <div className="file-label">📄 ObjectMutationDemo.jsx</div>
      <div className="button-row">
        <button onClick={wrongGain}>❌ 직접 수정 (player.exp += 10)</button>
        <button onClick={rightGain}>✅ 새 객체 ({'{ ...player }'})</button>
        <button onClick={() => setPlayer({ level: 1, exp: 0 })}>🔄</button>
      </div>
      <p className="demo-desc">
        레벨 <b>{player.level}</b> · 경험치 <b>{player.exp}</b>
      </p>
      <p className="demo-desc">
        ❌ 직접 수정은 눌러도 화면이 <b>안 바뀐다</b>(사실 값은 오르고 있다). 이어서 ✅를 누르면
        그동안 숨어 있던 값이 <b>한 번에</b> 반영된다 — 리액트는 <b>'새 객체'</b>일 때만 알아챈다.
      </p>
    </div>
  )
}
