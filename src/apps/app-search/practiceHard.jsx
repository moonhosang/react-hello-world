import { useState, useEffect, useRef } from 'react'
import { searchUsers } from './searchApi.js'

// 🔴 어려움 — 껍데기만 있다. 상태·effect·debounce를 거의 다 직접 채운다.
// 렌더 골격(입력창·결과 목록)은 아래에 그대로 있으니, 로직만 완성하면 된다.
//
// 할 일:
//   🔴 TODO A: 타이머 id를 담을 useRef를 만든다. (const timerRef = useRef(null))
//   🔴 TODO B: useEffect(() => { ... }, [query]) 로 query가 바뀔 때마다 검색을 예약한다.
//       - q = query.trim() 이 비면 예약 취소 + 결과 비우기 + 일찍 return
//       - setLoading(true)
//       - clearTimeout(timerRef.current) 로 이전 타이머 정리
//       - timerRef.current = setTimeout(() => {
//           searchUsers(q).then((data) => { setResults(data); setLoading(false) })
//         }, DEBOUNCE_MS)
//       - return () => clearTimeout(timerRef.current)  // cleanup
//
// 지금은 로직이 비어 있어 검색이 실행되지 않는다. (빈 골격에서도 렌더는 정상)

const DEBOUNCE_MS = 350

export default function PracticeSearchHard() {
  const [query, setQuery] = useState('')     // controlled input의 값
  const [results, setResults] = useState([]) // 검색 결과 목록
  const [loading, setLoading] = useState(false)

  // 🔴 TODO A: debounce 타이머 id를 담을 useRef를 여기에 만든다.

  // 🔴 TODO B: query가 바뀔 때마다 debounce로 검색을 예약하는 useEffect를 여기에 작성한다.

  const trimmed = query.trim()

  return (
    <div className="demo-card">
      <div className="todo-input-row">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="이름으로 검색… (예: 김, 코딩)"
          aria-label="사용자 이름 검색"
        />
      </div>

      {trimmed === '' ? (
        <p className="demo-desc">🔎 이름을 입력하면 검색 결과가 여기에 나온다.</p>
      ) : loading ? (
        <p className="demo-desc">⏳ 검색 중…</p>
      ) : results.length === 0 ? (
        <p className="demo-desc">🫥 "{trimmed}"에 대한 결과가 없다.</p>
      ) : (
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
      )}
    </div>
  )
}
