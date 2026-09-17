import { readFileSync } from 'node:fs';
import { basename, dirname, extname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const importPattern = /^<<<\s+(.+?)\s*$/;

export default function codeImport(document) {
	if (!document.fileURL || !document.source.includes('<<<')) return;

	const sourceDirectory = dirname(fileURLToPath(document.fileURL));

	return {
		name: 'code-import',
		paragraph(node) {
			if (node.children.length !== 1 || node.children[0]?.type !== 'text') return;

			const match = importPattern.exec(node.children[0].value);
			if (!match) return;

			const filePath = resolve(sourceDirectory, match[1]);
			const fileName = basename(filePath);

			return {
				type: 'code',
				lang: extname(fileName).slice(1),
				meta: `title="${fileName}"`,
				value: readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n').trimEnd(),
			};
		},
	};
}
