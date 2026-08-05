import { useState } from 'react'

// 🆕 변경 내역 — 날짜 탭(배지)으로 고르고, 고른 날짜 안은 챕터별 레슨 목록.
// 최신 날짜가 기본 선택. 각 날짜 안은 목차(TOC) 순서대로 챕터를 묶는다.
// 새 작업을 하면 맨 위(최신) 날짜 덩어리에 챕터/레슨을 더하고, CHANGELOG_LATEST를 올린다.

const RELEASES = [
  {
    date: '2026-08-05',
    title: '동작 과정 트레이스 + 팝업',
    groups: [
      {
        ch: '03 · Props',
        items: [
          { no: '2-1', t: 'props 기초', c: '값이 부모 → props → 자식 화면까지 흐르는 트레이스' },
          { no: '2-2', t: '더 넘겨보기', c: '부모 상태 → prop → 자식 갱신 트레이스' },
          { no: '2-3', t: 'children 합성', c: '태그 사이 내용이 children이 되는 흐름 트레이스' },
        ],
      },
      {
        ch: '04 · 상태',
        items: [
          { no: '3-1', t: 'useState 기초', c: '클릭 → set → 리렌더 → 화면 갱신 6단계' },
          { no: '3-2', t: '상태 설계·함정', c: '연속 setState가 +1인 이유(스냅샷)' },
        ],
      },
      {
        ch: '05 · 입력',
        items: [{ no: '4', t: '입력 다루기', c: 'controlled input 한 글자 왕복 트레이스' }],
      },
      {
        ch: '06 · 훅',
        items: [
          { no: '5-1', t: '훅이란 & 규칙', c: '커스텀 훅(useToggle) 호출 흐름' },
          { no: '5-3', t: '왜 그런 규칙인가', c: '훅 호출 순서(슬롯)가 밀리는 과정' },
        ],
      },
      {
        ch: '07 · 리스트',
        items: [{ no: '6', t: '투두 리스트', c: '배열 map 렌더 & 추가(새 배열·불변성) 트레이스' }],
      },
      {
        ch: '08 · 폼',
        items: [
          { no: '7-1', t: '여러 입력 → 객체', c: '객체 하나 + 공통 onChange 트레이스' },
          { no: '7-2', t: '폼 제출', c: '제출 → preventDefault → 추가 → 비우기' },
          { no: '7-3', t: '유효성 검사', c: '파생 errors(저장 안 함) 흐름 트레이스' },
        ],
      },
      {
        ch: '09 · Context',
        items: [
          { no: '8-1', t: 'prop drilling → Context', c: 'Provider → useContext로 값 꺼내기' },
          { no: '8-2', t: '전역 상태', c: '상태 + setter를 Context로 공유' },
        ],
      },
      {
        ch: '10 · useEffect',
        items: [
          { no: '9-1', t: 'useEffect 소개', c: '과적 해소 — 소개(기초)로 분리 · 두 effect 트레이스 · 반복 리렌더링(3-6·5-5) 참조' },
          { no: '9-2', t: '왜·어떻게 동작하나', c: '새 강의 — 동기화·선언형·useUserFetch·완성해보기 (9-1에서 분리)' },
          { no: '9-3', t: '정리(cleanup)', c: '걸기 → 매초 → 정리 함수 순서' },
          { no: '9-4', t: '데이터 불러오기', c: '요청 → 0.8초 → 응답 → 리렌더 9단계' },
          { no: '9-5', t: '다시 불러오기', c: '값 변경 → 정리 → 새 요청 · alive(경합) 요약 + 9-6 링크' },
          { no: '9-6', t: '정리 빠뜨리면', c: '새 강의 — 누수(타이머) + 경합(alive) 버그 모음 (9-5에서 이동)' },
          { no: '9-7', t: 'localStorage', c: '읽기 → 저장 → 새로고침 복원' },
        ],
      },
      {
        ch: '12 · useReducer',
        items: [
          { no: '11', t: '상태 로직 모으기', c: 'dispatch → reducer → 새 state 트레이스' },
          { no: '11', t: '실전 상태관리 노트', c: 'Redux Toolkit·Zustand·MobX vs 의존성 없이 Context — 언제 무엇을 (외부 의존성 상세는 JS 8로 분리)' },
        ],
      },
      {
        ch: '13 · 최적화',
        items: [{ no: '12', t: 'memo·useMemo·useCallback', c: 'React.memo가 렌더를 건너뛰는 판단' }],
      },
      {
        ch: '14 · Ref',
        items: [{ no: '13', t: 'useRef·커스텀 훅', c: 'ref = 리렌더 없는 상자 & DOM 손잡이' }],
      },
      {
        ch: 'J3 · 함수는 값이다',
        items: [{ no: 'J3', t: '클로저 추가', c: '클로저 섹션 + 독립 카운터 라이브 데모 · 9-6 alive와 상호 링크(깨진 참조 복구)' }],
      },
      {
        ch: 'J7 · 비동기',
        items: [{ no: 'J7', t: '교차링크', c: '9-4 데이터 불러오기에서 J7(Promise·async)로 링크 추가' }],
      },
      {
        ch: 'J8 · 패키지와 의존성',
        items: [{ no: 'J8', t: '신규 레슨', c: 'npm 생태계 — 전이 의존성·버전 충돌·번들·공급망 (useReducer에서 분리)' }],
      },
      {
        ch: '공통 · 도구',
        items: [
          { no: '📖', t: '용어 사전', c: '카테고리별 클릭 목록 + 어디서든 팝업(단축키 G)' },
          { no: '🆕', t: '변경 내역', c: '이 팝업 — 날짜별·챕터별 목록 · 다시 보지 않기' },
        ],
      },
    ],
  },
  {
    date: '2026-08-04',
    title: '용어 사전 신설',
    groups: [
      {
        ch: '공통 · 도구',
        items: [{ no: '📖', t: '용어 사전', c: 'JS·React 용어 총정리 glossary 추가' }],
      },
    ],
  },
  {
    date: '2026-08-03',
    title: '실전 앱 난이도 개편',
    groups: [
      {
        ch: '15 · 실전 앱',
        items: [{ no: 'Lv1~3', t: '조립/완성 분리', c: '조립(X-1) + 완성(X-2)으로 나눠 난이도를 낮춤' }],
      },
    ],
  },
]

