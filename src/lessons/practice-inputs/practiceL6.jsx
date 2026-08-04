// ⚫ 처음부터 (다른 예시) — 검색어 입력을 대문자로. 빈 화면에서 처음부터.
// 글자 수 카드와 같은 controlled input + 파생 값을 다른 소재로 한 번 더.
// 할 일:
//   ① useState import, const [q, setQ] = useState("")
//   ② <input value={q} onChange={(e) => setQ(e.target.value)} />
//   ③ 대문자 표시 — {q.toUpperCase()}

export default function PracticeL6() {
  return (
    <div className="demo-card" style={{ padding: 12 }}>
      여기에 검색어 입력을 만들자
    </div>
  )
}
