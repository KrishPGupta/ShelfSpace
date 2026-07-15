// Assigns each catalog category a consistent "spine color", used as a
// left-edge accent bar on book cards so browsing the catalog reads like
// scanning a color-coded shelf. Add new categories here as they're seeded.
export const CATEGORY_COLORS = {
  Fiction: "#7A2E2E", // burgundy
  "Non-Fiction": "#4A5A5C", // slate
  "Sci-Fi": "#2E4A5A", // deep teal-blue
  Fantasy: "#5A3E7A", // muted violet
  Mystery: "#2E2E2E", // near-black
  Biography: "#8C6E3B", // brass-dark
  Poetry: "#7A5A2E", // amber-brown
  default: "#4A5A5C",
};

export function getSpineColor(category) {
  return CATEGORY_COLORS[category] || CATEGORY_COLORS.default;
}
