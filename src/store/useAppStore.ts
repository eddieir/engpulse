import { create } from "zustand";
import type { User, Workspace, Repository } from "@/types";
import { mockUser, mockWorkspace, mockRepositories } from "@/lib/mock-data";

interface AppState {
  user: User;
  workspace: Workspace;
  selectedRepositories: Repository[];
  viewMode: "ceo" | "engineering";
  onboardingComplete: boolean;
  setViewMode: (mode: "ceo" | "engineering") => void;
  toggleRepository: (repoId: string) => void;
  completeOnboarding: () => void;
  setUser: (user: Partial<User>) => void;
  setWorkspace: (ws: Partial<Workspace>) => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: mockUser,
  workspace: mockWorkspace,
  selectedRepositories: mockRepositories,
  viewMode: "ceo",
  onboardingComplete: false,
  setViewMode: (mode) => set({ viewMode: mode }),
  toggleRepository: (repoId) =>
    set((state) => ({
      selectedRepositories: state.selectedRepositories.map((r) =>
        r.id === repoId ? { ...r, selected: !r.selected } : r
      ),
    })),
  completeOnboarding: () => set({ onboardingComplete: true }),
  setUser: (user) =>
    set((state) => ({ user: { ...state.user, ...user } })),
  setWorkspace: (ws) =>
    set((state) => ({ workspace: { ...state.workspace, ...ws } })),
}));
