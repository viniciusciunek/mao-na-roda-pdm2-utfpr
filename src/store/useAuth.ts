import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type UseAuthState = {
    loading: boolean;
    role: string | null;
    user: object | null;
}

type UseAuthActions = {
    setUser: (user: object) => void;
    setRole: (role: string) => void;
    logout: () => void;
    setLoading: (loading: boolean) => void;
}

type UseAuth = UseAuthState & UseAuthActions;

const useAuth = create<UseAuth>()(
    persist(
        (set) => ({
            user: null,
            role: null,
            loading: false,

            setUser: (user) => set({ user }),
            setRole: (role) => set({ role }),
            setLoading: (loading) => set({ loading }),

            logout: () => set({ role: null, user: null }),
        }),
        {
            name: "user-role-key-in-asyncstorage",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);

export default useAuth;
