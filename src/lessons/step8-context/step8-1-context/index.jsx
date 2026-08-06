// 8-1 · prop drilling → Context로 해결
// 깊은 자식이 쓰려고 중간 컴포넌트가 필요도 없는 props를 줄줄이 전달하는 문제(prop drilling)와,
// 그걸 없애는 Context를 한 페이지에서 before/after로 본다.
//
// 데모는 개념별로 파일을 나눴다:
//   DrillingDemo.jsx      · 😩 문제(prop drilling 5단계)
//   ContextDemo.jsx       · ✅ 해결(Context)
//   NicknameExercise.jsx  · 💡 닉네임 추가 실습
//   HookPatternDemo.jsx   · ✨ 실무 패턴(커스텀 훅 + Provider)
//   RerenderCaveat.jsx    · ⚠️ 리렌더 유의사항(테마 Context)
//   NestedProviderDemo.jsx· 🎯 중첩 Provider(가장 가까운 값)
//   UserContext.js        · 공용 사용자 Context
//   AuthContext.jsx       · 실무 패턴용 캡슐화 Context(useAuth/AuthProvider)
//   RenderTag.jsx         · 렌더 지문(Math.random) 공용 helper

import { useState } from 'react'
import { UserContext } from './UserContext.js'
import { DrillPage } from './DrillingDemo.jsx'
import { CtxPage } from './ContextDemo.jsx'
import { NicknameExercise } from './NicknameExercise.jsx'
import { HookPatternDemo } from './HookPatternDemo.jsx'
import { RerenderCaveat } from './RerenderCaveat.jsx'
import { NestedContextDemo } from './NestedProviderDemo.jsx'
import SourceTrace from '../../../components/SourceTrace.jsx'

// Context — Provider로 값을 흘리고, 깊은 자식이 useContext로 직접 꺼낸다(중간은 props 없음).
const CTX_CODE = `<UserContext.Provider value={user}>   // 통로에 값을 흘린다
  <Page />                            // 중간은 user를 안 받는다
</UserContext.Provider>

function CtxBadge() {                  // 깊은 자식(leaf)
  const user = useContext(UserContext) // 통로에서 직접 꺼낸다
  return <b>{user.name}</b>
}`

const CTX_STEPS = [
  {
    hl: [1],
    tag: '① Provider',
    t: 'value로 통로에 값을 흘린다',
    d: (<><code>&lt;UserContext.Provider value={'{user}'}&gt;</code>로 감싼 범위 <b>어디서든</b> 이 <code>user</code>를 꺼낼 수 있게 통로에 흘린다.</>),
  },
  {
    hl: [2],
    tag: '② 중간 통과',
    t: '중간 컴포넌트는 props를 안 받는다',
    d: (<><code>Page</code>·<code>Sidebar</code> 같은 중간 컴포넌트는 <code>user</code>를 <b>props로 받지 않는다.</b> 그냥 자식을 그릴 뿐 — prop drilling이 사라진다.</>),
  },
  {
    hl: [5, 6],
    tag: '③ leaf가 꺼냄',
    t: 'useContext로 직접 꺼낸다',
    d: (<>깊은 <code>CtxBadge</code>가 <code>useContext(UserContext)</code>로 <b>가장 가까운 Provider</b>의 값을 직접 꺼낸다. 아무리 깊어도 한 줄.</>),
    note: 'user.name = 김코딩',
  },
  {
    hl: [1],
    tag: '④ 값 변경',
    t: '구독한 곳만 리렌더된다',
    d: (<>이름을 바꿔 <code>value</code>가 바뀌면, <code>useContext</code>로 <b>구독한 컴포넌트만</b> 리렌더된다. 값을 안 쓰는 중간 컴포넌트는 그대로.</>),
  },
  {
    tag: '⑤ 새 객체 주의',
    t: 'value에 매번 새 객체면 전부 리렌더',
    d: (<><code>value={'{{ ...user }}'}</code>처럼 매 렌더 <b>새 객체</b>를 넣으면 값이 안 바뀌어도 참조가 달라 <b>구독자 전부</b>가 리렌더된다 → <code>useMemo</code>로 value를 고정한다.</>),
  },
]

