export function handleToSlug(handle: string) {
  return handle.replace(/^@/, "").toLowerCase();
}

export function slugToHandle(slug: string) {
  return `@${slug}`;
}

export function sessionToHandle(name: string) {
  return `@${name.toLowerCase().replace(/\s+/g, "_")}`;
}
