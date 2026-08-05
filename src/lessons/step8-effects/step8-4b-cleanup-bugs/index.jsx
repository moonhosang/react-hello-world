// 9-6 · 정리를 빠뜨리면 — 누수와 경합
// 9-3에서 '정리를 어떻게 쓰는지'를 배웠다. 여기선 '안 하면 무슨 일이 나는지' 두 대표 버그를 모아 본다:
//   ① 누수(leak)  — 타이머·구독을 안 끄면 없는 컴포넌트에 계속 돌아 쌓인다
//   ② 경합(race)  — 요청이 겹치면 늦게 온 옛 응답이 새 화면을 덮는다 (alive 플래그로 막음)

import { useState, useEffect, useRef } from 'react'
import TechTags from '../../../components/TechTags.jsx'

// ────────────────────────────────────────────────────────────
// 🔴 라이브 데모 ① — 누수(leak): 정리 안 한 타이머가 살아남아 tick을 계속 올린다
// (이 데모가 만든 모든 타이머는 데모가 사라질 때 timers ref로 전부 정리 → 앱 밖으로 새지 않는다)
// ────────────────────────────────────────────────────────────
function LeakDemo() {
  const [clocks, setClocks] = useState([]) // 화면에 켜져 있는 시계 id 목록
  const [leaked, setLeaked] = useState(0) // 정리 안 하고 버린(유령) 타이머 수
  const [ticks, setTicks] = useState(0) // 살아있는 모든 타이머가 함께 올리는 공용 신호
  const timers = useRef({}) // id -> intervalId (전부 추적해 언마운트 때 정리)
  const nextId = useRef(1)

  // 데모가 사라질 때(강의 이동 등) 남은 타이머를 전부 끈다 — 진짜 앱까지 새지 않게
  useEffect(() => () => {
    Object.values(timers.current).forEach(clearInterval)
    timers.current = {}
  }, [])

  const addClock = () => {
    const id = nextId.current++
    timers.current[id] = setInterval(() => setTicks((t) => t + 1), 1000)
    setClocks((cs) => [...cs, id])
  }
  // ❌ 그냥 끄기 — 카드만 없애고 clearInterval 안 함 → 타이머는 계속 돈다(유령)
  const stopLeaky = (id) => {
    setClocks((cs) => cs.filter((c) => c !== id))
    setLeaked((n) => n + 1)
  }
  // ✅ 제대로 끄기 — clearInterval로 타이머까지 끈다
  const stopClean = (id) => {
    clearInterval(timers.current[id])
    delete timers.current[id]
    setClocks((cs) => cs.filter((c) => c !== id))
  }
  // 🧹 유령까지 전부 정리
  const cleanAll = () => {
    Object.values(timers.current).forEach(clearInterval)
    timers.current = {}
    setClocks([])
    setLeaked(0)
  }
  const alive = clocks.length + leaked // 실제로 도는 타이머 추정(화면 것 + 유령)

  return (
    <div className="demo-card">
      <div className="button-row">
        <button className="chip on" onClick={addClock}>🕐 시계 켜기</button>
        <button className="chip" onClick={cleanAll}>🧹 유령까지 전부 정리</button>
      </div>
      <p className="demo-desc" style={{ marginTop: 8 }}>
        지금 <b>tick 신호</b>: <b style={{ fontVariantNumeric: 'tabular-nums' }}>{ticks}</b> ·
        화면 시계 <b>{clocks.length}</b>개 · <span style={{ color: leaked ? 'var(--red)' : 'inherit' }}>🔴 유령 타이머 <b>{leaked}</b>개</span>
        {alive > 0 && <> · <b>초당 +{alive}</b>씩 오름</>}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {clocks.map((id) => (
          <div key={id} className="tree-box leaf" style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            🕐 시계 #{id}
            <button className="chip" style={{ marginLeft: 'auto' }} onClick={() => stopLeaky(id)}>❌ 그냥 끄기(정리 안 함)</button>
            <button className="chip on" onClick={() => stopClean(id)}>✅ 제대로 끄기</button>
          </div>
        ))}
        {clocks.length === 0 && <p className="demo-desc" style={{ margin: 0 }}>시계를 켜 보라. 그다음 ❌ 그냥 끄기로 없애도 tick이 계속 오르면 = 새는 것.</p>}
      </div>
      {leaked > 0 && (
        <p className="demo-desc" style={{ margin: '8px 0 0', color: 'var(--red)', fontWeight: 600 }}>
          ⚠️ 카드는 사라졌는데 tick이 계속 오른다 — 유령 {leaked}개가 아직 돌고 있다(누수). "✅ 제대로 끄기"였다면 멈췄다.
        </p>
      )}
    </div>
  )
}

