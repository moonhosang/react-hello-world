import { useState } from 'react'

// 🟡 쉬움 — sayHi와 버튼(넘기기)은 됐다. doTwice가 '받은 함수를 두 번 실행'하도록 본문을 채운다.

export default function PracticeL2() {
  const [log, setLog] = useState([])
  const push = (m) => setLog((l) => [m, ...l].slice(0, 6))
  const sayHi = () => push('👋 안녕!')

  const doTwice = (fn) => {
    // TODO: 넘겨받은 fn을 두 번 실행한다. (예: fn(); fn())
  }

  return (
    <div>
      <div className="button-row">
        <button className="chip on" onClick={() => doTwice(sayHi)}>두 번 인사</button>
        <button className="chip" onClick={() => setLog([])}>지우기</button>
      </div>
      <div className="tree-box" style={{ marginTop: 10 }}>
        {log.length === 0
          ? <div className="demo-desc">doTwice 본문이 비어 있어 눌러도 조용하다. fn을 두 번 부르자.</div>
          : <ul className="section-list" style={{ margin: 0 }}>{log.map((l, i) => <li key={i}>{l}</li>)}</ul>}
      </div>
    </div>
  )
}
