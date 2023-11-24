import { AccountUpdate, Experimental, fetchAccount, Field, Mina, PrivateKey, PublicKey, shutdown, TokenId, Types, UInt64 } from 'o1js';
import { Add } from './app/add';
import { getWebnode, log } from './app/helper';
import { TokenContract, ZkAppB, ZkAppC } from './app/token-zkapp';

log('APP STARTED');

const wallets = [
	{
		'publicKey': 'B62qrztYfPinaKqpXaYGY6QJ3SSW2NNKs7SajBLF1iFNXW9BoALN2Aq',
		'privateKey': 'EKEEpMELfQkMbJDt2fB4cFXKwSf1x4t7YD4twREy5yuJ84HBZtF9',
	},
	{
		'publicKey': 'B62qrJKtrMJCFDaYTqaxpY5KU1XuwSiL1ZtWteNFKxsmW9xZzG3cYX2',
		'privateKey': 'EKEFi6hzC6F3H6gsDMF271ZUGg59cFxEhaWcdd3JazWbgf414T9K',
	},
];

document.getElementById('btnZkApp')?.addEventListener('click', async () => {
	log('adding account to watch...');
	let addedAccount = await getWebnode().watched_accounts().add(wallets[0].publicKey);
	let gotAccount = await fetchAccount({ publicKey: wallets[0].publicKey });
	console.log('got account', gotAccount);
	log('got account to watch...');
	await createAndDeployZkapp();
});

document.getElementById('proofZkApp')?.addEventListener('click', async () => {
	await proofZkApp();
});

async function proofZkApp() {
	let initialBalance = 10_000_000;
	// const network = 'http://1.k8.openmina.com:31754/node2/graphql';
	const network = 'https://proxy.berkeley.minaexplorer.com/graphql';
	Mina.setActiveInstance(Mina.Network(network));

	// Mina.setActiveInstance(Local);
	// Local.addAccount(PublicKey.fromBase58(wallets[0].publicKey), '100000000');

	let feePayer = PrivateKey.fromBase58(wallets[0].privateKey);

	let tokenZkAppKey = PrivateKey.random();
	let tokenZkAppAddress = tokenZkAppKey.toPublicKey();

	let zkAppCKey = PrivateKey.random();
	let zkAppCAddress = zkAppCKey.toPublicKey();

	let zkAppBKey = PrivateKey.random();
	let zkAppBAddress = zkAppBKey.toPublicKey();

	let tokenAccount1Key = wallets[1].privateKey;
	let tokenAccount1 = PublicKey.fromBase58(wallets[1].publicKey);

	let tokenZkApp = new TokenContract(tokenZkAppAddress);
	let tokenId = tokenZkApp.token.id;

	let zkAppB = new ZkAppB(zkAppBAddress, tokenId);
	let zkAppC = new ZkAppC(zkAppCAddress, tokenId);
	let tx;

	console.log('tokenZkAppAddress', tokenZkAppAddress.toBase58());
	console.log('zkAppB', zkAppBAddress.toBase58());
	console.log('zkAppC', zkAppCAddress.toBase58());
	console.log('receiverAddress', tokenAccount1.toBase58());
	console.log('feePayer', wallets[0]);
	console.log('-------------------------------------------');

	console.log('compile (TokenContract)');
	await TokenContract.compile();
	console.log('compile (ZkAppB)');
	await ZkAppB.compile();
	console.log('compile (ZkAppC)');
	await ZkAppC.compile();

	console.log('deploy tokenZkApp');
	const { account } = await fetchAccount({ publicKey: feePayer.toPublicKey() }) as { account: Types.Account };
	const deployerAccount: any = { sender: feePayer.toPublicKey(), fee: 20000000, nonce: Types.Account.toJSON(account).nonce };
	tx = await Mina.transaction(feePayer.toPublicKey(), () => {
		AccountUpdate.fundNewAccount(deployerAccount);
		tokenZkApp.deploy({ zkappKey: tokenZkAppKey });
	});
	await tx.send();

	console.log('deploy zkAppB');
	tx = await Mina.transaction(feePayer.toPublicKey(), () => {
		AccountUpdate.fundNewAccount(deployerAccount);
		tokenZkApp.tokenDeploy(zkAppBKey, ZkAppB._verificationKey!);
	});
	console.log('deploy zkAppB (proof)');
	await tx.prove();
	await tx.send();

	console.log('deploy zkAppC');
	tx = await Mina.transaction(feePayer.toPublicKey(), () => {
		AccountUpdate.fundNewAccount(deployerAccount);
		tokenZkApp.tokenDeploy(zkAppCKey, ZkAppC._verificationKey!);
	});
	console.log('deploy zkAppC (proof)');
	await tx.prove();
	await tx.send();

	console.log('mint token to zkAppB');
	tx = await Mina.transaction(feePayer.toPublicKey(), () => {
		tokenZkApp.mint(zkAppBAddress);
	});
	await tx.prove();
	await tx.send();

	console.log('approve send from zkAppB');
	tx = await Mina.transaction(feePayer.toPublicKey(), () => {
		let approveSendingCallback = Experimental.Callback.create(
			zkAppB,
			'approveSend',
			[],
		);
		// we call the token contract with the callback
		tokenZkApp.sendTokens(zkAppBAddress, zkAppCAddress, approveSendingCallback);
	});
	console.log('approve send (proof)');
	await tx.prove();
	await tx.send();

	console.log(
		`zkAppC's balance for tokenId: ${TokenId.toBase58(tokenId)}`,
		Mina.getBalance(zkAppCAddress, tokenId).value.toBigInt(),
	);

	console.log('approve send from zkAppC');
	tx = await Mina.transaction(feePayer.toPublicKey(), () => {
		// Pay for tokenAccount1's account creation
		AccountUpdate.fundNewAccount(deployerAccount);
		let approveSendingCallback = Experimental.Callback.create(
			zkAppC,
			'approveSend',
			[],
		);
		// we call the token contract with the callback
		tokenZkApp.sendTokens(zkAppCAddress, tokenAccount1, approveSendingCallback);
	});
	console.log('approve send (proof)');
	await tx.prove();
	await tx.send();

	console.log(
		`tokenAccount1's balance for tokenId: ${TokenId.toBase58(tokenId)}`,
		Mina.getBalance(tokenAccount1, tokenId).value.toBigInt(),
	);

	shutdown();
}

