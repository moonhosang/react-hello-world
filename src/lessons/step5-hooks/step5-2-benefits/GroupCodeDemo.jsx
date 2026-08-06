// 섹션 ② 관련 코드끼리 묶기 — '훅 없이(클래스) ↔ 훅으로(useCountdown)'를 나란히 본다.
//
// 핵심: 아래 <pre>에 보이는 코드는 Vite의 ?raw import로 실제 파일
// (CountdownClass.jsx / CountdownHook.jsx)의 소스를 '그대로' 문자열로 가져온 것이다.
// 왼쪽(클래스)은 코드만 보여 주고, 오른쪽(훅)은 라이브로 마운트/언마운트하며 정리 실행을 확인한다.

// 실행용(정상 import) — 오른쪽만 라이브로 렌더한다
import CountdownHook from './CountdownHook.jsx'

// 표시용(?raw import) — 두 파일의 소스 코드를 '문자열'로 가져온다
import classRaw from './CountdownClass.jsx?raw'
import hookRaw from './CountdownHook.jsx?raw'

import CodeBlock from '../../../components/CodeBlock.jsx'

export default function GroupCodeDemo() {
  return (
    <div className="two-col">
      {/* 왼쪽 ── ❌ 훅 없이(클래스): 코드만(접이식) 보여 준다 */}
      <div className="card">
        <p className="demo-desc">
          ⚠️ 클래스는 하나의 카운트다운인데도 <b>시작(componentDidMount)</b>과 <b>정리(componentWillUnmount)</b>가
          <b> 서로 다른 메서드로 흩어진다.</b> 생명주기 '시점' 기준으로 코드가 갈라진 것이고, 재사용하기도 어렵다.
        </p>
        <CodeBlock file="CountdownClass.jsx" code={classRaw} />
      </div>

      {/* 오른쪽 ── ✅ 훅으로: 라이브로 정리 확인, 코드는 접어 둔다 */}
      <div className="card">
        <CountdownHook />
        <p className="demo-desc" style={{ marginTop: 10 }}>
          ✅ 훅은 <b>시작 + 정리(return)</b>를 <b>한 곳</b>에 모은다. 토글로 <b>언마운트</b>하면 시작 옆에 적어 둔
          <b> 정리</b>가 도는 걸 위 로그로 볼 수 있다. 게다가 이 로직은 <b>재사용</b>도 된다.
        </p>
        <CodeBlock file="CountdownHook.jsx" code={hookRaw} />
      </div>
    </div>
  )
}
