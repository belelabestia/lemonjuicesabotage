import type { RequestHandler } from "express";
import lib from "../../lib";

type Props = { posts: string[] };

const Posts = (props: Props) => (
  <ul className="posts tui-list">
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

const Home = (props: Props) => (
  <div className="home-page keybindings">
    <header>
      <h1>Lemon Juice Sabotage</h1>
      <p>humanity, anarchy, tech and music</p>
    </header>

    <main>
      <h2>Latest Posts:</h2>
      <Posts posts={props.posts} />
    </main>

    <footer>
      <div>
        <kbd>↑</kbd>
        <span>Previous Post</span>
      </div>
      <div>
        <kbd>↓</kbd>
        <span>Next Post</span>
      </div>
      <div>
        <kbd>⏎ Enter</kbd>
        <span>Go to Post</span>
      </div>
    </footer>
  </div>
);

export const home: RequestHandler = async (req, res) => {
  const postsResult = await lib.Db.list();

  return postsResult.branch === 'error'
    ? lib.Html.send(res.status(500), <p>Error loading posts.</p>, "Error")
    : lib.Html.send(res, <Home posts={postsResult.value} />, "Lemon Juice Sabotage", 'home');
};

export const goHome: RequestHandler = async (req, res) => res.redirect('/home');
