/**
 * Recursively removes properties with empty string values from an object
 * @param obj - The object to clean
 * @returns A new object with empty string properties removed
 */
export const removeEmptyStringProperties = <T>(obj: T): T => {
	if (obj === null || obj === undefined) {
		return obj;
	}

	// Handle arrays
	if (Array.isArray(obj)) {
		return obj
			.map(item => removeEmptyStringProperties(item))
			.filter(item => item !== undefined) as T;
	}

	// Handle primitive types
	if (typeof obj !== 'object' || obj instanceof Date) {
		return obj;
	}

	// Handle objects
	const cleaned: any = {};
	
	for (const [key, value] of Object.entries(obj)) {
		// Skip properties with empty string values
		if (value === '') {
			continue;
		}

		// Recursively clean nested objects/arrays
		const cleanedValue = removeEmptyStringProperties(value);
		
		// Only add the property if the cleaned value is not undefined
		// and for objects, only if they have at least one property
		if (cleanedValue !== undefined) {
			if (typeof cleanedValue === 'object' && 
				cleanedValue !== null && 
				!Array.isArray(cleanedValue) && 
				!(cleanedValue instanceof Date) &&
				Object.keys(cleanedValue).length === 0) {
				// Skip empty objects
				continue;
			}
			cleaned[key] = cleanedValue;
		}
	}

	return cleaned as T;
};
