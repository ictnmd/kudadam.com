import ImageKit from "imagekit-javascript";

const imagekit = (src, config) => {
	let url = new URL(src);
	const transformer = new ImageKit({
		urlEndpoint: "https://ik.imagekit.io/kudadam"
	});
	let image;
	if (url.host !== "ik.imagekit.io") return src;

	image = transformer.url({
		src: src,
		transformation: [{ ...config }]
	});
	return image;
};

export default imagekit;
