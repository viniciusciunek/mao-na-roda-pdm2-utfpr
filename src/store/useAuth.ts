import { Admin } from "../types/Admin";
import { Customer } from "../types/Customer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type UseAuthState = {
    user: Admin | Customer | null;
    token: string | null;
    role: string | null;
    loading: boolean;
}

type UseAuthActions = {
    setLoading: (loading: boolean) => void;
    setData: (data: { user: Admin | Customer, token: string, role: string }) => void;
    logout: () => void;
}

type UseAuth = UseAuthState & UseAuthActions;

/**
 * Hook de autenticação usando Zustand e persistência com AsyncStorage.
 */
const useAuth = create<UseAuth>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            role: null,
            loading: false,
            setLoading: (loading: boolean) => set({ loading }),
            setData: ({ user, token, role }) => set({ user, token, role, loading: false }),
            logout: () => set({ user: null, token: null, role: null, loading: false }),
        }),
        {
            name: "user-state-key-in-asyncstorage",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);

export default useAuth;
