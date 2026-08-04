import { useState, useEffect, useRef } from 'react'
import Home from './Home.jsx'
import Roadmap from './Roadmap.jsx'
import Glossary from './Glossary.jsx'
// 각 강의는 자기 폴더의 index.jsx에서 불러온다. (폴더를 가리키면 index.jsx가 자동 선택됨)
import Stage0 from './lessons/step0-why-react/index.jsx'
import Stage1 from './lessons/step1-components/index.jsx'
import Step2_1 from './lessons/step2-props/step2-1-basics/index.jsx'
import Step2_2 from './lessons/step2-props/step2-2-more/index.jsx'
import Step3_1 from './lessons/step3-state-events/step3-1-basics/index.jsx'
import Step3_2 from './lessons/step3-state-events/step3-2-design/index.jsx'
import StepHooks1 from './lessons/step-hooks-intro/step5-1-what/index.jsx'
import StepHooksBenefits from './lessons/step-hooks-intro/step5-2-benefits/index.jsx'
import StepHooks2 from './lessons/step-hooks-intro/step5-2-why/index.jsx'
import StepHooks3 from './lessons/step-hooks-intro/step5-3-violations/index.jsx'
import StepHooksRecursion from './lessons/step-hooks-intro/step5-5-recursion/index.jsx'
import Stage4 from './lessons/step4-inputs/index.jsx'
import PracticeStep from './components/PracticeStep.jsx'
// 챕터 연습 config(단계 데이터). 각 폴더 index.jsx는 컴포넌트가 아니라 config 객체를 export한다.
import statePractice from './lessons/practice-state/index.jsx'
import inputsPractice from './lessons/practice-inputs/index.jsx'
import formsPractice from './lessons/practice-forms/index.jsx'
import contextPractice from './lessons/practice-context/index.jsx'
import effectsPractice from './lessons/practice-effects/index.jsx'
import refPractice from './lessons/practice-ref/index.jsx'
import propsPractice from './lessons/practice-props/index.jsx'
import hooksPractice from './lessons/practice-hooks/index.jsx'
import listsPractice from './lessons/practice-lists/index.jsx'
import jsExprPractice from './lessons/practice-js-expr/index.jsx'
import jsArrowPractice from './lessons/practice-js-arrow/index.jsx'
import jsFuncPractice from './lessons/practice-js-func/index.jsx'
import jsTruthyPractice from './lessons/practice-js-truthy/index.jsx'
import jsArrayPractice from './lessons/practice-js-array/index.jsx'
import jsDestrPractice from './lessons/practice-js-destructure/index.jsx'
import jsAsyncPractice from './lessons/practice-js-async/index.jsx'
import Stage5 from './lessons/step5-lists/index.jsx'
import Step6_1 from './lessons/step6-forms/step6-1-form-state/index.jsx'
import Step6_2 from './lessons/step6-forms/step6-2-submit/index.jsx'
import Step6_3 from './lessons/step6-forms/step6-3-validation/index.jsx'
import Step7_1 from './lessons/step7-context/step7-1-context/index.jsx'
import Step7_2 from './lessons/step7-context/step7-2-global-state/index.jsx'
import Step7_3 from './lessons/step7-context/step7-3-multistep/index.jsx'
import Step8_1 from './lessons/step8-effects/step8-1-effect-basics/index.jsx'
import Step8_2 from './lessons/step8-effects/step8-2-cleanup/index.jsx'
import Step8_3 from './lessons/step8-effects/step8-3-fetch/index.jsx'
import Step8_4 from './lessons/step8-effects/step8-4-refetch/index.jsx'
import Step8_5 from './lessons/step8-effects/step8-5-localstorage/index.jsx'
import Stage9 from './lessons/step9-errors/index.jsx'
import Step10Reducer from './lessons/step10-reducer/index.jsx'
import Step11Optimize from './lessons/step11-optimize/index.jsx'
import Step12RefHooks from './lessons/step12-ref-hooks/index.jsx'
import CheckpointA from './checkpoints/checkpointA-team-page/index.jsx'
import CheckpointB from './checkpoints/checkpointB-shopping/index.jsx'
import CheckpointC from './checkpoints/checkpointC-todo/index.jsx'
import AssembleTodo from './lessons/app-assemble-todo/index.jsx'
import AssembleCart from './lessons/app-assemble-cart/index.jsx'
import AssembleSignup from './lessons/app-assemble-signup/index.jsx'
import CartApp from './apps/app-cart/index.jsx'
import SignupApp from './apps/app-signup/index.jsx'
import TransferApp from './apps/app-transfer/index.jsx'
import SearchApp from './apps/app-search/index.jsx'
import QuizApp from './apps/app-quiz/index.jsx'
import BudgetApp from './apps/app-budget/index.jsx'
import Step2_3 from './lessons/step2-props/step2-3-children/index.jsx'
import FunctionVsComponent from './concepts/function-vs-component/index.jsx'
import JsxUnderTheHood from './concepts/jsx-under-the-hood/index.jsx'
import JsxRules from './concepts/jsx-rules/index.jsx'
import Encapsulation from './concepts/encapsulation/index.jsx'
import componentPractice from './concepts/component-practice/index.jsx'
import PropsVsState from './concepts/props-vs-state/index.jsx'
import ReRender from './concepts/rerender/index.jsx'
import EventPropagation from './concepts/event-propagation/index.jsx'
import ConditionalRendering from './concepts/conditional-rendering/index.jsx'
import JsWarmup from './lessons/js-warmup/index.jsx'
import JsExprAnatomy from './lessons/js-warmup/expr-anatomy/index.jsx'
import JsArrowTernary from './lessons/js-warmup/arrow-ternary-template/index.jsx'
import JsFunctions from './lessons/js-warmup/functions-as-values/index.jsx'
import JsTruthyFalsy from './lessons/js-warmup/truthy-falsy/index.jsx'
import JsArrayMethods from './lessons/js-warmup/array-methods/index.jsx'
import JsDestructuring from './lessons/js-warmup/destructuring-spread/index.jsx'
import JsAsync from './lessons/js-warmup/async-await/index.jsx'

