import type { RequestHandler } from "express";
import lib from "../lib";

const Nav = () => (
  <nav>
    <a href="/">Home</a>
  </nav>
);

const Post = (props: { content: string; }) => (
  <div className="post">
    <Nav />
    <main>
      <lib.Md.Render content={props.content} />
    </main>
  </div>
);

export const post: RequestHandler = async (req, res) => {
  const slug = req.params.slug;
  if (typeof slug !== 'string') return res.status(400).send('Invalid slug.');

  const contentResult = await lib.Db.read(slug);
  const pageTitle = `ljs - post: ${slug}`;

  return contentResult.branch === 'error'
    ? lib.Html.send(res.status(500), <p>Error loading post '{slug}'.</p>, "Post Error")
    : lib.Html.send(res, <Post content={contentResult.value} />, pageTitle);
}
