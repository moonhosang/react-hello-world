import { useState, useEffect, useRef } from 'react'
import { searchUsers } from './searchApi.js'

// 🟢 쉬움 — 디바운스가 거의 다 채워져 있다. (약 90% 완성)
// 이전 타이머 정리도, setTimeout 예약도, cleanup도 이미 되어 있다.
// 딱 한 조각만 남았다: setTimeout이 실행될 때 실제로 검색을 부르는 부분이다.
//
// 할 일:
//   🟢 TODO: setTimeout 안에서 searchUsers(q)를 부르고, 응답이 오면
//         setResults(data)와 setLoading(false)로 화면에 반영한다.
//         → searchUsers(q).then((data) => { setResults(data); setLoading(false) })

const DEBOUNCE_MS = 350

export default function PracticeSearchEasy() {
  const [query, setQuery] = useState('')     // controlled input의 값
  const [results, setResults] = useState([]) // 검색 결과 목록
  const [loading, setLoading] = useState(false)

  const timerRef = useRef(null) // debounce 타이머 id

  useEffect(() => {
    const q = query.trim()

    // 검색어가 비면: 예약된 검색을 취소하고 결과를 지운다.
    if (q === '') {
      clearTimeout(timerRef.current)
      setResults([])
      setLoading(false)
      return
    }

    setLoading(true) // 결과가 나올 때까지 ⏳

    clearTimeout(timerRef.current) // 이전 타이머 정리
    timerRef.current = setTimeout(() => {
      // 🟢 TODO: 여기서 searchUsers(q)를 부르고, 결과가 오면 화면에 반영한다.
      //       searchUsers(q).then((data) => {
      //         setResults(data)
      //         setLoading(false)
      //       })
    }, DEBOUNCE_MS)

    // 다음 입력/언마운트 시 예약된 타이머 정리
    return () => clearTimeout(timerRef.current)
  }, [query])

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
