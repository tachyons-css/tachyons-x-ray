chrome.browserAction.onClicked.addListener(tab => {
  chrome.tabs.executeScript({
    code: `
      const style = document.createElement('style')
      document.head.appendChild(style)
      style.sheet.insertRule("body { background: transparent url(https://raw.githubusercontent.com/tachyons-css/tachyons-css.github.io/master/img/8-grid-blue-alpha.png) repeat top left !important; }", 0)
      style.sheet.insertRule("* { background-color: transparent !important; color: #444 !important; }", 1)
    `
  })
})
