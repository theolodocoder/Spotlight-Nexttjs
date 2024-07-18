export function stringToSlug(str: string) {
  // Replace any non-word character with a hyphen
  const slug = str.replace(/\W+/g, "-");

  // Remove leading and trailing hyphens
  return slug.replace(/^-+|-+$/g, "")
}
