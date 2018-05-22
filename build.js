/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = search;
/* harmony export (immutable) */ __webpack_exports__["b"] = videoStatistics;
/* harmony export (immutable) */ __webpack_exports__["c"] = downloadMore;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__xhr__ = __webpack_require__(5);

// const xhr = require('./xhr');

const apiKey = 'AIzaSyBkPL9Z0loT04dU7mqqtaKbfJW_9ucqgok';

const searchUrl = 'https://www.googleapis.com/youtube/v3/search?key={key}&type=video&part=snippet&maxResults={maxResults}&q={keyword}'.replace('{key}', apiKey);
const nextPageSearchUrl = 'https://www.googleapis.com/youtube/v3/search?key={key}&type=video&pageToken={pageToken}&part=snippet&maxResults={maxResults}&q={keyword}'.replace('{key}', apiKey);
const videosUrl = 'https://www.googleapis.com/youtube/v3/videos?key={key}&id={id}&part=snippet,statistics'.replace('{key}', apiKey);

async function search(keyword, maxResults) {
  const url = searchUrl.replace('{keyword}', keyword).replace('{maxResults}', maxResults);
  const response = await __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__xhr__["a" /* default */])(url);
  const videoList = JSON.parse(response);
  return videoList;
}

async function videoStatistics(ids) {
  const url = videosUrl.replace('{id}', ids);
  const response = await __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__xhr__["a" /* default */])(url);
  const videoStat = JSON.parse(response);
  return videoStat;
}

async function downloadMore(pageToken, keyword, maxResults = 15) {
  const url = nextPageSearchUrl.replace('{keyword}', keyword).replace('{maxResults}', maxResults).replace('{pageToken}', pageToken);
  const response = await __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__xhr__["a" /* default */])(url);
  const addVideoList = JSON.parse(response);
  return addVideoList;
}

// module.exports = { search, downloadMore, videoStatistics };


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = addSection;
/* harmony export (immutable) */ __webpack_exports__["a"] = renderMain;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__youtubeService__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__newPagination__ = __webpack_require__(3);
/* const service = require('./youtubeService');
const pagination = require('./newPagination');*/



let nextPageToken;

function openVideo(e, item) {
  e.preventDefault();
  const player = document.createElement('div');
  player.className = 'player-block';
  document.body.appendChild(player);
  const ifrDiv = document.createElement('div');
  const iframe = document.createElement('iframe');
  iframe.width = 420;
  iframe.height = 315;
  iframe.frameborder = '0';
  iframe.allow = 'autoplay; encrypted-media';
  iframe.allowfullscreen = true;
  player.appendChild(ifrDiv);
  ifrDiv.appendChild(iframe);
  iframe.src = `http://www.youtube.com/embed/${item.id.videoId}`;
  console.log('ok');
  player.style.display = 'block';
  const information = document.body.querySelector('.information');
  player.appendChild(information);
  const closeButton = document.createElement('i');
  closeButton.className = 'fa fa-times';
  player.appendChild(closeButton);
  closeButton.addEventListener('click', () => {
    document.body.removeChild(document.body.lastChild);
    document.querySelector('.gallery').firstChild.appendChild(information);
  });
}

function fillSection(item, publishDate, views) {
  const tmpl = '<div class="thumbnail">' +
        '<img src="<%=snippet.thumbnails.medium.url%>" alt="" width="100%" height="auto">' +
        '</a>' +
        '</div>' +
        '<div class="information">' +
        '<h2><a href="http://www.youtube.com/watch?v=<%=id.videoId%>" class="link title"><%=snippet.title%></a></h2>' +
        '<ul>' +
        '<li class="cannel"><i class="fa fa-user" aria-hidden="true"></i><%=snippet.channelTitle%></li>' +
        '<li class="published-at"><i class="fa fa-calendar" aria-hidden="true"></i></li>' +
        '<li class="views"><i class="fa fa-eye" aria-hidden="true"></i></li>' +
        '</ul>' +
        '<p class="description"><%=snippet.description%></p>' +
        '</div>';
  const gallery = document.body.querySelector('.gallery');
  const newSection = document.createElement('section');
  newSection.innerHTML = _.template(tmpl)(item);

  newSection.querySelector('.published-at').insertAdjacentText('beforeEnd', publishDate);
  newSection.querySelector('.views').insertAdjacentText('beforeEnd', views);

  console.log(item.id.videoId);
  gallery.appendChild(newSection);
  newSection.querySelector('img').addEventListener('click', e => openVideo(e, item));
}