// 공식 한국어 문서(ko.react.dev) 링크. { t: 제목, u: URL }
// 각 강의 하단에 "📚 공식 문서"로 자동 표시된다.
const D = {
  reactingInput: { t: 'State로 Input 다루기', u: 'https://ko.react.dev/learn/reacting-to-input-with-state' },
  thinking: { t: 'React로 사고하기', u: 'https://ko.react.dev/learn/thinking-in-react' },
  firstComponent: { t: '첫 번째 컴포넌트', u: 'https://ko.react.dev/learn/your-first-component' },
  pureComponents: { t: '컴포넌트를 순수하게 유지하기', u: 'https://ko.react.dev/learn/keeping-components-pure' },
  jsxMarkup: { t: 'JSX로 마크업 작성하기', u: 'https://ko.react.dev/learn/writing-markup-with-jsx' },
  jsxCurly: { t: '중괄호로 JS 사용하기', u: 'https://ko.react.dev/learn/javascript-in-jsx-with-curly-braces' },
  importExport: { t: '컴포넌트 import/export', u: 'https://ko.react.dev/learn/importing-and-exporting-components' },
  passingProps: { t: 'props 전달하기', u: 'https://ko.react.dev/learn/passing-props-to-a-component' },
  stateMemory: { t: 'State: 컴포넌트의 기억', u: 'https://ko.react.dev/learn/state-a-components-memory' },
  renderCommit: { t: '렌더링 그리고 커밋', u: 'https://ko.react.dev/learn/render-and-commit' },
  stateSnapshot: { t: '스냅샷으로서의 State', u: 'https://ko.react.dev/learn/state-as-a-snapshot' },
  queueing: { t: 'state 업데이트 큐', u: 'https://ko.react.dev/learn/queueing-a-series-of-state-updates' },
  respondingEvents: { t: '이벤트에 응답하기', u: 'https://ko.react.dev/learn/responding-to-events' },
  useState: { t: 'useState (레퍼런스)', u: 'https://ko.react.dev/reference/react/useState' },
  input: { t: '<input> (레퍼런스)', u: 'https://ko.react.dev/reference/react-dom/components/input' },
  conditional: { t: '조건부 렌더링', u: 'https://ko.react.dev/learn/conditional-rendering' },
  renderingLists: { t: '리스트 렌더링', u: 'https://ko.react.dev/learn/rendering-lists' },
  sharingState: { t: 'State 공유(끌어올리기)', u: 'https://ko.react.dev/learn/sharing-state-between-components' },
  updatingObjects: { t: '객체 State 업데이트', u: 'https://ko.react.dev/learn/updating-objects-in-state' },
  updatingArrays: { t: '배열 State 업데이트', u: 'https://ko.react.dev/learn/updating-arrays-in-state' },
  context: { t: 'Context로 깊이 전달하기', u: 'https://ko.react.dev/learn/passing-data-deeply-with-context' },
  useContext: { t: 'useContext (레퍼런스)', u: 'https://ko.react.dev/reference/react/useContext' },
  effects: { t: 'Effect로 동기화하기', u: 'https://ko.react.dev/learn/synchronizing-with-effects' },
  useEffect: { t: 'useEffect (레퍼런스)', u: 'https://ko.react.dev/reference/react/useEffect' },
  rulesOfHooks: { t: 'Hook의 규칙', u: 'https://ko.react.dev/reference/rules/rules-of-hooks' },
  useReducer: { t: 'useReducer (레퍼런스)', u: 'https://ko.react.dev/reference/react/useReducer' },
  extractingReducer: { t: '상태 로직을 reducer로 추출', u: 'https://ko.react.dev/learn/extracting-state-logic-into-a-reducer' },
  memo: { t: 'memo (레퍼런스)', u: 'https://ko.react.dev/reference/react/memo' },
  useMemo: { t: 'useMemo (레퍼런스)', u: 'https://ko.react.dev/reference/react/useMemo' },
  useCallback: { t: 'useCallback (레퍼런스)', u: 'https://ko.react.dev/reference/react/useCallback' },
  useRef: { t: 'useRef (레퍼런스)', u: 'https://ko.react.dev/reference/react/useRef' },
  manipulatingDom: { t: 'Ref로 DOM 조작하기', u: 'https://ko.react.dev/learn/manipulating-the-dom-with-refs' },
  reusingLogic: { t: '커스텀 훅으로 로직 재사용', u: 'https://ko.react.dev/learn/reusing-logic-with-custom-hooks' },
}

// 챕터 연습을 '단계별 항목'으로 쪼갠다 — 각 단계가 자기 진도/연습/복습 체크를 갖게.
// base 3.7 → id 3.71 … 3.75 (사이드바 종합연습 1~5)
// base가 숫자면 3.7→3.71 식, 문자열('js-func')이면 js-func-1 식으로 단계 id를 만든다.
const stepId = (base, i) => (typeof base === 'number' ? Number(`${base}${i + 1}`) : `${base}-${i + 1}`)
const stepIds = (base, n) => Array.from({ length: n }, (_, i) => stepId(base, i))
// 표시 번호 — 1·2·3·4 그다음 5-1·5-2('처음부터'를 두 예시로).
const STEP_NOS = ['1', '2', '3', '4', '5-1', '5-2']
const stepNo = (i) => STEP_NOS[i] ?? String(i + 1)
const makeSteps = (base, p, extra = {}) =>
  p.levels.map((lv, i) => ({
    id: stepId(base, i),
    title: `📝 종합연습 · ${p.shortTitle} ${stepNo(i)}`,
    subtitle: lv.label,
    Component: () => <PracticeStep p={p} lv={lv} no={stepNo(i)} />,
    kind: 'checkpoint',
    isNew: true,
    builds: p.builds,
    ...extra,
  }))

