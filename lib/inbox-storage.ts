import { readUserSlice, writeUserSlice } from "@/lib/app-state-storage";
import type { InboxThread } from "@/lib/mock/inbox";

export function readInboxThreads() {
  return readUserSlice<InboxThread[]>("inbox") ?? null;
}

export function writeInboxThreads(threads: InboxThread[]) {
  writeUserSlice("inbox", threads);
}
