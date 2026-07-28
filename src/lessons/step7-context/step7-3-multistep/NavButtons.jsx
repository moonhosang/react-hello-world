import { useForm, STEPS } from './FormContext.jsx'

// 이전 / 다음 / 제출 버튼 줄.
// props 없이 useForm()에서 step과 prev·next·submit을 꺼내 쓴다.
// 스텝 위치에 따라 버튼 구성이 바뀐다:
//   - 첫 스텝(0)이면 '이전'을 숨긴다.
//   - 마지막 스텝이면 '다음' 대신 '제출'을 보여준다.
export default function NavButtons() {
  const { step, prev, next, submit } = useForm()
  const isFirst = step === 0
  const isLast = step === STEPS.length - 1

  return (
    <div className="button-row" style={{ marginTop: 16, justifyContent: 'space-between' }}>
      {/* 첫 스텝이 아니면 '이전'. 첫 스텝이면 자리만 비운다(레이아웃 유지). */}
      {isFirst ? <span /> : <button onClick={prev}>← 이전</button>}

      {/* 마지막이면 제출, 아니면 다음 */}
      {isLast ? (
        <button onClick={submit} style={{ background: 'var(--brand)', color: '#fff', border: 'none' }}>
          제출하기 ✓
        </button>
      ) : (
        <button onClick={next}>다음 →</button>
      )}
    </div>
  )
}
