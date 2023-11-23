"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkzk_web"] = self["webpackChunkzk_web"] || []).push([["src_main_ts"],{

/***/ "./src/app/add.ts":
/*!************************!*\
  !*** ./src/app/add.ts ***!
  \************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Add: () => (/* binding */ Add)\n/* harmony export */ });\n/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ \"./node_modules/tslib/tslib.es6.mjs\");\n/* harmony import */ var o1js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! o1js */ \"./node_modules/o1js/dist/web/index.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([o1js__WEBPACK_IMPORTED_MODULE_0__]);\no1js__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\nclass Add extends o1js__WEBPACK_IMPORTED_MODULE_0__.SmartContract {\n    constructor() {\n        super(...arguments);\n        this.num = (0,o1js__WEBPACK_IMPORTED_MODULE_0__.State)();\n    }\n    init() {\n        // this.account.provedState.assertEquals(this.account.provedState.get());\n        // this.account.provedState.get().assertFalse();\n        super.init();\n        this.num.set((0,o1js__WEBPACK_IMPORTED_MODULE_0__.Field)(1));\n    }\n    update() {\n        const currentState = this.num.getAndAssertEquals();\n        const newState = currentState.add(27);\n        this.num.set(newState);\n    }\n    deploy(args) {\n        super.deploy(args);\n        // this.account.permissions.set({\n        // \t...Permissions.default(),\n        // \tsetDelegate: Permissions.proof(),\n        // \tsetPermissions: Permissions.proof(),\n        // \tsetVerificationKey: Permissions.proof(),\n        // \tsetZkappUri: Permissions.proof(),\n        // \tsetTokenSymbol: Permissions.proof(),\n        // \tincrementNonce: Permissions.proof(),\n        // \tsetVotingFor: Permissions.proof(),\n        // \tsetTiming: Permissions.proof(),\n        // \tsend: Permissions.proof(),\n        // \teditState: Permissions.proof(),\n        // \treceive: Permissions.proof(),\n        // \taccess: Permissions.proof(),\n        // \teditActionState: Permissions.proof(),\n        // });\n    }\n}\n(0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([\n    (0,o1js__WEBPACK_IMPORTED_MODULE_0__.state)(o1js__WEBPACK_IMPORTED_MODULE_0__.Field),\n    (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__metadata)(\"design:type\", Object)\n], Add.prototype, \"num\", void 0);\n(0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([\n    o1js__WEBPACK_IMPORTED_MODULE_0__.method,\n    (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__metadata)(\"design:type\", Function),\n    (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__metadata)(\"design:paramtypes\", []),\n    (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__metadata)(\"design:returntype\", void 0)\n], Add.prototype, \"update\", null);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });\n\n//# sourceURL=webpack://zk-web/./src/app/add.ts?");

/***/ }),

/***/ "./src/app/helper.ts":
/*!***************************!*\
  !*** ./src/app/helper.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getWasm: () => (/* binding */ getWasm),\n/* harmony export */   getWebnode: () => (/* binding */ getWebnode),\n/* harmony export */   getWindowWebnode: () => (/* binding */ getWindowWebnode),\n/* harmony export */   log: () => (/* binding */ log)\n/* harmony export */ });\nfunction getWindowWebnode() {\n    return window.webnode;\n}\nfunction getWebnode() {\n    return getWindowWebnode().webnode;\n}\nfunction getWasm() {\n    return getWindowWebnode().wasm;\n}\nfunction log(value) {\n    const elementById = document.getElementsByClassName('logs')[0];\n    elementById.innerHTML = value;\n}\n\n\n//# sourceURL=webpack://zk-web/./src/app/helper.ts?");

/***/ }),

