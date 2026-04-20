import { readUserSlice, writeUserSlice } from "@/lib/app-state-storage";
export type OwnProfileDraft = {
  avatar: string;
  bio: string;
  displayName: string;
};

export function readOwnProfile() {
  return readUserSlice<OwnProfileDraft>("profile") ?? null;
}

export function writeOwnProfile(profile: OwnProfileDraft) {
  writeUserSlice("profile", profile);
}