// 강의 목록이다. 새 강의를 추가하면 여기에 한 줄만 넣으면 사이드바에 자동으로 나타난다.
//   kind: 'checkpoint' = 단계 사이의 누적 실습
//   kind: 'concept'    = 개념 정리
//   kind: 'sub'        = 큰 단계의 하위 단계 (group으로 묶여 사이드바에 소제목이 붙는다)
//   docs: 해당 강의의 ko.react.dev 공식 문서 링크
const lessons = [
  { id: 'home', title: '🗺️ 커리큘럼', subtitle: '전체 한눈에', kind: 'home' },
  { id: 'roadmap', title: '🗺️ 로드맵 (예정)', subtitle: '앞으로 다룰 내용', Component: Roadmap, kind: 'home' },
  { id: 'glossary', title: '📖 용어 사전', subtitle: 'JS·React 용어 총정리', Component: Glossary, kind: 'home' },
  { id: 0, title: '0단계 · 왜 리액트?', subtitle: '반응형 vs 명령형', Component: Stage0, docs: [D.reactingInput, D.thinking] },
  { id: 1, title: '1단계 · 컴포넌트', subtitle: '함수가 화면이 된다', Component: Stage1, docs: [D.firstComponent] },
  { id: 1.4, title: '🔍 개념 · 함수 vs 컴포넌트', subtitle: '컴포넌트는 어떤 함수?', Component: FunctionVsComponent, kind: 'concept', docs: [D.firstComponent, D.pureComponents] },
  { id: 1.45, title: '📝 개념 · JSX의 정체', subtitle: '무엇으로 변환될까', Component: JsxUnderTheHood, kind: 'concept', docs: [D.jsxMarkup, D.jsxCurly] },
  { id: 1.46, title: '📐 개념 · JSX 문법 규칙 6가지', subtitle: '쓸 때 지켜야 할 것', Component: JsxRules, kind: 'concept', docs: [D.jsxMarkup, D.jsxCurly] },
  { id: 1.5, title: '🧩 개념 · 캡슐화', subtitle: '겉은 컴포넌트, 속은 감춤', Component: Encapsulation, kind: 'concept', docs: [D.importExport] },
  ...makeSteps(1.6, componentPractice),
  { id: 2.1, group: '2단계 · props', title: '2-1 · props 기초', subtitle: '값 전달 · 재사용', Component: Step2_1, kind: 'sub', docs: [D.passingProps] },
  { id: 2.2, group: '2단계 · props', title: '2-2 · 더 넘겨보기', subtitle: '함수·상태·객체 전달', Component: Step2_2, kind: 'sub', docs: [D.passingProps] },
  { id: 2.3, group: '2단계 · props', title: '2-3 · children (합성)', subtitle: '태그 사이 내용 받기', Component: Step2_3, kind: 'sub', docs: [D.passingProps] },
  { id: 2.5, title: '✅ 체크포인트 A', subtitle: '팀 소개 페이지 (실습)', Component: CheckpointA, kind: 'checkpoint', docs: [D.passingProps] },
  { id: 3.1, group: '3단계 · 상태와 이벤트', title: '3-1 · useState 기초', subtitle: '카운터 · 좋아요', Component: Step3_1, kind: 'sub', docs: [D.respondingEvents, D.useState] },
  { id: 3.2, group: '3단계 · 상태와 이벤트', title: '3-2 · 상태 설계·함정', subtitle: '여러 상태 · 객체 · 스냅샷', Component: Step3_2, kind: 'sub', docs: [D.stateSnapshot, D.queueing, D.updatingObjects] },
  { id: 3.3, title: '🌊 개념 · 이벤트 전파 & 전개 props', subtitle: '버블링 · {...obj}', Component: EventPropagation, kind: 'concept', docs: [D.respondingEvents] },
  { id: 3.5, title: '🔀 개념 · props vs state', subtitle: '둘의 차이', Component: PropsVsState, kind: 'concept', docs: [D.thinking, D.stateMemory] },
  { id: 3.6, title: '🔁 개념 · 리렌더링', subtitle: '언제 다시 그려지나', Component: ReRender, kind: 'concept', docs: [D.renderCommit, D.stateSnapshot] },
  ...makeSteps(3.7, statePractice),
  { id: 4, title: '4단계 · 입력 다루기', subtitle: '그냥 두기 vs controlled · 단방향', Component: Stage4, docs: [D.reactingInput, D.input] },
  ...makeSteps(4.3, inputsPractice),
  { id: 3.81, group: '5단계 · 훅(Hook)', title: '5-1 · 훅이란 & 규칙', subtitle: 'use 함수 · 금지 위치', Component: StepHooks1, kind: 'sub', docs: [D.rulesOfHooks] },
  { id: 3.815, group: '5단계 · 훅(Hook)', title: '5-2 · 훅이 푸는 문제', subtitle: '훅 없이 vs 훅으로', Component: StepHooksBenefits, kind: 'sub', docs: [D.rulesOfHooks] },
  { id: 3.82, group: '5단계 · 훅(Hook)', title: '5-3 · 왜 그런 규칙인가', subtitle: '호출 순서', Component: StepHooks2, kind: 'sub', docs: [D.rulesOfHooks] },
  { id: 3.83, group: '5단계 · 훅(Hook)', title: '5-4 · 위반 예시 & 실습', subtitle: '직접 터뜨려 보기', Component: StepHooks3, kind: 'sub', docs: [D.rulesOfHooks] },
  { id: 3.84, group: '5단계 · 훅(Hook)', title: '5-5 · 리액트가 부른다', subtitle: '리렌더 감각 · 생명주기', Component: StepHooksRecursion, kind: 'sub', docs: [D.rulesOfHooks] },
  { id: 4.5, title: '🔀 개념 · 조건부 렌더링 3패턴', subtitle: '삼항 · && · 0 함정', Component: ConditionalRendering, kind: 'concept', docs: [D.conditional, D.renderingLists] },
  { id: 5, title: '6단계 · 리스트 (투두)', subtitle: 'map · key · 조건부 렌더링', Component: Stage5, docs: [D.renderingLists, D.sharingState] },
  { id: 5.5, title: '✅ 체크포인트 B', subtitle: '장보기 리스트 (실습)', Component: CheckpointB, kind: 'checkpoint', docs: [D.renderingLists] },
  { id: 6.1, group: '7단계 · 폼 입력 응용', title: '7-1 · 여러 입력 → 객체', subtitle: 'state·객체·공통 onChange', Component: Step6_1, kind: 'sub', docs: [D.updatingObjects] },
  { id: 6.2, group: '7단계 · 폼 입력 응용', title: '7-2 · 폼 제출', subtitle: 'onSubmit · 방명록', Component: Step6_2, kind: 'sub', docs: [D.updatingObjects, D.updatingArrays] },
  { id: 6.3, group: '7단계 · 폼 입력 응용', title: '7-3 · 유효성 검사', subtitle: 'validate · 파생 에러 · select', Component: Step6_3, kind: 'sub', docs: [D.updatingObjects, D.input] },
  ...makeSteps(6.9, formsPractice),
  { id: 7.1, group: '8단계 · Context (전역 상태)', title: '8-1 · prop drilling → Context', subtitle: '문제 → Provider 해결', Component: Step7_1, kind: 'sub', docs: [D.context, D.useContext] },
  { id: 7.2, group: '8단계 · Context (전역 상태)', title: '8-2 · 전역 상태', subtitle: 'state + setter 공유', Component: Step7_2, kind: 'sub', docs: [D.context, D.useContext] },
  { id: 7.3, group: '8단계 · Context (전역 상태)', title: '8-3 · 멀티스텝 폼', subtitle: 'Context로 상태 공유', Component: Step7_3, kind: 'sub', docs: [D.context, D.useContext, D.reusingLogic] },
  ...makeSteps(7.4, contextPractice),
  { id: 8.1, group: '9단계 · useEffect', title: '9-1 · useEffect + 의존성', subtitle: '렌더 후 실행 · deps', Component: Step8_1, kind: 'sub', docs: [D.effects, D.useEffect] },
  { id: 8.2, group: '9단계 · useEffect', title: '9-2 · 정리(cleanup)', subtitle: '타이머 뒷정리', Component: Step8_2, kind: 'sub', docs: [D.effects, D.useEffect] },
  { id: 8.3, group: '9단계 · useEffect', title: '9-3 · 데이터 불러오기', subtitle: 'loading → data', Component: Step8_3, kind: 'sub', docs: [D.effects] },
  { id: 8.4, group: '9단계 · useEffect', title: '9-4 · 다시 불러오기', subtitle: '의존성 변경', Component: Step8_4, kind: 'sub', docs: [D.effects] },
  { id: 8.5, group: '9단계 · useEffect', title: '9-5 · localStorage 저장', subtitle: 'lazy init · JSON · 지속', Component: Step8_5, kind: 'sub', docs: [D.effects, D.useEffect] },
  ...makeSteps(8.9, effectsPractice),
  { id: 9, title: '10단계 · 에러 읽는 법', subtitle: '고장난 코드 고치기', Component: Stage9, docs: [D.rulesOfHooks] },
  { id: 10, title: '11단계 · useReducer', subtitle: '상태 로직 모으기', Component: Step10Reducer, docs: [D.useReducer, D.extractingReducer] },
  { id: 11, title: '12단계 · 최적화', subtitle: 'memo · useMemo · useCallback', Component: Step11Optimize, docs: [D.memo, D.useMemo, D.useCallback] },
  { id: 12, title: '13단계 · Ref와 커스텀 훅', subtitle: 'useRef · 로직 재사용', Component: Step12RefHooks, docs: [D.useRef, D.manipulatingDom, D.reusingLogic] },
  ...makeSteps(12.1, refPractice),
  { id: 12.4, title: '🛠️ Lv1-1 · 할 일 앱 조립', subtitle: '완성된 조각을 배치·연결 (데이터 흐름)', Component: AssembleTodo, kind: 'app', isNew: true, builds: 'props · 콜백 · 상태 소유(3-1·3.5)', docs: [D.passingProps, D.sharingState] },
  { id: 12.5, title: '🛠️ Lv1-2 · 할 일 리스트+', subtitle: 'CRUD · 필터 · 저장', Component: CheckpointC, kind: 'app', docs: [D.updatingArrays, D.renderingLists] },
  { id: 12.9, title: '🛠️ Lv2-1 · 장바구니 조립', subtitle: '조각 배치·연결 (로직은 주어짐)', Component: AssembleCart, kind: 'app', isNew: true, builds: 'props · 콜백 · 상태 소유', docs: [D.useMemo, D.updatingArrays] },
  { id: 13, title: '🛠️ Lv2-2 · 장바구니', subtitle: '수량 · 합계(파생·useMemo)', Component: CartApp, kind: 'app', docs: [D.useMemo, D.updatingArrays] },
  { id: 13.2, title: '🛠️ Lv3-1 · 회원가입 폼 조립', subtitle: '완성된 조각을 배치·props로 연결', Component: AssembleSignup, kind: 'app', isNew: true, builds: 'props · onChange · 상태 소유', docs: [D.updatingObjects, D.input] },
  { id: 13.3, title: '🛠️ Lv3-2 · 회원가입 폼', subtitle: '유효성 검사 · 파생 에러', Component: SignupApp, kind: 'app', docs: [D.updatingObjects, D.input] },
  { id: 13.5, title: '🛠️ Lv4 · 목록 좌↔우 교환', subtitle: '두 배열 이동 · 불변성', Component: TransferApp, kind: 'app', docs: [D.updatingArrays] },
  { id: 14, title: '🛠️ Lv5 · 사용자 검색', subtitle: 'debounce · 목업 fetch', Component: SearchApp, kind: 'app', docs: [D.effects, D.useRef] },
  { id: 15, title: '🛠️ Lv6 · 퀴즈 게임', subtitle: 'useReducer · 타이머', Component: QuizApp, kind: 'app', docs: [D.useReducer, D.useEffect] },
  { id: 16, title: '🛠️ Lv7 · 미니 가계부', subtitle: 'Context+reducer · 저장 · 통계', Component: BudgetApp, kind: 'app', docs: [D.useReducer, D.context, D.reusingLogic] },
  // 🟨 JS 기본 트랙
  { id: 'js-intro', title: '🟨 JS 기본 — 트랙 소개', subtitle: '다룰 내용 미리보기', Component: JsWarmup, track: 'js' },
  { id: 'js-expr', title: 'JS 1 · 표현식 해부', subtitle: '문·식·항·인자로 쪼개기', Component: JsExprAnatomy, track: 'js' },
  { id: 'js-arrow', title: 'JS 2 · 화살표·삼항·템플릿', subtitle: '자주 쓰는 문법', Component: JsArrowTernary, track: 'js' },
  { id: 'js-func', title: 'JS 3 · 함수는 값이다', subtitle: '담기·넘기기·실행 · onClick', Component: JsFunctions, track: 'js' },
  { id: 'js-truthy', title: 'JS 4 · truthy / falsy', subtitle: '값의 참·거짓 · && 0 함정', Component: JsTruthyFalsy, track: 'js' },
  { id: 'js-array', title: 'JS 5 · 배열 map · filter', subtitle: '변환·거르기 · 리스트 전제', Component: JsArrayMethods, track: 'js' },
  { id: 'js-destructure', title: 'JS 6 · 구조 분해 · 스프레드', subtitle: 'props·불변성 전제', Component: JsDestructuring, track: 'js' },
  { id: 'js-async', title: 'JS 7 · Promise · async/await', subtitle: '비동기 · fetch 전제', Component: JsAsync, track: 'js' },

  // 추가된 챕터 종합연습(단계별 항목). 표시 순서는 CHAPTERS가 정하므로 여기 끝에 모아 둔다.
  ...makeSteps(2.4, propsPractice),
  ...makeSteps(3.9, hooksPractice),
  ...makeSteps(5.6, listsPractice),
  ...makeSteps('js-expr', jsExprPractice, { track: 'js' }),
  ...makeSteps('js-arrow', jsArrowPractice, { track: 'js' }),
  ...makeSteps('js-func', jsFuncPractice, { track: 'js' }),
  ...makeSteps('js-truthy', jsTruthyPractice, { track: 'js' }),
  ...makeSteps('js-array', jsArrayPractice, { track: 'js' }),
  ...makeSteps('js-destructure', jsDestrPractice, { track: 'js' }),
  ...makeSteps('js-async', jsAsyncPractice, { track: 'js' }),
]

