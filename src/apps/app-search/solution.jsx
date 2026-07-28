import { useState, useEffect, useRef } from 'react'
import { searchUsers } from './searchApi.js'

// ✅ 정답 예시 — 사용자 검색 (디바운스)
// 핵심: 입력이 멈춘 뒤에만 한 번 검색한다.
//   - 이전 타이머를 clearTimeout으로 정리하고, setTimeout으로 다시 예약한다.
//   - 타이머 id는 useRef(timerRef)에 담아, 다음 입력 때 정리한다.
//   - 로딩(⏳) / 빈 결과 / 초기 안내로 화면을 나눈다.

const DEBOUNCE_MS = 350

export default function SolutionSearch() {
  const [query, setQuery] = useState('')       // controlled input의 값
  const [results, setResults] = useState([])   // 검색 결과 목록
  const [loading, setLoading] = useState(false) // 검색 중이면 true

  const timerRef = useRef(null) // debounce 타이머 id를 담아둔다 (다음 입력 때 정리용)

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
      searchUsers(q).then((data) => {
        setResults(data)
        setLoading(false)
      })
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

      {/* 화면 4분기 — 검색어 유무 → 로딩 → 빈 결과 → 목록 순으로 갈라 보여준다 */}
      {trimmed === '' ? (
        // 초기: 검색어가 비면 안내를 보여준다
        <p className="demo-desc">🔎 이름을 입력하면 검색 결과가 여기에 나온다.</p>
      ) : loading ? (
        // 로딩: 결과가 나올 때까지 ⏳ (빈 결과 안내가 깜빡이지 않게)
        <p className="demo-desc">⏳ 검색 중…</p>
      ) : results.length === 0 ? (
        // 빈 결과: 검색은 끝났지만 맞는 사용자가 없을 때
        <p className="demo-desc">🫥 "{trimmed}"에 대한 결과가 없다.</p>
      ) : (
        // 목록: 결과가 있을 때 건수와 항목을 map으로 렌더 (리스트+key)
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
