import { useState } from 'react'

// ⚫ 도전 — 껍데기만. 이름 기본값(||)과 프로필 가드(&&)를 처음부터 만든다. (👀 정답 보기로 비교)

export default function PracticeL5() {
  const [name, setName] = useState('')
  const [user, setUser] = useState(null)

  // TODO: 아래에 입력창 · 로그인 버튼 · 표시(name || '손님', user && 프로필)를 만든다.
  //   힌트: setUser(user ? null : { name: '김코딩' })로 로그인/로그아웃을 토글한다.

  return (
    <div className="tree-box">
      <span className="demo-desc">여기에 이름 입력 · 로그인 · 인사말(손님 기본값) · 프로필(로그인 시)을 만들자</span>
    </div>
  )
}