async function createAndDeployZkapp() {
	// const network = 'http://1.k8.openmina.com:31754/node2/graphql';
	// const network = 'http://webrtc2.webnode.openmina.com:3089/graphql';
	const payerKeys = {
		publicKey: PrivateKey.fromBase58(wallets[0].privateKey).toPublicKey(),
		privateKey: PrivateKey.fromBase58(wallets[0].privateKey),
	};
	// const zkAppKeys = {
	// 	publicKey: PrivateKey.fromBase58(wallets[1].privateKey).toPublicKey(),
	// 	privateKey: PrivateKey.fromBase58(wallets[1].privateKey),
	// };
	const randPrivateKey = PrivateKey.random();
	const zkAppKeys = {
		publicKey: randPrivateKey.toPublicKey(),
		privateKey: randPrivateKey
	};
	const network = Mina.Network('https://proxy.berkeley.minaexplorer.com/graphql');
	Mina.setActiveInstance(network);
	// const zkAppPublicKey = PublicKey.fromBase58(wallets[1].publicKey);
	// const zkAppPrivateKey = PrivateKey.fromBase58(wallets[1].privateKey);
	const zkApp = new Add(zkAppKeys.publicKey);
	const { account } = await fetchAccount({ publicKey: payerKeys.publicKey }) as { account: Types.Account };
	log('fetching account...');

	// const accountPrivateKey: PrivateKey = PrivateKey.fromBase58(wallets[0].privateKey);
	// const accountPublicKey: PublicKey = accountPrivateKey.toPublicKey();

	log('Compiling...');
	await Add.compile();
	log('Updating...');

	const payerAccount: any = { sender: payerKeys.publicKey, fee: Number('0.5') * 1e9/*, nonce: Types.Account.toJSON(account).nonce*/ };
	const tx: any = await Mina.transaction(payerAccount, () => {
		AccountUpdate.fundNewAccount(payerKeys.publicKey);
		zkApp.deploy({ zkappKey: zkAppKeys.privateKey });
		console.log('zkApp updated');
	});

	log('Proving...');
	await tx.prove();

	log('Submitting...');
	await tx.sign([payerKeys.privateKey, zkAppKeys.privateKey]).send().then((sentTx: any) => {
		console.log(sentTx.data);
		if (sentTx.data) {
			// console.log('Sent transaction: ', sentTx.hash());
			log('Sent transaction: ' + sentTx.hash());
			// console.log('Check it here: \n');
			// console.log('http://1.k8.openmina.com:31754/explorer/transactions');
		} else if (tx.errors?.length) {
			console.log('Transaction errors: ', tx.errors[0]);
			log(tx.errors[0].statusText);
		}
	});

	// const tx2: any = await Mina.transaction(payerAccount, () => {
	// 	AccountUpdate.fundNewAccount(accountPublicKey);
	// 	zkApp.update();
	// 	console.log('zkApp updated');
	// });
	//
	// log('Proving...');
	// let proof2 = await tx2.prove();
	// console.log(proof2);
	//
	// log('Submitting...');
	// await tx2.sign([accountPrivateKey]).send().then((sentTx: any) => {
	// 	console.log(sentTx.data);
	// 	if (sentTx.data) {
	// 		// console.log('Sent transaction: ', sentTx.hash());
	// 		log('Sent transaction: ' + sentTx.hash());
	// 		// console.log('Check it here: \n');
	// 		// console.log('http://1.k8.openmina.com:31754/explorer/transactions');
	// 	} else if (tx2.errors?.length) {
	// 		console.log('Transaction errors: ', tx.errors[0]);
	// 		log(tx2.errors[0].statusText);
	// 	}
	// });

	await shutdown();
}
