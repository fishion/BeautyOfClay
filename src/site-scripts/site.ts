const initMobileMenuCollapser = (): void => {
  // mobile menu collapser
  const menuCollapser = document.getElementById('menu_collapser');
  const menu = document.getElementById('menu');

  if (!menuCollapser || !menu) return;

  menuCollapser.addEventListener('click', function() {
    menuCollapser.classList.toggle('open');
    menu.classList.toggle('open');
  });
};

const initSocialMediaIcons = (): void => {
  // social media sharing
  const shareTwitter = document.getElementById('share_twitter') as HTMLAnchorElement;
  const shareFacebook = document.getElementById('share_facebook') as HTMLAnchorElement;
  if (!shareTwitter || !shareFacebook) return;

  const url = encodeURIComponent('https://www.beautyofclay.co.uk');
  const text = encodeURIComponent('Beauty of Clay - low-cost pottery and ceramic workshops for people of all ages');
  const userID = encodeURIComponent('');
  const tags = encodeURIComponent('pottery,clay,beauty,art,DIY');
  shareTwitter.href = `https://twitter.com/intent/tweet?url=${url}&text=${text}&via=${userID}&hashtags=${tags}`;
  shareFacebook.href = `http://www.facebook.com/sharer/sharer.php?u=${url}`;
};

window.addEventListener('DOMContentLoaded', () => {
  initMobileMenuCollapser();
  initSocialMediaIcons();
});