function addSection(resp) {
  const items = resp.items;
  // itemsNumber += items.length;

  for (let i = 1; i < items.length; i += 1) {
    const item = resp.items[i];

    const date = new Date(Date.parse(item.snippet.publishedAt));
    let day = date.getDate();
    if (day < 10) {
      day = `0${day}`;
    }
    let month = date.getMonth() + 1;
    if (month < 10) {
      month = `0${month}`;
    }
    const publishDate = (`${day}.${month}.${date.getFullYear()}`);

    const videoId = item.id.videoId;
    __WEBPACK_IMPORTED_MODULE_0__youtubeService__["b" /* videoStatistics */](videoId).then((response) => {
      const views = response.items[0].statistics.viewCount;
      fillSection(item, publishDate, views);
    }).catch((error) => {
      console.warn(error);
    });
  }
  nextPageToken = resp.nextPageToken;
}


function renderMain(resp) {
  let tmpl;
  const items = resp.items;

  if (items.length === 0) {
    tmpl = '<p class="empty-result">No results. Try to use other keywords.</p>';
  } else {
    tmpl = '<div class="main-inner">' +
            '<div class="gallery">' +
            '</div>' +
            '</div>';
  }

  const main = document.body.querySelector('main');
  main.innerHTML = _.template(tmpl)();

  addSection(resp);

  window.onscroll = function () {
    const position = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    const scroll = document.documentElement.scrollHeight;
    if (position + clientHeight >= scroll) {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__newPagination__["a" /* default */])(nextPageToken);
    }
  };
}

/* module.exports.renderMain = renderMain;
module.exports.addSection = addSection;*/


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__youtubeService__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__renderHeader__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__renderMain__ = __webpack_require__(1);



/*
const service = require('./youtubeService');
const renderHeader = require('./renderHeader');
const renderMain = require('./renderMain');
*/
__WEBPACK_IMPORTED_MODULE_1__renderHeader__["a" /* renderHeader */]();

function makeCustomQuery(query) {
  __WEBPACK_IMPORTED_MODULE_0__youtubeService__["a" /* search */](query, 15).then((response) => {
    __WEBPACK_IMPORTED_MODULE_2__renderMain__["a" /* renderMain */](response);
  }).catch((error) => {
    console.warn(error);
  });
}

__WEBPACK_IMPORTED_MODULE_1__renderHeader__["b" /* setSearchAction */](makeCustomQuery);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = pagination;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__youtubeService__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__renderMain__ = __webpack_require__(1);
/* const service = require('./youtubeService');
const addSection = require('./renderMain').addSection;*/



function pagination(nextPageToken) {
  const searchInput = document.body.querySelector('.search-input');
  const query = searchInput.value;

  __WEBPACK_IMPORTED_MODULE_0__youtubeService__["c" /* downloadMore */](nextPageToken, query).then((response) => {
    __WEBPACK_IMPORTED_MODULE_1__renderMain__["b" /* addSection */](response);
  }).catch((error) => {
    console.warn(error);
  });
}


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = renderHeader;
/* harmony export (immutable) */ __webpack_exports__["b"] = setSearchAction;
let searchInput;
let searchButton;

function renderHeader() {
  const bottomScript = document.body.querySelector('script');

  const header = document.createElement('header');
  document.body.insertBefore(header, bottomScript);

  const searchContainer = document.createElement('div');
  searchContainer.className = 'search-container';
  header.appendChild(searchContainer);

  searchInput = window.document.createElement('input');
  searchInput.placeholder = 'search';
  searchInput.type = 'search';
  searchInput.className = 'search-input';
  searchInput.setAttribute('autofocus', 'autofocus');
  searchContainer.appendChild(searchInput);

  searchButton = document.createElement('button');
  searchButton.className = 'search-button';
  searchContainer.appendChild(searchButton);

  const searchIcon = document.createElement('i');
  searchIcon.className = 'fa fa-search';
  searchIcon.setAttribute('aria-hidden', 'true');
  searchButton.appendChild(searchIcon);

  const main = document.createElement('main');
  document.body.insertBefore(main, bottomScript);
}

function setSearchAction(searchFunc) {
  searchInput.addEventListener('keypress', (e) => {
    if (e.keyCode === 13) {
      searchFunc(searchInput.value);
    }
  });
  searchButton.addEventListener('click', () => {
    searchFunc(searchInput.value);
  });
}

// module.exports = { setSearchAction, renderHeader };


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = httpGet;
function httpGet(url) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open('GET', url);

    request.onload = () => {
      if (request.status === 200) {
        resolve(request.response);
      } else {
        reject(Error(request.statusText));
      }
    };

    request.onerror = () => {
      reject(Error('Network Error'));
    };

    request.send();
  });
}

// module.exports.httpGet = httpGet;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ })
/******/ ]);