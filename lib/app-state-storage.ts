type AppUserState = {
  inbox?: unknown;
  marketplace?: unknown;
  profile?: unknown;
};

type AppState = {
  users: Record<string, AppUserState>;
};

const APP_STATE_KEY = "esdiac-app-state";

function getCurrentUserId() {
  if (typeof document === "undefined") return "guest";
  return document.body.dataset.userId || "guest";
}

function readAppState() {
  if (typeof window === "undefined") return { users: {} } as AppState;
  const raw = window.localStorage.getItem(APP_STATE_KEY);
  return raw ? (JSON.parse(raw) as AppState) : { users: {} };
}

function writeAppState(state: AppState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(APP_STATE_KEY, JSON.stringify(state));
}

export function readUserSlice<T>(slice: keyof AppUserState) {
  const state = readAppState();
  return state.users[getCurrentUserId()]?.[slice] as T | null | undefined;
}

export function writeUserSlice<T>(slice: keyof AppUserState, value: T) {
  const state = readAppState();
  const userId = getCurrentUserId();
  writeAppState({
    users: {
      ...state.users,
      [userId]: { ...state.users[userId], [slice]: value },
    },
  });
}
