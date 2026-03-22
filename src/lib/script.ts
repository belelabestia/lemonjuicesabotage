import type { RequestHandler } from "express";
import esbuild from "esbuild";
import fs from "fs";
import path from "path";

export const script: RequestHandler = async (req, res) => {
  const routeParam = req.params.route;
  if (typeof routeParam !== 'string') {
    return res.status(400).send('invalid route parameter');
  }

  try {
    const scriptPath = path.join(process.cwd(), 'src', 'api', routeParam, 'script.ts');

    if (!fs.existsSync(scriptPath)) {
      return res.status(404).send('client script not found');
    }

    const tsCode = await fs.promises.readFile(scriptPath, 'utf-8');

    const result = await esbuild.transform(tsCode, {
      loader: 'ts',
      target: 'es2020',
      format: 'esm',
    });

    res.setHeader('Content-Type', 'application/javascript');
    res.send(result.code);

  } catch (error: any) {
    console.error('error transpiling client script:', error);
    res.status(500).send(`error processing client script: ${error.message}`);
  }
};
