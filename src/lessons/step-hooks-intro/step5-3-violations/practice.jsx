import { useState } from 'react'

// 🎯 실습 — 조건문 안에서 부른 useState를 '최상위'로 옮겨 규칙을 지키게 고치기
//
// 아래는 '틀린 코드'다. useState를 if 블록 안에서 부른다 (규칙1 위반 — 조건문 안 호출 ❌):
//
//   function Attendance() {
//     const [loggedIn, setLoggedIn] = useState(true)
//     if (loggedIn) {
//       const [count, setCount] = useState(0)   // ❌ 조건문 안에서 훅 호출
//     }
//     ...
//   }
//
// 훅 호출은 조건 밖 '컴포넌트 최상위'에서 하고,
// 조건(로그인 여부)에 따라 '무엇을 보여줄지'는 JSX에서 정해야 한다.

export default function PracticeHookRule() {
  const [loggedIn, setLoggedIn] = useState(true)

  // 🟢 TODO 1: count 상태를 여기(최상위 — 조건문 밖)에서 만든다.
  //           힌트: const [count, setCount] = useState(0)
  const count = 0
  const setCount = () => {}

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
          {/* 🟢 TODO 2: 클릭하면 count를 1 늘린다. 힌트: onClick={() => setCount(count + 1)} */}
          <button>출석 체크</button>
        </>
      ) : (
        <p className="demo-desc">로그인하면 출석 체크를 할 수 있다.</p>
      )}
    </div>
  )
}
