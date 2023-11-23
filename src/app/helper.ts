import { WindowWebnode } from '../types/window-webnode.type';

export function getWindowWebnode(): WindowWebnode {
	return (window as any).webnode;
}

export function getWebnode(): WindowWebnode['webnode'] {
	return getWindowWebnode().webnode;
}

export function getWasm(): WindowWebnode['wasm'] {
	return getWindowWebnode().wasm;
}

export function log(value: string) {
	const elementById = document.getElementsByClassName('logs')[0];
	elementById.innerHTML = value;
}