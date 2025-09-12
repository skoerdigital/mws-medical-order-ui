import { setRemoteDefinitions } from '@nx/angular/mf';

export const loadManifest = async (manifestUrl: string): Promise<void> => {
	const result = (await fetch(manifestUrl)).json();

	return result.then((definitions) =>
		setRemoteDefinitions(
			Object.fromEntries(
				Object.keys(definitions).map((key) => [
					key,
					definitions[key].remoteUrl,
				]),
			),
		),
	);
};
