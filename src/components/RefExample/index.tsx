import React from "react";
import { FocusTrap } from "../FocusTrap";
import { AutoFocus } from "../AutoFocus";

export const RefExample = () => {
	return (
		<div>
			<FocusTrap>
				<input type="text" placeholder="my input" />
				<button>button1</button>
				<AutoFocus>
					<button>button2</button>
				</AutoFocus>
				<div tabIndex={0}>test</div>
				<div>should not focus</div>
				<input type="text" placeholder="my focusable input" />
			</FocusTrap>
		</div>
	);
};
