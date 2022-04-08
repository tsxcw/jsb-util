/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/cssfilter/lib/css.js":
/*!*******************************************!*\
  !*** ./node_modules/cssfilter/lib/css.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * cssfilter
 *
 * @author 老雷<leizongmin@gmail.com>
 */

var DEFAULT = __webpack_require__(/*! ./default */ "./node_modules/cssfilter/lib/default.js");
var parseStyle = __webpack_require__(/*! ./parser */ "./node_modules/cssfilter/lib/parser.js");
var _ = __webpack_require__(/*! ./util */ "./node_modules/cssfilter/lib/util.js");


/**
 * 返回值是否为空
 *
 * @param {Object} obj
 * @return {Boolean}
 */
function isNull (obj) {
  return (obj === undefined || obj === null);
}

/**
 * 浅拷贝对象
 *
 * @param {Object} obj
 * @return {Object}
 */
function shallowCopyObject (obj) {
  var ret = {};
  for (var i in obj) {
    ret[i] = obj[i];
  }
  return ret;
}

/**
 * 创建CSS过滤器
 *
 * @param {Object} options
 *   - {Object} whiteList
 *   - {Function} onAttr
 *   - {Function} onIgnoreAttr
 *   - {Function} safeAttrValue
 */
function FilterCSS (options) {
  options = shallowCopyObject(options || {});
  options.whiteList = options.whiteList || DEFAULT.whiteList;
  options.onAttr = options.onAttr || DEFAULT.onAttr;
  options.onIgnoreAttr = options.onIgnoreAttr || DEFAULT.onIgnoreAttr;
  options.safeAttrValue = options.safeAttrValue || DEFAULT.safeAttrValue;
  this.options = options;
}

FilterCSS.prototype.process = function (css) {
  // 兼容各种奇葩输入
  css = css || '';
  css = css.toString();
  if (!css) return '';

  var me = this;
  var options = me.options;
  var whiteList = options.whiteList;
  var onAttr = options.onAttr;
  var onIgnoreAttr = options.onIgnoreAttr;
  var safeAttrValue = options.safeAttrValue;

  var retCSS = parseStyle(css, function (sourcePosition, position, name, value, source) {

    var check = whiteList[name];
    var isWhite = false;
    if (check === true) isWhite = check;
    else if (typeof check === 'function') isWhite = check(value);
    else if (check instanceof RegExp) isWhite = check.test(value);
    if (isWhite !== true) isWhite = false;

    // 如果过滤后 value 为空则直接忽略
    value = safeAttrValue(name, value);
    if (!value) return;

    var opts = {
      position: position,
      sourcePosition: sourcePosition,
      source: source,
      isWhite: isWhite
    };

    if (isWhite) {

      var ret = onAttr(name, value, opts);
      if (isNull(ret)) {
        return name + ':' + value;
      } else {
        return ret;
      }

    } else {

      var ret = onIgnoreAttr(name, value, opts);
      if (!isNull(ret)) {
        return ret;
      }

    }
  });

  return retCSS;
};


module.exports = FilterCSS;


/***/ }),

/***/ "./node_modules/cssfilter/lib/default.js":
/*!***********************************************!*\
  !*** ./node_modules/cssfilter/lib/default.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports) => {

/**
 * cssfilter
 *
 * @author 老雷<leizongmin@gmail.com>
 */

function getDefaultWhiteList () {
  // 白名单值说明：
  // true: 允许该属性
  // Function: function (val) { } 返回true表示允许该属性，其他值均表示不允许
  // RegExp: regexp.test(val) 返回true表示允许该属性，其他值均表示不允许
  // 除上面列出的值外均表示不允许
  var whiteList = {};

  whiteList['align-content'] = false; // default: auto
  whiteList['align-items'] = false; // default: auto
  whiteList['align-self'] = false; // default: auto
  whiteList['alignment-adjust'] = false; // default: auto
  whiteList['alignment-baseline'] = false; // default: baseline
  whiteList['all'] = false; // default: depending on individual properties
  whiteList['anchor-point'] = false; // default: none
  whiteList['animation'] = false; // default: depending on individual properties
  whiteList['animation-delay'] = false; // default: 0
  whiteList['animation-direction'] = false; // default: normal
  whiteList['animation-duration'] = false; // default: 0
  whiteList['animation-fill-mode'] = false; // default: none
  whiteList['animation-iteration-count'] = false; // default: 1
  whiteList['animation-name'] = false; // default: none
  whiteList['animation-play-state'] = false; // default: running
  whiteList['animation-timing-function'] = false; // default: ease
  whiteList['azimuth'] = false; // default: center
  whiteList['backface-visibility'] = false; // default: visible
  whiteList['background'] = true; // default: depending on individual properties
  whiteList['background-attachment'] = true; // default: scroll
  whiteList['background-clip'] = true; // default: border-box
  whiteList['background-color'] = true; // default: transparent
  whiteList['background-image'] = true; // default: none
  whiteList['background-origin'] = true; // default: padding-box
  whiteList['background-position'] = true; // default: 0% 0%
  whiteList['background-repeat'] = true; // default: repeat
  whiteList['background-size'] = true; // default: auto
  whiteList['baseline-shift'] = false; // default: baseline
  whiteList['binding'] = false; // default: none
  whiteList['bleed'] = false; // default: 6pt
  whiteList['bookmark-label'] = false; // default: content()
  whiteList['bookmark-level'] = false; // default: none
  whiteList['bookmark-state'] = false; // default: open
  whiteList['border'] = true; // default: depending on individual properties
  whiteList['border-bottom'] = true; // default: depending on individual properties
  whiteList['border-bottom-color'] = true; // default: current color
  whiteList['border-bottom-left-radius'] = true; // default: 0
  whiteList['border-bottom-right-radius'] = true; // default: 0
  whiteList['border-bottom-style'] = true; // default: none
  whiteList['border-bottom-width'] = true; // default: medium
  whiteList['border-collapse'] = true; // default: separate
  whiteList['border-color'] = true; // default: depending on individual properties
  whiteList['border-image'] = true; // default: none
  whiteList['border-image-outset'] = true; // default: 0
  whiteList['border-image-repeat'] = true; // default: stretch
  whiteList['border-image-slice'] = true; // default: 100%
  whiteList['border-image-source'] = true; // default: none
  whiteList['border-image-width'] = true; // default: 1
  whiteList['border-left'] = true; // default: depending on individual properties
  whiteList['border-left-color'] = true; // default: current color
  whiteList['border-left-style'] = true; // default: none
  whiteList['border-left-width'] = true; // default: medium
  whiteList['border-radius'] = true; // default: 0
  whiteList['border-right'] = true; // default: depending on individual properties
  whiteList['border-right-color'] = true; // default: current color
  whiteList['border-right-style'] = true; // default: none
  whiteList['border-right-width'] = true; // default: medium
  whiteList['border-spacing'] = true; // default: 0
  whiteList['border-style'] = true; // default: depending on individual properties
  whiteList['border-top'] = true; // default: depending on individual properties
  whiteList['border-top-color'] = true; // default: current color
  whiteList['border-top-left-radius'] = true; // default: 0
  whiteList['border-top-right-radius'] = true; // default: 0
  whiteList['border-top-style'] = true; // default: none
  whiteList['border-top-width'] = true; // default: medium
  whiteList['border-width'] = true; // default: depending on individual properties
  whiteList['bottom'] = false; // default: auto
  whiteList['box-decoration-break'] = true; // default: slice
  whiteList['box-shadow'] = true; // default: none
  whiteList['box-sizing'] = true; // default: content-box
  whiteList['box-snap'] = true; // default: none
  whiteList['box-suppress'] = true; // default: show
  whiteList['break-after'] = true; // default: auto
  whiteList['break-before'] = true; // default: auto
  whiteList['break-inside'] = true; // default: auto
  whiteList['caption-side'] = false; // default: top
  whiteList['chains'] = false; // default: none
  whiteList['clear'] = true; // default: none
  whiteList['clip'] = false; // default: auto
  whiteList['clip-path'] = false; // default: none
  whiteList['clip-rule'] = false; // default: nonzero
  whiteList['color'] = true; // default: implementation dependent
  whiteList['color-interpolation-filters'] = true; // default: auto
  whiteList['column-count'] = false; // default: auto
  whiteList['column-fill'] = false; // default: balance
  whiteList['column-gap'] = false; // default: normal
  whiteList['column-rule'] = false; // default: depending on individual properties
  whiteList['column-rule-color'] = false; // default: current color
  whiteList['column-rule-style'] = false; // default: medium
  whiteList['column-rule-width'] = false; // default: medium
  whiteList['column-span'] = false; // default: none
  whiteList['column-width'] = false; // default: auto
  whiteList['columns'] = false; // default: depending on individual properties
  whiteList['contain'] = false; // default: none
  whiteList['content'] = false; // default: normal
  whiteList['counter-increment'] = false; // default: none
  whiteList['counter-reset'] = false; // default: none
  whiteList['counter-set'] = false; // default: none
  whiteList['crop'] = false; // default: auto
  whiteList['cue'] = false; // default: depending on individual properties
  whiteList['cue-after'] = false; // default: none
  whiteList['cue-before'] = false; // default: none
  whiteList['cursor'] = false; // default: auto
  whiteList['direction'] = false; // default: ltr
  whiteList['display'] = true; // default: depending on individual properties
  whiteList['display-inside'] = true; // default: auto
  whiteList['display-list'] = true; // default: none
  whiteList['display-outside'] = true; // default: inline-level
  whiteList['dominant-baseline'] = false; // default: auto
  whiteList['elevation'] = false; // default: level
  whiteList['empty-cells'] = false; // default: show
  whiteList['filter'] = false; // default: none
  whiteList['flex'] = false; // default: depending on individual properties
  whiteList['flex-basis'] = false; // default: auto
  whiteList['flex-direction'] = false; // default: row
  whiteList['flex-flow'] = false; // default: depending on individual properties
  whiteList['flex-grow'] = false; // default: 0
  whiteList['flex-shrink'] = false; // default: 1
  whiteList['flex-wrap'] = false; // default: nowrap
  whiteList['float'] = false; // default: none
  whiteList['float-offset'] = false; // default: 0 0
  whiteList['flood-color'] = false; // default: black
  whiteList['flood-opacity'] = false; // default: 1
  whiteList['flow-from'] = false; // default: none
  whiteList['flow-into'] = false; // default: none
  whiteList['font'] = true; // default: depending on individual properties
  whiteList['font-family'] = true; // default: implementation dependent
  whiteList['font-feature-settings'] = true; // default: normal
  whiteList['font-kerning'] = true; // default: auto
  whiteList['font-language-override'] = true; // default: normal
  whiteList['font-size'] = true; // default: medium
  whiteList['font-size-adjust'] = true; // default: none
  whiteList['font-stretch'] = true; // default: normal
  whiteList['font-style'] = true; // default: normal
  whiteList['font-synthesis'] = true; // default: weight style
  whiteList['font-variant'] = true; // default: normal
  whiteList['font-variant-alternates'] = true; // default: normal
  whiteList['font-variant-caps'] = true; // default: normal
  whiteList['font-variant-east-asian'] = true; // default: normal
  whiteList['font-variant-ligatures'] = true; // default: normal
  whiteList['font-variant-numeric'] = true; // default: normal
  whiteList['font-variant-position'] = true; // default: normal
  whiteList['font-weight'] = true; // default: normal
  whiteList['grid'] = false; // default: depending on individual properties
  whiteList['grid-area'] = false; // default: depending on individual properties
  whiteList['grid-auto-columns'] = false; // default: auto
  whiteList['grid-auto-flow'] = false; // default: none
  whiteList['grid-auto-rows'] = false; // default: auto
  whiteList['grid-column'] = false; // default: depending on individual properties
  whiteList['grid-column-end'] = false; // default: auto
  whiteList['grid-column-start'] = false; // default: auto
  whiteList['grid-row'] = false; // default: depending on individual properties
  whiteList['grid-row-end'] = false; // default: auto
  whiteList['grid-row-start'] = false; // default: auto
  whiteList['grid-template'] = false; // default: depending on individual properties
  whiteList['grid-template-areas'] = false; // default: none
  whiteList['grid-template-columns'] = false; // default: none
  whiteList['grid-template-rows'] = false; // default: none
  whiteList['hanging-punctuation'] = false; // default: none
  whiteList['height'] = true; // default: auto
  whiteList['hyphens'] = false; // default: manual
  whiteList['icon'] = false; // default: auto
  whiteList['image-orientation'] = false; // default: auto
  whiteList['image-resolution'] = false; // default: normal
  whiteList['ime-mode'] = false; // default: auto
  whiteList['initial-letters'] = false; // default: normal
  whiteList['inline-box-align'] = false; // default: last
  whiteList['justify-content'] = false; // default: auto
  whiteList['justify-items'] = false; // default: auto
  whiteList['justify-self'] = false; // default: auto
  whiteList['left'] = false; // default: auto
  whiteList['letter-spacing'] = true; // default: normal
  whiteList['lighting-color'] = true; // default: white
  whiteList['line-box-contain'] = false; // default: block inline replaced
  whiteList['line-break'] = false; // default: auto
  whiteList['line-grid'] = false; // default: match-parent
  whiteList['line-height'] = false; // default: normal
  whiteList['line-snap'] = false; // default: none
  whiteList['line-stacking'] = false; // default: depending on individual properties
  whiteList['line-stacking-ruby'] = false; // default: exclude-ruby
  whiteList['line-stacking-shift'] = false; // default: consider-shifts
  whiteList['line-stacking-strategy'] = false; // default: inline-line-height
  whiteList['list-style'] = true; // default: depending on individual properties
  whiteList['list-style-image'] = true; // default: none
  whiteList['list-style-position'] = true; // default: outside
  whiteList['list-style-type'] = true; // default: disc
  whiteList['margin'] = true; // default: depending on individual properties
  whiteList['margin-bottom'] = true; // default: 0
  whiteList['margin-left'] = true; // default: 0
  whiteList['margin-right'] = true; // default: 0
  whiteList['margin-top'] = true; // default: 0
  whiteList['marker-offset'] = false; // default: auto
  whiteList['marker-side'] = false; // default: list-item
  whiteList['marks'] = false; // default: none
  whiteList['mask'] = false; // default: border-box
  whiteList['mask-box'] = false; // default: see individual properties
  whiteList['mask-box-outset'] = false; // default: 0
  whiteList['mask-box-repeat'] = false; // default: stretch
  whiteList['mask-box-slice'] = false; // default: 0 fill
  whiteList['mask-box-source'] = false; // default: none
  whiteList['mask-box-width'] = false; // default: auto
  whiteList['mask-clip'] = false; // default: border-box
  whiteList['mask-image'] = false; // default: none
  whiteList['mask-origin'] = false; // default: border-box
  whiteList['mask-position'] = false; // default: center
  whiteList['mask-repeat'] = false; // default: no-repeat
  whiteList['mask-size'] = false; // default: border-box
  whiteList['mask-source-type'] = false; // default: auto
  whiteList['mask-type'] = false; // default: luminance
  whiteList['max-height'] = true; // default: none
  whiteList['max-lines'] = false; // default: none
  whiteList['max-width'] = true; // default: none
  whiteList['min-height'] = true; // default: 0
  whiteList['min-width'] = true; // default: 0
  whiteList['move-to'] = false; // default: normal
  whiteList['nav-down'] = false; // default: auto
  whiteList['nav-index'] = false; // default: auto
  whiteList['nav-left'] = false; // default: auto
  whiteList['nav-right'] = false; // default: auto
  whiteList['nav-up'] = false; // default: auto
  whiteList['object-fit'] = false; // default: fill
  whiteList['object-position'] = false; // default: 50% 50%
  whiteList['opacity'] = false; // default: 1
  whiteList['order'] = false; // default: 0
  whiteList['orphans'] = false; // default: 2
  whiteList['outline'] = false; // default: depending on individual properties
  whiteList['outline-color'] = false; // default: invert
  whiteList['outline-offset'] = false; // default: 0
  whiteList['outline-style'] = false; // default: none
  whiteList['outline-width'] = false; // default: medium
  whiteList['overflow'] = false; // default: depending on individual properties
  whiteList['overflow-wrap'] = false; // default: normal
  whiteList['overflow-x'] = false; // default: visible
  whiteList['overflow-y'] = false; // default: visible
  whiteList['padding'] = true; // default: depending on individual properties
  whiteList['padding-bottom'] = true; // default: 0
  whiteList['padding-left'] = true; // default: 0
  whiteList['padding-right'] = true; // default: 0
  whiteList['padding-top'] = true; // default: 0
  whiteList['page'] = false; // default: auto
  whiteList['page-break-after'] = false; // default: auto
  whiteList['page-break-before'] = false; // default: auto
  whiteList['page-break-inside'] = false; // default: auto
  whiteList['page-policy'] = false; // default: start
  whiteList['pause'] = false; // default: implementation dependent
  whiteList['pause-after'] = false; // default: implementation dependent
  whiteList['pause-before'] = false; // default: implementation dependent
  whiteList['perspective'] = false; // default: none
  whiteList['perspective-origin'] = false; // default: 50% 50%
  whiteList['pitch'] = false; // default: medium
  whiteList['pitch-range'] = false; // default: 50
  whiteList['play-during'] = false; // default: auto
  whiteList['position'] = false; // default: static
  whiteList['presentation-level'] = false; // default: 0
  whiteList['quotes'] = false; // default: text
  whiteList['region-fragment'] = false; // default: auto
  whiteList['resize'] = false; // default: none
  whiteList['rest'] = false; // default: depending on individual properties
  whiteList['rest-after'] = false; // default: none
  whiteList['rest-before'] = false; // default: none
  whiteList['richness'] = false; // default: 50
  whiteList['right'] = false; // default: auto
  whiteList['rotation'] = false; // default: 0
  whiteList['rotation-point'] = false; // default: 50% 50%
  whiteList['ruby-align'] = false; // default: auto
  whiteList['ruby-merge'] = false; // default: separate
  whiteList['ruby-position'] = false; // default: before
  whiteList['shape-image-threshold'] = false; // default: 0.0
  whiteList['shape-outside'] = false; // default: none
  whiteList['shape-margin'] = false; // default: 0
  whiteList['size'] = false; // default: auto
  whiteList['speak'] = false; // default: auto
  whiteList['speak-as'] = false; // default: normal
  whiteList['speak-header'] = false; // default: once
  whiteList['speak-numeral'] = false; // default: continuous
  whiteList['speak-punctuation'] = false; // default: none
  whiteList['speech-rate'] = false; // default: medium
  whiteList['stress'] = false; // default: 50
  whiteList['string-set'] = false; // default: none
  whiteList['tab-size'] = false; // default: 8
  whiteList['table-layout'] = false; // default: auto
  whiteList['text-align'] = true; // default: start
  whiteList['text-align-last'] = true; // default: auto
  whiteList['text-combine-upright'] = true; // default: none
  whiteList['text-decoration'] = true; // default: none
  whiteList['text-decoration-color'] = true; // default: currentColor
  whiteList['text-decoration-line'] = true; // default: none
  whiteList['text-decoration-skip'] = true; // default: objects
  whiteList['text-decoration-style'] = true; // default: solid
  whiteList['text-emphasis'] = true; // default: depending on individual properties
  whiteList['text-emphasis-color'] = true; // default: currentColor
  whiteList['text-emphasis-position'] = true; // default: over right
  whiteList['text-emphasis-style'] = true; // default: none
  whiteList['text-height'] = true; // default: auto
  whiteList['text-indent'] = true; // default: 0
  whiteList['text-justify'] = true; // default: auto
  whiteList['text-orientation'] = true; // default: mixed
  whiteList['text-overflow'] = true; // default: clip
  whiteList['text-shadow'] = true; // default: none
  whiteList['text-space-collapse'] = true; // default: collapse
  whiteList['text-transform'] = true; // default: none
  whiteList['text-underline-position'] = true; // default: auto
  whiteList['text-wrap'] = true; // default: normal
  whiteList['top'] = false; // default: auto
  whiteList['transform'] = false; // default: none
  whiteList['transform-origin'] = false; // default: 50% 50% 0
  whiteList['transform-style'] = false; // default: flat
  whiteList['transition'] = false; // default: depending on individual properties
  whiteList['transition-delay'] = false; // default: 0s
  whiteList['transition-duration'] = false; // default: 0s
  whiteList['transition-property'] = false; // default: all
  whiteList['transition-timing-function'] = false; // default: ease
  whiteList['unicode-bidi'] = false; // default: normal
  whiteList['vertical-align'] = false; // default: baseline
  whiteList['visibility'] = false; // default: visible
  whiteList['voice-balance'] = false; // default: center
  whiteList['voice-duration'] = false; // default: auto
  whiteList['voice-family'] = false; // default: implementation dependent
  whiteList['voice-pitch'] = false; // default: medium
  whiteList['voice-range'] = false; // default: medium
  whiteList['voice-rate'] = false; // default: normal
  whiteList['voice-stress'] = false; // default: normal
  whiteList['voice-volume'] = false; // default: medium
  whiteList['volume'] = false; // default: medium
  whiteList['white-space'] = false; // default: normal
  whiteList['widows'] = false; // default: 2
  whiteList['width'] = true; // default: auto
  whiteList['will-change'] = false; // default: auto
  whiteList['word-break'] = true; // default: normal
  whiteList['word-spacing'] = true; // default: normal
  whiteList['word-wrap'] = true; // default: normal
  whiteList['wrap-flow'] = false; // default: auto
  whiteList['wrap-through'] = false; // default: wrap
  whiteList['writing-mode'] = false; // default: horizontal-tb
  whiteList['z-index'] = false; // default: auto

  return whiteList;
}


/**
 * 匹配到白名单上的一个属性时
 *
 * @param {String} name
 * @param {String} value
 * @param {Object} options
 * @return {String}
 */
function onAttr (name, value, options) {
  // do nothing
}

/**
 * 匹配到不在白名单上的一个属性时
 *
 * @param {String} name
 * @param {String} value
 * @param {Object} options
 * @return {String}
 */
function onIgnoreAttr (name, value, options) {
  // do nothing
}

var REGEXP_URL_JAVASCRIPT = /javascript\s*\:/img;

/**
 * 过滤属性值
 *
 * @param {String} name
 * @param {String} value
 * @return {String}
 */
function safeAttrValue(name, value) {
  if (REGEXP_URL_JAVASCRIPT.test(value)) return '';
  return value;
}


exports.whiteList = getDefaultWhiteList();
exports.getDefaultWhiteList = getDefaultWhiteList;
exports.onAttr = onAttr;
exports.onIgnoreAttr = onIgnoreAttr;
exports.safeAttrValue = safeAttrValue;


/***/ }),

/***/ "./node_modules/cssfilter/lib/index.js":
/*!*********************************************!*\
  !*** ./node_modules/cssfilter/lib/index.js ***!
  \*********************************************/
/***/ ((module, exports, __webpack_require__) => {

/**
 * cssfilter
 *
 * @author 老雷<leizongmin@gmail.com>
 */

var DEFAULT = __webpack_require__(/*! ./default */ "./node_modules/cssfilter/lib/default.js");
var FilterCSS = __webpack_require__(/*! ./css */ "./node_modules/cssfilter/lib/css.js");


/**
 * XSS过滤
 *
 * @param {String} css 要过滤的CSS代码
 * @param {Object} options 选项：whiteList, onAttr, onIgnoreAttr
 * @return {String}
 */
function filterCSS (html, options) {
  var xss = new FilterCSS(options);
  return xss.process(html);
}


// 输出
exports = module.exports = filterCSS;
exports.FilterCSS = FilterCSS;
for (var i in DEFAULT) exports[i] = DEFAULT[i];

// 在浏览器端使用
if (typeof window !== 'undefined') {
  window.filterCSS = module.exports;
}


/***/ }),

/***/ "./node_modules/cssfilter/lib/parser.js":
/*!**********************************************!*\
  !*** ./node_modules/cssfilter/lib/parser.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * cssfilter
 *
 * @author 老雷<leizongmin@gmail.com>
 */

var _ = __webpack_require__(/*! ./util */ "./node_modules/cssfilter/lib/util.js");


/**
 * 解析style
 *
 * @param {String} css
 * @param {Function} onAttr 处理属性的函数
 *   参数格式： function (sourcePosition, position, name, value, source)
 * @return {String}
 */
function parseStyle (css, onAttr) {
  css = _.trimRight(css);
  if (css[css.length - 1] !== ';') css += ';';
  var cssLength = css.length;
  var isParenthesisOpen = false;
  var lastPos = 0;
  var i = 0;
  var retCSS = '';

  function addNewAttr () {
    // 如果没有正常的闭合圆括号，则直接忽略当前属性
    if (!isParenthesisOpen) {
      var source = _.trim(css.slice(lastPos, i));
      var j = source.indexOf(':');
      if (j !== -1) {
        var name = _.trim(source.slice(0, j));
        var value = _.trim(source.slice(j + 1));
        // 必须有属性名称
        if (name) {
          var ret = onAttr(lastPos, retCSS.length, name, value, source);
          if (ret) retCSS += ret + '; ';
        }
      }
    }
    lastPos = i + 1;
  }

  for (; i < cssLength; i++) {
    var c = css[i];
    if (c === '/' && css[i + 1] === '*') {
      // 备注开始
      var j = css.indexOf('*/', i + 2);
      // 如果没有正常的备注结束，则后面的部分全部跳过
      if (j === -1) break;
      // 直接将当前位置调到备注结尾，并且初始化状态
      i = j + 1;
      lastPos = i + 1;
      isParenthesisOpen = false;
    } else if (c === '(') {
      isParenthesisOpen = true;
    } else if (c === ')') {
      isParenthesisOpen = false;
    } else if (c === ';') {
      if (isParenthesisOpen) {
        // 在圆括号里面，忽略
      } else {
        addNewAttr();
      }
    } else if (c === '\n') {
      addNewAttr();
    }
  }

  return _.trim(retCSS);
}

module.exports = parseStyle;


/***/ }),

/***/ "./node_modules/cssfilter/lib/util.js":
/*!********************************************!*\
  !*** ./node_modules/cssfilter/lib/util.js ***!
  \********************************************/
/***/ ((module) => {

module.exports = {
  indexOf: function (arr, item) {
    var i, j;
    if (Array.prototype.indexOf) {
      return arr.indexOf(item);
    }
    for (i = 0, j = arr.length; i < j; i++) {
      if (arr[i] === item) {
        return i;
      }
    }
    return -1;
  },
  forEach: function (arr, fn, scope) {
    var i, j;
    if (Array.prototype.forEach) {
      return arr.forEach(fn, scope);
    }
    for (i = 0, j = arr.length; i < j; i++) {
      fn.call(scope, arr[i], i, arr);
    }
  },
  trim: function (str) {
    if (String.prototype.trim) {
      return str.trim();
    }
    return str.replace(/(^\s*)|(\s*$)/g, '');
  },
  trimRight: function (str) {
    if (String.prototype.trimRight) {
      return str.trimRight();
    }
    return str.replace(/(\s*$)/g, '');
  }
};


/***/ }),

/***/ "./node_modules/xss/lib/default.js":
/*!*****************************************!*\
  !*** ./node_modules/xss/lib/default.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/**
 * default settings
 *
 * @author Zongmin Lei<leizongmin@gmail.com>
 */

var FilterCSS = (__webpack_require__(/*! cssfilter */ "./node_modules/cssfilter/lib/index.js").FilterCSS);
var getDefaultCSSWhiteList = (__webpack_require__(/*! cssfilter */ "./node_modules/cssfilter/lib/index.js").getDefaultWhiteList);
var _ = __webpack_require__(/*! ./util */ "./node_modules/xss/lib/util.js");

function getDefaultWhiteList() {
  return {
    a: ["target", "href", "title"],
    abbr: ["title"],
    address: [],
    area: ["shape", "coords", "href", "alt"],
    article: [],
    aside: [],
    audio: [
      "autoplay",
      "controls",
      "crossorigin",
      "loop",
      "muted",
      "preload",
      "src",
    ],
    b: [],
    bdi: ["dir"],
    bdo: ["dir"],
    big: [],
    blockquote: ["cite"],
    br: [],
    caption: [],
    center: [],
    cite: [],
    code: [],
    col: ["align", "valign", "span", "width"],
    colgroup: ["align", "valign", "span", "width"],
    dd: [],
    del: ["datetime"],
    details: ["open"],
    div: [],
    dl: [],
    dt: [],
    em: [],
    figcaption: [],
    figure: [],
    font: ["color", "size", "face"],
    footer: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    header: [],
    hr: [],
    i: [],
    img: ["src", "alt", "title", "width", "height"],
    ins: ["datetime"],
    li: [],
    mark: [],
    nav: [],
    ol: [],
    p: [],
    pre: [],
    s: [],
    section: [],
    small: [],
    span: [],
    sub: [],
    summary: [],
    sup: [],
    strong: [],
    strike: [],
    table: ["width", "border", "align", "valign"],
    tbody: ["align", "valign"],
    td: ["width", "rowspan", "colspan", "align", "valign"],
    tfoot: ["align", "valign"],
    th: ["width", "rowspan", "colspan", "align", "valign"],
    thead: ["align", "valign"],
    tr: ["rowspan", "align", "valign"],
    tt: [],
    u: [],
    ul: [],
    video: [
      "autoplay",
      "controls",
      "crossorigin",
      "loop",
      "muted",
      "playsinline",
      "poster",
      "preload",
      "src",
      "height",
      "width",
    ],
  };
}

