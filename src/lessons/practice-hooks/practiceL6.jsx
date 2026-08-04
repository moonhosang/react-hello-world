// 🎯 처음부터 (다른 예시) — useCounter 커스텀 훅
// 같은 기술(useState를 감싼 커스텀 훅)을 다른 예시로 한 번 더. 빈 화면에서 처음부터.
// 할 일:
//   TODO A: function useCounter(start = 0) 를 만든다 — useState로 count를 두고,
//           increment(+1)와 reset(start로)을 만들어 { count, increment, reset } 를 반환한다.
//           (훅은 반드시 컴포넌트/훅 최상위에서 호출 — 조건문·반복문 안 ❌)
//   TODO B: 컴포넌트 최상위에서 const { count, increment, reset } = useCounter(0) 로 쓰고,
//           숫자와 [+1]·[리셋] 버튼을 그린다.

export default function PracticeL6() {
  return (
    <div className="demo-card" style={{ padding: 12 }}>
      여기에 useCounter를 만들어 카운터를 완성하자 (count · +1 · 리셋)
    </div>
  )
}
