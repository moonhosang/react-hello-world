// 컴포넌트 안에서도 자바스크립트를 그대로 쓸 수 있다.
// return 위에서 계산한 값을 JSX 안에 {중괄호}로 꽂아 넣는다.

export default function Clock() {
  // 그냥 평범한 자바스크립트다.
  const now = new Date()
  const time = now.toLocaleTimeString('ko-KR')

  return (
    <div className="clock">
      🕐 이 컴포넌트가 처음 그려진 시각: <b>{time}</b>
      <small style={{ display: 'block', marginTop: 4, opacity: 0.7 }}>
        이 시계는 왜 안 흐를까? → 9-2(정리)에서 useEffect로 살아 움직이게 만든다.
      </small>
    </div>
  )
}
