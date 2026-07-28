import { useState } from 'react'
import LikeDisplay from './LikeDisplay.jsx'

// 부모 컴포넌트: 상태(likes)를 '가지고' 있다.
// 그 상태 값을 prop으로 자식(LikeDisplay)에게 내려준다.
// 부모가 상태를 바꾸면 → 자식이 받은 prop도 바뀌어 → 자식도 다시 그려진다.
// (상태 state는 3단계에서 자세히 배운다. 여기선 '상태를 prop으로 내려준다'만 본다.)

export default function LikeParent() {
  const [likes, setLikes] = useState(0)

  return (
    <div>
      {/* 부모의 상태를 prop으로 전달 */}
      <LikeDisplay likes={likes} />
      <div className="button-row">
        <button onClick={() => setLikes(likes + 1)}>👍 좋아요</button>
        <button onClick={() => setLikes(0)}>🔄 초기화</button>
      </div>
    </div>
  )
}
