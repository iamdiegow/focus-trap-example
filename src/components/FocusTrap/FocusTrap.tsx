import React from "react";

const focusableElements = [
	"a[href]",
	"button",
	"input",
	"textarea",
	"select",
	"details",
	'[tabindex]:not([tabindex="-1"])',
];

type FocusTrapProps = {
	children: React.ReactElement | React.ReactElement[];
};

function focusRef(ref: React.RefObject<HTMLElement>) {
	if (ref.current) {
		ref.current.focus();
	}
}

function hasTabIndex(el: HTMLElement) {
	const tabIndex = el.getAttribute("tabindex");
	if (tabIndex && tabIndex !== "-1") return true;
	return false;
}

export const FocusTrap = ({ children }: FocusTrapProps) => {
	const childrenCount = React.Children.count(children);

	const refs = [...Array(childrenCount)].map((child) =>
		React.createRef<HTMLElement>()
	);

	function handleKeyDown(e: React.KeyboardEvent<HTMLElement>) {
		e.preventDefault();

		const focusableRefs = refs.filter((ref) => {
			if (!ref.current) {
				return false;
			}

			return (
				focusableElements.includes(ref.current.localName) ||
				hasTabIndex(ref.current)
			);
		});

		const activeElementIndex = focusableRefs.findIndex(
			(focusableRef) => focusableRef.current === document.activeElement
		);

		if (e.key === "Tab") {
			const next = activeElementIndex + 1;
			if (focusableRefs[next]) {
				focusRef(focusableRefs[next]);
			} else {
				focusRef(focusableRefs[0]);
			}
		}

		if (e.shiftKey && e.key === "Tab") {
			const previous = activeElementIndex - 1;
			if (focusableRefs[previous]) {
				focusRef(focusableRefs[previous]);
			} else {
				focusRef(focusableRefs[focusableRefs.length - 1]);
			}
		}
	}

	return (
		<div onKeyDown={handleKeyDown}>
			{React.Children.map(children, (child, i) => {
				return React.cloneElement(child, { ref: refs[i], ...child.props });
			})}
		</div>
	);
};
