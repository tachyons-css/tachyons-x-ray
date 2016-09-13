const state = {
  xRayOn: false
};

chrome.browserAction.onClicked.addListener(tab => {
  state.xRayOn = !state.xRayOn
  toggleIcon(state.xRayOn)

  chrome.tabs.executeScript({
    code: `
      (function() {
        const prevStyle = document.getElementById('tachyons-x-ray')
        const prevMenu = document.getElementById('tachyons-x-ray-menu')

        if (prevStyle) {
          prevStyle.parentNode.removeChild(prevStyle)
          prevMenu.parentNode.removeChild(prevMenu)
        } else {
          let style = document.createElement('style')
          style.id = 'tachyons-x-ray' // So we can toggle the grid by removing it later
          document.body.appendChild(style)

          style.sheet.insertRule("body { background: transparent url('${ grids.alpha8 }') repeat top left !important; }", style.sheet.cssRules.length)

          // Some sites like to use !important liberally, so let's try and win
          // this specificity battle with 10 chained ids _and_ !important :)
          let id = document.body.id || 'tachyons-x-ray-body'
          document.body.id = id // In case there is no id on the body already
          let superSpecificHammerTime = ''
          for (var i = 0; i < 10; i++) {
            superSpecificHammerTime += '#' + id
          }

          superSpecificHammerTime += ' * { background: transparent !important; color: #444 !important }'
          style.sheet.insertRule(superSpecificHammerTime, style.sheet.cssRules.length)

          // Create the menu and styles for it
          style.sheet.insertRule("#tachyons-x-ray-menu { display: inline-block; position: fixed; top: 16px; right: 16px; width: 32px; height: 32px; font-size: 16px; line-height: 32px; border-radius: 50%; box-shadow: 0 0 16px #666; text-align: center; cursor: pointer; color: #444; z-index: 2147483647; }", style.sheet.cssRules.length)

          style.sheet.insertRule("#tachyons-x-ray-menu:hover { box-shadow: 0 0 16px #0074D9; }", style.sheet.cssRules.length)

          const menu = document.createElement('button')
          menu.appendChild(document.createTextNode('⊞'))
          menu.id = 'tachyons-x-ray-menu'
          menu.style = 'background-color:#fff !important;outline:none !important;margin:0;border:0;padding:0;display:inline-block;vertical-align:middle;white-space:normal;background:none;line-height:1;'
          menu.onclick = toggleOptionsList
          document.body.appendChild(menu)

          // Create options list and styles for it
          const optionsList = document.createElement('ul')
          optionsList.style = 'background-color: #fff !important; outline: none !important; margin: 0; list-style-type: none; padding: 0; border-radius: 3px; border: 1px solid #444; font-family: monospace; font-size: 12px; position: fixed; top: 48px; right: 48px; overflow: hidden;'

          const options = ['alpha 8', 'solid 8', 'alpha 16', 'solid 16']
          options.forEach((opt, idx) => {
            const option = document.createElement('li')
            option.appendChild(document.createTextNode(opt))
            option.style = 'background-color: #fff !important; outline: none !important; padding: 4px 8px; cursor: pointer; line-height: 1; border-bottom: 1px solid #444'
            option.onclick = selectGrid(opt.replace(/ /g, ''))
            optionsList.appendChild(option)
          })

          // Create the option to toggle element grid
          const option = document.createElement('li')
          option.appendChild(document.createTextNode('Toggle Element Grid'))
          option.style = 'background-color: #fff !important; outline: none !important; padding: 4px 8px; cursor: pointer; line-height: 1;'
          option.onclick = toggleDebugRules
          optionsList.appendChild(option)

          document.body.appendChild(optionsList)

          let debugRules = [
            'body { outline: 1px solid !important; }',
            'article { outline: 1px solid !important; }',
            'nav { outline: 1px solid !important; }',
            'aside { outline: 1px solid !important; }',
            'section { outline: 1px solid !important; }',
            'header { outline: 1px solid !important; }',
            'footer { outline: 1px solid !important; }',
            'h1 { outline: 1px solid !important; }',
            'h2 { outline: 1px solid !important; }',
            'h3 { outline: 1px solid !important; }',
            'h4 { outline: 1px solid !important; }',
            'h5 { outline: 1px solid !important; }',
            'h6 { outline: 1px solid !important; }',
            'main { outline: 1px solid !important; }',
            'address { outline: 1px solid !important; }',
            'div { outline: 1px solid !important; }',
            'p { outline: 1px solid !important; }',
            'hr { outline: 1px solid !important; }',
            'pre { outline: 1px solid !important; }',
            'blockquote { outline: 1px solid !important; }',
            'ol { outline: 1px solid !important; }',
            'ul { outline: 1px solid !important; }',
            'li { outline: 1px solid !important; }',
            'dl { outline: 1px solid !important; }',
            'dt { outline: 1px solid !important; }',
            'dd { outline: 1px solid !important; }',
            'figure { outline: 1px solid !important; }',
            'figcaption { outline: 1px solid !important; }',
            'table { outline: 1px solid !important; }',
            'caption { outline: 1px solid !important; }',
            'thead { outline: 1px solid !important; }',
            'tbody { outline: 1px solid !important; }',
            'tfoot { outline: 1px solid !important; }',
            'tr { outline: 1px solid !important; }',
            'th { outline: 1px solid !important; }',
            'td { outline: 1px solid !important; }',
            'col { outline: 1px solid !important; }',
            'colgroup { outline: 1px solid !important; }',
            'button { outline: 1px solid !important; }',
            'datalist { outline: 1px solid !important; }',
            'fieldset { outline: 1px solid !important; }',
            'form { outline: 1px solid !important; }',
            'input { outline: 1px solid !important; }',
            'keygen { outline: 1px solid !important; }',
            'label { outline: 1px solid !important; }',
            'legend { outline: 1px solid !important; }',
            'meter { outline: 1px solid !important; }',
            'optgroup { outline: 1px solid !important; }',
            'option { outline: 1px solid !important; }',
            'output { outline: 1px solid !important; }',
            'progress { outline: 1px solid !important; }',
            'select { outline: 1px solid !important; }',
            'textarea { outline: 1px solid !important; }',
            'details { outline: 1px solid !important; }',
            'summary { outline: 1px solid !important; }',
            'command { outline: 1px solid !important; }',
            'menu { outline: 1px solid !important; }',
            'del { outline: 1px solid !important; }',
            'ins { outline: 1px solid !important; }',
            'img { outline: 1px solid !important; }',
            'iframe { outline: 1px solid !important; }',
            'embed { outline: 1px solid !important; }',
            'object { outline: 1px solid !important; }',
            'param { outline: 1px solid !important; }',
            'video { outline: 1px solid !important; }',
            'audio { outline: 1px solid !important; }',
            'source { outline: 1px solid !important; }',
            'canvas { outline: 1px solid !important; }',
            'track { outline: 1px solid !important; }',
            'map { outline: 1px solid !important; }',
            'area { outline: 1px solid !important; }',
            'a { outline: 1px solid !important; }',
            'em { outline: 1px solid !important; }',
            'strong { outline: 1px solid !important; }',
            'i { outline: 1px solid !important; }',
            'b { outline: 1px solid !important; }',
            'u { outline: 1px solid !important; }',
            's { outline: 1px solid !important; }',
            'small { outline: 1px solid !important; }',
            'abbr { outline: 1px solid !important; }',
            'q { outline: 1px solid !important; }',
            'cite { outline: 1px solid !important; }',
            'dfn { outline: 1px solid !important; }',
            'sub { outline: 1px solid !important; }',
            'sup { outline: 1px solid !important; }',
            'time { outline: 1px solid !important; }',
            'code { outline: 1px solid !important; }',
            'kbd { outline: 1px solid !important; }',
            'samp { outline: 1px solid !important; }',
            'var { outline: 1px solid !important; }',
            'mark { outline: 1px solid !important; }',
            'bdi { outline: 1px solid !important; }',
            'bdo { outline: 1px solid !important; }',
            'ruby { outline: 1px solid !important; }',
            'rt { outline: 1px solid !important; }',
            'rp { outline: 1px solid !important; }',
            'span { outline: 1px solid !important; }',
            'br { outline: 1px solid !important; }',
            'wbr { outline: 1px solid !important; }'
          ]

          debugRulesVisible = false;
          toggleDebugRules()

          function toggleDebugRules() {
            if (!debugRulesVisible) {
              debugRules.forEach(r =>
                style.sheet.insertRule(r, style.sheet.cssRules.length))
              debugRulesVisible = true
            } else {
              debugRules.forEach((_, idx) =>
                style.sheet.deleteRule(style.sheet.cssRules.length - 1))
              debugRulesVisible = false
            }
            toggleOptionsList()
          }

          function toggleOptionsList() {
            optionsList.style.display = (
              optionsList.style.display === 'none' ? 'block' : 'none'
            )
          }

          const grids = ${ JSON.stringify(grids) }

          function selectGrid(type) {
            return () => {
              const background = (
                'url("' + grids[type] + '") left top repeat transparent'
              )
              style.sheet.rules[0].style.background = background
              toggleOptionsList()
            }
          }
        }
      })()
    `
  })
})