// 자동 팝업 판단 기준 — 내용이 바뀔 때마다 올린다. 저장된 값과 다르면 "새 게 있다".
export const CHANGELOG_LATEST = 'v10-2026-08-05'

// 챕터 번호가 어느 트랙 것인지 앞에 붙인다. 01~15=⚛️ React, J0~J7=🟨 JS 기본, 그 외(공통)는 없음.
const trackPrefix = (ch) =>
  /^\d/.test(ch) ? '⚛️ React · ' : /^J\d/.test(ch) ? '🟨 JS 기본 · ' : ''

export default function Changelog() {
  // 최신 날짜(맨 위)를 기본으로 선택한다.
  const [sel, setSel] = useState(0)
  const r = RELEASES[sel] ?? RELEASES[0]

  return (
    <section>
      <header className="lesson-header">
        <span className="badge">🆕 변경 내역</span>
        <h2>무엇이 바뀌었나</h2>
        <p>날짜 탭을 골라 보라. 각 날짜 안은 목차(챕터) 순서대로 정리했다.</p>
      </header>

      {/* 날짜 탭(배지) — 최신이 맨 앞·기본 선택 */}
      <div className="cl-tabs">
        {RELEASES.map((rel, i) => (
          <button
            key={rel.date}
            className={'cl-tab' + (i === sel ? ' on' : '')}
            onClick={() => setSel(i)}
          >
            {rel.date}
            {i === 0 && <span className="cl-tab-latest">최신</span>}
          </button>
        ))}
      </div>

      <div className="changelog">
        {r.title && <p className="cl-release-title">{r.title}</p>}
        {r.groups.map((g) => (
          <div className="cl-group" key={g.ch}>
            <div className="cl-group-title">{trackPrefix(g.ch)}{g.ch}</div>
            {g.items.map((it, i) => (
              <div className="cl-item" key={i}>
                <span className="cl-no">{it.no}</span>
                <div className="cl-body">
                  <b className="cl-t">{it.t}</b>
                  <span className="cl-c">{it.c}</span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
