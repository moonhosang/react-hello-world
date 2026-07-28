// 렌더 지문: 리렌더될 때마다 Math.random()이 다시 찍혀 숫자가 바뀐다.
// → 어떤 컴포넌트가 다시 렌더됐는지(또는 안 됐는지)를 눈으로 확인하는 용도.
export function RenderTag() {
  return <span className="render-tag">렌더 {Math.random().toFixed(3)}</span>
}
