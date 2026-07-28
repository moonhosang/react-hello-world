// 네트워크 없이 'useEffect로 데이터 불러오기'를 연습하기 위한 가짜 API.
// 실제 fetch처럼 Promise를 돌려주되, setTimeout으로 지연만 흉내 낸다.
// (인터넷이 없어도 항상 똑같이 동작하도록 일부러 로컬 데이터를 쓴다.)

const DB = {
  all: [
    { id: 1, name: '김코딩', role: '프론트엔드' },
    { id: 2, name: '이디자인', role: '디자이너' },
    { id: 3, name: '박백엔드', role: '백엔드' },
  ],
  frontend: [{ id: 1, name: '김코딩', role: '프론트엔드' }],
  backend: [{ id: 3, name: '박백엔드', role: '백엔드' }],
}

export function fetchUsers(category = 'all') {
  return new Promise((resolve) => {
    setTimeout(() => resolve(DB[category] ?? DB.all), 800)
  })
}

// id로 사용자 한 명의 상세 정보를 가져오는 가짜 API. (userId가 바뀌면 다시 부르는 연습용)
const USERS = {
  1: { id: 1, emoji: '👩‍💻', name: '김코딩', role: '프론트엔드', bio: 'React로 화면을 만든다.' },
  2: { id: 2, emoji: '🧑‍🎨', name: '이디자인', role: '디자이너', bio: '디자인 시스템을 다듬는다.' },
  3: { id: 3, emoji: '🧑‍🔬', name: '박백엔드', role: '백엔드', bio: 'API와 데이터베이스를 책임진다.' },
}

export function fetchUser(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = USERS[userId]
      user ? resolve(user) : reject(new Error(`사용자 ${userId}를 찾을 수 없다`))
    }, 800)
  })
}
