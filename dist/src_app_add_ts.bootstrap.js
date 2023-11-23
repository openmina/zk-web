"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkzk_web"] = self["webpackChunkzk_web"] || []).push([["src_app_add_ts"],{

/***/ "./src/app/add.ts":
/*!************************!*\
  !*** ./src/app/add.ts ***!
  \************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Add: () => (/* binding */ Add)\n/* harmony export */ });\n/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ \"./node_modules/tslib/tslib.es6.mjs\");\n/* harmony import */ var o1js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! o1js */ \"./node_modules/o1js/dist/web/index.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([o1js__WEBPACK_IMPORTED_MODULE_0__]);\no1js__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\nclass Add extends o1js__WEBPACK_IMPORTED_MODULE_0__.SmartContract {\n    constructor() {\n        super(...arguments);\n        this.num = (0,o1js__WEBPACK_IMPORTED_MODULE_0__.State)();\n    }\n    init() {\n        // this.account.provedState.assertEquals(this.account.provedState.get());\n        // this.account.provedState.get().assertFalse();\n        super.init();\n        this.num.set((0,o1js__WEBPACK_IMPORTED_MODULE_0__.Field)(1));\n    }\n    update() {\n        const currentState = this.num.getAndAssertEquals();\n        const newState = currentState.add(27);\n        this.num.set(newState);\n    }\n    deploy(args) {\n        super.deploy(args);\n        // this.account.permissions.set({\n        // \t...Permissions.default(),\n        // \tsetDelegate: Permissions.proof(),\n        // \tsetPermissions: Permissions.proof(),\n        // \tsetVerificationKey: Permissions.proof(),\n        // \tsetZkappUri: Permissions.proof(),\n        // \tsetTokenSymbol: Permissions.proof(),\n        // \tincrementNonce: Permissions.proof(),\n        // \tsetVotingFor: Permissions.proof(),\n        // \tsetTiming: Permissions.proof(),\n        // \tsend: Permissions.proof(),\n        // \teditState: Permissions.proof(),\n        // \treceive: Permissions.proof(),\n        // \taccess: Permissions.proof(),\n        // \teditActionState: Permissions.proof(),\n        // });\n    }\n}\n(0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([\n    (0,o1js__WEBPACK_IMPORTED_MODULE_0__.state)(o1js__WEBPACK_IMPORTED_MODULE_0__.Field),\n    (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__metadata)(\"design:type\", Object)\n], Add.prototype, \"num\", void 0);\n(0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([\n    o1js__WEBPACK_IMPORTED_MODULE_0__.method,\n    (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__metadata)(\"design:type\", Function),\n    (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__metadata)(\"design:paramtypes\", []),\n    (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__metadata)(\"design:returntype\", void 0)\n], Add.prototype, \"update\", null);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });\n\n//# sourceURL=webpack://zk-web/./src/app/add.ts?");

/***/ })

}]);