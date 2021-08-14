
export type RBdata = {
    id: number,
    name: string;
    value: number;
    x: number;
    y: number;
}

export type RGB = {
    r: number;
    g: number;
    b: number;
};

export type RBcolor = {
    pos: RGB;
    neg: RGB;
};

export type Margin  = { top: number, right: number, bottom: number, left: number };


export type RBOption = {
    id: string;
    data: RBdata[],
    threshold?:number, 
    rangeRatio?: number,
    width?: number,
    height?: number,
    color?: RBcolor,
    margin?: Margin
} 

