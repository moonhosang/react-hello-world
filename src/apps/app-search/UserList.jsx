// ============================================================
// 검색 결과 목록 — 상태에 따라 화면을 넷으로 나눠 보여준다.
// ============================================================
// 부모(SearchDemo)에서 계산한 값만 props로 받아 렌더만 담당한다.
//   - trimmed : 공백을 걷어낸 현재 검색어 (빈 문자열이면 초기 안내)
//   - loading : 검색 중이면 true (⏳)
//   - results : 검색 결과 배열
export default function UserList({ trimmed, loading, results }) {
  // 검색어가 비면: 초기 안내를 보여준다.
  if (trimmed === '') {
    return <p className="demo-desc">🔎 이름을 입력하면 검색 결과가 여기에 나온다.</p>
  }

  // 검색 중: 결과가 나올 때까지 ⏳ (빈 결과 안내가 깜빡이지 않게)
  if (loading) {
    return <p className="demo-desc">⏳ 검색 중…</p>
  }

  // 검색은 끝났지만 맞는 사용자가 없을 때.
  if (results.length === 0) {
    return <p className="demo-desc">🫥 "{trimmed}"에 대한 결과가 없다.</p>
  }

  // 결과가 있을 때: 건수와 목록을 보여준다.
  return (
    <>
      <p className="demo-desc" style={{ marginBottom: 8 }}>
        "{trimmed}" 검색 결과 {results.length}건
      </p>
      <ul className="plain-list">
        {results.map((u) => (
          <li key={u.id}>{u.emoji} {u.name} · {u.role}</li>
        ))}
      </ul>
    </>
  )
}
