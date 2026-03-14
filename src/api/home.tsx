import type { RequestHandler } from "express";
import lib from "../lib";

export const home: RequestHandler = async (req, res) => {
  const posts = await lib.Db.list();

  return posts.branch === 'error'
    ? lib.Html.send(res.status(404), <p>Nothing to show here.</p>)
    : lib.Html.send(res, <ul>{posts.value.map(p => <li><a href={p}>{p}</a></li>)}</ul>);
};
