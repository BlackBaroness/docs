export default function moreDirective() {
	return {
		name: 'more-directive',
		containerDirective(node) {
			if (node.name !== 'more') return;

			const [label, ...children] = node.children;
			if (!label?.data?.directiveLabel) {
				throw new Error('Directive `more` requires a label: :::more[Short summary]');
			}

			return element('details', { class: 'more-details' }, [
				element('summary', {}, label.children),
				element('div', { class: 'more-details-content' }, children),
			]);
		},
	};
}

function element(hName, hProperties, children) {
	return {
		type: hName === 'summary' ? 'paragraph' : 'blockquote',
		data: { hName, hProperties },
		children,
	};
}
