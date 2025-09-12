export interface DictionaryEntry {
	code: string;
	description: string;
}

export interface Dictionary {
	entries: DictionaryEntry[];
}
