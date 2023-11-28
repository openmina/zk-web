import {
	AccountUpdate,
	DeployArgs,
	Experimental,
	fetchAccount, Permissions,
	Field, method,
	Mina,
	PrivateKey,
	PublicKey,
	shutdown,
	SmartContract,
	TokenId,
	Types,
	UInt64, VerificationKey, Int64, Signature, isReady, state, State,
} from 'o1js';
import { Add } from './app/add';
import { getWebnode, log } from './app/helper';
import { TokenContract, ZkAppB, ZkAppC } from './app/token-zkapp';
import { ProofsOnlyZkApp } from './app/proof-example-1/proofs-only-zkapp';
import { SecondaryZkApp } from './app/proof-example-1/secondary-zkapp';
import { BasicTokenContract } from './app/basic-proof/basic-token-contract';

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
	// log('adding account to watch...');
	// let addedAccount = await getWebnode().watched_accounts().add(wallets[0].publicKey);
	// let gotAccount = await fetchAccount({ publicKey: wallets[0].publicKey });
	// console.log('got account', gotAccount);
	// log('got account to watch...');
	await createAndDeployZkapp();
});

document.getElementById('proofZkApp')?.addEventListener('click', async () => {
	// await proofZkApp();
	// await proofZkApp2();
	// await proofZkApp3();
	await proofZkApp4();
});

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
		privateKey: randPrivateKey,
	};
	const network = Mina.Network('https://proxy.berkeley.minaexplorer.com/graphql');
	Mina.setActiveInstance(network);
	// const zkAppPublicKey = PublicKey.fromBase58(wallets[1].publicKey);
	// const zkAppPrivateKey = PrivateKey.fromBase58(wallets[1].privateKey);
	const zkApp = new Add(zkAppKeys.publicKey);
	log('fetching account...');
	const { account } = await fetchAccount({ publicKey: payerKeys.publicKey }) as { account: Types.Account };

	// const accountPrivateKey: PrivateKey = PrivateKey.fromBase58(wallets[0].privateKey);
	// const accountPublicKey: PublicKey = accountPrivateKey.toPublicKey();

	log('Compiling...');
	await Add.compile();
	log('Updating...');

	const payerAccount: any = { sender: payerKeys.publicKey, fee: Number('0.7') * 1e9, nonce: Types.Account.toJSON(account).nonce };
	let tx: any = await Mina.transaction(payerAccount, () => {
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
			log('Sent transaction: ' + sentTx.hash());
		} else if (tx.errors?.length) {
			console.log('Transaction errors: ', tx.errors[0]);
			log(tx.errors[0].statusText);
		}
	});
	tx = await Mina.transaction(payerAccount, () => {
		zkApp.update();
	});

	log('Proving...');
	await tx.prove();

	log('Submitting...');
	await tx.sign([payerKeys.privateKey, zkAppKeys.privateKey]).send().then((sentTx: any) => {
		console.log(sentTx.data);
		if (sentTx.data) {
			log('Sent transaction: ' + sentTx.hash());
		} else if (tx.errors?.length) {
			console.log('Transaction errors: ', tx.errors[0]);
			log(tx.errors[0].statusText);
		}
	});
}

