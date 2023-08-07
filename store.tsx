import create from 'zustand';

interface AppStore {
    phoneNumber: string;
    setPhoneNumber: (phoneNumber: string) => void;
}

export const useStore = create<AppStore>((set) => ({
    phoneNumber: '',
    setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
}));