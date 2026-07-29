// 변환 4단계를 '움직이는' 컴포넌트로 보여준다.
// 정적 ASCII 그림 대신, 한 단계씩 넘기며 같은 재료(Badge, "hihi")가
// 문법만 갈아입는 과정을 눈으로 따라가게 한다.
import { useState, useEffect, useRef } from 'react'
import Badge from '../../components/Badge.jsx'

// 4단계 — 라이브로 렌더한 Badge와, 그때 실제로 만들어진 '진짜 HTML'을 함께 보여준다.
function RenderedResult() {
  const ref = useRef(null)
  const [html, setHtml] = useState('')
  useEffect(() => {
    if (ref.current) setHtml(ref.current.innerHTML)
  }, [])
  return (
    <div className="jsxt-dom">
      <span className="jsxt-dom-label">① Badge는 컴포넌트(함수) → React가 실행하면 이 JSX를 반환한다</span>
      <pre className="concept-flow" style={{ margin: '4px 0 0' }}>{`function Badge({ value }) {
  return <span className="menu-badge" style={{ background: 'var(--red)' }}>{value}</span>
}
// React가 Badge({ value: "hihi" }) 를 실행 → 위 <span> 을 돌려준다`}</pre>

      <span className="jsxt-dom-label" style={{ marginTop: 10 }}>② 그 span이 그려진 결과 (진짜 화면)</span>
      <div className="jsxt-dom-stage" ref={ref}>
        <Badge value="hihi" />
      </div>

      <span className="jsxt-dom-label" style={{ marginTop: 10 }}>③ 브라우저에 실제로 생긴 HTML (className→class, style 객체→문자열)</span>
      <pre className="concept-flow" style={{ margin: '4px 0 0' }}>{html || '…'}</pre>
    </div>
  )
}

// 각 단계의 강조색 — 남색 → 보라 → 초록 → 주황으로 흐름을 표현
const STEPS = [
  {
    hue: '#6366f1',
    tag: '내가 쓴 JSX',
    tool: { phase: '작성', icon: '✍️', name: '개발자 + 에디터', desc: '사람이 JSX 문법으로 UI를 적는다.' },
    caption: 'Babel/esbuild가 변환 (빌드 타임)',
    render: () => (
      <code className="jsxt-code">
        <span className="k">const</span> el <span className="p">=</span>{' '}
        <span className="p">&lt;</span><span className="cmp jsxt-m">Badge</span>{' '}
        <span className="at">value</span><span className="p">=</span>
        <span className="s jsxt-m">"hihi"</span> <span className="p">/&gt;</span>
        <span className="p">;</span>
      </code>
    ),
    note: (
      <>
        <b>겉모습은 HTML,</b> 정체는 자바스크립트다. 브라우저는 이 꺾쇠 문법을 그대로는 실행하지 못한다.
      </>
    ),
  },
  {
    hue: '#8b5cf6',
    tag: '자바스크립트 함수 호출',
    tool: { phase: '빌드 타임', icon: '⚙️', name: 'Babel / esbuild (Vite)', desc: '브라우저에 보내기 전, JSX를 순수 함수 호출로 컴파일한다.' },
    caption: 'React가 함수를 실행 (런타임)',
    render: () => (
      <code className="jsxt-code">
        <span className="k">const</span> el <span className="p">=</span>{' '}
        <span className="pr">React</span><span className="p">.</span><span className="pr">createElement</span><span className="p">(</span>
        <span className="cmp jsxt-m">Badge</span><span className="p">,</span>{' '}
        <span className="p">{'{'}</span> <span className="at">value</span><span className="p">:</span>{' '}
        <span className="s jsxt-m">"hihi"</span> <span className="p">{'}'})</span><span className="p">;</span>
      </code>
    ),
    note: (
      <>
        꺾쇠가 사라지고 <b>평범한 함수 호출</b>이 됐다. 태그는 첫 인자, 속성(props)은 둘째 인자로 들어간다.
      </>
    ),
  },
  {
    hue: '#10b981',
    tag: '그냥 자바스크립트 객체 (React element)',
    tool: { phase: '런타임', icon: '⚛️', name: 'React (createElement)', desc: '브라우저에서 함수가 실행돼 element 객체를 만든다.' },
    caption: 'ReactDOM이 화면에 반영',
    render: () => (
      <code className="jsxt-code jsxt-block">
        <span className="k">const</span> el <span className="p">=</span> <span className="p">{'{'}</span>{'\n'}
        {'  '}<span className="pr">type</span><span className="p">:</span> <span className="cmp jsxt-m">Badge</span><span className="p">,</span>          <span className="c">// 컴포넌트 함수를 가리킴</span>{'\n'}
        {'  '}<span className="pr">props</span><span className="p">:</span> <span className="p">{'{'}</span> <span className="at">value</span><span className="p">:</span> <span className="s jsxt-m">"hihi"</span> <span className="p">{'}'}</span>{'\n'}
        <span className="p">{'}'}</span><span className="p">;</span>
      </code>
    ),
    note: (
      <>
        <b>이게 JSX의 최종 정체다</b> — 키와 값이 든 객체 하나. <code>type</code>이 <b>Badge 함수</b>를 가리키니,
        다음 단계에서 React가 그 함수를 <b>실행</b>해 실제 태그(<code>&lt;span&gt;</code>)를 얻는다.
      </>
    ),
  },
  {
    hue: '#f59e0b',
    tag: '실제 화면 (DOM)',
    tool: { phase: '런타임', icon: '🖥️', name: 'ReactDOM', desc: 'element 객체를 읽어 진짜 DOM 노드로 그린다(커밋).' },
    caption: null,
    render: () => <RenderedResult />,
    note: (
      <>
        <code>type</code>이 <b>Badge(함수)</b>라 React가 실행 → 반환된 <code>&lt;span&gt;</code>이 실제 DOM이 된다.
        그래서 HTML의 <b>span·class·style은 전부 Badge 안에서 온 것</b>이다 — 튀어나온 게 아니라 앞 단계와 이어진다.
      </>
    ),
  },
]

