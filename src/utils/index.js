import readingTime from './reading-time.js';

export { readingTime };

/** Takes an array and split it into chunks
 * @param {Array<any>} collection - The array to be splitted
 * @param {Number} size - The number of values in each chunk
 * @returns {Array<any>} result Returns a new array splitted in chunks
 */
export const chunk = (collection, size) => {
	var result = [];
	size = size || 2;

	for (var x = 0; x < Math.ceil(collection.length / size); x++) {
		var start = x * size;
		var end = start + size;

		result.push(collection.slice(start, end));
	}
	return result;
};

/** Takes a string and converts it into snakecase 
 * @param {String} str - The string to be converted
 * @returns {String} 
 */
export const snakeCase = (str) => {
	let snakecase = 
	str &&
	str
		.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
		?.map((x) => x.toLowerCase())
		.join('_');
	return snakecase || str;
}

export const importScripts = (url, object) => {
	return new Promise((resolve, reject) => {
		let script = document.querySelector(`script[src="${url}"]`);
		if (!script) {
			script = document.createElement('script');
			script.setAttribute('src', url);
			for (let obj in object) {
				script.setAttribute(obj, object[obj]);
			}
			script.addEventListener('load', () => {
				resolve(true);
			});
			script.addEventListener('onerror', (err) => {
				reject(err);
			});
			document.querySelector('head').appendChild(script);
		}
	});
};

export const importLinks = (url, options = {}) => {
	return new Promise((resolve, reject) => {
		let link = document.querySelector(`link[href="${url}"]`);
		if (!link) {
			link = document.createElement('link');
			for (let option in options) {
				link.setAttribute(option, options[option]);
			}
			link.onload = resolve(true);
			link.setAttribute('href', url);
			document.querySelector('head').appendChild(link);
		}
		reject('already exists');
	});
};

export const includesMany = (arr, values) => {
	return values.every((value) => {
		return arr.includes(value);
	});
};

/** Takes a string of HTML and make it safe to be rendered
 * @param {String} string - The string to be encoded 
 * @returns {String} the encoded string
 */
export const encodeHtml = (string) => {
	return string.replace(/[\u00A0-\u9999<>\&]/g, function (i) {
		return '&#' + i.charCodeAt(0) + ';';
	});
};

/** A debounce function takes a function and restricts its calling multiple times
 * @param {Function} func - The function which is to be debounced
 * @param {Number} wait - The number of milliseconds to wait 
 * @param {Boolean} immediate - Set to true to immediately execute the function 
 * @returns 
 */
export function debounce(func, wait, immediate) {
	/**@type {NodeJS.Timeout} */
	let timeout;
	return () => {
		let context = this;
		let args = arguments;

		const later = () => {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};

		let callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}
