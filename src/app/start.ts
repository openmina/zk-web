import { isReady, Mina, setWebnode } from 'o1js';
import { WindowWebnode } from '../types/window-webnode.type';
import { getWasm, getWebnode, log } from './helper';
import base from 'base-x';

document.getElementById('start')?.addEventListener('click', async () => {
	await loadO1js();
	await loadWebnode();
	setWebnode(getWebnode());
	log('o1js and webnode are loaded!');
});

async function loadO1js() {
	log('load o1js...');
	await isReady;
}

async function loadWebnode() {
	const basex = base('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz');
	(window as any)['bs58btc'] = {
		encode: (buffer: Uint8Array | number[]) => 'z' + basex.encode(buffer),
		decode: (string: string) => basex.decode(string.substring(1)),
	};

	log('start webnode...');

	const wasm: WindowWebnode['wasm'] = getWasm();

	await wasm.default('webnode/mina-rust/wasm_bg.wasm')

	const fetchBytes = (url: string) => fetch(url)
		.then((resp: Response) => resp.arrayBuffer())
		.then((buf: ArrayBuffer) => new Uint8Array(buf));

	const block_verifier_index = fetchBytes('webnode/block_verifier_index.bin');
	const block_verifier_srs = fetchBytes('webnode/block_verifier_srs.bin');
	const config = new wasm.WasmConfig();
	config.set_block_verifier_index(block_verifier_index);
	config.set_block_verifier_srs(block_verifier_srs);

	(window as any).webnode.webnode = await wasm.start(config);
}