// 책 목차 구조: 트랙(track) → 장(章) → 절(節). items는 위 lessons의 id를 가리킨다.
// 트랙은 '목표가 다른' 큰 갈래다: ⚛️ React(라이브러리) vs 🟨 JS 기본(언어).
// 새 강의를 추가할 땐 lessons에 한 줄 넣고, 여기 알맞은 트랙·장의 items에 id를 넣으면 된다.
const CHAPTERS = {
  react: [
    { n: '01', title: '왜 리액트인가', items: [0] },
    { n: '02', title: '컴포넌트와 JSX', items: [1, 1.4, 1.45, 1.46, 1.5, ...stepIds(1.6, 6)] },
    { n: '03', title: 'Props — 값 전달', items: [2.1, 2.2, 2.3, 2.5, ...stepIds(2.4, 6)] },
    { n: '04', title: '상태(State)', items: [3.1, 3.2, 3.3, 3.5, 3.6, ...stepIds(3.7, 6)] },
    { n: '05', title: '입력 다루기', items: [4, ...stepIds(4.3, 6)] },
    { n: '06', title: '훅(Hook)이란', items: [3.81, 3.815, 3.82, 3.83, 3.84, ...stepIds(3.9, 6)] },
    { n: '07', title: '리스트 렌더링', items: [4.5, 5, 5.5, ...stepIds(5.6, 6)] },
    { n: '08', title: '폼 입력 응용', items: [6.1, 6.2, 6.3, ...stepIds(6.9, 6)] },
    { n: '09', title: 'Context — 전역 상태', items: [7.1, 7.2, 7.3, ...stepIds(7.4, 6)] },
    { n: '10', title: 'useEffect', items: [8.1, 8.2, 8.3, 8.4, 8.5, ...stepIds(8.9, 6)] },
    { n: '11', title: '에러 읽는 법', items: [9] },
    { n: '12', title: 'useReducer', items: [10] },
    { n: '13', title: '최적화', items: [11] },
    { n: '14', title: 'Ref와 커스텀 훅', items: [12, ...stepIds(12.1, 6)] },
    { n: '15', title: '실전 앱 (난이도 순)', items: [12.4, 12.5, 12.9, 13, 13.2, 13.3, 13.5, 14, 15, 16] },
  ],
  js: [
    { n: 'J0', title: 'JS 기본 · 시작', items: ['js-intro'] },
    { n: 'J1', title: '표현식과 문', items: ['js-expr', ...stepIds('js-expr', 6)] },
    { n: 'J2', title: '자주 쓰는 문법', items: ['js-arrow', ...stepIds('js-arrow', 6)] },
    { n: 'J3', title: '함수는 값이다', items: ['js-func', ...stepIds('js-func', 6)] },
    { n: 'J4', title: '값의 참·거짓', items: ['js-truthy', ...stepIds('js-truthy', 6)] },
    { n: 'J5', title: '배열 다루기', items: ['js-array', ...stepIds('js-array', 6)] },
    { n: 'J6', title: '구조 분해·스프레드', items: ['js-destructure', ...stepIds('js-destructure', 6)] },
    { n: 'J7', title: '비동기', items: ['js-async', ...stepIds('js-async', 6)] },
  ],
}

