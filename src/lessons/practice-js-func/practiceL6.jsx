// ⚫ 처음부터 (다른 예시) — 함수를 map에 '넘기기'.
// double 함수를 만들어 [1,2,3].map(double)로 [2,4,6]을 만든다. (👀 정답 보기로 비교하라)

export default function PracticeL6() {
  const nums = [1, 2, 3]

  // TODO A: double 함수를 만든다. (const double = (n) => n * 2)
  // TODO B: nums.map(double)로 doubled를 만든다. (괄호 없이 '넘기기')
  const doubled = [] // TODO B: nums.map(double)

  return (
    <div className="tree-box">
      <div className="demo-desc">nums.map(double) 결과:</div>
      <b>{doubled.length ? `[${doubled.join(', ')}]` : '(아직 비어 있음)'}</b>
    </div>
  )
}
