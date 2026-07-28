// 🗺️ 로드맵 — 앞으로 다룰 내용(백로그)을 화면에 보여준다.
// 소스는 저장소 루트 TODO.md와 같은 내용을 손으로 옮긴 게 아니라, 여기서 데이터로 관리한다.
// (TODO.md는 개발용 메모, 이 페이지는 학습자에게 보이는 목차다.)

const GROUPS = [
  {
    badge: '🔴',
    label: '높음 — 곧 다룰 것',
    items: [
      {
        t: '용어 사전 (glossary)',
        d: '은근히 어려운 말들을 한 곳에 모아 한 줄 정의 + 쓰인 레슨 링크.',
        sub: ['JS·React 용어 총정리', '용어 클릭 → 정의로 점프'],
      },
      {
        t: '8-1 분리 (과적 해소)',
        d: 'intro치고 무겁다 → "useEffect 소개"와 "왜/어떻게 동작하나"로 나눈다.',
        sub: ['구조·네비 변경이라 진행 전 확인 필요'],
      },
    ],
  },
  {
    badge: '🟡',
    label: '중간',
    items: [
      { t: '클래스 컴포넌트 & 에러 바운더리 정식 소개', d: '데모에서 쓰는데 정작 안 가르친다.' },
      { t: 'React DevTools 사용법', d: '컴포넌트 트리·props·state·리렌더 하이라이트 보는 법.' },
      { t: '비동기 상태 3형태 패턴', d: 'loading / error / success를 한 곳에서 다루는 표준 형태.' },
    ],
  },
  {
    badge: '⚪',
    label: '낮음 / 선택',
    items: [
      { t: '스타일링 생태계', d: 'styled-components · Tailwind · CSS 모듈 (별도 트랙).' },
      { t: '폰트·이미지 렌더링', d: 'public vs src, @font-face.' },
      { t: '커스텀 훅 심화', d: '여러 커스텀 훅 조합·합성 패턴.' },
      { t: '라우팅 맛보기', d: 'react-router (입문 후반 or 별책).' },
    ],
  },
]

// 이미 만든 것 — 클릭하면 해당 레슨으로 이동
const DONE = [
  { t: 'JSX 문법 규칙 6가지', to: 1.46 },
  { t: 'children / 컴포넌트 합성', to: 2.3 },
  { t: '이벤트 전파 & 전개 props', to: 3.3 },
  { t: '조건부 렌더링 3패턴 + 0 함정', to: 4.5 },
  { t: 'useEffect 동기화·유용성·완성해보기·5-5 연결', to: 8.1 },
  { t: '입력: useRef 제거 → 단방향 데이터 흐름', to: 4 },
  { t: '🟨 JS 트랙 — JS 기본 6강 (트랙 탭으로 분리)', to: 'js-intro' },
]

export default function Roadmap({ onGo }) {
  return (
    <section>
      <header className="lesson-header">
        <span className="badge">🗺️</span>
        <h2>로드맵 — 앞으로 다룰 내용</h2>
        <p>지금 교재에 없지만 언젠가 추가할 것들이다. 우선순위별로 정리했다. (아이디어가 생기면 여기에 쌓인다.)</p>
      </header>

      {GROUPS.map((g) => (
        <div key={g.label}>
          <h3 className="section-title">{g.badge} {g.label}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {g.items.map((it) => (
              <div className="card" key={it.t}>
                <div className="file-label">{g.badge} {it.t}</div>
                <p className="section-desc" style={{ margin: '2px 0 0' }}>{it.d}</p>
                {it.sub && (
                  <ul className="section-list" style={{ marginTop: 6 }}>
                    {it.sub.map((s) => <li key={s}>{s}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      <h3 className="section-title">✅ 이미 만든 것</h3>
      <p className="section-desc">항목을 누르면 그 레슨으로 이동한다.</p>
      <div className="chip-row" style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {DONE.map((d) => (
          <button key={d.t} className="chip" onClick={() => onGo(d.to)}>✅ {d.t}</button>
        ))}
      </div>
    </section>
  )
}
