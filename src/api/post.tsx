import type { RequestHandler } from "express";
import lib from "../lib";

export const post: RequestHandler = async (req, res) => {
  const slug = req.params.slug;
  if (typeof slug !== 'string') return res.status(400).send('Invalid slug.');

  const content = await lib.Db.read(slug);

  return content.branch === 'error'
    ? lib.Html.send(res, <p>Hello</p>)
    : lib.Html.send(res, <lib.Md.Render content={content.value} />);
}
