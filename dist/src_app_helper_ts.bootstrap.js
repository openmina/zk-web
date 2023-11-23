"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkzk_web"] = self["webpackChunkzk_web"] || []).push([["src_app_helper_ts"],{

/***/ "./src/app/helper.ts":
/*!***************************!*\
  !*** ./src/app/helper.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getWasm: () => (/* binding */ getWasm),\n/* harmony export */   getWebnode: () => (/* binding */ getWebnode),\n/* harmony export */   getWindowWebnode: () => (/* binding */ getWindowWebnode),\n/* harmony export */   log: () => (/* binding */ log)\n/* harmony export */ });\nfunction getWindowWebnode() {\n    return window.webnode;\n}\nfunction getWebnode() {\n    return getWindowWebnode().webnode;\n}\nfunction getWasm() {\n    return getWindowWebnode().wasm;\n}\nfunction log(value) {\n    const elementById = document.getElementsByClassName('logs')[0];\n    elementById.innerHTML = value;\n}\n\n\n//# sourceURL=webpack://zk-web/./src/app/helper.ts?");

/***/ })

}]);