import { useState } from 'react'

// ⚫ 도전 — 껍데기만 있다. 함수는 값이다: sayHi 담기 → doTwice(sayHi)로 넘기기 → 두 번 실행.
// 처음부터 만들어 '두 번 인사'를 완성한다. (👀 정답 보기로 비교하라)

export default function PracticeL5() {
  const [log, setLog] = useState([])
  const push = (m) => setLog((l) => [m, ...l].slice(0, 6))

  // TODO: sayHi와 doTwice를 만들고, 아래 '두 번 인사' 버튼에 연결한다.

  return (
    <div>
      <div className="button-row">
        <button className="chip on">두 번 인사</button>
        <button className="chip" onClick={() => setLog([])}>지우기</button>
      </div>
      <div className="tree-box" style={{ marginTop: 10 }}>
        {log.length === 0
          ? <div className="demo-desc">여기에 '👋 안녕!' 로그가 두 줄씩 쌓이게 만들자.</div>
          : <ul className="section-list" style={{ margin: 0 }}>{log.map((l, i) => <li key={i}>{l}</li>)}</ul>}
      </div>
    </div>
  )
}
