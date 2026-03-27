import { unreachable } from '../../lib/unreachable';

let selectedPostIndex = 0;
const posts = document.querySelector('.posts') ?? unreachable();

/** updates dom according to the current state */
const update = () => {
  for (const [index, post] of Array.from(posts.children).entries()) {
    index === selectedPostIndex
      ? post.classList.add('selected')
      : post.classList.remove('selected');
  }
};

const goToPost = () => posts.querySelector<HTMLAnchorElement>('li.selected > a')!.click();

const postsCount = posts.childElementCount;

document.addEventListener('keydown', e => {
  switch (e.key) {
    case 'ArrowUp':
      selectedPostIndex = (postsCount + selectedPostIndex - 1) % postsCount;
      break;
    case 'ArrowDown':
      selectedPostIndex = (selectedPostIndex + 1) % postsCount;
      break;
    case 'Enter':
      return goToPost();
    default:
      return;
  }

  update();
});
