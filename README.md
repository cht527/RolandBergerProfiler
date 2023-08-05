RolandBerger Profiler 罗兰贝格消费者价值元素分布图
==
<div align="center">

![Language](https://img.shields.io/badge/language-typescript-blue)
![NPM version](https://img.shields.io/npm/v/rolandbergerprofiler?color=fd9a16)
![Gzip size](https://img.badgesize.io/https:/unpkg.com/rolandbergerprofiler/dist/index.min.js?label=gzip%20size&compression=gzip)
![GitHub](https://img.shields.io/npm/l/rolandbergerprofiler)



</div>



### 一、基本概念
透视消费者价值观念
> 每个人的内心世界往往都十分错综复杂，其“价值体系”往往又十分抽象。因此，要分析消费者价值体系，就必须对消费者的价值体系进行具体化、形象化的描绘，并形成一种独特的“语言符号”来解读消费者。消费者的价值体系可以分解为若干个基本的价值需求元素，这些价值需求元素之间的不同组合便构成了消费者各不相同的价值体系。

通过大规模的定量调查和针对性研究，罗兰·贝格公司最终从中归纳出了19个最核心的消费者价值需求元素。此外，特别针对中国的研究还发现，中国消费者拥有一个独特的价值元素——追求，即追求更高的生活质量，渴望成功和被他人认可。如下表所示：

<img src="https://cht527.oss-cn-shanghai.aliyuncs.com/consumer1.png"  width="500"/>


<img src="https://cht527.oss-cn-shanghai.aliyuncs.com/consumer2.png"  width="500"/>


在罗列出消费者核心价值元素后，需要将这些元素整合到一个分析框架中以明确各元素彼此之间的关系以及其对品牌的影响。为此，建立具有两个维度的矩阵：

纵轴表示某价值元素属于理性元素（rational）还是感性元素（emotional），横轴表示该价值元素对消费者起促进作用（＋）还是抑制作用（－）。

这样一来，整个平面就被划分为四个象限：刺激（Stimulation）、解决方案（Solutions）、朴实（Solidarity）和价格（Price）。

这四个象限代表了消费者价值元素的四个类别。

其中，刺激代表了追求感性上的享受和满足，包括刺激/乐趣、追求等元素；

解决方案代表了对质量和功能方面的理性价值的追求，包括质量、服务等元素；

朴实代表了自我约束的价值观，包括自然、安逸等元素；

而价格则代表了出于价格因素而约束消费，包括全面成本和明知购物等元素。

借助多维元素相关性分析的数学方法，确定各个价值元素在矩阵中的相对位置。下图是中国消费者的价值元素分布图

<img src="https://cht527.oss-cn-shanghai.aliyuncs.com/rolandberger.png"  width="500"/>

#### 价值观分布图的基本要素

##### 1、抑制/促进 消费

左半区域，减号 -，代表抑制消费的元素；

右半区域，加好 +，代表促进消费的元素；

越往右的元素越能促进消费。

##### 2、感性/理性 

上半区域，E，感性消费的元素；

下半区域，R，理性消费的元素；

越往上的元素感性程度越高。

##### 3、对价值观点 认可/无感

蓝色代表用户对这些价值观是认可的；

红色则代表用户对这些价值观是无感的；

而等高线上展现出的色阶，就展现了价值认可度上的梯度。

不同的行业，不同的品牌，不同地区、不同的用户属性，其实都会对价值观红蓝图带来非常显性的影响。

### 二、使用
```
安装： npm install 

本地预览： npm run dev

在工程开发中使用：

import rolandberger from 'rolandbergerprofiler';

const data = [
    {"id":0,"name":"安逸","x":0.22,"y":0.25,"value":0.75},
    {"id":1,"name":"刺激乐趣","x":0.81,"y":0.07,"value":0.07},
    {"id":2,"name":"定制化","x":0.78,"y":0.91,"value":0.31},
    {"id":3,"name":"服务","x":0.61,"y":0.53,"value":0.20},
    {"id":4,"name":"高尚","x":0.2,"y":0.05,"value":0.86},
    {"id":5,"name":"个人效率","x":0.8,"y":0.75,"value":0.05},
    {"id":6,"name":"古典","x":0.49,"y":0.22,"value":0.17},
    {"id":7,"name":"活力","x":0.6,"y":0.48,"value":0.96},
    {"id":8,"name":"激情","x":0.48,"y":0.09,"value":0.40},
    {"id":9,"name":"简约","x":0.23,"y":0.47,"value":0.85},
    {"id":10,"name":"科技","x":0.9,"y":0.55,"value":0.11},
    {"id":11,"name":"美誉","x":0.57,"y":0.77,"value":0.25},
    {"id":12,"name":"明智购物","x":0.28,"y":0.7,"value":0.09},
    {"id":13,"name":"亲和力","x":0.4,"y":0.43,"value":0.27},
    {"id":14,"name":"全面成本","x":0.24,"y":0.83,"value":0.95},
    {"id":15,"name":"新潮","x":0.85,"y":0.42,"value":0.31},
    {"id":16,"name":"质量","x":0.55,"y":0.63,"value":0.17},
    {"id":17,"name":"追求","x":0.77,"y":0.22,"value":0.14},
    {"id":18,"name":"自然","x":0.26,"y":0.21,"value":0.55},
    {"id":19,"name":"自由自在","x":0.61,"y":0.30,"value":0.69}
  ]
const rolandBergerProfiler = rolandberger.init(document.getElementById('container'));
        
rolandBergerProfiler.setOption({
   data
})
```

