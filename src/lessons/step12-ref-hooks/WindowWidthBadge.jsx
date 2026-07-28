import { useWindowWidth } from './useWindowWidth.js'

// useWindowWidth 훅을 쓰는 쪽은 이렇게 간단하다 — 값 한 줄만 받는다.
// 구독/정리 같은 복잡한 로직은 전부 훅 안에 숨어 있다.
export default function WindowWidthBadge() {
  const width = useWindowWidth()

  return (
    <div className="card center">
      <div className="file-label">📄 WindowWidthBadge.jsx</div>
      <div style={{ fontSize: 28, fontWeight: 700 }}>{width}px</div>
      <p className="section-desc" style={{ marginBottom: 0 }}>
        브라우저 창 크기를 바꿔 보자 — 값이 실시간으로 따라온다.
      </p>
    </div>
  )
}
