// 단순 컴포넌트 ① — 사용자 아바타 칩 (아바타 + 이름 + 직위).
// 짧지만 나름의 구조가 있다. 그래도 본질은 "JSX를 return하는 함수"로 똑같다.
// 아직 props는 없어서 값은 고정이다. (2단계 props에서 이 값을 바깥에서 받게 된다.)

export default function Greeting() {
  return (
    <div className="user-chip">
      <div className="user-avatar">🧑‍💻</div>
      <div className="user-meta">
        <span className="user-name">김코딩</span>
        <span className="user-role">리액트 입문자</span>
      </div>
    </div>
  )
}
