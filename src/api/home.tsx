import type { RequestHandler } from "express";
import lib from "../lib";

type Posts = { posts: string[] };

const TuiPostList = (props: Posts) => (
  <ul className="tui-post-list">
    {
      props.posts.length > 0
        ? props.posts.map(p => (
          <li key={p}><a href={p}>{p}</a></li>
        ))
        : <p>No posts available.</p>
    }
  </ul>
);

const Home = (props: Posts) => (
  <div className="home-page">
    <div className="title">
      <h1>Lemon Juice Sabotage</h1>
      <p>Your gateway to the archives.</p>
    </div>

    <div className="content">
      <h2>Latest Posts:</h2>
      <TuiPostList posts={props.posts} />
    </div>
  </div>
);

export const home: RequestHandler = async (req, res) => {
  const postsResult = await lib.Db.list();

  return postsResult.branch === 'error'
    ? lib.Html.send(res.status(500), <p>Error loading posts.</p>, "Error")
    : lib.Html.send(res, <Home posts={postsResult.value} />, "Lemon Juice Sabotage");
};
