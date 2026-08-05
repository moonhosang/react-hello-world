// 🆕 변경 내역 — 커리큘럼에 무엇이 언제 추가·개편됐는지 손으로 정리한 목록.
// 새 항목을 추가할 땐 맨 위에 한 덩어리를 넣는다. d(날짜)가 최신 = 자동 팝업 기준.

const ENTRIES = [
  {
    d: '2026-08-05',
    t: '동작 과정 트레이스 + 용어 사전 팝업',
    items: [
      'useEffect(9-1~9-5)·상태(3-1·3-2)·Props(2-1~2-3)에 "코드가 도는 순서" 단계별 트레이스 추가 — 소스를 보며 실행 줄을 따라간다.',
      '용어 사전을 어느 강의에서든 팝업으로 열 수 있게 (사이드바 런처 · 단축키 G).',
      '변경 내역 팝업 추가 — 새 항목이 생기면 한 번 알려준다.',
    ],
  },
  {
    d: '2026-08-04',
    t: '용어 사전 개편',
    items: [
      'JS·React 용어 총정리(glossary) 추가.',
      '카테고리별 클릭 목록 — 용어를 누르면 상세로 바로 이동.',
    ],
  },
  {
    d: '2026-08-03',
    t: '실전 앱 조립 단계',
    items: ['Lv1~3을 조립(X-1) + 완성(X-2)으로 분리해 난이도를 낮췄다.'],
  },
]

// 자동 팝업 판단 기준 — 가장 최신 항목의 날짜. 이 값이 저장된 것과 다르면 "새 게 있다".
export const CHANGELOG_LATEST = ENTRIES[0].d

export default function Changelog() {
  return (
    <section>
      <header className="lesson-header">
        <span className="badge">🆕 변경 내역</span>
        <h2>무엇이 바뀌었나</h2>
        <p>커리큘럼에 새로 추가·개편된 것들이다. 최신이 맨 위.</p>
      </header>

      <div className="changelog">
        {ENTRIES.map((e, i) => (
          <div className="changelog-entry" key={e.d}>
            <div className="changelog-date">
              {e.d}
              {i === 0 && <span className="changelog-latest">최신</span>}
            </div>
            <div className="changelog-body">
              <b className="changelog-title">{e.t}</b>
              <ul className="section-list" style={{ margin: '6px 0 0' }}>
                {e.items.map((it, j) => (
                  <li key={j}>{it}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
