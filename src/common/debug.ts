const variants = {
	error: "color: red",
	warning: "color: orange",
	success: "color: green",
	info: "color: blue",
}

export const consoleLog = ( message: any, optionalParams: any, variant?: string): void => {
	if (process.env.NODE_ENV !== 'production') {
		switch (variant) {
			case "error":
				console.error(message, optionalParams);
				break;
			case "warning":
				console.warn(message, optionalParams);
				break;
			case "info":
				console.info(message, optionalParams);
				break;
			case "success":
				console.log(message, optionalParams);
				break;
			default:
				console.log(message, optionalParams);
				break;
		}
	}
}
