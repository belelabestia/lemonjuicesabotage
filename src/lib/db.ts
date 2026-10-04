import fs from 'fs/promises';
import path from 'path';
import tstd from '../tstd';

const POSTS_DIR = path.join(process.cwd(), 'posts');

/** the `YYYY-MM-DD` prefix of a dated post filename, or null when it has none */
const postDate = (file: string) => /^(\d{4}-\d{2}-\d{2})_/.exec(file)?.[1] ?? null;

/** orders posts newest first; dated posts lead, undated ones trail alphabetically */
const byNewest = (a: string, b: string) => {
  const dateA = postDate(a);
  const dateB = postDate(b);

  if (dateA && dateB) return dateB.localeCompare(dateA) || a.localeCompare(b);
  if (dateA) return -1;
  if (dateB) return 1;

  return a.localeCompare(b);
};

/** initializes the posts directory, ensuring it exists */
export const init = async () => {
  try {
    await fs.mkdir(POSTS_DIR, { recursive: true });
    console.log(`Posts directory ensured at: ${POSTS_DIR}`);

    return tstd.Result.success();
  }
  catch (error) {
    console.error('Error initializing posts directory:', error);
    return tstd.Result.error();
  }
};

/** lists all post files in the posts directory */
export const list = async () => {
  try {
    const files = await fs.readdir(POSTS_DIR);

    const fileStats = await Promise.all(files.map(async (file) => {
      const filePath = path.join(POSTS_DIR, file);

      try {
        const stat = await fs.stat(filePath);
        if (stat.isDirectory()) return;

        return file;
      }
      catch (error) {
        console.error(`Error stating file ${file}:`, error);
      }
    }));

    return tstd.Result.success(
      fileStats
        .filter((item): item is string => item !== undefined)
        .sort(byNewest)
    );
  }
  catch (error) {
    console.error('Error listing posts:', error);
    return tstd.Result.error();
  }
};

/** reads the content of a specific post file */
export const read = async (slug: string) => {
  const filePath = path.join(POSTS_DIR, slug);
  const resolvedPath = path.resolve(filePath);

  if (!path.resolve(filePath).startsWith(path.resolve(POSTS_DIR))) {
    console.error(`Path traversal attempt detected for slug: "${slug}. Resolved path "${resolvedPath}" is outside of "${POSTS_DIR}"`);
    return tstd.Result.error();
  }

  try {
    return tstd.Result.success(
      await fs.readFile(filePath, 'utf-8')
    );
  }
  catch (error) {
    console.error(`Error reading post "${slug}":`, error);
    return tstd.Result.error();
  }
};
