import type { RequestHandler } from "express";
import lib from "../lib";

export const style: RequestHandler = async (req, res) => {
  const css = await lib.Sass.compile();

  return css.branch === 'error'
    ? res.status(500).send('Sass compilation error')
    : res.header('Content-Type', 'text/css').send(css.value);
};
