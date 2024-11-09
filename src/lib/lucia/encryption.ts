import { decodeBase64 } from '@oslojs/encoding';
import { createCipheriv, createDecipheriv } from 'crypto';
import { DynamicBuffer } from '@oslojs/binary';

import { ENCRYPTION_KEY } from '$env/static/private';

const key = decodeBase64(ENCRYPTION_KEY);

export function encrypt(data: Uint8Array): Uint8Array {
	const iv = new Uint8Array(16);
	crypto.getRandomValues(iv);
	const cipher = createCipheriv('aes-128-gcm', key, iv);
	const encrypted = new DynamicBuffer(0);
	encrypted.write(iv);
	encrypted.write(cipher.update(data));
	encrypted.write(cipher.final());
	encrypted.write(cipher.getAuthTag());
	return encrypted.bytes();
}

export function encryptString(data: string): Uint8Array {
	return encrypt(new TextEncoder().encode(data));
}

export function decrypt(encrypted: string | Uint8Array): Uint8Array {
	// Si les données sont une chaîne de caractères, les décoder en Uint8Array
	if (typeof encrypted === 'string') {
		console.log('Décodage de la chaîne Base64 en Uint8Array');
		encrypted = decodeBase64(encrypted);
	}

	console.log('Données chiffrées reçues:', encrypted);
	console.log('Longueur des données chiffrées:', encrypted.byteLength);

	if (encrypted.byteLength < 32) {
		throw new Error('Invalid data: Insufficient length');
	}

	const iv = encrypted.slice(0, 16);
	const tag = encrypted.slice(encrypted.byteLength - 16);
	const ciphertext = encrypted.slice(16, encrypted.byteLength - 16);

	console.log('IV:', iv);
	console.log('Tag:', tag);
	console.log('Longueur du tag:', tag.byteLength);
	console.log('Texte chiffré:', ciphertext);

	const decipher = createDecipheriv('aes-128-gcm', key, iv);

	if (tag.byteLength !== 16) {
		throw new Error(`Invalid Auth Tag length: ${tag.byteLength}`);
	}

	decipher.setAuthTag(tag);

	const decrypted = new DynamicBuffer(0);
	decrypted.write(decipher.update(ciphertext));
	decrypted.write(decipher.final());
	return decrypted.bytes();
}

export function decryptToString(data: Uint8Array): string {
	return new TextDecoder().decode(decrypt(data));
}
