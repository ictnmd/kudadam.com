const lazyLoad = () => {
	let leaving = false;
	let observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			let element = entry.target;
			if (entry.isIntersecting) {
				leaving = true;
				element.setAttribute("src", element.getAttribute("data-src"));
				element.removeAttribute("data-src");
				element.removeAttribute("data-lazy-load");
				observer.unobserve(element);
			} else if (leaving) {
				leaving = false;
			}
		});
	});

	const images = document.querySelectorAll("img[data-lazy-load]");
	images.forEach( image => {
		observer.observe(image);
	});
};

export default lazyLoad;
