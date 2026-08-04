// 📝 종합연습 · JS 화살표·삼항·템플릿 (config)
// 화살표 함수 + 삼항 + 템플릿 리터럴로 성적 등급 카드를 만든다. 5단계, 스캐폴딩만 감소.

import PracticeL1 from './practiceL1.jsx'
import PracticeL2 from './practiceL2.jsx'
import PracticeL3 from './practiceL3.jsx'
import PracticeL4 from './practiceL4.jsx'
import PracticeL5 from './practiceL5.jsx'
import SolutionArrow from './solution.jsx'

const PRACTICE = {
  shortTitle: 'JS·화살표',
  header: '화살표 함수·삼항·템플릿 리터럴로 점수를 등급으로 바꿔 성적 카드를 만든다.',
  goal: '삼항으로 등급을 정하는 화살표 함수와 템플릿 문자열을 완성한다.',
  builds: 'JS 2',
  solution: <SolutionArrow />,
  solutionFile: 'practice-js-arrow/solution.jsx',
  levels: [
    {
      label: '아주 쉬움',
      point: '삼항 한 줄만 채운다.',
      file: 'practice-js-arrow/practiceL1.jsx',
      task: '등급이 ?로 나온다. grade의 삼항 한 줄만 채우자.',
      hints: [
        '① 어디 — practiceL1.jsx의 const grade = (s) => \'?\' 줄.',
        '② 어떻게 — s >= 90 ? \'A\' : s >= 80 ? \'B\' : \'C\'. (앞 조건부터 차례로 검사)',
        '③ 확인 — 88점이라 🏅 B가 뜬다.',
      ],
      node: <PracticeL1 />,
    },
    {
      label: '쉬움',
      point: '템플릿 리터럴로 문구를 만든다.',
      file: 'practice-js-arrow/practiceL2.jsx',
      task: '안내 문구가 비어 있다. 템플릿 리터럴로 message를 만들자. (grade는 완성됨)',
      hints: [
        '① 무엇 — 백틱 ` ` 안에서 ${ } 로 값·함수 호출을 끼운다.',
        '② 어떻게 — `${name}님: ${score}점 → ${grade(score)}등급`.',
        '③ 확인 — "민지님: 88점 → B등급"이 뜬다.',
      ],
      node: <PracticeL2 />,
    },
    {
      label: '중간',
      point: '화살표 함수와 문자열을 둘 다 만든다.',
      file: 'practice-js-arrow/practiceL3.jsx',
      task: 'grade의 삼항과 message를 둘 다 채우자.',
      hints: [
        '① grade — (s) => s >= 90 ? \'A\' : s >= 80 ? \'B\' : \'C\'.',
        '② message — `${name}님: ${score}점 → ${grade(score)}등급`.',
        '③ 확인 — 등급과 문구가 함께 뜬다.',
      ],
      node: <PracticeL3 />,
    },
    {
      label: '어려움',
      point: '함수 정의부터 화면에 꽂기까지.',
      file: 'practice-js-arrow/practiceL4.jsx',
      task: '변수만 있다. grade(화살표+삼항)·message를 만들고, 화면의 ?·빈 문구를 {grade(score)}·{message}로 바꾸자.',
      hints: [
        '① TODO A — const grade = (s) => (s >= 90 ? \'A\' : s >= 80 ? \'B\' : \'C\').',
        '② TODO B — const message = `${name}님: ${score}점 → ${grade(score)}등급`.',
        '③ TODO C·D — 🏅 ? → 🏅 {grade(score)}, 빈 <p>에 {message}.',
      ],
      node: <PracticeL4 />,
    },
    {
      label: '도전',
      point: '빈 화면에서 처음부터.',
      file: 'practice-js-arrow/practiceL5.jsx',
      task: '주어진 값(name·score)만 있다. 성적 카드를 처음부터 만들자.',
      hints: [
        '① grade = (s) => 삼항으로 A/B/C.',
        '② message = `${name}님: ${score}점 → ${grade(score)}등급`.',
        '③ 카드에 {grade(score)}·{message}를 표시한다. 👀 정답 보기로 비교하라.',
      ],
      node: <PracticeL5 />,
    },
  ],
}
export default PRACTICE
