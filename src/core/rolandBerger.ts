
import * as utils from '../util';

import { Margin, RBcolor, RBOption } from '../util/types';

import Model from '../model';

type ChartInitOpts = {
    size?: number
}

interface RolandBergerOpts extends ChartInitOpts  {
    id: string
}

const defaultColor: RBcolor = {
    pos: { r: 255, g: 0, b: 0 },
    neg: { r: 0, g: 0, b: 255 }
}

const defaultMargin: Margin = { top: 20, right: 20, bottom: 20, left: 20 };
 
class RolandBerger {
    id: string = '';
    private _dom: HTMLElement;
    private _opts: RolandBergerOpts;
    private _model!: Model;

    constructor(
        dom: HTMLElement,
        opts: RolandBergerOpts
    ){
        this._opts = opts;
        this._dom = dom;
    }

    getDom() {
        return this._dom;
    }

    getOptions() {
        return this._opts
    }

    setOption(option: RBOption) {
        if (!this._model) {
            const _opt: Required<RBOption> = {
                ...option, 
                id: this._opts.id, 
                width: this._opts.size || 512, 
                height: this._opts.size || 512,
                color: option.color ?? defaultColor,
                margin: option.margin ?? defaultMargin,
                threshold: option.threshold ?? 0.5,
                rangeRatio: option.rangeRatio ?? 0.2
            }
            this._model = new Model(_opt);
        }

        this._model.drawWord();
        this._model.drawHeatmap();
    }

}


const instances: {[id: string]: RolandBerger} = {};
const DOM_ATTRIBUTE_KEY = '_rolandBerger_instance_';
let idBase: number = +(new Date()) - 0;


export function getInstanceByDom(dom: HTMLElement): RolandBergerType {
    return instances[utils.getAttribute(dom, DOM_ATTRIBUTE_KEY)];
}

export function init(
    dom: HTMLElement,
    opts?: ChartInitOpts
): RolandBergerType {
    if (!dom) {
        throw new Error('Initialize failed: invalid dom.');
    }
    const existInstance = getInstanceByDom(dom);
    if (existInstance) {
        console.warn('There is a chart instance already initialized on the dom.');
        return existInstance;
    }
    const _chartId = `rolandBerger_${idBase++}`;
    const chart = new RolandBerger(dom, {...opts, id: _chartId});
    chart.id = _chartId
    instances[chart.id] = chart;

    utils.setAttribute(dom, DOM_ATTRIBUTE_KEY, chart.id);
    return chart;

}

export interface RolandBergerType extends RolandBerger {}
