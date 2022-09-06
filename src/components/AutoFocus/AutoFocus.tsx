import React from "react";

type AutoFocusProps = {
	children: React.ReactElement;
};

export const AutoFocus = React.forwardRef<HTMLElement, AutoFocusProps>(
	({ children }, ref) => {
		const internalRef = React.useRef<HTMLElement>(null);

		React.useImperativeHandle<HTMLElement | null, HTMLElement | null>(
			ref,
			() => {
				return internalRef.current;
			}
		);

		React.useEffect(() => {
			if (internalRef.current) {
				internalRef.current.focus();
			}
		});

		return (
			<>
				{React.Children.map(children, (child, i) => {
					return React.cloneElement(child, {
						ref: internalRef,
						...child.props,
					});
				})}
			</>
		);
	}
);
