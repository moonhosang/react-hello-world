// 📝 JS 종합연습 · Promise · async/await (config)
// 같은 '불러오기' 화면을 스캐폴딩만 줄여가며 5단계로. 컴포넌트 대신 데이터(config)를 export한다.

import PracticeL1 from './practiceL1.jsx'
import PracticeL2 from './practiceL2.jsx'
import PracticeL3 from './practiceL3.jsx'
import PracticeL4 from './practiceL4.jsx'
import PracticeL5 from './practiceL5.jsx'
import SolutionAsyncLoader from './solution.jsx'

const PRACTICE = {
  shortTitle: 'JS·비동기',
  header: '버튼을 누르면 0.8초 뒤 오는 값을 async/await로 기다렸다 화면에 표시한다.',
  goal: '가짜 fetch를 await로 받아 로딩 → 결과를 보여 주는 불러오기 버튼을 완성한다.',
  builds: 'JS 7',
  solution: <SolutionAsyncLoader />,
  solutionFile: 'practice-js-async/solution.jsx',
  levels: [
    {
      label: '아주 쉬움',
      point: '거의 다 된 코드에서 await 한 곳만 붙인다.',
      file: 'practice-js-async/practiceL1.jsx',
      task: '불러오기를 눌러도 이름 대신 이상한 값이 뜬다. await를 붙여 값을 기다리자.',
      hints: [
        '① 왜 — await가 없으면 name에 값이 아니라 아직 안 온 상자(Promise)가 담긴다.',
        '② 어디 — practiceL1.jsx의 const name = fakeFetch() 🟢 줄.',
        '③ 어떻게 — const name = await fakeFetch(). 값이 올 때까지 기다렸다 담는다.',
      ],
      node: <PracticeL1 />,
    },
    {
      label: '쉬움',
      point: 'await로 값을 받아 화면에 넣는 줄을 직접 쓴다.',
      file: 'practice-js-async/practiceL2.jsx',
      task: 'load 안에서 값 받는 부분이 비어 있다. await로 받아 화면에 넣자.',
      hints: [
        '① 무엇 — 예전엔 fakeFetch().then(name => setUser(name)) 였다. 여기선 await로 더 간단히.',
        '② 어디 — practiceL2.jsx의 load 안 🟡 TODO.',
        '③ 어떻게 — const name = await fakeFetch(); setUser(name).',
      ],
      node: <PracticeL2 />,
    },
    {
      label: '중간',
      point: '로딩 상태를 켜고 끄는 자리를 채운다.',
      file: 'practice-js-async/practiceL3.jsx',
      task: '값은 오는데 "불러오는 중…"이 안 뜬다. 시작·끝에 loading을 켜고 끄자.',
      hints: [
        '① 왜 — 0.8초 기다리는 동안 사용자에게 진행 중임을 알려야 한다.',
        '② TODO A — 맨 앞에 setLoading(true).',
        '③ TODO B — 끝에 setLoading(false). (await 아래, 값이 온 뒤)',
      ],
      node: <PracticeL3 />,
    },
    {
      label: '어려움',
      point: 'async 함수 흐름을 통째로 직접 쓴다.',
      file: 'practice-js-async/practiceL4.jsx',
      task: 'load 함수가 비어 있다. 로딩 → await → 화면 → 로딩끄기 순서로 채우자.',
      hints: [
        '① 순서 — setLoading(true) → const name = await fakeFetch() → setUser(name) → setLoading(false).',
        '② await는 async 함수 안에서만 쓴다(load는 async로 선언돼 있다).',
        '③ 확인 — 누르면 "불러오는 중…" 뒤 👤 김코딩이 뜬다.',
      ],
      node: <PracticeL4 />,
    },
    {
      label: '도전',
      point: '빈 화면에서 state·async·버튼을 처음부터.',
      file: 'practice-js-async/practiceL5.jsx',
      task: '껍데기만 있다. 불러오기 버튼을 처음부터 만들자(state + async load + 버튼·결과).',
      hints: [
        '① state — const [user, setUser] = useState(null); const [loading, setLoading] = useState(false).',
        '② load — async () => { setLoading(true); const name = await fakeFetch(); setUser(name); setLoading(false) }.',
        '③ 화면 — 버튼(loading이면 "⏳ 불러오는 중…")과 결과(👤 {user}). 👀 정답 보기로 비교하라.',
      ],
      node: <PracticeL5 />,
    },
  ],
}
export default PRACTICE
