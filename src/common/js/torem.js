window.onresize = setHtmlFontSize
function setHtmlFontSize () {
  let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth
  if ( htmlWidth < 1200) { htmlWidth = 1200 }
  const htmlDom = document.getElementsByTagName('html')[0]
  htmlDom.style.fontSize = htmlWidth / 10 + 'px'
}
setHtmlFontSize()
