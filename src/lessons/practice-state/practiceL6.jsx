// ⚫ 처음부터 (다른 예시) — 조회수 카운터. 빈 화면에서 처음부터.
// 좋아요 카드와 같은 '숫자 state + 이벤트'를 다른 소재로 한 번 더.
// 할 일:
//   ① useState import
//   ② const [views, setViews] = useState(0)  (숫자 state)
//   ③ 조회 +1 버튼(onClick={() => setViews((v) => v + 1)}) + 리셋 버튼(setViews(0))
//   ④ 👁️ {views} 표시

export default function PracticeL6() {
  return (
    <div className="demo-card" style={{ padding: 12 }}>
      여기에 조회수 카운터를 만들자
    </div>
  )
}
