import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type UseAuthState = {
    loading: boolean;
    role: string | null;
}

type UseAuthActions = {
    setRole: (role: string) => void;
    logout: () => void;
    setLoading: (loading: boolean) => void;
}

type UseAuth = UseAuthState & UseAuthActions;

/**
 * Hook de autenticação usando Zustand e persistência com AsyncStorage.
 */
const useAuth = create<UseAuth>()(
    persist(
        (set) => ({
            role: null,
            loading: false,
            setLoading: (loading) => set({ loading }),
            setRole: (role) => set({ role }),
            logout: () => set({ role: null }),
        }),
        {
            name: "user-role-key-in-asyncstorage",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);

export default useAuth;
