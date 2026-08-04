import { useState } from 'react'

// ✅ 정답 — 함수는 값이다: 변수에 담고(sayHi), 콜백으로 넘기고(doTwice(sayHi)), 실행한다(fn()).
export default function SolutionFuncValue() {
  const [log, setLog] = useState([])
  const push = (m) => setLog((l) => [m, ...l].slice(0, 6))
  const sayHi = () => push('👋 안녕!') // 함수를 변수에 담는다 (괄호 없이)
  const doTwice = (fn) => { fn(); fn() } // 받은 함수를 두 번 실행한다

  return (
    <div>
      <div className="button-row">
        <button className="chip on" onClick={() => doTwice(sayHi)}>두 번 인사</button>
        <button className="chip" onClick={() => setLog([])}>지우기</button>
      </div>
      <div className="tree-box" style={{ marginTop: 10 }}>
        {log.length === 0
          ? <div className="demo-desc">버튼을 누르면 sayHi가 두 번 실행돼 로그가 쌓인다.</div>
          : <ul className="section-list" style={{ margin: 0 }}>{log.map((l, i) => <li key={i}>{l}</li>)}</ul>}
      </div>
    </div>
  )
}
