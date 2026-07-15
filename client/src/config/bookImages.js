/**
 * Book cover images live in client/src/assets/images/books/ and are
 * referenced in the database by filename only (e.g. "some-book.jpg").
 * This resolves that filename to the actual bundled asset URL, since
 * the images ship with the frontend rather than being served by the API.
 */
const files = import.meta.glob("../assets/images/books/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});

const byFilename = {};
for (const path in files) {
  const filename = path.split("/").pop();
  byFilename[filename] = files[path];
}

/**
 * @param {string} coverImage - filename as stored on the book document, e.g. "dune.jpg"
 * @returns {string|null} resolved asset URL, or null if the file hasn't been dropped in yet
 */
export function getBookCover(coverImage) {
  if (!coverImage) return null;
  return byFilename[coverImage] || null;
}
