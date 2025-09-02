import { create } from "zustand"; //create함수: 스토어(상태 저장소) -> useState를 앱 전체에서 공유할 수 있게 만드는 버전

interface AuthState {
  isAuthenticated: boolean; //로그인 여부
  login: () => void; //로그인 처리 함수
  logout: () => void; //로그아웃 처리 함수
}

const useAuthStore = create<AuthState>((set) => ({
  //set: 스토어 안의 상태를 바꾸는 함수(스토어의 상태 객체 업데이트) == setState
  isAuthenticated: false,
  login: () => set({ isAuthenticated: true }),
  logout: () => set({ isAuthenticated: false }),
}));

export default useAuthStore;