const NAMES = ['김코딩', '이해커', '박리액트', '최프론트']

export default function Step7_1() {
  const [user, setUser] = useState({ name: NAMES[0], role: '입문자' })
  // 맨 위 상태의 이름만 바꾼다 → drilling은 5단계를 타고, Context는 통로로 흘러 leaf까지 반영된다.
  const changeName = () =>
    setUser((u) => ({ ...u, name: NAMES[(NAMES.indexOf(u.name) + 1) % NAMES.length] }))

  return (
    <section>
      <header className="lesson-header">
        <span className="badge context-badge">8-1</span>
        <h2>prop drilling → Context</h2>
        <p>깊은 곳에서 쓰려고 중간이 props를 줄줄이 전달하는 문제를, Context로 없앤다.</p>
      </header>

      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 학습 포인트</span>
        <p>Context는 중간 컴포넌트를 거치지 않고, 값을 필요한 자식이 트리 어디서든 직접 꺼내 쓰게 하는 통로다.</p>
      </div>

      <div className="concept">
        <p className="concept-lead">
          <code>user</code>는 맨 위에서 만들었는데 쓰는 곳은 <b>맨 아래</b>다. 중간 컴포넌트가 필요도 없는 props를
          <b> 전달만</b> 하려고 받는 게 <b>prop drilling</b>. Context는 이걸 없앤다.
        </p>
      </div>

      <h3 className="section-title">😩 문제 — prop drilling (5단계 깊이)</h3>
      <span className="learn-tag">📎 학습 포인트 · 안 쓰는 중간 컴포넌트가 props를 받아 넘기기만 하는 게 prop drilling이다</span>
      <p className="section-desc">
        <code>user</code>가 쓰이는 곳까지 <b>5단계</b>를 내려간다. 중간의
        <code> Page</code>·<code>Layout</code>·<code>Sidebar</code>·<code>Panel</code>·<code>Profile</code> 다섯 컴포넌트는
        <code> user</code>를 쓰지도 않는데 받아서 넘기기만 한다.
      </p>
      <div className="card">
        <div className="file-label">📄 DrillingDemo.jsx · props로 줄줄이 전달</div>
        <button className="chip on" onClick={changeName} style={{ marginBottom: 8 }}>
          ✏️ 이름 바꾸기 (현재: {user.name})
        </button>
        <p className="section-desc" style={{ margin: '0 0 8px', fontSize: 12 }}>
          각 단계에 <code>Math.random()</code> 렌더 지문. 이름을 바꾸면 <b>①~leaf 지문이 전부 바뀐다</b> → 5단계가 다 리렌더.
        </p>
        <DrillPage name={user.name} role={user.role} />
      </div>

      <div className="try-it">
        <h4>💡 해보기 — 닉네임을 추가해보세요</h4>
        <p className="section-desc" style={{ margin: '0 0 8px' }}>
          leaf 뱃지에 <code>@닉네임</code>도 띄우려 한다. <code>nickname</code>을 맨 아래까지 보내려면 몇 군데를 고쳐야 할까?
        </p>
        <ul>
          <li>맨 위에서 <code>nickname</code>을 넘기고,</li>
          <li>중간 5개(<code>Page·Layout·Sidebar·Panel·Profile</code>)가 <b>전부</b> <code>nickname</code>을 받아 다시 넘기고,</li>
          <li>leaf에서 <code>@{'{nickname}'}</code> 출력 → 총 <b>7군데</b>를 손대야 한다. 😩</li>
        </ul>
        <p className="section-desc" style={{ margin: '4px 0 0' }}>
          필드 하나 추가에 사슬 전체를 건드리는 것 — 이게 prop drilling의 진짜 비용이다.
        </p>
      </div>

      <h3 className="section-title">✅ 해결 — Context</h3>
      <span className="learn-tag">📎 학습 포인트 · Provider로 감싸고 useContext로 꺼내면 중간은 props를 안 받는다</span>
      <p className="section-desc">
        <code>createContext</code>로 통로를 만들고 <code>&lt;Provider value&gt;</code>로 감싼다. 그러면 중간은 props를
        <b> 안 받고</b>, 필요한 자식만 <code>useContext</code>로 직접 꺼낸다.
      </p>
      <div className="card">
        <div className="file-label">📄 ContextDemo.jsx · Context</div>
        <button className="chip on" onClick={changeName} style={{ marginBottom: 8 }}>
          ✏️ 이름 바꾸기 (현재: {user.name})
        </button>
        <p className="section-desc" style={{ margin: '0 0 8px', fontSize: 12 }}>
          같은 렌더 지문. 이름을 바꿔도 <b>중간 ①~⑤ 지문은 그대로</b>고, <b>leaf 지문만 바뀐다</b> → 값을 쓰는 곳만 리렌더.
        </p>
        <UserContext.Provider value={user}>
          <CtxPage />
        </UserContext.Provider>
      </div>

      <span className="learn-tag">📎 학습 포인트 · Provider가 값을 흘리고, 깊은 자식이 useContext로 직접 꺼낸다 — 중간은 props 없음</span>
      <SourceTrace file="Context — Provider → useContext" code={CTX_CODE} steps={CTX_STEPS} />

      <div className="try-it">
        <h4>💡 실습 — 여기도 닉네임을 추가한다면?</h4>
        <p className="section-desc" style={{ margin: '0 0 10px' }}>
          아래 입력창에 닉네임을 쳐보라. leaf 뱃지에 <code>@닉네임</code>이 바로 붙는다.
          중간 <code>Page·Sidebar</code>는 <b>손도 안 댔다</b> — <code>value</code> 한 줄 + leaf 한 줄, <b>2군데</b>뿐이다.
          (drilling이라면 <b>7군데</b>를 고쳤어야 했다.)
        </p>
        <NicknameExercise />
      </div>

      <div className="try-it">
        <h4>💡 핵심</h4>
        <ul>
          <li>drilling판은 <b>5단계</b>가 전부 <code>name·role</code>을 받아 넘긴다 — 중간 하나만 바뀌어도 사슬 전체가 흔들린다.</li>
          <li>Context판의 5단계는 <code>user</code>를 <b>아무도 안 받는다.</b> (props 없음)</li>
          <li>필요한 <code>CtxBadge</code>만 <code>useContext(UserContext)</code>로 깊이와 상관없이 직접 꺼낸다.</li>
        </ul>
      </div>

      <h3 className="section-title">✨ 실무 패턴 — 커스텀 훅 + Provider</h3>
      <span className="learn-tag">📎 학습 포인트 · Context는 숨기고 Provider와 useAuth() 훅만 내보내 캡슐화한다</span>
      <p className="section-desc">
        실무에선 raw <code>createContext</code>/<code>useContext</code>를 그대로 안 쓴다. Context 객체는 파일 안에 <b>숨기고</b>,
        상태·로직을 담은 <code>&lt;AuthProvider&gt;</code>와 읽기 훅 <code>useAuth()</code>만 내보낸다.
        쓰는 쪽은 Context의 존재도 모른 채 <code>const {'{ user, login }'} = useAuth()</code>만 부른다.
      </p>
      <div className="card">
        <div className="file-label">📄 AuthContext.jsx · HookPatternDemo.jsx</div>
        <HookPatternDemo />
      </div>
      <div className="try-it">
        <h4>💡 이 패턴을 쓰는 이유</h4>
        <ul>
          <li><b>캡슐화</b> — 상태와 로직이 <code>AuthProvider</code> 한 곳에 모인다. 쓰는 쪽은 <code>useAuth()</code>만 안다.</li>
          <li><b>안전장치</b> — <code>createContext(undefined)</code> + 훅에서 검사 → <b>Provider 밖에서 쓰면 즉시 에러</b>(위 빨간 줄). 조용한 <code>undefined</code> 버그를 막는다.</li>
          <li><b>재사용</b> — 어디서든 <code>useAuth()</code> 한 줄. import할 Context 이름을 외울 필요도 없다.</li>
        </ul>
      </div>

      <h3 className="section-title">⚠️ 유의사항 — Context 값이 바뀌면 '쓰는 곳'이 리렌더된다</h3>
      <span className="learn-tag">📎 학습 포인트 · Context 값이 바뀌면 그 값을 구독하는 컴포넌트가 전부 리렌더된다</span>
      <p className="section-desc">
        <code>UserCard</code> 하나를 만들어 <b>세 곳</b>에서 재사용한다. 이 카드들은 테마(다크/라이트)를 <code>useContext</code>로 구독한다.
        각 카드에 <code>Math.random()</code>으로 <b>렌더 지문</b>을 찍었으니, 리렌더되면 숫자가 바뀐다.
        <b>다크모드 토글</b>을 눌러보라 — 테마를 <b>구독한 카드 셋은 전부</b> 지문이 바뀌고, 테마를 안 쓰는 아래 공지 카드(<code>memo</code>)만 그대로다.
      </p>
      <div className="card">
        <div className="file-label">📄 RerenderCaveat.jsx · 테마 Context를 여러 UserCard가 구독</div>
        <RerenderCaveat />
      </div>
      <div className="try-it">
        <h4>📌 그래서 조심할 점</h4>
        <ul>
          <li>Context 값을 바꾸면, 깊이와 무관하게 <b>그 값을 <code>useContext</code>로 쓰는 모든 컴포넌트</b>가 리렌더된다 — 카드가 100개면 100개가 다시 렌더된다.</li>
          <li><code>value</code>에 <b>매번 새 객체</b>(<code>value={'{{ dark }}'}</code>)를 넣으면, 값이 안 바뀌어도 참조가 달라 <b>구독자 전부</b>가 리렌더된다 → <code>useMemo</code>로 값을 고정하라.</li>
          <li>그래서 "자주 바뀌는 값"과 "거의 안 바뀌는 값"은 Context를 <b>나눠</b> 두는 게 좋다.</li>
        </ul>
      </div>

      <h3 className="section-title">🎯 보너스 — 중첩 Provider: 가장 가까운 값을 찾는다</h3>
      <span className="learn-tag">📎 학습 포인트 · Provider를 겹치면 useContext는 가장 가까운 Provider 값을 읽는다</span>
      <p className="section-desc">
        같은 <code>UserContext</code>를 <b>두 번 겹쳐</b> 감쌌다. 바깥은 <b>김코딩(관리자)</b>, 안쪽은 <b>게스트(손님)</b>로 덮어썼다.
        바깥·안쪽 <b>닉네임을 각각 입력</b>해보라 — 각 스코프의 값(닉네임 포함)이 <code>useContext</code>로 읽힐 때
        <b> 가장 먼저 만난(가장 가까운) Provider</b>의 것으로 결정된다. CSS·변수 스코프의 섀도잉과 같다.
      </p>
      <div className="card">
        <div className="file-label">📄 NestedProviderDemo.jsx · 중첩 Provider</div>
        <NestedContextDemo />
      </div>
      <div className="try-it">
        <h4>💡 왜 쓸까</h4>
        <ul>
          <li>앱 전체는 로그인 사용자로 두고, <b>특정 영역만</b> 다른 값으로 임시 override 할 때 (예: "손님 미리보기").</li>
          <li>안쪽 영역을 벗어나면 다시 <b>바깥 값</b>으로 돌아온다 — Provider의 범위(트리 하위)만큼만 유효하다.</li>
        </ul>
      </div>
    </section>
  )
}
