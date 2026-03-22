document.addEventListener('keydown', e => {
  console.log(e.key);
  if (e.key === 'Backspace') location.href = '/home';
});