async function proofZkApp() {
	const proofsEnabled = true;
	const Local = Mina.LocalBlockchain({ proofsEnabled });
	Mina.setActiveInstance(Local);
	const deployerPrivateKey = Local.testAccounts[0].privateKey;
	const deployerPubkey = deployerPrivateKey.toPublicKey();

	if (proofsEnabled) {
		log('COMPILING...');
		await ProofsOnlyZkApp.compile();
		await SecondaryZkApp.compile();
	}

	// ----------------------------------------------------

	const proofsOnlySk = PrivateKey.random();
	const proofsOnlyAddr = proofsOnlySk.toPublicKey();

	const secondarySk = PrivateKey.random();
	const secondaryAddr = secondarySk.toPublicKey();

	const legend = {
		[proofsOnlyAddr.toBase58()]: 'proofsOnlyZkApp',
		[secondaryAddr.toBase58()]: 'secondaryZkApp',
		[deployerPubkey.toBase58()]: 'deployer',
	};

	const proofsOnlyInstance = new ProofsOnlyZkApp(proofsOnlyAddr);
	const secondaryInstance = new SecondaryZkApp(secondaryAddr);

	// ----------------------------------------------------

	console.log('creating deploy txn...');
	const deploy_txn = await Mina.transaction(deployerPubkey, () => {
		// AccountUpdate.fundNewAccount(deployerPubkey);
		let feePayerUpdate = AccountUpdate.fundNewAccount(deployerPubkey);
		feePayerUpdate.send({ to: proofsOnlyInstance, amount: 1000000000 });
		proofsOnlyInstance.deploy({ zkappKey: proofsOnlySk });
		secondaryInstance.deploy({ zkappKey: secondarySk });

	});

	log('PROVING...');
	await deploy_txn.prove();
	log('SIGNING...');
	deploy_txn.sign([deployerPrivateKey, proofsOnlySk, secondarySk]);

	// await showTxn(deploy_txn, 'deploy_txn', legend);
	// await saveTxn(deploy_txn, 'deploy_txn', legend, './deploy_txn.png');

	log('SENDING...');
	await deploy_txn.send();

	// ----------------------------------------------------

	console.log('creating init txn1...');
	const txn1 = await Mina.transaction(deployerPubkey, () => {
		console.log('add');
		proofsOnlyInstance.add(Field(4));
	});

	await txn1.prove();

	console.log(txn1, 'txn1', legend);

	await txn1.send();

	// ----------------------------------------------------

	const txn2 = await Mina.transaction(deployerPubkey, () => {
		console.log('callSecondary');
		proofsOnlyInstance.callSecondary(secondaryAddr);
	});

	await txn2.prove();

	console.log(txn2, 'txn2', legend);

	await txn2.send();

	console.log('---------------- END ----------------');
	shutdown();
}

