import { useState, useEffect, useRef } from 'react'
import { searchUsers } from './searchApi.js'

// 🟡 중간 — controlled input과 목록 렌더 골격은 채워져 있다.
// 핵심인 debounce(입력이 멈춘 뒤에만 검색) 로직을 직접 완성하자.
//
// 할 일 (useEffect 안):
//   🟡 TODO 1: 이전 타이머 정리 — clearTimeout(timerRef.current)
//   🟡 TODO 2: setTimeout으로 DEBOUNCE_MS 뒤에 검색을 예약하고,
//           그 타이머 id를 timerRef.current에 담는다.
//   🟡 TODO 3: setTimeout 안에서 searchUsers(q)를 부른다. Promise다 →
//           .then((data) => { setResults(data); setLoading(false) })
//   🟡 TODO 4: cleanup — return () => clearTimeout(timerRef.current)
//
// 지금은 debounce가 비어 있어 검색이 실행되지 않는다. (빈 골격에서도 렌더는 정상)

const DEBOUNCE_MS = 350

export default function PracticeSearchMedium() {
  const [query, setQuery] = useState('')     // controlled input의 값
  const [results, setResults] = useState([]) // 검색 결과 목록
  const [loading, setLoading] = useState(false)

  const timerRef = useRef(null) // debounce 타이머 id를 담아둘 곳

  useEffect(() => {
    const q = query.trim()

    // 검색어가 비면 결과를 지운다.
    if (q === '') {
      clearTimeout(timerRef.current)
      setResults([])
      setLoading(false)
      return
    }

    setLoading(true)

    // 🟡 TODO 1: 이전 타이머 정리
    // 🟡 TODO 2·3: DEBOUNCE_MS 뒤에 searchUsers(q)를 부르도록 예약하고,
    //           타이머 id를 timerRef.current에 담는다.
    //           결과가 오면 setResults / setLoading 한다.

    // 🟡 TODO 4: cleanup — 다음 입력/언마운트 시 예약된 타이머 정리
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