// 사이드바 상단 트랙 탭
const TRACKS = [
  { key: 'react', label: '⚛️ React' },
  { key: 'js', label: '🟨 JS 기본' },
]

// 어떤 id가 어느 트랙에 속하나 (home/roadmap 등 트랙 밖이면 undefined)
const trackOfId = (id) =>
  TRACKS.find((t) => CHAPTERS[t.key].some((ch) => ch.items.includes(id)))?.key

const byId = Object.fromEntries(lessons.map((l) => [l.id, l]))

// 챕터 연습 단계 항목(3.71 등)의 상단 파일 바 — 폴더를 가리킨다(정확한 단계 파일은 페이지 안 practiceFile에 표시).
const STEP_DIRS = {
  1.6: 'concepts/component-practice',
  3.7: 'lessons/practice-state',
  4.3: 'lessons/practice-inputs',
  6.9: 'lessons/practice-forms',
  7.4: 'lessons/practice-context',
  8.9: 'lessons/practice-effects',
  12.1: 'lessons/practice-ref',
  2.4: 'lessons/practice-props',
  3.9: 'lessons/practice-hooks',
  5.6: 'lessons/practice-lists',
  'js-expr': 'lessons/practice-js-expr',
  'js-arrow': 'lessons/practice-js-arrow',
  'js-func': 'lessons/practice-js-func',
  'js-truthy': 'lessons/practice-js-truthy',
  'js-array': 'lessons/practice-js-array',
  'js-destructure': 'lessons/practice-js-destructure',
  'js-async': 'lessons/practice-js-async',
}
const STEP_FILES = Object.fromEntries(
  Object.entries(STEP_DIRS).flatMap(([base, dir]) => {
    const b = /^\d+(\.\d+)?$/.test(base) ? Number(base) : base // 숫자꼴만 숫자로, 'js-*'는 문자열 유지
    return stepIds(b, 6).map((id) => [id, `${dir}/index.jsx`])
  })
)

