import sass from 'sass';
import path from 'path';
import tstd from '../tstd';

const STYLE_PATH = path.join(process.cwd(), 'index.sass');

let cachedCss: string | null = null;

/** compiles the main sass file and caches it in memory */
export const compile = async () => {
  try {
    return tstd.Result.success(
      cachedCss ??= (await sass.compileAsync(STYLE_PATH)).css
    );
  } catch (error) {
    console.error('Sass compilation error:', error);
    return tstd.Result.error();
  }
};
