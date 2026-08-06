import { createContext } from 'react'

// 8-1에서 공용으로 쓰는 사용자 Context.
// Context 해결 데모(ContextDemo)와 중첩 Provider 데모(NestedProviderDemo)가 함께 쓴다.
export const UserContext = createContext(null)
