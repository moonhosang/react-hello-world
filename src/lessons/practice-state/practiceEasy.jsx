import { useState } from 'react'

// 🟢 쉬움 — 좋아요 버튼을 완성하자.
// 할 일: onLike의 TODO 한 줄만 채우면 ❤️ 숫자가 오른다. (setLikes 사용)

export default function PracticeEasy() {
  const [likes, setLikes] = useState(0)

  const onLike = () => {
    // TODO: likes를 1 늘린다. (예: setLikes(likes + 1))
  }

  return (
    <div className="demo-card" style={{ padding: 12 }}>
      <b style={{ fontSize: 18 }}>❤️ {likes}</b>
      <div className="button-row" style={{ marginTop: 8 }}>
        <button className="chip on" onClick={onLike}>좋아요</button>
      </div>
    </div>
  )
}
