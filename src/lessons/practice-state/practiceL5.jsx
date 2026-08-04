// ⚫ 도전 — 껍데기만 있다. 처음부터 '좋아요 카드'를 만든다.
// 할 일:
//   ① useState import
//   ② const [card, setCard] = useState({ liked: false, likes: 0 })  (객체 state)
//   ③ const toggle = () => setCard((c) => ({ ...c, liked: !c.liked, likes: c.liked ? c.likes - 1 : c.likes + 1 }))
//   ④ 하트(❤️/🤍) + 숫자(card.likes) 표시 + 버튼(onClick={toggle})

export default function PracticeL5() {
  return (
    <div className="demo-card" style={{ padding: 12 }}>
      여기에 좋아요 카드를 만들자
    </div>
  )
}
