// props 하나만 받는 가장 단순한 예.
// name이라는 props를 받아서, 그 값으로 인사한다.
// → 같은 컴포넌트인데 name만 바꾸면 다른 인사가 된다.

export default function HelloName({ name }) {
  return (
    <p className="hello-name">
      안녕하세요, <b>{name}</b>님! 👋
    </p>
  )
}
