import Badge from '../../components/Badge.jsx'

// JSX는 '값'이라 변수에 담아 return할 수 있다.
// 컴포넌트란 결국 이 값(JSX)을 돌려주는 함수다.
export default function Say() {
  const hello = <Badge value="hihi" /> // JSX를 변수에 담고
  return hello // 그대로 돌려줘도 된다
}
