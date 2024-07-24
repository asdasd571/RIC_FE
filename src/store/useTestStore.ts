import  { create }  from 'zustand';

interface State {
    count: number
    increment: () => void
    decrement: () => void
}

// 초기 상태 정의
const useTestStore = create<State>((set) => ({
    count:0,
    //  객체 리터럴을 반환할 때 중괄호 {}를 소괄호 ()로 감싸야 합니다. 
    increment: () => set((state) => ({ count: state.count + 1 })), // 더하는 함수
    decrement: () => set((state) => ({ count: state.count - 1 })), // 빼는 함수
}))

export default useTestStore;