import { useState } from 'react'

// 🔴 중간 — sayHi는 있다. doTwice 함수를 직접 만들고, 버튼에서 sayHi를 넘겨 부른다.

export default function PracticeL3() {
  const [log, setLog] = useState([])
  const push = (m) => setLog((l) => [m, ...l].slice(0, 6))
  const sayHi = () => push('👋 안녕!')

  // TODO A: 함수를 받아 두 번 실행하는 doTwice를 만든다.
  //   const doTwice = (fn) => { fn(); fn() }

  return (
    <div>
      <div className="button-row">
        {/* TODO B: 클릭하면 doTwice(sayHi)를 부른다 → onClick={() => doTwice(sayHi)} */}
        <button className="chip on" onClick={() => {}}>두 번 인사</button>
        <button className="chip" onClick={() => setLog([])}>지우기</button>
      </div>
      <div className="tree-box" style={{ marginTop: 10 }}>
        {log.length === 0
          ? <div className="demo-desc">doTwice를 만들고 버튼에 연결하면 로그가 두 줄씩 쌓인다.</div>
          : <ul className="section-list" style={{ margin: 0 }}>{log.map((l, i) => <li key={i}>{l}</li>)}</ul>}
      </div>
    </div>
  )
}
