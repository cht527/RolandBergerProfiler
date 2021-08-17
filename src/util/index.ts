export function getAttribute(dom: HTMLElement, key: string): any {
	return dom.getAttribute ? dom.getAttribute(key) : (dom as any)[key];
}

export function setAttribute(dom: HTMLElement, key: string, value: any) {
	dom.setAttribute ? dom.setAttribute(key, value) : ((dom as any)[key] = value);
}

// area words
export const getArea = (width: number, height: number) => [
	{
		x: 0,
		y: height / 2 + 1,
		text: '-',
		width: 26,
		height: 26,
		// writingMode: 'tb-rl'
	},
	{
		x: width,
		y: height / 2 + 1,
		text: '+',
		width: 26,
		height: 26,
		// writingMode: 'tb-rl'
	},
	{
		x: width / 2,
		y: 0,
		text: 'E',
		width: 26,
		height: 26,
		// writingMode: 'horizontal-tb'
	},
	{
		x: width / 2,
		y: height,
		text: 'R',
		width: 26,
		height: 26,
		// writingMode: 'horizontal-tb'
	},
];
