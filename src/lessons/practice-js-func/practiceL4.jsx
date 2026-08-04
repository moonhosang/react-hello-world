import { useState } from 'react'

// 🟣 어려움 — 로그(push)만 있다. sayHi와 doTwice를 만들고 버튼에 연결한다.

export default function PracticeL4() {
  const [log, setLog] = useState([])
  const push = (m) => setLog((l) => [m, ...l].slice(0, 6))

  // TODO A: '👋 안녕!'을 로그에 남기는 함수 sayHi를 만든다. (const sayHi = () => push('👋 안녕!'))
  // TODO B: 함수를 두 번 실행하는 doTwice를 만든다. (const doTwice = (fn) => { fn(); fn() })

  return (
    <div>
      <div className="button-row">
        {/* TODO C: 클릭하면 doTwice(sayHi)를 부른다 */}
        <button className="chip on" onClick={() => {}}>두 번 인사</button>
        <button className="chip" onClick={() => setLog([])}>지우기</button>
      </div>
      <div className="tree-box" style={{ marginTop: 10 }}>
        {log.length === 0
          ? <div className="demo-desc">sayHi·doTwice를 만들고 버튼에 이으면 완성이다.</div>
          : <ul className="section-list" style={{ margin: 0 }}>{log.map((l, i) => <li key={i}>{l}</li>)}</ul>}
      </div>
    </div>
  )
}
