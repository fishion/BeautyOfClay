const initMobileMenuCollapser = () => {
  // mobile menu collapser
  const menu_collapser = document.getElementById("menu_collapser")
  const menu = document.getElementById("menu")
  menu_collapser.addEventListener("click", function() {
    menu_collapser.classList.toggle("open");
    menu.classList.toggle("open");
  });
}

const initSocialMediaIcons = () => {
  // social media sharing
  const shareTwitter = document.getElementById("share_twitter")
  const shareFacebook = document.getElementById("share_facebook")
  if (!shareTwitter || !shareFacebook) return;

  const url = encodeURIComponent("https://www.beautyofclay.co.uk");
  const text = encodeURIComponent("Beauty of Clay - low-cost pottery and ceramic workshops for people of all ages");
  const user_id = encodeURIComponent("");
  const tags = encodeURIComponent("pottery,clay,beauty,art,DIY");
  shareTwitter.href=`https://twitter.com/intent/tweet?url=${url}&text=${text}&via=${user_id}&hashtags=${tags}`;
  shareFacebook.href=`http://www.facebook.com/sharer/sharer.php?u=${url}`;
}

const bannerSlideshow = () => {
  // banner_slideshow
  const bannerContainer = document.getElementsByClassName('banner-container')[0];
  if (!bannerContainer) return;
  const bannerSlideshow = document.createElement("ul");
  bannerSlideshow.classList.add("banner-slideshow");
  bannerContainer.prepend(bannerSlideshow)
  for (let i=0; i<bannerSlideshowImages.length; i++){
    const li = document.createElement("li");
    li.appendChild(document.createElement("span"));
    bannerSlideshow.appendChild(li)
  }
}

window.addEventListener('DOMContentLoaded', () => {
  initMobileMenuCollapser();
  bannerSlideshow();
  initSocialMediaIcons();
})