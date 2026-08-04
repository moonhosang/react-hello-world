import { useState } from 'react'

const fakeFetch = () => new Promise((res) => setTimeout(() => res('김코딩'), 800))

// ⚫ 도전 — 껍데기만 있다. 불러오기 버튼을 처음부터 만들자.
// 할 일:
//   TODO A: user, loading state 선언
//   TODO B: async load 함수 (로딩 켜기 → await fakeFetch() → setUser → 로딩 끄기)
//   TODO C: 버튼(불러오는 중이면 '⏳ 불러오는 중…')과 결과(👤 이름 / (아직 없음)) 표시
export default function PracticeL5() {
  // TODO A: 여기에 state 두 개

  // TODO B: 여기에 async load

  return (
    <div className="demo-card" style={{ padding: 12 }}>
      {/* TODO C: 버튼 + 결과 */}
      여기에 불러오기 버튼을 만들자
    </div>
  )
}
