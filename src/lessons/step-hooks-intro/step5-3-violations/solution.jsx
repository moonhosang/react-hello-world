import { useState } from 'react'

// 완성 — 훅은 조건문 밖, 컴포넌트 '최상위'에서 부른다.
//
// 두 useState 모두 함수 맨 위에서 호출하므로, 로그인 상태가 바뀌어 화면이 다시 그려져도
// 훅 호출 순서(loggedIn → count)는 항상 똑같다. 리액트는 이 순서로 각 값을 기억한다.
//
// "로그인했을 때만 출석 화면을 보여준다" 같은 조건 분기는 훅 호출이 아니라
// JSX(무엇을 그릴지)에서 처리한다 — 이게 규칙을 지키는 올바른 방식이다.
export default function SolutionHookRule() {
  const [loggedIn, setLoggedIn] = useState(true)
  const [count, setCount] = useState(0) // ✅ 최상위 — 렌더마다 같은 순서로 호출된다

  return (
    <div className="demo-card center">
      <div className="button-row">
        <button onClick={() => setLoggedIn(!loggedIn)}>
          {loggedIn ? '로그아웃' : '로그인'}
        </button>
      </div>

      {loggedIn ? (
        <>
          <p className="demo-desc">출석 횟수: <b>{count}</b></p>
          <button onClick={() => setCount(count + 1)}>출석 체크</button>
        </>
      ) : (
        <p className="demo-desc">로그인하면 출석 체크를 할 수 있다.</p>
      )}
    </div>
  )
}
