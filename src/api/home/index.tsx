import type { RequestHandler } from "express";
import lib from "../../lib";

type Posts = { posts: string[] };

const TuiPostList = (props: Posts) => (
  <ul className="tui-post-list">
    {
      props.posts.length > 0
        ? props.posts.map((p, i) => (
          <li key={p} className={i === 0 ? 'selected' : ''}>
            <a href={'/post/' + p}>{p}</a>
          </li>
        ))
        : <p>No posts available.</p>
    }
  </ul>
);

const Home = (props: Posts) => (
  <div className="home-page">
    <header>
      <h1>Lemon Juice Sabotage</h1>
      <p>humanity, anarchy, tech and music</p>
    </header>

    <main>
      <h2>Latest Posts:</h2>
      <TuiPostList posts={props.posts} />
    </main>
  </div>
);

export const home: RequestHandler = async (req, res) => {
  const postsResult = await lib.Db.list();

  return postsResult.branch === 'error'
    ? lib.Html.send(res.status(500), <p>Error loading posts.</p>, "Error")
    : lib.Html.send(res, <Home posts={postsResult.value} />, "Lemon Juice Sabotage", 'home');
};

export const goHome: RequestHandler = async (req, res) => res.redirect('/home');
