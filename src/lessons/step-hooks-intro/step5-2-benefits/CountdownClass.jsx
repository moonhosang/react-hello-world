import { Component } from 'react'

// ❌ 훅 없이(클래스) — 하나의 카운트다운인데 '시작'과 '정리'가 서로 다른 메서드로 흩어진다.
// 이 파일은 '코드만 보여 준다'(라이브 렌더 안 함). import 만으로 에러가 없어야 하므로 유효한 클래스로 둔다.

export default class Countdown extends Component {
  state = { sec: this.props.from ?? 10 }

  // 🟢 시작은 '여기' — 마운트되는 시점
  componentDidMount() {
    this.id = setInterval(this.tick, 1000)
  }

  //  … 그 사이에 render 등 다른 코드들이 낀다 …

  tick = () => {
    this.setState((s) => ({ sec: s.sec > 0 ? s.sec - 1 : 0 }))
  }

  // 🔴 정리는 '저 멀리 떨어진 곳' — 언마운트되는 시점
  componentWillUnmount() {
    clearInterval(this.id)
  }

  render() {
    return <div>⏱️ 남은 시간 · {this.state.sec}초</div>
  }
}
