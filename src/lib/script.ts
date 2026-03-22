import type { RequestHandler } from "express";
import esbuild from "esbuild";
import fs from "fs";
import path from "path";

/**  */
export const script: RequestHandler = async (req, res) => {
  const { src } = req.params;
  if (typeof src !== 'string') return res.status(400).send('invalid route parameter');

  try {
    const scriptPath = path.join(process.cwd(), 'src', 'api', src, 'script.ts');
    if (!fs.existsSync(scriptPath)) return res.status(404).send('client script not found');

    const tsCode = await fs.promises.readFile(scriptPath, 'utf-8');

    const result = await esbuild.build({
      entryPoints: [scriptPath],
      bundle: true,
      format: 'esm',
      platform: 'browser',
      write: false,
      target: 'es2020'
    });

    const bundle = result.outputFiles?.[0]?.text;
    if (bundle === undefined) return res.status(500).send();

    res.setHeader('Content-Type', 'application/javascript').send(bundle);
  }
  catch (error: any) {
    console.error('error transpiling client script:', error);
    res.status(500).send(`error processing client script: ${error.message}`);
  }
};
