// 복잡한 컴포넌트 — props도 state도 없지만, 내부 '구조'는 얼마든지 커질 수 있다.
// 여기서 쓰는 계산·목록·조건은 전부 평범한 자바스크립트다.
// (목록을 만드는 .map은 6단계에서 자세히 다룬다. 지금은 "그냥 JS다" 정도로 보자.)

export default function WeatherWidget() {
  const city = '서울'
  const temp = 26

  // 화면에 뿌릴 상세 정보. 그냥 배열이다.
  const details = [
    { label: '습도', value: '60%' },
    { label: '바람', value: '3 m/s' },
    { label: '체감', value: '28°' },
  ]

  // 조건에 따라 다른 문구를 고른다 (삼항 연산자, 이것도 그냥 JS)
  const mood = temp >= 25 ? '더운 날 ☀️' : '선선한 날 🍃'

  return (
    <div className="weather">
      <div className="weather-head">
        <span className="weather-city">📍 {city}</span>
        <span className="weather-mood">{mood}</span>
      </div>
      <div className="weather-temp">{temp}°</div>
      <ul className="weather-details">
        {details.map((d) => (
          <li key={d.label}>
            <span>{d.label}</span>
            <b>{d.value}</b>
          </li>
        ))}
      </ul>
    </div>
  )
}
