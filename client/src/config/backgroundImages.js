/**
 * Maps each background "slot" in the UI to an image file.
 *
 * HOW TO USE:
 * 1. Drop your chosen images into client/src/assets/images/backgrounds/
 * 2. Rename them (or update the paths below) to match these keys.
 * 3. If a file for a slot doesn't exist, the app falls back to the
 *    ink gradient defined in tailwind.config.js — never a stock placeholder.
 *
 * Vite's import.meta.glob eagerly imports every image in the folder so
 * you don't have to add an import statement by hand each time you swap one in.
 */
const files = import.meta.glob("../assets/images/backgrounds/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});

// Build a lookup from filename (no extension) -> resolved URL
const byName = {};
for (const path in files) {
  const name = path.split("/").pop().replace(/\.[^/.]+$/, "");
  byName[name] = files[path];
}

/**
 * Slot -> expected filename (without extension).
 * Rename your dropped-in files to match, or edit the values here instead.
 */
export const BACKGROUND_SLOTS = {
  hero: "hero",
  catalogBanner: "catalog-banner",
  aboutBanner: "about-banner",
  categoryFiction: "category-fiction",
  categoryNonFiction: "category-nonfiction",
  footerBanner: "footer-banner",
};

export function getBackgroundImage(slotKey) {
  const filename = BACKGROUND_SLOTS[slotKey];
  return byName[filename] || null; // null triggers the CSS gradient fallback
}
