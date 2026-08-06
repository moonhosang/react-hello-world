// ② useMemo — 무거운 계산을 memo해서, 관련 없는 상태가 바뀔 때 재계산을 건너뛴다.
// 왼쪽(useMemo 없음)과 오른쪽(useMemo 있음)을 같은 상태로 구동해 '계산 횟수'를 대조한다.
import { useState, useMemo, useRef } from 'react'

// 일부러 무거운 계산: 큰 반복으로 합을 구한다. (실제로 몇 ms 걸리는 정도)
function heavySum(size) {
  let total = 0
  for (let i = 0; i < size * 1_000_000; i++) {
    total += i % 7
  }
  return total
}

export function UseMemoDemo() {
  const [size, setSize] = useState(1) // 계산의 입력 (바뀌면 재계산이 필요함)
  const [bump, setBump] = useState(0) // 계산과 관련 없는 상태 (바뀌어도 결과는 그대로여야 함)

  // 실제로 heavySum이 몇 번 돌았는지 세는 카운터 (렌더 중 증가시켜 눈으로 확인)
  const plainCount = useRef(0)
  const memoCount = useRef(0)

  // useMemo 없음 — 렌더될 때마다 무조건 다시 계산한다. bump만 눌러도 재계산.
  plainCount.current += 1
  const resultPlain = heavySum(size)

  // useMemo 있음 — [size]가 바뀔 때만 다시 계산한다. bump가 바뀌면 이전 결과를 재사용.
  const resultMemo = useMemo(() => {
    memoCount.current += 1
    return heavySum(size)
  }, [size])

  return (
    <div>
      <div className="chip-row" style={{ marginBottom: 12 }}>
        <button className="chip on" onClick={() => setSize((s) => s + 1)}>
          🧮 계산 입력 바꾸기 (size: {size})
        </button>
        <button className="chip" onClick={() => setBump((b) => b + 1)}>
          🎲 관련 없는 상태 (bump: {bump})
        </button>
      </div>

      <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div className="tree-box" style={{ padding: 12 }}>
          <div style={{ fontWeight: 600, marginBottom: 4 }}>🔁 useMemo 없음</div>
          <div style={{ fontSize: 13 }}>결과: {resultPlain}</div>
          <div style={{ fontSize: 13, color: 'crimson', fontWeight: 600 }}>
            계산 실행 횟수: {plainCount.current}
          </div>
        </div>
        <div className="tree-box" style={{ padding: 12 }}>
          <div style={{ fontWeight: 600, marginBottom: 4 }}>✅ useMemo 있음</div>
          <div style={{ fontSize: 13 }}>결과: {resultMemo}</div>
          <div style={{ fontSize: 13, color: 'green', fontWeight: 600 }}>
            계산 실행 횟수: {memoCount.current}
          </div>
        </div>
      </div>

      <p className="section-desc" style={{ margin: '10px 0 0', fontSize: 12 }}>
        <b>🎲 관련 없는 상태</b>를 눌러보라. 왼쪽 계산 횟수는 <b>계속 오르지만</b>,
        오른쪽(useMemo)은 <b>그대로</b>다 — <code>size</code>가 안 바뀌면 재계산을 건너뛰기 때문이다.
        <br />
        <b>🧮 계산 입력</b>을 바꾸면 그때는 양쪽 다 계산 횟수가 오른다.
      </p>
    </div>
  )
}