// ────────────────────────────────────────────────────────────
// 🔴 라이브 데모 ② — 경합(race): 1번은 느리게(2초), 3번은 빠르게(0.5초) 응답
// ────────────────────────────────────────────────────────────
const RACE_USERS = {
  1: { emoji: '👩‍💻', name: '김코딩 (1번)' },
  3: { emoji: '🧑‍🔬', name: '박백엔드 (3번)' },
}
// 지연이 다른 가짜 API — 1번만 일부러 느리다. 그래서 1→3을 빨리 누르면 응답 순서가 뒤집힌다.
function slowFetchUser(userId) {
  const delay = userId === 1 ? 2000 : 500
  return new Promise((res) => setTimeout(() => res(RACE_USERS[userId]), delay))
}

function RaceView({ userId, guard, round }) {
  const [user, setUser] = useState(RACE_USERS[3])
  const [pending, setPending] = useState(false)
  useEffect(() => {
    let alive = true
    setPending(true)
    slowFetchUser(userId).then((u) => {
      if (guard && !alive) return // ✅ alive 있으면: 옛것이면 버린다
      setUser(u)
      setPending(false)
    })
    return () => {
      alive = false
    }
  }, [userId, round, guard]) // round: 같은 userId여도 리셋/재현 때 다시 fetch하게
  return (
    <div className="tree-box leaf">
      <div style={{ fontSize: 22 }}>{user.emoji}</div>
      <b>{user.name}</b>
      {pending && <span className="demo-desc"> · ⏳</span>}
    </div>
  )
}

function RaceDemo() {
  const [userId, setUserId] = useState(3)
  const [round, setRound] = useState(0)
  const [running, setRunning] = useState(false)
  // 재현: 느린 1번을 먼저, 곧바로 빠른 3번으로 바꾼다 → 3이 먼저 도착, 1이 뒤늦게 도착
  const reproduce = () => {
    setRunning(true)
    setRound((r) => r + 1)
    setUserId(1)
    setTimeout(() => setUserId(3), 200)
    setTimeout(() => setRunning(false), 2400) // 1번(2초)까지 도착한 뒤 마무리
  }
  const reset = () => {
    setUserId(3)
    setRound((r) => r + 1) // 같은 3이어도 강제로 다시 fetch → 두 뷰 모두 3으로 복구
  }
  return (
    <div className="demo-card">
      <div className="button-row">
        <button className="chip on" disabled={running} onClick={reproduce}>
          {running ? '⏳ 재현 중… (2초 기다려 보라)' : '🐢 경합 재현 (1번 느림 → 곧바로 3번)'}
        </button>
        <button className="chip" onClick={reset}>↺ 리셋(3번)</button>
      </div>
      <p className="demo-desc" style={{ marginTop: 8 }}>
        목표(마지막으로 누른) userId: <b>{userId}</b> — <b>둘 다 3번이어야 맞다.</b>
      </p>
      <div className="compare-grid">
        <div className="card">
          <div className="file-label">❌ alive 없음 — 옛 응답을 안 버린다</div>
          <RaceView userId={userId} guard={false} round={round} />
          <p className="demo-desc" style={{ marginTop: 8 }}>2초 뒤 <b>1번으로 되돌아간다</b>(늦은 옛 응답이 덮음) ❌</p>
        </div>
        <div className="card">
          <div className="file-label">✅ alive 있음 — 옛 응답을 버린다</div>
          <RaceView userId={userId} guard={true} round={round} />
          <p className="demo-desc" style={{ marginTop: 8 }}>끝까지 <b>3번 그대로</b>(늦은 1번 응답을 버림) ✅</p>
        </div>
      </div>
    </div>
  )
}

