import { createJSONStorage, persist } from "zustand/middleware";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

type UseAuthState = {
    role: string | null;
}

type UseAuthActions = {
    setRole: (role: string) => void;
    logout: () => void;
}

type UseAuth = UseAuthState & UseAuthActions;

const useAuth = create<UseAuth>()(
    persist(
        (set) => ({
            role: null,
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
