chrome.browserAction.onClicked.addListener(tab => {
  chrome.tabs.executeScript({
    code: `
      var prevStyle = document.getElementById('tachyons-x-ray')

      if (prevStyle) {
        prevStyle.parentNode.removeChild(prevStyle)
      } else {
        let style = document.createElement('style')
        style.id = 'tachyons-x-ray' // So we can toggle the grid by removing it later
        document.body.appendChild(style)

        style.sheet.insertRule("body { background: transparent url('${ Grid8BlueAlpha }') repeat top left !important; }", 0)
        style.sheet.insertRule("* { background-color: transparent !important; color: #444 !important; }", 1)
        let debugRules = [
          "body { outline: 1px solid !important; }",
          "article { outline: 1px solid !important; }",
          "nav { outline: 1px solid !important; }",
          "aside { outline: 1px solid !important; }",
          "section { outline: 1px solid !important; }",
          "header { outline: 1px solid !important; }",
          "footer { outline: 1px solid !important; }",
          "h1 { outline: 1px solid !important; }",
          "h2 { outline: 1px solid !important; }",
          "h3 { outline: 1px solid !important; }",
          "h4 { outline: 1px solid !important; }",
          "h5 { outline: 1px solid !important; }",
          "h6 { outline: 1px solid !important; }",
          "main { outline: 1px solid !important; }",
          "address { outline: 1px solid !important; }",
          "div { outline: 1px solid !important; }",
          "p { outline: 1px solid !important; }",
          "hr { outline: 1px solid !important; }",
          "pre { outline: 1px solid !important; }",
          "blockquote { outline: 1px solid !important; }",
          "ol { outline: 1px solid !important; }",
          "ul { outline: 1px solid !important; }",
          "li { outline: 1px solid !important; }",
          "dl { outline: 1px solid !important; }",
          "dt { outline: 1px solid !important; }",
          "dd { outline: 1px solid !important; }",
          "figure { outline: 1px solid !important; }",
          "figcaption { outline: 1px solid !important; }",
          "table { outline: 1px solid !important; }",
          "caption { outline: 1px solid !important; }",
          "thead { outline: 1px solid !important; }",
          "tbody { outline: 1px solid !important; }",
          "tfoot { outline: 1px solid !important; }",
          "tr { outline: 1px solid !important; }",
          "th { outline: 1px solid !important; }",
          "td { outline: 1px solid !important; }",
          "col { outline: 1px solid !important; }",
          "colgroup { outline: 1px solid !important; }",
          "button { outline: 1px solid !important; }",
          "datalist { outline: 1px solid !important; }",
          "fieldset { outline: 1px solid !important; }",
          "form { outline: 1px solid !important; }",
          "input { outline: 1px solid !important; }",
          "keygen { outline: 1px solid !important; }",
          "label { outline: 1px solid !important; }",
          "legend { outline: 1px solid !important; }",
          "meter { outline: 1px solid !important; }",
          "optgroup { outline: 1px solid !important; }",
          "option { outline: 1px solid !important; }",
          "output { outline: 1px solid !important; }",
          "progress { outline: 1px solid !important; }",
          "select { outline: 1px solid !important; }",
          "textarea { outline: 1px solid !important; }",
          "details { outline: 1px solid !important; }",
          "summary { outline: 1px solid !important; }",
          "command { outline: 1px solid !important; }",
          "menu { outline: 1px solid !important; }",
          "del { outline: 1px solid !important; }",
          "ins { outline: 1px solid !important; }",
          "img { outline: 1px solid !important; }",
          "iframe { outline: 1px solid !important; }",
          "embed { outline: 1px solid !important; }",
          "object { outline: 1px solid !important; }",
          "param { outline: 1px solid !important; }",
          "video { outline: 1px solid !important; }",
          "audio { outline: 1px solid !important; }",
          "source { outline: 1px solid !important; }",
          "canvas { outline: 1px solid !important; }",
          "track { outline: 1px solid !important; }",
          "map { outline: 1px solid !important; }",
          "area { outline: 1px solid !important; }",
          "a { outline: 1px solid !important; }",
          "em { outline: 1px solid !important; }",
          "strong { outline: 1px solid !important; }",
          "i { outline: 1px solid !important; }",
          "b { outline: 1px solid !important; }",
          "u { outline: 1px solid !important; }",
          "s { outline: 1px solid !important; }",
          "small { outline: 1px solid !important; }",
          "abbr { outline: 1px solid !important; }",
          "q { outline: 1px solid !important; }",
          "cite { outline: 1px solid !important; }",
          "dfn { outline: 1px solid !important; }",
          "sub { outline: 1px solid !important; }",
          "sup { outline: 1px solid !important; }",
          "time { outline: 1px solid !important; }",
          "code { outline: 1px solid !important; }",
          "kbd { outline: 1px solid !important; }",
          "samp { outline: 1px solid !important; }",
          "var { outline: 1px solid !important; }",
          "mark { outline: 1px solid !important; }",
          "bdi { outline: 1px solid !important; }",
          "bdo { outline: 1px solid !important; }",
          "ruby { outline: 1px solid !important; }",
          "rt { outline: 1px solid !important; }",
          "rp { outline: 1px solid !important; }",
          "span { outline: 1px solid !important; }",
          "br { outline: 1px solid !important; }",
          "wbr { outline: 1px solid !important; }"
        ]

        debugRules.forEach((r, i) => style.sheet.insertRule(r, i + 2))
      }
    `
  })
})

const Grid8BlueAlpha = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTRDOTY4N0U2N0VFMTFFNjg2MzZDQjkwNkQ4MjgwMEIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTRDOTY4N0Q2N0VFMTFFNjg2MzZDQjkwNkQ4MjgwMEIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3NjcyQkQ3NjY3QzUxMUU2QjJCQ0UyNDA4MTAwMjE3MSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3NjcyQkQ3NzY3QzUxMUU2QjJCQ0UyNDA4MTAwMjE3MSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PsBS+GMAAAAjSURBVHjaYvz//z8DLsD4gcGXiYEAGBIKGBne//fFpwAgwAB98AaF2pjlUQAAAABJRU5ErkJggg=='
