import { useEffect, useState } from 'react'

// 커스텀 훅은 안에서 useState뿐 아니라 useEffect 같은 다른 훅도 마음껏 쓴다.
// 여기서는 '창 너비'를 state로 들고, resize 이벤트로 값을 갱신한다.
// 복잡한 로직(구독/정리)을 훅 안에 숨기고, 쓰는 쪽은 값 하나만 받는다.
export function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', onResize)
    // effect 정리: 컴포넌트가 사라질 때 이벤트를 떼어 준다.
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return width
}