var defaultCSSFilter = new FilterCSS();

/**
 * default onTag function
 *
 * @param {String} tag
 * @param {String} html
 * @param {Object} options
 * @return {String}
 */
function onTag(tag, html, options) {
  // do nothing
}

/**
 * default onIgnoreTag function
 *
 * @param {String} tag
 * @param {String} html
 * @param {Object} options
 * @return {String}
 */
function onIgnoreTag(tag, html, options) {
  // do nothing
}

/**
 * default onTagAttr function
 *
 * @param {String} tag
 * @param {String} name
 * @param {String} value
 * @return {String}
 */
function onTagAttr(tag, name, value) {
  // do nothing
}

/**
 * default onIgnoreTagAttr function
 *
 * @param {String} tag
 * @param {String} name
 * @param {String} value
 * @return {String}
 */
function onIgnoreTagAttr(tag, name, value) {
  // do nothing
}

/**
 * default escapeHtml function
 *
 * @param {String} html
 */
function escapeHtml(html) {
  return html.replace(REGEXP_LT, "&lt;").replace(REGEXP_GT, "&gt;");
}

/**
 * default safeAttrValue function
 *
 * @param {String} tag
 * @param {String} name
 * @param {String} value
 * @param {Object} cssFilter
 * @return {String}
 */
function safeAttrValue(tag, name, value, cssFilter) {
  // unescape attribute value firstly
  value = friendlyAttrValue(value);

  if (name === "href" || name === "src") {
    // filter `href` and `src` attribute
    // only allow the value that starts with `http://` | `https://` | `mailto:` | `/` | `#`
    value = _.trim(value);
    if (value === "#") return "#";
    if (
      !(
        value.substr(0, 7) === "http://" ||
        value.substr(0, 8) === "https://" ||
        value.substr(0, 7) === "mailto:" ||
        value.substr(0, 4) === "tel:" ||
        value.substr(0, 11) === "data:image/" ||
        value.substr(0, 6) === "ftp://" ||
        value.substr(0, 2) === "./" ||
        value.substr(0, 3) === "../" ||
        value[0] === "#" ||
        value[0] === "/"
      )
    ) {
      return "";
    }
  } else if (name === "background") {
    // filter `background` attribute (maybe no use)
    // `javascript:`
    REGEXP_DEFAULT_ON_TAG_ATTR_4.lastIndex = 0;
    if (REGEXP_DEFAULT_ON_TAG_ATTR_4.test(value)) {
      return "";
    }
  } else if (name === "style") {
    // `expression()`
    REGEXP_DEFAULT_ON_TAG_ATTR_7.lastIndex = 0;
    if (REGEXP_DEFAULT_ON_TAG_ATTR_7.test(value)) {
      return "";
    }
    // `url()`
    REGEXP_DEFAULT_ON_TAG_ATTR_8.lastIndex = 0;
    if (REGEXP_DEFAULT_ON_TAG_ATTR_8.test(value)) {
      REGEXP_DEFAULT_ON_TAG_ATTR_4.lastIndex = 0;
      if (REGEXP_DEFAULT_ON_TAG_ATTR_4.test(value)) {
        return "";
      }
    }
    if (cssFilter !== false) {
      cssFilter = cssFilter || defaultCSSFilter;
      value = cssFilter.process(value);
    }
  }

  // escape `<>"` before returns
  value = escapeAttrValue(value);
  return value;
}

// RegExp list
var REGEXP_LT = /</g;
var REGEXP_GT = />/g;
var REGEXP_QUOTE = /"/g;
var REGEXP_QUOTE_2 = /&quot;/g;
var REGEXP_ATTR_VALUE_1 = /&#([a-zA-Z0-9]*);?/gim;
var REGEXP_ATTR_VALUE_COLON = /&colon;?/gim;
var REGEXP_ATTR_VALUE_NEWLINE = /&newline;?/gim;
var REGEXP_DEFAULT_ON_TAG_ATTR_3 = /\/\*|\*\//gm;
var REGEXP_DEFAULT_ON_TAG_ATTR_4 =
  /((j\s*a\s*v\s*a|v\s*b|l\s*i\s*v\s*e)\s*s\s*c\s*r\s*i\s*p\s*t\s*|m\s*o\s*c\s*h\s*a)\:/gi;
var REGEXP_DEFAULT_ON_TAG_ATTR_5 = /^[\s"'`]*(d\s*a\s*t\s*a\s*)\:/gi;
var REGEXP_DEFAULT_ON_TAG_ATTR_6 = /^[\s"'`]*(d\s*a\s*t\s*a\s*)\:\s*image\//gi;
var REGEXP_DEFAULT_ON_TAG_ATTR_7 =
  /e\s*x\s*p\s*r\s*e\s*s\s*s\s*i\s*o\s*n\s*\(.*/gi;
var REGEXP_DEFAULT_ON_TAG_ATTR_8 = /u\s*r\s*l\s*\(.*/gi;

/**
 * escape double quote
 *
 * @param {String} str
 * @return {String} str
 */
function escapeQuote(str) {
  return str.replace(REGEXP_QUOTE, "&quot;");
}

/**
 * unescape double quote
 *
 * @param {String} str
 * @return {String} str
 */
function unescapeQuote(str) {
  return str.replace(REGEXP_QUOTE_2, '"');
}

/**
 * escape html entities
 *
 * @param {String} str
 * @return {String}
 */
function escapeHtmlEntities(str) {
  return str.replace(REGEXP_ATTR_VALUE_1, function replaceUnicode(str, code) {
    return code[0] === "x" || code[0] === "X"
      ? String.fromCharCode(parseInt(code.substr(1), 16))
      : String.fromCharCode(parseInt(code, 10));
  });
}

/**
 * escape html5 new danger entities
 *
 * @param {String} str
 * @return {String}
 */
function escapeDangerHtml5Entities(str) {
  return str
    .replace(REGEXP_ATTR_VALUE_COLON, ":")
    .replace(REGEXP_ATTR_VALUE_NEWLINE, " ");
}

/**
 * clear nonprintable characters
 *
 * @param {String} str
 * @return {String}
 */
function clearNonPrintableCharacter(str) {
  var str2 = "";
  for (var i = 0, len = str.length; i < len; i++) {
    str2 += str.charCodeAt(i) < 32 ? " " : str.charAt(i);
  }
  return _.trim(str2);
}

/**
 * get friendly attribute value
 *
 * @param {String} str
 * @return {String}
 */
function friendlyAttrValue(str) {
  str = unescapeQuote(str);
  str = escapeHtmlEntities(str);
  str = escapeDangerHtml5Entities(str);
  str = clearNonPrintableCharacter(str);
  return str;
}

/**
 * unescape attribute value
 *
 * @param {String} str
 * @return {String}
 */
function escapeAttrValue(str) {
  str = escapeQuote(str);
  str = escapeHtml(str);
  return str;
}

/**
 * `onIgnoreTag` function for removing all the tags that are not in whitelist
 */
function onIgnoreTagStripAll() {
  return "";
}

/**
 * remove tag body
 * specify a `tags` list, if the tag is not in the `tags` list then process by the specify function (optional)
 *
 * @param {array} tags
 * @param {function} next
 */
function StripTagBody(tags, next) {
  if (typeof next !== "function") {
    next = function () {};
  }

  var isRemoveAllTag = !Array.isArray(tags);
  function isRemoveTag(tag) {
    if (isRemoveAllTag) return true;
    return _.indexOf(tags, tag) !== -1;
  }

  var removeList = [];
  var posStart = false;

  return {
    onIgnoreTag: function (tag, html, options) {
      if (isRemoveTag(tag)) {
        if (options.isClosing) {
          var ret = "[/removed]";
          var end = options.position + ret.length;
          removeList.push([
            posStart !== false ? posStart : options.position,
            end,
          ]);
          posStart = false;
          return ret;
        } else {
          if (!posStart) {
            posStart = options.position;
          }
          return "[removed]";
        }
      } else {
        return next(tag, html, options);
      }
    },
    remove: function (html) {
      var rethtml = "";
      var lastPos = 0;
      _.forEach(removeList, function (pos) {
        rethtml += html.slice(lastPos, pos[0]);
        lastPos = pos[1];
      });
      rethtml += html.slice(lastPos);
      return rethtml;
    },
  };
}

/**
 * remove html comments
 *
 * @param {String} html
 * @return {String}
 */
function stripCommentTag(html) {
  var retHtml = "";
  var lastPos = 0;
  while (lastPos < html.length) {
    var i = html.indexOf("<!--", lastPos);
    if (i === -1) {
      retHtml += html.slice(lastPos);
      break;
    }
    retHtml += html.slice(lastPos, i);
    var j = html.indexOf("-->", i);
    if (j === -1) {
      break;
    }
    lastPos = j + 3;
  }
  return retHtml;
}

/**
 * remove invisible characters
 *
 * @param {String} html
 * @return {String}
 */
function stripBlankChar(html) {
  var chars = html.split("");
  chars = chars.filter(function (char) {
    var c = char.charCodeAt(0);
    if (c === 127) return false;
    if (c <= 31) {
      if (c === 10 || c === 13) return true;
      return false;
    }
    return true;
  });
  return chars.join("");
}

exports.whiteList = getDefaultWhiteList();
exports.getDefaultWhiteList = getDefaultWhiteList;
exports.onTag = onTag;
exports.onIgnoreTag = onIgnoreTag;
exports.onTagAttr = onTagAttr;
exports.onIgnoreTagAttr = onIgnoreTagAttr;
exports.safeAttrValue = safeAttrValue;
exports.escapeHtml = escapeHtml;
exports.escapeQuote = escapeQuote;
exports.unescapeQuote = unescapeQuote;
exports.escapeHtmlEntities = escapeHtmlEntities;
exports.escapeDangerHtml5Entities = escapeDangerHtml5Entities;
exports.clearNonPrintableCharacter = clearNonPrintableCharacter;
exports.friendlyAttrValue = friendlyAttrValue;
exports.escapeAttrValue = escapeAttrValue;
exports.onIgnoreTagStripAll = onIgnoreTagStripAll;
exports.StripTagBody = StripTagBody;
exports.stripCommentTag = stripCommentTag;
exports.stripBlankChar = stripBlankChar;
exports.cssFilter = defaultCSSFilter;
exports.getDefaultCSSWhiteList = getDefaultCSSWhiteList;


/***/ }),

/***/ "./node_modules/xss/lib/index.js":
/*!***************************************!*\
  !*** ./node_modules/xss/lib/index.js ***!
  \***************************************/
/***/ ((module, exports, __webpack_require__) => {

/**
 * xss
 *
 * @author Zongmin Lei<leizongmin@gmail.com>
 */

var DEFAULT = __webpack_require__(/*! ./default */ "./node_modules/xss/lib/default.js");
var parser = __webpack_require__(/*! ./parser */ "./node_modules/xss/lib/parser.js");
var FilterXSS = __webpack_require__(/*! ./xss */ "./node_modules/xss/lib/xss.js");

/**
 * filter xss function
 *
 * @param {String} html
 * @param {Object} options { whiteList, onTag, onTagAttr, onIgnoreTag, onIgnoreTagAttr, safeAttrValue, escapeHtml }
 * @return {String}
 */
function filterXSS(html, options) {
  var xss = new FilterXSS(options);
  return xss.process(html);
}

exports = module.exports = filterXSS;
exports.filterXSS = filterXSS;
exports.FilterXSS = FilterXSS;
for (var i in DEFAULT) exports[i] = DEFAULT[i];
for (var i in parser) exports[i] = parser[i];

// using `xss` on the browser, output `filterXSS` to the globals
if (typeof window !== "undefined") {
  window.filterXSS = module.exports;
}

// using `xss` on the WebWorker, output `filterXSS` to the globals
function isWorkerEnv() {
  return (
    typeof self !== "undefined" &&
    typeof DedicatedWorkerGlobalScope !== "undefined" &&
    self instanceof DedicatedWorkerGlobalScope
  );
}
if (isWorkerEnv()) {
  self.filterXSS = module.exports;
}


/***/ }),

/***/ "./node_modules/xss/lib/parser.js":
/*!****************************************!*\
  !*** ./node_modules/xss/lib/parser.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/**
 * Simple HTML Parser
 *
 * @author Zongmin Lei<leizongmin@gmail.com>
 */

var _ = __webpack_require__(/*! ./util */ "./node_modules/xss/lib/util.js");

/**
 * get tag name
 *
 * @param {String} html e.g. '<a hef="#">'
 * @return {String}
 */
function getTagName(html) {
  var i = _.spaceIndex(html);
  if (i === -1) {
    var tagName = html.slice(1, -1);
  } else {
    var tagName = html.slice(1, i + 1);
  }
  tagName = _.trim(tagName).toLowerCase();
  if (tagName.slice(0, 1) === "/") tagName = tagName.slice(1);
  if (tagName.slice(-1) === "/") tagName = tagName.slice(0, -1);
  return tagName;
}

/**
 * is close tag?
 *
 * @param {String} html 如：'<a hef="#">'
 * @return {Boolean}
 */
function isClosing(html) {
  return html.slice(0, 2) === "</";
}

/**
 * parse input html and returns processed html
 *
 * @param {String} html
 * @param {Function} onTag e.g. function (sourcePosition, position, tag, html, isClosing)
 * @param {Function} escapeHtml
 * @return {String}
 */
function parseTag(html, onTag, escapeHtml) {
  "use strict";

  var rethtml = "";
  var lastPos = 0;
  var tagStart = false;
  var quoteStart = false;
  var currentPos = 0;
  var len = html.length;
  var currentTagName = "";
  var currentHtml = "";

  chariterator: for (currentPos = 0; currentPos < len; currentPos++) {
    var c = html.charAt(currentPos);
    if (tagStart === false) {
      if (c === "<") {
        tagStart = currentPos;
        continue;
      }
    } else {
      if (quoteStart === false) {
        if (c === "<") {
          rethtml += escapeHtml(html.slice(lastPos, currentPos));
          tagStart = currentPos;
          lastPos = currentPos;
          continue;
        }
        if (c === ">") {
          rethtml += escapeHtml(html.slice(lastPos, tagStart));
          currentHtml = html.slice(tagStart, currentPos + 1);
          currentTagName = getTagName(currentHtml);
          rethtml += onTag(
            tagStart,
            rethtml.length,
            currentTagName,
            currentHtml,
            isClosing(currentHtml)
          );
          lastPos = currentPos + 1;
          tagStart = false;
          continue;
        }
        if (c === '"' || c === "'") {
          var i = 1;
          var ic = html.charAt(currentPos - i);

          while (ic.trim() === "" || ic === "=") {
            if (ic === "=") {
              quoteStart = c;
              continue chariterator;
            }
            ic = html.charAt(currentPos - ++i);
          }
        }
      } else {
        if (c === quoteStart) {
          quoteStart = false;
          continue;
        }
      }
    }
  }
  if (lastPos < html.length) {
    rethtml += escapeHtml(html.substr(lastPos));
  }

  return rethtml;
}

var REGEXP_ILLEGAL_ATTR_NAME = /[^a-zA-Z0-9_:\.\-]/gim;

/**
 * parse input attributes and returns processed attributes
 *
 * @param {String} html e.g. `href="#" target="_blank"`
 * @param {Function} onAttr e.g. `function (name, value)`
 * @return {String}
 */
function parseAttr(html, onAttr) {
  "use strict";

  var lastPos = 0;
  var retAttrs = [];
  var tmpName = false;
  var len = html.length;

  function addAttr(name, value) {
    name = _.trim(name);
    name = name.replace(REGEXP_ILLEGAL_ATTR_NAME, "").toLowerCase();
    if (name.length < 1) return;
    var ret = onAttr(name, value || "");
    if (ret) retAttrs.push(ret);
  }

  // 逐个分析字符
  for (var i = 0; i < len; i++) {
    var c = html.charAt(i);
    var v, j;
    if (tmpName === false && c === "=") {
      tmpName = html.slice(lastPos, i);
      lastPos = i + 1;
      continue;
    }
    if (tmpName !== false) {
      if (
        i === lastPos &&
        (c === '"' || c === "'") &&
        html.charAt(i - 1) === "="
      ) {
        j = html.indexOf(c, i + 1);
        if (j === -1) {
          break;
        } else {
          v = _.trim(html.slice(lastPos + 1, j));
          addAttr(tmpName, v);
          tmpName = false;
          i = j;
          lastPos = i + 1;
          continue;
        }
      }
    }
    if (/\s|\n|\t/.test(c)) {
      html = html.replace(/\s|\n|\t/g, " ");
      if (tmpName === false) {
        j = findNextEqual(html, i);
        if (j === -1) {
          v = _.trim(html.slice(lastPos, i));
          addAttr(v);
          tmpName = false;
          lastPos = i + 1;
          continue;
        } else {
          i = j - 1;
          continue;
        }
      } else {
        j = findBeforeEqual(html, i - 1);
        if (j === -1) {
          v = _.trim(html.slice(lastPos, i));
          v = stripQuoteWrap(v);
          addAttr(tmpName, v);
          tmpName = false;
          lastPos = i + 1;
          continue;
        } else {
          continue;
        }
      }
    }
  }

  if (lastPos < html.length) {
    if (tmpName === false) {
      addAttr(html.slice(lastPos));
    } else {
      addAttr(tmpName, stripQuoteWrap(_.trim(html.slice(lastPos))));
    }
  }

  return _.trim(retAttrs.join(" "));
}

function findNextEqual(str, i) {
  for (; i < str.length; i++) {
    var c = str[i];
    if (c === " ") continue;
    if (c === "=") return i;
    return -1;
  }
}

function findBeforeEqual(str, i) {
  for (; i > 0; i--) {
    var c = str[i];
    if (c === " ") continue;
    if (c === "=") return i;
    return -1;
  }
}

function isQuoteWrapString(text) {
  if (
    (text[0] === '"' && text[text.length - 1] === '"') ||
    (text[0] === "'" && text[text.length - 1] === "'")
  ) {
    return true;
  } else {
    return false;
  }
}

function stripQuoteWrap(text) {
  if (isQuoteWrapString(text)) {
    return text.substr(1, text.length - 2);
  } else {
    return text;
  }
}

exports.parseTag = parseTag;
exports.parseAttr = parseAttr;


/***/ }),

/***/ "./node_modules/xss/lib/util.js":
/*!**************************************!*\
  !*** ./node_modules/xss/lib/util.js ***!
  \**************************************/
/***/ ((module) => {

module.exports = {
  indexOf: function (arr, item) {
    var i, j;
    if (Array.prototype.indexOf) {
      return arr.indexOf(item);
    }
    for (i = 0, j = arr.length; i < j; i++) {
      if (arr[i] === item) {
        return i;
      }
    }
    return -1;
  },
  forEach: function (arr, fn, scope) {
    var i, j;
    if (Array.prototype.forEach) {
      return arr.forEach(fn, scope);
    }
    for (i = 0, j = arr.length; i < j; i++) {
      fn.call(scope, arr[i], i, arr);
    }
  },
  trim: function (str) {
    if (String.prototype.trim) {
      return str.trim();
    }
    return str.replace(/(^\s*)|(\s*$)/g, "");
  },
  spaceIndex: function (str) {
    var reg = /\s|\n|\t/;
    var match = reg.exec(str);
    return match ? match.index : -1;
  },
};


/***/ }),

/***/ "./node_modules/xss/lib/xss.js":
/*!*************************************!*\
  !*** ./node_modules/xss/lib/xss.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * filter xss
 *
 * @author Zongmin Lei<leizongmin@gmail.com>
 */

var FilterCSS = (__webpack_require__(/*! cssfilter */ "./node_modules/cssfilter/lib/index.js").FilterCSS);
var DEFAULT = __webpack_require__(/*! ./default */ "./node_modules/xss/lib/default.js");
var parser = __webpack_require__(/*! ./parser */ "./node_modules/xss/lib/parser.js");
var parseTag = parser.parseTag;
var parseAttr = parser.parseAttr;
var _ = __webpack_require__(/*! ./util */ "./node_modules/xss/lib/util.js");

/**
 * returns `true` if the input value is `undefined` or `null`
 *
 * @param {Object} obj
 * @return {Boolean}
 */
function isNull(obj) {
  return obj === undefined || obj === null;
}

/**
 * get attributes for a tag
 *
 * @param {String} html
 * @return {Object}
 *   - {String} html
 *   - {Boolean} closing
 */
function getAttrs(html) {
  var i = _.spaceIndex(html);
  if (i === -1) {
    return {
      html: "",
      closing: html[html.length - 2] === "/",
    };
  }
  html = _.trim(html.slice(i + 1, -1));
  var isClosing = html[html.length - 1] === "/";
  if (isClosing) html = _.trim(html.slice(0, -1));
  return {
    html: html,
    closing: isClosing,
  };
}

/**
 * shallow copy
 *
 * @param {Object} obj
 * @return {Object}
 */
function shallowCopyObject(obj) {
  var ret = {};
  for (var i in obj) {
    ret[i] = obj[i];
  }
  return ret;
}

/**
 * FilterXSS class
 *
 * @param {Object} options
 *        whiteList, onTag, onTagAttr, onIgnoreTag,
 *        onIgnoreTagAttr, safeAttrValue, escapeHtml
 *        stripIgnoreTagBody, allowCommentTag, stripBlankChar
 *        css{whiteList, onAttr, onIgnoreAttr} `css=false` means don't use `cssfilter`
 */
function FilterXSS(options) {
  options = shallowCopyObject(options || {});

  if (options.stripIgnoreTag) {
    if (options.onIgnoreTag) {
      console.error(
        'Notes: cannot use these two options "stripIgnoreTag" and "onIgnoreTag" at the same time'
      );
    }
    options.onIgnoreTag = DEFAULT.onIgnoreTagStripAll;
  }

  options.whiteList = options.whiteList || DEFAULT.whiteList;
  options.onTag = options.onTag || DEFAULT.onTag;
  options.onTagAttr = options.onTagAttr || DEFAULT.onTagAttr;
  options.onIgnoreTag = options.onIgnoreTag || DEFAULT.onIgnoreTag;
  options.onIgnoreTagAttr = options.onIgnoreTagAttr || DEFAULT.onIgnoreTagAttr;
  options.safeAttrValue = options.safeAttrValue || DEFAULT.safeAttrValue;
  options.escapeHtml = options.escapeHtml || DEFAULT.escapeHtml;
  this.options = options;

  if (options.css === false) {
    this.cssFilter = false;
  } else {
    options.css = options.css || {};
    this.cssFilter = new FilterCSS(options.css);
  }
}

/**
 * start process and returns result
 *
 * @param {String} html
 * @return {String}
 */
FilterXSS.prototype.process = function (html) {
  // compatible with the input
  html = html || "";
  html = html.toString();
  if (!html) return "";

  var me = this;
  var options = me.options;
  var whiteList = options.whiteList;
  var onTag = options.onTag;
  var onIgnoreTag = options.onIgnoreTag;
  var onTagAttr = options.onTagAttr;
  var onIgnoreTagAttr = options.onIgnoreTagAttr;
  var safeAttrValue = options.safeAttrValue;
  var escapeHtml = options.escapeHtml;
  var cssFilter = me.cssFilter;

  // remove invisible characters
  if (options.stripBlankChar) {
    html = DEFAULT.stripBlankChar(html);
  }

  // remove html comments
  if (!options.allowCommentTag) {
    html = DEFAULT.stripCommentTag(html);
  }

  // if enable stripIgnoreTagBody
  var stripIgnoreTagBody = false;
  if (options.stripIgnoreTagBody) {
    var stripIgnoreTagBody = DEFAULT.StripTagBody(
      options.stripIgnoreTagBody,
      onIgnoreTag
    );
    onIgnoreTag = stripIgnoreTagBody.onIgnoreTag;
  }

  var retHtml = parseTag(
    html,
    function (sourcePosition, position, tag, html, isClosing) {
      var info = {
        sourcePosition: sourcePosition,
        position: position,
        isClosing: isClosing,
        isWhite: whiteList.hasOwnProperty(tag),
      };

      // call `onTag()`
      var ret = onTag(tag, html, info);
      if (!isNull(ret)) return ret;

      if (info.isWhite) {
        if (info.isClosing) {
          return "</" + tag + ">";
        }

        var attrs = getAttrs(html);
        var whiteAttrList = whiteList[tag];
        var attrsHtml = parseAttr(attrs.html, function (name, value) {
          // call `onTagAttr()`
          var isWhiteAttr = _.indexOf(whiteAttrList, name) !== -1;
          var ret = onTagAttr(tag, name, value, isWhiteAttr);
          if (!isNull(ret)) return ret;

          if (isWhiteAttr) {
            // call `safeAttrValue()`
            value = safeAttrValue(tag, name, value, cssFilter);
            if (value) {
              return name + '="' + value + '"';
            } else {
              return name;
            }
          } else {
            // call `onIgnoreTagAttr()`
            var ret = onIgnoreTagAttr(tag, name, value, isWhiteAttr);
            if (!isNull(ret)) return ret;
            return;
          }
        });

        // build new tag html
        var html = "<" + tag;
        if (attrsHtml) html += " " + attrsHtml;
        if (attrs.closing) html += " /";
        html += ">";
        return html;
      } else {
        // call `onIgnoreTag()`
        var ret = onIgnoreTag(tag, html, info);
        if (!isNull(ret)) return ret;
        return escapeHtml(html);
      }
    },
    escapeHtml
  );

  // if enable stripIgnoreTagBody
  if (stripIgnoreTagBody) {
    retHtml = stripIgnoreTagBody.remove(retHtml);
  }

  return retHtml;
};

module.exports = FilterXSS;


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((module, exports, __webpack_require__) => {

const memory = __webpack_require__(/*! ./lib/memory */ "./src/lib/memory.js")
const formatXss = __webpack_require__(/*! ./lib/formatXss */ "./src/lib/formatXss.js")
const cookie = __webpack_require__(/*! ./lib/cookie */ "./src/lib/cookie.js")
const util = __webpack_require__(/*! ./lib/util */ "./src/lib/util.js")

exports.isMobileOrMail = util.isMobileOrMail;
exports.isMobile = util.isMobile;
exports.isMail = util.isMail;
exports.memory = memory;
exports.formatXss = formatXss;
exports.cookie = cookie;
exports.debounce = util.debounce;
exports.throttle = util.throttle
//将整个模块导出
module.exports.jsbUtil = {
    ...util, formatXss, memory, cookie
}


/***/ }),

/***/ "./src/lib/cookie.js":
/*!***************************!*\
  !*** ./src/lib/cookie.js ***!
  \***************************/
/***/ ((module) => {

/**
 * @description:cookie基本管理
 */
function Cookie() {

}

/**
 * @description:获取对应的key
 * @param {string} key key
 * @param {anys} value 没有找到时返回的预设值，默认false
 * @return {string|Boolean} string / false
 */
Cookie.prototype.get = function (key, def = false) {
    let arr = document.cookie.split(";");
    for (let item of arr) {
        const el = item.split("=");
        if (el[0].trim() === key) {
            return el[1];
        }
    }
    return def;
}
/**
 * @description:设置对应的key value
 * @param {string} key key
 * @param {string} value value
 * @param {Date} expires 过期时间 Date对象
 * @return {Boolean} Boolean
 */
Cookie.prototype.set = function (key, value, expires = "") {
    if (key.trim() == "") return false;
    document.cookie = `${key}=${value};expires=${expires}`;
}
/**
 * @description:删除对应的key
 * @param {string} key key
 * @return {void} void
 */
Cookie.prototype.del = function (key) {
    document.cookie = `${key}=0; path=/; expires=${new Date(0).toUTCString()}`
}
/**
 * @description:清除本地所有cookie
 * @return {void} void
 */
Cookie.prototype.clear = function () {
    let list = document.cookie.match(/[^ =;]+(?=\=)/g);
    for (let i = 0; i < list.length; i++) {
        this.del(list[i]);
    }
    document.cookie = `=0; path=/; expires=${new Date(0).toUTCString()}`
}

module.exports = new Cookie()


/***/ }),

/***/ "./src/lib/formatXss.js":
/*!******************************!*\
  !*** ./src/lib/formatXss.js ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const xss = __webpack_require__(/*! xss */ "./node_modules/xss/lib/index.js");
/**
 * @description:xss过滤
 * @param {string} Html 富文本内容
 * @param {array} format 允许放行的html标签
 * @param {array} attr 允许放行的标签属性标签
 * @return {string} htmlString
 */
