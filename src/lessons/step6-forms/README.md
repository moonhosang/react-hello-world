# 7단계 · 폼 입력 응용

4단계에서 배운 controlled input을 **폼**으로 확장한다. 두 걸음으로 차근차근.

> 7~10단계의 하위 단계는 **개념 + 라이브 데모 중심**이다. (0~6단계와 달리 별도 `practice.jsx`/`solution.jsx`는 두지 않고, 데모 코드를 직접 고쳐가며 익힌다.)

| 하위 | 배우는 것 | 폴더 |
|---|---|---|
| **7-1** | 여러 입력 → 객체 하나로 관리 (공통 onChange) | `step6-1-form-state` |
| **7-2** | `onSubmit` · `preventDefault`로 제출 (방명록) | `step6-2-submit` |

## 흐름

- **7-1**: 입력이 여러 개면 state·onChange도 그만큼 → 번거롭다. 관련 값은 **객체 하나 + 공통 onChange**로 묶는다.
- **7-2**: `<form onSubmit>`에서 `e.preventDefault()`로 새로고침을 막고, 값을 목록에 추가.

→ 이전: [✅ 체크포인트 B](../../checkpoints/checkpointB-shopping/README.md) · 다음: [8단계 · Context](../step7-context/README.md)
