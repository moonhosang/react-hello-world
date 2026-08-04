import { useState } from 'react'

// 🟢 아주 쉬움 — 거의 다 됐다. toggle 안 setCard의 'likes' 한 줄만 채운다.
// 지금은 하트는 바뀌는데 숫자가 안 오른다(likes: c.likes 그대로라서). 그 한 줄만 고친다.

export default function PracticeL1() {
  const [card, setCard] = useState({ liked: false, likes: 0 })

  const toggle = () => {
    setCard((c) => ({
      ...c,
      liked: !c.liked,
      likes: c.likes, // TODO: 켜질 때 +1, 꺼질 때 -1 (예: c.liked ? c.likes - 1 : c.likes + 1)
    }))
  }

  return (
    <div className="demo-card" style={{ padding: 12 }}>
      <b style={{ fontSize: 18 }}>{card.liked ? '❤️' : '🤍'} {card.likes}</b>
      <div className="button-row" style={{ marginTop: 8 }}>
        <button className={'chip' + (card.liked ? ' on' : '')} onClick={toggle}>
          {card.liked ? '취소' : '좋아요'}
        </button>
      </div>
    </div>
  )
}
