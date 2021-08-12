
type ChartInitOpts = {
    width?: number,
    height?: number
}

export function init(
    dom: HTMLElement,
    // theme?: string | object,
    opts?: ChartInitOpts
){
    if (!dom) {
        throw new Error('Initialize failed: invalid dom.');
    }
    // const existInstance = getInstanceByDom(dom);

}