// 각 강의 페이지의 진입 파일 경로(src/ 기준). 상단 파일 바에 표시해, 어느 파일을 열어 고칠지 알려준다.
const FILES = {
  ...STEP_FILES,
  0: 'lessons/step0-why-react/index.jsx',
  1: 'lessons/step1-components/index.jsx',
  1.4: 'concepts/function-vs-component/index.jsx',
  1.45: 'concepts/jsx-under-the-hood/index.jsx',
  1.46: 'concepts/jsx-rules/index.jsx',
  1.5: 'concepts/encapsulation/index.jsx',
  1.6: 'concepts/component-practice/index.jsx',
  2.1: 'lessons/step2-props/step2-1-basics/index.jsx',
  2.2: 'lessons/step2-props/step2-2-more/index.jsx',
  2.3: 'lessons/step2-props/step2-3-children/index.jsx',
  2.5: 'checkpoints/checkpointA-team-page/index.jsx',
  3.1: 'lessons/step3-state-events/step3-1-basics/index.jsx',
  3.2: 'lessons/step3-state-events/step3-2-design/index.jsx',
  3.3: 'concepts/event-propagation/index.jsx',
  3.5: 'concepts/props-vs-state/index.jsx',
  3.6: 'concepts/rerender/index.jsx',
  3.7: 'lessons/practice-state/index.jsx',
  4.3: 'lessons/practice-inputs/index.jsx',
  6.9: 'lessons/practice-forms/index.jsx',
  7.4: 'lessons/practice-context/index.jsx',
  8.9: 'lessons/practice-effects/index.jsx',
  12.1: 'lessons/practice-ref/index.jsx',
  3.81: 'lessons/step-hooks-intro/step5-1-what/index.jsx',
  3.815: 'lessons/step-hooks-intro/step5-2-benefits/index.jsx',
  3.82: 'lessons/step-hooks-intro/step5-2-why/index.jsx',
  3.83: 'lessons/step-hooks-intro/step5-3-violations/index.jsx',
  3.84: 'lessons/step-hooks-intro/step5-5-recursion/index.jsx',
  4: 'lessons/step4-inputs/index.jsx',
  4.5: 'concepts/conditional-rendering/index.jsx',
  5: 'lessons/step5-lists/index.jsx',
  5.5: 'checkpoints/checkpointB-shopping/index.jsx',
  6.1: 'lessons/step6-forms/step6-1-form-state/index.jsx',
  6.2: 'lessons/step6-forms/step6-2-submit/index.jsx',
  6.3: 'lessons/step6-forms/step6-3-validation/index.jsx',
  7.1: 'lessons/step7-context/step7-1-context/index.jsx',
  7.2: 'lessons/step7-context/step7-2-global-state/index.jsx',
  7.3: 'lessons/step7-context/step7-3-multistep/index.jsx',
  8.1: 'lessons/step8-effects/step8-1-effect-basics/index.jsx',
  8.2: 'lessons/step8-effects/step8-2-cleanup/index.jsx',
  8.3: 'lessons/step8-effects/step8-3-fetch/index.jsx',
  8.4: 'lessons/step8-effects/step8-4-refetch/index.jsx',
  8.5: 'lessons/step8-effects/step8-5-localstorage/index.jsx',
  9: 'lessons/step9-errors/index.jsx',
  10: 'lessons/step10-reducer/index.jsx',
  11: 'lessons/step11-optimize/index.jsx',
  12: 'lessons/step12-ref-hooks/index.jsx',
  12.4: 'lessons/app-assemble-todo/index.jsx',
  12.5: 'checkpoints/checkpointC-todo/index.jsx',
  12.9: 'lessons/app-assemble-cart/index.jsx',
  13.2: 'lessons/app-assemble-signup/index.jsx',
  13: 'apps/app-cart/index.jsx',
  13.3: 'apps/app-signup/index.jsx',
  13.5: 'apps/app-transfer/index.jsx',
  14: 'apps/app-search/index.jsx',
  15: 'apps/app-quiz/index.jsx',
  16: 'apps/app-budget/index.jsx',
  'js-intro': 'lessons/js-warmup/index.jsx',
  'js-expr': 'lessons/js-warmup/expr-anatomy/index.jsx',
  'js-arrow': 'lessons/js-warmup/arrow-ternary-template/index.jsx',
  'js-func': 'lessons/js-warmup/functions-as-values/index.jsx',
  'js-truthy': 'lessons/js-warmup/truthy-falsy/index.jsx',
  'js-array': 'lessons/js-warmup/array-methods/index.jsx',
  'js-destructure': 'lessons/js-warmup/destructuring-spread/index.jsx',
  'js-async': 'lessons/js-warmup/async-await/index.jsx',
}

