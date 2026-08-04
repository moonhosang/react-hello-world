// 🟣 어려움 — 아래는 '고정된 겉모습'이다. state와 toggle을 만들어 살아 움직이게 하자.
// import부터 필요하다.
//
// 할 일:
//   TODO A: useState import + const [card, setCard] = useState({ liked: false, likes: 0 })
//   TODO B: const toggle = () => setCard(...) (liked 반대·likes ±1)
//   TODO C: 아래 고정값(🤍 · 0 · className · 버튼)을 card·toggle을 쓰도록 바꾼다.

export default function PracticeL4() {
  // TODO A, TODO B

  return (
    <div className="demo-card" style={{ padding: 12 }}>
      <b style={{ fontSize: 18 }}>🤍 0</b>
      <div className="button-row" style={{ marginTop: 8 }}>
        <button className="chip">좋아요</button>
      </div>
    </div>
  )
}
