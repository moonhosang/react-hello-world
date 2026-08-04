import { useState } from 'react'

// 🔴 중간 — toggle 함수를 직접 만들고, 버튼에 연결한다.
// state와 겉모습(하트·숫자)은 있다. TODO A(toggle 작성)와 TODO B(onClick 연결)를 채운다.

export default function PracticeL3() {
  const [card, setCard] = useState({ liked: false, likes: 0 })

  // TODO A: toggle 함수를 만든다.
  //   const toggle = () => setCard((c) => ({ ...c, liked: !c.liked, likes: c.liked ? c.likes - 1 : c.likes + 1 }))

  return (
    <div className="demo-card" style={{ padding: 12 }}>
      <b style={{ fontSize: 18 }}>{card.liked ? '❤️' : '🤍'} {card.likes}</b>
      <div className="button-row" style={{ marginTop: 8 }}>
        {/* TODO B: 버튼에 onClick={toggle}을 연결한다 */}
        <button className={'chip' + (card.liked ? ' on' : '')}>
          {card.liked ? '취소' : '좋아요'}
        </button>
      </div>
    </div>
  )
}
