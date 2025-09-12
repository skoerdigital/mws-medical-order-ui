export const getObjectForHttpParams = (
	obj: object,
	parentKey = '',
	result: Record<string, string | number | boolean | []> = {},
): Record<string, string | number | boolean | []> => {
	for (const key in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, key)) {
			const newKey = parentKey ? `${parentKey}.${key}` : key;
			const value = obj[key as keyof typeof obj];

			if (value && typeof value === 'object' && !Array.isArray(value)) {
				getObjectForHttpParams(value as any, newKey, result);
			} else {
				Object.assign(result, value !== undefined ? { [newKey]: value } : {});
			}
		}
	}
	return result;
};