export default function Step8_4b({ onGo }) {
  return (
    <section>
      <header className="lesson-header">
        <span className="badge effect-badge">9-6</span>
        <h2>정리를 빠뜨리면 — 누수와 경합</h2>
        <p>cleanup을 안 하면 생기는 대표 버그 둘: 타이머·구독 누수, 그리고 늦게 온 옛 응답이 화면을 덮는 경합.</p>
      </header>

      <div className="lesson-goal">
        <span className="lesson-goal-tag">🎯 학습 포인트</span>
        <p>
          정리(cleanup)는 '있으면 좋은 것'이 아니라 <b>안 하면 버그가 나는 것</b>이다.
          걸어 둔 것(타이머·구독·요청)은 반드시 <b>거둬들여야</b> 누수와 경합을 막는다.
        </p>
      </div>

      <div className="concept">
        <p className="concept-lead">
          <b>9-3 · 정리(cleanup)</b>에서 <code>return () =&gt; ...</code>로 <b>뒷정리하는 법</b>을 배웠다.
          그럼 <b>안 하면</b> 실제로 무슨 일이 날까? 대표적인 두 버그를 눈으로 보자.
        </p>
        <TechTags items={[{ label: '9-3 · 정리(cleanup) 복습', to: 8.2 }]} onGo={onGo} />
      </div>

      {/* ── ① 누수 ── */}
      <h3 className="section-title">① 누수(leak) — 안 끄면 없는 컴포넌트에 계속 돈다</h3>
      <span className="learn-tag">📎 학습 포인트 · setInterval·구독을 정리 안 하면 언마운트 후에도 돌아 쌓이고, 없는 컴포넌트에 setState해 경고가 난다</span>
      <div className="card">
        <div className="file-label">😱 정리를 빼면 — 이렇게 샌다</div>
        <ol className="chain-rounds">
          <li className="chain-round">
            <div className="chain-round-head"><span className="chain-round-no">1</span><span>컴포넌트 <b>마운트</b> → <code>setInterval</code> 시작 (1초마다 setState)</span></div>
          </li>
          <li className="chain-round">
            <div className="chain-round-head"><span className="chain-round-no">2</span><span>컴포넌트 <b>언마운트</b>(화면에서 사라짐) — 그런데 정리를 <b>안 함</b></span><span className="chain-round-note">타이머는 안 꺼졌다</span></div>
          </li>
          <li className="chain-round" style={{ borderColor: 'var(--red)' }}>
            <div className="chain-round-head"><span className="chain-round-no" style={{ background: 'var(--red)' }}>3</span><span><code>setInterval</code>이 <b>계속 돎</b> → 없는 컴포넌트에 <code>setState</code> 시도</span><span className="chain-round-note" style={{ color: 'var(--red)' }}>메모리 누수 + 경고</span></div>
          </li>
          <li className="chain-round" style={{ borderColor: 'var(--red)' }}>
            <div className="chain-round-head"><span className="chain-round-no" style={{ background: 'var(--red)' }}>4</span><span>다시 마운트하면 <b>새 타이머가 또</b> 생김 → 켜고 끌수록 <b>겹겹이 쌓임</b></span><span className="chain-round-note" style={{ color: 'var(--red)' }}>시계가 점점 빨라진다</span></div>
          </li>
        </ol>
        <pre className="err-code" style={{ marginTop: 10 }}>{`useEffect(() => {
  const id = setInterval(() => setNow(new Date()), 1000)
  // ❌ return이 없다 — 언마운트해도 타이머가 안 꺼진다
}, [])

useEffect(() => {
  const id = setInterval(() => setNow(new Date()), 1000)
  return () => clearInterval(id)   // ✅ 정리 — 언마운트 전에 타이머를 끈다
}, [])`}</pre>
      </div>
      <p className="section-desc">
        <b>9-3의 라이브 시계</b>가 바로 이걸 보여줬다 — 정리가 있어 <b>켜고 끄기를 반복해도 시계가 하나만</b> 돈다.
        정리를 빼면 끌 때마다 안 꺼진 타이머가 남아 여러 개가 겹친다. (같은 이유로 <code>addEventListener</code>·구독도 <b>짝으로 해제</b>한다.)
      </p>
      <TechTags items={[{ label: '9-3 · 라이브 시계로 확인', to: 8.2 }]} onGo={onGo} />

      <span className="learn-tag">▶ 직접 새게 해보기 — 시계를 켜고 <b>❌ 그냥 끄기</b>로 없앤 뒤 tick이 계속 오르는지 보라</span>
      <div className="card">
        <div className="file-label">🔴 라이브 — 정리 안 한 타이머가 살아남는다(누수)</div>
        <LeakDemo />
      </div>

      {/* ── ② 경합 ── */}
      <h3 className="section-title">② 경합(race) — 늦게 온 옛 응답이 새 화면을 덮는다</h3>
      <span className="learn-tag">📎 학습 포인트 · 요청이 겹치면 응답 순서가 뒤바뀔 수 있다 → 정리에서 alive를 false로 바꿔 옛 응답을 버린다</span>
      <p className="section-desc">
        데이터를 불러오는 effect에서 <code>let alive = true</code> 같은 깃발을 <b>정리와 짝</b>으로 쓰는 걸 <b>9-5</b>에서 봤다.
        이것도 <b>정리를 빠뜨리면 나는 버그</b> — 다만 눈엔 잘 안 보이는 <b>경합(race)</b>이다. 구체적으로 보자.
      </p>

      <div className="card">
        <div className="file-label">😱 정리(alive)가 없다면 — 이런 버그가 난다</div>
        <p className="section-desc" style={{ margin: '0 0 8px' }}>
          네트워크는 <b>요청마다 도착 시간이 다르다</b>. 그래서 빨리 누르면 <b>응답 순서가 뒤바뀔 수</b> 있다:
        </p>
        <ol className="chain-rounds">
          <li className="chain-round">
            <div className="chain-round-head"><span className="chain-round-no">1</span><span><b>userId 1</b> 클릭 → 1번 요청 출발</span><span className="chain-round-note">하필 느림 · 2초</span></div>
          </li>
          <li className="chain-round">
            <div className="chain-round-head"><span className="chain-round-no">2</span><span>0.1초 뒤 마음 바뀜 → <b>userId 3</b> 클릭 → 3번 요청 출발</span><span className="chain-round-note">빠름 · 0.5초</span></div>
          </li>
          <li className="chain-round active">
            <div className="chain-round-head"><span className="chain-round-no">3</span><span>0.5초: <b>3번 응답 도착</b> → 화면에 <b>3번 사람</b> ✅</span><span className="chain-round-note">버튼도 3 · 맞음</span></div>
          </li>
          <li className="chain-round" style={{ borderColor: 'var(--red)' }}>
            <div className="chain-round-head"><span className="chain-round-no" style={{ background: 'var(--red)' }}>4</span><span>2초: <b>1번 응답이 뒤늦게</b> 도착 → <code>setUser(1번)</code></span><span className="chain-round-note" style={{ color: 'var(--red)' }}>화면이 1번으로 되돌아감 ❌</span></div>
          </li>
        </ol>
        <p className="demo-desc" style={{ margin: '8px 0 0' }}>
          결과: 버튼은 <b>3</b>인데 화면은 <b>1</b>. <b>늦게 온 옛 응답</b>이 새 화면을 덮어썼다 — 이게 <b>경합(race condition)</b>이다.
        </p>
      </div>

      <div className="card">
        <div className="file-label">🛡️ alive가 하는 일 — 옛 응답을 버린다</div>
        <pre className="err-code">{`useEffect(() => {
  let alive = true                    // ← 이 '실행'만의 깃발 (effect가 돌 때마다 새로 생김)
  fetchUser(userId).then((data) => {
    if (!alive) return                // ← 내가 이미 '옛것'이면 응답을 버린다
    setUser(data)                     // 유효할 때만 화면에 반영
  })
  return () => { alive = false }      // ← 정리: userId가 또 바뀌면 이 실행을 '옛것'으로
}, [userId])`}</pre>
        <ul className="section-list">
          <li><b>alive는 실행마다 따로 있다</b> — effect가 다시 돌 때마다 <code>let alive = true</code>가 <b>새로</b> 만들어진다. (각 실행이 자기 <code>alive</code>를 기억한다 = <b>클로저</b>, → JS 3 · 함수는 값이다)</li>
          <li><b>정리가 먼저 돈다</b> — userId가 1→3으로 바뀌면, 리액트는 새 effect(3번)를 돌리기 <b>전에 이전 effect(1번)의 정리</b>를 부른다 → 1번의 <code>alive</code>가 <b>false</b>가 된다.</li>
          <li><b>그래서 1번 응답이 늦게 와도</b> <code>if (!alive) return</code>에 걸려 <b>조용히 버려진다</b> → 화면은 3번 그대로. 버그가 사라진다.</li>
        </ul>
      </div>

      <span className="learn-tag">▶ 직접 경합 재현 — <b>🐢 경합 재현</b>을 누르고 <b>2초</b>만 기다려 보라. 왼쪽(❌)만 1번으로 되돌아간다</span>
      <div className="card">
        <div className="file-label">🔴 라이브 — alive 없으면 옛 응답이 새 화면을 덮는다</div>
        <RaceDemo />
      </div>

      <div className="try-it">
        <h4>💡 정리</h4>
        <ul>
          <li><b>누수</b> — 걸어 둔 타이머·구독·리스너는 <code>return () =&gt; ...</code>로 반드시 거둔다. 안 하면 없는 컴포넌트에 계속 돌아 쌓인다.</li>
          <li><b>경합</b> — 겹칠 수 있는 요청엔 <code>alive</code> 깃발을 정리와 짝으로 둬, 늦게 온 옛 응답을 버린다.</li>
          <li>공통 규칙 — <b>"건 것은 반드시 거둔다."</b> 이게 cleanup의 존재 이유다.</li>
        </ul>
      </div>

      <div className="concept">
        <p className="concept-lead">🔗 이어짐</p>
        <p className="section-desc" style={{ marginTop: 0 }}>
          정리를 <b>쓰는 법</b>은 <b>9-3</b>, 요청을 <b>다시 부르는 흐름</b>은 <b>9-5</b>에 있다. 이 강의는 그 둘을
          "<b>안 하면 무슨 일이 나나</b>"로 묶어 본 것이다.
        </p>
        <TechTags
          items={[
            { label: '9-3 · 정리(cleanup)', to: 8.2 },
            { label: '9-5 · 다시 불러오기', to: 8.4 },
            { label: '🧠 클로저 (JS 3)', to: 'js-func' },
          ]}
          onGo={onGo}
        />
      </div>
    </section>
  )
}
