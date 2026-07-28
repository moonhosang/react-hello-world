// 커리큘럼 '한눈에' 화면 — 책 목차처럼.
// 장(章)별로 묶어 여러 단으로 촘촘하게 보여준다. 항목을 누르면 그 강의로 이동한다.

export default function Home({ chapters, byId, onGo }) {
  return (
    <section>
      <header className="lesson-header">
        <span className="badge">🗺️ 커리큘럼</span>
        <h2>리액트 입문 — 한눈에 보기</h2>
        <p>단계별로 무엇을 배우는지 한 줄로 정리했다. 항목을 누르면 바로 이동한다.</p>
      </header>

      <div className="toc-home">
        {chapters.map((ch) => (
          <div className="toc-home-ch" key={ch.n}>
            <div className="toc-home-chhead">
              <span className="toc-home-n">{ch.n}</span>
              <span className="toc-home-title">{ch.title}</span>
            </div>
            <ul className="toc-home-secs">
              {ch.items.map((id) => {
                const l = byId[id]
                if (!l) return null
                return (
                  <li key={id}>
                    <button className="toc-home-sec" onClick={() => onGo(id)}>
                      <span className="s-title">{l.title}</span>
                      <span className="s-sub">{l.subtitle}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
