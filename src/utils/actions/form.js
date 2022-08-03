import { invalidate } from '$app/navigation';

/** Enhances a form and make it able to work without JavaScript
 * @param {HTMLFormElement} form 
 * @param {{
	done?: Function,
	error?: Function
 }} param1
 
 */
export const enhance = (form, {done, error } = {}) => {
	
	/** The function which handles the form
	 * @param {FormDataEvent} event
	 */
	const handleForm = async (event) => {
		event.preventDefault();
		try {
			let request = await fetch(form.action, {
				method: form.method,
				headers: {
					accept: 'application/json'
				},
				body: new FormData(form)
			});
			if (request.ok) {
				done?.(form,request, new FormData(form));
				invalidate(form.action);
			} else {
				error?.(form,request, new FormData(form));
			}
		} 
		catch (/** @type {*} */error) {
			error(form,error, new FormData(form));
		}
	};

	//@ts-ignorew
	form.addEventListener('submit', handleForm);

	return {
		destroy() {
			//@ts-ignore
			form.removeEventListener('submit', handleForm);
		}
	};
};
