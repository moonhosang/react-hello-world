import { useState } from 'react'

// 커스텀 훅 = 그냥 'use'로 시작하는 함수다. 특별한 문법은 없다.
// 안에서 useState 같은 다른 훅을 부를 수 있고, 반복되는 로직을 한 곳에 모아 재사용한다.
// 이 훅을 쓰는 컴포넌트마다 '각자 독립된' on 상태를 갖는다. (상태를 공유하는 게 아니다)
export function useToggle(initial = false) {
  const [on, setOn] = useState(initial)
  const toggle = () => setOn((prev) => !prev)
  return [on, toggle]
}
