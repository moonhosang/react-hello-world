// 실전 앱에서 쓰는 '관련 기술' 태그 줄.
// to(강의 id)가 있으면 누를 때 그 개념을 배운 강의로 이동한다(복습 인덱스).
//
// props:
//   items : [{ label, to }]  // to = 강의 id(number) 또는 null(이동 없음)
//   onGo  : (id) => void      // 강의 이동 콜백 (App에서 내려준다)
export default function TechTags({ items, onGo }) {
  return (
    <div className="tech-tags">
      <span className="tech-tags-label">🧰 관련 기술</span>
      {items.map((t, i) =>
        t.to != null && onGo ? (
          <button
            key={i}
            className="tech-tag link"
            onClick={() => onGo(t.to)}
            title="이 개념을 배운 강의로 이동"
          >
            {t.label} ↗
          </button>
        ) : (
          <span key={i} className="tech-tag">{t.label}</span>
        )
      )}
    </div>
  )
}
