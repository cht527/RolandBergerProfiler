/*
 * Original code by jdk137
 * https://github.com/jdk137/RolandBergerProfiler/blob/master/js/profiler.js
*/
import * as d3 from 'd3';
import {RBOption, RBdata} from '../util/types';
import {getArea} from '../util'


class Model{ 
    
    options: Required<RBOption> & {id : string};

    private _w: number = 0;

    private _h: number = 0;

    private _data: RBdata[] = [];

    private _container!: HTMLElement;

    private _canvas!: HTMLCanvasElement; 

    constructor(opt: Required<RBOption> & {id : string}){
        this.options = opt;
        this.init()
    }

    init(){
        const { width, height, margin, threshold} = this.options;
        this._w = width - margin.left - margin.right;
        this._h = height - margin.top - margin.bottom;
        // dataProcess        
        this._data = this.options.data.map(d => ({
            ...d,
            x: d.x * this._w,
            y: d.y * this._h,
            value: d.value - threshold
        }));
        this._container = document.getElementById(this.options.id) as HTMLElement; // id or dom node

        this._container.style.width = `${width}px`;
        this._container.style.height = `${height}px`;
        this._container.style.position = 'relative';

        this._canvas = document.getElementById(`${this.options.id}_canvas`) as HTMLCanvasElement;

        this.drawWord();
        this.prepareData();
    }

   
    getWeight(x1:number, y1:number, x2:number, y2:number, range:number) {
        return Math.pow(Math.E, -0.5 * (Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)) / range / range);
    }

    draw(data:number[], max: number){
     
        if (this._canvas) {
            this._container.removeChild(this._canvas);
        }
        this._canvas = document.createElement('canvas') as HTMLCanvasElement;
        const currentCtx = this._canvas.getContext('2d') as CanvasRenderingContext2D;
        this._canvas.id = `${this.options.id}_canvas`;
        this._canvas.style.cssText = 'position:absolute;top:20px;left:20px;';
        this._container.appendChild(this._canvas);

        const tempCanvas = document.createElement('canvas') as HTMLCanvasElement;
        const tempCtx = tempCanvas.getContext('2d') as CanvasRenderingContext2D;
        const width = this._w;
        const height = this._h;

       
        this._canvas.width = tempCanvas.width = width;
        this._canvas.height = tempCanvas.height = height;
        
        tempCtx.clearRect(0,0,width,height);
        let imageData = tempCtx.getImageData(0,0,width,height),
            pix = imageData.data;

        const {pos, neg} = this.options.color;
        const { r:pos_r, g:pos_g, b:pos_b } = pos;
        const { r:neg_r, g:neg_g, b:neg_b } = neg;
    
        for (let i = 0, n = pix.length; i <n; i += 4) {
            let value = data[Math.floor(i / 4)];
            if (value < 0) {
                pix[i] = pos_r;
                pix[i + 1] = pos_g;
                pix[i + 2] = pos_b;
                pix[i + 3] = Math.round(Math.floor(Math.abs(value) / max / 0.1) * 0.1 * 255);
            } else {
                pix[i] = neg_r;
                pix[i + 1] = neg_g;
                pix[i + 2] = neg_b;
                pix[i + 3] = Math.round(Math.floor(Math.abs(value) / max / 0.1) * 0.1 * 255);
            }

        }

        if (currentCtx) {
            currentCtx.putImageData(imageData, 0, 0);
        }
    }

    prepareData() {
        const width = this._w;
        const height = this._h;

        const points = this._data.slice();

        let data:number[] = []; // width * height
        
        let max = 0;
        let rangeSize = this.options.rangeRatio * Math.min(width, height);
        for (let i = 0, l = width * height; i < l; i++) {
            let w = i % width;
            let h = Math.floor(i / width);
            let sum = 0;
            points.forEach(p=> {
                let range = rangeSize * p.value;
                let weight = this.getWeight(w, h, p.x, p.y, range);
                sum += weight * p.value;
            });
            data[i] = sum;
            if (Math.abs(sum) > max) {
                max = Math.abs(sum);
            }
        };

        this.draw(data, max)

    }

    drawWord() {
        const { margin, id } = this.options;
        const _width = this._w;
        const _height = this._h;
        d3.select(this._container)
        .selectAll('svg')
        .remove();
        const svg = d3
            .select(this._container)
            .append('svg')
            .attr('width', _width + margin.left + margin.right)
            .attr('height', _height + margin.top + margin.bottom)
            .attr('style', 'position:absolute;z-index:50;')
            .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
         // line
         const lineData = [
            {
                x1: 0,
                y1: _height / 2,
                x2: _width,
                y2: _height / 2
            },
            {
                x1: _width / 2,
                y1: 0,
                x2: _width / 2,
                y2: _height
            }
        ];
        lineData.forEach(item => {
            svg.append('line')
                .attr('x1', item.x1)
                .attr('y1', item.y1)
                .attr('x2', item.x2)
                .attr('y2', item.y2)
                .attr('stroke', '#E4E9EDFF')
                .attr('stroke-width', '1px');
        });

        // words
        
        svg.selectAll(`.tag-name-${id}`)
            .data(this._data)
            .enter()
            .append('text')
            .attr('class', `tag-name-${id}`)
            .attr('x', d=> d.x)
            .attr('y', d=> d.y)
            .attr('dominant-baseline', 'central')
            .attr('text-anchor', 'middle')
            .attr('data', d => d.name)
            .style('cursor', 'pointer')
            .style('fill', '#333')
            .text(d => d.name)
            .style('font-size', '14px');
        svg.append('rect')
            .attr('fill', 'none')
            .attr('stroke', '#E4E9ED')
            .attr('width', _width)
            .attr('height', _height);
        
        // area words

        const orient = getArea(_width,_height);

        const areaList = [
            {
                x: 10,
                y: 20,
                text: '简约感性区',
            },
            {
                x: _width - 90,
                y: 20,
                text: '消费升级区',
            },
            {
                x: 10,
                y: _height - 10,
                text: '价格敏感区',
            },
            {
                x: _width - 90,
                y: _height - 10,
                text: '体验理性区',
            },
        ]

        svg.selectAll('.title')
            .data(orient)
            .enter()
            .append('rect')
            .attr('class', 'title')
            .attr('fill', '#fff')
            .attr('width', d => d.width)
            .attr('height',  d => d.height)
            .attr('stroke', '#E4E9ED')
            .attr('x', d => d.x - d.width / 2)
            .attr('y', d=> d.y - d.height / 2)
            .attr('rx', 4)
            .attr('ry', 4);
        svg.selectAll('.area')
            .data(areaList)
            .enter()
            .append('text')
            .attr('class', 'area')
            .attr('x', d=> d.x)
            .attr('y', d=> d.y)
            .style('fill', '#A0A6AE')
            .text(d=> d.text);
        svg.selectAll('.orient')
            .data(orient)
            .enter()
            .append('text')
            .attr('class', 'orient')
            .attr('x', d=> d.x)
            .attr('y', d=> d.y)
            .attr('dominant-baseline', 'central')
            .attr('text-anchor', 'middle')
            .style('font-size', '12px')
            .style('fill', '#666')
            .style('font-family', 'monospace')
            // .style('writing-mode', function (d) { return d.writingMode })
            .text(d=> d.text);

    }

   
}


export default Model

