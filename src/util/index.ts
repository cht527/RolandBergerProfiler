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
		text: '消费-',
		width: 40,
		height: 26,
		// writingMode: 'tb-rl'
	},
	{
		x: width,
		y: height / 2 + 1,
		text: '消费+',
		width: 40,
		height: 26,
		// writingMode: 'tb-rl'
	},
	{
		x: width / 2,
		y: 0,
		text: 'E 感性需求',
		width: 80,
		height: 26,
		// writingMode: 'horizontal-tb'
	},
	{
		x: width / 2,
		y: height,
		text: 'R 理性需求',
		width: 80,
		height: 26,
		// writingMode: 'horizontal-tb'
	},
];
