import { decodeBase64 } from '@oslojs/encoding';
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';
import { ENCRYPTION_KEY } from '$env/static/private';

const key = decodeBase64(ENCRYPTION_KEY);

// Fonction utilitaire pour valider une chaîne Base64
function isValidBase64(str: string): boolean {
	return /^[A-Za-z0-9+/]+={0,2}$/.test(str);
}

export function encrypt(data: Uint8Array): Uint8Array {
	const iv = randomBytes(16);
	const cipher = createCipheriv('aes-128-gcm', key, iv);
	const ciphertext = Buffer.concat([cipher.update(data), cipher.final()]);
	const tag = cipher.getAuthTag();

	// Concaténer IV, texte chiffré et tag
	return Buffer.concat([iv, ciphertext, tag]);
}

export function encryptString(data: string): Uint8Array {
	return encrypt(Buffer.from(data, 'utf-8'));
}

export function decrypt(encrypted: string | Uint8Array): Uint8Array {
	// Si les données sont une chaîne de caractères, les décoder en Uint8Array
	if (typeof encrypted === 'string') {
		// Valider la chaîne Base64
		if (!isValidBase64(encrypted)) {
			throw new Error('Invalid Base64 string');
		}

		try {
			encrypted = decodeBase64(encrypted);
		} catch (error) {
			throw new Error(`Erreur lors du décodage Base64 : ${error.message}`);
		}
	}

	if (encrypted.byteLength < 32) {
		throw new Error('Invalid data: Insufficient length');
	}

	const iv = encrypted.slice(0, 16);
	const tag = encrypted.slice(encrypted.byteLength - 16);
	const ciphertext = encrypted.slice(16, encrypted.byteLength - 16);

	const decipher = createDecipheriv('aes-128-gcm', key, iv);

	if (tag.byteLength !== 16) {
		throw new Error(`Invalid Auth Tag length: ${tag.byteLength}`);
	}

	decipher.setAuthTag(tag);

	try {
		const decrypted = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
		return decrypted;
	} catch (error) {
		throw new Error(`Erreur lors du déchiffrement : ${error.message}`);
	}
}

export function decryptToString(data: Uint8Array): string {
	return Buffer.from(decrypt(data)).toString('utf-8');
}
