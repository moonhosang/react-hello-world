// ============================================================
// 완성 데모 — 검색창 + debounce + 결과 목록
// ============================================================
// 입력할 때마다 곧장 검색하면, 한 글자 칠 때마다 요청이 쏟아진다.
// debounce로 "입력이 멈춘 뒤"에만 한 번 검색한다.
//   - useRef에 타이머 id를 담아두고, 새 입력이 오면 이전 타이머를 정리한다.
//   - 검색은 비동기(Promise)라 늦게 온 옛 응답이 최신 결과를 덮을 수 있다.
//     → 요청마다 순번을 매겨(useRef), 최신 순번의 응답만 화면에 반영한다.

import { useState, useEffect, useRef } from 'react'
import { searchUsers } from './searchApi.js'
import UserList from './UserList.jsx'

const DEBOUNCE_MS = 350

export default function SearchDemo() {
  const [query, setQuery] = useState('')   // controlled input의 값
  const [results, setResults] = useState([]) // 검색 결과 목록
  const [loading, setLoading] = useState(false) // 검색 중이면 true

  const timerRef = useRef(null) // debounce 타이머 id를 담아둔다 (이전 타이머 정리용)
  const seqRef = useRef(0)      // 요청 순번 — 최신 응답만 반영하기 위한 경쟁 상태 방지

  // 실제 검색 실행 — 순번을 매기고, 응답이 최신일 때만 화면에 반영한다.
  const runSearch = (text) => {
    const mySeq = ++seqRef.current // 이번 요청의 순번
    searchUsers(text).then((data) => {
      // 이 응답이 나가는 사이 더 새로운 요청이 있었다면(mySeq가 뒤처졌다면) 버린다.
      if (mySeq !== seqRef.current) return
      setResults(data)
      setLoading(false)
    })
  }

  // 입력이 바뀔 때마다: 이전 타이머를 지우고, 멈춘 뒤(DEBOUNCE_MS)에만 검색한다.
  useEffect(() => {
    const q = query.trim()

    // 검색어가 비면: 예약된 검색을 취소하고, 순번을 올려 늦게 올 응답도 무효화한다.
    if (q === '') {
      clearTimeout(timerRef.current)
      seqRef.current++
      setResults([])
      setLoading(false)
      return
    }

    setLoading(true) // 결과가 나올 때까지 ⏳ (빈 결과 안내가 깜빡이지 않게)
    clearTimeout(timerRef.current) // 이전 타이머 정리
    timerRef.current = setTimeout(() => runSearch(q), DEBOUNCE_MS)

    // 언마운트/다음 입력 시 예약된 타이머를 정리한다.
    return () => clearTimeout(timerRef.current)
  }, [query])

  const trimmed = query.trim()

  return (
    <>
      <div className="file-label">📄 app-search/index.jsx · searchApi.js</div>

      {/* 검색 입력 — controlled input. onChange로 query만 바꾸면 useEffect가 검색을 맡는다 */}
      <div className="todo-input-row">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="이름으로 검색… (예: 김, 코딩)"
          aria-label="사용자 이름 검색"
        />
      </div>

      {/* 결과 표시 — 계산한 값(trimmed/loading/results)만 넘겨 화면 4분기를 UserList에 맡긴다 */}
      <UserList trimmed={trimmed} loading={loading} results={results} />
    </>
  )
}