function toggleIcon(isOn) {
  const icon = isOn ? 'icon-on' : 'icon'

  chrome.browserAction.setIcon({
    path : {
      '19': `icons/${ icon }19x.png`,
      '38': `icons/${ icon }38x.png`
    }
  })
}

const grids = {
  solid8: 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAAAAD/4QMxaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzExMSA3OS4xNTgzMjUsIDIwMTUvMDkvMTAtMDE6MTA6MjAgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkIxMjI0OTczNjdCMzExRTZCMkJDRTI0MDgxMDAyMTcxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkIxMjI0OTc0NjdCMzExRTZCMkJDRTI0MDgxMDAyMTcxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QjEyMjQ5NzE2N0IzMTFFNkIyQkNFMjQwODEwMDIxNzEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QjEyMjQ5NzI2N0IzMTFFNkIyQkNFMjQwODEwMDIxNzEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAAbGhopHSlBJiZBQi8vL0JHPz4+P0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHAR0pKTQmND8oKD9HPzU/R0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0f/wAARCAAIAAgDASIAAhEBAxEB/8QAWQABAQAAAAAAAAAAAAAAAAAAAAYBAQEAAAAAAAAAAAAAAAAAAAIEEAEBAAMBAAAAAAAAAAAAAAABADECA0ERAAEDBQAAAAAAAAAAAAAAAAARITFBUWESIv/aAAwDAQACEQMRAD8AoOnTV1QTD7JJshP3vSM3P//Z',
  alpha8: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTRDOTY4N0U2N0VFMTFFNjg2MzZDQjkwNkQ4MjgwMEIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTRDOTY4N0Q2N0VFMTFFNjg2MzZDQjkwNkQ4MjgwMEIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3NjcyQkQ3NjY3QzUxMUU2QjJCQ0UyNDA4MTAwMjE3MSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3NjcyQkQ3NzY3QzUxMUU2QjJCQ0UyNDA4MTAwMjE3MSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PsBS+GMAAAAjSURBVHjaYvz//z8DLsD4gcGXiYEAGBIKGBne//fFpwAgwAB98AaF2pjlUQAAAABJRU5ErkJggg==',
  solid16: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzY3MkJEN0U2N0M1MTFFNkIyQkNFMjQwODEwMDIxNzEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzY3MkJEN0Y2N0M1MTFFNkIyQkNFMjQwODEwMDIxNzEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3NjcyQkQ3QzY3QzUxMUU2QjJCQ0UyNDA4MTAwMjE3MSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3NjcyQkQ3RDY3QzUxMUU2QjJCQ0UyNDA4MTAwMjE3MSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pve6J3kAAAAzSURBVHjaYvz//z8D0UDsMwMjSRoYP5Gq4SPNbRjVMEQ1fCRDg+in/6+J1AJUxsgAEGAA31BAJMS0GYEAAAAASUVORK5CYII=',
  alpha16: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODYyRjhERDU2N0YyMTFFNjg2MzZDQjkwNkQ4MjgwMEIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODYyRjhERDQ2N0YyMTFFNjg2MzZDQjkwNkQ4MjgwMEIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3NjcyQkQ3QTY3QzUxMUU2QjJCQ0UyNDA4MTAwMjE3MSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3NjcyQkQ3QjY3QzUxMUU2QjJCQ0UyNDA4MTAwMjE3MSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PvCS01IAAABMSURBVHjaYmR4/5+BFPBfAMFm/MBgx8RAGWCn1AAmSg34Q6kBDKMGMDCwICeMIemF/5QawEipAWwUhwEjMDvbAWlWkvVBwu8vQIABAEwBCph8U6c0AAAAAElFTkSuQmCC'
};
