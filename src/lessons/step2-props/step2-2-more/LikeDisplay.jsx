// 자식 컴포넌트: 부모가 준 likes(prop)를 화면에 보여주기만 한다.
// 자기 상태는 없다. props는 '읽기만' 한다.

export default function LikeDisplay({ likes }) {
  return (
    <div className="like-display">
      ❤️ <b>{likes}</b>
    </div>
  )
}
