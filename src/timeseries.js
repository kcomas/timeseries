
import d3 from 'd3';

/**
 * Class for creating multi line charts
 */
class Timeseries {

    /**
     * Init
     * @param {Object} [config={}] - the config object
     * @param {string} config.querySelector - the querySelector for d3
     * @param {Object} config.margins - the margin of the graph
     * @param {number} config.width - the width of the graph
     * @param {number} config.height - the height of the graph
     * @param {function} config.xScale - the d3 x scaling function
     * @param {function} config.yScale - the d3 y sacling function
     * @param {function} config.line - the d3 line drawing function
     */
    constructor(config={}){

        /**
         * The querySelector for d3
         * @default 'body'
         * @type {string}
         */
        this._querySelector = config.querySelector || 'body';

        /**
         *this._ The default marigns of the graph
         * @default {top:20, right:80, bottom:30, left:50}
         * @type {Object}
         * @property {number} top - the top margin
         * @property {number} right - the right margin
         * @property {number} bottom - the bottom margin
         * @property {number} left - the left margin
         */
        this._margins = config.margins || {
            top: 20,
            right: 80,
            bottom: 30,
            left: 50
        };

        /**
         * The width of the graph
         * @default the width of the _querySelector
         * @type {number}
         */
        this._width = config.width || document.querySelector(this._querySelector).offsetWidth;

        this._width = this._width - this._margins.left - this._margins.right;

        /**
         * The height of the graph
         * @default _width/2
         * @type {number}
         */
        this._height = config.height || (this._width / 3);

        this._height = this._height - this._margins.top - this._margins.bottom;

        /**
         * The x scaling function
         * @default d3.linearscale from 0 to the width
         * @type {function}
         */
        this._xScale = config.xScale || d3.scale.linear().range([0, this._width]);

        /**
         * The x axis on the bottom
         * @type {function}
         */
        this._xAxis = d3.svg.axis().scale(this._xScale).orient('bottom');

        /**
         * The y scaling function
         * @default d3.linear from the hight to 0
         * @type {function}
         */
        this._yScale = config.yScale || d3.scale.linear().range([this._height, 0]);

        /**
         * The y axis on the left
         * @type {function}
         */
        this._yAxis = d3.svg.axis().scale(this._yScale).orient('left');

        /**
         * The function for drawing the line
         * @default d3.line where the x and y are arrays
         * @type {function}
         */
        this._line = d3.svg.line().x(d => this._xScale(d.x)).y(d => this._yScale(d.y));

        /**
         * The data we are graphing
         * @default []
         * @type {Array}
         */
        this._data = [];

        /**
         * Create the svg object
         * @type {d3}
         */
        this._svg = d3.select(this._querySelector).append('svg')
            .attr('width', this._width + this._margins.left + this._margins.right)
            .attr('height', this._height + this._margins.top + this._margins.bottom)
            .append('g')
            .attr('transform', `translate(${this._margins.left},${this._margins.top})`)

    }

    /**
     * Add data to the data array
     * @param {string} name - the name of the data set
     * @param {array<number>} x - the array of the x values
     * @param {array<number>} y - the array of the y values
     */
    addData(name, x, y){
        this._data.push({
            name,
            x,
            y
        });
    }

}

export default Timeseries;
