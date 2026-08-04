// ✅ 정답 (다른 예시) — 함수를 값으로 map에 '넘긴다'. map이 원소마다 double을 대신 부른다.
export default function SolutionFuncMap() {
  const nums = [1, 2, 3]
  const double = (n) => n * 2 // 함수를 값으로 만든다
  const doubled = nums.map(double) // double을 괄호 없이 '넘기면' 원소마다 대신 불린다 → [2, 4, 6]

  return (
    <div className="tree-box">
      <div className="demo-desc">nums.map(double) 결과:</div>
      <b>[{doubled.join(', ')}]</b>
    </div>
  )
}