// ── URL 해시 ↔ 강의 id 동기화 헬퍼 ───────────────────────────
// id는 숫자(8.1 등) 또는 문자열('home','roadmap'). 해시로 담아 새로고침·공유·뒤로가기를 지원한다.
const idToHash = (id) => `#${id}`
// '#8.1' → 8.1(숫자), '#home' → 'home'(문자열). 숫자꼴만 숫자로(0x10 등 배제), 이상하면 null.
const hashToId = () => {
  try {
    const raw = decodeURIComponent(location.hash.replace(/^#/, ''))
    if (!raw) return null
    const n = /^\d+(\.\d+)?$/.test(raw) ? Number(raw) : NaN
    return Number.isNaN(n) ? raw : n
  } catch {
    return null // 깨진 해시(%E0 등)
  }
}
const validId = (id) => id != null && byId[id] !== undefined
// 첫 진입 id: 해시 > 마지막 위치(localStorage) > 홈. 무효 값은 무시한다.
const initialId = () => {
  const h = hashToId()
  if (validId(h)) return h
  try {
    const saved = localStorage.getItem('lastLesson')
    if (saved) {
      const n = /^\d+(\.\d+)?$/.test(saved) ? Number(saved) : saved
      if (validId(n)) return n
    }
  } catch {}
  return 'home'
}

export default function App() {
  // 지금 보고 있는 강의의 id. 해시/마지막 위치에서 복원한다.
  const [currentId, setCurrentId] = useState(initialId)
  // 펼쳐진 장(章)들. 처음엔 전부 펼쳐 두고, 사용자가 접었다 폈다 할 수 있다.
  // (인덱스 기준 — 트랙 중 장 수가 많은 react 기준으로 초기화)
  const [openChapters, setOpenChapters] = useState(() => new Set(CHAPTERS.react.map((_, i) => i)))
  const firstSync = useRef(true) // 첫 해시 기록은 replace(히스토리 오염 방지)
  // 사이드바 열림/접힘 — 집중 모드·좁은 화면용. localStorage에 저장.
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    try {
      const v = localStorage.getItem('sidebarOpen')
      if (v != null) return v !== 'false'
    } catch {}
    // 첫 방문: 넓은 화면은 열고, 폰(≤720px)은 접어 둔다.
    return typeof window !== 'undefined' ? window.innerWidth > 720 : true
  })
  useEffect(() => {
    try {
      localStorage.setItem('sidebarOpen', String(sidebarOpen))
    } catch {}
  }, [sidebarOpen])

  // 트랙(⚛️ React / 🟨 JS 기본). 현재 강의가 속한 트랙 우선, 없으면 저장값.
  const [track, setTrack] = useState(() => {
    const t = trackOfId(initialId())
    if (t) return t
    try {
      return localStorage.getItem('track') || 'react'
    } catch {
      return 'react'
    }
  })
  useEffect(() => {
    try {
      localStorage.setItem('track', track)
    } catch {}
  }, [track])
  // 강의를 열면(해시 등) 그 강의의 트랙으로 탭을 맞춘다. (home/roadmap은 트랙 밖 → 유지)
  useEffect(() => {
    const t = trackOfId(currentId)
    if (t && t !== track) setTrack(t)
  }, [currentId]) // eslint-disable-line react-hooks/exhaustive-deps
  // 탭 클릭 → 그 트랙 첫 강의로 이동
  const switchTrack = (key) => {
    if (key === track) return
    setTrack(key)
    const first = CHAPTERS[key][0]?.items[0]
    if (first != null) setCurrentId(first)
  }

  // 진도(📖)·연습(✏️)·복습(🔁) 3종을 따로 체크·저장한다.
  const [study, setStudy] = useState(() => {
    try {
      const raw = localStorage.getItem('doneStudy')
      // 구버전(doneLessons) 값이 있으면 '진도'로 이어받는다.
      return new Set(JSON.parse(raw ?? localStorage.getItem('doneLessons') ?? '[]'))
    } catch { return new Set() }
  })
  const [practice, setPractice] = useState(() => {
    try { return new Set(JSON.parse(localStorage.getItem('donePractice') || '[]')) } catch { return new Set() }
  })
  const [review, setReview] = useState(() => {
    try { return new Set(JSON.parse(localStorage.getItem('doneReview') || '[]')) } catch { return new Set() }
  })
  const [checkMode, setCheckMode] = useState(() => {
    try { return localStorage.getItem('checkMode') || 'study' } catch { return 'study' }
  })
  const CHECK_MODES = [
    { key: 'study', label: '📖 진도', set: study, setSet: setStudy },
    { key: 'practice', label: '✏️ 연습', set: practice, setSet: setPractice },
    { key: 'review', label: '🔁 복습', set: review, setSet: setReview },
  ]
  const activeMode = CHECK_MODES.find((m) => m.key === checkMode) ?? CHECK_MODES[0]
  // '연습' 체크는 실습형 항목(체크포인트·챕터 연습·실전 앱)에만, 진도·복습은 모든 항목에.
  const isPracticeItem = (l) => l.kind === 'checkpoint' || l.kind === 'app'
  const modeApplies = (modeKey, l) => (modeKey === 'practice' ? isPracticeItem(l) : true)
  const toggleCheck = (id) =>
    activeMode.setSet((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  // currentId → 해시 기록 + 마지막 위치 저장. 첫 동기화는 replace로(뒤로가기 깨짐 방지).
  useEffect(() => {
    const target = idToHash(currentId)
    if (location.hash !== target) {
      if (firstSync.current) history.replaceState(null, '', target)
      else location.hash = target // push → 뒤로/앞으로 동작
    }
    firstSync.current = false
    try {
      localStorage.setItem('lastLesson', String(currentId))
    } catch {}
  }, [currentId])

  // 뒤로/앞으로·주소 직접 변경 → 상태 반영 (무효 해시는 무시)
  useEffect(() => {
    const onHash = () => {
      const h = hashToId()
      if (validId(h)) setCurrentId(h)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  // 3종 체크 변경 → 각각 저장 (업데이터 밖에서, StrictMode 이중호출 안전)
  useEffect(() => { try { localStorage.setItem('doneStudy', JSON.stringify([...study])) } catch {} }, [study])
  useEffect(() => { try { localStorage.setItem('donePractice', JSON.stringify([...practice])) } catch {} }, [practice])
  useEffect(() => { try { localStorage.setItem('doneReview', JSON.stringify([...review])) } catch {} }, [review])
  useEffect(() => { try { localStorage.setItem('checkMode', checkMode) } catch {} }, [checkMode])

  const toggleChapter = (ci) =>
    setOpenChapters((prev) => {
      const next = new Set(prev)
      next.has(ci) ? next.delete(ci) : next.add(ci)
      return next
    })

  // 현재 모드의 진행률 — 장에 속한 항목만 분모로(home/roadmap 제외). '연습'은 실습형만.
  const allItems = CHAPTERS[track].flatMap((c) => c.items).map((id) => byId[id]).filter(Boolean)
  const modeItems = allItems.filter((l) => modeApplies(checkMode, l))
  const doneCount = modeItems.filter((l) => activeMode.set.has(l.id)).length
  const pct = modeItems.length ? Math.round((doneCount / modeItems.length) * 100) : 0

  // 현재 id에 해당하는 강의를 찾는다. (없으면 홈으로 안전하게 되돌린다)
  const current = lessons.find((lesson) => lesson.id === currentId) ?? lessons[0]
  const Current = current.Component

  // 강의 이동 — 폰(≤720px)에선 목차를 자동으로 닫아 내용이 바로 보이게 한다.
  const go = (id) => {
    setCurrentId(id)
    try { if (window.innerWidth <= 720) setSidebarOpen(false) } catch {}
  }

  return (
    <div className={'layout' + (sidebarOpen ? '' : ' sidebar-collapsed')}>
      {/* 모바일: 목차가 열리면 뒤를 덮는 배경(탭하면 닫힘) */}
      {sidebarOpen && <div className="sidebar-backdrop" onClick={() => setSidebarOpen(false)} aria-hidden="true" />}
      <aside className="sidebar">
        <div className="book-title">
          <span className="book-ico">📖</span>
          <span>리액트 입문 교재</span>
          <button
            className="sidebar-collapse"
            onClick={() => setSidebarOpen(false)}
            aria-label="사이드바 접기"
            title="사이드바 접기"
          >
            ◀
          </button>
        </div>

        {/* 트랙 탭 — 목표가 다른 두 갈래 */}
        <div className="track-tabs">
          {TRACKS.map((t) => (
            <button
              key={t.key}
              className={'track-tab' + (t.key === track ? ' on' : '')}
              onClick={() => switchTrack(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* 체크 모드 — 진도/연습/복습을 따로 체크·집계한다 */}
        <div className="check-tabs">
          {CHECK_MODES.map((m) => (
            <button
              key={m.key}
              className={'check-tab' + (m.key === checkMode ? ' on' : '')}
              onClick={() => setCheckMode(m.key)}
              title={m.key === 'practice' ? '실습형 항목만 체크된다' : ''}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* 선택한 모드의 진행률 */}
        <div className="progress">
          <div className="progress-track">
            <div className="progress-fill" style={{ width: pct + '%' }} />
          </div>
          <span className="progress-text">{activeMode.label} {doneCount}/{modeItems.length} · {pct}%</span>
        </div>

        <nav className="toc">
          <button
            className={'toc-home' + (currentId === 'home' ? ' active' : '')}
            onClick={() => go('home')}
          >
            🗺️ 커리큘럼 한눈에
          </button>

          {CHAPTERS[track].map((ch, ci) => {
            // 활성 강의가 든 장은 항상 펼쳐 둔다. 그 외엔 사용자가 토글한다.
            const hasCurrent = ch.items.includes(currentId)
            const open = openChapters.has(ci) || hasCurrent
            return (
              <div className="toc-chapter" key={ch.n}>
                <button
                  className={'toc-chapter-head' + (open ? ' open' : '')}
                  onClick={() => toggleChapter(ci)}
                  aria-expanded={open}
                >
                  <span className="toc-chev">▸</span>
                  <span className="toc-ch-n">{ch.n}</span>
                  <span className="toc-ch-title">{ch.title}</span>
                </button>

                {open && (
                  <div className="toc-sections">
                    {ch.items.map((id) => {
                      const l = byId[id]
                      if (!l) return null
                      const applies = modeApplies(checkMode, l)
                      const showNew = l.isNew && !study.has(id) // 새로 추가됐고 아직 진도 안 나감
                      return (
                        <div className="toc-item-row" key={id}>
                          {applies ? (
                            <input
                              type="checkbox"
                              className="toc-check"
                              checked={activeMode.set.has(id)}
                              onChange={() => toggleCheck(id)}
                              aria-label={`${activeMode.label}: ${l.title}`}
                            />
                          ) : (
                            <span className="toc-check-blank" aria-hidden="true" />
                          )}
                          <button
                            className={'toc-item' + (id === currentId ? ' active' : '')}
                            onClick={() => go(id)}
                          >
                            <span className="toc-item-title">
                              {showNew && <span className="toc-flag" title="새로 추가된 항목">🆕</span>}
                              {l.builds && <span className="toc-flag" title={`이어서 배운다: ${l.builds}`}>🔗</span>}
                              {l.title}
                            </span>
                            <span className="toc-item-sub">{l.subtitle}</span>
                          </button>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}

          {/* 용어 사전 · 로드맵 — 마지막 장 뒤에 둔다 */}
          <button
            className={'toc-home toc-roadmap' + (currentId === 'glossary' ? ' active' : '')}
            onClick={() => go('glossary')}
          >
            📖 용어 사전 · JS·React 총정리
          </button>
          <button
            className={'toc-home' + (currentId === 'roadmap' ? ' active' : '')}
            onClick={() => go('roadmap')}
          >
            🗺️ 로드맵 · 앞으로 다룰 내용
          </button>
        </nav>

        <p className="hint">
          각 강의 폴더의 <code>.jsx</code> 파일을 직접 수정하며 실습해 보자.<br />
          저장하면 화면이 자동으로 새로고침된다.
        </p>
      </aside>

      <main className="content">
        {!sidebarOpen && (
          <button
            className="sidebar-open"
            onClick={() => setSidebarOpen(true)}
            aria-label="목차 열기"
            title="목차 열기"
          >
            ☰ 목차
          </button>
        )}
        {/* 이 페이지의 소스 폴더. 어느 폴더를 열어 고치면 되는지 알려준다. (진입 파일은 칩으로 병기) */}
        {current.Component && FILES[current.id] && (
          <div className="page-file">
            <span className="page-file-ico">📁</span>
            <code>src/{FILES[current.id].replace(/index\.jsx$/, '')}</code>
            <span className="page-file-entry">index.jsx</span>
          </div>
        )}

        {/* Component가 있으면 그 강의를, 없으면(홈/알 수 없는 id) 커리큘럼 목록을 보여준다 */}
        {Current ? (
          <Current onGo={setCurrentId} />
        ) : (
          <Home chapters={CHAPTERS[track]} byId={byId} onGo={setCurrentId} />
        )}

        {/* 강의별 공식 문서(ko.react.dev) 링크 */}
        {current.docs && (
          <footer className="doc-links">
            <span className="doc-links-label">📚 공식 문서</span>
            {current.docs.map((d) => (
              <a key={d.u} className="doc-link" href={d.u} target="_blank" rel="noopener noreferrer">
                {d.t} ↗
              </a>
            ))}
          </footer>
        )}
      </main>
    </div>
  )
}
