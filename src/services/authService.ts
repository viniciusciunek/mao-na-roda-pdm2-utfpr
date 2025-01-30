import pb from "./pocketbase";
import useAuth from "../store/useAuth";

const AuthService = {
    clearAuth: () => {
        pb.authStore.clear();
        useAuth.getState().logout();
    },

    isAuthenticated: (): boolean => pb.authStore.isValid,

    getRole: (): string | null => useAuth.getState().role,

    getCurrentUser: () => pb.authStore.model,

    loginWithRole: async (collection: string, email: string, password: string, role: string) => {
        const user = await pb.collection(collection).authWithPassword(email, password);

        useAuth.getState().setUser(user);
        useAuth.getState().setRole(role);

        pb.authStore.save(user.token, user);

        return user;
    },

};

export default AuthService;
