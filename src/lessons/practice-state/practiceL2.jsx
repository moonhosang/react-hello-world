import { useState } from 'react'

// 🟡 쉬움 — toggle의 '새 객체' 만드는 부분을 채운다.
// state와 마크업은 다 됐다. setCard에 { ...c, liked, likes } 새 객체를 넘기면 된다.

export default function PracticeL2() {
  const [card, setCard] = useState({ liked: false, likes: 0 })

  const toggle = () => {
    // TODO: setCard로 새 객체를 넘긴다. liked는 반대로, likes는 켜질 때 +1 꺼질 때 -1.
    //   setCard((c) => ({ ...c, liked: !c.liked, likes: c.liked ? c.likes - 1 : c.likes + 1 }))
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
