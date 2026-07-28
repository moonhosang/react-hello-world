// 조립(composite) 컴포넌트 — 앞의 단순·복잡 컴포넌트들을 모아 더 큰 화면 하나로 만든다.
// 핵심: 큰 컴포넌트도 결국 '작은 컴포넌트들의 조합'일 뿐이다.
// 같은 Greeting/Clock을 화면 위쪽(단독)에서도, 여기(Dashboard 안)에서도 재사용하고 있다.

import Announcement from './Announcement.jsx'
import Greeting from './Greeting.jsx'
import Clock from './Clock.jsx'
import WeatherWidget from './WeatherWidget.jsx'

export default function Dashboard() {
  return (
    <div className="dashboard">
      {/* 같은 Announcement를 3번 재사용한다. 정의는 하나(Announcement.jsx), 사용은 여러 번. */}
      <Announcement />
      <Announcement />
      <Announcement />
      {/* 사용자 칩(Greeting)도 2번 재사용. <Greeting /> 한 줄 더 쓰면 끝. */}
      <Greeting />
      <Greeting />
      <Clock />
      <WeatherWidget />
    </div>
  )
}
