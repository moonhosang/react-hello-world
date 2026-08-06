// 섹션 ① 상태 로직 재사용 — '훅 없이 ↔ 훅으로'를 나란히 라이브로 비교한다.
//
// 핵심: 아래 <pre>에 보이는 코드는 손으로 옮겨 적은 게 아니라, Vite의 ?raw import로
// 실제 파일(ReuseNoHook.jsx / ReuseWithHook.jsx)의 소스를 '그대로' 문자열로 가져온 것이다.
// 그래서 '보이는 코드 = 실제로 도는 코드'가 항상 100% 일치한다.

// 실행용(정상 import) — 화면에 라이브로 렌더한다
import ReuseNoHook from './ReuseNoHook.jsx'
import ReuseWithHook from './ReuseWithHook.jsx'

// 표시용(?raw import) — 같은 파일의 소스 코드를 '문자열'로 가져온다
import noHookRaw from './ReuseNoHook.jsx?raw'
import withHookRaw from './ReuseWithHook.jsx?raw'

import CodeBlock from '../../../components/CodeBlock.jsx'

export default function ReuseLogicDemo() {
  return (
    <div className="two-col">
      {/* 왼쪽 ── ❌ 훅 없이 : 라이브 결과 먼저, 코드는 접어 둔다 */}
      <div className="card">
        <ReuseNoHook />
        <p className="demo-desc">
          ⚠️ 동작은 잘 되지만, <b>같은 불러오기 로직이 두 벌</b> 복붙돼 있다. 화면 열 곳에서 쓰면 열 벌이 된다.
        </p>
        <CodeBlock file="ReuseNoHook.jsx" code={noHookRaw} />
      </div>

      {/* 오른쪽 ── ✅ 훅으로 */}
      <div className="card">
        <ReuseWithHook />
        <p className="demo-desc">
          ✅ 똑같이 동작하지만 <b>불러오기 로직은 한 곳</b>(useFetchUser)이고, 쓰는 쪽은 <b>각각 한 줄</b>이다.
          래퍼 컴포넌트를 끼우지 않아 <b>트리 구조도 그대로</b>다.
        </p>
        <CodeBlock file="ReuseWithHook.jsx" code={withHookRaw} />
      </div>
    </div>
  )
}
