let click;
let hover;

if (typeof window !== 'undefined') {
  click = new window.Audio("/click.mp3");
  hover = new window.Audio("/hover.mp3");
}

const playClick = () => {
  if (click) {
    click.currentTime = 0;
    click.play();
  }
};

const playHover = () => {
  if (hover) {
    hover.currentTime = 0;
    hover.play();
  }
};

export { playClick, playHover };