async function proofZkApp2(): Promise<void> {

	const network = Mina.Network('https://proxy.berkeley.minaexplorer.com/graphql');
	Mina.setActiveInstance(network);
	// let Local = Mina.LocalBlockchain();
	// Mina.setActiveInstance(Local);

	let feePayer = PrivateKey.fromBase58(wallets[0].privateKey);
	let initialBalance = 10_000_000;

	let tokenZkAppKey = PrivateKey.random();
	let tokenZkAppAddress = tokenZkAppKey.toPublicKey();

	let zkAppCKey = PrivateKey.random();
	let zkAppCAddress = zkAppCKey.toPublicKey();

	let zkAppBKey = PrivateKey.random();
	let zkAppBAddress = zkAppBKey.toPublicKey();

	let tokenAccount1Key = PrivateKey.fromBase58(wallets[1].privateKey);
	let tokenAccount1 = tokenAccount1Key.toPublicKey();

	let tokenZkApp = new TokenContract(tokenZkAppAddress);
	let tokenId = tokenZkApp.token.id;

	let zkAppB = new ZkAppB(zkAppBAddress, tokenId);
	let zkAppC = new ZkAppC(zkAppCAddress, tokenId);
	let tx;

	console.log('tokenZkAppAddress', tokenZkAppAddress.toBase58());
	console.log('zkAppB', zkAppBAddress.toBase58());
	console.log('zkAppC', zkAppCAddress.toBase58());
	console.log('receiverAddress', tokenAccount1.toBase58());
	console.log('feePayer', feePayer.toPublicKey().toBase58());
	console.log('-------------------------------------------');

	console.log('compile (TokenContract)');
	await TokenContract.compile();
	console.log('compile (ZkAppB)');
	await ZkAppB.compile();
	console.log('compile (ZkAppC)');
	await ZkAppC.compile();

	console.log('deploy tokenZkApp');
	tx = await Mina.transaction(feePayer, () => {
		AccountUpdate.fundNewAccount(feePayer, { initialBalance });
		tokenZkApp.deploy({ zkappKey: tokenZkAppKey });
	});
	await tx.send();

	console.log('deploy zkAppB');
	tx = await Mina.transaction(feePayer, () => {
		AccountUpdate.fundNewAccount(feePayer);
		tokenZkApp.tokenDeploy(zkAppBKey, ZkAppB._verificationKey!);
	});
	console.log('deploy zkAppB (proof)');
	await tx.prove();
	await tx.send();

	console.log('deploy zkAppC');
	tx = await Mina.transaction(feePayer, () => {
		AccountUpdate.fundNewAccount(feePayer);
		tokenZkApp.tokenDeploy(zkAppCKey, ZkAppC._verificationKey!);
	});
	console.log('deploy zkAppC (proof)');
	await tx.prove();
	await tx.send();

	console.log('mint token to zkAppB');
	tx = await Mina.transaction(feePayer, () => {
		tokenZkApp.mint(zkAppBAddress);
	});
	await tx.prove();
	await tx.send();

	console.log('approve send from zkAppB');
	tx = await Mina.transaction(feePayer, () => {
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
	tx = await Mina.transaction(feePayer, () => {
		// Pay for tokenAccount1's account creation
		AccountUpdate.fundNewAccount(feePayer);
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

}

async function proofZkApp3(): Promise<void> {
	const proofsEnabled = true;
	// const Local = Mina.LocalBlockchain({ proofsEnabled });
	// Mina.setActiveInstance(Local);
	const payerKeys = {
		publicKey: PrivateKey.fromBase58(wallets[0].privateKey).toPublicKey(),
		privateKey: PrivateKey.fromBase58(wallets[0].privateKey),
	};
	const network = Mina.Network('https://proxy.berkeley.minaexplorer.com/graphql');
	Mina.setActiveInstance(network);
// ----------------------------------------------------

	const zkAppPrivateKey = PrivateKey.random();
	const zkAppAddress = zkAppPrivateKey.toPublicKey();

	console.log('compiling...');
	console.log('zkpriv', zkAppPrivateKey.toBase58());
	console.log('zkpub', zkAppAddress.toBase58());

	let { verificationKey }: any = await BasicTokenContract.compile();

	console.log('compiled');

// ----------------------------------------------------

	console.log('deploying...');
	const contract = new BasicTokenContract(zkAppAddress);

	log('fetching account...');
	const { account } = await fetchAccount({ publicKey: payerKeys.publicKey }) as { account: Types.Account };

	const payerAccount: any = { sender: payerKeys.publicKey, fee: Number('0.5') * 1e9, nonce: Types.Account.toJSON(account).nonce };
	const deploy_txn = await Mina.transaction(payerAccount, () => {
		AccountUpdate.fundNewAccount(payerKeys.publicKey);
		contract.deploy({ verificationKey, zkappKey: zkAppPrivateKey });
	});
	await deploy_txn.prove();
	await deploy_txn.sign([payerKeys.privateKey]).send();

	console.log('deployed');

// ----------------------------------------------------

	console.log('minting...');

	const mintAmount = UInt64.from(10);
	console.log('mintAmount', mintAmount.toBigInt());

	const mintSignature = Signature.create(
		zkAppPrivateKey,
		mintAmount.toFields().concat(zkAppAddress.toFields()),
	);

	const mint_txn = await Mina.transaction(payerAccount, () => {
		AccountUpdate.fundNewAccount(payerKeys.publicKey);
		contract.mint(zkAppAddress, mintAmount, mintSignature);
	});

	await mint_txn.prove();
	await mint_txn.sign([payerKeys.privateKey]).send();

	console.log('minted');

	console.log(`${contract.totalAmountInCirculation.get()} ${Mina.getAccount(zkAppAddress).tokenSymbol}`);

// ----------------------------------------------------

	console.log('sending...');

	const sendAmount = UInt64.from(3);

	const send_txn = await Mina.transaction(payerAccount, () => {
		AccountUpdate.fundNewAccount(payerKeys.publicKey);
		contract.sendTokens(zkAppAddress, payerKeys.publicKey, sendAmount);
	});
	await send_txn.prove();
	await send_txn.sign([payerKeys.privateKey, zkAppPrivateKey]).send();

	console.log('sent');

	console.log(`${contract.totalAmountInCirculation.get()} ${Mina.getAccount(zkAppAddress).tokenSymbol}`);

// ----------------------------------------------------

	console.log(
		'deployer tokens:',
		Mina.getBalance(payerKeys.publicKey, contract.token.id).value.toBigInt(),
	);

	console.log(
		'zkapp tokens:',
		Mina.getBalance(zkAppAddress, contract.token.id).value.toBigInt(),
	);
}

async function proofZkApp4(): Promise<void> {
	await isReady;

	const MY_ZK_APP_PRIVATE_KEY = 'EKF3KEVsPnRYMEinp9CqLHxK3ydTWq55u2AqDrk2wNipkoJADjRb';

	log('adding account to watch...');
	await getWebnode().watched_accounts().add(wallets[0].publicKey);
	await getWebnode().watched_accounts().add(PrivateKey.fromBase58(MY_ZK_APP_PRIVATE_KEY).toPublicKey().toBase58());
	let gotAccount = await fetchAccount({ publicKey: wallets[0].publicKey });
	console.log('got account', gotAccount);
	log('got account to watch...');

	class SimpleZkapp extends SmartContract {
		@state(Field) x = State<Field>();

		override init() {
			super.init();
			this.x.set(initialState);
		}

		@method update(y: Field) {
			let x = this.x.get();
			this.x.assertEquals(x);
			y.assertGreaterThan(0);
			this.x.set(x.add(y));
		}

		override deploy(args: DeployArgs) {
			super.deploy(args);
			this.account.permissions.set({
				...Permissions.default(),
				setDelegate: Permissions.proof(),
				setPermissions: Permissions.proof(),
				setVerificationKey: Permissions.proof(),
				setZkappUri: Permissions.proof(),
				setTokenSymbol: Permissions.proof(),
				incrementNonce: Permissions.proof(),
				setVotingFor: Permissions.proof(),
				setTiming: Permissions.proof(),
				send: Permissions.proof(),
				editState: Permissions.proof(),
				receive: Permissions.proof(),
				access: Permissions.proof(),
				editActionState: Permissions.proof(),
			});
		}
	}

// you can use this with any spec-compliant graphql endpoint
	let Berkeley = Mina.Network('https://proxy.berkeley.minaexplorer.com/graphql');
	Mina.setActiveInstance(Berkeley);

// to use this test, change this private key to an account which has enough MINA to pay fees
	let feePayerKey = PrivateKey.fromBase58(wallets[0].privateKey);
	let feePayerAddress = feePayerKey.toPublicKey();
	let response = await fetchAccount({ publicKey: feePayerAddress });
	if (response.error) throw Error(response.error.statusText);
	let { nonce, balance } = response.account;
	console.log(`Using fee payer account with nonce ${nonce}, balance ${balance}`);

// this used to be an actual zkapp that was deployed and updated with this script:
// https://berkeley.minaexplorer.com/wallet/B62qpRzFVjd56FiHnNfxokVbcHMQLT119My1FEdSq8ss7KomLiSZcan
// replace this with a new zkapp key if you want to deploy another zkapp
// and please never expose actual private keys in public code repositories like this!
	let zkappKey = PrivateKey.fromBase58(MY_ZK_APP_PRIVATE_KEY);
	let zkappAddress = zkappKey.toPublicKey();

	let transactionFee = Number('0.9') * 1e9;
	let initialState = Field(1);

// compile the SmartContract to get the verification key (if deploying) or cache the provers (if updating)
// this can take a while...
	console.log('Compiling smart contract...');
	let { verificationKey } = await SimpleZkapp.compile();

// check if the zkapp is already deployed, based on whether the account exists and its first zkapp state is !== 0
	let zkapp = new SimpleZkapp(zkappAddress);
	let x = await zkapp.x.fetch();
	let isDeployed = x?.equals(0).not().toBoolean() ?? false;

// if the zkapp is not deployed yet, create a deploy transaction
	if (!isDeployed) {
		console.log(`Deploying zkapp for public key ${zkappAddress.toBase58()}.`);
		// the `transaction()` interface is the same as when testing with a local blockchain
		let transaction = await Mina.transaction(
			{ sender: feePayerAddress, fee: transactionFee },
			() => {
				AccountUpdate.fundNewAccount(feePayerAddress);
				zkapp.deploy({ verificationKey });
			},
		);
		// if you want to inspect the transaction, you can print it out:
		// console.log(transaction.toGraphqlQuery());

		// send the transaction to the graphql endpoint
		console.log('Sending the transaction...');
		await transaction.sign([feePayerKey, zkappKey]).send();
	}

// if the zkapp is deployed, create an update transaction
	if (isDeployed) {
		let x = zkapp.x.get();
		console.log(`Found deployed zkapp, updating state ${x} -> ${x.add(10)}.`);
		let transaction = await Mina.transaction(
			{ sender: feePayerAddress, fee: transactionFee },
			() => {
				zkapp.update(Field(10));
			},
		);
		// fill in the proof - this can take a while...
		console.log('Creating an execution proof...');
		await transaction.prove();

		// if you want to inspect the transaction, you can print it out:
		// console.log(transaction.toGraphqlQuery());

		// send the transaction to the graphql endpoint
		console.log('Sending the transaction...');
		await transaction.sign([feePayerKey]).send();
	}

	shutdown();
}