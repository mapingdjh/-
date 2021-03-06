;(function(window) {

var svgSprite = '<svg>' +
  ''+
    '<symbol id="icon-guanbi" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M512 1024C229.239467 1024 0 794.760533 0 512 0 229.239467 229.239467 0 512 0 794.760533 0 1024 229.239467 1024 512 1024 794.760533 794.760533 1024 512 1024ZM512 34.133333C248.081067 34.133333 34.133333 248.081067 34.133333 512 34.133333 775.918933 248.081067 989.866667 512 989.866667 775.918933 989.866667 989.866667 775.918933 989.866667 512 989.866667 248.081067 775.918933 34.133333 512 34.133333ZM656.827733 705.092267 512 560.264533 367.172267 705.092267 318.907733 656.827733 463.735467 512 318.907733 367.172267 367.172267 318.907733 512 463.735467 656.827733 318.907733 705.092267 367.172267 560.264533 512 705.092267 656.827733 656.827733 705.092267Z"  ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-yinlebofang" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M512 64c247.04 0 448 200.96 448 448s-200.96 448-448 448-448-200.96-448-448S264.96 64 512 64M512 0C229.248 0 0 229.248 0 512s229.248 512 512 512 512-229.248 512-512S794.752 0 512 0L512 0zM741.376 447.68c-1.92 9.664-4.928 17.6-9.152 23.68-4.224 6.08-7.744 8.96-10.688 8.512C718.592 479.488 715.968 477.376 713.6 473.6c-2.304-3.776-4.096-10.752-5.376-20.864-2.112-16.384-7.488-28.544-16.064-36.288-8.64-7.808-21.952-13.376-40-16.704-18.88-3.776-35.584-11.456-50.112-23.04-14.464-11.584-26.56-22.4-36.224-32.512C556.608 335.296 549.44 332.16 544.448 334.72S536.832 341.824 536.832 348.608l0 27.136-0.64 277.76 0 35.968c0.448 10.112-1.152 21.376-4.736 33.792-3.584 12.416-10.304 24.064-20.16 35.008s-22.976 20.288-39.36 28.096C455.552 794.176 435.2 798.72 410.816 800c-24.768 1.28-47.168-3.136-67.136-13.248-19.968-10.112-35.392-22.848-46.336-38.208-10.944-15.36-16.256-32.192-16.064-50.496 0.192-18.304 8.064-35.456 23.616-51.456C320.512 630.592 337.28 619.392 355.328 613.12 373.44 606.784 390.848 603.328 407.68 602.688c16.832-0.64 31.808 0.512 45.056 3.456C465.984 609.088 475.712 611.84 482.048 614.336c0 0 0.192-284.288 0.64-346.56 0-12.224 3.136-22.208 9.472-30.016 6.272-7.808 14.72-12.288 25.216-13.568 8.832-1.28 16.064 0.512 21.76 5.376 5.696 4.864 11.456 11.584 17.344 20.224 5.888 8.64 13.12 18.432 21.76 29.376C586.752 290.048 598.4 300.8 613.12 311.36c12.608 9.664 23.616 16.64 33.088 20.8 9.472 4.224 18.304 8.128 26.496 11.648 8.192 3.584 16.256 7.872 24.256 12.928 8 5.056 16.832 13.248 26.496 24.64 9.664 10.944 15.552 22.336 17.664 34.112C743.168 427.264 743.232 438.016 741.376 447.68z"  ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-yinlezanting" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M512 64c247.04 0 448 200.96 448 448s-200.96 448-448 448-448-200.96-448-448S264.96 64 512 64M512 0C229.248 0 0 229.248 0 512s229.248 512 512 512 512-229.248 512-512S794.752 0 512 0L512 0zM536.832 348.608c0-6.72 2.496-11.392 7.552-13.888 5.056-2.496 12.16 0.64 21.44 9.472 9.664 10.112 21.76 20.928 36.224 32.512 14.464 11.584 31.168 19.264 50.112 23.04 18.048 3.392 31.424 8.96 40 16.704 8.64 7.808 13.952 19.904 16.064 36.288 1.28 10.112 3.072 17.024 5.376 20.864 2.304 3.776 4.928 5.888 7.872 6.336 2.944 0.448 6.528-2.432 10.688-8.512 4.224-6.08 7.232-14.016 9.152-23.68s1.792-20.416-0.32-32.192c-2.112-11.776-8-23.168-17.664-34.112-9.664-11.392-18.496-19.584-26.496-24.64-8-5.056-16.064-9.344-24.256-12.928-8.192-3.584-17.024-7.488-26.496-11.648C636.736 327.936 625.728 321.024 613.12 311.36 598.4 300.8 586.752 290.048 578.112 279.168 569.536 268.16 562.304 258.432 556.416 249.792c-5.888-8.64-11.648-15.36-17.344-20.224-5.696-4.864-12.928-6.656-21.76-5.376-10.496 1.28-18.88 5.76-25.216 13.568C485.824 245.568 482.688 255.552 482.688 267.776c0 4.224-0.064 9.728-0.064 15.872-0.32 55.68-0.576 159.68-0.576 159.68L322.752 284.096 283.008 323.84l199.04 199.04 0 91.52C475.712 611.84 465.984 609.088 452.736 606.144 439.488 603.2 424.448 602.048 407.68 602.688S373.44 606.784 355.328 613.12C337.28 619.392 320.512 630.592 304.96 646.528c-15.552 16-23.424 33.152-23.616 51.456-0.192 18.304 5.12 35.136 16.064 50.496 10.944 15.36 26.368 28.096 46.336 38.208s42.304 14.528 67.136 13.248c24.384-1.28 44.736-5.76 61.12-13.568 16.384-7.808 29.504-17.152 39.36-28.096s16.576-22.656 20.16-35.008c3.584-12.416 5.12-23.68 4.736-33.792l0-35.968 0.192-76.288 164.096 164.096 39.744-39.744L536.64 497.92C536.768 475.776 536.832 348.608 536.832 348.608z"  ></path>'+
      ''+
    '</symbol>'+
  ''+
'</svg>'
var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
var shouldInjectCss = script.getAttribute("data-injectcss")

/**
 * document ready
 */
var ready = function(fn){
  if(document.addEventListener){
      document.addEventListener("DOMContentLoaded",function(){
          document.removeEventListener("DOMContentLoaded",arguments.callee,false)
          fn()
      },false)
  }else if(document.attachEvent){
     IEContentLoaded (window, fn)
  }

  function IEContentLoaded (w, fn) {
      var d = w.document, done = false,
      // only fire once
      init = function () {
          if (!done) {
              done = true
              fn()
          }
      }
      // polling for no errors
      ;(function () {
          try {
              // throws errors until after ondocumentready
              d.documentElement.doScroll('left')
          } catch (e) {
              setTimeout(arguments.callee, 50)
              return
          }
          // no errors, fire

          init()
      })()
      // trying to always fire before onload
      d.onreadystatechange = function() {
          if (d.readyState == 'complete') {
              d.onreadystatechange = null
              init()
          }
      }
  }
}

/**
 * Insert el before target
 *
 * @param {Element} el
 * @param {Element} target
 */

var before = function (el, target) {
  target.parentNode.insertBefore(el, target)
}

/**
 * Prepend el to target
 *
 * @param {Element} el
 * @param {Element} target
 */

var prepend = function (el, target) {
  if (target.firstChild) {
    before(el, target.firstChild)
  } else {
    target.appendChild(el)
  }
}

function appendSvg(){
  var div,svg

  div = document.createElement('div')
  div.innerHTML = svgSprite
  svg = div.getElementsByTagName('svg')[0]
  if (svg) {
    svg.setAttribute('aria-hidden', 'true')
    svg.style.position = 'absolute'
    svg.style.width = 0
    svg.style.height = 0
    svg.style.overflow = 'hidden'
    prepend(svg,document.body)
  }
}

if(shouldInjectCss && !window.__iconfont__svg__cssinject__){
  window.__iconfont__svg__cssinject__ = true
  try{
    document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
  }catch(e){
    console && console.log(e)
  }
}

ready(appendSvg)


})(window)
