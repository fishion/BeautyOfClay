const initMobileMenuCollapser = () => {
  // mobile menu collapser
    const menu_collapser = document.getElementById('menu_collapser')
      , menu = document.getElementById('menu')
    menu_collapser.addEventListener('click', function() {
      menu_collapser.classList.toggle('open')
      menu.classList.toggle('open')
    })
  }

  , initSocialMediaIcons = () => {
  // social media sharing
    const shareTwitter = document.getElementById('share_twitter')
      , shareFacebook = document.getElementById('share_facebook')
    if (!shareTwitter || !shareFacebook) return

    const url = encodeURIComponent('https://www.beautyofclay.co.uk')
      , text = encodeURIComponent('Beauty of Clay - low-cost pottery and ceramic workshops for people of all ages')
      , user_id = encodeURIComponent('')
      , tags = encodeURIComponent('pottery,clay,beauty,art,DIY')
    shareTwitter.href = `https://twitter.com/intent/tweet?url=${url}&text=${text}&via=${user_id}&hashtags=${tags}`
    shareFacebook.href = `http://www.facebook.com/sharer/sharer.php?u=${url}`
  }

window.addEventListener('DOMContentLoaded', () => {
  initMobileMenuCollapser()
  initSocialMediaIcons()
})
