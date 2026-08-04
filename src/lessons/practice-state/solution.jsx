import { useState } from 'react'

// ✅ 정답 — 좋아요 카드 (숫자 state + 불리언 토글 + 이벤트)
export default function SolutionLikeCard() {
  const [liked, setLiked] = useState(false)
  const [count, setCount] = useState(0)

  const toggle = () => {
    setLiked((v) => !v)
    setCount((c) => (liked ? c - 1 : c + 1)) // 켜질 때 +1, 꺼질 때 -1
  }

  return (
    <div className="demo-card" style={{ padding: 12 }}>
      <b style={{ fontSize: 18 }}>{liked ? '❤️' : '🤍'} {count}</b>
      <div className="button-row" style={{ marginTop: 8 }}>
        <button className={'chip' + (liked ? ' on' : '')} onClick={toggle}>
          {liked ? '취소' : '좋아요'}
        </button>
      </div>
    </div>
  )
}
