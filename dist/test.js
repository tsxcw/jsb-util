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
const cookie = __webpack_require__(/*! ./lib/cookie */ "./src/lib/cookie.js")
const util = __webpack_require__(/*! ./lib/util */ "./src/lib/util.js")
const formatXss = __webpack_require__(/*! ./lib/formatXss */ "./src/lib/formatXss.js")
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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*****************!*\
  !*** ./test.js ***!
  \*****************/
const jsbUtil = __webpack_require__(/*! ./src/index.js */ "./src/index.js")
window.jsbUtil = jsbUtil;

function log1() {
    console.log(1)
}


var ac = jsbUtil.throttle(log1, 1000);//因为此处用了闭包，所以先赋值给一个变量；


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGNBQWMsbUJBQU8sQ0FBQywwREFBVztBQUNqQyxpQkFBaUIsbUJBQU8sQ0FBQyx3REFBVTtBQUNuQyxRQUFRLG1CQUFPLENBQUMsb0RBQVE7OztBQUd4QjtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsUUFBUSxRQUFRO0FBQ2hCLFFBQVEsVUFBVTtBQUNsQixRQUFRLFVBQVU7QUFDbEIsUUFBUSxVQUFVO0FBQ2xCO0FBQ0E7QUFDQSwyQ0FBMkM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBOztBQUVBLE1BQU07O0FBRU47QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0E7OztBQUdBOzs7Ozs7Ozs7OztBQzdHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7O0FBRUEsc0NBQXNDO0FBQ3RDLG9DQUFvQztBQUNwQyxtQ0FBbUM7QUFDbkMseUNBQXlDO0FBQ3pDLDJDQUEyQztBQUMzQyw0QkFBNEI7QUFDNUIscUNBQXFDO0FBQ3JDLGtDQUFrQztBQUNsQyx3Q0FBd0M7QUFDeEMsNENBQTRDO0FBQzVDLDJDQUEyQztBQUMzQyw0Q0FBNEM7QUFDNUMsa0RBQWtEO0FBQ2xELHVDQUF1QztBQUN2Qyw2Q0FBNkM7QUFDN0Msa0RBQWtEO0FBQ2xELGdDQUFnQztBQUNoQyw0Q0FBNEM7QUFDNUMsa0NBQWtDO0FBQ2xDLDZDQUE2QztBQUM3Qyx1Q0FBdUM7QUFDdkMsd0NBQXdDO0FBQ3hDLHdDQUF3QztBQUN4Qyx5Q0FBeUM7QUFDekMsMkNBQTJDO0FBQzNDLHlDQUF5QztBQUN6Qyx1Q0FBdUM7QUFDdkMsdUNBQXVDO0FBQ3ZDLGdDQUFnQztBQUNoQyw4QkFBOEI7QUFDOUIsdUNBQXVDO0FBQ3ZDLHVDQUF1QztBQUN2Qyx1Q0FBdUM7QUFDdkMsOEJBQThCO0FBQzlCLHFDQUFxQztBQUNyQywyQ0FBMkM7QUFDM0MsaURBQWlEO0FBQ2pELGtEQUFrRDtBQUNsRCwyQ0FBMkM7QUFDM0MsMkNBQTJDO0FBQzNDLHVDQUF1QztBQUN2QyxvQ0FBb0M7QUFDcEMsb0NBQW9DO0FBQ3BDLDJDQUEyQztBQUMzQywyQ0FBMkM7QUFDM0MsMENBQTBDO0FBQzFDLDJDQUEyQztBQUMzQywwQ0FBMEM7QUFDMUMsbUNBQW1DO0FBQ25DLHlDQUF5QztBQUN6Qyx5Q0FBeUM7QUFDekMseUNBQXlDO0FBQ3pDLHFDQUFxQztBQUNyQyxvQ0FBb0M7QUFDcEMsMENBQTBDO0FBQzFDLDBDQUEwQztBQUMxQywwQ0FBMEM7QUFDMUMsc0NBQXNDO0FBQ3RDLG9DQUFvQztBQUNwQyxrQ0FBa0M7QUFDbEMsd0NBQXdDO0FBQ3hDLDhDQUE4QztBQUM5QywrQ0FBK0M7QUFDL0Msd0NBQXdDO0FBQ3hDLHdDQUF3QztBQUN4QyxvQ0FBb0M7QUFDcEMsK0JBQStCO0FBQy9CLDRDQUE0QztBQUM1QyxrQ0FBa0M7QUFDbEMsa0NBQWtDO0FBQ2xDLGdDQUFnQztBQUNoQyxvQ0FBb0M7QUFDcEMsbUNBQW1DO0FBQ25DLG9DQUFvQztBQUNwQyxvQ0FBb0M7QUFDcEMscUNBQXFDO0FBQ3JDLCtCQUErQjtBQUMvQiw2QkFBNkI7QUFDN0IsNkJBQTZCO0FBQzdCLGtDQUFrQztBQUNsQyxrQ0FBa0M7QUFDbEMsNkJBQTZCO0FBQzdCLG1EQUFtRDtBQUNuRCxxQ0FBcUM7QUFDckMsb0NBQW9DO0FBQ3BDLG1DQUFtQztBQUNuQyxvQ0FBb0M7QUFDcEMsMENBQTBDO0FBQzFDLDBDQUEwQztBQUMxQywwQ0FBMEM7QUFDMUMsb0NBQW9DO0FBQ3BDLHFDQUFxQztBQUNyQyxnQ0FBZ0M7QUFDaEMsZ0NBQWdDO0FBQ2hDLGdDQUFnQztBQUNoQywwQ0FBMEM7QUFDMUMsc0NBQXNDO0FBQ3RDLG9DQUFvQztBQUNwQyw2QkFBNkI7QUFDN0IsNEJBQTRCO0FBQzVCLGtDQUFrQztBQUNsQyxtQ0FBbUM7QUFDbkMsK0JBQStCO0FBQy9CLGtDQUFrQztBQUNsQywrQkFBK0I7QUFDL0Isc0NBQXNDO0FBQ3RDLG9DQUFvQztBQUNwQyx1Q0FBdUM7QUFDdkMsMENBQTBDO0FBQzFDLGtDQUFrQztBQUNsQyxvQ0FBb0M7QUFDcEMsK0JBQStCO0FBQy9CLDZCQUE2QjtBQUM3QixtQ0FBbUM7QUFDbkMsdUNBQXVDO0FBQ3ZDLGtDQUFrQztBQUNsQyxrQ0FBa0M7QUFDbEMsb0NBQW9DO0FBQ3BDLGtDQUFrQztBQUNsQyw4QkFBOEI7QUFDOUIscUNBQXFDO0FBQ3JDLG9DQUFvQztBQUNwQyxzQ0FBc0M7QUFDdEMsa0NBQWtDO0FBQ2xDLGtDQUFrQztBQUNsQyw0QkFBNEI7QUFDNUIsbUNBQW1DO0FBQ25DLDZDQUE2QztBQUM3QyxvQ0FBb0M7QUFDcEMsOENBQThDO0FBQzlDLGlDQUFpQztBQUNqQyx3Q0FBd0M7QUFDeEMsb0NBQW9DO0FBQ3BDLGtDQUFrQztBQUNsQyxzQ0FBc0M7QUFDdEMsb0NBQW9DO0FBQ3BDLCtDQUErQztBQUMvQyx5Q0FBeUM7QUFDekMsK0NBQStDO0FBQy9DLDhDQUE4QztBQUM5Qyw0Q0FBNEM7QUFDNUMsNkNBQTZDO0FBQzdDLG1DQUFtQztBQUNuQyw2QkFBNkI7QUFDN0Isa0NBQWtDO0FBQ2xDLDBDQUEwQztBQUMxQyx1Q0FBdUM7QUFDdkMsdUNBQXVDO0FBQ3ZDLG9DQUFvQztBQUNwQyx3Q0FBd0M7QUFDeEMsMENBQTBDO0FBQzFDLGlDQUFpQztBQUNqQyxxQ0FBcUM7QUFDckMsdUNBQXVDO0FBQ3ZDLHNDQUFzQztBQUN0Qyw0Q0FBNEM7QUFDNUMsOENBQThDO0FBQzlDLDJDQUEyQztBQUMzQyw0Q0FBNEM7QUFDNUMsOEJBQThCO0FBQzlCLGdDQUFnQztBQUNoQyw2QkFBNkI7QUFDN0IsMENBQTBDO0FBQzFDLHlDQUF5QztBQUN6QyxpQ0FBaUM7QUFDakMsd0NBQXdDO0FBQ3hDLHlDQUF5QztBQUN6Qyx3Q0FBd0M7QUFDeEMsc0NBQXNDO0FBQ3RDLHFDQUFxQztBQUNyQyw2QkFBNkI7QUFDN0Isc0NBQXNDO0FBQ3RDLHNDQUFzQztBQUN0Qyx5Q0FBeUM7QUFDekMsbUNBQW1DO0FBQ25DLGtDQUFrQztBQUNsQyxvQ0FBb0M7QUFDcEMsa0NBQWtDO0FBQ2xDLHNDQUFzQztBQUN0QywyQ0FBMkM7QUFDM0MsNENBQTRDO0FBQzVDLCtDQUErQztBQUMvQyxrQ0FBa0M7QUFDbEMsd0NBQXdDO0FBQ3hDLDJDQUEyQztBQUMzQyx1Q0FBdUM7QUFDdkMsOEJBQThCO0FBQzlCLHFDQUFxQztBQUNyQyxtQ0FBbUM7QUFDbkMsb0NBQW9DO0FBQ3BDLGtDQUFrQztBQUNsQyxzQ0FBc0M7QUFDdEMsb0NBQW9DO0FBQ3BDLDhCQUE4QjtBQUM5Qiw2QkFBNkI7QUFDN0IsaUNBQWlDO0FBQ2pDLHdDQUF3QztBQUN4Qyx3Q0FBd0M7QUFDeEMsdUNBQXVDO0FBQ3ZDLHdDQUF3QztBQUN4Qyx1Q0FBdUM7QUFDdkMsa0NBQWtDO0FBQ2xDLG1DQUFtQztBQUNuQyxvQ0FBb0M7QUFDcEMsc0NBQXNDO0FBQ3RDLG9DQUFvQztBQUNwQyxrQ0FBa0M7QUFDbEMseUNBQXlDO0FBQ3pDLGtDQUFrQztBQUNsQyxrQ0FBa0M7QUFDbEMsa0NBQWtDO0FBQ2xDLGlDQUFpQztBQUNqQyxrQ0FBa0M7QUFDbEMsaUNBQWlDO0FBQ2pDLGdDQUFnQztBQUNoQyxpQ0FBaUM7QUFDakMsa0NBQWtDO0FBQ2xDLGlDQUFpQztBQUNqQyxrQ0FBa0M7QUFDbEMsK0JBQStCO0FBQy9CLG1DQUFtQztBQUNuQyx3Q0FBd0M7QUFDeEMsZ0NBQWdDO0FBQ2hDLDhCQUE4QjtBQUM5QixnQ0FBZ0M7QUFDaEMsZ0NBQWdDO0FBQ2hDLHNDQUFzQztBQUN0Qyx1Q0FBdUM7QUFDdkMsc0NBQXNDO0FBQ3RDLHNDQUFzQztBQUN0QyxpQ0FBaUM7QUFDakMsc0NBQXNDO0FBQ3RDLG1DQUFtQztBQUNuQyxtQ0FBbUM7QUFDbkMsK0JBQStCO0FBQy9CLHNDQUFzQztBQUN0QyxvQ0FBb0M7QUFDcEMscUNBQXFDO0FBQ3JDLG1DQUFtQztBQUNuQyw2QkFBNkI7QUFDN0IseUNBQXlDO0FBQ3pDLDBDQUEwQztBQUMxQywwQ0FBMEM7QUFDMUMsb0NBQW9DO0FBQ3BDLDhCQUE4QjtBQUM5QixvQ0FBb0M7QUFDcEMscUNBQXFDO0FBQ3JDLG9DQUFvQztBQUNwQywyQ0FBMkM7QUFDM0MsOEJBQThCO0FBQzlCLG9DQUFvQztBQUNwQyxvQ0FBb0M7QUFDcEMsaUNBQWlDO0FBQ2pDLDJDQUEyQztBQUMzQywrQkFBK0I7QUFDL0Isd0NBQXdDO0FBQ3hDLCtCQUErQjtBQUMvQiw2QkFBNkI7QUFDN0IsbUNBQW1DO0FBQ25DLG9DQUFvQztBQUNwQyxpQ0FBaUM7QUFDakMsOEJBQThCO0FBQzlCLGlDQUFpQztBQUNqQyx1Q0FBdUM7QUFDdkMsbUNBQW1DO0FBQ25DLG1DQUFtQztBQUNuQyxzQ0FBc0M7QUFDdEMsOENBQThDO0FBQzlDLHNDQUFzQztBQUN0QyxxQ0FBcUM7QUFDckMsNkJBQTZCO0FBQzdCLDhCQUE4QjtBQUM5QixpQ0FBaUM7QUFDakMscUNBQXFDO0FBQ3JDLHNDQUFzQztBQUN0QywwQ0FBMEM7QUFDMUMsb0NBQW9DO0FBQ3BDLCtCQUErQjtBQUMvQixtQ0FBbUM7QUFDbkMsaUNBQWlDO0FBQ2pDLHFDQUFxQztBQUNyQyxrQ0FBa0M7QUFDbEMsdUNBQXVDO0FBQ3ZDLDRDQUE0QztBQUM1Qyx1Q0FBdUM7QUFDdkMsNkNBQTZDO0FBQzdDLDRDQUE0QztBQUM1Qyw0Q0FBNEM7QUFDNUMsNkNBQTZDO0FBQzdDLHFDQUFxQztBQUNyQywyQ0FBMkM7QUFDM0MsOENBQThDO0FBQzlDLDJDQUEyQztBQUMzQyxtQ0FBbUM7QUFDbkMsbUNBQW1DO0FBQ25DLG9DQUFvQztBQUNwQyx3Q0FBd0M7QUFDeEMscUNBQXFDO0FBQ3JDLG1DQUFtQztBQUNuQywyQ0FBMkM7QUFDM0Msc0NBQXNDO0FBQ3RDLCtDQUErQztBQUMvQyxpQ0FBaUM7QUFDakMsNEJBQTRCO0FBQzVCLGtDQUFrQztBQUNsQyx5Q0FBeUM7QUFDekMsd0NBQXdDO0FBQ3hDLG1DQUFtQztBQUNuQyx5Q0FBeUM7QUFDekMsNENBQTRDO0FBQzVDLDRDQUE0QztBQUM1QyxtREFBbUQ7QUFDbkQscUNBQXFDO0FBQ3JDLHVDQUF1QztBQUN2QyxtQ0FBbUM7QUFDbkMsc0NBQXNDO0FBQ3RDLHVDQUF1QztBQUN2QyxxQ0FBcUM7QUFDckMsb0NBQW9DO0FBQ3BDLG9DQUFvQztBQUNwQyxtQ0FBbUM7QUFDbkMscUNBQXFDO0FBQ3JDLHFDQUFxQztBQUNyQywrQkFBK0I7QUFDL0Isb0NBQW9DO0FBQ3BDLCtCQUErQjtBQUMvQiw2QkFBNkI7QUFDN0Isb0NBQW9DO0FBQ3BDLGtDQUFrQztBQUNsQyxvQ0FBb0M7QUFDcEMsaUNBQWlDO0FBQ2pDLGtDQUFrQztBQUNsQyxxQ0FBcUM7QUFDckMscUNBQXFDO0FBQ3JDLGdDQUFnQzs7QUFFaEM7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkIsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQSxpQkFBaUI7QUFDakIsMkJBQTJCO0FBQzNCLGNBQWM7QUFDZCxvQkFBb0I7QUFDcEIscUJBQXFCOzs7Ozs7Ozs7OztBQzdZckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxjQUFjLG1CQUFPLENBQUMsMERBQVc7QUFDakMsZ0JBQWdCLG1CQUFPLENBQUMsa0RBQU87OztBQUcvQjtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFFBQVEsbUJBQU8sQ0FBQyxvREFBUTs7O0FBR3hCO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLFVBQVU7QUFDckI7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLFlBQVk7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBUyxlQUFlO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTSxpQkFBaUI7QUFDdkI7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7Ozs7Ozs7OztBQ3pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsT0FBTztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsT0FBTztBQUN2QztBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsZ0JBQWdCLHlGQUE4QjtBQUM5Qyw2QkFBNkIsbUdBQXdDO0FBQ3JFLFFBQVEsbUJBQU8sQ0FBQyw4Q0FBUTs7QUFFeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkIsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQixZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkIsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQjtBQUNBO0FBQ0Esc0NBQXNDLDJCQUEyQjtBQUNqRTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkIsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCLDRDQUE0QztBQUM1QyxzQ0FBc0M7QUFDdEMsMENBQTBDO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFlBQVksUUFBUTtBQUNwQjtBQUNBO0FBQ0EsMENBQTBDO0FBQzFDOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixZQUFZLFFBQVE7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsU0FBUztBQUM3QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsVUFBVTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQSxpQkFBaUI7QUFDakIsMkJBQTJCO0FBQzNCLGFBQWE7QUFDYixtQkFBbUI7QUFDbkIsaUJBQWlCO0FBQ2pCLHVCQUF1QjtBQUN2QixxQkFBcUI7QUFDckIsa0JBQWtCO0FBQ2xCLG1CQUFtQjtBQUNuQixxQkFBcUI7QUFDckIsMEJBQTBCO0FBQzFCLGlDQUFpQztBQUNqQyxrQ0FBa0M7QUFDbEMseUJBQXlCO0FBQ3pCLHVCQUF1QjtBQUN2QiwyQkFBMkI7QUFDM0Isb0JBQW9CO0FBQ3BCLHVCQUF1QjtBQUN2QixzQkFBc0I7QUFDdEIsaUJBQWlCO0FBQ2pCLDhCQUE4Qjs7Ozs7Ozs7Ozs7QUMxYzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsY0FBYyxtQkFBTyxDQUFDLG9EQUFXO0FBQ2pDLGFBQWEsbUJBQU8sQ0FBQyxrREFBVTtBQUMvQixnQkFBZ0IsbUJBQU8sQ0FBQyw0Q0FBTzs7QUFFL0I7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUSxVQUFVO0FBQzdCLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCO0FBQ2pCLGlCQUFpQjtBQUNqQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsUUFBUSxtQkFBTyxDQUFDLDhDQUFROztBQUV4QjtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxVQUFVO0FBQ3JCLFdBQVcsVUFBVTtBQUNyQixZQUFZO0FBQ1o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUNBQXFDLGtCQUFrQjtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLFVBQVU7QUFDckIsWUFBWTtBQUNaO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtCQUFrQixTQUFTO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsU0FBUyxnQkFBZ0I7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsU0FBUyxPQUFPO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUEsZ0JBQWdCO0FBQ2hCLGlCQUFpQjs7Ozs7Ozs7Ozs7QUN0UGpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxPQUFPO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxPQUFPO0FBQ3ZDO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7Ozs7Ozs7Ozs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxnQkFBZ0IseUZBQThCO0FBQzlDLGNBQWMsbUJBQU8sQ0FBQyxvREFBVztBQUNqQyxhQUFhLG1CQUFPLENBQUMsa0RBQVU7QUFDL0I7QUFDQTtBQUNBLFFBQVEsbUJBQU8sQ0FBQyw4Q0FBUTs7QUFFeEI7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsWUFBWTtBQUNaLFFBQVEsUUFBUTtBQUNoQixRQUFRLFNBQVM7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CO0FBQ0E7QUFDQTtBQUNBLGNBQWMsaUNBQWlDO0FBQy9DO0FBQ0E7QUFDQSwyQ0FBMkM7O0FBRTNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7O0FDbE5BLGVBQWUsbUJBQU8sQ0FBQyx5Q0FBYztBQUNyQyxlQUFlLG1CQUFPLENBQUMseUNBQWM7QUFDckMsYUFBYSxtQkFBTyxDQUFDLHFDQUFZO0FBQ2pDLGtCQUFrQixtQkFBTyxDQUFDLCtDQUFpQjtBQUMzQyxzQkFBc0I7QUFDdEIsZ0JBQWdCO0FBQ2hCLGNBQWM7QUFDZCxjQUFjO0FBQ2QsaUJBQWlCO0FBQ2pCLGNBQWM7QUFDZCxnQkFBZ0I7QUFDaEIsZ0JBQWdCO0FBQ2hCO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7Ozs7Ozs7Ozs7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLE1BQU07QUFDakIsWUFBWSxnQkFBZ0I7QUFDNUI7QUFDQTtBQUNBLHNDQUFzQztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkIsV0FBVyxNQUFNO0FBQ2pCLFlBQVksU0FBUztBQUNyQjtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsSUFBSSxHQUFHLE9BQU8sVUFBVSxRQUFRO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixZQUFZLE1BQU07QUFDbEI7QUFDQTtBQUNBLHlCQUF5QixJQUFJLElBQUksUUFBUSxVQUFVLDBCQUEwQjtBQUM3RTtBQUNBO0FBQ0E7QUFDQSxZQUFZLE1BQU07QUFDbEI7QUFDQTtBQUNBLDJDQUEyQztBQUMzQyxvQkFBb0IsaUJBQWlCO0FBQ3JDO0FBQ0E7QUFDQSwyQkFBMkIsUUFBUSxVQUFVLDBCQUEwQjtBQUN2RTs7QUFFQTs7Ozs7Ozs7Ozs7QUN0REEsWUFBWSxtQkFBTyxDQUFDLDRDQUFLO0FBQ3pCO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixZQUFZLFFBQVE7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSx3QkFBd0Isb0JBQW9CO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7QUMxREE7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLEdBQUc7QUFDbEIsZUFBZSxlQUFlO0FBQzlCLGdCQUFnQixRQUFRO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsR0FBRztBQUNsQixnQkFBZ0IsZUFBZTtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLEdBQUc7QUFDbEIsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsR0FBRztBQUNsQixnQkFBZ0IsUUFBUTtBQUN4QjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7O0FBRUE7QUFDQTtBQUNBLGdCQUFnQixRQUFRO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7OztBQy9FQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFlBQVksU0FBUztBQUNyQjtBQUNBO0FBQ0EsMEJBQTBCLEVBQUU7QUFDNUI7O0FBRUE7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixZQUFZLFNBQVM7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixZQUFZLGdCQUFnQjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxzQkFBc0I7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7VUNuRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7Ozs7O0FDdEJBLGdCQUFnQixtQkFBTyxDQUFDLHNDQUFnQjtBQUN4Qzs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBLHNDQUFzQyIsInNvdXJjZXMiOlsid2VicGFjazovL2pzYi11dGlsLy4vbm9kZV9tb2R1bGVzL2Nzc2ZpbHRlci9saWIvY3NzLmpzIiwid2VicGFjazovL2pzYi11dGlsLy4vbm9kZV9tb2R1bGVzL2Nzc2ZpbHRlci9saWIvZGVmYXVsdC5qcyIsIndlYnBhY2s6Ly9qc2ItdXRpbC8uL25vZGVfbW9kdWxlcy9jc3NmaWx0ZXIvbGliL2luZGV4LmpzIiwid2VicGFjazovL2pzYi11dGlsLy4vbm9kZV9tb2R1bGVzL2Nzc2ZpbHRlci9saWIvcGFyc2VyLmpzIiwid2VicGFjazovL2pzYi11dGlsLy4vbm9kZV9tb2R1bGVzL2Nzc2ZpbHRlci9saWIvdXRpbC5qcyIsIndlYnBhY2s6Ly9qc2ItdXRpbC8uL25vZGVfbW9kdWxlcy94c3MvbGliL2RlZmF1bHQuanMiLCJ3ZWJwYWNrOi8vanNiLXV0aWwvLi9ub2RlX21vZHVsZXMveHNzL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly9qc2ItdXRpbC8uL25vZGVfbW9kdWxlcy94c3MvbGliL3BhcnNlci5qcyIsIndlYnBhY2s6Ly9qc2ItdXRpbC8uL25vZGVfbW9kdWxlcy94c3MvbGliL3V0aWwuanMiLCJ3ZWJwYWNrOi8vanNiLXV0aWwvLi9ub2RlX21vZHVsZXMveHNzL2xpYi94c3MuanMiLCJ3ZWJwYWNrOi8vanNiLXV0aWwvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vanNiLXV0aWwvLi9zcmMvbGliL2Nvb2tpZS5qcyIsIndlYnBhY2s6Ly9qc2ItdXRpbC8uL3NyYy9saWIvZm9ybWF0WHNzLmpzIiwid2VicGFjazovL2pzYi11dGlsLy4vc3JjL2xpYi9tZW1vcnkuanMiLCJ3ZWJwYWNrOi8vanNiLXV0aWwvLi9zcmMvbGliL3V0aWwuanMiLCJ3ZWJwYWNrOi8vanNiLXV0aWwvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vanNiLXV0aWwvLi90ZXN0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogY3NzZmlsdGVyXG4gKlxuICogQGF1dGhvciDogIHpm7c8bGVpem9uZ21pbkBnbWFpbC5jb20+XG4gKi9cblxudmFyIERFRkFVTFQgPSByZXF1aXJlKCcuL2RlZmF1bHQnKTtcbnZhciBwYXJzZVN0eWxlID0gcmVxdWlyZSgnLi9wYXJzZXInKTtcbnZhciBfID0gcmVxdWlyZSgnLi91dGlsJyk7XG5cblxuLyoqXG4gKiDov5Tlm57lgLzmmK/lkKbkuLrnqbpcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5mdW5jdGlvbiBpc051bGwgKG9iaikge1xuICByZXR1cm4gKG9iaiA9PT0gdW5kZWZpbmVkIHx8IG9iaiA9PT0gbnVsbCk7XG59XG5cbi8qKlxuICog5rWF5ou36LSd5a+56LGhXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5mdW5jdGlvbiBzaGFsbG93Q29weU9iamVjdCAob2JqKSB7XG4gIHZhciByZXQgPSB7fTtcbiAgZm9yICh2YXIgaSBpbiBvYmopIHtcbiAgICByZXRbaV0gPSBvYmpbaV07XG4gIH1cbiAgcmV0dXJuIHJldDtcbn1cblxuLyoqXG4gKiDliJvlu7pDU1Pov4fmu6TlmahcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogICAtIHtPYmplY3R9IHdoaXRlTGlzdFxuICogICAtIHtGdW5jdGlvbn0gb25BdHRyXG4gKiAgIC0ge0Z1bmN0aW9ufSBvbklnbm9yZUF0dHJcbiAqICAgLSB7RnVuY3Rpb259IHNhZmVBdHRyVmFsdWVcbiAqL1xuZnVuY3Rpb24gRmlsdGVyQ1NTIChvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBzaGFsbG93Q29weU9iamVjdChvcHRpb25zIHx8IHt9KTtcbiAgb3B0aW9ucy53aGl0ZUxpc3QgPSBvcHRpb25zLndoaXRlTGlzdCB8fCBERUZBVUxULndoaXRlTGlzdDtcbiAgb3B0aW9ucy5vbkF0dHIgPSBvcHRpb25zLm9uQXR0ciB8fCBERUZBVUxULm9uQXR0cjtcbiAgb3B0aW9ucy5vbklnbm9yZUF0dHIgPSBvcHRpb25zLm9uSWdub3JlQXR0ciB8fCBERUZBVUxULm9uSWdub3JlQXR0cjtcbiAgb3B0aW9ucy5zYWZlQXR0clZhbHVlID0gb3B0aW9ucy5zYWZlQXR0clZhbHVlIHx8IERFRkFVTFQuc2FmZUF0dHJWYWx1ZTtcbiAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbn1cblxuRmlsdGVyQ1NTLnByb3RvdHlwZS5wcm9jZXNzID0gZnVuY3Rpb24gKGNzcykge1xuICAvLyDlhbzlrrnlkITnp43lpYfokanovpPlhaVcbiAgY3NzID0gY3NzIHx8ICcnO1xuICBjc3MgPSBjc3MudG9TdHJpbmcoKTtcbiAgaWYgKCFjc3MpIHJldHVybiAnJztcblxuICB2YXIgbWUgPSB0aGlzO1xuICB2YXIgb3B0aW9ucyA9IG1lLm9wdGlvbnM7XG4gIHZhciB3aGl0ZUxpc3QgPSBvcHRpb25zLndoaXRlTGlzdDtcbiAgdmFyIG9uQXR0ciA9IG9wdGlvbnMub25BdHRyO1xuICB2YXIgb25JZ25vcmVBdHRyID0gb3B0aW9ucy5vbklnbm9yZUF0dHI7XG4gIHZhciBzYWZlQXR0clZhbHVlID0gb3B0aW9ucy5zYWZlQXR0clZhbHVlO1xuXG4gIHZhciByZXRDU1MgPSBwYXJzZVN0eWxlKGNzcywgZnVuY3Rpb24gKHNvdXJjZVBvc2l0aW9uLCBwb3NpdGlvbiwgbmFtZSwgdmFsdWUsIHNvdXJjZSkge1xuXG4gICAgdmFyIGNoZWNrID0gd2hpdGVMaXN0W25hbWVdO1xuICAgIHZhciBpc1doaXRlID0gZmFsc2U7XG4gICAgaWYgKGNoZWNrID09PSB0cnVlKSBpc1doaXRlID0gY2hlY2s7XG4gICAgZWxzZSBpZiAodHlwZW9mIGNoZWNrID09PSAnZnVuY3Rpb24nKSBpc1doaXRlID0gY2hlY2sodmFsdWUpO1xuICAgIGVsc2UgaWYgKGNoZWNrIGluc3RhbmNlb2YgUmVnRXhwKSBpc1doaXRlID0gY2hlY2sudGVzdCh2YWx1ZSk7XG4gICAgaWYgKGlzV2hpdGUgIT09IHRydWUpIGlzV2hpdGUgPSBmYWxzZTtcblxuICAgIC8vIOWmguaenOi/h+a7pOWQjiB2YWx1ZSDkuLrnqbrliJnnm7TmjqXlv73nlaVcbiAgICB2YWx1ZSA9IHNhZmVBdHRyVmFsdWUobmFtZSwgdmFsdWUpO1xuICAgIGlmICghdmFsdWUpIHJldHVybjtcblxuICAgIHZhciBvcHRzID0ge1xuICAgICAgcG9zaXRpb246IHBvc2l0aW9uLFxuICAgICAgc291cmNlUG9zaXRpb246IHNvdXJjZVBvc2l0aW9uLFxuICAgICAgc291cmNlOiBzb3VyY2UsXG4gICAgICBpc1doaXRlOiBpc1doaXRlXG4gICAgfTtcblxuICAgIGlmIChpc1doaXRlKSB7XG5cbiAgICAgIHZhciByZXQgPSBvbkF0dHIobmFtZSwgdmFsdWUsIG9wdHMpO1xuICAgICAgaWYgKGlzTnVsbChyZXQpKSB7XG4gICAgICAgIHJldHVybiBuYW1lICsgJzonICsgdmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgfVxuXG4gICAgfSBlbHNlIHtcblxuICAgICAgdmFyIHJldCA9IG9uSWdub3JlQXR0cihuYW1lLCB2YWx1ZSwgb3B0cyk7XG4gICAgICBpZiAoIWlzTnVsbChyZXQpKSB7XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgICB9XG5cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiByZXRDU1M7XG59O1xuXG5cbm1vZHVsZS5leHBvcnRzID0gRmlsdGVyQ1NTO1xuIiwiLyoqXG4gKiBjc3NmaWx0ZXJcbiAqXG4gKiBAYXV0aG9yIOiAgembtzxsZWl6b25nbWluQGdtYWlsLmNvbT5cbiAqL1xuXG5mdW5jdGlvbiBnZXREZWZhdWx0V2hpdGVMaXN0ICgpIHtcbiAgLy8g55m95ZCN5Y2V5YC86K+05piO77yaXG4gIC8vIHRydWU6IOWFgeiuuOivpeWxnuaAp1xuICAvLyBGdW5jdGlvbjogZnVuY3Rpb24gKHZhbCkgeyB9IOi/lOWbnnRydWXooajnpLrlhYHorrjor6XlsZ7mgKfvvIzlhbbku5blgLzlnYfooajnpLrkuI3lhYHorrhcbiAgLy8gUmVnRXhwOiByZWdleHAudGVzdCh2YWwpIOi/lOWbnnRydWXooajnpLrlhYHorrjor6XlsZ7mgKfvvIzlhbbku5blgLzlnYfooajnpLrkuI3lhYHorrhcbiAgLy8g6Zmk5LiK6Z2i5YiX5Ye655qE5YC85aSW5Z2H6KGo56S65LiN5YWB6K64XG4gIHZhciB3aGl0ZUxpc3QgPSB7fTtcblxuICB3aGl0ZUxpc3RbJ2FsaWduLWNvbnRlbnQnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBhdXRvXG4gIHdoaXRlTGlzdFsnYWxpZ24taXRlbXMnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBhdXRvXG4gIHdoaXRlTGlzdFsnYWxpZ24tc2VsZiddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGF1dG9cbiAgd2hpdGVMaXN0WydhbGlnbm1lbnQtYWRqdXN0J10gPSBmYWxzZTsgLy8gZGVmYXVsdDogYXV0b1xuICB3aGl0ZUxpc3RbJ2FsaWdubWVudC1iYXNlbGluZSddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGJhc2VsaW5lXG4gIHdoaXRlTGlzdFsnYWxsJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogZGVwZW5kaW5nIG9uIGluZGl2aWR1YWwgcHJvcGVydGllc1xuICB3aGl0ZUxpc3RbJ2FuY2hvci1wb2ludCddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IG5vbmVcbiAgd2hpdGVMaXN0WydhbmltYXRpb24nXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBkZXBlbmRpbmcgb24gaW5kaXZpZHVhbCBwcm9wZXJ0aWVzXG4gIHdoaXRlTGlzdFsnYW5pbWF0aW9uLWRlbGF5J10gPSBmYWxzZTsgLy8gZGVmYXVsdDogMFxuICB3aGl0ZUxpc3RbJ2FuaW1hdGlvbi1kaXJlY3Rpb24nXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBub3JtYWxcbiAgd2hpdGVMaXN0WydhbmltYXRpb24tZHVyYXRpb24nXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiAwXG4gIHdoaXRlTGlzdFsnYW5pbWF0aW9uLWZpbGwtbW9kZSddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IG5vbmVcbiAgd2hpdGVMaXN0WydhbmltYXRpb24taXRlcmF0aW9uLWNvdW50J10gPSBmYWxzZTsgLy8gZGVmYXVsdDogMVxuICB3aGl0ZUxpc3RbJ2FuaW1hdGlvbi1uYW1lJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogbm9uZVxuICB3aGl0ZUxpc3RbJ2FuaW1hdGlvbi1wbGF5LXN0YXRlJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogcnVubmluZ1xuICB3aGl0ZUxpc3RbJ2FuaW1hdGlvbi10aW1pbmctZnVuY3Rpb24nXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBlYXNlXG4gIHdoaXRlTGlzdFsnYXppbXV0aCddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGNlbnRlclxuICB3aGl0ZUxpc3RbJ2JhY2tmYWNlLXZpc2liaWxpdHknXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiB2aXNpYmxlXG4gIHdoaXRlTGlzdFsnYmFja2dyb3VuZCddID0gdHJ1ZTsgLy8gZGVmYXVsdDogZGVwZW5kaW5nIG9uIGluZGl2aWR1YWwgcHJvcGVydGllc1xuICB3aGl0ZUxpc3RbJ2JhY2tncm91bmQtYXR0YWNobWVudCddID0gdHJ1ZTsgLy8gZGVmYXVsdDogc2Nyb2xsXG4gIHdoaXRlTGlzdFsnYmFja2dyb3VuZC1jbGlwJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiBib3JkZXItYm94XG4gIHdoaXRlTGlzdFsnYmFja2dyb3VuZC1jb2xvciddID0gdHJ1ZTsgLy8gZGVmYXVsdDogdHJhbnNwYXJlbnRcbiAgd2hpdGVMaXN0WydiYWNrZ3JvdW5kLWltYWdlJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiBub25lXG4gIHdoaXRlTGlzdFsnYmFja2dyb3VuZC1vcmlnaW4nXSA9IHRydWU7IC8vIGRlZmF1bHQ6IHBhZGRpbmctYm94XG4gIHdoaXRlTGlzdFsnYmFja2dyb3VuZC1wb3NpdGlvbiddID0gdHJ1ZTsgLy8gZGVmYXVsdDogMCUgMCVcbiAgd2hpdGVMaXN0WydiYWNrZ3JvdW5kLXJlcGVhdCddID0gdHJ1ZTsgLy8gZGVmYXVsdDogcmVwZWF0XG4gIHdoaXRlTGlzdFsnYmFja2dyb3VuZC1zaXplJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiBhdXRvXG4gIHdoaXRlTGlzdFsnYmFzZWxpbmUtc2hpZnQnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBiYXNlbGluZVxuICB3aGl0ZUxpc3RbJ2JpbmRpbmcnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBub25lXG4gIHdoaXRlTGlzdFsnYmxlZWQnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiA2cHRcbiAgd2hpdGVMaXN0Wydib29rbWFyay1sYWJlbCddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGNvbnRlbnQoKVxuICB3aGl0ZUxpc3RbJ2Jvb2ttYXJrLWxldmVsJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogbm9uZVxuICB3aGl0ZUxpc3RbJ2Jvb2ttYXJrLXN0YXRlJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogb3BlblxuICB3aGl0ZUxpc3RbJ2JvcmRlciddID0gdHJ1ZTsgLy8gZGVmYXVsdDogZGVwZW5kaW5nIG9uIGluZGl2aWR1YWwgcHJvcGVydGllc1xuICB3aGl0ZUxpc3RbJ2JvcmRlci1ib3R0b20nXSA9IHRydWU7IC8vIGRlZmF1bHQ6IGRlcGVuZGluZyBvbiBpbmRpdmlkdWFsIHByb3BlcnRpZXNcbiAgd2hpdGVMaXN0Wydib3JkZXItYm90dG9tLWNvbG9yJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiBjdXJyZW50IGNvbG9yXG4gIHdoaXRlTGlzdFsnYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1cyddID0gdHJ1ZTsgLy8gZGVmYXVsdDogMFxuICB3aGl0ZUxpc3RbJ2JvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiAwXG4gIHdoaXRlTGlzdFsnYm9yZGVyLWJvdHRvbS1zdHlsZSddID0gdHJ1ZTsgLy8gZGVmYXVsdDogbm9uZVxuICB3aGl0ZUxpc3RbJ2JvcmRlci1ib3R0b20td2lkdGgnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IG1lZGl1bVxuICB3aGl0ZUxpc3RbJ2JvcmRlci1jb2xsYXBzZSddID0gdHJ1ZTsgLy8gZGVmYXVsdDogc2VwYXJhdGVcbiAgd2hpdGVMaXN0Wydib3JkZXItY29sb3InXSA9IHRydWU7IC8vIGRlZmF1bHQ6IGRlcGVuZGluZyBvbiBpbmRpdmlkdWFsIHByb3BlcnRpZXNcbiAgd2hpdGVMaXN0Wydib3JkZXItaW1hZ2UnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IG5vbmVcbiAgd2hpdGVMaXN0Wydib3JkZXItaW1hZ2Utb3V0c2V0J10gPSB0cnVlOyAvLyBkZWZhdWx0OiAwXG4gIHdoaXRlTGlzdFsnYm9yZGVyLWltYWdlLXJlcGVhdCddID0gdHJ1ZTsgLy8gZGVmYXVsdDogc3RyZXRjaFxuICB3aGl0ZUxpc3RbJ2JvcmRlci1pbWFnZS1zbGljZSddID0gdHJ1ZTsgLy8gZGVmYXVsdDogMTAwJVxuICB3aGl0ZUxpc3RbJ2JvcmRlci1pbWFnZS1zb3VyY2UnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IG5vbmVcbiAgd2hpdGVMaXN0Wydib3JkZXItaW1hZ2Utd2lkdGgnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IDFcbiAgd2hpdGVMaXN0Wydib3JkZXItbGVmdCddID0gdHJ1ZTsgLy8gZGVmYXVsdDogZGVwZW5kaW5nIG9uIGluZGl2aWR1YWwgcHJvcGVydGllc1xuICB3aGl0ZUxpc3RbJ2JvcmRlci1sZWZ0LWNvbG9yJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiBjdXJyZW50IGNvbG9yXG4gIHdoaXRlTGlzdFsnYm9yZGVyLWxlZnQtc3R5bGUnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IG5vbmVcbiAgd2hpdGVMaXN0Wydib3JkZXItbGVmdC13aWR0aCddID0gdHJ1ZTsgLy8gZGVmYXVsdDogbWVkaXVtXG4gIHdoaXRlTGlzdFsnYm9yZGVyLXJhZGl1cyddID0gdHJ1ZTsgLy8gZGVmYXVsdDogMFxuICB3aGl0ZUxpc3RbJ2JvcmRlci1yaWdodCddID0gdHJ1ZTsgLy8gZGVmYXVsdDogZGVwZW5kaW5nIG9uIGluZGl2aWR1YWwgcHJvcGVydGllc1xuICB3aGl0ZUxpc3RbJ2JvcmRlci1yaWdodC1jb2xvciddID0gdHJ1ZTsgLy8gZGVmYXVsdDogY3VycmVudCBjb2xvclxuICB3aGl0ZUxpc3RbJ2JvcmRlci1yaWdodC1zdHlsZSddID0gdHJ1ZTsgLy8gZGVmYXVsdDogbm9uZVxuICB3aGl0ZUxpc3RbJ2JvcmRlci1yaWdodC13aWR0aCddID0gdHJ1ZTsgLy8gZGVmYXVsdDogbWVkaXVtXG4gIHdoaXRlTGlzdFsnYm9yZGVyLXNwYWNpbmcnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IDBcbiAgd2hpdGVMaXN0Wydib3JkZXItc3R5bGUnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IGRlcGVuZGluZyBvbiBpbmRpdmlkdWFsIHByb3BlcnRpZXNcbiAgd2hpdGVMaXN0Wydib3JkZXItdG9wJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiBkZXBlbmRpbmcgb24gaW5kaXZpZHVhbCBwcm9wZXJ0aWVzXG4gIHdoaXRlTGlzdFsnYm9yZGVyLXRvcC1jb2xvciddID0gdHJ1ZTsgLy8gZGVmYXVsdDogY3VycmVudCBjb2xvclxuICB3aGl0ZUxpc3RbJ2JvcmRlci10b3AtbGVmdC1yYWRpdXMnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IDBcbiAgd2hpdGVMaXN0Wydib3JkZXItdG9wLXJpZ2h0LXJhZGl1cyddID0gdHJ1ZTsgLy8gZGVmYXVsdDogMFxuICB3aGl0ZUxpc3RbJ2JvcmRlci10b3Atc3R5bGUnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IG5vbmVcbiAgd2hpdGVMaXN0Wydib3JkZXItdG9wLXdpZHRoJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiBtZWRpdW1cbiAgd2hpdGVMaXN0Wydib3JkZXItd2lkdGgnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IGRlcGVuZGluZyBvbiBpbmRpdmlkdWFsIHByb3BlcnRpZXNcbiAgd2hpdGVMaXN0Wydib3R0b20nXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBhdXRvXG4gIHdoaXRlTGlzdFsnYm94LWRlY29yYXRpb24tYnJlYWsnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IHNsaWNlXG4gIHdoaXRlTGlzdFsnYm94LXNoYWRvdyddID0gdHJ1ZTsgLy8gZGVmYXVsdDogbm9uZVxuICB3aGl0ZUxpc3RbJ2JveC1zaXppbmcnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IGNvbnRlbnQtYm94XG4gIHdoaXRlTGlzdFsnYm94LXNuYXAnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IG5vbmVcbiAgd2hpdGVMaXN0Wydib3gtc3VwcHJlc3MnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IHNob3dcbiAgd2hpdGVMaXN0WydicmVhay1hZnRlciddID0gdHJ1ZTsgLy8gZGVmYXVsdDogYXV0b1xuICB3aGl0ZUxpc3RbJ2JyZWFrLWJlZm9yZSddID0gdHJ1ZTsgLy8gZGVmYXVsdDogYXV0b1xuICB3aGl0ZUxpc3RbJ2JyZWFrLWluc2lkZSddID0gdHJ1ZTsgLy8gZGVmYXVsdDogYXV0b1xuICB3aGl0ZUxpc3RbJ2NhcHRpb24tc2lkZSddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IHRvcFxuICB3aGl0ZUxpc3RbJ2NoYWlucyddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IG5vbmVcbiAgd2hpdGVMaXN0WydjbGVhciddID0gdHJ1ZTsgLy8gZGVmYXVsdDogbm9uZVxuICB3aGl0ZUxpc3RbJ2NsaXAnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBhdXRvXG4gIHdoaXRlTGlzdFsnY2xpcC1wYXRoJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogbm9uZVxuICB3aGl0ZUxpc3RbJ2NsaXAtcnVsZSddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IG5vbnplcm9cbiAgd2hpdGVMaXN0Wydjb2xvciddID0gdHJ1ZTsgLy8gZGVmYXVsdDogaW1wbGVtZW50YXRpb24gZGVwZW5kZW50XG4gIHdoaXRlTGlzdFsnY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiBhdXRvXG4gIHdoaXRlTGlzdFsnY29sdW1uLWNvdW50J10gPSBmYWxzZTsgLy8gZGVmYXVsdDogYXV0b1xuICB3aGl0ZUxpc3RbJ2NvbHVtbi1maWxsJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogYmFsYW5jZVxuICB3aGl0ZUxpc3RbJ2NvbHVtbi1nYXAnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBub3JtYWxcbiAgd2hpdGVMaXN0Wydjb2x1bW4tcnVsZSddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGRlcGVuZGluZyBvbiBpbmRpdmlkdWFsIHByb3BlcnRpZXNcbiAgd2hpdGVMaXN0Wydjb2x1bW4tcnVsZS1jb2xvciddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGN1cnJlbnQgY29sb3JcbiAgd2hpdGVMaXN0Wydjb2x1bW4tcnVsZS1zdHlsZSddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IG1lZGl1bVxuICB3aGl0ZUxpc3RbJ2NvbHVtbi1ydWxlLXdpZHRoJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogbWVkaXVtXG4gIHdoaXRlTGlzdFsnY29sdW1uLXNwYW4nXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBub25lXG4gIHdoaXRlTGlzdFsnY29sdW1uLXdpZHRoJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogYXV0b1xuICB3aGl0ZUxpc3RbJ2NvbHVtbnMnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBkZXBlbmRpbmcgb24gaW5kaXZpZHVhbCBwcm9wZXJ0aWVzXG4gIHdoaXRlTGlzdFsnY29udGFpbiddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IG5vbmVcbiAgd2hpdGVMaXN0Wydjb250ZW50J10gPSBmYWxzZTsgLy8gZGVmYXVsdDogbm9ybWFsXG4gIHdoaXRlTGlzdFsnY291bnRlci1pbmNyZW1lbnQnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBub25lXG4gIHdoaXRlTGlzdFsnY291bnRlci1yZXNldCddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IG5vbmVcbiAgd2hpdGVMaXN0Wydjb3VudGVyLXNldCddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IG5vbmVcbiAgd2hpdGVMaXN0Wydjcm9wJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogYXV0b1xuICB3aGl0ZUxpc3RbJ2N1ZSddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGRlcGVuZGluZyBvbiBpbmRpdmlkdWFsIHByb3BlcnRpZXNcbiAgd2hpdGVMaXN0WydjdWUtYWZ0ZXInXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBub25lXG4gIHdoaXRlTGlzdFsnY3VlLWJlZm9yZSddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IG5vbmVcbiAgd2hpdGVMaXN0WydjdXJzb3InXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBhdXRvXG4gIHdoaXRlTGlzdFsnZGlyZWN0aW9uJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogbHRyXG4gIHdoaXRlTGlzdFsnZGlzcGxheSddID0gdHJ1ZTsgLy8gZGVmYXVsdDogZGVwZW5kaW5nIG9uIGluZGl2aWR1YWwgcHJvcGVydGllc1xuICB3aGl0ZUxpc3RbJ2Rpc3BsYXktaW5zaWRlJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiBhdXRvXG4gIHdoaXRlTGlzdFsnZGlzcGxheS1saXN0J10gPSB0cnVlOyAvLyBkZWZhdWx0OiBub25lXG4gIHdoaXRlTGlzdFsnZGlzcGxheS1vdXRzaWRlJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiBpbmxpbmUtbGV2ZWxcbiAgd2hpdGVMaXN0Wydkb21pbmFudC1iYXNlbGluZSddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGF1dG9cbiAgd2hpdGVMaXN0WydlbGV2YXRpb24nXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBsZXZlbFxuICB3aGl0ZUxpc3RbJ2VtcHR5LWNlbGxzJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogc2hvd1xuICB3aGl0ZUxpc3RbJ2ZpbHRlciddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IG5vbmVcbiAgd2hpdGVMaXN0WydmbGV4J10gPSBmYWxzZTsgLy8gZGVmYXVsdDogZGVwZW5kaW5nIG9uIGluZGl2aWR1YWwgcHJvcGVydGllc1xuICB3aGl0ZUxpc3RbJ2ZsZXgtYmFzaXMnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBhdXRvXG4gIHdoaXRlTGlzdFsnZmxleC1kaXJlY3Rpb24nXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiByb3dcbiAgd2hpdGVMaXN0WydmbGV4LWZsb3cnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBkZXBlbmRpbmcgb24gaW5kaXZpZHVhbCBwcm9wZXJ0aWVzXG4gIHdoaXRlTGlzdFsnZmxleC1ncm93J10gPSBmYWxzZTsgLy8gZGVmYXVsdDogMFxuICB3aGl0ZUxpc3RbJ2ZsZXgtc2hyaW5rJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogMVxuICB3aGl0ZUxpc3RbJ2ZsZXgtd3JhcCddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IG5vd3JhcFxuICB3aGl0ZUxpc3RbJ2Zsb2F0J10gPSBmYWxzZTsgLy8gZGVmYXVsdDogbm9uZVxuICB3aGl0ZUxpc3RbJ2Zsb2F0LW9mZnNldCddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IDAgMFxuICB3aGl0ZUxpc3RbJ2Zsb29kLWNvbG9yJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogYmxhY2tcbiAgd2hpdGVMaXN0WydmbG9vZC1vcGFjaXR5J10gPSBmYWxzZTsgLy8gZGVmYXVsdDogMVxuICB3aGl0ZUxpc3RbJ2Zsb3ctZnJvbSddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IG5vbmVcbiAgd2hpdGVMaXN0WydmbG93LWludG8nXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBub25lXG4gIHdoaXRlTGlzdFsnZm9udCddID0gdHJ1ZTsgLy8gZGVmYXVsdDogZGVwZW5kaW5nIG9uIGluZGl2aWR1YWwgcHJvcGVydGllc1xuICB3aGl0ZUxpc3RbJ2ZvbnQtZmFtaWx5J10gPSB0cnVlOyAvLyBkZWZhdWx0OiBpbXBsZW1lbnRhdGlvbiBkZXBlbmRlbnRcbiAgd2hpdGVMaXN0Wydmb250LWZlYXR1cmUtc2V0dGluZ3MnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IG5vcm1hbFxuICB3aGl0ZUxpc3RbJ2ZvbnQta2VybmluZyddID0gdHJ1ZTsgLy8gZGVmYXVsdDogYXV0b1xuICB3aGl0ZUxpc3RbJ2ZvbnQtbGFuZ3VhZ2Utb3ZlcnJpZGUnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IG5vcm1hbFxuICB3aGl0ZUxpc3RbJ2ZvbnQtc2l6ZSddID0gdHJ1ZTsgLy8gZGVmYXVsdDogbWVkaXVtXG4gIHdoaXRlTGlzdFsnZm9udC1zaXplLWFkanVzdCddID0gdHJ1ZTsgLy8gZGVmYXVsdDogbm9uZVxuICB3aGl0ZUxpc3RbJ2ZvbnQtc3RyZXRjaCddID0gdHJ1ZTsgLy8gZGVmYXVsdDogbm9ybWFsXG4gIHdoaXRlTGlzdFsnZm9udC1zdHlsZSddID0gdHJ1ZTsgLy8gZGVmYXVsdDogbm9ybWFsXG4gIHdoaXRlTGlzdFsnZm9udC1zeW50aGVzaXMnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IHdlaWdodCBzdHlsZVxuICB3aGl0ZUxpc3RbJ2ZvbnQtdmFyaWFudCddID0gdHJ1ZTsgLy8gZGVmYXVsdDogbm9ybWFsXG4gIHdoaXRlTGlzdFsnZm9udC12YXJpYW50LWFsdGVybmF0ZXMnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IG5vcm1hbFxuICB3aGl0ZUxpc3RbJ2ZvbnQtdmFyaWFudC1jYXBzJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiBub3JtYWxcbiAgd2hpdGVMaXN0Wydmb250LXZhcmlhbnQtZWFzdC1hc2lhbiddID0gdHJ1ZTsgLy8gZGVmYXVsdDogbm9ybWFsXG4gIHdoaXRlTGlzdFsnZm9udC12YXJpYW50LWxpZ2F0dXJlcyddID0gdHJ1ZTsgLy8gZGVmYXVsdDogbm9ybWFsXG4gIHdoaXRlTGlzdFsnZm9udC12YXJpYW50LW51bWVyaWMnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IG5vcm1hbFxuICB3aGl0ZUxpc3RbJ2ZvbnQtdmFyaWFudC1wb3NpdGlvbiddID0gdHJ1ZTsgLy8gZGVmYXVsdDogbm9ybWFsXG4gIHdoaXRlTGlzdFsnZm9udC13ZWlnaHQnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IG5vcm1hbFxuICB3aGl0ZUxpc3RbJ2dyaWQnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBkZXBlbmRpbmcgb24gaW5kaXZpZHVhbCBwcm9wZXJ0aWVzXG4gIHdoaXRlTGlzdFsnZ3JpZC1hcmVhJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogZGVwZW5kaW5nIG9uIGluZGl2aWR1YWwgcHJvcGVydGllc1xuICB3aGl0ZUxpc3RbJ2dyaWQtYXV0by1jb2x1bW5zJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogYXV0b1xuICB3aGl0ZUxpc3RbJ2dyaWQtYXV0by1mbG93J10gPSBmYWxzZTsgLy8gZGVmYXVsdDogbm9uZVxuICB3aGl0ZUxpc3RbJ2dyaWQtYXV0by1yb3dzJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogYXV0b1xuICB3aGl0ZUxpc3RbJ2dyaWQtY29sdW1uJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogZGVwZW5kaW5nIG9uIGluZGl2aWR1YWwgcHJvcGVydGllc1xuICB3aGl0ZUxpc3RbJ2dyaWQtY29sdW1uLWVuZCddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGF1dG9cbiAgd2hpdGVMaXN0WydncmlkLWNvbHVtbi1zdGFydCddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGF1dG9cbiAgd2hpdGVMaXN0WydncmlkLXJvdyddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGRlcGVuZGluZyBvbiBpbmRpdmlkdWFsIHByb3BlcnRpZXNcbiAgd2hpdGVMaXN0WydncmlkLXJvdy1lbmQnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBhdXRvXG4gIHdoaXRlTGlzdFsnZ3JpZC1yb3ctc3RhcnQnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBhdXRvXG4gIHdoaXRlTGlzdFsnZ3JpZC10ZW1wbGF0ZSddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGRlcGVuZGluZyBvbiBpbmRpdmlkdWFsIHByb3BlcnRpZXNcbiAgd2hpdGVMaXN0WydncmlkLXRlbXBsYXRlLWFyZWFzJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogbm9uZVxuICB3aGl0ZUxpc3RbJ2dyaWQtdGVtcGxhdGUtY29sdW1ucyddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IG5vbmVcbiAgd2hpdGVMaXN0WydncmlkLXRlbXBsYXRlLXJvd3MnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBub25lXG4gIHdoaXRlTGlzdFsnaGFuZ2luZy1wdW5jdHVhdGlvbiddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IG5vbmVcbiAgd2hpdGVMaXN0WydoZWlnaHQnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IGF1dG9cbiAgd2hpdGVMaXN0WydoeXBoZW5zJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogbWFudWFsXG4gIHdoaXRlTGlzdFsnaWNvbiddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGF1dG9cbiAgd2hpdGVMaXN0WydpbWFnZS1vcmllbnRhdGlvbiddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGF1dG9cbiAgd2hpdGVMaXN0WydpbWFnZS1yZXNvbHV0aW9uJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogbm9ybWFsXG4gIHdoaXRlTGlzdFsnaW1lLW1vZGUnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBhdXRvXG4gIHdoaXRlTGlzdFsnaW5pdGlhbC1sZXR0ZXJzJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogbm9ybWFsXG4gIHdoaXRlTGlzdFsnaW5saW5lLWJveC1hbGlnbiddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGxhc3RcbiAgd2hpdGVMaXN0WydqdXN0aWZ5LWNvbnRlbnQnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBhdXRvXG4gIHdoaXRlTGlzdFsnanVzdGlmeS1pdGVtcyddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGF1dG9cbiAgd2hpdGVMaXN0WydqdXN0aWZ5LXNlbGYnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBhdXRvXG4gIHdoaXRlTGlzdFsnbGVmdCddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGF1dG9cbiAgd2hpdGVMaXN0WydsZXR0ZXItc3BhY2luZyddID0gdHJ1ZTsgLy8gZGVmYXVsdDogbm9ybWFsXG4gIHdoaXRlTGlzdFsnbGlnaHRpbmctY29sb3InXSA9IHRydWU7IC8vIGRlZmF1bHQ6IHdoaXRlXG4gIHdoaXRlTGlzdFsnbGluZS1ib3gtY29udGFpbiddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGJsb2NrIGlubGluZSByZXBsYWNlZFxuICB3aGl0ZUxpc3RbJ2xpbmUtYnJlYWsnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBhdXRvXG4gIHdoaXRlTGlzdFsnbGluZS1ncmlkJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogbWF0Y2gtcGFyZW50XG4gIHdoaXRlTGlzdFsnbGluZS1oZWlnaHQnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBub3JtYWxcbiAgd2hpdGVMaXN0WydsaW5lLXNuYXAnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBub25lXG4gIHdoaXRlTGlzdFsnbGluZS1zdGFja2luZyddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGRlcGVuZGluZyBvbiBpbmRpdmlkdWFsIHByb3BlcnRpZXNcbiAgd2hpdGVMaXN0WydsaW5lLXN0YWNraW5nLXJ1YnknXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBleGNsdWRlLXJ1YnlcbiAgd2hpdGVMaXN0WydsaW5lLXN0YWNraW5nLXNoaWZ0J10gPSBmYWxzZTsgLy8gZGVmYXVsdDogY29uc2lkZXItc2hpZnRzXG4gIHdoaXRlTGlzdFsnbGluZS1zdGFja2luZy1zdHJhdGVneSddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGlubGluZS1saW5lLWhlaWdodFxuICB3aGl0ZUxpc3RbJ2xpc3Qtc3R5bGUnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IGRlcGVuZGluZyBvbiBpbmRpdmlkdWFsIHByb3BlcnRpZXNcbiAgd2hpdGVMaXN0WydsaXN0LXN0eWxlLWltYWdlJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiBub25lXG4gIHdoaXRlTGlzdFsnbGlzdC1zdHlsZS1wb3NpdGlvbiddID0gdHJ1ZTsgLy8gZGVmYXVsdDogb3V0c2lkZVxuICB3aGl0ZUxpc3RbJ2xpc3Qtc3R5bGUtdHlwZSddID0gdHJ1ZTsgLy8gZGVmYXVsdDogZGlzY1xuICB3aGl0ZUxpc3RbJ21hcmdpbiddID0gdHJ1ZTsgLy8gZGVmYXVsdDogZGVwZW5kaW5nIG9uIGluZGl2aWR1YWwgcHJvcGVydGllc1xuICB3aGl0ZUxpc3RbJ21hcmdpbi1ib3R0b20nXSA9IHRydWU7IC8vIGRlZmF1bHQ6IDBcbiAgd2hpdGVMaXN0WydtYXJnaW4tbGVmdCddID0gdHJ1ZTsgLy8gZGVmYXVsdDogMFxuICB3aGl0ZUxpc3RbJ21hcmdpbi1yaWdodCddID0gdHJ1ZTsgLy8gZGVmYXVsdDogMFxuICB3aGl0ZUxpc3RbJ21hcmdpbi10b3AnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IDBcbiAgd2hpdGVMaXN0WydtYXJrZXItb2Zmc2V0J10gPSBmYWxzZTsgLy8gZGVmYXVsdDogYXV0b1xuICB3aGl0ZUxpc3RbJ21hcmtlci1zaWRlJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogbGlzdC1pdGVtXG4gIHdoaXRlTGlzdFsnbWFya3MnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBub25lXG4gIHdoaXRlTGlzdFsnbWFzayddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGJvcmRlci1ib3hcbiAgd2hpdGVMaXN0WydtYXNrLWJveCddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IHNlZSBpbmRpdmlkdWFsIHByb3BlcnRpZXNcbiAgd2hpdGVMaXN0WydtYXNrLWJveC1vdXRzZXQnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiAwXG4gIHdoaXRlTGlzdFsnbWFzay1ib3gtcmVwZWF0J10gPSBmYWxzZTsgLy8gZGVmYXVsdDogc3RyZXRjaFxuICB3aGl0ZUxpc3RbJ21hc2stYm94LXNsaWNlJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogMCBmaWxsXG4gIHdoaXRlTGlzdFsnbWFzay1ib3gtc291cmNlJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogbm9uZVxuICB3aGl0ZUxpc3RbJ21hc2stYm94LXdpZHRoJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogYXV0b1xuICB3aGl0ZUxpc3RbJ21hc2stY2xpcCddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGJvcmRlci1ib3hcbiAgd2hpdGVMaXN0WydtYXNrLWltYWdlJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogbm9uZVxuICB3aGl0ZUxpc3RbJ21hc2stb3JpZ2luJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogYm9yZGVyLWJveFxuICB3aGl0ZUxpc3RbJ21hc2stcG9zaXRpb24nXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBjZW50ZXJcbiAgd2hpdGVMaXN0WydtYXNrLXJlcGVhdCddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IG5vLXJlcGVhdFxuICB3aGl0ZUxpc3RbJ21hc2stc2l6ZSddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGJvcmRlci1ib3hcbiAgd2hpdGVMaXN0WydtYXNrLXNvdXJjZS10eXBlJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogYXV0b1xuICB3aGl0ZUxpc3RbJ21hc2stdHlwZSddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGx1bWluYW5jZVxuICB3aGl0ZUxpc3RbJ21heC1oZWlnaHQnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IG5vbmVcbiAgd2hpdGVMaXN0WydtYXgtbGluZXMnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBub25lXG4gIHdoaXRlTGlzdFsnbWF4LXdpZHRoJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiBub25lXG4gIHdoaXRlTGlzdFsnbWluLWhlaWdodCddID0gdHJ1ZTsgLy8gZGVmYXVsdDogMFxuICB3aGl0ZUxpc3RbJ21pbi13aWR0aCddID0gdHJ1ZTsgLy8gZGVmYXVsdDogMFxuICB3aGl0ZUxpc3RbJ21vdmUtdG8nXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBub3JtYWxcbiAgd2hpdGVMaXN0WyduYXYtZG93biddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGF1dG9cbiAgd2hpdGVMaXN0WyduYXYtaW5kZXgnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBhdXRvXG4gIHdoaXRlTGlzdFsnbmF2LWxlZnQnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBhdXRvXG4gIHdoaXRlTGlzdFsnbmF2LXJpZ2h0J10gPSBmYWxzZTsgLy8gZGVmYXVsdDogYXV0b1xuICB3aGl0ZUxpc3RbJ25hdi11cCddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGF1dG9cbiAgd2hpdGVMaXN0WydvYmplY3QtZml0J10gPSBmYWxzZTsgLy8gZGVmYXVsdDogZmlsbFxuICB3aGl0ZUxpc3RbJ29iamVjdC1wb3NpdGlvbiddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IDUwJSA1MCVcbiAgd2hpdGVMaXN0WydvcGFjaXR5J10gPSBmYWxzZTsgLy8gZGVmYXVsdDogMVxuICB3aGl0ZUxpc3RbJ29yZGVyJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogMFxuICB3aGl0ZUxpc3RbJ29ycGhhbnMnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiAyXG4gIHdoaXRlTGlzdFsnb3V0bGluZSddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGRlcGVuZGluZyBvbiBpbmRpdmlkdWFsIHByb3BlcnRpZXNcbiAgd2hpdGVMaXN0WydvdXRsaW5lLWNvbG9yJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogaW52ZXJ0XG4gIHdoaXRlTGlzdFsnb3V0bGluZS1vZmZzZXQnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiAwXG4gIHdoaXRlTGlzdFsnb3V0bGluZS1zdHlsZSddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IG5vbmVcbiAgd2hpdGVMaXN0WydvdXRsaW5lLXdpZHRoJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogbWVkaXVtXG4gIHdoaXRlTGlzdFsnb3ZlcmZsb3cnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBkZXBlbmRpbmcgb24gaW5kaXZpZHVhbCBwcm9wZXJ0aWVzXG4gIHdoaXRlTGlzdFsnb3ZlcmZsb3ctd3JhcCddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IG5vcm1hbFxuICB3aGl0ZUxpc3RbJ292ZXJmbG93LXgnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiB2aXNpYmxlXG4gIHdoaXRlTGlzdFsnb3ZlcmZsb3cteSddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IHZpc2libGVcbiAgd2hpdGVMaXN0WydwYWRkaW5nJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiBkZXBlbmRpbmcgb24gaW5kaXZpZHVhbCBwcm9wZXJ0aWVzXG4gIHdoaXRlTGlzdFsncGFkZGluZy1ib3R0b20nXSA9IHRydWU7IC8vIGRlZmF1bHQ6IDBcbiAgd2hpdGVMaXN0WydwYWRkaW5nLWxlZnQnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IDBcbiAgd2hpdGVMaXN0WydwYWRkaW5nLXJpZ2h0J10gPSB0cnVlOyAvLyBkZWZhdWx0OiAwXG4gIHdoaXRlTGlzdFsncGFkZGluZy10b3AnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IDBcbiAgd2hpdGVMaXN0WydwYWdlJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogYXV0b1xuICB3aGl0ZUxpc3RbJ3BhZ2UtYnJlYWstYWZ0ZXInXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBhdXRvXG4gIHdoaXRlTGlzdFsncGFnZS1icmVhay1iZWZvcmUnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBhdXRvXG4gIHdoaXRlTGlzdFsncGFnZS1icmVhay1pbnNpZGUnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBhdXRvXG4gIHdoaXRlTGlzdFsncGFnZS1wb2xpY3knXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBzdGFydFxuICB3aGl0ZUxpc3RbJ3BhdXNlJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogaW1wbGVtZW50YXRpb24gZGVwZW5kZW50XG4gIHdoaXRlTGlzdFsncGF1c2UtYWZ0ZXInXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBpbXBsZW1lbnRhdGlvbiBkZXBlbmRlbnRcbiAgd2hpdGVMaXN0WydwYXVzZS1iZWZvcmUnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBpbXBsZW1lbnRhdGlvbiBkZXBlbmRlbnRcbiAgd2hpdGVMaXN0WydwZXJzcGVjdGl2ZSddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IG5vbmVcbiAgd2hpdGVMaXN0WydwZXJzcGVjdGl2ZS1vcmlnaW4nXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiA1MCUgNTAlXG4gIHdoaXRlTGlzdFsncGl0Y2gnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBtZWRpdW1cbiAgd2hpdGVMaXN0WydwaXRjaC1yYW5nZSddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IDUwXG4gIHdoaXRlTGlzdFsncGxheS1kdXJpbmcnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBhdXRvXG4gIHdoaXRlTGlzdFsncG9zaXRpb24nXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBzdGF0aWNcbiAgd2hpdGVMaXN0WydwcmVzZW50YXRpb24tbGV2ZWwnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiAwXG4gIHdoaXRlTGlzdFsncXVvdGVzJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogdGV4dFxuICB3aGl0ZUxpc3RbJ3JlZ2lvbi1mcmFnbWVudCddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGF1dG9cbiAgd2hpdGVMaXN0WydyZXNpemUnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBub25lXG4gIHdoaXRlTGlzdFsncmVzdCddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGRlcGVuZGluZyBvbiBpbmRpdmlkdWFsIHByb3BlcnRpZXNcbiAgd2hpdGVMaXN0WydyZXN0LWFmdGVyJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogbm9uZVxuICB3aGl0ZUxpc3RbJ3Jlc3QtYmVmb3JlJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogbm9uZVxuICB3aGl0ZUxpc3RbJ3JpY2huZXNzJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogNTBcbiAgd2hpdGVMaXN0WydyaWdodCddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGF1dG9cbiAgd2hpdGVMaXN0Wydyb3RhdGlvbiddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IDBcbiAgd2hpdGVMaXN0Wydyb3RhdGlvbi1wb2ludCddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IDUwJSA1MCVcbiAgd2hpdGVMaXN0WydydWJ5LWFsaWduJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogYXV0b1xuICB3aGl0ZUxpc3RbJ3J1YnktbWVyZ2UnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBzZXBhcmF0ZVxuICB3aGl0ZUxpc3RbJ3J1YnktcG9zaXRpb24nXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBiZWZvcmVcbiAgd2hpdGVMaXN0WydzaGFwZS1pbWFnZS10aHJlc2hvbGQnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiAwLjBcbiAgd2hpdGVMaXN0WydzaGFwZS1vdXRzaWRlJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogbm9uZVxuICB3aGl0ZUxpc3RbJ3NoYXBlLW1hcmdpbiddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IDBcbiAgd2hpdGVMaXN0WydzaXplJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogYXV0b1xuICB3aGl0ZUxpc3RbJ3NwZWFrJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogYXV0b1xuICB3aGl0ZUxpc3RbJ3NwZWFrLWFzJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogbm9ybWFsXG4gIHdoaXRlTGlzdFsnc3BlYWstaGVhZGVyJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogb25jZVxuICB3aGl0ZUxpc3RbJ3NwZWFrLW51bWVyYWwnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBjb250aW51b3VzXG4gIHdoaXRlTGlzdFsnc3BlYWstcHVuY3R1YXRpb24nXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBub25lXG4gIHdoaXRlTGlzdFsnc3BlZWNoLXJhdGUnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBtZWRpdW1cbiAgd2hpdGVMaXN0WydzdHJlc3MnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiA1MFxuICB3aGl0ZUxpc3RbJ3N0cmluZy1zZXQnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBub25lXG4gIHdoaXRlTGlzdFsndGFiLXNpemUnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiA4XG4gIHdoaXRlTGlzdFsndGFibGUtbGF5b3V0J10gPSBmYWxzZTsgLy8gZGVmYXVsdDogYXV0b1xuICB3aGl0ZUxpc3RbJ3RleHQtYWxpZ24nXSA9IHRydWU7IC8vIGRlZmF1bHQ6IHN0YXJ0XG4gIHdoaXRlTGlzdFsndGV4dC1hbGlnbi1sYXN0J10gPSB0cnVlOyAvLyBkZWZhdWx0OiBhdXRvXG4gIHdoaXRlTGlzdFsndGV4dC1jb21iaW5lLXVwcmlnaHQnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IG5vbmVcbiAgd2hpdGVMaXN0Wyd0ZXh0LWRlY29yYXRpb24nXSA9IHRydWU7IC8vIGRlZmF1bHQ6IG5vbmVcbiAgd2hpdGVMaXN0Wyd0ZXh0LWRlY29yYXRpb24tY29sb3InXSA9IHRydWU7IC8vIGRlZmF1bHQ6IGN1cnJlbnRDb2xvclxuICB3aGl0ZUxpc3RbJ3RleHQtZGVjb3JhdGlvbi1saW5lJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiBub25lXG4gIHdoaXRlTGlzdFsndGV4dC1kZWNvcmF0aW9uLXNraXAnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IG9iamVjdHNcbiAgd2hpdGVMaXN0Wyd0ZXh0LWRlY29yYXRpb24tc3R5bGUnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IHNvbGlkXG4gIHdoaXRlTGlzdFsndGV4dC1lbXBoYXNpcyddID0gdHJ1ZTsgLy8gZGVmYXVsdDogZGVwZW5kaW5nIG9uIGluZGl2aWR1YWwgcHJvcGVydGllc1xuICB3aGl0ZUxpc3RbJ3RleHQtZW1waGFzaXMtY29sb3InXSA9IHRydWU7IC8vIGRlZmF1bHQ6IGN1cnJlbnRDb2xvclxuICB3aGl0ZUxpc3RbJ3RleHQtZW1waGFzaXMtcG9zaXRpb24nXSA9IHRydWU7IC8vIGRlZmF1bHQ6IG92ZXIgcmlnaHRcbiAgd2hpdGVMaXN0Wyd0ZXh0LWVtcGhhc2lzLXN0eWxlJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiBub25lXG4gIHdoaXRlTGlzdFsndGV4dC1oZWlnaHQnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IGF1dG9cbiAgd2hpdGVMaXN0Wyd0ZXh0LWluZGVudCddID0gdHJ1ZTsgLy8gZGVmYXVsdDogMFxuICB3aGl0ZUxpc3RbJ3RleHQtanVzdGlmeSddID0gdHJ1ZTsgLy8gZGVmYXVsdDogYXV0b1xuICB3aGl0ZUxpc3RbJ3RleHQtb3JpZW50YXRpb24nXSA9IHRydWU7IC8vIGRlZmF1bHQ6IG1peGVkXG4gIHdoaXRlTGlzdFsndGV4dC1vdmVyZmxvdyddID0gdHJ1ZTsgLy8gZGVmYXVsdDogY2xpcFxuICB3aGl0ZUxpc3RbJ3RleHQtc2hhZG93J10gPSB0cnVlOyAvLyBkZWZhdWx0OiBub25lXG4gIHdoaXRlTGlzdFsndGV4dC1zcGFjZS1jb2xsYXBzZSddID0gdHJ1ZTsgLy8gZGVmYXVsdDogY29sbGFwc2VcbiAgd2hpdGVMaXN0Wyd0ZXh0LXRyYW5zZm9ybSddID0gdHJ1ZTsgLy8gZGVmYXVsdDogbm9uZVxuICB3aGl0ZUxpc3RbJ3RleHQtdW5kZXJsaW5lLXBvc2l0aW9uJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiBhdXRvXG4gIHdoaXRlTGlzdFsndGV4dC13cmFwJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiBub3JtYWxcbiAgd2hpdGVMaXN0Wyd0b3AnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBhdXRvXG4gIHdoaXRlTGlzdFsndHJhbnNmb3JtJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogbm9uZVxuICB3aGl0ZUxpc3RbJ3RyYW5zZm9ybS1vcmlnaW4nXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiA1MCUgNTAlIDBcbiAgd2hpdGVMaXN0Wyd0cmFuc2Zvcm0tc3R5bGUnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBmbGF0XG4gIHdoaXRlTGlzdFsndHJhbnNpdGlvbiddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGRlcGVuZGluZyBvbiBpbmRpdmlkdWFsIHByb3BlcnRpZXNcbiAgd2hpdGVMaXN0Wyd0cmFuc2l0aW9uLWRlbGF5J10gPSBmYWxzZTsgLy8gZGVmYXVsdDogMHNcbiAgd2hpdGVMaXN0Wyd0cmFuc2l0aW9uLWR1cmF0aW9uJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogMHNcbiAgd2hpdGVMaXN0Wyd0cmFuc2l0aW9uLXByb3BlcnR5J10gPSBmYWxzZTsgLy8gZGVmYXVsdDogYWxsXG4gIHdoaXRlTGlzdFsndHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb24nXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBlYXNlXG4gIHdoaXRlTGlzdFsndW5pY29kZS1iaWRpJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogbm9ybWFsXG4gIHdoaXRlTGlzdFsndmVydGljYWwtYWxpZ24nXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBiYXNlbGluZVxuICB3aGl0ZUxpc3RbJ3Zpc2liaWxpdHknXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiB2aXNpYmxlXG4gIHdoaXRlTGlzdFsndm9pY2UtYmFsYW5jZSddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGNlbnRlclxuICB3aGl0ZUxpc3RbJ3ZvaWNlLWR1cmF0aW9uJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogYXV0b1xuICB3aGl0ZUxpc3RbJ3ZvaWNlLWZhbWlseSddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGltcGxlbWVudGF0aW9uIGRlcGVuZGVudFxuICB3aGl0ZUxpc3RbJ3ZvaWNlLXBpdGNoJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogbWVkaXVtXG4gIHdoaXRlTGlzdFsndm9pY2UtcmFuZ2UnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBtZWRpdW1cbiAgd2hpdGVMaXN0Wyd2b2ljZS1yYXRlJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogbm9ybWFsXG4gIHdoaXRlTGlzdFsndm9pY2Utc3RyZXNzJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogbm9ybWFsXG4gIHdoaXRlTGlzdFsndm9pY2Utdm9sdW1lJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogbWVkaXVtXG4gIHdoaXRlTGlzdFsndm9sdW1lJ10gPSBmYWxzZTsgLy8gZGVmYXVsdDogbWVkaXVtXG4gIHdoaXRlTGlzdFsnd2hpdGUtc3BhY2UnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBub3JtYWxcbiAgd2hpdGVMaXN0Wyd3aWRvd3MnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiAyXG4gIHdoaXRlTGlzdFsnd2lkdGgnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IGF1dG9cbiAgd2hpdGVMaXN0Wyd3aWxsLWNoYW5nZSddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGF1dG9cbiAgd2hpdGVMaXN0Wyd3b3JkLWJyZWFrJ10gPSB0cnVlOyAvLyBkZWZhdWx0OiBub3JtYWxcbiAgd2hpdGVMaXN0Wyd3b3JkLXNwYWNpbmcnXSA9IHRydWU7IC8vIGRlZmF1bHQ6IG5vcm1hbFxuICB3aGl0ZUxpc3RbJ3dvcmQtd3JhcCddID0gdHJ1ZTsgLy8gZGVmYXVsdDogbm9ybWFsXG4gIHdoaXRlTGlzdFsnd3JhcC1mbG93J10gPSBmYWxzZTsgLy8gZGVmYXVsdDogYXV0b1xuICB3aGl0ZUxpc3RbJ3dyYXAtdGhyb3VnaCddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IHdyYXBcbiAgd2hpdGVMaXN0Wyd3cml0aW5nLW1vZGUnXSA9IGZhbHNlOyAvLyBkZWZhdWx0OiBob3Jpem9udGFsLXRiXG4gIHdoaXRlTGlzdFsnei1pbmRleCddID0gZmFsc2U7IC8vIGRlZmF1bHQ6IGF1dG9cblxuICByZXR1cm4gd2hpdGVMaXN0O1xufVxuXG5cbi8qKlxuICog5Yy56YWN5Yiw55m95ZCN5Y2V5LiK55qE5LiA5Liq5bGe5oCn5pe2XG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZVxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZnVuY3Rpb24gb25BdHRyIChuYW1lLCB2YWx1ZSwgb3B0aW9ucykge1xuICAvLyBkbyBub3RoaW5nXG59XG5cbi8qKlxuICog5Yy56YWN5Yiw5LiN5Zyo55m95ZCN5Y2V5LiK55qE5LiA5Liq5bGe5oCn5pe2XG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZVxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZnVuY3Rpb24gb25JZ25vcmVBdHRyIChuYW1lLCB2YWx1ZSwgb3B0aW9ucykge1xuICAvLyBkbyBub3RoaW5nXG59XG5cbnZhciBSRUdFWFBfVVJMX0pBVkFTQ1JJUFQgPSAvamF2YXNjcmlwdFxccypcXDovaW1nO1xuXG4vKipcbiAqIOi/h+a7pOWxnuaAp+WAvFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZnVuY3Rpb24gc2FmZUF0dHJWYWx1ZShuYW1lLCB2YWx1ZSkge1xuICBpZiAoUkVHRVhQX1VSTF9KQVZBU0NSSVBULnRlc3QodmFsdWUpKSByZXR1cm4gJyc7XG4gIHJldHVybiB2YWx1ZTtcbn1cblxuXG5leHBvcnRzLndoaXRlTGlzdCA9IGdldERlZmF1bHRXaGl0ZUxpc3QoKTtcbmV4cG9ydHMuZ2V0RGVmYXVsdFdoaXRlTGlzdCA9IGdldERlZmF1bHRXaGl0ZUxpc3Q7XG5leHBvcnRzLm9uQXR0ciA9IG9uQXR0cjtcbmV4cG9ydHMub25JZ25vcmVBdHRyID0gb25JZ25vcmVBdHRyO1xuZXhwb3J0cy5zYWZlQXR0clZhbHVlID0gc2FmZUF0dHJWYWx1ZTtcbiIsIi8qKlxuICogY3NzZmlsdGVyXG4gKlxuICogQGF1dGhvciDogIHpm7c8bGVpem9uZ21pbkBnbWFpbC5jb20+XG4gKi9cblxudmFyIERFRkFVTFQgPSByZXF1aXJlKCcuL2RlZmF1bHQnKTtcbnZhciBGaWx0ZXJDU1MgPSByZXF1aXJlKCcuL2NzcycpO1xuXG5cbi8qKlxuICogWFNT6L+H5rukXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGNzcyDopoHov4fmu6TnmoRDU1Pku6PnoIFcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIOmAiemhue+8mndoaXRlTGlzdCwgb25BdHRyLCBvbklnbm9yZUF0dHJcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZmlsdGVyQ1NTIChodG1sLCBvcHRpb25zKSB7XG4gIHZhciB4c3MgPSBuZXcgRmlsdGVyQ1NTKG9wdGlvbnMpO1xuICByZXR1cm4geHNzLnByb2Nlc3MoaHRtbCk7XG59XG5cblxuLy8g6L6T5Ye6XG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBmaWx0ZXJDU1M7XG5leHBvcnRzLkZpbHRlckNTUyA9IEZpbHRlckNTUztcbmZvciAodmFyIGkgaW4gREVGQVVMVCkgZXhwb3J0c1tpXSA9IERFRkFVTFRbaV07XG5cbi8vIOWcqOa1j+iniOWZqOerr+S9v+eUqFxuaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gIHdpbmRvdy5maWx0ZXJDU1MgPSBtb2R1bGUuZXhwb3J0cztcbn1cbiIsIi8qKlxuICogY3NzZmlsdGVyXG4gKlxuICogQGF1dGhvciDogIHpm7c8bGVpem9uZ21pbkBnbWFpbC5jb20+XG4gKi9cblxudmFyIF8gPSByZXF1aXJlKCcuL3V0aWwnKTtcblxuXG4vKipcbiAqIOino+aekHN0eWxlXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGNzc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gb25BdHRyIOWkhOeQhuWxnuaAp+eahOWHveaVsFxuICogICDlj4LmlbDmoLzlvI/vvJogZnVuY3Rpb24gKHNvdXJjZVBvc2l0aW9uLCBwb3NpdGlvbiwgbmFtZSwgdmFsdWUsIHNvdXJjZSlcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZnVuY3Rpb24gcGFyc2VTdHlsZSAoY3NzLCBvbkF0dHIpIHtcbiAgY3NzID0gXy50cmltUmlnaHQoY3NzKTtcbiAgaWYgKGNzc1tjc3MubGVuZ3RoIC0gMV0gIT09ICc7JykgY3NzICs9ICc7JztcbiAgdmFyIGNzc0xlbmd0aCA9IGNzcy5sZW5ndGg7XG4gIHZhciBpc1BhcmVudGhlc2lzT3BlbiA9IGZhbHNlO1xuICB2YXIgbGFzdFBvcyA9IDA7XG4gIHZhciBpID0gMDtcbiAgdmFyIHJldENTUyA9ICcnO1xuXG4gIGZ1bmN0aW9uIGFkZE5ld0F0dHIgKCkge1xuICAgIC8vIOWmguaenOayoeacieato+W4uOeahOmXreWQiOWchuaLrOWPt++8jOWImeebtOaOpeW/veeVpeW9k+WJjeWxnuaAp1xuICAgIGlmICghaXNQYXJlbnRoZXNpc09wZW4pIHtcbiAgICAgIHZhciBzb3VyY2UgPSBfLnRyaW0oY3NzLnNsaWNlKGxhc3RQb3MsIGkpKTtcbiAgICAgIHZhciBqID0gc291cmNlLmluZGV4T2YoJzonKTtcbiAgICAgIGlmIChqICE9PSAtMSkge1xuICAgICAgICB2YXIgbmFtZSA9IF8udHJpbShzb3VyY2Uuc2xpY2UoMCwgaikpO1xuICAgICAgICB2YXIgdmFsdWUgPSBfLnRyaW0oc291cmNlLnNsaWNlKGogKyAxKSk7XG4gICAgICAgIC8vIOW/hemhu+acieWxnuaAp+WQjeensFxuICAgICAgICBpZiAobmFtZSkge1xuICAgICAgICAgIHZhciByZXQgPSBvbkF0dHIobGFzdFBvcywgcmV0Q1NTLmxlbmd0aCwgbmFtZSwgdmFsdWUsIHNvdXJjZSk7XG4gICAgICAgICAgaWYgKHJldCkgcmV0Q1NTICs9IHJldCArICc7ICc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdFBvcyA9IGkgKyAxO1xuICB9XG5cbiAgZm9yICg7IGkgPCBjc3NMZW5ndGg7IGkrKykge1xuICAgIHZhciBjID0gY3NzW2ldO1xuICAgIGlmIChjID09PSAnLycgJiYgY3NzW2kgKyAxXSA9PT0gJyonKSB7XG4gICAgICAvLyDlpIfms6jlvIDlp4tcbiAgICAgIHZhciBqID0gY3NzLmluZGV4T2YoJyovJywgaSArIDIpO1xuICAgICAgLy8g5aaC5p6c5rKh5pyJ5q2j5bi455qE5aSH5rOo57uT5p2f77yM5YiZ5ZCO6Z2i55qE6YOo5YiG5YWo6YOo6Lez6L+HXG4gICAgICBpZiAoaiA9PT0gLTEpIGJyZWFrO1xuICAgICAgLy8g55u05o6l5bCG5b2T5YmN5L2N572u6LCD5Yiw5aSH5rOo57uT5bC+77yM5bm25LiU5Yid5aeL5YyW54q25oCBXG4gICAgICBpID0gaiArIDE7XG4gICAgICBsYXN0UG9zID0gaSArIDE7XG4gICAgICBpc1BhcmVudGhlc2lzT3BlbiA9IGZhbHNlO1xuICAgIH0gZWxzZSBpZiAoYyA9PT0gJygnKSB7XG4gICAgICBpc1BhcmVudGhlc2lzT3BlbiA9IHRydWU7XG4gICAgfSBlbHNlIGlmIChjID09PSAnKScpIHtcbiAgICAgIGlzUGFyZW50aGVzaXNPcGVuID0gZmFsc2U7XG4gICAgfSBlbHNlIGlmIChjID09PSAnOycpIHtcbiAgICAgIGlmIChpc1BhcmVudGhlc2lzT3Blbikge1xuICAgICAgICAvLyDlnKjlnIbmi6zlj7fph4zpnaLvvIzlv73nlaVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFkZE5ld0F0dHIoKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGMgPT09ICdcXG4nKSB7XG4gICAgICBhZGROZXdBdHRyKCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIF8udHJpbShyZXRDU1MpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHBhcnNlU3R5bGU7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgaW5kZXhPZjogZnVuY3Rpb24gKGFyciwgaXRlbSkge1xuICAgIHZhciBpLCBqO1xuICAgIGlmIChBcnJheS5wcm90b3R5cGUuaW5kZXhPZikge1xuICAgICAgcmV0dXJuIGFyci5pbmRleE9mKGl0ZW0pO1xuICAgIH1cbiAgICBmb3IgKGkgPSAwLCBqID0gYXJyLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuICAgICAgaWYgKGFycltpXSA9PT0gaXRlbSkge1xuICAgICAgICByZXR1cm4gaTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIC0xO1xuICB9LFxuICBmb3JFYWNoOiBmdW5jdGlvbiAoYXJyLCBmbiwgc2NvcGUpIHtcbiAgICB2YXIgaSwgajtcbiAgICBpZiAoQXJyYXkucHJvdG90eXBlLmZvckVhY2gpIHtcbiAgICAgIHJldHVybiBhcnIuZm9yRWFjaChmbiwgc2NvcGUpO1xuICAgIH1cbiAgICBmb3IgKGkgPSAwLCBqID0gYXJyLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuICAgICAgZm4uY2FsbChzY29wZSwgYXJyW2ldLCBpLCBhcnIpO1xuICAgIH1cbiAgfSxcbiAgdHJpbTogZnVuY3Rpb24gKHN0cikge1xuICAgIGlmIChTdHJpbmcucHJvdG90eXBlLnRyaW0pIHtcbiAgICAgIHJldHVybiBzdHIudHJpbSgpO1xuICAgIH1cbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoLyheXFxzKil8KFxccyokKS9nLCAnJyk7XG4gIH0sXG4gIHRyaW1SaWdodDogZnVuY3Rpb24gKHN0cikge1xuICAgIGlmIChTdHJpbmcucHJvdG90eXBlLnRyaW1SaWdodCkge1xuICAgICAgcmV0dXJuIHN0ci50cmltUmlnaHQoKTtcbiAgICB9XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKC8oXFxzKiQpL2csICcnKTtcbiAgfVxufTtcbiIsIi8qKlxuICogZGVmYXVsdCBzZXR0aW5nc1xuICpcbiAqIEBhdXRob3IgWm9uZ21pbiBMZWk8bGVpem9uZ21pbkBnbWFpbC5jb20+XG4gKi9cblxudmFyIEZpbHRlckNTUyA9IHJlcXVpcmUoXCJjc3NmaWx0ZXJcIikuRmlsdGVyQ1NTO1xudmFyIGdldERlZmF1bHRDU1NXaGl0ZUxpc3QgPSByZXF1aXJlKFwiY3NzZmlsdGVyXCIpLmdldERlZmF1bHRXaGl0ZUxpc3Q7XG52YXIgXyA9IHJlcXVpcmUoXCIuL3V0aWxcIik7XG5cbmZ1bmN0aW9uIGdldERlZmF1bHRXaGl0ZUxpc3QoKSB7XG4gIHJldHVybiB7XG4gICAgYTogW1widGFyZ2V0XCIsIFwiaHJlZlwiLCBcInRpdGxlXCJdLFxuICAgIGFiYnI6IFtcInRpdGxlXCJdLFxuICAgIGFkZHJlc3M6IFtdLFxuICAgIGFyZWE6IFtcInNoYXBlXCIsIFwiY29vcmRzXCIsIFwiaHJlZlwiLCBcImFsdFwiXSxcbiAgICBhcnRpY2xlOiBbXSxcbiAgICBhc2lkZTogW10sXG4gICAgYXVkaW86IFtcbiAgICAgIFwiYXV0b3BsYXlcIixcbiAgICAgIFwiY29udHJvbHNcIixcbiAgICAgIFwiY3Jvc3NvcmlnaW5cIixcbiAgICAgIFwibG9vcFwiLFxuICAgICAgXCJtdXRlZFwiLFxuICAgICAgXCJwcmVsb2FkXCIsXG4gICAgICBcInNyY1wiLFxuICAgIF0sXG4gICAgYjogW10sXG4gICAgYmRpOiBbXCJkaXJcIl0sXG4gICAgYmRvOiBbXCJkaXJcIl0sXG4gICAgYmlnOiBbXSxcbiAgICBibG9ja3F1b3RlOiBbXCJjaXRlXCJdLFxuICAgIGJyOiBbXSxcbiAgICBjYXB0aW9uOiBbXSxcbiAgICBjZW50ZXI6IFtdLFxuICAgIGNpdGU6IFtdLFxuICAgIGNvZGU6IFtdLFxuICAgIGNvbDogW1wiYWxpZ25cIiwgXCJ2YWxpZ25cIiwgXCJzcGFuXCIsIFwid2lkdGhcIl0sXG4gICAgY29sZ3JvdXA6IFtcImFsaWduXCIsIFwidmFsaWduXCIsIFwic3BhblwiLCBcIndpZHRoXCJdLFxuICAgIGRkOiBbXSxcbiAgICBkZWw6IFtcImRhdGV0aW1lXCJdLFxuICAgIGRldGFpbHM6IFtcIm9wZW5cIl0sXG4gICAgZGl2OiBbXSxcbiAgICBkbDogW10sXG4gICAgZHQ6IFtdLFxuICAgIGVtOiBbXSxcbiAgICBmaWdjYXB0aW9uOiBbXSxcbiAgICBmaWd1cmU6IFtdLFxuICAgIGZvbnQ6IFtcImNvbG9yXCIsIFwic2l6ZVwiLCBcImZhY2VcIl0sXG4gICAgZm9vdGVyOiBbXSxcbiAgICBoMTogW10sXG4gICAgaDI6IFtdLFxuICAgIGgzOiBbXSxcbiAgICBoNDogW10sXG4gICAgaDU6IFtdLFxuICAgIGg2OiBbXSxcbiAgICBoZWFkZXI6IFtdLFxuICAgIGhyOiBbXSxcbiAgICBpOiBbXSxcbiAgICBpbWc6IFtcInNyY1wiLCBcImFsdFwiLCBcInRpdGxlXCIsIFwid2lkdGhcIiwgXCJoZWlnaHRcIl0sXG4gICAgaW5zOiBbXCJkYXRldGltZVwiXSxcbiAgICBsaTogW10sXG4gICAgbWFyazogW10sXG4gICAgbmF2OiBbXSxcbiAgICBvbDogW10sXG4gICAgcDogW10sXG4gICAgcHJlOiBbXSxcbiAgICBzOiBbXSxcbiAgICBzZWN0aW9uOiBbXSxcbiAgICBzbWFsbDogW10sXG4gICAgc3BhbjogW10sXG4gICAgc3ViOiBbXSxcbiAgICBzdW1tYXJ5OiBbXSxcbiAgICBzdXA6IFtdLFxuICAgIHN0cm9uZzogW10sXG4gICAgc3RyaWtlOiBbXSxcbiAgICB0YWJsZTogW1wid2lkdGhcIiwgXCJib3JkZXJcIiwgXCJhbGlnblwiLCBcInZhbGlnblwiXSxcbiAgICB0Ym9keTogW1wiYWxpZ25cIiwgXCJ2YWxpZ25cIl0sXG4gICAgdGQ6IFtcIndpZHRoXCIsIFwicm93c3BhblwiLCBcImNvbHNwYW5cIiwgXCJhbGlnblwiLCBcInZhbGlnblwiXSxcbiAgICB0Zm9vdDogW1wiYWxpZ25cIiwgXCJ2YWxpZ25cIl0sXG4gICAgdGg6IFtcIndpZHRoXCIsIFwicm93c3BhblwiLCBcImNvbHNwYW5cIiwgXCJhbGlnblwiLCBcInZhbGlnblwiXSxcbiAgICB0aGVhZDogW1wiYWxpZ25cIiwgXCJ2YWxpZ25cIl0sXG4gICAgdHI6IFtcInJvd3NwYW5cIiwgXCJhbGlnblwiLCBcInZhbGlnblwiXSxcbiAgICB0dDogW10sXG4gICAgdTogW10sXG4gICAgdWw6IFtdLFxuICAgIHZpZGVvOiBbXG4gICAgICBcImF1dG9wbGF5XCIsXG4gICAgICBcImNvbnRyb2xzXCIsXG4gICAgICBcImNyb3Nzb3JpZ2luXCIsXG4gICAgICBcImxvb3BcIixcbiAgICAgIFwibXV0ZWRcIixcbiAgICAgIFwicGxheXNpbmxpbmVcIixcbiAgICAgIFwicG9zdGVyXCIsXG4gICAgICBcInByZWxvYWRcIixcbiAgICAgIFwic3JjXCIsXG4gICAgICBcImhlaWdodFwiLFxuICAgICAgXCJ3aWR0aFwiLFxuICAgIF0sXG4gIH07XG59XG5cbnZhciBkZWZhdWx0Q1NTRmlsdGVyID0gbmV3IEZpbHRlckNTUygpO1xuXG4vKipcbiAqIGRlZmF1bHQgb25UYWcgZnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdGFnXG4gKiBAcGFyYW0ge1N0cmluZ30gaHRtbFxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZnVuY3Rpb24gb25UYWcodGFnLCBodG1sLCBvcHRpb25zKSB7XG4gIC8vIGRvIG5vdGhpbmdcbn1cblxuLyoqXG4gKiBkZWZhdWx0IG9uSWdub3JlVGFnIGZ1bmN0aW9uXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHRhZ1xuICogQHBhcmFtIHtTdHJpbmd9IGh0bWxcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIG9uSWdub3JlVGFnKHRhZywgaHRtbCwgb3B0aW9ucykge1xuICAvLyBkbyBub3RoaW5nXG59XG5cbi8qKlxuICogZGVmYXVsdCBvblRhZ0F0dHIgZnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdGFnXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIG9uVGFnQXR0cih0YWcsIG5hbWUsIHZhbHVlKSB7XG4gIC8vIGRvIG5vdGhpbmdcbn1cblxuLyoqXG4gKiBkZWZhdWx0IG9uSWdub3JlVGFnQXR0ciBmdW5jdGlvblxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB0YWdcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZnVuY3Rpb24gb25JZ25vcmVUYWdBdHRyKHRhZywgbmFtZSwgdmFsdWUpIHtcbiAgLy8gZG8gbm90aGluZ1xufVxuXG4vKipcbiAqIGRlZmF1bHQgZXNjYXBlSHRtbCBmdW5jdGlvblxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBodG1sXG4gKi9cbmZ1bmN0aW9uIGVzY2FwZUh0bWwoaHRtbCkge1xuICByZXR1cm4gaHRtbC5yZXBsYWNlKFJFR0VYUF9MVCwgXCImbHQ7XCIpLnJlcGxhY2UoUkVHRVhQX0dULCBcIiZndDtcIik7XG59XG5cbi8qKlxuICogZGVmYXVsdCBzYWZlQXR0clZhbHVlIGZ1bmN0aW9uXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHRhZ1xuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZVxuICogQHBhcmFtIHtPYmplY3R9IGNzc0ZpbHRlclxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5mdW5jdGlvbiBzYWZlQXR0clZhbHVlKHRhZywgbmFtZSwgdmFsdWUsIGNzc0ZpbHRlcikge1xuICAvLyB1bmVzY2FwZSBhdHRyaWJ1dGUgdmFsdWUgZmlyc3RseVxuICB2YWx1ZSA9IGZyaWVuZGx5QXR0clZhbHVlKHZhbHVlKTtcblxuICBpZiAobmFtZSA9PT0gXCJocmVmXCIgfHwgbmFtZSA9PT0gXCJzcmNcIikge1xuICAgIC8vIGZpbHRlciBgaHJlZmAgYW5kIGBzcmNgIGF0dHJpYnV0ZVxuICAgIC8vIG9ubHkgYWxsb3cgdGhlIHZhbHVlIHRoYXQgc3RhcnRzIHdpdGggYGh0dHA6Ly9gIHwgYGh0dHBzOi8vYCB8IGBtYWlsdG86YCB8IGAvYCB8IGAjYFxuICAgIHZhbHVlID0gXy50cmltKHZhbHVlKTtcbiAgICBpZiAodmFsdWUgPT09IFwiI1wiKSByZXR1cm4gXCIjXCI7XG4gICAgaWYgKFxuICAgICAgIShcbiAgICAgICAgdmFsdWUuc3Vic3RyKDAsIDcpID09PSBcImh0dHA6Ly9cIiB8fFxuICAgICAgICB2YWx1ZS5zdWJzdHIoMCwgOCkgPT09IFwiaHR0cHM6Ly9cIiB8fFxuICAgICAgICB2YWx1ZS5zdWJzdHIoMCwgNykgPT09IFwibWFpbHRvOlwiIHx8XG4gICAgICAgIHZhbHVlLnN1YnN0cigwLCA0KSA9PT0gXCJ0ZWw6XCIgfHxcbiAgICAgICAgdmFsdWUuc3Vic3RyKDAsIDExKSA9PT0gXCJkYXRhOmltYWdlL1wiIHx8XG4gICAgICAgIHZhbHVlLnN1YnN0cigwLCA2KSA9PT0gXCJmdHA6Ly9cIiB8fFxuICAgICAgICB2YWx1ZS5zdWJzdHIoMCwgMikgPT09IFwiLi9cIiB8fFxuICAgICAgICB2YWx1ZS5zdWJzdHIoMCwgMykgPT09IFwiLi4vXCIgfHxcbiAgICAgICAgdmFsdWVbMF0gPT09IFwiI1wiIHx8XG4gICAgICAgIHZhbHVlWzBdID09PSBcIi9cIlxuICAgICAgKVxuICAgICkge1xuICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfVxuICB9IGVsc2UgaWYgKG5hbWUgPT09IFwiYmFja2dyb3VuZFwiKSB7XG4gICAgLy8gZmlsdGVyIGBiYWNrZ3JvdW5kYCBhdHRyaWJ1dGUgKG1heWJlIG5vIHVzZSlcbiAgICAvLyBgamF2YXNjcmlwdDpgXG4gICAgUkVHRVhQX0RFRkFVTFRfT05fVEFHX0FUVFJfNC5sYXN0SW5kZXggPSAwO1xuICAgIGlmIChSRUdFWFBfREVGQVVMVF9PTl9UQUdfQVRUUl80LnRlc3QodmFsdWUpKSB7XG4gICAgICByZXR1cm4gXCJcIjtcbiAgICB9XG4gIH0gZWxzZSBpZiAobmFtZSA9PT0gXCJzdHlsZVwiKSB7XG4gICAgLy8gYGV4cHJlc3Npb24oKWBcbiAgICBSRUdFWFBfREVGQVVMVF9PTl9UQUdfQVRUUl83Lmxhc3RJbmRleCA9IDA7XG4gICAgaWYgKFJFR0VYUF9ERUZBVUxUX09OX1RBR19BVFRSXzcudGVzdCh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBcIlwiO1xuICAgIH1cbiAgICAvLyBgdXJsKClgXG4gICAgUkVHRVhQX0RFRkFVTFRfT05fVEFHX0FUVFJfOC5sYXN0SW5kZXggPSAwO1xuICAgIGlmIChSRUdFWFBfREVGQVVMVF9PTl9UQUdfQVRUUl84LnRlc3QodmFsdWUpKSB7XG4gICAgICBSRUdFWFBfREVGQVVMVF9PTl9UQUdfQVRUUl80Lmxhc3RJbmRleCA9IDA7XG4gICAgICBpZiAoUkVHRVhQX0RFRkFVTFRfT05fVEFHX0FUVFJfNC50ZXN0KHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGNzc0ZpbHRlciAhPT0gZmFsc2UpIHtcbiAgICAgIGNzc0ZpbHRlciA9IGNzc0ZpbHRlciB8fCBkZWZhdWx0Q1NTRmlsdGVyO1xuICAgICAgdmFsdWUgPSBjc3NGaWx0ZXIucHJvY2Vzcyh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgLy8gZXNjYXBlIGA8PlwiYCBiZWZvcmUgcmV0dXJuc1xuICB2YWx1ZSA9IGVzY2FwZUF0dHJWYWx1ZSh2YWx1ZSk7XG4gIHJldHVybiB2YWx1ZTtcbn1cblxuLy8gUmVnRXhwIGxpc3RcbnZhciBSRUdFWFBfTFQgPSAvPC9nO1xudmFyIFJFR0VYUF9HVCA9IC8+L2c7XG52YXIgUkVHRVhQX1FVT1RFID0gL1wiL2c7XG52YXIgUkVHRVhQX1FVT1RFXzIgPSAvJnF1b3Q7L2c7XG52YXIgUkVHRVhQX0FUVFJfVkFMVUVfMSA9IC8mIyhbYS16QS1aMC05XSopOz8vZ2ltO1xudmFyIFJFR0VYUF9BVFRSX1ZBTFVFX0NPTE9OID0gLyZjb2xvbjs/L2dpbTtcbnZhciBSRUdFWFBfQVRUUl9WQUxVRV9ORVdMSU5FID0gLyZuZXdsaW5lOz8vZ2ltO1xudmFyIFJFR0VYUF9ERUZBVUxUX09OX1RBR19BVFRSXzMgPSAvXFwvXFwqfFxcKlxcLy9nbTtcbnZhciBSRUdFWFBfREVGQVVMVF9PTl9UQUdfQVRUUl80ID1cbiAgLygoalxccyphXFxzKnZcXHMqYXx2XFxzKmJ8bFxccyppXFxzKnZcXHMqZSlcXHMqc1xccypjXFxzKnJcXHMqaVxccypwXFxzKnRcXHMqfG1cXHMqb1xccypjXFxzKmhcXHMqYSlcXDovZ2k7XG52YXIgUkVHRVhQX0RFRkFVTFRfT05fVEFHX0FUVFJfNSA9IC9eW1xcc1wiJ2BdKihkXFxzKmFcXHMqdFxccyphXFxzKilcXDovZ2k7XG52YXIgUkVHRVhQX0RFRkFVTFRfT05fVEFHX0FUVFJfNiA9IC9eW1xcc1wiJ2BdKihkXFxzKmFcXHMqdFxccyphXFxzKilcXDpcXHMqaW1hZ2VcXC8vZ2k7XG52YXIgUkVHRVhQX0RFRkFVTFRfT05fVEFHX0FUVFJfNyA9XG4gIC9lXFxzKnhcXHMqcFxccypyXFxzKmVcXHMqc1xccypzXFxzKmlcXHMqb1xccypuXFxzKlxcKC4qL2dpO1xudmFyIFJFR0VYUF9ERUZBVUxUX09OX1RBR19BVFRSXzggPSAvdVxccypyXFxzKmxcXHMqXFwoLiovZ2k7XG5cbi8qKlxuICogZXNjYXBlIGRvdWJsZSBxdW90ZVxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge1N0cmluZ30gc3RyXG4gKi9cbmZ1bmN0aW9uIGVzY2FwZVF1b3RlKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoUkVHRVhQX1FVT1RFLCBcIiZxdW90O1wiKTtcbn1cblxuLyoqXG4gKiB1bmVzY2FwZSBkb3VibGUgcXVvdGVcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtTdHJpbmd9IHN0clxuICovXG5mdW5jdGlvbiB1bmVzY2FwZVF1b3RlKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoUkVHRVhQX1FVT1RFXzIsICdcIicpO1xufVxuXG4vKipcbiAqIGVzY2FwZSBodG1sIGVudGl0aWVzXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5mdW5jdGlvbiBlc2NhcGVIdG1sRW50aXRpZXMoc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZShSRUdFWFBfQVRUUl9WQUxVRV8xLCBmdW5jdGlvbiByZXBsYWNlVW5pY29kZShzdHIsIGNvZGUpIHtcbiAgICByZXR1cm4gY29kZVswXSA9PT0gXCJ4XCIgfHwgY29kZVswXSA9PT0gXCJYXCJcbiAgICAgID8gU3RyaW5nLmZyb21DaGFyQ29kZShwYXJzZUludChjb2RlLnN1YnN0cigxKSwgMTYpKVxuICAgICAgOiBTdHJpbmcuZnJvbUNoYXJDb2RlKHBhcnNlSW50KGNvZGUsIDEwKSk7XG4gIH0pO1xufVxuXG4vKipcbiAqIGVzY2FwZSBodG1sNSBuZXcgZGFuZ2VyIGVudGl0aWVzXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5mdW5jdGlvbiBlc2NhcGVEYW5nZXJIdG1sNUVudGl0aWVzKHN0cikge1xuICByZXR1cm4gc3RyXG4gICAgLnJlcGxhY2UoUkVHRVhQX0FUVFJfVkFMVUVfQ09MT04sIFwiOlwiKVxuICAgIC5yZXBsYWNlKFJFR0VYUF9BVFRSX1ZBTFVFX05FV0xJTkUsIFwiIFwiKTtcbn1cblxuLyoqXG4gKiBjbGVhciBub25wcmludGFibGUgY2hhcmFjdGVyc1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZnVuY3Rpb24gY2xlYXJOb25QcmludGFibGVDaGFyYWN0ZXIoc3RyKSB7XG4gIHZhciBzdHIyID0gXCJcIjtcbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHN0ci5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIHN0cjIgKz0gc3RyLmNoYXJDb2RlQXQoaSkgPCAzMiA/IFwiIFwiIDogc3RyLmNoYXJBdChpKTtcbiAgfVxuICByZXR1cm4gXy50cmltKHN0cjIpO1xufVxuXG4vKipcbiAqIGdldCBmcmllbmRseSBhdHRyaWJ1dGUgdmFsdWVcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGZyaWVuZGx5QXR0clZhbHVlKHN0cikge1xuICBzdHIgPSB1bmVzY2FwZVF1b3RlKHN0cik7XG4gIHN0ciA9IGVzY2FwZUh0bWxFbnRpdGllcyhzdHIpO1xuICBzdHIgPSBlc2NhcGVEYW5nZXJIdG1sNUVudGl0aWVzKHN0cik7XG4gIHN0ciA9IGNsZWFyTm9uUHJpbnRhYmxlQ2hhcmFjdGVyKHN0cik7XG4gIHJldHVybiBzdHI7XG59XG5cbi8qKlxuICogdW5lc2NhcGUgYXR0cmlidXRlIHZhbHVlXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5mdW5jdGlvbiBlc2NhcGVBdHRyVmFsdWUoc3RyKSB7XG4gIHN0ciA9IGVzY2FwZVF1b3RlKHN0cik7XG4gIHN0ciA9IGVzY2FwZUh0bWwoc3RyKTtcbiAgcmV0dXJuIHN0cjtcbn1cblxuLyoqXG4gKiBgb25JZ25vcmVUYWdgIGZ1bmN0aW9uIGZvciByZW1vdmluZyBhbGwgdGhlIHRhZ3MgdGhhdCBhcmUgbm90IGluIHdoaXRlbGlzdFxuICovXG5mdW5jdGlvbiBvbklnbm9yZVRhZ1N0cmlwQWxsKCkge1xuICByZXR1cm4gXCJcIjtcbn1cblxuLyoqXG4gKiByZW1vdmUgdGFnIGJvZHlcbiAqIHNwZWNpZnkgYSBgdGFnc2AgbGlzdCwgaWYgdGhlIHRhZyBpcyBub3QgaW4gdGhlIGB0YWdzYCBsaXN0IHRoZW4gcHJvY2VzcyBieSB0aGUgc3BlY2lmeSBmdW5jdGlvbiAob3B0aW9uYWwpXG4gKlxuICogQHBhcmFtIHthcnJheX0gdGFnc1xuICogQHBhcmFtIHtmdW5jdGlvbn0gbmV4dFxuICovXG5mdW5jdGlvbiBTdHJpcFRhZ0JvZHkodGFncywgbmV4dCkge1xuICBpZiAodHlwZW9mIG5leHQgIT09IFwiZnVuY3Rpb25cIikge1xuICAgIG5leHQgPSBmdW5jdGlvbiAoKSB7fTtcbiAgfVxuXG4gIHZhciBpc1JlbW92ZUFsbFRhZyA9ICFBcnJheS5pc0FycmF5KHRhZ3MpO1xuICBmdW5jdGlvbiBpc1JlbW92ZVRhZyh0YWcpIHtcbiAgICBpZiAoaXNSZW1vdmVBbGxUYWcpIHJldHVybiB0cnVlO1xuICAgIHJldHVybiBfLmluZGV4T2YodGFncywgdGFnKSAhPT0gLTE7XG4gIH1cblxuICB2YXIgcmVtb3ZlTGlzdCA9IFtdO1xuICB2YXIgcG9zU3RhcnQgPSBmYWxzZTtcblxuICByZXR1cm4ge1xuICAgIG9uSWdub3JlVGFnOiBmdW5jdGlvbiAodGFnLCBodG1sLCBvcHRpb25zKSB7XG4gICAgICBpZiAoaXNSZW1vdmVUYWcodGFnKSkge1xuICAgICAgICBpZiAob3B0aW9ucy5pc0Nsb3NpbmcpIHtcbiAgICAgICAgICB2YXIgcmV0ID0gXCJbL3JlbW92ZWRdXCI7XG4gICAgICAgICAgdmFyIGVuZCA9IG9wdGlvbnMucG9zaXRpb24gKyByZXQubGVuZ3RoO1xuICAgICAgICAgIHJlbW92ZUxpc3QucHVzaChbXG4gICAgICAgICAgICBwb3NTdGFydCAhPT0gZmFsc2UgPyBwb3NTdGFydCA6IG9wdGlvbnMucG9zaXRpb24sXG4gICAgICAgICAgICBlbmQsXG4gICAgICAgICAgXSk7XG4gICAgICAgICAgcG9zU3RhcnQgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICghcG9zU3RhcnQpIHtcbiAgICAgICAgICAgIHBvc1N0YXJ0ID0gb3B0aW9ucy5wb3NpdGlvbjtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIFwiW3JlbW92ZWRdXCI7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBuZXh0KHRhZywgaHRtbCwgb3B0aW9ucyk7XG4gICAgICB9XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIChodG1sKSB7XG4gICAgICB2YXIgcmV0aHRtbCA9IFwiXCI7XG4gICAgICB2YXIgbGFzdFBvcyA9IDA7XG4gICAgICBfLmZvckVhY2gocmVtb3ZlTGlzdCwgZnVuY3Rpb24gKHBvcykge1xuICAgICAgICByZXRodG1sICs9IGh0bWwuc2xpY2UobGFzdFBvcywgcG9zWzBdKTtcbiAgICAgICAgbGFzdFBvcyA9IHBvc1sxXTtcbiAgICAgIH0pO1xuICAgICAgcmV0aHRtbCArPSBodG1sLnNsaWNlKGxhc3RQb3MpO1xuICAgICAgcmV0dXJuIHJldGh0bWw7XG4gICAgfSxcbiAgfTtcbn1cblxuLyoqXG4gKiByZW1vdmUgaHRtbCBjb21tZW50c1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBodG1sXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIHN0cmlwQ29tbWVudFRhZyhodG1sKSB7XG4gIHZhciByZXRIdG1sID0gXCJcIjtcbiAgdmFyIGxhc3RQb3MgPSAwO1xuICB3aGlsZSAobGFzdFBvcyA8IGh0bWwubGVuZ3RoKSB7XG4gICAgdmFyIGkgPSBodG1sLmluZGV4T2YoXCI8IS0tXCIsIGxhc3RQb3MpO1xuICAgIGlmIChpID09PSAtMSkge1xuICAgICAgcmV0SHRtbCArPSBodG1sLnNsaWNlKGxhc3RQb3MpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHJldEh0bWwgKz0gaHRtbC5zbGljZShsYXN0UG9zLCBpKTtcbiAgICB2YXIgaiA9IGh0bWwuaW5kZXhPZihcIi0tPlwiLCBpKTtcbiAgICBpZiAoaiA9PT0gLTEpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBsYXN0UG9zID0gaiArIDM7XG4gIH1cbiAgcmV0dXJuIHJldEh0bWw7XG59XG5cbi8qKlxuICogcmVtb3ZlIGludmlzaWJsZSBjaGFyYWN0ZXJzXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGh0bWxcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZnVuY3Rpb24gc3RyaXBCbGFua0NoYXIoaHRtbCkge1xuICB2YXIgY2hhcnMgPSBodG1sLnNwbGl0KFwiXCIpO1xuICBjaGFycyA9IGNoYXJzLmZpbHRlcihmdW5jdGlvbiAoY2hhcikge1xuICAgIHZhciBjID0gY2hhci5jaGFyQ29kZUF0KDApO1xuICAgIGlmIChjID09PSAxMjcpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoYyA8PSAzMSkge1xuICAgICAgaWYgKGMgPT09IDEwIHx8IGMgPT09IDEzKSByZXR1cm4gdHJ1ZTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH0pO1xuICByZXR1cm4gY2hhcnMuam9pbihcIlwiKTtcbn1cblxuZXhwb3J0cy53aGl0ZUxpc3QgPSBnZXREZWZhdWx0V2hpdGVMaXN0KCk7XG5leHBvcnRzLmdldERlZmF1bHRXaGl0ZUxpc3QgPSBnZXREZWZhdWx0V2hpdGVMaXN0O1xuZXhwb3J0cy5vblRhZyA9IG9uVGFnO1xuZXhwb3J0cy5vbklnbm9yZVRhZyA9IG9uSWdub3JlVGFnO1xuZXhwb3J0cy5vblRhZ0F0dHIgPSBvblRhZ0F0dHI7XG5leHBvcnRzLm9uSWdub3JlVGFnQXR0ciA9IG9uSWdub3JlVGFnQXR0cjtcbmV4cG9ydHMuc2FmZUF0dHJWYWx1ZSA9IHNhZmVBdHRyVmFsdWU7XG5leHBvcnRzLmVzY2FwZUh0bWwgPSBlc2NhcGVIdG1sO1xuZXhwb3J0cy5lc2NhcGVRdW90ZSA9IGVzY2FwZVF1b3RlO1xuZXhwb3J0cy51bmVzY2FwZVF1b3RlID0gdW5lc2NhcGVRdW90ZTtcbmV4cG9ydHMuZXNjYXBlSHRtbEVudGl0aWVzID0gZXNjYXBlSHRtbEVudGl0aWVzO1xuZXhwb3J0cy5lc2NhcGVEYW5nZXJIdG1sNUVudGl0aWVzID0gZXNjYXBlRGFuZ2VySHRtbDVFbnRpdGllcztcbmV4cG9ydHMuY2xlYXJOb25QcmludGFibGVDaGFyYWN0ZXIgPSBjbGVhck5vblByaW50YWJsZUNoYXJhY3RlcjtcbmV4cG9ydHMuZnJpZW5kbHlBdHRyVmFsdWUgPSBmcmllbmRseUF0dHJWYWx1ZTtcbmV4cG9ydHMuZXNjYXBlQXR0clZhbHVlID0gZXNjYXBlQXR0clZhbHVlO1xuZXhwb3J0cy5vbklnbm9yZVRhZ1N0cmlwQWxsID0gb25JZ25vcmVUYWdTdHJpcEFsbDtcbmV4cG9ydHMuU3RyaXBUYWdCb2R5ID0gU3RyaXBUYWdCb2R5O1xuZXhwb3J0cy5zdHJpcENvbW1lbnRUYWcgPSBzdHJpcENvbW1lbnRUYWc7XG5leHBvcnRzLnN0cmlwQmxhbmtDaGFyID0gc3RyaXBCbGFua0NoYXI7XG5leHBvcnRzLmNzc0ZpbHRlciA9IGRlZmF1bHRDU1NGaWx0ZXI7XG5leHBvcnRzLmdldERlZmF1bHRDU1NXaGl0ZUxpc3QgPSBnZXREZWZhdWx0Q1NTV2hpdGVMaXN0O1xuIiwiLyoqXG4gKiB4c3NcbiAqXG4gKiBAYXV0aG9yIFpvbmdtaW4gTGVpPGxlaXpvbmdtaW5AZ21haWwuY29tPlxuICovXG5cbnZhciBERUZBVUxUID0gcmVxdWlyZShcIi4vZGVmYXVsdFwiKTtcbnZhciBwYXJzZXIgPSByZXF1aXJlKFwiLi9wYXJzZXJcIik7XG52YXIgRmlsdGVyWFNTID0gcmVxdWlyZShcIi4veHNzXCIpO1xuXG4vKipcbiAqIGZpbHRlciB4c3MgZnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaHRtbFxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgeyB3aGl0ZUxpc3QsIG9uVGFnLCBvblRhZ0F0dHIsIG9uSWdub3JlVGFnLCBvbklnbm9yZVRhZ0F0dHIsIHNhZmVBdHRyVmFsdWUsIGVzY2FwZUh0bWwgfVxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5mdW5jdGlvbiBmaWx0ZXJYU1MoaHRtbCwgb3B0aW9ucykge1xuICB2YXIgeHNzID0gbmV3IEZpbHRlclhTUyhvcHRpb25zKTtcbiAgcmV0dXJuIHhzcy5wcm9jZXNzKGh0bWwpO1xufVxuXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBmaWx0ZXJYU1M7XG5leHBvcnRzLmZpbHRlclhTUyA9IGZpbHRlclhTUztcbmV4cG9ydHMuRmlsdGVyWFNTID0gRmlsdGVyWFNTO1xuZm9yICh2YXIgaSBpbiBERUZBVUxUKSBleHBvcnRzW2ldID0gREVGQVVMVFtpXTtcbmZvciAodmFyIGkgaW4gcGFyc2VyKSBleHBvcnRzW2ldID0gcGFyc2VyW2ldO1xuXG4vLyB1c2luZyBgeHNzYCBvbiB0aGUgYnJvd3Nlciwgb3V0cHV0IGBmaWx0ZXJYU1NgIHRvIHRoZSBnbG9iYWxzXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICB3aW5kb3cuZmlsdGVyWFNTID0gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIHVzaW5nIGB4c3NgIG9uIHRoZSBXZWJXb3JrZXIsIG91dHB1dCBgZmlsdGVyWFNTYCB0byB0aGUgZ2xvYmFsc1xuZnVuY3Rpb24gaXNXb3JrZXJFbnYoKSB7XG4gIHJldHVybiAoXG4gICAgdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICB0eXBlb2YgRGVkaWNhdGVkV29ya2VyR2xvYmFsU2NvcGUgIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICBzZWxmIGluc3RhbmNlb2YgRGVkaWNhdGVkV29ya2VyR2xvYmFsU2NvcGVcbiAgKTtcbn1cbmlmIChpc1dvcmtlckVudigpKSB7XG4gIHNlbGYuZmlsdGVyWFNTID0gbW9kdWxlLmV4cG9ydHM7XG59XG4iLCIvKipcbiAqIFNpbXBsZSBIVE1MIFBhcnNlclxuICpcbiAqIEBhdXRob3IgWm9uZ21pbiBMZWk8bGVpem9uZ21pbkBnbWFpbC5jb20+XG4gKi9cblxudmFyIF8gPSByZXF1aXJlKFwiLi91dGlsXCIpO1xuXG4vKipcbiAqIGdldCB0YWcgbmFtZVxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBodG1sIGUuZy4gJzxhIGhlZj1cIiNcIj4nXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGdldFRhZ05hbWUoaHRtbCkge1xuICB2YXIgaSA9IF8uc3BhY2VJbmRleChodG1sKTtcbiAgaWYgKGkgPT09IC0xKSB7XG4gICAgdmFyIHRhZ05hbWUgPSBodG1sLnNsaWNlKDEsIC0xKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgdGFnTmFtZSA9IGh0bWwuc2xpY2UoMSwgaSArIDEpO1xuICB9XG4gIHRhZ05hbWUgPSBfLnRyaW0odGFnTmFtZSkudG9Mb3dlckNhc2UoKTtcbiAgaWYgKHRhZ05hbWUuc2xpY2UoMCwgMSkgPT09IFwiL1wiKSB0YWdOYW1lID0gdGFnTmFtZS5zbGljZSgxKTtcbiAgaWYgKHRhZ05hbWUuc2xpY2UoLTEpID09PSBcIi9cIikgdGFnTmFtZSA9IHRhZ05hbWUuc2xpY2UoMCwgLTEpO1xuICByZXR1cm4gdGFnTmFtZTtcbn1cblxuLyoqXG4gKiBpcyBjbG9zZSB0YWc/XG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGh0bWwg5aaC77yaJzxhIGhlZj1cIiNcIj4nXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5mdW5jdGlvbiBpc0Nsb3NpbmcoaHRtbCkge1xuICByZXR1cm4gaHRtbC5zbGljZSgwLCAyKSA9PT0gXCI8L1wiO1xufVxuXG4vKipcbiAqIHBhcnNlIGlucHV0IGh0bWwgYW5kIHJldHVybnMgcHJvY2Vzc2VkIGh0bWxcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaHRtbFxuICogQHBhcmFtIHtGdW5jdGlvbn0gb25UYWcgZS5nLiBmdW5jdGlvbiAoc291cmNlUG9zaXRpb24sIHBvc2l0aW9uLCB0YWcsIGh0bWwsIGlzQ2xvc2luZylcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVzY2FwZUh0bWxcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZnVuY3Rpb24gcGFyc2VUYWcoaHRtbCwgb25UYWcsIGVzY2FwZUh0bWwpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgdmFyIHJldGh0bWwgPSBcIlwiO1xuICB2YXIgbGFzdFBvcyA9IDA7XG4gIHZhciB0YWdTdGFydCA9IGZhbHNlO1xuICB2YXIgcXVvdGVTdGFydCA9IGZhbHNlO1xuICB2YXIgY3VycmVudFBvcyA9IDA7XG4gIHZhciBsZW4gPSBodG1sLmxlbmd0aDtcbiAgdmFyIGN1cnJlbnRUYWdOYW1lID0gXCJcIjtcbiAgdmFyIGN1cnJlbnRIdG1sID0gXCJcIjtcblxuICBjaGFyaXRlcmF0b3I6IGZvciAoY3VycmVudFBvcyA9IDA7IGN1cnJlbnRQb3MgPCBsZW47IGN1cnJlbnRQb3MrKykge1xuICAgIHZhciBjID0gaHRtbC5jaGFyQXQoY3VycmVudFBvcyk7XG4gICAgaWYgKHRhZ1N0YXJ0ID09PSBmYWxzZSkge1xuICAgICAgaWYgKGMgPT09IFwiPFwiKSB7XG4gICAgICAgIHRhZ1N0YXJ0ID0gY3VycmVudFBvcztcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChxdW90ZVN0YXJ0ID09PSBmYWxzZSkge1xuICAgICAgICBpZiAoYyA9PT0gXCI8XCIpIHtcbiAgICAgICAgICByZXRodG1sICs9IGVzY2FwZUh0bWwoaHRtbC5zbGljZShsYXN0UG9zLCBjdXJyZW50UG9zKSk7XG4gICAgICAgICAgdGFnU3RhcnQgPSBjdXJyZW50UG9zO1xuICAgICAgICAgIGxhc3RQb3MgPSBjdXJyZW50UG9zO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjID09PSBcIj5cIikge1xuICAgICAgICAgIHJldGh0bWwgKz0gZXNjYXBlSHRtbChodG1sLnNsaWNlKGxhc3RQb3MsIHRhZ1N0YXJ0KSk7XG4gICAgICAgICAgY3VycmVudEh0bWwgPSBodG1sLnNsaWNlKHRhZ1N0YXJ0LCBjdXJyZW50UG9zICsgMSk7XG4gICAgICAgICAgY3VycmVudFRhZ05hbWUgPSBnZXRUYWdOYW1lKGN1cnJlbnRIdG1sKTtcbiAgICAgICAgICByZXRodG1sICs9IG9uVGFnKFxuICAgICAgICAgICAgdGFnU3RhcnQsXG4gICAgICAgICAgICByZXRodG1sLmxlbmd0aCxcbiAgICAgICAgICAgIGN1cnJlbnRUYWdOYW1lLFxuICAgICAgICAgICAgY3VycmVudEh0bWwsXG4gICAgICAgICAgICBpc0Nsb3NpbmcoY3VycmVudEh0bWwpXG4gICAgICAgICAgKTtcbiAgICAgICAgICBsYXN0UG9zID0gY3VycmVudFBvcyArIDE7XG4gICAgICAgICAgdGFnU3RhcnQgPSBmYWxzZTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYyA9PT0gJ1wiJyB8fCBjID09PSBcIidcIikge1xuICAgICAgICAgIHZhciBpID0gMTtcbiAgICAgICAgICB2YXIgaWMgPSBodG1sLmNoYXJBdChjdXJyZW50UG9zIC0gaSk7XG5cbiAgICAgICAgICB3aGlsZSAoaWMudHJpbSgpID09PSBcIlwiIHx8IGljID09PSBcIj1cIikge1xuICAgICAgICAgICAgaWYgKGljID09PSBcIj1cIikge1xuICAgICAgICAgICAgICBxdW90ZVN0YXJ0ID0gYztcbiAgICAgICAgICAgICAgY29udGludWUgY2hhcml0ZXJhdG9yO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWMgPSBodG1sLmNoYXJBdChjdXJyZW50UG9zIC0gKytpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChjID09PSBxdW90ZVN0YXJ0KSB7XG4gICAgICAgICAgcXVvdGVTdGFydCA9IGZhbHNlO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGlmIChsYXN0UG9zIDwgaHRtbC5sZW5ndGgpIHtcbiAgICByZXRodG1sICs9IGVzY2FwZUh0bWwoaHRtbC5zdWJzdHIobGFzdFBvcykpO1xuICB9XG5cbiAgcmV0dXJuIHJldGh0bWw7XG59XG5cbnZhciBSRUdFWFBfSUxMRUdBTF9BVFRSX05BTUUgPSAvW15hLXpBLVowLTlfOlxcLlxcLV0vZ2ltO1xuXG4vKipcbiAqIHBhcnNlIGlucHV0IGF0dHJpYnV0ZXMgYW5kIHJldHVybnMgcHJvY2Vzc2VkIGF0dHJpYnV0ZXNcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaHRtbCBlLmcuIGBocmVmPVwiI1wiIHRhcmdldD1cIl9ibGFua1wiYFxuICogQHBhcmFtIHtGdW5jdGlvbn0gb25BdHRyIGUuZy4gYGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSlgXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIHBhcnNlQXR0cihodG1sLCBvbkF0dHIpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgdmFyIGxhc3RQb3MgPSAwO1xuICB2YXIgcmV0QXR0cnMgPSBbXTtcbiAgdmFyIHRtcE5hbWUgPSBmYWxzZTtcbiAgdmFyIGxlbiA9IGh0bWwubGVuZ3RoO1xuXG4gIGZ1bmN0aW9uIGFkZEF0dHIobmFtZSwgdmFsdWUpIHtcbiAgICBuYW1lID0gXy50cmltKG5hbWUpO1xuICAgIG5hbWUgPSBuYW1lLnJlcGxhY2UoUkVHRVhQX0lMTEVHQUxfQVRUUl9OQU1FLCBcIlwiKS50b0xvd2VyQ2FzZSgpO1xuICAgIGlmIChuYW1lLmxlbmd0aCA8IDEpIHJldHVybjtcbiAgICB2YXIgcmV0ID0gb25BdHRyKG5hbWUsIHZhbHVlIHx8IFwiXCIpO1xuICAgIGlmIChyZXQpIHJldEF0dHJzLnB1c2gocmV0KTtcbiAgfVxuXG4gIC8vIOmAkOS4quWIhuaekOWtl+esplxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgdmFyIGMgPSBodG1sLmNoYXJBdChpKTtcbiAgICB2YXIgdiwgajtcbiAgICBpZiAodG1wTmFtZSA9PT0gZmFsc2UgJiYgYyA9PT0gXCI9XCIpIHtcbiAgICAgIHRtcE5hbWUgPSBodG1sLnNsaWNlKGxhc3RQb3MsIGkpO1xuICAgICAgbGFzdFBvcyA9IGkgKyAxO1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGlmICh0bXBOYW1lICE9PSBmYWxzZSkge1xuICAgICAgaWYgKFxuICAgICAgICBpID09PSBsYXN0UG9zICYmXG4gICAgICAgIChjID09PSAnXCInIHx8IGMgPT09IFwiJ1wiKSAmJlxuICAgICAgICBodG1sLmNoYXJBdChpIC0gMSkgPT09IFwiPVwiXG4gICAgICApIHtcbiAgICAgICAgaiA9IGh0bWwuaW5kZXhPZihjLCBpICsgMSk7XG4gICAgICAgIGlmIChqID09PSAtMSkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHYgPSBfLnRyaW0oaHRtbC5zbGljZShsYXN0UG9zICsgMSwgaikpO1xuICAgICAgICAgIGFkZEF0dHIodG1wTmFtZSwgdik7XG4gICAgICAgICAgdG1wTmFtZSA9IGZhbHNlO1xuICAgICAgICAgIGkgPSBqO1xuICAgICAgICAgIGxhc3RQb3MgPSBpICsgMTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoL1xcc3xcXG58XFx0Ly50ZXN0KGMpKSB7XG4gICAgICBodG1sID0gaHRtbC5yZXBsYWNlKC9cXHN8XFxufFxcdC9nLCBcIiBcIik7XG4gICAgICBpZiAodG1wTmFtZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgaiA9IGZpbmROZXh0RXF1YWwoaHRtbCwgaSk7XG4gICAgICAgIGlmIChqID09PSAtMSkge1xuICAgICAgICAgIHYgPSBfLnRyaW0oaHRtbC5zbGljZShsYXN0UG9zLCBpKSk7XG4gICAgICAgICAgYWRkQXR0cih2KTtcbiAgICAgICAgICB0bXBOYW1lID0gZmFsc2U7XG4gICAgICAgICAgbGFzdFBvcyA9IGkgKyAxO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGkgPSBqIC0gMTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaiA9IGZpbmRCZWZvcmVFcXVhbChodG1sLCBpIC0gMSk7XG4gICAgICAgIGlmIChqID09PSAtMSkge1xuICAgICAgICAgIHYgPSBfLnRyaW0oaHRtbC5zbGljZShsYXN0UG9zLCBpKSk7XG4gICAgICAgICAgdiA9IHN0cmlwUXVvdGVXcmFwKHYpO1xuICAgICAgICAgIGFkZEF0dHIodG1wTmFtZSwgdik7XG4gICAgICAgICAgdG1wTmFtZSA9IGZhbHNlO1xuICAgICAgICAgIGxhc3RQb3MgPSBpICsgMTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmIChsYXN0UG9zIDwgaHRtbC5sZW5ndGgpIHtcbiAgICBpZiAodG1wTmFtZSA9PT0gZmFsc2UpIHtcbiAgICAgIGFkZEF0dHIoaHRtbC5zbGljZShsYXN0UG9zKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFkZEF0dHIodG1wTmFtZSwgc3RyaXBRdW90ZVdyYXAoXy50cmltKGh0bWwuc2xpY2UobGFzdFBvcykpKSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIF8udHJpbShyZXRBdHRycy5qb2luKFwiIFwiKSk7XG59XG5cbmZ1bmN0aW9uIGZpbmROZXh0RXF1YWwoc3RyLCBpKSB7XG4gIGZvciAoOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGMgPSBzdHJbaV07XG4gICAgaWYgKGMgPT09IFwiIFwiKSBjb250aW51ZTtcbiAgICBpZiAoYyA9PT0gXCI9XCIpIHJldHVybiBpO1xuICAgIHJldHVybiAtMTtcbiAgfVxufVxuXG5mdW5jdGlvbiBmaW5kQmVmb3JlRXF1YWwoc3RyLCBpKSB7XG4gIGZvciAoOyBpID4gMDsgaS0tKSB7XG4gICAgdmFyIGMgPSBzdHJbaV07XG4gICAgaWYgKGMgPT09IFwiIFwiKSBjb250aW51ZTtcbiAgICBpZiAoYyA9PT0gXCI9XCIpIHJldHVybiBpO1xuICAgIHJldHVybiAtMTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpc1F1b3RlV3JhcFN0cmluZyh0ZXh0KSB7XG4gIGlmIChcbiAgICAodGV4dFswXSA9PT0gJ1wiJyAmJiB0ZXh0W3RleHQubGVuZ3RoIC0gMV0gPT09ICdcIicpIHx8XG4gICAgKHRleHRbMF0gPT09IFwiJ1wiICYmIHRleHRbdGV4dC5sZW5ndGggLSAxXSA9PT0gXCInXCIpXG4gICkge1xuICAgIHJldHVybiB0cnVlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzdHJpcFF1b3RlV3JhcCh0ZXh0KSB7XG4gIGlmIChpc1F1b3RlV3JhcFN0cmluZyh0ZXh0KSkge1xuICAgIHJldHVybiB0ZXh0LnN1YnN0cigxLCB0ZXh0Lmxlbmd0aCAtIDIpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB0ZXh0O1xuICB9XG59XG5cbmV4cG9ydHMucGFyc2VUYWcgPSBwYXJzZVRhZztcbmV4cG9ydHMucGFyc2VBdHRyID0gcGFyc2VBdHRyO1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIGluZGV4T2Y6IGZ1bmN0aW9uIChhcnIsIGl0ZW0pIHtcbiAgICB2YXIgaSwgajtcbiAgICBpZiAoQXJyYXkucHJvdG90eXBlLmluZGV4T2YpIHtcbiAgICAgIHJldHVybiBhcnIuaW5kZXhPZihpdGVtKTtcbiAgICB9XG4gICAgZm9yIChpID0gMCwgaiA9IGFyci5sZW5ndGg7IGkgPCBqOyBpKyspIHtcbiAgICAgIGlmIChhcnJbaV0gPT09IGl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIGk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAtMTtcbiAgfSxcbiAgZm9yRWFjaDogZnVuY3Rpb24gKGFyciwgZm4sIHNjb3BlKSB7XG4gICAgdmFyIGksIGo7XG4gICAgaWYgKEFycmF5LnByb3RvdHlwZS5mb3JFYWNoKSB7XG4gICAgICByZXR1cm4gYXJyLmZvckVhY2goZm4sIHNjb3BlKTtcbiAgICB9XG4gICAgZm9yIChpID0gMCwgaiA9IGFyci5sZW5ndGg7IGkgPCBqOyBpKyspIHtcbiAgICAgIGZuLmNhbGwoc2NvcGUsIGFycltpXSwgaSwgYXJyKTtcbiAgICB9XG4gIH0sXG4gIHRyaW06IGZ1bmN0aW9uIChzdHIpIHtcbiAgICBpZiAoU3RyaW5nLnByb3RvdHlwZS50cmltKSB7XG4gICAgICByZXR1cm4gc3RyLnRyaW0oKTtcbiAgICB9XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKC8oXlxccyopfChcXHMqJCkvZywgXCJcIik7XG4gIH0sXG4gIHNwYWNlSW5kZXg6IGZ1bmN0aW9uIChzdHIpIHtcbiAgICB2YXIgcmVnID0gL1xcc3xcXG58XFx0LztcbiAgICB2YXIgbWF0Y2ggPSByZWcuZXhlYyhzdHIpO1xuICAgIHJldHVybiBtYXRjaCA/IG1hdGNoLmluZGV4IDogLTE7XG4gIH0sXG59O1xuIiwiLyoqXG4gKiBmaWx0ZXIgeHNzXG4gKlxuICogQGF1dGhvciBab25nbWluIExlaTxsZWl6b25nbWluQGdtYWlsLmNvbT5cbiAqL1xuXG52YXIgRmlsdGVyQ1NTID0gcmVxdWlyZShcImNzc2ZpbHRlclwiKS5GaWx0ZXJDU1M7XG52YXIgREVGQVVMVCA9IHJlcXVpcmUoXCIuL2RlZmF1bHRcIik7XG52YXIgcGFyc2VyID0gcmVxdWlyZShcIi4vcGFyc2VyXCIpO1xudmFyIHBhcnNlVGFnID0gcGFyc2VyLnBhcnNlVGFnO1xudmFyIHBhcnNlQXR0ciA9IHBhcnNlci5wYXJzZUF0dHI7XG52YXIgXyA9IHJlcXVpcmUoXCIuL3V0aWxcIik7XG5cbi8qKlxuICogcmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGlucHV0IHZhbHVlIGlzIGB1bmRlZmluZWRgIG9yIGBudWxsYFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGlzTnVsbChvYmopIHtcbiAgcmV0dXJuIG9iaiA9PT0gdW5kZWZpbmVkIHx8IG9iaiA9PT0gbnVsbDtcbn1cblxuLyoqXG4gKiBnZXQgYXR0cmlidXRlcyBmb3IgYSB0YWdcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaHRtbFxuICogQHJldHVybiB7T2JqZWN0fVxuICogICAtIHtTdHJpbmd9IGh0bWxcbiAqICAgLSB7Qm9vbGVhbn0gY2xvc2luZ1xuICovXG5mdW5jdGlvbiBnZXRBdHRycyhodG1sKSB7XG4gIHZhciBpID0gXy5zcGFjZUluZGV4KGh0bWwpO1xuICBpZiAoaSA9PT0gLTEpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaHRtbDogXCJcIixcbiAgICAgIGNsb3Npbmc6IGh0bWxbaHRtbC5sZW5ndGggLSAyXSA9PT0gXCIvXCIsXG4gICAgfTtcbiAgfVxuICBodG1sID0gXy50cmltKGh0bWwuc2xpY2UoaSArIDEsIC0xKSk7XG4gIHZhciBpc0Nsb3NpbmcgPSBodG1sW2h0bWwubGVuZ3RoIC0gMV0gPT09IFwiL1wiO1xuICBpZiAoaXNDbG9zaW5nKSBodG1sID0gXy50cmltKGh0bWwuc2xpY2UoMCwgLTEpKTtcbiAgcmV0dXJuIHtcbiAgICBodG1sOiBodG1sLFxuICAgIGNsb3Npbmc6IGlzQ2xvc2luZyxcbiAgfTtcbn1cblxuLyoqXG4gKiBzaGFsbG93IGNvcHlcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKi9cbmZ1bmN0aW9uIHNoYWxsb3dDb3B5T2JqZWN0KG9iaikge1xuICB2YXIgcmV0ID0ge307XG4gIGZvciAodmFyIGkgaW4gb2JqKSB7XG4gICAgcmV0W2ldID0gb2JqW2ldO1xuICB9XG4gIHJldHVybiByZXQ7XG59XG5cbi8qKlxuICogRmlsdGVyWFNTIGNsYXNzXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqICAgICAgICB3aGl0ZUxpc3QsIG9uVGFnLCBvblRhZ0F0dHIsIG9uSWdub3JlVGFnLFxuICogICAgICAgIG9uSWdub3JlVGFnQXR0ciwgc2FmZUF0dHJWYWx1ZSwgZXNjYXBlSHRtbFxuICogICAgICAgIHN0cmlwSWdub3JlVGFnQm9keSwgYWxsb3dDb21tZW50VGFnLCBzdHJpcEJsYW5rQ2hhclxuICogICAgICAgIGNzc3t3aGl0ZUxpc3QsIG9uQXR0ciwgb25JZ25vcmVBdHRyfSBgY3NzPWZhbHNlYCBtZWFucyBkb24ndCB1c2UgYGNzc2ZpbHRlcmBcbiAqL1xuZnVuY3Rpb24gRmlsdGVyWFNTKG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IHNoYWxsb3dDb3B5T2JqZWN0KG9wdGlvbnMgfHwge30pO1xuXG4gIGlmIChvcHRpb25zLnN0cmlwSWdub3JlVGFnKSB7XG4gICAgaWYgKG9wdGlvbnMub25JZ25vcmVUYWcpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICdOb3RlczogY2Fubm90IHVzZSB0aGVzZSB0d28gb3B0aW9ucyBcInN0cmlwSWdub3JlVGFnXCIgYW5kIFwib25JZ25vcmVUYWdcIiBhdCB0aGUgc2FtZSB0aW1lJ1xuICAgICAgKTtcbiAgICB9XG4gICAgb3B0aW9ucy5vbklnbm9yZVRhZyA9IERFRkFVTFQub25JZ25vcmVUYWdTdHJpcEFsbDtcbiAgfVxuXG4gIG9wdGlvbnMud2hpdGVMaXN0ID0gb3B0aW9ucy53aGl0ZUxpc3QgfHwgREVGQVVMVC53aGl0ZUxpc3Q7XG4gIG9wdGlvbnMub25UYWcgPSBvcHRpb25zLm9uVGFnIHx8IERFRkFVTFQub25UYWc7XG4gIG9wdGlvbnMub25UYWdBdHRyID0gb3B0aW9ucy5vblRhZ0F0dHIgfHwgREVGQVVMVC5vblRhZ0F0dHI7XG4gIG9wdGlvbnMub25JZ25vcmVUYWcgPSBvcHRpb25zLm9uSWdub3JlVGFnIHx8IERFRkFVTFQub25JZ25vcmVUYWc7XG4gIG9wdGlvbnMub25JZ25vcmVUYWdBdHRyID0gb3B0aW9ucy5vbklnbm9yZVRhZ0F0dHIgfHwgREVGQVVMVC5vbklnbm9yZVRhZ0F0dHI7XG4gIG9wdGlvbnMuc2FmZUF0dHJWYWx1ZSA9IG9wdGlvbnMuc2FmZUF0dHJWYWx1ZSB8fCBERUZBVUxULnNhZmVBdHRyVmFsdWU7XG4gIG9wdGlvbnMuZXNjYXBlSHRtbCA9IG9wdGlvbnMuZXNjYXBlSHRtbCB8fCBERUZBVUxULmVzY2FwZUh0bWw7XG4gIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG5cbiAgaWYgKG9wdGlvbnMuY3NzID09PSBmYWxzZSkge1xuICAgIHRoaXMuY3NzRmlsdGVyID0gZmFsc2U7XG4gIH0gZWxzZSB7XG4gICAgb3B0aW9ucy5jc3MgPSBvcHRpb25zLmNzcyB8fCB7fTtcbiAgICB0aGlzLmNzc0ZpbHRlciA9IG5ldyBGaWx0ZXJDU1Mob3B0aW9ucy5jc3MpO1xuICB9XG59XG5cbi8qKlxuICogc3RhcnQgcHJvY2VzcyBhbmQgcmV0dXJucyByZXN1bHRcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaHRtbFxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5GaWx0ZXJYU1MucHJvdG90eXBlLnByb2Nlc3MgPSBmdW5jdGlvbiAoaHRtbCkge1xuICAvLyBjb21wYXRpYmxlIHdpdGggdGhlIGlucHV0XG4gIGh0bWwgPSBodG1sIHx8IFwiXCI7XG4gIGh0bWwgPSBodG1sLnRvU3RyaW5nKCk7XG4gIGlmICghaHRtbCkgcmV0dXJuIFwiXCI7XG5cbiAgdmFyIG1lID0gdGhpcztcbiAgdmFyIG9wdGlvbnMgPSBtZS5vcHRpb25zO1xuICB2YXIgd2hpdGVMaXN0ID0gb3B0aW9ucy53aGl0ZUxpc3Q7XG4gIHZhciBvblRhZyA9IG9wdGlvbnMub25UYWc7XG4gIHZhciBvbklnbm9yZVRhZyA9IG9wdGlvbnMub25JZ25vcmVUYWc7XG4gIHZhciBvblRhZ0F0dHIgPSBvcHRpb25zLm9uVGFnQXR0cjtcbiAgdmFyIG9uSWdub3JlVGFnQXR0ciA9IG9wdGlvbnMub25JZ25vcmVUYWdBdHRyO1xuICB2YXIgc2FmZUF0dHJWYWx1ZSA9IG9wdGlvbnMuc2FmZUF0dHJWYWx1ZTtcbiAgdmFyIGVzY2FwZUh0bWwgPSBvcHRpb25zLmVzY2FwZUh0bWw7XG4gIHZhciBjc3NGaWx0ZXIgPSBtZS5jc3NGaWx0ZXI7XG5cbiAgLy8gcmVtb3ZlIGludmlzaWJsZSBjaGFyYWN0ZXJzXG4gIGlmIChvcHRpb25zLnN0cmlwQmxhbmtDaGFyKSB7XG4gICAgaHRtbCA9IERFRkFVTFQuc3RyaXBCbGFua0NoYXIoaHRtbCk7XG4gIH1cblxuICAvLyByZW1vdmUgaHRtbCBjb21tZW50c1xuICBpZiAoIW9wdGlvbnMuYWxsb3dDb21tZW50VGFnKSB7XG4gICAgaHRtbCA9IERFRkFVTFQuc3RyaXBDb21tZW50VGFnKGh0bWwpO1xuICB9XG5cbiAgLy8gaWYgZW5hYmxlIHN0cmlwSWdub3JlVGFnQm9keVxuICB2YXIgc3RyaXBJZ25vcmVUYWdCb2R5ID0gZmFsc2U7XG4gIGlmIChvcHRpb25zLnN0cmlwSWdub3JlVGFnQm9keSkge1xuICAgIHZhciBzdHJpcElnbm9yZVRhZ0JvZHkgPSBERUZBVUxULlN0cmlwVGFnQm9keShcbiAgICAgIG9wdGlvbnMuc3RyaXBJZ25vcmVUYWdCb2R5LFxuICAgICAgb25JZ25vcmVUYWdcbiAgICApO1xuICAgIG9uSWdub3JlVGFnID0gc3RyaXBJZ25vcmVUYWdCb2R5Lm9uSWdub3JlVGFnO1xuICB9XG5cbiAgdmFyIHJldEh0bWwgPSBwYXJzZVRhZyhcbiAgICBodG1sLFxuICAgIGZ1bmN0aW9uIChzb3VyY2VQb3NpdGlvbiwgcG9zaXRpb24sIHRhZywgaHRtbCwgaXNDbG9zaW5nKSB7XG4gICAgICB2YXIgaW5mbyA9IHtcbiAgICAgICAgc291cmNlUG9zaXRpb246IHNvdXJjZVBvc2l0aW9uLFxuICAgICAgICBwb3NpdGlvbjogcG9zaXRpb24sXG4gICAgICAgIGlzQ2xvc2luZzogaXNDbG9zaW5nLFxuICAgICAgICBpc1doaXRlOiB3aGl0ZUxpc3QuaGFzT3duUHJvcGVydHkodGFnKSxcbiAgICAgIH07XG5cbiAgICAgIC8vIGNhbGwgYG9uVGFnKClgXG4gICAgICB2YXIgcmV0ID0gb25UYWcodGFnLCBodG1sLCBpbmZvKTtcbiAgICAgIGlmICghaXNOdWxsKHJldCkpIHJldHVybiByZXQ7XG5cbiAgICAgIGlmIChpbmZvLmlzV2hpdGUpIHtcbiAgICAgICAgaWYgKGluZm8uaXNDbG9zaW5nKSB7XG4gICAgICAgICAgcmV0dXJuIFwiPC9cIiArIHRhZyArIFwiPlwiO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGF0dHJzID0gZ2V0QXR0cnMoaHRtbCk7XG4gICAgICAgIHZhciB3aGl0ZUF0dHJMaXN0ID0gd2hpdGVMaXN0W3RhZ107XG4gICAgICAgIHZhciBhdHRyc0h0bWwgPSBwYXJzZUF0dHIoYXR0cnMuaHRtbCwgZnVuY3Rpb24gKG5hbWUsIHZhbHVlKSB7XG4gICAgICAgICAgLy8gY2FsbCBgb25UYWdBdHRyKClgXG4gICAgICAgICAgdmFyIGlzV2hpdGVBdHRyID0gXy5pbmRleE9mKHdoaXRlQXR0ckxpc3QsIG5hbWUpICE9PSAtMTtcbiAgICAgICAgICB2YXIgcmV0ID0gb25UYWdBdHRyKHRhZywgbmFtZSwgdmFsdWUsIGlzV2hpdGVBdHRyKTtcbiAgICAgICAgICBpZiAoIWlzTnVsbChyZXQpKSByZXR1cm4gcmV0O1xuXG4gICAgICAgICAgaWYgKGlzV2hpdGVBdHRyKSB7XG4gICAgICAgICAgICAvLyBjYWxsIGBzYWZlQXR0clZhbHVlKClgXG4gICAgICAgICAgICB2YWx1ZSA9IHNhZmVBdHRyVmFsdWUodGFnLCBuYW1lLCB2YWx1ZSwgY3NzRmlsdGVyKTtcbiAgICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgICByZXR1cm4gbmFtZSArICc9XCInICsgdmFsdWUgKyAnXCInO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIG5hbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGNhbGwgYG9uSWdub3JlVGFnQXR0cigpYFxuICAgICAgICAgICAgdmFyIHJldCA9IG9uSWdub3JlVGFnQXR0cih0YWcsIG5hbWUsIHZhbHVlLCBpc1doaXRlQXR0cik7XG4gICAgICAgICAgICBpZiAoIWlzTnVsbChyZXQpKSByZXR1cm4gcmV0O1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gYnVpbGQgbmV3IHRhZyBodG1sXG4gICAgICAgIHZhciBodG1sID0gXCI8XCIgKyB0YWc7XG4gICAgICAgIGlmIChhdHRyc0h0bWwpIGh0bWwgKz0gXCIgXCIgKyBhdHRyc0h0bWw7XG4gICAgICAgIGlmIChhdHRycy5jbG9zaW5nKSBodG1sICs9IFwiIC9cIjtcbiAgICAgICAgaHRtbCArPSBcIj5cIjtcbiAgICAgICAgcmV0dXJuIGh0bWw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBjYWxsIGBvbklnbm9yZVRhZygpYFxuICAgICAgICB2YXIgcmV0ID0gb25JZ25vcmVUYWcodGFnLCBodG1sLCBpbmZvKTtcbiAgICAgICAgaWYgKCFpc051bGwocmV0KSkgcmV0dXJuIHJldDtcbiAgICAgICAgcmV0dXJuIGVzY2FwZUh0bWwoaHRtbCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBlc2NhcGVIdG1sXG4gICk7XG5cbiAgLy8gaWYgZW5hYmxlIHN0cmlwSWdub3JlVGFnQm9keVxuICBpZiAoc3RyaXBJZ25vcmVUYWdCb2R5KSB7XG4gICAgcmV0SHRtbCA9IHN0cmlwSWdub3JlVGFnQm9keS5yZW1vdmUocmV0SHRtbCk7XG4gIH1cblxuICByZXR1cm4gcmV0SHRtbDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gRmlsdGVyWFNTO1xuIiwiY29uc3QgbWVtb3J5ID0gcmVxdWlyZSgnLi9saWIvbWVtb3J5JylcbmNvbnN0IGNvb2tpZSA9IHJlcXVpcmUoXCIuL2xpYi9jb29raWVcIilcbmNvbnN0IHV0aWwgPSByZXF1aXJlKFwiLi9saWIvdXRpbFwiKVxuY29uc3QgZm9ybWF0WHNzID0gcmVxdWlyZShcIi4vbGliL2Zvcm1hdFhzc1wiKVxuZXhwb3J0cy5pc01vYmlsZU9yTWFpbCA9IHV0aWwuaXNNb2JpbGVPck1haWw7XG5leHBvcnRzLmlzTW9iaWxlID0gdXRpbC5pc01vYmlsZTtcbmV4cG9ydHMuaXNNYWlsID0gdXRpbC5pc01haWw7XG5leHBvcnRzLm1lbW9yeSA9IG1lbW9yeTtcbmV4cG9ydHMuZm9ybWF0WHNzID0gZm9ybWF0WHNzO1xuZXhwb3J0cy5jb29raWUgPSBjb29raWU7XG5leHBvcnRzLmRlYm91bmNlID0gdXRpbC5kZWJvdW5jZTtcbmV4cG9ydHMudGhyb3R0bGUgPSB1dGlsLnRocm90dGxlXG4vL+WwhuaVtOS4quaooeWdl+WvvOWHulxubW9kdWxlLmV4cG9ydHMuanNiVXRpbCA9IHtcbiAgICAuLi51dGlsLCBmb3JtYXRYc3MsIG1lbW9yeSwgY29va2llXG59XG4iLCIvKipcbiAqIEBkZXNjcmlwdGlvbjpjb29raWXln7rmnKznrqHnkIZcbiAqL1xuZnVuY3Rpb24gQ29va2llKCkge1xuXG59XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uOuiOt+WPluWvueW6lOeahGtleVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBrZXlcbiAqIEBwYXJhbSB7YW55c30gdmFsdWUg5rKh5pyJ5om+5Yiw5pe26L+U5Zue55qE6aKE6K6+5YC877yM6buY6K6kZmFsc2VcbiAqIEByZXR1cm4ge3N0cmluZ3xCb29sZWFufSBzdHJpbmcgLyBmYWxzZVxuICovXG5Db29raWUucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChrZXksIGRlZiA9IGZhbHNlKSB7XG4gICAgbGV0IGFyciA9IGRvY3VtZW50LmNvb2tpZS5zcGxpdChcIjtcIik7XG4gICAgZm9yIChsZXQgaXRlbSBvZiBhcnIpIHtcbiAgICAgICAgY29uc3QgZWwgPSBpdGVtLnNwbGl0KFwiPVwiKTtcbiAgICAgICAgaWYgKGVsWzBdLnRyaW0oKSA9PT0ga2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gZWxbMV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGRlZjtcbn1cbi8qKlxuICogQGRlc2NyaXB0aW9uOuiuvue9ruWvueW6lOeahGtleSB2YWx1ZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBrZXlcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSB2YWx1ZVxuICogQHBhcmFtIHtEYXRlfSBleHBpcmVzIOi/h+acn+aXtumXtCBEYXRl5a+56LGhXG4gKiBAcmV0dXJuIHtCb29sZWFufSBCb29sZWFuXG4gKi9cbkNvb2tpZS5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gKGtleSwgdmFsdWUsIGV4cGlyZXMgPSBcIlwiKSB7XG4gICAgaWYgKGtleS50cmltKCkgPT0gXCJcIikgcmV0dXJuIGZhbHNlO1xuICAgIGRvY3VtZW50LmNvb2tpZSA9IGAke2tleX09JHt2YWx1ZX07ZXhwaXJlcz0ke2V4cGlyZXN9YDtcbn1cbi8qKlxuICogQGRlc2NyaXB0aW9uOuWIoOmZpOWvueW6lOeahGtleVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBrZXlcbiAqIEByZXR1cm4ge3ZvaWR9IHZvaWRcbiAqL1xuQ29va2llLnByb3RvdHlwZS5kZWwgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgZG9jdW1lbnQuY29va2llID0gYCR7a2V5fT0wOyBwYXRoPS87IGV4cGlyZXM9JHtuZXcgRGF0ZSgwKS50b1VUQ1N0cmluZygpfWBcbn1cbi8qKlxuICogQGRlc2NyaXB0aW9uOua4hemZpOacrOWcsOaJgOaciWNvb2tpZVxuICogQHJldHVybiB7dm9pZH0gdm9pZFxuICovXG5Db29raWUucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICAgIGxldCBsaXN0ID0gZG9jdW1lbnQuY29va2llLm1hdGNoKC9bXiA9O10rKD89XFw9KS9nKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5kZWwobGlzdFtpXSk7XG4gICAgfVxuICAgIGRvY3VtZW50LmNvb2tpZSA9IGA9MDsgcGF0aD0vOyBleHBpcmVzPSR7bmV3IERhdGUoMCkudG9VVENTdHJpbmcoKX1gXG59XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IENvb2tpZSgpXG4iLCJjb25zdCB4c3MgPSByZXF1aXJlKFwieHNzXCIpO1xuLyoqXG4gKiBAZGVzY3JpcHRpb246eHNz6L+H5rukXG4gKiBAcGFyYW0ge3N0cmluZ30gSHRtbCDlr4zmlofmnKzlhoXlrrlcbiAqIEBwYXJhbSB7YXJyYXl9IGZvcm1hdCDlhYHorrjmlL7ooYznmoRodG1s5qCH562+XG4gKiBAcGFyYW0ge2FycmF5fSBhdHRyIOWFgeiuuOaUvuihjOeahOagh+etvuWxnuaAp+agh+etvlxuICogQHJldHVybiB7c3RyaW5nfSBodG1sU3RyaW5nXG4gKi9cbmZ1bmN0aW9uIGZvcm1hdFhzcyhIdG1sLCBmb3JtYXQgPSBbXSwgYXR0ciA9IFtdKXtcbiAgICAvL+WFgeiuuOmAmui/h+eahOagh+etvlxuICAgIGNvbnN0IHRhZyA9IFtcbiAgICAgICAgXCJwXCIsXG4gICAgICAgIFwiYVwiLFxuICAgICAgICBcImltZ1wiLFxuICAgICAgICBcImZvbnRcIixcbiAgICAgICAgXCJzcGFuXCIsXG4gICAgICAgIFwiYlwiLFxuICAgICAgICBcImJsb2NrcXVvdGVcIixcbiAgICAgICAgXCJjb2RlXCIsXG4gICAgICAgIFwiaDFcIixcbiAgICAgICAgXCJoMlwiLFxuICAgICAgICBcImgzXCIsXG4gICAgICAgIFwiaDRcIixcbiAgICAgICAgXCJoNVwiLFxuICAgICAgICBcImg2XCIsXG4gICAgICAgIFwiaHJcIixcbiAgICAgICAgXCJiclwiLFxuICAgICAgICBcInNcIixcbiAgICAgICAgXCJpXCIsXG4gICAgICAgIFwidVwiLFxuICAgICAgICBcInN0cmlrZVwiLFxuICAgICAgICBcImRpdlwiLFxuICAgICAgICBcInN0cm9uZ1wiLFxuICAgICAgICBcInByZVwiXG4gICAgXTtcbiAgICBpZiAoZm9ybWF0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgZm9ybWF0LmZvckVhY2goZWwgPT4ge1xuICAgICAgICAgICAgdGFnLnB1c2goZWwpO1xuICAgICAgICB9KVxuICAgIH1cbiAgICAvL+WFgeiuuOS9v+eUqOeahOWxnuaAp1xuICAgIGNvbnN0IGNhbiA9IFtcImNvbG9yXCIsIFwic2l6ZVwiLCBcInN0eWxlXCIsIFwiaHJlZlwiLCBcInNyY1wiXTtcbiAgICBpZiAoYXR0ci5sZW5ndGggPiAwKSB7XG4gICAgICAgIGF0dHIubWFwKGUgPT4ge1xuICAgICAgICAgICAgY2FuLnB1c2goZSlcbiAgICAgICAgfSlcbiAgICB9XG4gICAgbGV0IHRtcCA9IHt9O1xuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0YWcubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSB0YWdbaW5kZXhdO1xuICAgICAgICB0bXBbZWxlbWVudF0gPSBjYW47XG4gICAgfVxuICAgIGxldCB0ZXh0ID0geHNzKEh0bWwsIHtcbiAgICAgICAgd2hpdGVMaXN0OiB0bXAsXG4gICAgfSk7XG4gICAgcmV0dXJuIHRleHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZm9ybWF0WHNzXG4iLCIvKipcbiAqIEBkZXNjcmlwdGlvbjpsb2NhbFN0b3JhZ2XlgqjlrZjnrqHnkIZcbiAqIEByZXR1cm5zIHtNZW1vcnl9XG4gKi9cbmNsYXNzIE1lbW9yeSB7XG4gICAgTG9jYWwgPSBudWxsO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuTG9jYWwgPSBsb2NhbFN0b3JhZ2UgfHwgd2luZG93LmxvY2FsU3RvcmFnZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb246IOiuvue9ruacrOWcsGxvY2FsU3RvcmFnZeWCqOWtmFxuICAgICAqIEBwYXJhbSB7Kn0ga2V5IOmUrlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fFN0cmluZ30gdmFsdWUg5YC8XG4gICAgICogQHJldHVybiB7TWVtb3J5fSBNZW1vcnkg5Y+v5a6e546w6ZO+5byP6L+e57ut6LCD55SoXG4gICAgICovXG4gICAgc2V0KGtleSwgdmFsdWUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLkxvY2FsLnNldEl0ZW0oa2V5LCB2YWx1ZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbjog6I635Y+W6ZSuXG4gICAgICogQHBhcmFtIHsqfSBrZXlcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R8U3RyaW5nfSB2YWx1ZSDov5Tlm57lgLxcbiAgICAgKi9cbiAgICBnZXQoa2V5KSB7XG4gICAgICAgIGxldCBpbmZvID0gdGhpcy5Mb2NhbC5nZXRJdGVtKGtleSk7XG4gICAgICAgIGlmIChpbmZvID09PSBcIlwiIHx8ICFpbmZvKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5pc09iaihpbmZvKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb246IOWIpOaWreWtl+espuS4suaYr+S4jeaYr2pzb27lr7nosaFcbiAgICAgKiBAcGFyYW0geyp9IHN0clxuICAgICAqIEByZXR1cm4geyp9XG4gICAgICovXG4gICAgaXNPYmooc3RyKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc3RyID09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IG9iaiA9IEpTT04ucGFyc2Uoc3RyKTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9iaiA9PSBcIm9iamVjdFwiICYmIG9iaikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdHI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzdHI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb246IOWIoOmZpOacrOWcsGxvY2FsU3RvcmFnZeWCqOWtmGtleVxuICAgICAqIEBwYXJhbSB7Kn0ga2V5XG4gICAgICogQHJldHVybiB7TWVtb3J5fSBib29sZWFuXG4gICAgICovXG4gICAgZGVsKGtleSkge1xuICAgICAgICB0aGlzLkxvY2FsLnJlbW92ZUl0ZW0oa2V5KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7IC8v6L+U5Zue6Ieq6Lqr77yM5Y+v5Lul5a6e546w6ZO+5byP6LCD55SoTWVtb3J5KCkuZGVsKGtleSkuZGVsKGtleSkuc2V0KGtleSx2YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uOiDmuIXpmaTlhajpg6jmnKzlnLBsb2NhbFN0b3JhZ2XlgqjlrZhcbiAgICAgKiBAcmV0dXJuIHtNZW1vcnl9IGJvb2xlYW5cbiAgICAgKi9cbiAgICBjbGVhcigpIHtcbiAgICAgICAgdGhpcy5Mb2NhbC5jbGVhcigpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG5cbnZhciBtZW1vcnkgPSBuZXcgTWVtb3J5KClcbm1vZHVsZS5leHBvcnRzID0gbWVtb3J5O1xuIiwiLyoqXG4gKiBAZGVzY3JpcHRpb2466aqM6K+B5piv5ZCm5Li65omL5py66LSm5Y+3XG4gKiBAcGFyYW0ge3N0cmluZ30gTW9iaWxlIOaJi+acuui0puWPt1xuICogQHJldHVybiB7Qm9vbGVhbn0gQm9vbGVhblxuICovXG5jb25zdCBpc01vYmlsZSA9IChNb2JpbGUgPSBcIlwiKSA9PiB7XG4gICAgcmV0dXJuIC9eMVszNDU2Nzg5XVxcZHs5fSQvLnRlc3QoTW9iaWxlKTtcbn1cblxuLyoqXG4gKiBAZGVzY3JpcHRpb2466aqM6K+B5piv5ZCm5Li66YKu566xXG4gKiBAcGFyYW0ge3N0cmluZ30gTWFpbCDpgq7nrrHotKblj7dcbiAqIEByZXR1cm4ge0Jvb2xlYW59IEJvb2xlYW5cbiAqL1xuY29uc3QgaXNNYWlsID0gKE1haWwgPSBcIlwiKSA9PiB7XG4gICAgcmV0dXJuIC9eW0EtWmEtejAtOVxcdTRlMDAtXFx1OWZhNV0rQFthLXpBLVowLTlfLV0rKFxcLlthLXpBLVowLTlfLV0rKSskLy50ZXN0KE1haWwpXG59XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uOumqjOivgeS4gOauteWtl+espuS4suaYr+mCrueusei/mOaYr+aJi+acuuWPt+eggVxuICogQHBhcmFtIHtzdHJpbmd9IGFjY291bnQg5a2X56ym5LiyXG4gKiBAcmV0dXJuIHtTdHJpbmd8Qm9vbGVhbn0gbWFpbCAvIG1vYmlsZSAvIGZhbHNlXG4gKi9cbmNvbnN0IGlzTW9iaWxlT3JNYWlsID0gKGFjY291bnQpID0+IHtcbiAgICBpZiAoaXNNYWlsKGFjY291bnQpKSB7XG4gICAgICAgIHJldHVybiBcIm1haWxcIlxuICAgIH1cbiAgICBpZiAoaXNNb2JpbGUoYWNjb3VudCkpIHtcbiAgICAgICAgcmV0dXJuIFwibW9iaWxlXCJcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuLyoqXG4gKiBAZGVzY3JpcHRpb2466Ziy5oqWXG4gKiBAcGFyYW0gZm4g5pa55rOV5ZCNfOWbnuiwg+WHveaVsFxuICogQHBhcmFtIHdhaXQg5YmN5ZCO6Ze06ZqU5pe26Ze06Ze06LedXG4gKiBAcmV0dXJucyB7KGZ1bmN0aW9uKCk6IHZvaWQpfCp9IOmXreWMheaWueazlVxuICovXG5jb25zdCBkZWJvdW5jZSA9IChmbiwgd2FpdCkgPT4ge1xuICAgIGxldCB0aW1lciA9IG51bGw7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRpbWVyICE9PSBudWxsKSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgICAgICB9XG4gICAgICAgIHRpbWVyID0gc2V0VGltZW91dChmbiwgd2FpdCk7XG4gICAgfVxufVxuLyoqXG4gKiBAZGVzY3JpcHRpb2465oiq5rWBXG4gKiBAcGFyYW0gZm4g5pa55rOV5ZCN772c5Zue6LCD5Ye95pWwXG4gKiBAcGFyYW0gd2FpdCDmr4/mrKHosIPnlKjpl7TpmpRcbiAqIEByZXR1cm4geyhmdW5jdGlvbigpOiB2b2lkKXwqfVxuICovXG5jb25zdCB0aHJvdHRsZSA9IChmbiwgd2FpdCkgPT4ge1xuICAgIGxldCB0aW1lciA9IHRydWU7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0aW1lcikgcmV0dXJuO1xuICAgICAgICB0aW1lciA9IGZhbHNlO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbiAgICAgICAgICAgIHRpbWVyID0gdHJ1ZTtcbiAgICAgICAgfSwgd2FpdClcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGRlYm91bmNlLCBpc01vYmlsZU9yTWFpbCwgaXNNYWlsLCBpc01vYmlsZSwgdGhyb3R0bGVcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJjb25zdCBqc2JVdGlsID0gcmVxdWlyZShcIi4vc3JjL2luZGV4LmpzXCIpXG53aW5kb3cuanNiVXRpbCA9IGpzYlV0aWw7XG5cbmZ1bmN0aW9uIGxvZzEoKSB7XG4gICAgY29uc29sZS5sb2coMSlcbn1cblxuXG52YXIgYWMgPSBqc2JVdGlsLnRocm90dGxlKGxvZzEsIDEwMDApOy8v5Zug5Li65q2k5aSE55So5LqG6Zet5YyF77yM5omA5Lul5YWI6LWL5YC857uZ5LiA5Liq5Y+Y6YeP77ybXG5cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==