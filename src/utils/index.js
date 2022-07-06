import readingTime from "./reading-time.js";

export { readingTime };
export const chunk = (collection, size) => {
	var result = [];
	size = parseInt(size) || 2;

	for (var x = 0; x < Math.ceil(collection.length / size); x++) {
		var start = x * size;
		var end = start + size;

		result.push(collection.slice(start, end));
	}
	return result;
};

export const snakeCase = (str) =>
	str &&
	str
		.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
		.map((x) => x.toLowerCase())
		.join("_");

export const importScripts = (url, object) => {
	return new Promise((resolve, reject) => {
		let script = document.querySelector(`script[src="${url}"]`);
		if (!script) {
			script = document.createElement("script");
			script.setAttribute("src", url);
			for (let obj in object) {
				script.setAttribute(obj, object[obj]);
			}
			script.addEventListener("load", () => {
				resolve(true);
			});
			script.addEventListener("onerror", (err) => {
				reject(err);
			});
			document.querySelector("head").appendChild(script);
		}
	});
};

export const importLinks = (url, options = {}) => {
	return new Promise((resolve, reject) => {
		let link = document.querySelector(`link[href="${url}"]`);
		if (!link) {
			link = document.createElement("link");
			for (let option in options) {
				link.setAttribute(option, options[option]);
			}
			link.onload = resolve(true);
			link.setAttribute("href", url);
			document.querySelector("head").appendChild(link);
		}
		reject("already exists");
	});
};

export const includesMany = (arr, values) => {
	return values.every((value) => {
		return arr.includes(value);
	});
};

export const encodeHtml = (string) => {
	return string.replace(/[\u00A0-\u9999<>\&]/g, function (i) {
		return "&#" + i.charCodeAt(0) + ";";
	});
};

export function debounce(func, wait, immediate) {
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
