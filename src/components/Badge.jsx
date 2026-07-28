// 공용 뱃지 컴포넌트 (여러 개념·강의에서 함께 쓴다).
// color prop으로 배경색을 받는다. 안 넘기면 기본값은 'var(--red)' (index.css의 CSS 변수).
// → 인라인 style에 'var(--red)'를 쓰면 브라우저가 :root의 변수를 그대로 해석한다.

export default function Badge({ value, color = 'var(--red)' }) {
  return (
    <span className="menu-badge" style={{ background: color }}>
      {value}
    </span>
  )
}