export default function TransformAnimation() {
  const [cur, setCur] = useState(0)
  const [playing, setPlaying] = useState(false)
  const timer = useRef(null)
  const last = STEPS.length - 1

  useEffect(() => {
    if (!playing) return
    timer.current = setInterval(() => {
      setCur((c) => {
        if (c >= last) {
          setPlaying(false)
          return c
        }
        return c + 1
      })
    }, 2400)
    return () => clearInterval(timer.current)
  }, [playing, last])

  const go = (i) => {
    setPlaying(false)
    setCur(i)
  }
  const step = STEPS[cur]

  return (
    <div className="jsxt" style={{ '--hue': step.hue }}>
      {/* 단계 표시줄 */}
      <div className="jsxt-track">
        <div className="jsxt-rail">
          <div className="jsxt-rail-fill" style={{ width: `${(cur / last) * 100}%` }} />
        </div>
        {STEPS.map((s, i) => (
          <button
            key={i}
            className="jsxt-node"
            data-state={i === cur ? 'active' : i < cur ? 'done' : ''}
            style={{ '--nhue': s.hue }}
            onClick={() => go(i)}
            aria-label={`${i + 1}단계: ${s.tag}`}
          >
            <span className="jsxt-dot">{i + 1}</span>
            <span className="jsxt-label">{s.tag}</span>
          </button>
        ))}
      </div>

      {/* 이 단계를 만든 도구 */}
      <div key={`tool-${cur}`} className="jsxt-toolbar">
        <span className="jsxt-when" data-phase={step.tool.phase}>{step.tool.phase}</span>
        <span className="jsxt-tool">
          <span className="jsxt-tool-ic">{step.tool.icon}</span>
          <b>{step.tool.name}</b>
        </span>
        <span className="jsxt-tool-desc">{step.tool.desc}</span>
      </div>

      {/* 본문 패널 */}
      <div className="jsxt-panel">
        <div key={cur} className="jsxt-body">
          {step.render()}
        </div>
      </div>

      {/* 변환 화살표 캡션 */}
      <div className="jsxt-caption">
        {step.caption ? (
          <>
            <span className="jsxt-arrow">▼</span> {step.caption}
          </>
        ) : (
          <span className="jsxt-arrow done">✓ 변환 끝</span>
        )}
      </div>

      {/* 설명 */}
      <p className="jsxt-note">
        <span className="jsxt-note-ic">→</span>
        {step.note}
      </p>

      {/* 컨트롤 */}
      <div className="jsxt-controls">
        <button className="jsxt-btn" onClick={() => go(Math.max(0, cur - 1))} disabled={cur === 0}>
          ← 이전
        </button>
        <button
          className="jsxt-btn primary"
          onClick={() => go(Math.min(last, cur + 1))}
          disabled={cur === last}
        >
          다음 →
        </button>
        <span className="jsxt-count">
          {String(cur + 1).padStart(2, '0')} / {String(STEPS.length).padStart(2, '0')}
        </span>
        <button
          className="jsxt-btn play"
          onClick={() => (playing ? setPlaying(false) : (cur === last ? (setCur(0), setPlaying(true)) : setPlaying(true)))}
        >
          {playing ? '⏸ 멈춤' : '▶ 자동 재생'}
        </button>
      </div>
    </div>
  )
}