/***/ "./src/app/token-zkapp.ts":
/*!********************************!*\
  !*** ./src/app/token-zkapp.ts ***!
  \********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   TokenContract: () => (/* binding */ TokenContract),\n/* harmony export */   ZkAppB: () => (/* binding */ ZkAppB),\n/* harmony export */   ZkAppC: () => (/* binding */ ZkAppC)\n/* harmony export */ });\n/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ \"./node_modules/tslib/tslib.es6.mjs\");\n/* harmony import */ var o1js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! o1js */ \"./node_modules/o1js/dist/web/index.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([o1js__WEBPACK_IMPORTED_MODULE_0__]);\no1js__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n/**\n * This TokenContract class is used to create a custom token\n * and acts as the token owner of the custom token\n */\nclass TokenContract extends o1js__WEBPACK_IMPORTED_MODULE_0__.SmartContract {\n    deploy(args) {\n        super.deploy(args);\n        this.setPermissions({\n            ...o1js__WEBPACK_IMPORTED_MODULE_0__.Permissions.default(),\n            access: o1js__WEBPACK_IMPORTED_MODULE_0__.Permissions.proofOrSignature(),\n        });\n        let initialBalance = 10000000;\n        this.balance.addInPlace(o1js__WEBPACK_IMPORTED_MODULE_0__.UInt64.from(initialBalance));\n    }\n    tokenDeploy(deployer, verificationKey) {\n        let address = deployer.toPublicKey();\n        let tokenId = this.token.id;\n        let deployUpdate = o1js__WEBPACK_IMPORTED_MODULE_0__.Experimental.createChildAccountUpdate(this.self, address, tokenId);\n        deployUpdate.account.permissions.set(o1js__WEBPACK_IMPORTED_MODULE_0__.Permissions.default());\n        deployUpdate.account.verificationKey.set(verificationKey);\n        deployUpdate.sign(deployer);\n    }\n    mint(receiverAddress) {\n        let amount = o1js__WEBPACK_IMPORTED_MODULE_0__.UInt64.from(1000000);\n        this.token.mint({ address: receiverAddress, amount });\n    }\n    burn(receiverAddress) {\n        let amount = o1js__WEBPACK_IMPORTED_MODULE_0__.UInt64.from(1000);\n        this.token.burn({ address: receiverAddress, amount });\n    }\n    sendTokens(senderAddress, receiverAddress, callback) {\n        let senderAccountUpdate = this.approve(callback, o1js__WEBPACK_IMPORTED_MODULE_0__.AccountUpdate.Layout.AnyChildren);\n        let amount = o1js__WEBPACK_IMPORTED_MODULE_0__.UInt64.from(1000);\n        let negativeAmount = o1js__WEBPACK_IMPORTED_MODULE_0__.Int64.fromObject(senderAccountUpdate.body.balanceChange);\n        negativeAmount.assertEquals(o1js__WEBPACK_IMPORTED_MODULE_0__.Int64.from(amount).neg());\n        let tokenId = this.token.id;\n        senderAccountUpdate.body.tokenId.assertEquals(tokenId);\n        senderAccountUpdate.body.publicKey.assertEquals(senderAddress);\n        let receiverAccountUpdate = o1js__WEBPACK_IMPORTED_MODULE_0__.Experimental.createChildAccountUpdate(this.self, receiverAddress, tokenId);\n        receiverAccountUpdate.balance.addInPlace(amount);\n    }\n}\n(0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([\n    o1js__WEBPACK_IMPORTED_MODULE_0__.method,\n    (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__metadata)(\"design:type\", Function),\n    (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__metadata)(\"design:paramtypes\", [o1js__WEBPACK_IMPORTED_MODULE_0__.PrivateKey, o1js__WEBPACK_IMPORTED_MODULE_0__.VerificationKey]),\n    (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__metadata)(\"design:returntype\", void 0)\n], TokenContract.prototype, \"tokenDeploy\", null);\n(0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([\n    o1js__WEBPACK_IMPORTED_MODULE_0__.method,\n    (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__metadata)(\"design:type\", Function),\n    (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__metadata)(\"design:paramtypes\", [o1js__WEBPACK_IMPORTED_MODULE_0__.PublicKey]),\n    (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__metadata)(\"design:returntype\", void 0)\n], TokenContract.prototype, \"mint\", null);\n(0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([\n    o1js__WEBPACK_IMPORTED_MODULE_0__.method,\n    (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__metadata)(\"design:type\", Function),\n    (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__metadata)(\"design:paramtypes\", [o1js__WEBPACK_IMPORTED_MODULE_0__.PublicKey]),\n    (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__metadata)(\"design:returntype\", void 0)\n], TokenContract.prototype, \"burn\", null);\n(0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([\n    o1js__WEBPACK_IMPORTED_MODULE_0__.method,\n    (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__metadata)(\"design:type\", Function),\n    (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__metadata)(\"design:paramtypes\", [o1js__WEBPACK_IMPORTED_MODULE_0__.PublicKey,\n        o1js__WEBPACK_IMPORTED_MODULE_0__.PublicKey, o1js__WEBPACK_IMPORTED_MODULE_0__.Experimental.Callback]),\n    (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__metadata)(\"design:returntype\", void 0)\n], TokenContract.prototype, \"sendTokens\", null);\nclass ZkAppB extends o1js__WEBPACK_IMPORTED_MODULE_0__.SmartContract {\n    approveSend() {\n        let amount = o1js__WEBPACK_IMPORTED_MODULE_0__.UInt64.from(1000);\n        this.balance.subInPlace(amount);\n    }\n}\n(0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([\n    o1js__WEBPACK_IMPORTED_MODULE_0__.method,\n    (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__metadata)(\"design:type\", Function),\n    (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__metadata)(\"design:paramtypes\", []),\n    (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__metadata)(\"design:returntype\", void 0)\n], ZkAppB.prototype, \"approveSend\", null);\nclass ZkAppC extends o1js__WEBPACK_IMPORTED_MODULE_0__.SmartContract {\n    approveSend() {\n        let amount = o1js__WEBPACK_IMPORTED_MODULE_0__.UInt64.from(1000);\n        this.balance.subInPlace(amount);\n    }\n}\n(0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([\n    o1js__WEBPACK_IMPORTED_MODULE_0__.method,\n    (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__metadata)(\"design:type\", Function),\n    (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__metadata)(\"design:paramtypes\", []),\n    (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__metadata)(\"design:returntype\", void 0)\n], ZkAppC.prototype, \"approveSend\", null);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });\n\n//# sourceURL=webpack://zk-web/./src/app/token-zkapp.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var o1js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! o1js */ \"./node_modules/o1js/dist/web/index.js\");\n/* harmony import */ var _app_add__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app/add */ \"./src/app/add.ts\");\n/* harmony import */ var _app_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/helper */ \"./src/app/helper.ts\");\n/* harmony import */ var _app_token_zkapp__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/token-zkapp */ \"./src/app/token-zkapp.ts\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([o1js__WEBPACK_IMPORTED_MODULE_0__, _app_add__WEBPACK_IMPORTED_MODULE_1__, _app_token_zkapp__WEBPACK_IMPORTED_MODULE_3__]);\n([o1js__WEBPACK_IMPORTED_MODULE_0__, _app_add__WEBPACK_IMPORTED_MODULE_1__, _app_token_zkapp__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\n\n(0,_app_helper__WEBPACK_IMPORTED_MODULE_2__.log)('APP STARTED');\nconst wallets = [\n    {\n        'publicKey': 'B62qrztYfPinaKqpXaYGY6QJ3SSW2NNKs7SajBLF1iFNXW9BoALN2Aq',\n        'privateKey': 'EKEEpMELfQkMbJDt2fB4cFXKwSf1x4t7YD4twREy5yuJ84HBZtF9',\n    },\n    {\n        'publicKey': 'B62qrJKtrMJCFDaYTqaxpY5KU1XuwSiL1ZtWteNFKxsmW9xZzG3cYX2',\n        'privateKey': 'EKEFi6hzC6F3H6gsDMF271ZUGg59cFxEhaWcdd3JazWbgf414T9K',\n    },\n];\ndocument.getElementById('btnZkApp')?.addEventListener('click', async () => {\n    // log('adding account to watch...');\n    // let addedAccount = await getWebnode().watched_accounts().add(wallets[0].publicKey);\n    // let gotAccount = await fetchAccount({ publicKey: wallets[0].publicKey });\n    // console.log('got account', gotAccount);\n    // log('got account to watch...');\n    await createAndDeployZkapp();\n});\ndocument.getElementById('proofZkApp')?.addEventListener('click', async () => {\n    await proofZkApp();\n});\nasync function proofZkApp() {\n    let initialBalance = 10000000;\n    // const network = 'http://1.k8.openmina.com:31754/node2/graphql';\n    const network = 'https://proxy.berkeley.minaexplorer.com/graphql';\n    o1js__WEBPACK_IMPORTED_MODULE_0__.Mina.setActiveInstance(o1js__WEBPACK_IMPORTED_MODULE_0__.Mina.Network(network));\n    // Mina.setActiveInstance(Local);\n    // Local.addAccount(PublicKey.fromBase58(wallets[0].publicKey), '100000000');\n    let feePayer = o1js__WEBPACK_IMPORTED_MODULE_0__.PrivateKey.fromBase58(wallets[0].privateKey);\n    let tokenZkAppKey = o1js__WEBPACK_IMPORTED_MODULE_0__.PrivateKey.random();\n    let tokenZkAppAddress = tokenZkAppKey.toPublicKey();\n    let zkAppCKey = o1js__WEBPACK_IMPORTED_MODULE_0__.PrivateKey.random();\n    let zkAppCAddress = zkAppCKey.toPublicKey();\n    let zkAppBKey = o1js__WEBPACK_IMPORTED_MODULE_0__.PrivateKey.random();\n    let zkAppBAddress = zkAppBKey.toPublicKey();\n    let tokenAccount1Key = wallets[1].privateKey;\n    let tokenAccount1 = o1js__WEBPACK_IMPORTED_MODULE_0__.PublicKey.fromBase58(wallets[1].publicKey);\n    let tokenZkApp = new _app_token_zkapp__WEBPACK_IMPORTED_MODULE_3__.TokenContract(tokenZkAppAddress);\n    let tokenId = tokenZkApp.token.id;\n    let zkAppB = new _app_token_zkapp__WEBPACK_IMPORTED_MODULE_3__.ZkAppB(zkAppBAddress, tokenId);\n    let zkAppC = new _app_token_zkapp__WEBPACK_IMPORTED_MODULE_3__.ZkAppC(zkAppCAddress, tokenId);\n    let tx;\n    console.log('tokenZkAppAddress', tokenZkAppAddress.toBase58());\n    console.log('zkAppB', zkAppBAddress.toBase58());\n    console.log('zkAppC', zkAppCAddress.toBase58());\n    console.log('receiverAddress', tokenAccount1.toBase58());\n    console.log('feePayer', wallets[0]);\n    console.log('-------------------------------------------');\n    console.log('compile (TokenContract)');\n    await _app_token_zkapp__WEBPACK_IMPORTED_MODULE_3__.TokenContract.compile();\n    console.log('compile (ZkAppB)');\n    await _app_token_zkapp__WEBPACK_IMPORTED_MODULE_3__.ZkAppB.compile();\n    console.log('compile (ZkAppC)');\n    await _app_token_zkapp__WEBPACK_IMPORTED_MODULE_3__.ZkAppC.compile();\n    console.log('deploy tokenZkApp');\n    const { account } = await (0,o1js__WEBPACK_IMPORTED_MODULE_0__.fetchAccount)({ publicKey: feePayer.toPublicKey() });\n    const deployerAccount = { sender: feePayer.toPublicKey(), fee: 20000000, nonce: o1js__WEBPACK_IMPORTED_MODULE_0__.Types.Account.toJSON(account).nonce };\n    tx = await o1js__WEBPACK_IMPORTED_MODULE_0__.Mina.transaction(feePayer.toPublicKey(), () => {\n        o1js__WEBPACK_IMPORTED_MODULE_0__.AccountUpdate.fundNewAccount(deployerAccount);\n        tokenZkApp.deploy({ zkappKey: tokenZkAppKey });\n    });\n    await tx.send();\n    console.log('deploy zkAppB');\n    tx = await o1js__WEBPACK_IMPORTED_MODULE_0__.Mina.transaction(feePayer.toPublicKey(), () => {\n        o1js__WEBPACK_IMPORTED_MODULE_0__.AccountUpdate.fundNewAccount(deployerAccount);\n        tokenZkApp.tokenDeploy(zkAppBKey, _app_token_zkapp__WEBPACK_IMPORTED_MODULE_3__.ZkAppB._verificationKey);\n    });\n    console.log('deploy zkAppB (proof)');\n    await tx.prove();\n    await tx.send();\n    console.log('deploy zkAppC');\n    tx = await o1js__WEBPACK_IMPORTED_MODULE_0__.Mina.transaction(feePayer.toPublicKey(), () => {\n        o1js__WEBPACK_IMPORTED_MODULE_0__.AccountUpdate.fundNewAccount(deployerAccount);\n        tokenZkApp.tokenDeploy(zkAppCKey, _app_token_zkapp__WEBPACK_IMPORTED_MODULE_3__.ZkAppC._verificationKey);\n    });\n    console.log('deploy zkAppC (proof)');\n    await tx.prove();\n    await tx.send();\n    console.log('mint token to zkAppB');\n    tx = await o1js__WEBPACK_IMPORTED_MODULE_0__.Mina.transaction(feePayer.toPublicKey(), () => {\n        tokenZkApp.mint(zkAppBAddress);\n    });\n    await tx.prove();\n    await tx.send();\n    console.log('approve send from zkAppB');\n    tx = await o1js__WEBPACK_IMPORTED_MODULE_0__.Mina.transaction(feePayer.toPublicKey(), () => {\n        let approveSendingCallback = o1js__WEBPACK_IMPORTED_MODULE_0__.Experimental.Callback.create(zkAppB, 'approveSend', []);\n        // we call the token contract with the callback\n        tokenZkApp.sendTokens(zkAppBAddress, zkAppCAddress, approveSendingCallback);\n    });\n    console.log('approve send (proof)');\n    await tx.prove();\n    await tx.send();\n    console.log(`zkAppC's balance for tokenId: ${o1js__WEBPACK_IMPORTED_MODULE_0__.TokenId.toBase58(tokenId)}`, o1js__WEBPACK_IMPORTED_MODULE_0__.Mina.getBalance(zkAppCAddress, tokenId).value.toBigInt());\n    console.log('approve send from zkAppC');\n    tx = await o1js__WEBPACK_IMPORTED_MODULE_0__.Mina.transaction(feePayer.toPublicKey(), () => {\n        // Pay for tokenAccount1's account creation\n        o1js__WEBPACK_IMPORTED_MODULE_0__.AccountUpdate.fundNewAccount(deployerAccount);\n        let approveSendingCallback = o1js__WEBPACK_IMPORTED_MODULE_0__.Experimental.Callback.create(zkAppC, 'approveSend', []);\n        // we call the token contract with the callback\n        tokenZkApp.sendTokens(zkAppCAddress, tokenAccount1, approveSendingCallback);\n    });\n    console.log('approve send (proof)');\n    await tx.prove();\n    await tx.send();\n    console.log(`tokenAccount1's balance for tokenId: ${o1js__WEBPACK_IMPORTED_MODULE_0__.TokenId.toBase58(tokenId)}`, o1js__WEBPACK_IMPORTED_MODULE_0__.Mina.getBalance(tokenAccount1, tokenId).value.toBigInt());\n    (0,o1js__WEBPACK_IMPORTED_MODULE_0__.shutdown)();\n}\nasync function createAndDeployZkapp() {\n    // const network = 'http://1.k8.openmina.com:31754/node2/graphql';\n    // const network = 'http://webrtc2.webnode.openmina.com:3089/graphql';\n    const network = 'https://proxy.berkeley.minaexplorer.com/graphql';\n    o1js__WEBPACK_IMPORTED_MODULE_0__.Mina.setActiveInstance(o1js__WEBPACK_IMPORTED_MODULE_0__.Mina.Network(network));\n    const zkAppPublicKey = o1js__WEBPACK_IMPORTED_MODULE_0__.PublicKey.fromBase58(wallets[1].publicKey);\n    const zkAppPrivateKey = o1js__WEBPACK_IMPORTED_MODULE_0__.PrivateKey.fromBase58(wallets[1].privateKey);\n    const zkApp = new _app_add__WEBPACK_IMPORTED_MODULE_1__.Add(zkAppPublicKey);\n    const { account } = await (0,o1js__WEBPACK_IMPORTED_MODULE_0__.fetchAccount)({ publicKey: o1js__WEBPACK_IMPORTED_MODULE_0__.PublicKey.fromBase58(wallets[0].publicKey) });\n    (0,_app_helper__WEBPACK_IMPORTED_MODULE_2__.log)('fetching account...');\n    const accountPrivateKey = o1js__WEBPACK_IMPORTED_MODULE_0__.PrivateKey.fromBase58(wallets[0].privateKey);\n    const accountPublicKey = accountPrivateKey.toPublicKey();\n    (0,_app_helper__WEBPACK_IMPORTED_MODULE_2__.log)('Compiling...');\n    await _app_add__WEBPACK_IMPORTED_MODULE_1__.Add.compile();\n    (0,_app_helper__WEBPACK_IMPORTED_MODULE_2__.log)('Updating...');\n    const deployerAccount = { sender: accountPublicKey, fee: 0.1e9, nonce: o1js__WEBPACK_IMPORTED_MODULE_0__.Types.Account.toJSON(account).nonce };\n    const tx = await o1js__WEBPACK_IMPORTED_MODULE_0__.Mina.transaction(deployerAccount, () => {\n        o1js__WEBPACK_IMPORTED_MODULE_0__.AccountUpdate.fundNewAccount(accountPublicKey);\n        zkApp.deploy({ zkappKey: zkAppPrivateKey });\n        console.log('zkApp deployed');\n    });\n    (0,_app_helper__WEBPACK_IMPORTED_MODULE_2__.log)('Proving...');\n    let proof = await tx.prove();\n    console.log(proof);\n    (0,_app_helper__WEBPACK_IMPORTED_MODULE_2__.log)('Submitting...');\n    await tx.sign([accountPrivateKey, zkAppPrivateKey]).send().then((sentTx) => {\n        console.log(sentTx.data);\n        if (sentTx.data) {\n            // console.log('Sent transaction: ', sentTx.hash());\n            (0,_app_helper__WEBPACK_IMPORTED_MODULE_2__.log)('Sent transaction: ' + sentTx.hash());\n            // console.log('Check it here: \\n');\n            // console.log('http://1.k8.openmina.com:31754/explorer/transactions');\n        }\n        else if (tx.errors?.length) {\n            console.log('Transaction errors: ', tx.errors[0]);\n            (0,_app_helper__WEBPACK_IMPORTED_MODULE_2__.log)(tx.errors[0].statusText);\n        }\n    });\n    // const tx2: any = await Mina.transaction(deployerAccount, () => {\n    // \tAccountUpdate.fundNewAccount(accountPublicKey);\n    // \tzkApp.update();\n    // \tconsole.log('zkApp updated');\n    // });\n    //\n    // log('Proving...');\n    // let proof2 = await tx2.prove();\n    // console.log(proof2);\n    //\n    // log('Submitting...');\n    // await tx2.sign([accountPrivateKey]).send().then((sentTx: any) => {\n    // \tconsole.log(sentTx.data);\n    // \tif (sentTx.data) {\n    // \t\t// console.log('Sent transaction: ', sentTx.hash());\n    // \t\tlog('Sent transaction: ' + sentTx.hash());\n    // \t\t// console.log('Check it here: \\n');\n    // \t\t// console.log('http://1.k8.openmina.com:31754/explorer/transactions');\n    // \t} else if (tx2.errors?.length) {\n    // \t\tconsole.log('Transaction errors: ', tx.errors[0]);\n    // \t\tlog(tx2.errors[0].statusText);\n    // \t}\n    // });\n    await (0,o1js__WEBPACK_IMPORTED_MODULE_0__.shutdown)();\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });\n\n//# sourceURL=webpack://zk-web/./src/main.ts?");

/***/ })

}]);