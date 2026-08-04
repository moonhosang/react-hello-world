import { useState } from 'react'

// 🟢 아주 쉬움 — 거의 다 됐다. '두 번 인사' 버튼의 onClick 한 줄만 채운다.
// sayHi(함수 값)와 doTwice(콜백 실행)는 이미 있다. 버튼에서 sayHi를 doTwice에 넘기기만 하면 된다.

export default function PracticeL1() {
  const [log, setLog] = useState([])
  const push = (m) => setLog((l) => [m, ...l].slice(0, 6))
  const sayHi = () => push('👋 안녕!')
  const doTwice = (fn) => { fn(); fn() }

  return (
    <div>
      <div className="button-row">
        {/* TODO: 클릭하면 doTwice에 sayHi를 '넘겨' 두 번 실행한다 → onClick={() => doTwice(sayHi)} */}
        <button className="chip on" onClick={() => {}}>두 번 인사</button>
        <button className="chip" onClick={() => setLog([])}>지우기</button>
      </div>
      <div className="tree-box" style={{ marginTop: 10 }}>
        {log.length === 0
          ? <div className="demo-desc">지금은 버튼이 아무 일도 안 한다. onClick을 채우자.</div>
          : <ul className="section-list" style={{ margin: 0 }}>{log.map((l, i) => <li key={i}>{l}</li>)}</ul>}
      </div>
    </div>
  )
}
