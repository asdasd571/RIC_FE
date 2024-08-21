import { create } from 'zustand';

interface Nickname {
    nickname: string; // 닉네임
    storeNickname: (newNickname: string) => void; // 닉네임 저장 함수
}

// * 닉네임 전역 상태 관리
export const useNicknameStore = create<Nickname>((set) => ({
    nickname: 'nickname',
    storeNickname: (newNickname) => { // 닉네임 변경 함수
        set({ nickname: newNickname }); // 입력받은 닉네임으로 상태 업데이트
    }
}));