function formatXss(Html, format = [], attr = []){
    //允许通过的标签
    const tag = [
        "p",
        "a",
        "img",
        "font",
        "span",
        "b",
        "blockquote",
        "code",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "hr",
        "br",
        "s",
        "i",
        "u",
        "strike",
        "div",
        "strong",
        "pre"
    ];
    if (format.length > 0) {
        format.forEach(el => {
            tag.push(el);
        })
    }
    //允许使用的属性
    const can = ["color", "size", "style", "href", "src"];
    if (attr.length > 0) {
        attr.map(e => {
            can.push(e)
        })
    }
    let tmp = {};
    for (let index = 0; index < tag.length; index++) {
        const element = tag[index];
        tmp[element] = can;
    }
    let text = xss(Html, {
        whiteList: tmp,
    });
    return text;
}

module.exports = formatXss


/***/ }),

/***/ "./src/lib/memory.js":
/*!***************************!*\
  !*** ./src/lib/memory.js ***!
  \***************************/
/***/ ((module) => {

/**
 * @description:localStorage储存管理
 * @returns {Memory}
 */
class Memory {
    Local = null;

    constructor() {
        this.Local = localStorage || window.localStorage;
    }

    /**
     * @description: 设置本地localStorage储存
     * @param {*} key 键
     * @param {Object|String} value 值
     * @return {Memory} Memory 可实现链式连续调用
     */
    set(key, value) {
        if (typeof value == "object") {
            value = JSON.stringify(value);
        }
        this.Local.setItem(key, value);
        return this;
    }

    /**
     * @description: 获取键
     * @param {*} key
     * @return {Object|String} value 返回值
     */
    get(key) {
        let info = this.Local.getItem(key);
        if (info === "" || !info) {
            return "";
        }
        return this.isObj(info);
    }

    /**
     * @description: 判断字符串是不是json对象
     * @param {*} str
     * @return {*}
     */
    isObj(str) {
        if (typeof str == "string") {
            try {
                let obj = JSON.parse(str);
                if (typeof obj == "object" && obj) {
                    return obj;
                } else {
                    return str;
                }
            } catch (e) {
                return str;
            }
        }
    }

    /**
     * @description: 删除本地localStorage储存key
     * @param {*} key
     * @return {Memory} boolean
     */
    del(key) {
        this.Local.removeItem(key);
        return this; //返回自身，可以实现链式调用Memory().del(key).del(key).set(key,value);
    }

    /**
     * @description: 清除全部本地localStorage储存
     * @return {Memory} boolean
     */
    clear() {
        this.Local.clear();
        return this;
    }
}

var memory = new Memory()
module.exports = memory;


/***/ }),

/***/ "./src/lib/util.js":
/*!*************************!*\
  !*** ./src/lib/util.js ***!
  \*************************/
