import { useState } from 'react'

// 좋아요 버튼 컴포넌트다.
// 켜짐/꺼짐만 있는 값은 true/false 상태로 관리한다. (토글)

export default function LikeButton() {
  const [liked, setLiked] = useState(false)

  return (
    <div className="card like-card">
      <div className="file-label">📄 LikeButton.jsx</div>
      {/* !liked = 지금 값을 반대로 뒤집기 */}
      <button
        className={'like-button' + (liked ? ' liked' : '')}
        onClick={() => setLiked(!liked)}
      >
        {liked ? '❤️ 좋아요 취소' : '🤍 좋아요'}
      </button>

      {/* 조건 ? A : B  →  조건에 따라 다른 문구 */}
      <p className="like-text">
        {liked ? '이 강의를 좋아하는군!' : '아직 안 눌렀다.'}
      </p>
    </div>
  )
}
