// 이 앱 전용 가짜 검색 API다. (공용 fakeApi.js와 분리해 이 폴더 안에 자체적으로 둔다)
// 실제 서버 대신 로컬 배열을 쓰고, setTimeout 400ms로 네트워크 지연만 흉내 낸다.
// 이름 부분일치로 필터해 Promise로 돌려준다.

const USERS = [
  { id: 1, emoji: '👩‍💻', name: '김코딩', role: '프론트엔드' },
  { id: 2, emoji: '🧑‍🎨', name: '이디자인', role: '디자이너' },
  { id: 3, emoji: '🧑‍🔬', name: '박백엔드', role: '백엔드' },
  { id: 4, emoji: '🧑‍💼', name: '최기획', role: '기획자' },
  { id: 5, emoji: '🧑‍🏫', name: '정데이터', role: '데이터 분석' },
  { id: 6, emoji: '👨‍🔧', name: '한데브옵스', role: '데브옵스' },
  { id: 7, emoji: '👩‍🚀', name: '김도전', role: 'QA' },
  { id: 8, emoji: '🧑‍🎤', name: '이코딩', role: '풀스택' },
]

// query가 이름에 부분일치하는 사용자들을 400ms 뒤에 돌려준다.
export function searchUsers(query) {
  const q = query.trim().toLowerCase()
  return new Promise((resolve) => {
    setTimeout(() => {
      const hit = USERS.filter((u) => u.name.toLowerCase().includes(q))
      resolve(hit)
    }, 400)
  })
}