/***/ ((module) => {

/**
 * @description:验证是否为手机账号
 * @param {string} Mobile 手机账号
 * @return {Boolean} Boolean
 */
const isMobile = (Mobile = "") => {
    return /^1[3456789]\d{9}$/.test(Mobile);
}

/**
 * @description:验证是否为邮箱
 * @param {string} Mail 邮箱账号
 * @return {Boolean} Boolean
 */
const isMail = (Mail = "") => {
    return /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(Mail)
}

/**
 * @description:验证一段字符串是邮箱还是手机号码
 * @param {string} account 字符串
 * @return {String|Boolean} mail / mobile / false
 */
const isMobileOrMail = (account) => {
    if (isMail(account)) {
        return "mail"
    }
    if (isMobile(account)) {
        return "mobile"
    }
    return false;
}
/**
 * @description:防抖
 * @param fn 方法名|回调函数
 * @param wait 前后间隔时间间距
 * @returns {(function(): void)|*} 闭包方法
 */
const debounce = (fn, wait) => {
    let timer = null;
    return function () {
        if (timer !== null) {
            clearTimeout(timer);
        }
        timer = setTimeout(fn, wait);
    }
}
/**
 * @description:截流
 * @param fn 方法名｜回调函数
 * @param wait 每次调用间隔
 * @return {(function(): void)|*}
 */
const throttle = (fn, wait) => {
    let timer = true;
    return function () {
        if (!timer) return;
        timer = false;
        setTimeout(function () {
            fn.apply(this, arguments)
            timer = true;
        }, wait)
    }
}

module.exports = {
    debounce, isMobileOrMail, isMail, isMobile, throttle
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module used 'module' so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNiVXRpbEAxLjAuNy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGNBQWMsbUJBQU8sQ0FBQywwREFBVztBQUNqQyxpQkFBaUIsbUJBQU8sQ0FBQyx3REFBVTtBQUNuQyxRQUFRLG1CQUFPLENBQUMsb0RBQVE7OztBQUd4QjtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsUUFBUSxRQUFRO0FBQ2hCLFFBQVEsVUFBVTtBQUNsQixRQUFRLFVBQVU7QUFDbEIsUUFBUSxVQUFVO0FBQ2xCO0FBQ0E7QUFDQSwyQ0FBMkM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBOztBQUVBLE1BQU07O0FBRU47QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0E7OztBQUdBOzs7Ozs7Ozs7OztBQzdHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7O0FBRUEsc0NBQXNDO0FBQ3RDLG9DQUFvQztBQUNwQyxtQ0FBbUM7QUFDbkMseUNBQXlDO0FBQ3pDLDJDQUEyQztBQUMzQyw0QkFBNEI7QUFDNUIscUNBQXFDO0FBQ3JDLGtDQUFrQztBQUNsQyx3Q0FBd0M7QUFDeEMsNENBQTRDO0FBQzVDLDJDQUEyQztBQUMzQyw0Q0FBNEM7QUFDNUMsa0RBQWtEO0FBQ2xELHVDQUF1QztBQUN2Qyw2Q0FBNkM7QUFDN0Msa0RBQWtEO0FBQ2xELGdDQUFnQztBQUNoQyw0Q0FBNEM7QUFDNUMsa0NBQWtDO0FBQ2xDLDZDQUE2QztBQUM3Qyx1Q0FBdUM7QUFDdkMsd0NBQXdDO0FBQ3hDLHdDQUF3QztBQUN4Qyx5Q0FBeUM7QUFDekMsMkNBQTJDO0FBQzNDLHlDQUF5QztBQUN6Qyx1Q0FBdUM7QUFDdkMsdUNBQXVDO0FBQ3ZDLGdDQUFnQztBQUNoQyw4QkFBOEI7QUFDOUIsdUNBQXVDO0FBQ3ZDLHVDQUF1QztBQUN2Qyx1Q0FBdUM7QUFDdkMsOEJBQThCO0FBQzlCLHFDQUFxQztBQUNyQywyQ0FBMkM7QUFDM0MsaURBQWlEO0FBQ2pELGtEQUFrRDtBQUNsRCwyQ0FBMkM7QUFDM0MsMkNBQTJDO0FBQzNDLHVDQUF1QztBQUN2QyxvQ0FBb0M7QUFDcEMsb0NBQW9DO0FBQ3BDLDJDQUEyQztBQUMzQywyQ0FBMkM7QUFDM0MsMENBQTBDO0FBQzFDLDJDQUEyQztBQUMzQywwQ0FBMEM7QUFDMUMsbUNBQW1DO0FBQ25DLHlDQUF5QztBQUN6Qyx5Q0FBeUM7QUFDekMseUNBQXlDO0FBQ3pDLHFDQUFxQztBQUNyQyxvQ0FBb0M7QUFDcEMsMENBQTBDO0FBQzFDLDBDQUEwQztBQUMxQywwQ0FBMEM7QUFDMUMsc0NBQXNDO0FBQ3RDLG9DQUFvQztBQUNwQyxrQ0FBa0M7QUFDbEMsd0NBQXdDO0FBQ3hDLDhDQUE4QztBQUM5QywrQ0FBK0M7QUFDL0Msd0NBQXdDO0FBQ3hDLHdDQUF3QztBQUN4QyxvQ0FBb0M7QUFDcEMsK0JBQStCO0FBQy9CLDRDQUE0QztBQUM1QyxrQ0FBa0M7QUFDbEMsa0NBQWtDO0FBQ2xDLGdDQUFnQztBQUNoQyxvQ0FBb0M7QUFDcEMsbUNBQW1DO0FBQ25DLG9DQUFvQztBQUNwQyxvQ0FBb0M7QUFDcEMscUNBQXFDO0FBQ3JDLCtCQUErQjtBQUMvQiw2QkFBNkI7QUFDN0IsNkJBQTZCO0FBQzdCLGtDQUFrQztBQUNsQyxrQ0FBa0M7QUFDbEMsNkJBQTZCO0FBQzdCLG1EQUFtRDtBQUNuRCxxQ0FBcUM7QUFDckMsb0NBQW9DO0FBQ3BDLG1DQUFtQztBQUNuQyxvQ0FBb0M7QUFDcEMsMENBQTBDO0FBQzFDLDBDQUEwQztBQUMxQywwQ0FBMEM7QUFDMUMsb0NBQW9DO0FBQ3BDLHFDQUFxQztBQUNyQyxnQ0FBZ0M7QUFDaEMsZ0NBQWdDO0FBQ2hDLGdDQUFnQztBQUNoQywwQ0FBMEM7QUFDMUMsc0NBQXNDO0FBQ3RDLG9DQUFvQztBQUNwQyw2QkFBNkI7QUFDN0IsNEJBQTRCO0FBQzVCLGtDQUFrQztBQUNsQyxtQ0FBbUM7QUFDbkMsK0JBQStCO0FBQy9CLGtDQUFrQztBQUNsQywrQkFBK0I7QUFDL0Isc0NBQXNDO0FBQ3RDLG9DQUFvQztBQUNwQyx1Q0FBdUM7QUFDdkMsMENBQTBDO0FBQzFDLGtDQUFrQztBQUNsQyxvQ0FBb0M7QUFDcEMsK0JBQStCO0FBQy9CLDZCQUE2QjtBQUM3QixtQ0FBbUM7QUFDbkMsdUNBQXVDO0FBQ3ZDLGtDQUFrQztBQUNsQyxrQ0FBa0M7QUFDbEMsb0NBQW9DO0FBQ3BDLGtDQUFrQztBQUNsQyw4QkFBOEI7QUFDOUIscUNBQXFDO0FBQ3JDLG9DQUFvQztBQUNwQyxzQ0FBc0M7QUFDdEMsa0NBQWtDO0FBQ2xDLGtDQUFrQztBQUNsQyw0QkFBNEI7QUFDNUIsbUNBQW1DO0FBQ25DLDZDQUE2QztBQUM3QyxvQ0FBb0M7QUFDcEMsOENBQThDO0FBQzlDLGlDQUFpQztBQUNqQyx3Q0FBd0M7QUFDeEMsb0NBQW9DO0FBQ3BDLGtDQUFrQztBQUNsQyxzQ0FBc0M7QUFDdEMsb0NBQW9DO0FBQ3BDLCtDQUErQztBQUMvQyx5Q0FBeUM7QUFDekMsK0NBQStDO0FBQy9DLDhDQUE4QztBQUM5Qyw0Q0FBNEM7QUFDNUMsNkNBQTZDO0FBQzdDLG1DQUFtQztBQUNuQyw2QkFBNkI7QUFDN0Isa0NBQWtDO0FBQ2xDLDBDQUEwQztBQUMxQyx1Q0FBdUM7QUFDdkMsdUNBQXVDO0FBQ3ZDLG9DQUFvQztBQUNwQyx3Q0FBd0M7QUFDeEMsMENBQTBDO0FBQzFDLGlDQUFpQztBQUNqQyxxQ0FBcUM7QUFDckMsdUNBQXVDO0FBQ3ZDLHNDQUFzQztBQUN0Qyw0Q0FBNEM7QUFDNUMsOENBQThDO0FBQzlDLDJDQUEyQztBQUMzQyw0Q0FBNEM7QUFDNUMsOEJBQThCO0FBQzlCLGdDQUFnQztBQUNoQyw2QkFBNkI7QUFDN0IsMENBQTBDO0FBQzFDLHlDQUF5QztBQUN6QyxpQ0FBaUM7QUFDakMsd0NBQXdDO0FBQ3hDLHlDQUF5QztBQUN6Qyx3Q0FBd0M7QUFDeEMsc0NBQXNDO0FBQ3RDLHFDQUFxQztBQUNyQyw2QkFBNkI7QUFDN0Isc0NBQXNDO0FBQ3RDLHNDQUFzQztBQUN0Qyx5Q0FBeUM7QUFDekMsbUNBQW1DO0FBQ25DLGtDQUFrQztBQUNsQyxvQ0FBb0M7QUFDcEMsa0NBQWtDO0FBQ2xDLHNDQUFzQztBQUN0QywyQ0FBMkM7QUFDM0MsNENBQTRDO0FBQzVDLCtDQUErQztBQUMvQyxrQ0FBa0M7QUFDbEMsd0NBQXdDO0FBQ3hDLDJDQUEyQztBQUMzQyx1Q0FBdUM7QUFDdkMsOEJBQThCO0FBQzlCLHFDQUFxQztBQUNyQyxtQ0FBbUM7QUFDbkMsb0NBQW9DO0FBQ3BDLGtDQUFrQztBQUNsQyxzQ0FBc0M7QUFDdEMsb0NBQW9DO0FBQ3BDLDhCQUE4QjtBQUM5Qiw2QkFBNkI7QUFDN0IsaUNBQWlDO0FBQ2pDLHdDQUF3QztBQUN4Qyx3Q0FBd0M7QUFDeEMsdUNBQXVDO0FBQ3ZDLHdDQUF3QztBQUN4Qyx1Q0FBdUM7QUFDdkMsa0NBQWtDO0FBQ2xDLG1DQUFtQztBQUNuQyxvQ0FBb0M7QUFDcEMsc0NBQXNDO0FBQ3RDLG9DQUFvQztBQUNwQyxrQ0FBa0M7QUFDbEMseUNBQXlDO0FBQ3pDLGtDQUFrQztBQUNsQyxrQ0FBa0M7QUFDbEMsa0NBQWtDO0FBQ2xDLGlDQUFpQztBQUNqQyxrQ0FBa0M7QUFDbEMsaUNBQWlDO0FBQ2pDLGdDQUFnQztBQUNoQyxpQ0FBaUM7QUFDakMsa0NBQWtDO0FBQ2xDLGlDQUFpQztBQUNqQyxrQ0FBa0M7QUFDbEMsK0JBQStCO0FBQy9CLG1DQUFtQztBQUNuQyx3Q0FBd0M7QUFDeEMsZ0NBQWdDO0FBQ2hDLDhCQUE4QjtBQUM5QixnQ0FBZ0M7QUFDaEMsZ0NBQWdDO0FBQ2hDLHNDQUFzQztBQUN0Qyx1Q0FBdUM7QUFDdkMsc0NBQXNDO0FBQ3RDLHNDQUFzQztBQUN0QyxpQ0FBaUM7QUFDakMsc0NBQXNDO0FBQ3RDLG1DQUFtQztBQUNuQyxtQ0FBbUM7QUFDbkMsK0JBQStCO0FBQy9CLHNDQUFzQztBQUN0QyxvQ0FBb0M7QUFDcEMscUNBQXFDO0FBQ3JDLG1DQUFtQztBQUNuQyw2QkFBNkI7QUFDN0IseUNBQXlDO0FBQ3pDLDBDQUEwQztBQUMxQywwQ0FBMEM7QUFDMUMsb0NBQW9DO0FBQ3BDLDhCQUE4QjtBQUM5QixvQ0FBb0M7QUFDcEMscUNBQXFDO0FBQ3JDLG9DQUFvQztBQUNwQywyQ0FBMkM7QUFDM0MsOEJBQThCO0FBQzlCLG9DQUFvQztBQUNwQyxvQ0FBb0M7QUFDcEMsaUNBQWlDO0FBQ2pDLDJDQUEyQztBQUMzQywrQkFBK0I7QUFDL0Isd0NBQXdDO0FBQ3hDLCtCQUErQjtBQUMvQiw2QkFBNkI7QUFDN0IsbUNBQW1DO0FBQ25DLG9DQUFvQztBQUNwQyxpQ0FBaUM7QUFDakMsOEJBQThCO0FBQzlCLGlDQUFpQztBQUNqQyx1Q0FBdUM7QUFDdkMsbUNBQW1DO0FBQ25DLG1DQUFtQztBQUNuQyxzQ0FBc0M7QUFDdEMsOENBQThDO0FBQzlDLHNDQUFzQztBQUN0QyxxQ0FBcUM7QUFDckMsNkJBQTZCO0FBQzdCLDhCQUE4QjtBQUM5QixpQ0FBaUM7QUFDakMscUNBQXFDO0FBQ3JDLHNDQUFzQztBQUN0QywwQ0FBMEM7QUFDMUMsb0NBQW9DO0FBQ3BDLCtCQUErQjtBQUMvQixtQ0FBbUM7QUFDbkMsaUNBQWlDO0FBQ2pDLHFDQUFxQztBQUNyQyxrQ0FBa0M7QUFDbEMsdUNBQXVDO0FBQ3ZDLDRDQUE0QztBQUM1Qyx1Q0FBdUM7QUFDdkMsNkNBQTZDO0FBQzdDLDRDQUE0QztBQUM1Qyw0Q0FBNEM7QUFDNUMsNkNBQTZDO0FBQzdDLHFDQUFxQztBQUNyQywyQ0FBMkM7QUFDM0MsOENBQThDO0FBQzlDLDJDQUEyQztBQUMzQyxtQ0FBbUM7QUFDbkMsbUNBQW1DO0FBQ25DLG9DQUFvQztBQUNwQyx3Q0FBd0M7QUFDeEMscUNBQXFDO0FBQ3JDLG1DQUFtQztBQUNuQywyQ0FBMkM7QUFDM0Msc0NBQXNDO0FBQ3RDLCtDQUErQztBQUMvQyxpQ0FBaUM7QUFDakMsNEJBQTRCO0FBQzVCLGtDQUFrQztBQUNsQyx5Q0FBeUM7QUFDekMsd0NBQXdDO0FBQ3hDLG1DQUFtQztBQUNuQyx5Q0FBeUM7QUFDekMsNENBQTRDO0FBQzVDLDRDQUE0QztBQUM1QyxtREFBbUQ7QUFDbkQscUNBQXFDO0FBQ3JDLHVDQUF1QztBQUN2QyxtQ0FBbUM7QUFDbkMsc0NBQXNDO0FBQ3RDLHVDQUF1QztBQUN2QyxxQ0FBcUM7QUFDckMsb0NBQW9DO0FBQ3BDLG9DQUFvQztBQUNwQyxtQ0FBbUM7QUFDbkMscUNBQXFDO0FBQ3JDLHFDQUFxQztBQUNyQywrQkFBK0I7QUFDL0Isb0NBQW9DO0FBQ3BDLCtCQUErQjtBQUMvQiw2QkFBNkI7QUFDN0Isb0NBQW9DO0FBQ3BDLGtDQUFrQztBQUNsQyxvQ0FBb0M7QUFDcEMsaUNBQWlDO0FBQ2pDLGtDQUFrQztBQUNsQyxxQ0FBcUM7QUFDckMscUNBQXFDO0FBQ3JDLGdDQUFnQzs7QUFFaEM7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkIsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQSxpQkFBaUI7QUFDakIsMkJBQTJCO0FBQzNCLGNBQWM7QUFDZCxvQkFBb0I7QUFDcEIscUJBQXFCOzs7Ozs7Ozs7OztBQzdZckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxjQUFjLG1CQUFPLENBQUMsMERBQVc7QUFDakMsZ0JBQWdCLG1CQUFPLENBQUMsa0RBQU87OztBQUcvQjtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFFBQVEsbUJBQU8sQ0FBQyxvREFBUTs7O0FBR3hCO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLFVBQVU7QUFDckI7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLFlBQVk7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBUyxlQUFlO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTSxpQkFBaUI7QUFDdkI7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7Ozs7Ozs7OztBQ3pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsT0FBTztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsT0FBTztBQUN2QztBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsZ0JBQWdCLHlGQUE4QjtBQUM5Qyw2QkFBNkIsbUdBQXdDO0FBQ3JFLFFBQVEsbUJBQU8sQ0FBQyw4Q0FBUTs7QUFFeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkIsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQixZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkIsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQjtBQUNBO0FBQ0Esc0NBQXNDLDJCQUEyQjtBQUNqRTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkIsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCLDRDQUE0QztBQUM1QyxzQ0FBc0M7QUFDdEMsMENBQTBDO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFlBQVksUUFBUTtBQUNwQjtBQUNBO0FBQ0EsMENBQTBDO0FBQzFDOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixZQUFZLFFBQVE7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsU0FBUztBQUM3QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsVUFBVTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQSxpQkFBaUI7QUFDakIsMkJBQTJCO0FBQzNCLGFBQWE7QUFDYixtQkFBbUI7QUFDbkIsaUJBQWlCO0FBQ2pCLHVCQUF1QjtBQUN2QixxQkFBcUI7QUFDckIsa0JBQWtCO0FBQ2xCLG1CQUFtQjtBQUNuQixxQkFBcUI7QUFDckIsMEJBQTBCO0FBQzFCLGlDQUFpQztBQUNqQyxrQ0FBa0M7QUFDbEMseUJBQXlCO0FBQ3pCLHVCQUF1QjtBQUN2QiwyQkFBMkI7QUFDM0Isb0JBQW9CO0FBQ3BCLHVCQUF1QjtBQUN2QixzQkFBc0I7QUFDdEIsaUJBQWlCO0FBQ2pCLDhCQUE4Qjs7Ozs7Ozs7Ozs7QUMxYzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsY0FBYyxtQkFBTyxDQUFDLG9EQUFXO0FBQ2pDLGFBQWEsbUJBQU8sQ0FBQyxrREFBVTtBQUMvQixnQkFBZ0IsbUJBQU8sQ0FBQyw0Q0FBTzs7QUFFL0I7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUSxVQUFVO0FBQzdCLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCO0FBQ2pCLGlCQUFpQjtBQUNqQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsUUFBUSxtQkFBTyxDQUFDLDhDQUFROztBQUV4QjtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxVQUFVO0FBQ3JCLFdBQVcsVUFBVTtBQUNyQixZQUFZO0FBQ1o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUNBQXFDLGtCQUFrQjtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLFVBQVU7QUFDckIsWUFBWTtBQUNaO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtCQUFrQixTQUFTO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsU0FBUyxnQkFBZ0I7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsU0FBUyxPQUFPO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUEsZ0JBQWdCO0FBQ2hCLGlCQUFpQjs7Ozs7Ozs7Ozs7QUN0UGpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxPQUFPO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxPQUFPO0FBQ3ZDO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7Ozs7Ozs7Ozs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxnQkFBZ0IseUZBQThCO0FBQzlDLGNBQWMsbUJBQU8sQ0FBQyxvREFBVztBQUNqQyxhQUFhLG1CQUFPLENBQUMsa0RBQVU7QUFDL0I7QUFDQTtBQUNBLFFBQVEsbUJBQU8sQ0FBQyw4Q0FBUTs7QUFFeEI7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsWUFBWTtBQUNaLFFBQVEsUUFBUTtBQUNoQixRQUFRLFNBQVM7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CO0FBQ0E7QUFDQTtBQUNBLGNBQWMsaUNBQWlDO0FBQy9DO0FBQ0E7QUFDQSwyQ0FBMkM7O0FBRTNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7O0FDbE5BLGVBQWUsbUJBQU8sQ0FBQyx5Q0FBYztBQUNyQyxrQkFBa0IsbUJBQU8sQ0FBQywrQ0FBaUI7QUFDM0MsZUFBZSxtQkFBTyxDQUFDLHlDQUFjO0FBQ3JDLGFBQWEsbUJBQU8sQ0FBQyxxQ0FBWTs7QUFFakMsc0JBQXNCO0FBQ3RCLGdCQUFnQjtBQUNoQixjQUFjO0FBQ2QsY0FBYztBQUNkLGlCQUFpQjtBQUNqQixjQUFjO0FBQ2QsZ0JBQWdCO0FBQ2hCLGdCQUFnQjtBQUNoQjtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBOzs7Ozs7Ozs7OztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsTUFBTTtBQUNqQixZQUFZLGdCQUFnQjtBQUM1QjtBQUNBO0FBQ0Esc0NBQXNDO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQixXQUFXLE1BQU07QUFDakIsWUFBWSxTQUFTO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixJQUFJLEdBQUcsT0FBTyxVQUFVLFFBQVE7QUFDekQ7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFlBQVksTUFBTTtBQUNsQjtBQUNBO0FBQ0EseUJBQXlCLElBQUksSUFBSSxRQUFRLFVBQVUsMEJBQTBCO0FBQzdFO0FBQ0E7QUFDQTtBQUNBLFlBQVksTUFBTTtBQUNsQjtBQUNBO0FBQ0EsMkNBQTJDO0FBQzNDLG9CQUFvQixpQkFBaUI7QUFDckM7QUFDQTtBQUNBLDJCQUEyQixRQUFRLFVBQVUsMEJBQTBCO0FBQ3ZFOztBQUVBOzs7Ozs7Ozs7OztBQ3REQSxZQUFZLG1CQUFPLENBQUMsNENBQUs7QUFDekI7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFlBQVksUUFBUTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLHdCQUF3QixvQkFBb0I7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBOzs7Ozs7Ozs7OztBQzFEQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsR0FBRztBQUNsQixlQUFlLGVBQWU7QUFDOUIsZ0JBQWdCLFFBQVE7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxHQUFHO0FBQ2xCLGdCQUFnQixlQUFlO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsR0FBRztBQUNsQixnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxHQUFHO0FBQ2xCLGdCQUFnQixRQUFRO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjs7QUFFQTtBQUNBO0FBQ0EsZ0JBQWdCLFFBQVE7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7O0FDL0VBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsWUFBWSxTQUFTO0FBQ3JCO0FBQ0E7QUFDQSwwQkFBMEIsRUFBRTtBQUM1Qjs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFlBQVksU0FBUztBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFlBQVksZ0JBQWdCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLHNCQUFzQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7OztVQ25FQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7O1VFdEJBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vanNiLXV0aWwvLi9ub2RlX21vZHVsZXMvY3NzZmlsdGVyL2xpYi9jc3MuanMiLCJ3ZWJwYWNrOi8vanNiLXV0aWwvLi9ub2RlX21vZHVsZXMvY3NzZmlsdGVyL2xpYi9kZWZhdWx0LmpzIiwid2VicGFjazovL2pzYi11dGlsLy4vbm9kZV9tb2R1bGVzL2Nzc2ZpbHRlci9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vanNiLXV0aWwvLi9ub2RlX21vZHVsZXMvY3NzZmlsdGVyL2xpYi9wYXJzZXIuanMiLCJ3ZWJwYWNrOi8vanNiLXV0aWwvLi9ub2RlX21vZHVsZXMvY3NzZmlsdGVyL2xpYi91dGlsLmpzIiwid2VicGFjazovL2pzYi11dGlsLy4vbm9kZV9tb2R1bGVzL3hzcy9saWIvZGVmYXVsdC5qcyIsIndlYnBhY2s6Ly9qc2ItdXRpbC8uL25vZGVfbW9kdWxlcy94c3MvbGliL2luZGV4LmpzIiwid2VicGFjazovL2pzYi11dGlsLy4vbm9kZV9tb2R1bGVzL3hzcy9saWIvcGFyc2VyLmpzIiwid2VicGFjazovL2pzYi11dGlsLy4vbm9kZV9tb2R1bGVzL3hzcy9saWIvdXRpbC5qcyIsIndlYnBhY2s6Ly9qc2ItdXRpbC8uL25vZGVfbW9kdWxlcy94c3MvbGliL3hzcy5qcyIsIndlYnBhY2s6Ly9qc2ItdXRpbC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9qc2ItdXRpbC8uL3NyYy9saWIvY29va2llLmpzIiwid2VicGFjazovL2pzYi11dGlsLy4vc3JjL2xpYi9mb3JtYXRYc3MuanMiLCJ3ZWJwYWNrOi8vanNiLXV0aWwvLi9zcmMvbGliL21lbW9yeS5qcyIsIndlYnBhY2s6Ly9qc2ItdXRpbC8uL3NyYy9saWIvdXRpbC5qcyIsIndlYnBhY2s6Ly9qc2ItdXRpbC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9qc2ItdXRpbC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2pzYi11dGlsL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9qc2ItdXRpbC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBjc3NmaWx0ZXJcbiAqXG4gKiBAYXV0aG9yIOiAgembtzxsZWl6b25nbWluQGdtYWlsLmNvbT5cbiAqL1xuXG52YXIgREVGQVVMVCA9IHJlcXVpcmUoJy4vZGVmYXVsdCcpO1xudmFyIHBhcnNlU3R5bGUgPSByZXF1aXJlKCcuL3BhcnNlcicpO1xudmFyIF8gPSByZXF1aXJlKCcuL3V0aWwnKTtcblxuXG4vKipcbiAqIOi/lOWbnuWAvOaYr+WQpuS4uuepulxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGlzTnVsbCAob2JqKSB7XG4gIHJldHVybiAob2JqID09PSB1bmRlZmluZWQgfHwgb2JqID09PSBudWxsKTtcbn1cblxuLyoqXG4gKiDmtYXmi7fotJ3lr7nosaFcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKi9cbmZ1bmN0aW9uIHNoYWxsb3dDb3B5T2JqZWN0IChvYmopIHtcbiAgdmFyIHJldCA9IHt9O1xuICBmb3IgKHZhciBpIGluIG9iaikge1xuICAgIHJldFtpXSA9IG9ialtpXTtcbiAgfVxuICByZXR1cm4gcmV0O1xufVxuXG4vKipcbiAqIOWIm+W7ukNTU+i/h+a7pOWZqFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKiAgIC0ge09iamVjdH0gd2hpdGVMaXN0XG4gKiAgIC0ge0Z1bmN0aW9ufSBvbkF0dHJcbiAqICAgLSB7RnVuY3Rpb259IG9uSWdub3JlQXR0clxuICogICAtIHtGdW5jdGlvbn0gc2FmZUF0dHJWYWx1ZVxuICovXG5mdW5jdGlvbiBGaWx0ZXJDU1MgKG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IHNoYWxsb3dDb3B5T2JqZWN0KG9wdGlvbnMgfHwge30pO1xuICBvcHRpb25zLndoaXRlTGlzdCA9IG9wdGlvbnMud2hpdGVMaXN0IHx8IERFRkFVTFQud2hpdGVMaXN0O1xuICBvcHRpb25zLm9uQXR0ciA9IG9wdGlvbnMub25BdHRyIHx8IERFRkFVTFQub25BdHRyO1xuICBvcHRpb25zLm9uSWdub3JlQXR0ciA9IG9wdGlvbnMub25JZ25vcmVBdHRyIHx8IERFRkFVTFQub25JZ25vcmVBdHRyO1xuICBvcHRpb25zLnNhZmVBdHRyVmFsdWUgPSBvcHRpb25zLnNhZmVBdHRyVmFsdWUgfHwgREVGQVVMVC5zYWZlQXR0clZhbHVlO1xuICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xufVxuXG5GaWx0ZXJDU1MucHJvdG90eXBlLnByb2Nlc3MgPSBmdW5jdGlvbiAoY3NzKSB7XG4gIC8vIOWFvOWuueWQhOenjeWlh+iRqei+k+WFpVxuICBjc3MgPSBjc3MgfHwgJyc7XG4gIGNzcyA9IGNzcy50b1N0cmluZygpO1xuICBpZiAoIWNzcykgcmV0dXJuICcnO1xuXG4gIHZhciBtZSA9IHRoaXM7XG4gIHZhciBvcHRpb25zID0gbWUub3B0aW9ucztcbiAgdmFyIHdoaXRlTGlzdCA9IG9wdGlvbnMud2hpdGVMaXN0O1xuICB2YXIgb25BdHRyID0gb3B0aW9ucy5vbkF0dHI7XG4gIHZhciBvbklnbm9yZUF0dHIgPSBvcHRpb25zLm9uSWdub3JlQXR0cjtcbiAgdmFyIHNhZmVBdHRyVmFsdWUgPSBvcHRpb25zLnNhZmVBdHRyVmFsdWU7XG5cbiAgdmFyIHJldENTUyA9IHBhcnNlU3R5bGUoY3NzLCBmdW5jdGlvbiAoc291cmNlUG9zaXRpb24sIHBvc2l0aW9uLCBuYW1lLCB2YWx1ZSwgc291cmNlKSB7XG5cbiAgICB2YXIgY2hlY2sgPSB3aGl0ZUxpc3RbbmFtZV07XG4gICAgdmFyIGlzV2hpdGUgPSBmYWxzZTtcbiAgICBpZiAoY2hlY2sgPT09IHRydWUpIGlzV2hpdGUgPSBjaGVjaztcbiAgICBlbHNlIGlmICh0eXBlb2YgY2hlY2sgPT09ICdmdW5jdGlvbicpIGlzV2hpdGUgPSBjaGVjayh2YWx1ZSk7XG4gICAgZWxzZSBpZiAoY2hlY2sgaW5zdGFuY2VvZiBSZWdFeHApIGlzV2hpdGUgPSBjaGVjay50ZXN0KHZhbHVlKTtcbiAgICBpZiAoaXNXaGl0ZSAhPT0gdHJ1ZSkgaXNXaGl0ZSA9IGZhbHNlO1xuXG4gICAgLy8g5aaC5p6c6L+H5ruk5ZCOIHZhbHVlIOS4uuepuuWImeebtOaOpeW/veeVpVxuICAgIHZhbHVlID0gc2FmZUF0dHJWYWx1ZShuYW1lLCB2YWx1ZSk7XG4gICAgaWYgKCF2YWx1ZSkgcmV0dXJuO1xuXG4gICAgdmFyIG9wdHMgPSB7XG4gICAgICBwb3NpdGlvbjogcG9zaXRpb24sXG4gICAgICBzb3VyY2VQb3NpdGlvbjogc291cmNlUG9zaXRpb24sXG4gICAgICBzb3VyY2U6IHNvdXJjZSxcbiAgICAgIGlzV2hpdGU6IGlzV2hpdGVcbiAgICB9O1xuXG4gICAgaWYgKGlzV2hpdGUpIHtcblxuICAgICAgdmFyIHJldCA9IG9uQXR0cihuYW1lLCB2YWx1ZSwgb3B0cyk7XG4gICAgICBpZiAoaXNOdWxsKHJldCkpIHtcbiAgICAgICAgcmV0dXJuIG5hbWUgKyAnOicgKyB2YWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICB2YXIgcmV0ID0gb25JZ25vcmVBdHRyKG5hbWUsIHZhbHVlLCBvcHRzKTtcbiAgICAgIGlmICghaXNOdWxsKHJldCkpIHtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgIH1cblxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHJldENTUztcbn07XG5cblxubW9kdWxlLmV4cG9ydHMgPSBGaWx0ZXJDU1M7XG4iLCIvKipcbiAqIGNzc2ZpbHRlclxuICpcbiAqIEBhdXRob3Ig6ICB6Zu3PGxlaXpvbmdtaW5AZ21haWwuY29tPlxuICovXG5cbmZ1bmN0aW9uIGdldERlZmF1bHRXaGl0ZUxpc3QgKCkge1xuICAvLyDnmb3lkI3ljZXlgLzor7TmmI7vvJpcbiAgLy8gdHJ1ZTog5YWB6K646K+l5bGe5oCnXG4gIC8vIEZ1bmN0aW9uOiBmdW5jdGlvbiAodmFsKSB7IH0g6L+U5ZuedHJ1ZeihqOekuuWFgeiuuOivpeWxnuaAp++8jOWFtuS7luWAvOWdh+ihqOekuuS4jeWFgeiuuFxuICAvLyBSZWdFeHA6IHJlZ2V4cC50ZXN0KHZhbCkg6L+U5ZuedHJ1ZeihqOekuuWFgeiuuOivpeWxnuaAp++8jOWFtuS7luWAvOWdh+ihqOekuuS4jeWFgeiuuFxuICAvLyDpmaTkuIrpnaLliJflh7rnmoTlgLzlpJblnYfooajnpLrkuI3lhYHorrhcbiAgdmFyIHdoaXRlTGlzdCA9IHt9O1xuXG4gIHdoaXRlTGlzdFsnYWxpZ24tY29udGVudCddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGF1dG9cbiAgd2hpdGVMaXN0WydhbGlnbi1pdGVtcyddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGF1dG9cbiAgd2hpdGVMaXN0WydhbGlnbi1zZWxmJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogYXV0b1xuICB3aGl0ZUxpc3RbJ2FsaWdubWVudC1hZGp1c3QnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBhdXRvXG4gIHdoaXRlTGlzdFsnYWxpZ25tZW50LWJhc2VsaW5lJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogYmFzZWxpbmVcbiAgd2hpdGVMaXN0WydhbGwnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBkZXBlbmRpbmcgb24gaW5kaXZpZHVhbCBwcm9wZXJ0aWVzXG4gIHdoaXRlTGlzdFsnYW5jaG9yLXBvaW50J10gPSBmYWxzZTsgLy8gZGVmYXVsdDogbm9uZVxuICB3aGl0ZUxpc3RbJ2FuaW1hdGlvbiddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGRlcGVuZGluZyBvbiBpbmRpdmlkdWFsIHByb3BlcnRpZXNcbiAgd2hpdGVMaXN0WydhbmltYXRpb24tZGVsYXknXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiAwXG4gIHdoaXRlTGlzdFsnYW5pbWF0aW9uLWRpcmVjdGlvbiddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IG5vcm1hbFxuICB3aGl0ZUxpc3RbJ2FuaW1hdGlvbi1kdXJhdGlvbiddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IDBcbiAgd2hpdGVMaXN0WydhbmltYXRpb24tZmlsbC1tb2RlJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogbm9uZVxuICB3aGl0ZUxpc3RbJ2FuaW1hdGlvbi1pdGVyYXRpb24tY291bnQnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiAxXG4gIHdoaXRlTGlzdFsnYW5pbWF0aW9uLW5hbWUnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBub25lXG4gIHdoaXRlTGlzdFsnYW5pbWF0aW9uLXBsYXktc3RhdGUnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBydW5uaW5nXG4gIHdoaXRlTGlzdFsnYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbiddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGVhc2VcbiAgd2hpdGVMaXN0WydhemltdXRoJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogY2VudGVyXG4gIHdoaXRlTGlzdFsnYmFja2ZhY2UtdmlzaWJpbGl0eSddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IHZpc2libGVcbiAgd2hpdGVMaXN0WydiYWNrZ3JvdW5kJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiBkZXBlbmRpbmcgb24gaW5kaXZpZHVhbCBwcm9wZXJ0aWVzXG4gIHdoaXRlTGlzdFsnYmFja2dyb3VuZC1hdHRhY2htZW50J10gPSB0cnVlOyAvLyBkZWZhdWx0OiBzY3JvbGxcbiAgd2hpdGVMaXN0WydiYWNrZ3JvdW5kLWNsaXAnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IGJvcmRlci1ib3hcbiAgd2hpdGVMaXN0WydiYWNrZ3JvdW5kLWNvbG9yJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiB0cmFuc3BhcmVudFxuICB3aGl0ZUxpc3RbJ2JhY2tncm91bmQtaW1hZ2UnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IG5vbmVcbiAgd2hpdGVMaXN0WydiYWNrZ3JvdW5kLW9yaWdpbiddID0gdHJ1ZTsgLy8gZGVmYXVsdDogcGFkZGluZy1ib3hcbiAgd2hpdGVMaXN0WydiYWNrZ3JvdW5kLXBvc2l0aW9uJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiAwJSAwJVxuICB3aGl0ZUxpc3RbJ2JhY2tncm91bmQtcmVwZWF0J10gPSB0cnVlOyAvLyBkZWZhdWx0OiByZXBlYXRcbiAgd2hpdGVMaXN0WydiYWNrZ3JvdW5kLXNpemUnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IGF1dG9cbiAgd2hpdGVMaXN0WydiYXNlbGluZS1zaGlmdCddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGJhc2VsaW5lXG4gIHdoaXRlTGlzdFsnYmluZGluZyddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IG5vbmVcbiAgd2hpdGVMaXN0WydibGVlZCddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IDZwdFxuICB3aGl0ZUxpc3RbJ2Jvb2ttYXJrLWxhYmVsJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogY29udGVudCgpXG4gIHdoaXRlTGlzdFsnYm9va21hcmstbGV2ZWwnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBub25lXG4gIHdoaXRlTGlzdFsnYm9va21hcmstc3RhdGUnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBvcGVuXG4gIHdoaXRlTGlzdFsnYm9yZGVyJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiBkZXBlbmRpbmcgb24gaW5kaXZpZHVhbCBwcm9wZXJ0aWVzXG4gIHdoaXRlTGlzdFsnYm9yZGVyLWJvdHRvbSddID0gdHJ1ZTsgLy8gZGVmYXVsdDogZGVwZW5kaW5nIG9uIGluZGl2aWR1YWwgcHJvcGVydGllc1xuICB3aGl0ZUxpc3RbJ2JvcmRlci1ib3R0b20tY29sb3InXSA9IHRydWU7IC8vIGRlZmF1bHQ6IGN1cnJlbnQgY29sb3JcbiAgd2hpdGVMaXN0Wydib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiAwXG4gIHdoaXRlTGlzdFsnYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXMnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IDBcbiAgd2hpdGVMaXN0Wydib3JkZXItYm90dG9tLXN0eWxlJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiBub25lXG4gIHdoaXRlTGlzdFsnYm9yZGVyLWJvdHRvbS13aWR0aCddID0gdHJ1ZTsgLy8gZGVmYXVsdDogbWVkaXVtXG4gIHdoaXRlTGlzdFsnYm9yZGVyLWNvbGxhcHNlJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiBzZXBhcmF0ZVxuICB3aGl0ZUxpc3RbJ2JvcmRlci1jb2xvciddID0gdHJ1ZTsgLy8gZGVmYXVsdDogZGVwZW5kaW5nIG9uIGluZGl2aWR1YWwgcHJvcGVydGllc1xuICB3aGl0ZUxpc3RbJ2JvcmRlci1pbWFnZSddID0gdHJ1ZTsgLy8gZGVmYXVsdDogbm9uZVxuICB3aGl0ZUxpc3RbJ2JvcmRlci1pbWFnZS1vdXRzZXQnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IDBcbiAgd2hpdGVMaXN0Wydib3JkZXItaW1hZ2UtcmVwZWF0J10gPSB0cnVlOyAvLyBkZWZhdWx0OiBzdHJldGNoXG4gIHdoaXRlTGlzdFsnYm9yZGVyLWltYWdlLXNsaWNlJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiAxMDAlXG4gIHdoaXRlTGlzdFsnYm9yZGVyLWltYWdlLXNvdXJjZSddID0gdHJ1ZTsgLy8gZGVmYXVsdDogbm9uZVxuICB3aGl0ZUxpc3RbJ2JvcmRlci1pbWFnZS13aWR0aCddID0gdHJ1ZTsgLy8gZGVmYXVsdDogMVxuICB3aGl0ZUxpc3RbJ2JvcmRlci1sZWZ0J10gPSB0cnVlOyAvLyBkZWZhdWx0OiBkZXBlbmRpbmcgb24gaW5kaXZpZHVhbCBwcm9wZXJ0aWVzXG4gIHdoaXRlTGlzdFsnYm9yZGVyLWxlZnQtY29sb3InXSA9IHRydWU7IC8vIGRlZmF1bHQ6IGN1cnJlbnQgY29sb3JcbiAgd2hpdGVMaXN0Wydib3JkZXItbGVmdC1zdHlsZSddID0gdHJ1ZTsgLy8gZGVmYXVsdDogbm9uZVxuICB3aGl0ZUxpc3RbJ2JvcmRlci1sZWZ0LXdpZHRoJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiBtZWRpdW1cbiAgd2hpdGVMaXN0Wydib3JkZXItcmFkaXVzJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiAwXG4gIHdoaXRlTGlzdFsnYm9yZGVyLXJpZ2h0J10gPSB0cnVlOyAvLyBkZWZhdWx0OiBkZXBlbmRpbmcgb24gaW5kaXZpZHVhbCBwcm9wZXJ0aWVzXG4gIHdoaXRlTGlzdFsnYm9yZGVyLXJpZ2h0LWNvbG9yJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiBjdXJyZW50IGNvbG9yXG4gIHdoaXRlTGlzdFsnYm9yZGVyLXJpZ2h0LXN0eWxlJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiBub25lXG4gIHdoaXRlTGlzdFsnYm9yZGVyLXJpZ2h0LXdpZHRoJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiBtZWRpdW1cbiAgd2hpdGVMaXN0Wydib3JkZXItc3BhY2luZyddID0gdHJ1ZTsgLy8gZGVmYXVsdDogMFxuICB3aGl0ZUxpc3RbJ2JvcmRlci1zdHlsZSddID0gdHJ1ZTsgLy8gZGVmYXVsdDogZGVwZW5kaW5nIG9uIGluZGl2aWR1YWwgcHJvcGVydGllc1xuICB3aGl0ZUxpc3RbJ2JvcmRlci10b3AnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IGRlcGVuZGluZyBvbiBpbmRpdmlkdWFsIHByb3BlcnRpZXNcbiAgd2hpdGVMaXN0Wydib3JkZXItdG9wLWNvbG9yJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiBjdXJyZW50IGNvbG9yXG4gIHdoaXRlTGlzdFsnYm9yZGVyLXRvcC1sZWZ0LXJhZGl1cyddID0gdHJ1ZTsgLy8gZGVmYXVsdDogMFxuICB3aGl0ZUxpc3RbJ2JvcmRlci10b3AtcmlnaHQtcmFkaXVzJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiAwXG4gIHdoaXRlTGlzdFsnYm9yZGVyLXRvcC1zdHlsZSddID0gdHJ1ZTsgLy8gZGVmYXVsdDogbm9uZVxuICB3aGl0ZUxpc3RbJ2JvcmRlci10b3Atd2lkdGgnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IG1lZGl1bVxuICB3aGl0ZUxpc3RbJ2JvcmRlci13aWR0aCddID0gdHJ1ZTsgLy8gZGVmYXVsdDogZGVwZW5kaW5nIG9uIGluZGl2aWR1YWwgcHJvcGVydGllc1xuICB3aGl0ZUxpc3RbJ2JvdHRvbSddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGF1dG9cbiAgd2hpdGVMaXN0Wydib3gtZGVjb3JhdGlvbi1icmVhayddID0gdHJ1ZTsgLy8gZGVmYXVsdDogc2xpY2VcbiAgd2hpdGVMaXN0Wydib3gtc2hhZG93J10gPSB0cnVlOyAvLyBkZWZhdWx0OiBub25lXG4gIHdoaXRlTGlzdFsnYm94LXNpemluZyddID0gdHJ1ZTsgLy8gZGVmYXVsdDogY29udGVudC1ib3hcbiAgd2hpdGVMaXN0Wydib3gtc25hcCddID0gdHJ1ZTsgLy8gZGVmYXVsdDogbm9uZVxuICB3aGl0ZUxpc3RbJ2JveC1zdXBwcmVzcyddID0gdHJ1ZTsgLy8gZGVmYXVsdDogc2hvd1xuICB3aGl0ZUxpc3RbJ2JyZWFrLWFmdGVyJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiBhdXRvXG4gIHdoaXRlTGlzdFsnYnJlYWstYmVmb3JlJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiBhdXRvXG4gIHdoaXRlTGlzdFsnYnJlYWstaW5zaWRlJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiBhdXRvXG4gIHdoaXRlTGlzdFsnY2FwdGlvbi1zaWRlJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogdG9wXG4gIHdoaXRlTGlzdFsnY2hhaW5zJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogbm9uZVxuICB3aGl0ZUxpc3RbJ2NsZWFyJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiBub25lXG4gIHdoaXRlTGlzdFsnY2xpcCddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGF1dG9cbiAgd2hpdGVMaXN0WydjbGlwLXBhdGgnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBub25lXG4gIHdoaXRlTGlzdFsnY2xpcC1ydWxlJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogbm9uemVyb1xuICB3aGl0ZUxpc3RbJ2NvbG9yJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiBpbXBsZW1lbnRhdGlvbiBkZXBlbmRlbnRcbiAgd2hpdGVMaXN0Wydjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnMnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IGF1dG9cbiAgd2hpdGVMaXN0Wydjb2x1bW4tY291bnQnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBhdXRvXG4gIHdoaXRlTGlzdFsnY29sdW1uLWZpbGwnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBiYWxhbmNlXG4gIHdoaXRlTGlzdFsnY29sdW1uLWdhcCddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IG5vcm1hbFxuICB3aGl0ZUxpc3RbJ2NvbHVtbi1ydWxlJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogZGVwZW5kaW5nIG9uIGluZGl2aWR1YWwgcHJvcGVydGllc1xuICB3aGl0ZUxpc3RbJ2NvbHVtbi1ydWxlLWNvbG9yJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogY3VycmVudCBjb2xvclxuICB3aGl0ZUxpc3RbJ2NvbHVtbi1ydWxlLXN0eWxlJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogbWVkaXVtXG4gIHdoaXRlTGlzdFsnY29sdW1uLXJ1bGUtd2lkdGgnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBtZWRpdW1cbiAgd2hpdGVMaXN0Wydjb2x1bW4tc3BhbiddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IG5vbmVcbiAgd2hpdGVMaXN0Wydjb2x1bW4td2lkdGgnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBhdXRvXG4gIHdoaXRlTGlzdFsnY29sdW1ucyddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGRlcGVuZGluZyBvbiBpbmRpdmlkdWFsIHByb3BlcnRpZXNcbiAgd2hpdGVMaXN0Wydjb250YWluJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogbm9uZVxuICB3aGl0ZUxpc3RbJ2NvbnRlbnQnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBub3JtYWxcbiAgd2hpdGVMaXN0Wydjb3VudGVyLWluY3JlbWVudCddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IG5vbmVcbiAgd2hpdGVMaXN0Wydjb3VudGVyLXJlc2V0J10gPSBmYWxzZTsgLy8gZGVmYXVsdDogbm9uZVxuICB3aGl0ZUxpc3RbJ2NvdW50ZXItc2V0J10gPSBmYWxzZTsgLy8gZGVmYXVsdDogbm9uZVxuICB3aGl0ZUxpc3RbJ2Nyb3AnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBhdXRvXG4gIHdoaXRlTGlzdFsnY3VlJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogZGVwZW5kaW5nIG9uIGluZGl2aWR1YWwgcHJvcGVydGllc1xuICB3aGl0ZUxpc3RbJ2N1ZS1hZnRlciddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IG5vbmVcbiAgd2hpdGVMaXN0WydjdWUtYmVmb3JlJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogbm9uZVxuICB3aGl0ZUxpc3RbJ2N1cnNvciddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGF1dG9cbiAgd2hpdGVMaXN0WydkaXJlY3Rpb24nXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBsdHJcbiAgd2hpdGVMaXN0WydkaXNwbGF5J10gPSB0cnVlOyAvLyBkZWZhdWx0OiBkZXBlbmRpbmcgb24gaW5kaXZpZHVhbCBwcm9wZXJ0aWVzXG4gIHdoaXRlTGlzdFsnZGlzcGxheS1pbnNpZGUnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IGF1dG9cbiAgd2hpdGVMaXN0WydkaXNwbGF5LWxpc3QnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IG5vbmVcbiAgd2hpdGVMaXN0WydkaXNwbGF5LW91dHNpZGUnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IGlubGluZS1sZXZlbFxuICB3aGl0ZUxpc3RbJ2RvbWluYW50LWJhc2VsaW5lJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogYXV0b1xuICB3aGl0ZUxpc3RbJ2VsZXZhdGlvbiddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGxldmVsXG4gIHdoaXRlTGlzdFsnZW1wdHktY2VsbHMnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBzaG93XG4gIHdoaXRlTGlzdFsnZmlsdGVyJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogbm9uZVxuICB3aGl0ZUxpc3RbJ2ZsZXgnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBkZXBlbmRpbmcgb24gaW5kaXZpZHVhbCBwcm9wZXJ0aWVzXG4gIHdoaXRlTGlzdFsnZmxleC1iYXNpcyddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGF1dG9cbiAgd2hpdGVMaXN0WydmbGV4LWRpcmVjdGlvbiddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IHJvd1xuICB3aGl0ZUxpc3RbJ2ZsZXgtZmxvdyddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGRlcGVuZGluZyBvbiBpbmRpdmlkdWFsIHByb3BlcnRpZXNcbiAgd2hpdGVMaXN0WydmbGV4LWdyb3cnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiAwXG4gIHdoaXRlTGlzdFsnZmxleC1zaHJpbmsnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiAxXG4gIHdoaXRlTGlzdFsnZmxleC13cmFwJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogbm93cmFwXG4gIHdoaXRlTGlzdFsnZmxvYXQnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBub25lXG4gIHdoaXRlTGlzdFsnZmxvYXQtb2Zmc2V0J10gPSBmYWxzZTsgLy8gZGVmYXVsdDogMCAwXG4gIHdoaXRlTGlzdFsnZmxvb2QtY29sb3InXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBibGFja1xuICB3aGl0ZUxpc3RbJ2Zsb29kLW9wYWNpdHknXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiAxXG4gIHdoaXRlTGlzdFsnZmxvdy1mcm9tJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogbm9uZVxuICB3aGl0ZUxpc3RbJ2Zsb3ctaW50byddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IG5vbmVcbiAgd2hpdGVMaXN0Wydmb250J10gPSB0cnVlOyAvLyBkZWZhdWx0OiBkZXBlbmRpbmcgb24gaW5kaXZpZHVhbCBwcm9wZXJ0aWVzXG4gIHdoaXRlTGlzdFsnZm9udC1mYW1pbHknXSA9IHRydWU7IC8vIGRlZmF1bHQ6IGltcGxlbWVudGF0aW9uIGRlcGVuZGVudFxuICB3aGl0ZUxpc3RbJ2ZvbnQtZmVhdHVyZS1zZXR0aW5ncyddID0gdHJ1ZTsgLy8gZGVmYXVsdDogbm9ybWFsXG4gIHdoaXRlTGlzdFsnZm9udC1rZXJuaW5nJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiBhdXRvXG4gIHdoaXRlTGlzdFsnZm9udC1sYW5ndWFnZS1vdmVycmlkZSddID0gdHJ1ZTsgLy8gZGVmYXVsdDogbm9ybWFsXG4gIHdoaXRlTGlzdFsnZm9udC1zaXplJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiBtZWRpdW1cbiAgd2hpdGVMaXN0Wydmb250LXNpemUtYWRqdXN0J10gPSB0cnVlOyAvLyBkZWZhdWx0OiBub25lXG4gIHdoaXRlTGlzdFsnZm9udC1zdHJldGNoJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiBub3JtYWxcbiAgd2hpdGVMaXN0Wydmb250LXN0eWxlJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiBub3JtYWxcbiAgd2hpdGVMaXN0Wydmb250LXN5bnRoZXNpcyddID0gdHJ1ZTsgLy8gZGVmYXVsdDogd2VpZ2h0IHN0eWxlXG4gIHdoaXRlTGlzdFsnZm9udC12YXJpYW50J10gPSB0cnVlOyAvLyBkZWZhdWx0OiBub3JtYWxcbiAgd2hpdGVMaXN0Wydmb250LXZhcmlhbnQtYWx0ZXJuYXRlcyddID0gdHJ1ZTsgLy8gZGVmYXVsdDogbm9ybWFsXG4gIHdoaXRlTGlzdFsnZm9udC12YXJpYW50LWNhcHMnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IG5vcm1hbFxuICB3aGl0ZUxpc3RbJ2ZvbnQtdmFyaWFudC1lYXN0LWFzaWFuJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiBub3JtYWxcbiAgd2hpdGVMaXN0Wydmb250LXZhcmlhbnQtbGlnYXR1cmVzJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiBub3JtYWxcbiAgd2hpdGVMaXN0Wydmb250LXZhcmlhbnQtbnVtZXJpYyddID0gdHJ1ZTsgLy8gZGVmYXVsdDogbm9ybWFsXG4gIHdoaXRlTGlzdFsnZm9udC12YXJpYW50LXBvc2l0aW9uJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiBub3JtYWxcbiAgd2hpdGVMaXN0Wydmb250LXdlaWdodCddID0gdHJ1ZTsgLy8gZGVmYXVsdDogbm9ybWFsXG4gIHdoaXRlTGlzdFsnZ3JpZCddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGRlcGVuZGluZyBvbiBpbmRpdmlkdWFsIHByb3BlcnRpZXNcbiAgd2hpdGVMaXN0WydncmlkLWFyZWEnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBkZXBlbmRpbmcgb24gaW5kaXZpZHVhbCBwcm9wZXJ0aWVzXG4gIHdoaXRlTGlzdFsnZ3JpZC1hdXRvLWNvbHVtbnMnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBhdXRvXG4gIHdoaXRlTGlzdFsnZ3JpZC1hdXRvLWZsb3cnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBub25lXG4gIHdoaXRlTGlzdFsnZ3JpZC1hdXRvLXJvd3MnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBhdXRvXG4gIHdoaXRlTGlzdFsnZ3JpZC1jb2x1bW4nXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBkZXBlbmRpbmcgb24gaW5kaXZpZHVhbCBwcm9wZXJ0aWVzXG4gIHdoaXRlTGlzdFsnZ3JpZC1jb2x1bW4tZW5kJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogYXV0b1xuICB3aGl0ZUxpc3RbJ2dyaWQtY29sdW1uLXN0YXJ0J10gPSBmYWxzZTsgLy8gZGVmYXVsdDogYXV0b1xuICB3aGl0ZUxpc3RbJ2dyaWQtcm93J10gPSBmYWxzZTsgLy8gZGVmYXVsdDogZGVwZW5kaW5nIG9uIGluZGl2aWR1YWwgcHJvcGVydGllc1xuICB3aGl0ZUxpc3RbJ2dyaWQtcm93LWVuZCddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGF1dG9cbiAgd2hpdGVMaXN0WydncmlkLXJvdy1zdGFydCddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGF1dG9cbiAgd2hpdGVMaXN0WydncmlkLXRlbXBsYXRlJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogZGVwZW5kaW5nIG9uIGluZGl2aWR1YWwgcHJvcGVydGllc1xuICB3aGl0ZUxpc3RbJ2dyaWQtdGVtcGxhdGUtYXJlYXMnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBub25lXG4gIHdoaXRlTGlzdFsnZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogbm9uZVxuICB3aGl0ZUxpc3RbJ2dyaWQtdGVtcGxhdGUtcm93cyddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IG5vbmVcbiAgd2hpdGVMaXN0WydoYW5naW5nLXB1bmN0dWF0aW9uJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogbm9uZVxuICB3aGl0ZUxpc3RbJ2hlaWdodCddID0gdHJ1ZTsgLy8gZGVmYXVsdDogYXV0b1xuICB3aGl0ZUxpc3RbJ2h5cGhlbnMnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBtYW51YWxcbiAgd2hpdGVMaXN0WydpY29uJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogYXV0b1xuICB3aGl0ZUxpc3RbJ2ltYWdlLW9yaWVudGF0aW9uJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogYXV0b1xuICB3aGl0ZUxpc3RbJ2ltYWdlLXJlc29sdXRpb24nXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBub3JtYWxcbiAgd2hpdGVMaXN0WydpbWUtbW9kZSddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGF1dG9cbiAgd2hpdGVMaXN0Wydpbml0aWFsLWxldHRlcnMnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBub3JtYWxcbiAgd2hpdGVMaXN0WydpbmxpbmUtYm94LWFsaWduJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogbGFzdFxuICB3aGl0ZUxpc3RbJ2p1c3RpZnktY29udGVudCddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGF1dG9cbiAgd2hpdGVMaXN0WydqdXN0aWZ5LWl0ZW1zJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogYXV0b1xuICB3aGl0ZUxpc3RbJ2p1c3RpZnktc2VsZiddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGF1dG9cbiAgd2hpdGVMaXN0WydsZWZ0J10gPSBmYWxzZTsgLy8gZGVmYXVsdDogYXV0b1xuICB3aGl0ZUxpc3RbJ2xldHRlci1zcGFjaW5nJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiBub3JtYWxcbiAgd2hpdGVMaXN0WydsaWdodGluZy1jb2xvciddID0gdHJ1ZTsgLy8gZGVmYXVsdDogd2hpdGVcbiAgd2hpdGVMaXN0WydsaW5lLWJveC1jb250YWluJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogYmxvY2sgaW5saW5lIHJlcGxhY2VkXG4gIHdoaXRlTGlzdFsnbGluZS1icmVhayddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGF1dG9cbiAgd2hpdGVMaXN0WydsaW5lLWdyaWQnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBtYXRjaC1wYXJlbnRcbiAgd2hpdGVMaXN0WydsaW5lLWhlaWdodCddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IG5vcm1hbFxuICB3aGl0ZUxpc3RbJ2xpbmUtc25hcCddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IG5vbmVcbiAgd2hpdGVMaXN0WydsaW5lLXN0YWNraW5nJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogZGVwZW5kaW5nIG9uIGluZGl2aWR1YWwgcHJvcGVydGllc1xuICB3aGl0ZUxpc3RbJ2xpbmUtc3RhY2tpbmctcnVieSddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGV4Y2x1ZGUtcnVieVxuICB3aGl0ZUxpc3RbJ2xpbmUtc3RhY2tpbmctc2hpZnQnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBjb25zaWRlci1zaGlmdHNcbiAgd2hpdGVMaXN0WydsaW5lLXN0YWNraW5nLXN0cmF0ZWd5J10gPSBmYWxzZTsgLy8gZGVmYXVsdDogaW5saW5lLWxpbmUtaGVpZ2h0XG4gIHdoaXRlTGlzdFsnbGlzdC1zdHlsZSddID0gdHJ1ZTsgLy8gZGVmYXVsdDogZGVwZW5kaW5nIG9uIGluZGl2aWR1YWwgcHJvcGVydGllc1xuICB3aGl0ZUxpc3RbJ2xpc3Qtc3R5bGUtaW1hZ2UnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IG5vbmVcbiAgd2hpdGVMaXN0WydsaXN0LXN0eWxlLXBvc2l0aW9uJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiBvdXRzaWRlXG4gIHdoaXRlTGlzdFsnbGlzdC1zdHlsZS10eXBlJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiBkaXNjXG4gIHdoaXRlTGlzdFsnbWFyZ2luJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiBkZXBlbmRpbmcgb24gaW5kaXZpZHVhbCBwcm9wZXJ0aWVzXG4gIHdoaXRlTGlzdFsnbWFyZ2luLWJvdHRvbSddID0gdHJ1ZTsgLy8gZGVmYXVsdDogMFxuICB3aGl0ZUxpc3RbJ21hcmdpbi1sZWZ0J10gPSB0cnVlOyAvLyBkZWZhdWx0OiAwXG4gIHdoaXRlTGlzdFsnbWFyZ2luLXJpZ2h0J10gPSB0cnVlOyAvLyBkZWZhdWx0OiAwXG4gIHdoaXRlTGlzdFsnbWFyZ2luLXRvcCddID0gdHJ1ZTsgLy8gZGVmYXVsdDogMFxuICB3aGl0ZUxpc3RbJ21hcmtlci1vZmZzZXQnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBhdXRvXG4gIHdoaXRlTGlzdFsnbWFya2VyLXNpZGUnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBsaXN0LWl0ZW1cbiAgd2hpdGVMaXN0WydtYXJrcyddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IG5vbmVcbiAgd2hpdGVMaXN0WydtYXNrJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogYm9yZGVyLWJveFxuICB3aGl0ZUxpc3RbJ21hc2stYm94J10gPSBmYWxzZTsgLy8gZGVmYXVsdDogc2VlIGluZGl2aWR1YWwgcHJvcGVydGllc1xuICB3aGl0ZUxpc3RbJ21hc2stYm94LW91dHNldCddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IDBcbiAgd2hpdGVMaXN0WydtYXNrLWJveC1yZXBlYXQnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBzdHJldGNoXG4gIHdoaXRlTGlzdFsnbWFzay1ib3gtc2xpY2UnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiAwIGZpbGxcbiAgd2hpdGVMaXN0WydtYXNrLWJveC1zb3VyY2UnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBub25lXG4gIHdoaXRlTGlzdFsnbWFzay1ib3gtd2lkdGgnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBhdXRvXG4gIHdoaXRlTGlzdFsnbWFzay1jbGlwJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogYm9yZGVyLWJveFxuICB3aGl0ZUxpc3RbJ21hc2staW1hZ2UnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBub25lXG4gIHdoaXRlTGlzdFsnbWFzay1vcmlnaW4nXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBib3JkZXItYm94XG4gIHdoaXRlTGlzdFsnbWFzay1wb3NpdGlvbiddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGNlbnRlclxuICB3aGl0ZUxpc3RbJ21hc2stcmVwZWF0J10gPSBmYWxzZTsgLy8gZGVmYXVsdDogbm8tcmVwZWF0XG4gIHdoaXRlTGlzdFsnbWFzay1zaXplJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogYm9yZGVyLWJveFxuICB3aGl0ZUxpc3RbJ21hc2stc291cmNlLXR5cGUnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBhdXRvXG4gIHdoaXRlTGlzdFsnbWFzay10eXBlJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogbHVtaW5hbmNlXG4gIHdoaXRlTGlzdFsnbWF4LWhlaWdodCddID0gdHJ1ZTsgLy8gZGVmYXVsdDogbm9uZVxuICB3aGl0ZUxpc3RbJ21heC1saW5lcyddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IG5vbmVcbiAgd2hpdGVMaXN0WydtYXgtd2lkdGgnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IG5vbmVcbiAgd2hpdGVMaXN0WydtaW4taGVpZ2h0J10gPSB0cnVlOyAvLyBkZWZhdWx0OiAwXG4gIHdoaXRlTGlzdFsnbWluLXdpZHRoJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiAwXG4gIHdoaXRlTGlzdFsnbW92ZS10byddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IG5vcm1hbFxuICB3aGl0ZUxpc3RbJ25hdi1kb3duJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogYXV0b1xuICB3aGl0ZUxpc3RbJ25hdi1pbmRleCddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGF1dG9cbiAgd2hpdGVMaXN0WyduYXYtbGVmdCddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGF1dG9cbiAgd2hpdGVMaXN0WyduYXYtcmlnaHQnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBhdXRvXG4gIHdoaXRlTGlzdFsnbmF2LXVwJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogYXV0b1xuICB3aGl0ZUxpc3RbJ29iamVjdC1maXQnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBmaWxsXG4gIHdoaXRlTGlzdFsnb2JqZWN0LXBvc2l0aW9uJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogNTAlIDUwJVxuICB3aGl0ZUxpc3RbJ29wYWNpdHknXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiAxXG4gIHdoaXRlTGlzdFsnb3JkZXInXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiAwXG4gIHdoaXRlTGlzdFsnb3JwaGFucyddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IDJcbiAgd2hpdGVMaXN0WydvdXRsaW5lJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogZGVwZW5kaW5nIG9uIGluZGl2aWR1YWwgcHJvcGVydGllc1xuICB3aGl0ZUxpc3RbJ291dGxpbmUtY29sb3InXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBpbnZlcnRcbiAgd2hpdGVMaXN0WydvdXRsaW5lLW9mZnNldCddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IDBcbiAgd2hpdGVMaXN0WydvdXRsaW5lLXN0eWxlJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogbm9uZVxuICB3aGl0ZUxpc3RbJ291dGxpbmUtd2lkdGgnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBtZWRpdW1cbiAgd2hpdGVMaXN0WydvdmVyZmxvdyddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGRlcGVuZGluZyBvbiBpbmRpdmlkdWFsIHByb3BlcnRpZXNcbiAgd2hpdGVMaXN0WydvdmVyZmxvdy13cmFwJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogbm9ybWFsXG4gIHdoaXRlTGlzdFsnb3ZlcmZsb3cteCddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IHZpc2libGVcbiAgd2hpdGVMaXN0WydvdmVyZmxvdy15J10gPSBmYWxzZTsgLy8gZGVmYXVsdDogdmlzaWJsZVxuICB3aGl0ZUxpc3RbJ3BhZGRpbmcnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IGRlcGVuZGluZyBvbiBpbmRpdmlkdWFsIHByb3BlcnRpZXNcbiAgd2hpdGVMaXN0WydwYWRkaW5nLWJvdHRvbSddID0gdHJ1ZTsgLy8gZGVmYXVsdDogMFxuICB3aGl0ZUxpc3RbJ3BhZGRpbmctbGVmdCddID0gdHJ1ZTsgLy8gZGVmYXVsdDogMFxuICB3aGl0ZUxpc3RbJ3BhZGRpbmctcmlnaHQnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IDBcbiAgd2hpdGVMaXN0WydwYWRkaW5nLXRvcCddID0gdHJ1ZTsgLy8gZGVmYXVsdDogMFxuICB3aGl0ZUxpc3RbJ3BhZ2UnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBhdXRvXG4gIHdoaXRlTGlzdFsncGFnZS1icmVhay1hZnRlciddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGF1dG9cbiAgd2hpdGVMaXN0WydwYWdlLWJyZWFrLWJlZm9yZSddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGF1dG9cbiAgd2hpdGVMaXN0WydwYWdlLWJyZWFrLWluc2lkZSddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGF1dG9cbiAgd2hpdGVMaXN0WydwYWdlLXBvbGljeSddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IHN0YXJ0XG4gIHdoaXRlTGlzdFsncGF1c2UnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBpbXBsZW1lbnRhdGlvbiBkZXBlbmRlbnRcbiAgd2hpdGVMaXN0WydwYXVzZS1hZnRlciddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGltcGxlbWVudGF0aW9uIGRlcGVuZGVudFxuICB3aGl0ZUxpc3RbJ3BhdXNlLWJlZm9yZSddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGltcGxlbWVudGF0aW9uIGRlcGVuZGVudFxuICB3aGl0ZUxpc3RbJ3BlcnNwZWN0aXZlJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogbm9uZVxuICB3aGl0ZUxpc3RbJ3BlcnNwZWN0aXZlLW9yaWdpbiddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IDUwJSA1MCVcbiAgd2hpdGVMaXN0WydwaXRjaCddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IG1lZGl1bVxuICB3aGl0ZUxpc3RbJ3BpdGNoLXJhbmdlJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogNTBcbiAgd2hpdGVMaXN0WydwbGF5LWR1cmluZyddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGF1dG9cbiAgd2hpdGVMaXN0Wydwb3NpdGlvbiddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IHN0YXRpY1xuICB3aGl0ZUxpc3RbJ3ByZXNlbnRhdGlvbi1sZXZlbCddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IDBcbiAgd2hpdGVMaXN0WydxdW90ZXMnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiB0ZXh0XG4gIHdoaXRlTGlzdFsncmVnaW9uLWZyYWdtZW50J10gPSBmYWxzZTsgLy8gZGVmYXVsdDogYXV0b1xuICB3aGl0ZUxpc3RbJ3Jlc2l6ZSddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IG5vbmVcbiAgd2hpdGVMaXN0WydyZXN0J10gPSBmYWxzZTsgLy8gZGVmYXVsdDogZGVwZW5kaW5nIG9uIGluZGl2aWR1YWwgcHJvcGVydGllc1xuICB3aGl0ZUxpc3RbJ3Jlc3QtYWZ0ZXInXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBub25lXG4gIHdoaXRlTGlzdFsncmVzdC1iZWZvcmUnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBub25lXG4gIHdoaXRlTGlzdFsncmljaG5lc3MnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiA1MFxuICB3aGl0ZUxpc3RbJ3JpZ2h0J10gPSBmYWxzZTsgLy8gZGVmYXVsdDogYXV0b1xuICB3aGl0ZUxpc3RbJ3JvdGF0aW9uJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogMFxuICB3aGl0ZUxpc3RbJ3JvdGF0aW9uLXBvaW50J10gPSBmYWxzZTsgLy8gZGVmYXVsdDogNTAlIDUwJVxuICB3aGl0ZUxpc3RbJ3J1YnktYWxpZ24nXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBhdXRvXG4gIHdoaXRlTGlzdFsncnVieS1tZXJnZSddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IHNlcGFyYXRlXG4gIHdoaXRlTGlzdFsncnVieS1wb3NpdGlvbiddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGJlZm9yZVxuICB3aGl0ZUxpc3RbJ3NoYXBlLWltYWdlLXRocmVzaG9sZCddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IDAuMFxuICB3aGl0ZUxpc3RbJ3NoYXBlLW91dHNpZGUnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBub25lXG4gIHdoaXRlTGlzdFsnc2hhcGUtbWFyZ2luJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogMFxuICB3aGl0ZUxpc3RbJ3NpemUnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBhdXRvXG4gIHdoaXRlTGlzdFsnc3BlYWsnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBhdXRvXG4gIHdoaXRlTGlzdFsnc3BlYWstYXMnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBub3JtYWxcbiAgd2hpdGVMaXN0WydzcGVhay1oZWFkZXInXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBvbmNlXG4gIHdoaXRlTGlzdFsnc3BlYWstbnVtZXJhbCddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGNvbnRpbnVvdXNcbiAgd2hpdGVMaXN0WydzcGVhay1wdW5jdHVhdGlvbiddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IG5vbmVcbiAgd2hpdGVMaXN0WydzcGVlY2gtcmF0ZSddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IG1lZGl1bVxuICB3aGl0ZUxpc3RbJ3N0cmVzcyddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IDUwXG4gIHdoaXRlTGlzdFsnc3RyaW5nLXNldCddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IG5vbmVcbiAgd2hpdGVMaXN0Wyd0YWItc2l6ZSddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IDhcbiAgd2hpdGVMaXN0Wyd0YWJsZS1sYXlvdXQnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBhdXRvXG4gIHdoaXRlTGlzdFsndGV4dC1hbGlnbiddID0gdHJ1ZTsgLy8gZGVmYXVsdDogc3RhcnRcbiAgd2hpdGVMaXN0Wyd0ZXh0LWFsaWduLWxhc3QnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IGF1dG9cbiAgd2hpdGVMaXN0Wyd0ZXh0LWNvbWJpbmUtdXByaWdodCddID0gdHJ1ZTsgLy8gZGVmYXVsdDogbm9uZVxuICB3aGl0ZUxpc3RbJ3RleHQtZGVjb3JhdGlvbiddID0gdHJ1ZTsgLy8gZGVmYXVsdDogbm9uZVxuICB3aGl0ZUxpc3RbJ3RleHQtZGVjb3JhdGlvbi1jb2xvciddID0gdHJ1ZTsgLy8gZGVmYXVsdDogY3VycmVudENvbG9yXG4gIHdoaXRlTGlzdFsndGV4dC1kZWNvcmF0aW9uLWxpbmUnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IG5vbmVcbiAgd2hpdGVMaXN0Wyd0ZXh0LWRlY29yYXRpb24tc2tpcCddID0gdHJ1ZTsgLy8gZGVmYXVsdDogb2JqZWN0c1xuICB3aGl0ZUxpc3RbJ3RleHQtZGVjb3JhdGlvbi1zdHlsZSddID0gdHJ1ZTsgLy8gZGVmYXVsdDogc29saWRcbiAgd2hpdGVMaXN0Wyd0ZXh0LWVtcGhhc2lzJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiBkZXBlbmRpbmcgb24gaW5kaXZpZHVhbCBwcm9wZXJ0aWVzXG4gIHdoaXRlTGlzdFsndGV4dC1lbXBoYXNpcy1jb2xvciddID0gdHJ1ZTsgLy8gZGVmYXVsdDogY3VycmVudENvbG9yXG4gIHdoaXRlTGlzdFsndGV4dC1lbXBoYXNpcy1wb3NpdGlvbiddID0gdHJ1ZTsgLy8gZGVmYXVsdDogb3ZlciByaWdodFxuICB3aGl0ZUxpc3RbJ3RleHQtZW1waGFzaXMtc3R5bGUnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IG5vbmVcbiAgd2hpdGVMaXN0Wyd0ZXh0LWhlaWdodCddID0gdHJ1ZTsgLy8gZGVmYXVsdDogYXV0b1xuICB3aGl0ZUxpc3RbJ3RleHQtaW5kZW50J10gPSB0cnVlOyAvLyBkZWZhdWx0OiAwXG4gIHdoaXRlTGlzdFsndGV4dC1qdXN0aWZ5J10gPSB0cnVlOyAvLyBkZWZhdWx0OiBhdXRvXG4gIHdoaXRlTGlzdFsndGV4dC1vcmllbnRhdGlvbiddID0gdHJ1ZTsgLy8gZGVmYXVsdDogbWl4ZWRcbiAgd2hpdGVMaXN0Wyd0ZXh0LW92ZXJmbG93J10gPSB0cnVlOyAvLyBkZWZhdWx0OiBjbGlwXG4gIHdoaXRlTGlzdFsndGV4dC1zaGFkb3cnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IG5vbmVcbiAgd2hpdGVMaXN0Wyd0ZXh0LXNwYWNlLWNvbGxhcHNlJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiBjb2xsYXBzZVxuICB3aGl0ZUxpc3RbJ3RleHQtdHJhbnNmb3JtJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiBub25lXG4gIHdoaXRlTGlzdFsndGV4dC11bmRlcmxpbmUtcG9zaXRpb24nXSA9IHRydWU7IC8vIGRlZmF1bHQ6IGF1dG9cbiAgd2hpdGVMaXN0Wyd0ZXh0LXdyYXAnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IG5vcm1hbFxuICB3aGl0ZUxpc3RbJ3RvcCddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGF1dG9cbiAgd2hpdGVMaXN0Wyd0cmFuc2Zvcm0nXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBub25lXG4gIHdoaXRlTGlzdFsndHJhbnNmb3JtLW9yaWdpbiddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IDUwJSA1MCUgMFxuICB3aGl0ZUxpc3RbJ3RyYW5zZm9ybS1zdHlsZSddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGZsYXRcbiAgd2hpdGVMaXN0Wyd0cmFuc2l0aW9uJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogZGVwZW5kaW5nIG9uIGluZGl2aWR1YWwgcHJvcGVydGllc1xuICB3aGl0ZUxpc3RbJ3RyYW5zaXRpb24tZGVsYXknXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiAwc1xuICB3aGl0ZUxpc3RbJ3RyYW5zaXRpb24tZHVyYXRpb24nXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiAwc1xuICB3aGl0ZUxpc3RbJ3RyYW5zaXRpb24tcHJvcGVydHknXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBhbGxcbiAgd2hpdGVMaXN0Wyd0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbiddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGVhc2VcbiAgd2hpdGVMaXN0Wyd1bmljb2RlLWJpZGknXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBub3JtYWxcbiAgd2hpdGVMaXN0Wyd2ZXJ0aWNhbC1hbGlnbiddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGJhc2VsaW5lXG4gIHdoaXRlTGlzdFsndmlzaWJpbGl0eSddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IHZpc2libGVcbiAgd2hpdGVMaXN0Wyd2b2ljZS1iYWxhbmNlJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogY2VudGVyXG4gIHdoaXRlTGlzdFsndm9pY2UtZHVyYXRpb24nXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBhdXRvXG4gIHdoaXRlTGlzdFsndm9pY2UtZmFtaWx5J10gPSBmYWxzZTsgLy8gZGVmYXVsdDogaW1wbGVtZW50YXRpb24gZGVwZW5kZW50XG4gIHdoaXRlTGlzdFsndm9pY2UtcGl0Y2gnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBtZWRpdW1cbiAgd2hpdGVMaXN0Wyd2b2ljZS1yYW5nZSddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IG1lZGl1bVxuICB3aGl0ZUxpc3RbJ3ZvaWNlLXJhdGUnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBub3JtYWxcbiAgd2hpdGVMaXN0Wyd2b2ljZS1zdHJlc3MnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBub3JtYWxcbiAgd2hpdGVMaXN0Wyd2b2ljZS12b2x1bWUnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBtZWRpdW1cbiAgd2hpdGVMaXN0Wyd2b2x1bWUnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBtZWRpdW1cbiAgd2hpdGVMaXN0Wyd3aGl0ZS1zcGFjZSddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IG5vcm1hbFxuICB3aGl0ZUxpc3RbJ3dpZG93cyddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IDJcbiAgd2hpdGVMaXN0Wyd3aWR0aCddID0gdHJ1ZTsgLy8gZGVmYXVsdDogYXV0b1xuICB3aGl0ZUxpc3RbJ3dpbGwtY2hhbmdlJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogYXV0b1xuICB3aGl0ZUxpc3RbJ3dvcmQtYnJlYWsnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IG5vcm1hbFxuICB3aGl0ZUxpc3RbJ3dvcmQtc3BhY2luZyddID0gdHJ1ZTsgLy8gZGVmYXVsdDogbm9ybWFsXG4gIHdoaXRlTGlzdFsnd29yZC13cmFwJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiBub3JtYWxcbiAgd2hpdGVMaXN0Wyd3cmFwLWZsb3cnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBhdXRvXG4gIHdoaXRlTGlzdFsnd3JhcC10aHJvdWdoJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogd3JhcFxuICB3aGl0ZUxpc3RbJ3dyaXRpbmctbW9kZSddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGhvcml6b250YWwtdGJcbiAgd2hpdGVMaXN0Wyd6LWluZGV4J10gPSBmYWxzZTsgLy8gZGVmYXVsdDogYXV0b1xuXG4gIHJldHVybiB3aGl0ZUxpc3Q7XG59XG5cblxuLyoqXG4gKiDljLnphY3liLDnmb3lkI3ljZXkuIrnmoTkuIDkuKrlsZ7mgKfml7ZcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5mdW5jdGlvbiBvbkF0dHIgKG5hbWUsIHZhbHVlLCBvcHRpb25zKSB7XG4gIC8vIGRvIG5vdGhpbmdcbn1cblxuLyoqXG4gKiDljLnphY3liLDkuI3lnKjnmb3lkI3ljZXkuIrnmoTkuIDkuKrlsZ7mgKfml7ZcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5mdW5jdGlvbiBvbklnbm9yZUF0dHIgKG5hbWUsIHZhbHVlLCBvcHRpb25zKSB7XG4gIC8vIGRvIG5vdGhpbmdcbn1cblxudmFyIFJFR0VYUF9VUkxfSkFWQVNDUklQVCA9IC9qYXZhc2NyaXB0XFxzKlxcOi9pbWc7XG5cbi8qKlxuICog6L+H5ruk5bGe5oCn5YC8XG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZVxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5mdW5jdGlvbiBzYWZlQXR0clZhbHVlKG5hbWUsIHZhbHVlKSB7XG4gIGlmIChSRUdFWFBfVVJMX0pBVkFTQ1JJUFQudGVzdCh2YWx1ZSkpIHJldHVybiAnJztcbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5cbmV4cG9ydHMud2hpdGVMaXN0ID0gZ2V0RGVmYXVsdFdoaXRlTGlzdCgpO1xuZXhwb3J0cy5nZXREZWZhdWx0V2hpdGVMaXN0ID0gZ2V0RGVmYXVsdFdoaXRlTGlzdDtcbmV4cG9ydHMub25BdHRyID0gb25BdHRyO1xuZXhwb3J0cy5vbklnbm9yZUF0dHIgPSBvbklnbm9yZUF0dHI7XG5leHBvcnRzLnNhZmVBdHRyVmFsdWUgPSBzYWZlQXR0clZhbHVlO1xuIiwiLyoqXG4gKiBjc3NmaWx0ZXJcbiAqXG4gKiBAYXV0aG9yIOiAgembtzxsZWl6b25nbWluQGdtYWlsLmNvbT5cbiAqL1xuXG52YXIgREVGQVVMVCA9IHJlcXVpcmUoJy4vZGVmYXVsdCcpO1xudmFyIEZpbHRlckNTUyA9IHJlcXVpcmUoJy4vY3NzJyk7XG5cblxuLyoqXG4gKiBYU1Pov4fmu6RcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gY3NzIOimgei/h+a7pOeahENTU+S7o+eggVxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMg6YCJ6aG577yad2hpdGVMaXN0LCBvbkF0dHIsIG9uSWdub3JlQXR0clxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5mdW5jdGlvbiBmaWx0ZXJDU1MgKGh0bWwsIG9wdGlvbnMpIHtcbiAgdmFyIHhzcyA9IG5ldyBGaWx0ZXJDU1Mob3B0aW9ucyk7XG4gIHJldHVybiB4c3MucHJvY2VzcyhodG1sKTtcbn1cblxuXG4vLyDovpPlh7pcbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGZpbHRlckNTUztcbmV4cG9ydHMuRmlsdGVyQ1NTID0gRmlsdGVyQ1NTO1xuZm9yICh2YXIgaSBpbiBERUZBVUxUKSBleHBvcnRzW2ldID0gREVGQVVMVFtpXTtcblxuLy8g5Zyo5rWP6KeI5Zmo56uv5L2/55SoXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgd2luZG93LmZpbHRlckNTUyA9IG1vZHVsZS5leHBvcnRzO1xufVxuIiwiLyoqXG4gKiBjc3NmaWx0ZXJcbiAqXG4gKiBAYXV0aG9yIOiAgembtzxsZWl6b25nbWluQGdtYWlsLmNvbT5cbiAqL1xuXG52YXIgXyA9IHJlcXVpcmUoJy4vdXRpbCcpO1xuXG5cbi8qKlxuICog6Kej5p6Qc3R5bGVcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gY3NzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvbkF0dHIg5aSE55CG5bGe5oCn55qE5Ye95pWwXG4gKiAgIOWPguaVsOagvOW8j++8miBmdW5jdGlvbiAoc291cmNlUG9zaXRpb24sIHBvc2l0aW9uLCBuYW1lLCB2YWx1ZSwgc291cmNlKVxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5mdW5jdGlvbiBwYXJzZVN0eWxlIChjc3MsIG9uQXR0cikge1xuICBjc3MgPSBfLnRyaW1SaWdodChjc3MpO1xuICBpZiAoY3NzW2Nzcy5sZW5ndGggLSAxXSAhPT0gJzsnKSBjc3MgKz0gJzsnO1xuICB2YXIgY3NzTGVuZ3RoID0gY3NzLmxlbmd0aDtcbiAgdmFyIGlzUGFyZW50aGVzaXNPcGVuID0gZmFsc2U7XG4gIHZhciBsYXN0UG9zID0gMDtcbiAgdmFyIGkgPSAwO1xuICB2YXIgcmV0Q1NTID0gJyc7XG5cbiAgZnVuY3Rpb24gYWRkTmV3QXR0ciAoKSB7XG4gICAgLy8g5aaC5p6c5rKh5pyJ5q2j5bi455qE6Zet5ZCI5ZyG5ous5Y+377yM5YiZ55u05o6l5b+955Wl5b2T5YmN5bGe5oCnXG4gICAgaWYgKCFpc1BhcmVudGhlc2lzT3Blbikge1xuICAgICAgdmFyIHNvdXJjZSA9IF8udHJpbShjc3Muc2xpY2UobGFzdFBvcywgaSkpO1xuICAgICAgdmFyIGogPSBzb3VyY2UuaW5kZXhPZignOicpO1xuICAgICAgaWYgKGogIT09IC0xKSB7XG4gICAgICAgIHZhciBuYW1lID0gXy50cmltKHNvdXJjZS5zbGljZSgwLCBqKSk7XG4gICAgICAgIHZhciB2YWx1ZSA9IF8udHJpbShzb3VyY2Uuc2xpY2UoaiArIDEpKTtcbiAgICAgICAgLy8g5b+F6aG75pyJ5bGe5oCn5ZCN56ewXG4gICAgICAgIGlmIChuYW1lKSB7XG4gICAgICAgICAgdmFyIHJldCA9IG9uQXR0cihsYXN0UG9zLCByZXRDU1MubGVuZ3RoLCBuYW1lLCB2YWx1ZSwgc291cmNlKTtcbiAgICAgICAgICBpZiAocmV0KSByZXRDU1MgKz0gcmV0ICsgJzsgJztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBsYXN0UG9zID0gaSArIDE7XG4gIH1cblxuICBmb3IgKDsgaSA8IGNzc0xlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGMgPSBjc3NbaV07XG4gICAgaWYgKGMgPT09ICcvJyAmJiBjc3NbaSArIDFdID09PSAnKicpIHtcbiAgICAgIC8vIOWkh+azqOW8gOWni1xuICAgICAgdmFyIGogPSBjc3MuaW5kZXhPZignKi8nLCBpICsgMik7XG4gICAgICAvLyDlpoLmnpzmsqHmnInmraPluLjnmoTlpIfms6jnu5PmnZ/vvIzliJnlkI7pnaLnmoTpg6jliIblhajpg6jot7Pov4dcbiAgICAgIGlmIChqID09PSAtMSkgYnJlYWs7XG4gICAgICAvLyDnm7TmjqXlsIblvZPliY3kvY3nva7osIPliLDlpIfms6jnu5PlsL7vvIzlubbkuJTliJ3lp4vljJbnirbmgIFcbiAgICAgIGkgPSBqICsgMTtcbiAgICAgIGxhc3RQb3MgPSBpICsgMTtcbiAgICAgIGlzUGFyZW50aGVzaXNPcGVuID0gZmFsc2U7XG4gICAgfSBlbHNlIGlmIChjID09PSAnKCcpIHtcbiAgICAgIGlzUGFyZW50aGVzaXNPcGVuID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKGMgPT09ICcpJykge1xuICAgICAgaXNQYXJlbnRoZXNpc09wZW4gPSBmYWxzZTtcbiAgICB9IGVsc2UgaWYgKGMgPT09ICc7Jykge1xuICAgICAgaWYgKGlzUGFyZW50aGVzaXNPcGVuKSB7XG4gICAgICAgIC8vIOWcqOWchuaLrOWPt+mHjOmdou+8jOW/veeVpVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWRkTmV3QXR0cigpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoYyA9PT0gJ1xcbicpIHtcbiAgICAgIGFkZE5ld0F0dHIoKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gXy50cmltKHJldENTUyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcGFyc2VTdHlsZTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBpbmRleE9mOiBmdW5jdGlvbiAoYXJyLCBpdGVtKSB7XG4gICAgdmFyIGksIGo7XG4gICAgaWYgKEFycmF5LnByb3RvdHlwZS5pbmRleE9mKSB7XG4gICAgICByZXR1cm4gYXJyLmluZGV4T2YoaXRlbSk7XG4gICAgfVxuICAgIGZvciAoaSA9IDAsIGogPSBhcnIubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG4gICAgICBpZiAoYXJyW2ldID09PSBpdGVtKSB7XG4gICAgICAgIHJldHVybiBpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gLTE7XG4gIH0sXG4gIGZvckVhY2g6IGZ1bmN0aW9uIChhcnIsIGZuLCBzY29wZSkge1xuICAgIHZhciBpLCBqO1xuICAgIGlmIChBcnJheS5wcm90b3R5cGUuZm9yRWFjaCkge1xuICAgICAgcmV0dXJuIGFyci5mb3JFYWNoKGZuLCBzY29wZSk7XG4gICAgfVxuICAgIGZvciAoaSA9IDAsIGogPSBhcnIubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG4gICAgICBmbi5jYWxsKHNjb3BlLCBhcnJbaV0sIGksIGFycik7XG4gICAgfVxuICB9LFxuICB0cmltOiBmdW5jdGlvbiAoc3RyKSB7XG4gICAgaWYgKFN0cmluZy5wcm90b3R5cGUudHJpbSkge1xuICAgICAgcmV0dXJuIHN0ci50cmltKCk7XG4gICAgfVxuICAgIHJldHVybiBzdHIucmVwbGFjZSgvKF5cXHMqKXwoXFxzKiQpL2csICcnKTtcbiAgfSxcbiAgdHJpbVJpZ2h0OiBmdW5jdGlvbiAoc3RyKSB7XG4gICAgaWYgKFN0cmluZy5wcm90b3R5cGUudHJpbVJpZ2h0KSB7XG4gICAgICByZXR1cm4gc3RyLnRyaW1SaWdodCgpO1xuICAgIH1cbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoLyhcXHMqJCkvZywgJycpO1xuICB9XG59O1xuIiwiLyoqXG4gKiBkZWZhdWx0IHNldHRpbmdzXG4gKlxuICogQGF1dGhvciBab25nbWluIExlaTxsZWl6b25nbWluQGdtYWlsLmNvbT5cbiAqL1xuXG52YXIgRmlsdGVyQ1NTID0gcmVxdWlyZShcImNzc2ZpbHRlclwiKS5GaWx0ZXJDU1M7XG52YXIgZ2V0RGVmYXVsdENTU1doaXRlTGlzdCA9IHJlcXVpcmUoXCJjc3NmaWx0ZXJcIikuZ2V0RGVmYXVsdFdoaXRlTGlzdDtcbnZhciBfID0gcmVxdWlyZShcIi4vdXRpbFwiKTtcblxuZnVuY3Rpb24gZ2V0RGVmYXVsdFdoaXRlTGlzdCgpIHtcbiAgcmV0dXJuIHtcbiAgICBhOiBbXCJ0YXJnZXRcIiwgXCJocmVmXCIsIFwidGl0bGVcIl0sXG4gICAgYWJicjogW1widGl0bGVcIl0sXG4gICAgYWRkcmVzczogW10sXG4gICAgYXJlYTogW1wic2hhcGVcIiwgXCJjb29yZHNcIiwgXCJocmVmXCIsIFwiYWx0XCJdLFxuICAgIGFydGljbGU6IFtdLFxuICAgIGFzaWRlOiBbXSxcbiAgICBhdWRpbzogW1xuICAgICAgXCJhdXRvcGxheVwiLFxuICAgICAgXCJjb250cm9sc1wiLFxuICAgICAgXCJjcm9zc29yaWdpblwiLFxuICAgICAgXCJsb29wXCIsXG4gICAgICBcIm11dGVkXCIsXG4gICAgICBcInByZWxvYWRcIixcbiAgICAgIFwic3JjXCIsXG4gICAgXSxcbiAgICBiOiBbXSxcbiAgICBiZGk6IFtcImRpclwiXSxcbiAgICBiZG86IFtcImRpclwiXSxcbiAgICBiaWc6IFtdLFxuICAgIGJsb2NrcXVvdGU6IFtcImNpdGVcIl0sXG4gICAgYnI6IFtdLFxuICAgIGNhcHRpb246IFtdLFxuICAgIGNlbnRlcjogW10sXG4gICAgY2l0ZTogW10sXG4gICAgY29kZTogW10sXG4gICAgY29sOiBbXCJhbGlnblwiLCBcInZhbGlnblwiLCBcInNwYW5cIiwgXCJ3aWR0aFwiXSxcbiAgICBjb2xncm91cDogW1wiYWxpZ25cIiwgXCJ2YWxpZ25cIiwgXCJzcGFuXCIsIFwid2lkdGhcIl0sXG4gICAgZGQ6IFtdLFxuICAgIGRlbDogW1wiZGF0ZXRpbWVcIl0sXG4gICAgZGV0YWlsczogW1wib3BlblwiXSxcbiAgICBkaXY6IFtdLFxuICAgIGRsOiBbXSxcbiAgICBkdDogW10sXG4gICAgZW06IFtdLFxuICAgIGZpZ2NhcHRpb246IFtdLFxuICAgIGZpZ3VyZTogW10sXG4gICAgZm9udDogW1wiY29sb3JcIiwgXCJzaXplXCIsIFwiZmFjZVwiXSxcbiAgICBmb290ZXI6IFtdLFxuICAgIGgxOiBbXSxcbiAgICBoMjogW10sXG4gICAgaDM6IFtdLFxuICAgIGg0OiBbXSxcbiAgICBoNTogW10sXG4gICAgaDY6IFtdLFxuICAgIGhlYWRlcjogW10sXG4gICAgaHI6IFtdLFxuICAgIGk6IFtdLFxuICAgIGltZzogW1wic3JjXCIsIFwiYWx0XCIsIFwidGl0bGVcIiwgXCJ3aWR0aFwiLCBcImhlaWdodFwiXSxcbiAgICBpbnM6IFtcImRhdGV0aW1lXCJdLFxuICAgIGxpOiBbXSxcbiAgICBtYXJrOiBbXSxcbiAgICBuYXY6IFtdLFxuICAgIG9sOiBbXSxcbiAgICBwOiBbXSxcbiAgICBwcmU6IFtdLFxuICAgIHM6IFtdLFxuICAgIHNlY3Rpb246IFtdLFxuICAgIHNtYWxsOiBbXSxcbiAgICBzcGFuOiBbXSxcbiAgICBzdWI6IFtdLFxuICAgIHN1bW1hcnk6IFtdLFxuICAgIHN1cDogW10sXG4gICAgc3Ryb25nOiBbXSxcbiAgICBzdHJpa2U6IFtdLFxuICAgIHRhYmxlOiBbXCJ3aWR0aFwiLCBcImJvcmRlclwiLCBcImFsaWduXCIsIFwidmFsaWduXCJdLFxuICAgIHRib2R5OiBbXCJhbGlnblwiLCBcInZhbGlnblwiXSxcbiAgICB0ZDogW1wid2lkdGhcIiwgXCJyb3dzcGFuXCIsIFwiY29sc3BhblwiLCBcImFsaWduXCIsIFwidmFsaWduXCJdLFxuICAgIHRmb290OiBbXCJhbGlnblwiLCBcInZhbGlnblwiXSxcbiAgICB0aDogW1wid2lkdGhcIiwgXCJyb3dzcGFuXCIsIFwiY29sc3BhblwiLCBcImFsaWduXCIsIFwidmFsaWduXCJdLFxuICAgIHRoZWFkOiBbXCJhbGlnblwiLCBcInZhbGlnblwiXSxcbiAgICB0cjogW1wicm93c3BhblwiLCBcImFsaWduXCIsIFwidmFsaWduXCJdLFxuICAgIHR0OiBbXSxcbiAgICB1OiBbXSxcbiAgICB1bDogW10sXG4gICAgdmlkZW86IFtcbiAgICAgIFwiYXV0b3BsYXlcIixcbiAgICAgIFwiY29udHJvbHNcIixcbiAgICAgIFwiY3Jvc3NvcmlnaW5cIixcbiAgICAgIFwibG9vcFwiLFxuICAgICAgXCJtdXRlZFwiLFxuICAgICAgXCJwbGF5c2lubGluZVwiLFxuICAgICAgXCJwb3N0ZXJcIixcbiAgICAgIFwicHJlbG9hZFwiLFxuICAgICAgXCJzcmNcIixcbiAgICAgIFwiaGVpZ2h0XCIsXG4gICAgICBcIndpZHRoXCIsXG4gICAgXSxcbiAgfTtcbn1cblxudmFyIGRlZmF1bHRDU1NGaWx0ZXIgPSBuZXcgRmlsdGVyQ1NTKCk7XG5cbi8qKlxuICogZGVmYXVsdCBvblRhZyBmdW5jdGlvblxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB0YWdcbiAqIEBwYXJhbSB7U3RyaW5nfSBodG1sXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5mdW5jdGlvbiBvblRhZyh0YWcsIGh0bWwsIG9wdGlvbnMpIHtcbiAgLy8gZG8gbm90aGluZ1xufVxuXG4vKipcbiAqIGRlZmF1bHQgb25JZ25vcmVUYWcgZnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdGFnXG4gKiBAcGFyYW0ge1N0cmluZ30gaHRtbFxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZnVuY3Rpb24gb25JZ25vcmVUYWcodGFnLCBodG1sLCBvcHRpb25zKSB7XG4gIC8vIGRvIG5vdGhpbmdcbn1cblxuLyoqXG4gKiBkZWZhdWx0IG9uVGFnQXR0ciBmdW5jdGlvblxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB0YWdcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZnVuY3Rpb24gb25UYWdBdHRyKHRhZywgbmFtZSwgdmFsdWUpIHtcbiAgLy8gZG8gbm90aGluZ1xufVxuXG4vKipcbiAqIGRlZmF1bHQgb25JZ25vcmVUYWdBdHRyIGZ1bmN0aW9uXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHRhZ1xuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZVxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5mdW5jdGlvbiBvbklnbm9yZVRhZ0F0dHIodGFnLCBuYW1lLCB2YWx1ZSkge1xuICAvLyBkbyBub3RoaW5nXG59XG5cbi8qKlxuICogZGVmYXVsdCBlc2NhcGVIdG1sIGZ1bmN0aW9uXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGh0bWxcbiAqL1xuZnVuY3Rpb24gZXNjYXBlSHRtbChodG1sKSB7XG4gIHJldHVybiBodG1sLnJlcGxhY2UoUkVHRVhQX0xULCBcIiZsdDtcIikucmVwbGFjZShSRUdFWFBfR1QsIFwiJmd0O1wiKTtcbn1cblxuLyoqXG4gKiBkZWZhdWx0IHNhZmVBdHRyVmFsdWUgZnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdGFnXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG4gKiBAcGFyYW0ge09iamVjdH0gY3NzRmlsdGVyXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIHNhZmVBdHRyVmFsdWUodGFnLCBuYW1lLCB2YWx1ZSwgY3NzRmlsdGVyKSB7XG4gIC8vIHVuZXNjYXBlIGF0dHJpYnV0ZSB2YWx1ZSBmaXJzdGx5XG4gIHZhbHVlID0gZnJpZW5kbHlBdHRyVmFsdWUodmFsdWUpO1xuXG4gIGlmIChuYW1lID09PSBcImhyZWZcIiB8fCBuYW1lID09PSBcInNyY1wiKSB7XG4gICAgLy8gZmlsdGVyIGBocmVmYCBhbmQgYHNyY2AgYXR0cmlidXRlXG4gICAgLy8gb25seSBhbGxvdyB0aGUgdmFsdWUgdGhhdCBzdGFydHMgd2l0aCBgaHR0cDovL2AgfCBgaHR0cHM6Ly9gIHwgYG1haWx0bzpgIHwgYC9gIHwgYCNgXG4gICAgdmFsdWUgPSBfLnRyaW0odmFsdWUpO1xuICAgIGlmICh2YWx1ZSA9PT0gXCIjXCIpIHJldHVybiBcIiNcIjtcbiAgICBpZiAoXG4gICAgICAhKFxuICAgICAgICB2YWx1ZS5zdWJzdHIoMCwgNykgPT09IFwiaHR0cDovL1wiIHx8XG4gICAgICAgIHZhbHVlLnN1YnN0cigwLCA4KSA9PT0gXCJodHRwczovL1wiIHx8XG4gICAgICAgIHZhbHVlLnN1YnN0cigwLCA3KSA9PT0gXCJtYWlsdG86XCIgfHxcbiAgICAgICAgdmFsdWUuc3Vic3RyKDAsIDQpID09PSBcInRlbDpcIiB8fFxuICAgICAgICB2YWx1ZS5zdWJzdHIoMCwgMTEpID09PSBcImRhdGE6aW1hZ2UvXCIgfHxcbiAgICAgICAgdmFsdWUuc3Vic3RyKDAsIDYpID09PSBcImZ0cDovL1wiIHx8XG4gICAgICAgIHZhbHVlLnN1YnN0cigwLCAyKSA9PT0gXCIuL1wiIHx8XG4gICAgICAgIHZhbHVlLnN1YnN0cigwLCAzKSA9PT0gXCIuLi9cIiB8fFxuICAgICAgICB2YWx1ZVswXSA9PT0gXCIjXCIgfHxcbiAgICAgICAgdmFsdWVbMF0gPT09IFwiL1wiXG4gICAgICApXG4gICAgKSB7XG4gICAgICByZXR1cm4gXCJcIjtcbiAgICB9XG4gIH0gZWxzZSBpZiAobmFtZSA9PT0gXCJiYWNrZ3JvdW5kXCIpIHtcbiAgICAvLyBmaWx0ZXIgYGJhY2tncm91bmRgIGF0dHJpYnV0ZSAobWF5YmUgbm8gdXNlKVxuICAgIC8vIGBqYXZhc2NyaXB0OmBcbiAgICBSRUdFWFBfREVGQVVMVF9PTl9UQUdfQVRUUl80Lmxhc3RJbmRleCA9IDA7XG4gICAgaWYgKFJFR0VYUF9ERUZBVUxUX09OX1RBR19BVFRSXzQudGVzdCh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBcIlwiO1xuICAgIH1cbiAgfSBlbHNlIGlmIChuYW1lID09PSBcInN0eWxlXCIpIHtcbiAgICAvLyBgZXhwcmVzc2lvbigpYFxuICAgIFJFR0VYUF9ERUZBVUxUX09OX1RBR19BVFRSXzcubGFzdEluZGV4ID0gMDtcbiAgICBpZiAoUkVHRVhQX0RFRkFVTFRfT05fVEFHX0FUVFJfNy50ZXN0KHZhbHVlKSkge1xuICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfVxuICAgIC8vIGB1cmwoKWBcbiAgICBSRUdFWFBfREVGQVVMVF9PTl9UQUdfQVRUUl84Lmxhc3RJbmRleCA9IDA7XG4gICAgaWYgKFJFR0VYUF9ERUZBVUxUX09OX1RBR19BVFRSXzgudGVzdCh2YWx1ZSkpIHtcbiAgICAgIFJFR0VYUF9ERUZBVUxUX09OX1RBR19BVFRSXzQubGFzdEluZGV4ID0gMDtcbiAgICAgIGlmIChSRUdFWFBfREVGQVVMVF9PTl9UQUdfQVRUUl80LnRlc3QodmFsdWUpKSB7XG4gICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoY3NzRmlsdGVyICE9PSBmYWxzZSkge1xuICAgICAgY3NzRmlsdGVyID0gY3NzRmlsdGVyIHx8IGRlZmF1bHRDU1NGaWx0ZXI7XG4gICAgICB2YWx1ZSA9IGNzc0ZpbHRlci5wcm9jZXNzKHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICAvLyBlc2NhcGUgYDw+XCJgIGJlZm9yZSByZXR1cm5zXG4gIHZhbHVlID0gZXNjYXBlQXR0clZhbHVlKHZhbHVlKTtcbiAgcmV0dXJuIHZhbHVlO1xufVxuXG4vLyBSZWdFeHAgbGlzdFxudmFyIFJFR0VYUF9MVCA9IC88L2c7XG52YXIgUkVHRVhQX0dUID0gLz4vZztcbnZhciBSRUdFWFBfUVVPVEUgPSAvXCIvZztcbnZhciBSRUdFWFBfUVVPVEVfMiA9IC8mcXVvdDsvZztcbnZhciBSRUdFWFBfQVRUUl9WQUxVRV8xID0gLyYjKFthLXpBLVowLTldKik7Py9naW07XG52YXIgUkVHRVhQX0FUVFJfVkFMVUVfQ09MT04gPSAvJmNvbG9uOz8vZ2ltO1xudmFyIFJFR0VYUF9BVFRSX1ZBTFVFX05FV0xJTkUgPSAvJm5ld2xpbmU7Py9naW07XG52YXIgUkVHRVhQX0RFRkFVTFRfT05fVEFHX0FUVFJfMyA9IC9cXC9cXCp8XFwqXFwvL2dtO1xudmFyIFJFR0VYUF9ERUZBVUxUX09OX1RBR19BVFRSXzQgPVxuICAvKChqXFxzKmFcXHMqdlxccyphfHZcXHMqYnxsXFxzKmlcXHMqdlxccyplKVxccypzXFxzKmNcXHMqclxccyppXFxzKnBcXHMqdFxccyp8bVxccypvXFxzKmNcXHMqaFxccyphKVxcOi9naTtcbnZhciBSRUdFWFBfREVGQVVMVF9PTl9UQUdfQVRUUl81ID0gL15bXFxzXCInYF0qKGRcXHMqYVxccyp0XFxzKmFcXHMqKVxcOi9naTtcbnZhciBSRUdFWFBfREVGQVVMVF9PTl9UQUdfQVRUUl82ID0gL15bXFxzXCInYF0qKGRcXHMqYVxccyp0XFxzKmFcXHMqKVxcOlxccyppbWFnZVxcLy9naTtcbnZhciBSRUdFWFBfREVGQVVMVF9PTl9UQUdfQVRUUl83ID1cbiAgL2VcXHMqeFxccypwXFxzKnJcXHMqZVxccypzXFxzKnNcXHMqaVxccypvXFxzKm5cXHMqXFwoLiovZ2k7XG52YXIgUkVHRVhQX0RFRkFVTFRfT05fVEFHX0FUVFJfOCA9IC91XFxzKnJcXHMqbFxccypcXCguKi9naTtcblxuLyoqXG4gKiBlc2NhcGUgZG91YmxlIHF1b3RlXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7U3RyaW5nfSBzdHJcbiAqL1xuZnVuY3Rpb24gZXNjYXBlUXVvdGUoc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZShSRUdFWFBfUVVPVEUsIFwiJnF1b3Q7XCIpO1xufVxuXG4vKipcbiAqIHVuZXNjYXBlIGRvdWJsZSBxdW90ZVxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge1N0cmluZ30gc3RyXG4gKi9cbmZ1bmN0aW9uIHVuZXNjYXBlUXVvdGUoc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZShSRUdFWFBfUVVPVEVfMiwgJ1wiJyk7XG59XG5cbi8qKlxuICogZXNjYXBlIGh0bWwgZW50aXRpZXNcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGVzY2FwZUh0bWxFbnRpdGllcyhzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKFJFR0VYUF9BVFRSX1ZBTFVFXzEsIGZ1bmN0aW9uIHJlcGxhY2VVbmljb2RlKHN0ciwgY29kZSkge1xuICAgIHJldHVybiBjb2RlWzBdID09PSBcInhcIiB8fCBjb2RlWzBdID09PSBcIlhcIlxuICAgICAgPyBTdHJpbmcuZnJvbUNoYXJDb2RlKHBhcnNlSW50KGNvZGUuc3Vic3RyKDEpLCAxNikpXG4gICAgICA6IFN0cmluZy5mcm9tQ2hhckNvZGUocGFyc2VJbnQoY29kZSwgMTApKTtcbiAgfSk7XG59XG5cbi8qKlxuICogZXNjYXBlIGh0bWw1IG5ldyBkYW5nZXIgZW50aXRpZXNcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGVzY2FwZURhbmdlckh0bWw1RW50aXRpZXMoc3RyKSB7XG4gIHJldHVybiBzdHJcbiAgICAucmVwbGFjZShSRUdFWFBfQVRUUl9WQUxVRV9DT0xPTiwgXCI6XCIpXG4gICAgLnJlcGxhY2UoUkVHRVhQX0FUVFJfVkFMVUVfTkVXTElORSwgXCIgXCIpO1xufVxuXG4vKipcbiAqIGNsZWFyIG5vbnByaW50YWJsZSBjaGFyYWN0ZXJzXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5mdW5jdGlvbiBjbGVhck5vblByaW50YWJsZUNoYXJhY3RlcihzdHIpIHtcbiAgdmFyIHN0cjIgPSBcIlwiO1xuICBmb3IgKHZhciBpID0gMCwgbGVuID0gc3RyLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgc3RyMiArPSBzdHIuY2hhckNvZGVBdChpKSA8IDMyID8gXCIgXCIgOiBzdHIuY2hhckF0KGkpO1xuICB9XG4gIHJldHVybiBfLnRyaW0oc3RyMik7XG59XG5cbi8qKlxuICogZ2V0IGZyaWVuZGx5IGF0dHJpYnV0ZSB2YWx1ZVxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZnJpZW5kbHlBdHRyVmFsdWUoc3RyKSB7XG4gIHN0ciA9IHVuZXNjYXBlUXVvdGUoc3RyKTtcbiAgc3RyID0gZXNjYXBlSHRtbEVudGl0aWVzKHN0cik7XG4gIHN0ciA9IGVzY2FwZURhbmdlckh0bWw1RW50aXRpZXMoc3RyKTtcbiAgc3RyID0gY2xlYXJOb25QcmludGFibGVDaGFyYWN0ZXIoc3RyKTtcbiAgcmV0dXJuIHN0cjtcbn1cblxuLyoqXG4gKiB1bmVzY2FwZSBhdHRyaWJ1dGUgdmFsdWVcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGVzY2FwZUF0dHJWYWx1ZShzdHIpIHtcbiAgc3RyID0gZXNjYXBlUXVvdGUoc3RyKTtcbiAgc3RyID0gZXNjYXBlSHRtbChzdHIpO1xuICByZXR1cm4gc3RyO1xufVxuXG4vKipcbiAqIGBvbklnbm9yZVRhZ2AgZnVuY3Rpb24gZm9yIHJlbW92aW5nIGFsbCB0aGUgdGFncyB0aGF0IGFyZSBub3QgaW4gd2hpdGVsaXN0XG4gKi9cbmZ1bmN0aW9uIG9uSWdub3JlVGFnU3RyaXBBbGwoKSB7XG4gIHJldHVybiBcIlwiO1xufVxuXG4vKipcbiAqIHJlbW92ZSB0YWcgYm9keVxuICogc3BlY2lmeSBhIGB0YWdzYCBsaXN0LCBpZiB0aGUgdGFnIGlzIG5vdCBpbiB0aGUgYHRhZ3NgIGxpc3QgdGhlbiBwcm9jZXNzIGJ5IHRoZSBzcGVjaWZ5IGZ1bmN0aW9uIChvcHRpb25hbClcbiAqXG4gKiBAcGFyYW0ge2FycmF5fSB0YWdzXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBuZXh0XG4gKi9cbmZ1bmN0aW9uIFN0cmlwVGFnQm9keSh0YWdzLCBuZXh0KSB7XG4gIGlmICh0eXBlb2YgbmV4dCAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgbmV4dCA9IGZ1bmN0aW9uICgpIHt9O1xuICB9XG5cbiAgdmFyIGlzUmVtb3ZlQWxsVGFnID0gIUFycmF5LmlzQXJyYXkodGFncyk7XG4gIGZ1bmN0aW9uIGlzUmVtb3ZlVGFnKHRhZykge1xuICAgIGlmIChpc1JlbW92ZUFsbFRhZykgcmV0dXJuIHRydWU7XG4gICAgcmV0dXJuIF8uaW5kZXhPZih0YWdzLCB0YWcpICE9PSAtMTtcbiAgfVxuXG4gIHZhciByZW1vdmVMaXN0ID0gW107XG4gIHZhciBwb3NTdGFydCA9IGZhbHNlO1xuXG4gIHJldHVybiB7XG4gICAgb25JZ25vcmVUYWc6IGZ1bmN0aW9uICh0YWcsIGh0bWwsIG9wdGlvbnMpIHtcbiAgICAgIGlmIChpc1JlbW92ZVRhZyh0YWcpKSB7XG4gICAgICAgIGlmIChvcHRpb25zLmlzQ2xvc2luZykge1xuICAgICAgICAgIHZhciByZXQgPSBcIlsvcmVtb3ZlZF1cIjtcbiAgICAgICAgICB2YXIgZW5kID0gb3B0aW9ucy5wb3NpdGlvbiArIHJldC5sZW5ndGg7XG4gICAgICAgICAgcmVtb3ZlTGlzdC5wdXNoKFtcbiAgICAgICAgICAgIHBvc1N0YXJ0ICE9PSBmYWxzZSA/IHBvc1N0YXJ0IDogb3B0aW9ucy5wb3NpdGlvbixcbiAgICAgICAgICAgIGVuZCxcbiAgICAgICAgICBdKTtcbiAgICAgICAgICBwb3NTdGFydCA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKCFwb3NTdGFydCkge1xuICAgICAgICAgICAgcG9zU3RhcnQgPSBvcHRpb25zLnBvc2l0aW9uO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gXCJbcmVtb3ZlZF1cIjtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG5leHQodGFnLCBodG1sLCBvcHRpb25zKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gKGh0bWwpIHtcbiAgICAgIHZhciByZXRodG1sID0gXCJcIjtcbiAgICAgIHZhciBsYXN0UG9zID0gMDtcbiAgICAgIF8uZm9yRWFjaChyZW1vdmVMaXN0LCBmdW5jdGlvbiAocG9zKSB7XG4gICAgICAgIHJldGh0bWwgKz0gaHRtbC5zbGljZShsYXN0UG9zLCBwb3NbMF0pO1xuICAgICAgICBsYXN0UG9zID0gcG9zWzFdO1xuICAgICAgfSk7XG4gICAgICByZXRodG1sICs9IGh0bWwuc2xpY2UobGFzdFBvcyk7XG4gICAgICByZXR1cm4gcmV0aHRtbDtcbiAgICB9LFxuICB9O1xufVxuXG4vKipcbiAqIHJlbW92ZSBodG1sIGNvbW1lbnRzXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGh0bWxcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZnVuY3Rpb24gc3RyaXBDb21tZW50VGFnKGh0bWwpIHtcbiAgdmFyIHJldEh0bWwgPSBcIlwiO1xuICB2YXIgbGFzdFBvcyA9IDA7XG4gIHdoaWxlIChsYXN0UG9zIDwgaHRtbC5sZW5ndGgpIHtcbiAgICB2YXIgaSA9IGh0bWwuaW5kZXhPZihcIjwhLS1cIiwgbGFzdFBvcyk7XG4gICAgaWYgKGkgPT09IC0xKSB7XG4gICAgICByZXRIdG1sICs9IGh0bWwuc2xpY2UobGFzdFBvcyk7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgcmV0SHRtbCArPSBodG1sLnNsaWNlKGxhc3RQb3MsIGkpO1xuICAgIHZhciBqID0gaHRtbC5pbmRleE9mKFwiLS0+XCIsIGkpO1xuICAgIGlmIChqID09PSAtMSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGxhc3RQb3MgPSBqICsgMztcbiAgfVxuICByZXR1cm4gcmV0SHRtbDtcbn1cblxuLyoqXG4gKiByZW1vdmUgaW52aXNpYmxlIGNoYXJhY3RlcnNcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaHRtbFxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5mdW5jdGlvbiBzdHJpcEJsYW5rQ2hhcihodG1sKSB7XG4gIHZhciBjaGFycyA9IGh0bWwuc3BsaXQoXCJcIik7XG4gIGNoYXJzID0gY2hhcnMuZmlsdGVyKGZ1bmN0aW9uIChjaGFyKSB7XG4gICAgdmFyIGMgPSBjaGFyLmNoYXJDb2RlQXQoMCk7XG4gICAgaWYgKGMgPT09IDEyNykgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChjIDw9IDMxKSB7XG4gICAgICBpZiAoYyA9PT0gMTAgfHwgYyA9PT0gMTMpIHJldHVybiB0cnVlO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSk7XG4gIHJldHVybiBjaGFycy5qb2luKFwiXCIpO1xufVxuXG5leHBvcnRzLndoaXRlTGlzdCA9IGdldERlZmF1bHRXaGl0ZUxpc3QoKTtcbmV4cG9ydHMuZ2V0RGVmYXVsdFdoaXRlTGlzdCA9IGdldERlZmF1bHRXaGl0ZUxpc3Q7XG5leHBvcnRzLm9uVGFnID0gb25UYWc7XG5leHBvcnRzLm9uSWdub3JlVGFnID0gb25JZ25vcmVUYWc7XG5leHBvcnRzLm9uVGFnQXR0ciA9IG9uVGFnQXR0cjtcbmV4cG9ydHMub25JZ25vcmVUYWdBdHRyID0gb25JZ25vcmVUYWdBdHRyO1xuZXhwb3J0cy5zYWZlQXR0clZhbHVlID0gc2FmZUF0dHJWYWx1ZTtcbmV4cG9ydHMuZXNjYXBlSHRtbCA9IGVzY2FwZUh0bWw7XG5leHBvcnRzLmVzY2FwZVF1b3RlID0gZXNjYXBlUXVvdGU7XG5leHBvcnRzLnVuZXNjYXBlUXVvdGUgPSB1bmVzY2FwZVF1b3RlO1xuZXhwb3J0cy5lc2NhcGVIdG1sRW50aXRpZXMgPSBlc2NhcGVIdG1sRW50aXRpZXM7XG5leHBvcnRzLmVzY2FwZURhbmdlckh0bWw1RW50aXRpZXMgPSBlc2NhcGVEYW5nZXJIdG1sNUVudGl0aWVzO1xuZXhwb3J0cy5jbGVhck5vblByaW50YWJsZUNoYXJhY3RlciA9IGNsZWFyTm9uUHJpbnRhYmxlQ2hhcmFjdGVyO1xuZXhwb3J0cy5mcmllbmRseUF0dHJWYWx1ZSA9IGZyaWVuZGx5QXR0clZhbHVlO1xuZXhwb3J0cy5lc2NhcGVBdHRyVmFsdWUgPSBlc2NhcGVBdHRyVmFsdWU7XG5leHBvcnRzLm9uSWdub3JlVGFnU3RyaXBBbGwgPSBvbklnbm9yZVRhZ1N0cmlwQWxsO1xuZXhwb3J0cy5TdHJpcFRhZ0JvZHkgPSBTdHJpcFRhZ0JvZHk7XG5leHBvcnRzLnN0cmlwQ29tbWVudFRhZyA9IHN0cmlwQ29tbWVudFRhZztcbmV4cG9ydHMuc3RyaXBCbGFua0NoYXIgPSBzdHJpcEJsYW5rQ2hhcjtcbmV4cG9ydHMuY3NzRmlsdGVyID0gZGVmYXVsdENTU0ZpbHRlcjtcbmV4cG9ydHMuZ2V0RGVmYXVsdENTU1doaXRlTGlzdCA9IGdldERlZmF1bHRDU1NXaGl0ZUxpc3Q7XG4iLCIvKipcbiAqIHhzc1xuICpcbiAqIEBhdXRob3IgWm9uZ21pbiBMZWk8bGVpem9uZ21pbkBnbWFpbC5jb20+XG4gKi9cblxudmFyIERFRkFVTFQgPSByZXF1aXJlKFwiLi9kZWZhdWx0XCIpO1xudmFyIHBhcnNlciA9IHJlcXVpcmUoXCIuL3BhcnNlclwiKTtcbnZhciBGaWx0ZXJYU1MgPSByZXF1aXJlKFwiLi94c3NcIik7XG5cbi8qKlxuICogZmlsdGVyIHhzcyBmdW5jdGlvblxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBodG1sXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyB7IHdoaXRlTGlzdCwgb25UYWcsIG9uVGFnQXR0ciwgb25JZ25vcmVUYWcsIG9uSWdub3JlVGFnQXR0ciwgc2FmZUF0dHJWYWx1ZSwgZXNjYXBlSHRtbCB9XG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGZpbHRlclhTUyhodG1sLCBvcHRpb25zKSB7XG4gIHZhciB4c3MgPSBuZXcgRmlsdGVyWFNTKG9wdGlvbnMpO1xuICByZXR1cm4geHNzLnByb2Nlc3MoaHRtbCk7XG59XG5cbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGZpbHRlclhTUztcbmV4cG9ydHMuZmlsdGVyWFNTID0gZmlsdGVyWFNTO1xuZXhwb3J0cy5GaWx0ZXJYU1MgPSBGaWx0ZXJYU1M7XG5mb3IgKHZhciBpIGluIERFRkFVTFQpIGV4cG9ydHNbaV0gPSBERUZBVUxUW2ldO1xuZm9yICh2YXIgaSBpbiBwYXJzZXIpIGV4cG9ydHNbaV0gPSBwYXJzZXJbaV07XG5cbi8vIHVzaW5nIGB4c3NgIG9uIHRoZSBicm93c2VyLCBvdXRwdXQgYGZpbHRlclhTU2AgdG8gdGhlIGdsb2JhbHNcbmlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gIHdpbmRvdy5maWx0ZXJYU1MgPSBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gdXNpbmcgYHhzc2Agb24gdGhlIFdlYldvcmtlciwgb3V0cHV0IGBmaWx0ZXJYU1NgIHRvIHRoZSBnbG9iYWxzXG5mdW5jdGlvbiBpc1dvcmtlckVudigpIHtcbiAgcmV0dXJuIChcbiAgICB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgIHR5cGVvZiBEZWRpY2F0ZWRXb3JrZXJHbG9iYWxTY29wZSAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgIHNlbGYgaW5zdGFuY2VvZiBEZWRpY2F0ZWRXb3JrZXJHbG9iYWxTY29wZVxuICApO1xufVxuaWYgKGlzV29ya2VyRW52KCkpIHtcbiAgc2VsZi5maWx0ZXJYU1MgPSBtb2R1bGUuZXhwb3J0cztcbn1cbiIsIi8qKlxuICogU2ltcGxlIEhUTUwgUGFyc2VyXG4gKlxuICogQGF1dGhvciBab25nbWluIExlaTxsZWl6b25nbWluQGdtYWlsLmNvbT5cbiAqL1xuXG52YXIgXyA9IHJlcXVpcmUoXCIuL3V0aWxcIik7XG5cbi8qKlxuICogZ2V0IHRhZyBuYW1lXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGh0bWwgZS5nLiAnPGEgaGVmPVwiI1wiPidcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZ2V0VGFnTmFtZShodG1sKSB7XG4gIHZhciBpID0gXy5zcGFjZUluZGV4KGh0bWwpO1xuICBpZiAoaSA9PT0gLTEpIHtcbiAgICB2YXIgdGFnTmFtZSA9IGh0bWwuc2xpY2UoMSwgLTEpO1xuICB9IGVsc2Uge1xuICAgIHZhciB0YWdOYW1lID0gaHRtbC5zbGljZSgxLCBpICsgMSk7XG4gIH1cbiAgdGFnTmFtZSA9IF8udHJpbSh0YWdOYW1lKS50b0xvd2VyQ2FzZSgpO1xuICBpZiAodGFnTmFtZS5zbGljZSgwLCAxKSA9PT0gXCIvXCIpIHRhZ05hbWUgPSB0YWdOYW1lLnNsaWNlKDEpO1xuICBpZiAodGFnTmFtZS5zbGljZSgtMSkgPT09IFwiL1wiKSB0YWdOYW1lID0gdGFnTmFtZS5zbGljZSgwLCAtMSk7XG4gIHJldHVybiB0YWdOYW1lO1xufVxuXG4vKipcbiAqIGlzIGNsb3NlIHRhZz9cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaHRtbCDlpoLvvJonPGEgaGVmPVwiI1wiPidcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGlzQ2xvc2luZyhodG1sKSB7XG4gIHJldHVybiBodG1sLnNsaWNlKDAsIDIpID09PSBcIjwvXCI7XG59XG5cbi8qKlxuICogcGFyc2UgaW5wdXQgaHRtbCBhbmQgcmV0dXJucyBwcm9jZXNzZWQgaHRtbFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBodG1sXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvblRhZyBlLmcuIGZ1bmN0aW9uIChzb3VyY2VQb3NpdGlvbiwgcG9zaXRpb24sIHRhZywgaHRtbCwgaXNDbG9zaW5nKVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXNjYXBlSHRtbFxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5mdW5jdGlvbiBwYXJzZVRhZyhodG1sLCBvblRhZywgZXNjYXBlSHRtbCkge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICB2YXIgcmV0aHRtbCA9IFwiXCI7XG4gIHZhciBsYXN0UG9zID0gMDtcbiAgdmFyIHRhZ1N0YXJ0ID0gZmFsc2U7XG4gIHZhciBxdW90ZVN0YXJ0ID0gZmFsc2U7XG4gIHZhciBjdXJyZW50UG9zID0gMDtcbiAgdmFyIGxlbiA9IGh0bWwubGVuZ3RoO1xuICB2YXIgY3VycmVudFRhZ05hbWUgPSBcIlwiO1xuICB2YXIgY3VycmVudEh0bWwgPSBcIlwiO1xuXG4gIGNoYXJpdGVyYXRvcjogZm9yIChjdXJyZW50UG9zID0gMDsgY3VycmVudFBvcyA8IGxlbjsgY3VycmVudFBvcysrKSB7XG4gICAgdmFyIGMgPSBodG1sLmNoYXJBdChjdXJyZW50UG9zKTtcbiAgICBpZiAodGFnU3RhcnQgPT09IGZhbHNlKSB7XG4gICAgICBpZiAoYyA9PT0gXCI8XCIpIHtcbiAgICAgICAgdGFnU3RhcnQgPSBjdXJyZW50UG9zO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHF1b3RlU3RhcnQgPT09IGZhbHNlKSB7XG4gICAgICAgIGlmIChjID09PSBcIjxcIikge1xuICAgICAgICAgIHJldGh0bWwgKz0gZXNjYXBlSHRtbChodG1sLnNsaWNlKGxhc3RQb3MsIGN1cnJlbnRQb3MpKTtcbiAgICAgICAgICB0YWdTdGFydCA9IGN1cnJlbnRQb3M7XG4gICAgICAgICAgbGFzdFBvcyA9IGN1cnJlbnRQb3M7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGMgPT09IFwiPlwiKSB7XG4gICAgICAgICAgcmV0aHRtbCArPSBlc2NhcGVIdG1sKGh0bWwuc2xpY2UobGFzdFBvcywgdGFnU3RhcnQpKTtcbiAgICAgICAgICBjdXJyZW50SHRtbCA9IGh0bWwuc2xpY2UodGFnU3RhcnQsIGN1cnJlbnRQb3MgKyAxKTtcbiAgICAgICAgICBjdXJyZW50VGFnTmFtZSA9IGdldFRhZ05hbWUoY3VycmVudEh0bWwpO1xuICAgICAgICAgIHJldGh0bWwgKz0gb25UYWcoXG4gICAgICAgICAgICB0YWdTdGFydCxcbiAgICAgICAgICAgIHJldGh0bWwubGVuZ3RoLFxuICAgICAgICAgICAgY3VycmVudFRhZ05hbWUsXG4gICAgICAgICAgICBjdXJyZW50SHRtbCxcbiAgICAgICAgICAgIGlzQ2xvc2luZyhjdXJyZW50SHRtbClcbiAgICAgICAgICApO1xuICAgICAgICAgIGxhc3RQb3MgPSBjdXJyZW50UG9zICsgMTtcbiAgICAgICAgICB0YWdTdGFydCA9IGZhbHNlO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjID09PSAnXCInIHx8IGMgPT09IFwiJ1wiKSB7XG4gICAgICAgICAgdmFyIGkgPSAxO1xuICAgICAgICAgIHZhciBpYyA9IGh0bWwuY2hhckF0KGN1cnJlbnRQb3MgLSBpKTtcblxuICAgICAgICAgIHdoaWxlIChpYy50cmltKCkgPT09IFwiXCIgfHwgaWMgPT09IFwiPVwiKSB7XG4gICAgICAgICAgICBpZiAoaWMgPT09IFwiPVwiKSB7XG4gICAgICAgICAgICAgIHF1b3RlU3RhcnQgPSBjO1xuICAgICAgICAgICAgICBjb250aW51ZSBjaGFyaXRlcmF0b3I7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpYyA9IGh0bWwuY2hhckF0KGN1cnJlbnRQb3MgLSArK2kpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGMgPT09IHF1b3RlU3RhcnQpIHtcbiAgICAgICAgICBxdW90ZVN0YXJ0ID0gZmFsc2U7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgaWYgKGxhc3RQb3MgPCBodG1sLmxlbmd0aCkge1xuICAgIHJldGh0bWwgKz0gZXNjYXBlSHRtbChodG1sLnN1YnN0cihsYXN0UG9zKSk7XG4gIH1cblxuICByZXR1cm4gcmV0aHRtbDtcbn1cblxudmFyIFJFR0VYUF9JTExFR0FMX0FUVFJfTkFNRSA9IC9bXmEtekEtWjAtOV86XFwuXFwtXS9naW07XG5cbi8qKlxuICogcGFyc2UgaW5wdXQgYXR0cmlidXRlcyBhbmQgcmV0dXJucyBwcm9jZXNzZWQgYXR0cmlidXRlc1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBodG1sIGUuZy4gYGhyZWY9XCIjXCIgdGFyZ2V0PVwiX2JsYW5rXCJgXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvbkF0dHIgZS5nLiBgZnVuY3Rpb24gKG5hbWUsIHZhbHVlKWBcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZnVuY3Rpb24gcGFyc2VBdHRyKGh0bWwsIG9uQXR0cikge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICB2YXIgbGFzdFBvcyA9IDA7XG4gIHZhciByZXRBdHRycyA9IFtdO1xuICB2YXIgdG1wTmFtZSA9IGZhbHNlO1xuICB2YXIgbGVuID0gaHRtbC5sZW5ndGg7XG5cbiAgZnVuY3Rpb24gYWRkQXR0cihuYW1lLCB2YWx1ZSkge1xuICAgIG5hbWUgPSBfLnRyaW0obmFtZSk7XG4gICAgbmFtZSA9IG5hbWUucmVwbGFjZShSRUdFWFBfSUxMRUdBTF9BVFRSX05BTUUsIFwiXCIpLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKG5hbWUubGVuZ3RoIDwgMSkgcmV0dXJuO1xuICAgIHZhciByZXQgPSBvbkF0dHIobmFtZSwgdmFsdWUgfHwgXCJcIik7XG4gICAgaWYgKHJldCkgcmV0QXR0cnMucHVzaChyZXQpO1xuICB9XG5cbiAgLy8g6YCQ5Liq5YiG5p6Q5a2X56ymXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICB2YXIgYyA9IGh0bWwuY2hhckF0KGkpO1xuICAgIHZhciB2LCBqO1xuICAgIGlmICh0bXBOYW1lID09PSBmYWxzZSAmJiBjID09PSBcIj1cIikge1xuICAgICAgdG1wTmFtZSA9IGh0bWwuc2xpY2UobGFzdFBvcywgaSk7XG4gICAgICBsYXN0UG9zID0gaSArIDE7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgaWYgKHRtcE5hbWUgIT09IGZhbHNlKSB7XG4gICAgICBpZiAoXG4gICAgICAgIGkgPT09IGxhc3RQb3MgJiZcbiAgICAgICAgKGMgPT09ICdcIicgfHwgYyA9PT0gXCInXCIpICYmXG4gICAgICAgIGh0bWwuY2hhckF0KGkgLSAxKSA9PT0gXCI9XCJcbiAgICAgICkge1xuICAgICAgICBqID0gaHRtbC5pbmRleE9mKGMsIGkgKyAxKTtcbiAgICAgICAgaWYgKGogPT09IC0xKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdiA9IF8udHJpbShodG1sLnNsaWNlKGxhc3RQb3MgKyAxLCBqKSk7XG4gICAgICAgICAgYWRkQXR0cih0bXBOYW1lLCB2KTtcbiAgICAgICAgICB0bXBOYW1lID0gZmFsc2U7XG4gICAgICAgICAgaSA9IGo7XG4gICAgICAgICAgbGFzdFBvcyA9IGkgKyAxO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmICgvXFxzfFxcbnxcXHQvLnRlc3QoYykpIHtcbiAgICAgIGh0bWwgPSBodG1sLnJlcGxhY2UoL1xcc3xcXG58XFx0L2csIFwiIFwiKTtcbiAgICAgIGlmICh0bXBOYW1lID09PSBmYWxzZSkge1xuICAgICAgICBqID0gZmluZE5leHRFcXVhbChodG1sLCBpKTtcbiAgICAgICAgaWYgKGogPT09IC0xKSB7XG4gICAgICAgICAgdiA9IF8udHJpbShodG1sLnNsaWNlKGxhc3RQb3MsIGkpKTtcbiAgICAgICAgICBhZGRBdHRyKHYpO1xuICAgICAgICAgIHRtcE5hbWUgPSBmYWxzZTtcbiAgICAgICAgICBsYXN0UG9zID0gaSArIDE7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaSA9IGogLSAxO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBqID0gZmluZEJlZm9yZUVxdWFsKGh0bWwsIGkgLSAxKTtcbiAgICAgICAgaWYgKGogPT09IC0xKSB7XG4gICAgICAgICAgdiA9IF8udHJpbShodG1sLnNsaWNlKGxhc3RQb3MsIGkpKTtcbiAgICAgICAgICB2ID0gc3RyaXBRdW90ZVdyYXAodik7XG4gICAgICAgICAgYWRkQXR0cih0bXBOYW1lLCB2KTtcbiAgICAgICAgICB0bXBOYW1lID0gZmFsc2U7XG4gICAgICAgICAgbGFzdFBvcyA9IGkgKyAxO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKGxhc3RQb3MgPCBodG1sLmxlbmd0aCkge1xuICAgIGlmICh0bXBOYW1lID09PSBmYWxzZSkge1xuICAgICAgYWRkQXR0cihodG1sLnNsaWNlKGxhc3RQb3MpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYWRkQXR0cih0bXBOYW1lLCBzdHJpcFF1b3RlV3JhcChfLnRyaW0oaHRtbC5zbGljZShsYXN0UG9zKSkpKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gXy50cmltKHJldEF0dHJzLmpvaW4oXCIgXCIpKTtcbn1cblxuZnVuY3Rpb24gZmluZE5leHRFcXVhbChzdHIsIGkpIHtcbiAgZm9yICg7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgYyA9IHN0cltpXTtcbiAgICBpZiAoYyA9PT0gXCIgXCIpIGNvbnRpbnVlO1xuICAgIGlmIChjID09PSBcIj1cIikgcmV0dXJuIGk7XG4gICAgcmV0dXJuIC0xO1xuICB9XG59XG5cbmZ1bmN0aW9uIGZpbmRCZWZvcmVFcXVhbChzdHIsIGkpIHtcbiAgZm9yICg7IGkgPiAwOyBpLS0pIHtcbiAgICB2YXIgYyA9IHN0cltpXTtcbiAgICBpZiAoYyA9PT0gXCIgXCIpIGNvbnRpbnVlO1xuICAgIGlmIChjID09PSBcIj1cIikgcmV0dXJuIGk7XG4gICAgcmV0dXJuIC0xO1xuICB9XG59XG5cbmZ1bmN0aW9uIGlzUXVvdGVXcmFwU3RyaW5nKHRleHQpIHtcbiAgaWYgKFxuICAgICh0ZXh0WzBdID09PSAnXCInICYmIHRleHRbdGV4dC5sZW5ndGggLSAxXSA9PT0gJ1wiJykgfHxcbiAgICAodGV4dFswXSA9PT0gXCInXCIgJiYgdGV4dFt0ZXh0Lmxlbmd0aCAtIDFdID09PSBcIidcIilcbiAgKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmZ1bmN0aW9uIHN0cmlwUXVvdGVXcmFwKHRleHQpIHtcbiAgaWYgKGlzUXVvdGVXcmFwU3RyaW5nKHRleHQpKSB7XG4gICAgcmV0dXJuIHRleHQuc3Vic3RyKDEsIHRleHQubGVuZ3RoIC0gMik7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHRleHQ7XG4gIH1cbn1cblxuZXhwb3J0cy5wYXJzZVRhZyA9IHBhcnNlVGFnO1xuZXhwb3J0cy5wYXJzZUF0dHIgPSBwYXJzZUF0dHI7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgaW5kZXhPZjogZnVuY3Rpb24gKGFyciwgaXRlbSkge1xuICAgIHZhciBpLCBqO1xuICAgIGlmIChBcnJheS5wcm90b3R5cGUuaW5kZXhPZikge1xuICAgICAgcmV0dXJuIGFyci5pbmRleE9mKGl0ZW0pO1xuICAgIH1cbiAgICBmb3IgKGkgPSAwLCBqID0gYXJyLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuICAgICAgaWYgKGFycltpXSA9PT0gaXRlbSkge1xuICAgICAgICByZXR1cm4gaTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIC0xO1xuICB9LFxuICBmb3JFYWNoOiBmdW5jdGlvbiAoYXJyLCBmbiwgc2NvcGUpIHtcbiAgICB2YXIgaSwgajtcbiAgICBpZiAoQXJyYXkucHJvdG90eXBlLmZvckVhY2gpIHtcbiAgICAgIHJldHVybiBhcnIuZm9yRWFjaChmbiwgc2NvcGUpO1xuICAgIH1cbiAgICBmb3IgKGkgPSAwLCBqID0gYXJyLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuICAgICAgZm4uY2FsbChzY29wZSwgYXJyW2ldLCBpLCBhcnIpO1xuICAgIH1cbiAgfSxcbiAgdHJpbTogZnVuY3Rpb24gKHN0cikge1xuICAgIGlmIChTdHJpbmcucHJvdG90eXBlLnRyaW0pIHtcbiAgICAgIHJldHVybiBzdHIudHJpbSgpO1xuICAgIH1cbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoLyheXFxzKil8KFxccyokKS9nLCBcIlwiKTtcbiAgfSxcbiAgc3BhY2VJbmRleDogZnVuY3Rpb24gKHN0cikge1xuICAgIHZhciByZWcgPSAvXFxzfFxcbnxcXHQvO1xuICAgIHZhciBtYXRjaCA9IHJlZy5leGVjKHN0cik7XG4gICAgcmV0dXJuIG1hdGNoID8gbWF0Y2guaW5kZXggOiAtMTtcbiAgfSxcbn07XG4iLCIvKipcbiAqIGZpbHRlciB4c3NcbiAqXG4gKiBAYXV0aG9yIFpvbmdtaW4gTGVpPGxlaXpvbmdtaW5AZ21haWwuY29tPlxuICovXG5cbnZhciBGaWx0ZXJDU1MgPSByZXF1aXJlKFwiY3NzZmlsdGVyXCIpLkZpbHRlckNTUztcbnZhciBERUZBVUxUID0gcmVxdWlyZShcIi4vZGVmYXVsdFwiKTtcbnZhciBwYXJzZXIgPSByZXF1aXJlKFwiLi9wYXJzZXJcIik7XG52YXIgcGFyc2VUYWcgPSBwYXJzZXIucGFyc2VUYWc7XG52YXIgcGFyc2VBdHRyID0gcGFyc2VyLnBhcnNlQXR0cjtcbnZhciBfID0gcmVxdWlyZShcIi4vdXRpbFwiKTtcblxuLyoqXG4gKiByZXR1cm5zIGB0cnVlYCBpZiB0aGUgaW5wdXQgdmFsdWUgaXMgYHVuZGVmaW5lZGAgb3IgYG51bGxgXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaXNOdWxsKG9iaikge1xuICByZXR1cm4gb2JqID09PSB1bmRlZmluZWQgfHwgb2JqID09PSBudWxsO1xufVxuXG4vKipcbiAqIGdldCBhdHRyaWJ1dGVzIGZvciBhIHRhZ1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBodG1sXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiAgIC0ge1N0cmluZ30gaHRtbFxuICogICAtIHtCb29sZWFufSBjbG9zaW5nXG4gKi9cbmZ1bmN0aW9uIGdldEF0dHJzKGh0bWwpIHtcbiAgdmFyIGkgPSBfLnNwYWNlSW5kZXgoaHRtbCk7XG4gIGlmIChpID09PSAtMSkge1xuICAgIHJldHVybiB7XG4gICAgICBodG1sOiBcIlwiLFxuICAgICAgY2xvc2luZzogaHRtbFtodG1sLmxlbmd0aCAtIDJdID09PSBcIi9cIixcbiAgICB9O1xuICB9XG4gIGh0bWwgPSBfLnRyaW0oaHRtbC5zbGljZShpICsgMSwgLTEpKTtcbiAgdmFyIGlzQ2xvc2luZyA9IGh0bWxbaHRtbC5sZW5ndGggLSAxXSA9PT0gXCIvXCI7XG4gIGlmIChpc0Nsb3NpbmcpIGh0bWwgPSBfLnRyaW0oaHRtbC5zbGljZSgwLCAtMSkpO1xuICByZXR1cm4ge1xuICAgIGh0bWw6IGh0bWwsXG4gICAgY2xvc2luZzogaXNDbG9zaW5nLFxuICB9O1xufVxuXG4vKipcbiAqIHNoYWxsb3cgY29weVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuZnVuY3Rpb24gc2hhbGxvd0NvcHlPYmplY3Qob2JqKSB7XG4gIHZhciByZXQgPSB7fTtcbiAgZm9yICh2YXIgaSBpbiBvYmopIHtcbiAgICByZXRbaV0gPSBvYmpbaV07XG4gIH1cbiAgcmV0dXJuIHJldDtcbn1cblxuLyoqXG4gKiBGaWx0ZXJYU1MgY2xhc3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogICAgICAgIHdoaXRlTGlzdCwgb25UYWcsIG9uVGFnQXR0ciwgb25JZ25vcmVUYWcsXG4gKiAgICAgICAgb25JZ25vcmVUYWdBdHRyLCBzYWZlQXR0clZhbHVlLCBlc2NhcGVIdG1sXG4gKiAgICAgICAgc3RyaXBJZ25vcmVUYWdCb2R5LCBhbGxvd0NvbW1lbnRUYWcsIHN0cmlwQmxhbmtDaGFyXG4gKiAgICAgICAgY3Nze3doaXRlTGlzdCwgb25BdHRyLCBvbklnbm9yZUF0dHJ9IGBjc3M9ZmFsc2VgIG1lYW5zIGRvbid0IHVzZSBgY3NzZmlsdGVyYFxuICovXG5mdW5jdGlvbiBGaWx0ZXJYU1Mob3B0aW9ucykge1xuICBvcHRpb25zID0gc2hhbGxvd0NvcHlPYmplY3Qob3B0aW9ucyB8fCB7fSk7XG5cbiAgaWYgKG9wdGlvbnMuc3RyaXBJZ25vcmVUYWcpIHtcbiAgICBpZiAob3B0aW9ucy5vbklnbm9yZVRhZykge1xuICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgJ05vdGVzOiBjYW5ub3QgdXNlIHRoZXNlIHR3byBvcHRpb25zIFwic3RyaXBJZ25vcmVUYWdcIiBhbmQgXCJvbklnbm9yZVRhZ1wiIGF0IHRoZSBzYW1lIHRpbWUnXG4gICAgICApO1xuICAgIH1cbiAgICBvcHRpb25zLm9uSWdub3JlVGFnID0gREVGQVVMVC5vbklnbm9yZVRhZ1N0cmlwQWxsO1xuICB9XG5cbiAgb3B0aW9ucy53aGl0ZUxpc3QgPSBvcHRpb25zLndoaXRlTGlzdCB8fCBERUZBVUxULndoaXRlTGlzdDtcbiAgb3B0aW9ucy5vblRhZyA9IG9wdGlvbnMub25UYWcgfHwgREVGQVVMVC5vblRhZztcbiAgb3B0aW9ucy5vblRhZ0F0dHIgPSBvcHRpb25zLm9uVGFnQXR0ciB8fCBERUZBVUxULm9uVGFnQXR0cjtcbiAgb3B0aW9ucy5vbklnbm9yZVRhZyA9IG9wdGlvbnMub25JZ25vcmVUYWcgfHwgREVGQVVMVC5vbklnbm9yZVRhZztcbiAgb3B0aW9ucy5vbklnbm9yZVRhZ0F0dHIgPSBvcHRpb25zLm9uSWdub3JlVGFnQXR0ciB8fCBERUZBVUxULm9uSWdub3JlVGFnQXR0cjtcbiAgb3B0aW9ucy5zYWZlQXR0clZhbHVlID0gb3B0aW9ucy5zYWZlQXR0clZhbHVlIHx8IERFRkFVTFQuc2FmZUF0dHJWYWx1ZTtcbiAgb3B0aW9ucy5lc2NhcGVIdG1sID0gb3B0aW9ucy5lc2NhcGVIdG1sIHx8IERFRkFVTFQuZXNjYXBlSHRtbDtcbiAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcblxuICBpZiAob3B0aW9ucy5jc3MgPT09IGZhbHNlKSB7XG4gICAgdGhpcy5jc3NGaWx0ZXIgPSBmYWxzZTtcbiAgfSBlbHNlIHtcbiAgICBvcHRpb25zLmNzcyA9IG9wdGlvbnMuY3NzIHx8IHt9O1xuICAgIHRoaXMuY3NzRmlsdGVyID0gbmV3IEZpbHRlckNTUyhvcHRpb25zLmNzcyk7XG4gIH1cbn1cblxuLyoqXG4gKiBzdGFydCBwcm9jZXNzIGFuZCByZXR1cm5zIHJlc3VsdFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBodG1sXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbkZpbHRlclhTUy5wcm90b3R5cGUucHJvY2VzcyA9IGZ1bmN0aW9uIChodG1sKSB7XG4gIC8vIGNvbXBhdGlibGUgd2l0aCB0aGUgaW5wdXRcbiAgaHRtbCA9IGh0bWwgfHwgXCJcIjtcbiAgaHRtbCA9IGh0bWwudG9TdHJpbmcoKTtcbiAgaWYgKCFodG1sKSByZXR1cm4gXCJcIjtcblxuICB2YXIgbWUgPSB0aGlzO1xuICB2YXIgb3B0aW9ucyA9IG1lLm9wdGlvbnM7XG4gIHZhciB3aGl0ZUxpc3QgPSBvcHRpb25zLndoaXRlTGlzdDtcbiAgdmFyIG9uVGFnID0gb3B0aW9ucy5vblRhZztcbiAgdmFyIG9uSWdub3JlVGFnID0gb3B0aW9ucy5vbklnbm9yZVRhZztcbiAgdmFyIG9uVGFnQXR0ciA9IG9wdGlvbnMub25UYWdBdHRyO1xuICB2YXIgb25JZ25vcmVUYWdBdHRyID0gb3B0aW9ucy5vbklnbm9yZVRhZ0F0dHI7XG4gIHZhciBzYWZlQXR0clZhbHVlID0gb3B0aW9ucy5zYWZlQXR0clZhbHVlO1xuICB2YXIgZXNjYXBlSHRtbCA9IG9wdGlvbnMuZXNjYXBlSHRtbDtcbiAgdmFyIGNzc0ZpbHRlciA9IG1lLmNzc0ZpbHRlcjtcblxuICAvLyByZW1vdmUgaW52aXNpYmxlIGNoYXJhY3RlcnNcbiAgaWYgKG9wdGlvbnMuc3RyaXBCbGFua0NoYXIpIHtcbiAgICBodG1sID0gREVGQVVMVC5zdHJpcEJsYW5rQ2hhcihodG1sKTtcbiAgfVxuXG4gIC8vIHJlbW92ZSBodG1sIGNvbW1lbnRzXG4gIGlmICghb3B0aW9ucy5hbGxvd0NvbW1lbnRUYWcpIHtcbiAgICBodG1sID0gREVGQVVMVC5zdHJpcENvbW1lbnRUYWcoaHRtbCk7XG4gIH1cblxuICAvLyBpZiBlbmFibGUgc3RyaXBJZ25vcmVUYWdCb2R5XG4gIHZhciBzdHJpcElnbm9yZVRhZ0JvZHkgPSBmYWxzZTtcbiAgaWYgKG9wdGlvbnMuc3RyaXBJZ25vcmVUYWdCb2R5KSB7XG4gICAgdmFyIHN0cmlwSWdub3JlVGFnQm9keSA9IERFRkFVTFQuU3RyaXBUYWdCb2R5KFxuICAgICAgb3B0aW9ucy5zdHJpcElnbm9yZVRhZ0JvZHksXG4gICAgICBvbklnbm9yZVRhZ1xuICAgICk7XG4gICAgb25JZ25vcmVUYWcgPSBzdHJpcElnbm9yZVRhZ0JvZHkub25JZ25vcmVUYWc7XG4gIH1cblxuICB2YXIgcmV0SHRtbCA9IHBhcnNlVGFnKFxuICAgIGh0bWwsXG4gICAgZnVuY3Rpb24gKHNvdXJjZVBvc2l0aW9uLCBwb3NpdGlvbiwgdGFnLCBodG1sLCBpc0Nsb3NpbmcpIHtcbiAgICAgIHZhciBpbmZvID0ge1xuICAgICAgICBzb3VyY2VQb3NpdGlvbjogc291cmNlUG9zaXRpb24sXG4gICAgICAgIHBvc2l0aW9uOiBwb3NpdGlvbixcbiAgICAgICAgaXNDbG9zaW5nOiBpc0Nsb3NpbmcsXG4gICAgICAgIGlzV2hpdGU6IHdoaXRlTGlzdC5oYXNPd25Qcm9wZXJ0eSh0YWcpLFxuICAgICAgfTtcblxuICAgICAgLy8gY2FsbCBgb25UYWcoKWBcbiAgICAgIHZhciByZXQgPSBvblRhZyh0YWcsIGh0bWwsIGluZm8pO1xuICAgICAgaWYgKCFpc051bGwocmV0KSkgcmV0dXJuIHJldDtcblxuICAgICAgaWYgKGluZm8uaXNXaGl0ZSkge1xuICAgICAgICBpZiAoaW5mby5pc0Nsb3NpbmcpIHtcbiAgICAgICAgICByZXR1cm4gXCI8L1wiICsgdGFnICsgXCI+XCI7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgYXR0cnMgPSBnZXRBdHRycyhodG1sKTtcbiAgICAgICAgdmFyIHdoaXRlQXR0ckxpc3QgPSB3aGl0ZUxpc3RbdGFnXTtcbiAgICAgICAgdmFyIGF0dHJzSHRtbCA9IHBhcnNlQXR0cihhdHRycy5odG1sLCBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcbiAgICAgICAgICAvLyBjYWxsIGBvblRhZ0F0dHIoKWBcbiAgICAgICAgICB2YXIgaXNXaGl0ZUF0dHIgPSBfLmluZGV4T2Yod2hpdGVBdHRyTGlzdCwgbmFtZSkgIT09IC0xO1xuICAgICAgICAgIHZhciByZXQgPSBvblRhZ0F0dHIodGFnLCBuYW1lLCB2YWx1ZSwgaXNXaGl0ZUF0dHIpO1xuICAgICAgICAgIGlmICghaXNOdWxsKHJldCkpIHJldHVybiByZXQ7XG5cbiAgICAgICAgICBpZiAoaXNXaGl0ZUF0dHIpIHtcbiAgICAgICAgICAgIC8vIGNhbGwgYHNhZmVBdHRyVmFsdWUoKWBcbiAgICAgICAgICAgIHZhbHVlID0gc2FmZUF0dHJWYWx1ZSh0YWcsIG5hbWUsIHZhbHVlLCBjc3NGaWx0ZXIpO1xuICAgICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICAgIHJldHVybiBuYW1lICsgJz1cIicgKyB2YWx1ZSArICdcIic7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4gbmFtZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gY2FsbCBgb25JZ25vcmVUYWdBdHRyKClgXG4gICAgICAgICAgICB2YXIgcmV0ID0gb25JZ25vcmVUYWdBdHRyKHRhZywgbmFtZSwgdmFsdWUsIGlzV2hpdGVBdHRyKTtcbiAgICAgICAgICAgIGlmICghaXNOdWxsKHJldCkpIHJldHVybiByZXQ7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBidWlsZCBuZXcgdGFnIGh0bWxcbiAgICAgICAgdmFyIGh0bWwgPSBcIjxcIiArIHRhZztcbiAgICAgICAgaWYgKGF0dHJzSHRtbCkgaHRtbCArPSBcIiBcIiArIGF0dHJzSHRtbDtcbiAgICAgICAgaWYgKGF0dHJzLmNsb3NpbmcpIGh0bWwgKz0gXCIgL1wiO1xuICAgICAgICBodG1sICs9IFwiPlwiO1xuICAgICAgICByZXR1cm4gaHRtbDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGNhbGwgYG9uSWdub3JlVGFnKClgXG4gICAgICAgIHZhciByZXQgPSBvbklnbm9yZVRhZyh0YWcsIGh0bWwsIGluZm8pO1xuICAgICAgICBpZiAoIWlzTnVsbChyZXQpKSByZXR1cm4gcmV0O1xuICAgICAgICByZXR1cm4gZXNjYXBlSHRtbChodG1sKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGVzY2FwZUh0bWxcbiAgKTtcblxuICAvLyBpZiBlbmFibGUgc3RyaXBJZ25vcmVUYWdCb2R5XG4gIGlmIChzdHJpcElnbm9yZVRhZ0JvZHkpIHtcbiAgICByZXRIdG1sID0gc3RyaXBJZ25vcmVUYWdCb2R5LnJlbW92ZShyZXRIdG1sKTtcbiAgfVxuXG4gIHJldHVybiByZXRIdG1sO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBGaWx0ZXJYU1M7XG4iLCJjb25zdCBtZW1vcnkgPSByZXF1aXJlKCcuL2xpYi9tZW1vcnknKVxuY29uc3QgZm9ybWF0WHNzID0gcmVxdWlyZShcIi4vbGliL2Zvcm1hdFhzc1wiKVxuY29uc3QgY29va2llID0gcmVxdWlyZShcIi4vbGliL2Nvb2tpZVwiKVxuY29uc3QgdXRpbCA9IHJlcXVpcmUoXCIuL2xpYi91dGlsXCIpXG5cbmV4cG9ydHMuaXNNb2JpbGVPck1haWwgPSB1dGlsLmlzTW9iaWxlT3JNYWlsO1xuZXhwb3J0cy5pc01vYmlsZSA9IHV0aWwuaXNNb2JpbGU7XG5leHBvcnRzLmlzTWFpbCA9IHV0aWwuaXNNYWlsO1xuZXhwb3J0cy5tZW1vcnkgPSBtZW1vcnk7XG5leHBvcnRzLmZvcm1hdFhzcyA9IGZvcm1hdFhzcztcbmV4cG9ydHMuY29va2llID0gY29va2llO1xuZXhwb3J0cy5kZWJvdW5jZSA9IHV0aWwuZGVib3VuY2U7XG5leHBvcnRzLnRocm90dGxlID0gdXRpbC50aHJvdHRsZVxuLy/lsIbmlbTkuKrmqKHlnZflr7zlh7pcbm1vZHVsZS5leHBvcnRzLmpzYlV0aWwgPSB7XG4gICAgLi4udXRpbCwgZm9ybWF0WHNzLCBtZW1vcnksIGNvb2tpZVxufVxuIiwiLyoqXG4gKiBAZGVzY3JpcHRpb246Y29va2ll5Z+65pys566h55CGXG4gKi9cbmZ1bmN0aW9uIENvb2tpZSgpIHtcblxufVxuXG4vKipcbiAqIEBkZXNjcmlwdGlvbjrojrflj5blr7nlupTnmoRrZXlcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkga2V5XG4gKiBAcGFyYW0ge2FueXN9IHZhbHVlIOayoeacieaJvuWIsOaXtui/lOWbnueahOmihOiuvuWAvO+8jOm7mOiupGZhbHNlXG4gKiBAcmV0dXJuIHtzdHJpbmd8Qm9vbGVhbn0gc3RyaW5nIC8gZmFsc2VcbiAqL1xuQ29va2llLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoa2V5LCBkZWYgPSBmYWxzZSkge1xuICAgIGxldCBhcnIgPSBkb2N1bWVudC5jb29raWUuc3BsaXQoXCI7XCIpO1xuICAgIGZvciAobGV0IGl0ZW0gb2YgYXJyKSB7XG4gICAgICAgIGNvbnN0IGVsID0gaXRlbS5zcGxpdChcIj1cIik7XG4gICAgICAgIGlmIChlbFswXS50cmltKCkgPT09IGtleSkge1xuICAgICAgICAgICAgcmV0dXJuIGVsWzFdO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBkZWY7XG59XG4vKipcbiAqIEBkZXNjcmlwdGlvbjrorr7nva7lr7nlupTnmoRrZXkgdmFsdWVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkga2V5XG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUgdmFsdWVcbiAqIEBwYXJhbSB7RGF0ZX0gZXhwaXJlcyDov4fmnJ/ml7bpl7QgRGF0ZeWvueixoVxuICogQHJldHVybiB7Qm9vbGVhbn0gQm9vbGVhblxuICovXG5Db29raWUucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIChrZXksIHZhbHVlLCBleHBpcmVzID0gXCJcIikge1xuICAgIGlmIChrZXkudHJpbSgpID09IFwiXCIpIHJldHVybiBmYWxzZTtcbiAgICBkb2N1bWVudC5jb29raWUgPSBgJHtrZXl9PSR7dmFsdWV9O2V4cGlyZXM9JHtleHBpcmVzfWA7XG59XG4vKipcbiAqIEBkZXNjcmlwdGlvbjrliKDpmaTlr7nlupTnmoRrZXlcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkga2V5XG4gKiBAcmV0dXJuIHt2b2lkfSB2b2lkXG4gKi9cbkNvb2tpZS5wcm90b3R5cGUuZGVsID0gZnVuY3Rpb24gKGtleSkge1xuICAgIGRvY3VtZW50LmNvb2tpZSA9IGAke2tleX09MDsgcGF0aD0vOyBleHBpcmVzPSR7bmV3IERhdGUoMCkudG9VVENTdHJpbmcoKX1gXG59XG4vKipcbiAqIEBkZXNjcmlwdGlvbjrmuIXpmaTmnKzlnLDmiYDmnIljb29raWVcbiAqIEByZXR1cm4ge3ZvaWR9IHZvaWRcbiAqL1xuQ29va2llLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgbGlzdCA9IGRvY3VtZW50LmNvb2tpZS5tYXRjaCgvW14gPTtdKyg/PVxcPSkvZyk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMuZGVsKGxpc3RbaV0pO1xuICAgIH1cbiAgICBkb2N1bWVudC5jb29raWUgPSBgPTA7IHBhdGg9LzsgZXhwaXJlcz0ke25ldyBEYXRlKDApLnRvVVRDU3RyaW5nKCl9YFxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBDb29raWUoKVxuIiwiY29uc3QgeHNzID0gcmVxdWlyZShcInhzc1wiKTtcbi8qKlxuICogQGRlc2NyaXB0aW9uOnhzc+i/h+a7pFxuICogQHBhcmFtIHtzdHJpbmd9IEh0bWwg5a+M5paH5pys5YaF5a65XG4gKiBAcGFyYW0ge2FycmF5fSBmb3JtYXQg5YWB6K645pS+6KGM55qEaHRtbOagh+etvlxuICogQHBhcmFtIHthcnJheX0gYXR0ciDlhYHorrjmlL7ooYznmoTmoIfnrb7lsZ7mgKfmoIfnrb5cbiAqIEByZXR1cm4ge3N0cmluZ30gaHRtbFN0cmluZ1xuICovXG5mdW5jdGlvbiBmb3JtYXRYc3MoSHRtbCwgZm9ybWF0ID0gW10sIGF0dHIgPSBbXSl7XG4gICAgLy/lhYHorrjpgJrov4fnmoTmoIfnrb5cbiAgICBjb25zdCB0YWcgPSBbXG4gICAgICAgIFwicFwiLFxuICAgICAgICBcImFcIixcbiAgICAgICAgXCJpbWdcIixcbiAgICAgICAgXCJmb250XCIsXG4gICAgICAgIFwic3BhblwiLFxuICAgICAgICBcImJcIixcbiAgICAgICAgXCJibG9ja3F1b3RlXCIsXG4gICAgICAgIFwiY29kZVwiLFxuICAgICAgICBcImgxXCIsXG4gICAgICAgIFwiaDJcIixcbiAgICAgICAgXCJoM1wiLFxuICAgICAgICBcImg0XCIsXG4gICAgICAgIFwiaDVcIixcbiAgICAgICAgXCJoNlwiLFxuICAgICAgICBcImhyXCIsXG4gICAgICAgIFwiYnJcIixcbiAgICAgICAgXCJzXCIsXG4gICAgICAgIFwiaVwiLFxuICAgICAgICBcInVcIixcbiAgICAgICAgXCJzdHJpa2VcIixcbiAgICAgICAgXCJkaXZcIixcbiAgICAgICAgXCJzdHJvbmdcIixcbiAgICAgICAgXCJwcmVcIlxuICAgIF07XG4gICAgaWYgKGZvcm1hdC5sZW5ndGggPiAwKSB7XG4gICAgICAgIGZvcm1hdC5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgICAgIHRhZy5wdXNoKGVsKTtcbiAgICAgICAgfSlcbiAgICB9XG4gICAgLy/lhYHorrjkvb/nlKjnmoTlsZ7mgKdcbiAgICBjb25zdCBjYW4gPSBbXCJjb2xvclwiLCBcInNpemVcIiwgXCJzdHlsZVwiLCBcImhyZWZcIiwgXCJzcmNcIl07XG4gICAgaWYgKGF0dHIubGVuZ3RoID4gMCkge1xuICAgICAgICBhdHRyLm1hcChlID0+IHtcbiAgICAgICAgICAgIGNhbi5wdXNoKGUpXG4gICAgICAgIH0pXG4gICAgfVxuICAgIGxldCB0bXAgPSB7fTtcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGFnLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gdGFnW2luZGV4XTtcbiAgICAgICAgdG1wW2VsZW1lbnRdID0gY2FuO1xuICAgIH1cbiAgICBsZXQgdGV4dCA9IHhzcyhIdG1sLCB7XG4gICAgICAgIHdoaXRlTGlzdDogdG1wLFxuICAgIH0pO1xuICAgIHJldHVybiB0ZXh0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZvcm1hdFhzc1xuIiwiLyoqXG4gKiBAZGVzY3JpcHRpb246bG9jYWxTdG9yYWdl5YKo5a2Y566h55CGXG4gKiBAcmV0dXJucyB7TWVtb3J5fVxuICovXG5jbGFzcyBNZW1vcnkge1xuICAgIExvY2FsID0gbnVsbDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLkxvY2FsID0gbG9jYWxTdG9yYWdlIHx8IHdpbmRvdy5sb2NhbFN0b3JhZ2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uOiDorr7nva7mnKzlnLBsb2NhbFN0b3JhZ2XlgqjlrZhcbiAgICAgKiBAcGFyYW0geyp9IGtleSDplK5cbiAgICAgKiBAcGFyYW0ge09iamVjdHxTdHJpbmd9IHZhbHVlIOWAvFxuICAgICAqIEByZXR1cm4ge01lbW9yeX0gTWVtb3J5IOWPr+WunueOsOmTvuW8j+i/nue7reiwg+eUqFxuICAgICAqL1xuICAgIHNldChrZXksIHZhbHVlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgdmFsdWUgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5Mb2NhbC5zZXRJdGVtKGtleSwgdmFsdWUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb246IOiOt+WPlumUrlxuICAgICAqIEBwYXJhbSB7Kn0ga2V5XG4gICAgICogQHJldHVybiB7T2JqZWN0fFN0cmluZ30gdmFsdWUg6L+U5Zue5YC8XG4gICAgICovXG4gICAgZ2V0KGtleSkge1xuICAgICAgICBsZXQgaW5mbyA9IHRoaXMuTG9jYWwuZ2V0SXRlbShrZXkpO1xuICAgICAgICBpZiAoaW5mbyA9PT0gXCJcIiB8fCAhaW5mbykge1xuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuaXNPYmooaW5mbyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uOiDliKTmlq3lrZfnrKbkuLLmmK/kuI3mmK9qc29u5a+56LGhXG4gICAgICogQHBhcmFtIHsqfSBzdHJcbiAgICAgKiBAcmV0dXJuIHsqfVxuICAgICAqL1xuICAgIGlzT2JqKHN0cikge1xuICAgICAgICBpZiAodHlwZW9mIHN0ciA9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBvYmogPSBKU09OLnBhcnNlKHN0cik7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvYmogPT0gXCJvYmplY3RcIiAmJiBvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uOiDliKDpmaTmnKzlnLBsb2NhbFN0b3JhZ2XlgqjlrZhrZXlcbiAgICAgKiBAcGFyYW0geyp9IGtleVxuICAgICAqIEByZXR1cm4ge01lbW9yeX0gYm9vbGVhblxuICAgICAqL1xuICAgIGRlbChrZXkpIHtcbiAgICAgICAgdGhpcy5Mb2NhbC5yZW1vdmVJdGVtKGtleSk7XG4gICAgICAgIHJldHVybiB0aGlzOyAvL+i/lOWbnuiHqui6q++8jOWPr+S7peWunueOsOmTvuW8j+iwg+eUqE1lbW9yeSgpLmRlbChrZXkpLmRlbChrZXkpLnNldChrZXksdmFsdWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbjog5riF6Zmk5YWo6YOo5pys5ZywbG9jYWxTdG9yYWdl5YKo5a2YXG4gICAgICogQHJldHVybiB7TWVtb3J5fSBib29sZWFuXG4gICAgICovXG4gICAgY2xlYXIoKSB7XG4gICAgICAgIHRoaXMuTG9jYWwuY2xlYXIoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuXG52YXIgbWVtb3J5ID0gbmV3IE1lbW9yeSgpXG5tb2R1bGUuZXhwb3J0cyA9IG1lbW9yeTtcbiIsIi8qKlxuICogQGRlc2NyaXB0aW9uOumqjOivgeaYr+WQpuS4uuaJi+acuui0puWPt1xuICogQHBhcmFtIHtzdHJpbmd9IE1vYmlsZSDmiYvmnLrotKblj7dcbiAqIEByZXR1cm4ge0Jvb2xlYW59IEJvb2xlYW5cbiAqL1xuY29uc3QgaXNNb2JpbGUgPSAoTW9iaWxlID0gXCJcIikgPT4ge1xuICAgIHJldHVybiAvXjFbMzQ1Njc4OV1cXGR7OX0kLy50ZXN0KE1vYmlsZSk7XG59XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uOumqjOivgeaYr+WQpuS4uumCrueusVxuICogQHBhcmFtIHtzdHJpbmd9IE1haWwg6YKu566x6LSm5Y+3XG4gKiBAcmV0dXJuIHtCb29sZWFufSBCb29sZWFuXG4gKi9cbmNvbnN0IGlzTWFpbCA9IChNYWlsID0gXCJcIikgPT4ge1xuICAgIHJldHVybiAvXltBLVphLXowLTlcXHU0ZTAwLVxcdTlmYTVdK0BbYS16QS1aMC05Xy1dKyhcXC5bYS16QS1aMC05Xy1dKykrJC8udGVzdChNYWlsKVxufVxuXG4vKipcbiAqIEBkZXNjcmlwdGlvbjrpqozor4HkuIDmrrXlrZfnrKbkuLLmmK/pgq7nrrHov5jmmK/miYvmnLrlj7fnoIFcbiAqIEBwYXJhbSB7c3RyaW5nfSBhY2NvdW50IOWtl+espuS4slxuICogQHJldHVybiB7U3RyaW5nfEJvb2xlYW59IG1haWwgLyBtb2JpbGUgLyBmYWxzZVxuICovXG5jb25zdCBpc01vYmlsZU9yTWFpbCA9IChhY2NvdW50KSA9PiB7XG4gICAgaWYgKGlzTWFpbChhY2NvdW50KSkge1xuICAgICAgICByZXR1cm4gXCJtYWlsXCJcbiAgICB9XG4gICAgaWYgKGlzTW9iaWxlKGFjY291bnQpKSB7XG4gICAgICAgIHJldHVybiBcIm1vYmlsZVwiXG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cbi8qKlxuICogQGRlc2NyaXB0aW9uOumYsuaKllxuICogQHBhcmFtIGZuIOaWueazleWQjXzlm57osIPlh73mlbBcbiAqIEBwYXJhbSB3YWl0IOWJjeWQjumXtOmalOaXtumXtOmXtOi3nVxuICogQHJldHVybnMgeyhmdW5jdGlvbigpOiB2b2lkKXwqfSDpl63ljIXmlrnms5VcbiAqL1xuY29uc3QgZGVib3VuY2UgPSAoZm4sIHdhaXQpID0+IHtcbiAgICBsZXQgdGltZXIgPSBudWxsO1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aW1lciAhPT0gbnVsbCkge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgICAgfVxuICAgICAgICB0aW1lciA9IHNldFRpbWVvdXQoZm4sIHdhaXQpO1xuICAgIH1cbn1cbi8qKlxuICogQGRlc2NyaXB0aW9uOuaIqua1gVxuICogQHBhcmFtIGZuIOaWueazleWQje+9nOWbnuiwg+WHveaVsFxuICogQHBhcmFtIHdhaXQg5q+P5qyh6LCD55So6Ze06ZqUXG4gKiBAcmV0dXJuIHsoZnVuY3Rpb24oKTogdm9pZCl8Kn1cbiAqL1xuY29uc3QgdGhyb3R0bGUgPSAoZm4sIHdhaXQpID0+IHtcbiAgICBsZXQgdGltZXIgPSB0cnVlO1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGltZXIpIHJldHVybjtcbiAgICAgICAgdGltZXIgPSBmYWxzZTtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG4gICAgICAgICAgICB0aW1lciA9IHRydWU7XG4gICAgICAgIH0sIHdhaXQpXG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBkZWJvdW5jZSwgaXNNb2JpbGVPck1haWwsIGlzTWFpbCwgaXNNb2JpbGUsIHRocm90dGxlXG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSB1c2VkICdtb2R1bGUnIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9