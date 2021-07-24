export function randomNumber(min: number, max: number): number{
	return Math.floor(Math.random() * max) + min;
}
export function randomString(length: number): string{
	const chars = 'abcdefghijklmnpoqrstuvwxyzABCDEFGHIJKLMNPOQRSTUVWXYZ';
	return new Array(length).fill(null).map(() => chars.charAt(randomNumber(0, chars.length))).join('');
}

