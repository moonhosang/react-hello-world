// 🟨 JS 기본 트랙 — 소개.
// React 트랙과 '목표가 다른' 별도 트랙이다(언어 기본 vs 라이브러리).
// 7강 전부 준비됐다. 각 항목을 누르면 그 강의로 이동한다.

const PLAN = [
  { n: '1', t: '표현식 해부', d: '문·식·항·인자로 쪼개 읽기 · 디버깅의 뿌리', to: 'js-expr' },
  { n: '2', t: '화살표 함수 · 삼항 · 템플릿 리터럴', d: 'JSX 곳곳에서 쓰는 문법', to: 'js-arrow' },
  { n: '3', t: '함수는 값이다', d: '정의·호출·넘기기·인라인 — onClick·map·콜백의 뿌리', to: 'js-func' },
  { n: '4', t: 'truthy / falsy', d: '값의 참·거짓 · 조건부 렌더링 && 0 함정', to: 'js-truthy' },
  { n: '5', t: '배열 map · filter', d: '변환·거르기 · 리스트 렌더링의 전제', to: 'js-array' },
  { n: '6', t: '구조 분해 · 스프레드', d: 'props·useState·불변성 업데이트의 전제', to: 'js-destructure' },
  { n: '7', t: 'Promise · async / await', d: 'useEffect 데이터 불러오기의 전제', to: 'js-async' },
]

export default function JsWarmup({ onGo }) {
  return (
    <section>
      <header className="lesson-header">
        <span className="badge">🟨 JS</span>
        <h2>JS 기본 트랙</h2>
        <p>React를 배우기 전에 알면 좋은 자바스크립트 기본이다. React 트랙과 목표가 달라 따로 뒀다.</p>
      </header>

      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 이 트랙의 목표</span>
        <p>
          우리 React 레슨 상당수가 "<b>이미 아는 것</b>"으로 전제하는 JS를 짧게 짚는다.
          <b> 이미 JS를 안다면 건너뛰고 ⚛️ React 트랙</b>으로 가면 된다.
        </p>
      </div>

      <p className="section-desc"><b>7강 전부 준비됐다.</b> 1강부터 순서대로 밟으면 좋다.</p>
      <p>
        <button className="chip on" onClick={() => onGo('js-expr')}>▶ JS 1강 시작하기</button>
      </p>

      <h3 className="section-title">📋 전체 목차 (누르면 이동)</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {PLAN.map((p) => (
          <button
            key={p.to}
            className="card"
            onClick={() => onGo(p.to)}
            style={{ display: 'block', width: '100%', textAlign: 'left', cursor: 'pointer' }}
          >
            <div className="file-label">✅ JS {p.n} · {p.t}</div>
            <p className="section-desc" style={{ margin: '2px 0 0' }}>{p.d}</p>
          </button>
        ))}
      </div>

      <p className="section-desc" style={{ marginTop: 16 }}>
        전체 로드맵은{' '}
        <button className="chip" onClick={() => onGo('roadmap')}>🗺️ 로드맵</button> 에서 볼 수 있다.
      </p>
    </section>
  )
}
