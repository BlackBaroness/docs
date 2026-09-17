import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import legacyRedirects from '../data/legacy-redirects.mjs';

export default function legacyRedirectFiles() {
	return {
		name: 'legacy-redirect-files',
		hooks: {
			'astro:build:done': async ({ dir, logger }) => {
				const outputRoot = fileURLToPath(dir);

				for (const legacyPath of Object.keys(legacyRedirects)) {
					if (!legacyPath.endsWith('.html')) continue;

					const outputPath = join(outputRoot, 'pages', 'baronessauth', legacyPath);
					const generatedPath = join(outputPath, 'index.html');
					const redirectDocument = await readFile(generatedPath);

					await rm(outputPath, { recursive: true });
					await mkdir(dirname(outputPath), { recursive: true });
					await writeFile(outputPath, redirectDocument);
				}

				logger.info(`Created ${Object.keys(legacyRedirects).length} legacy redirect files.`);
			},
		},
	};
}
