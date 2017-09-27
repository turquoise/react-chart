import { Component } from 'react';
import * as d3 from 'd3';
import ReactFauxDOM from 'react-faux-dom';

class BarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      yScale: '',
      xScale: ''

    }
  }
  static defaultProps = {
    height: 500,
    width: 500,
    chartBg: '#f4f4f4',
    barColor: 'steelBlue',
    barWidth: 40,
    barOffset: 5
  }

  setYScale() {
    console.log('setting Y Scale...');
    let y = d3.scaleLinear()
      .domain([0, d3.max(this.state.data)])
      .range([0,this.props.height]);

    this.setState({ yScale: y});
  }

  // componentWillMount() {
  //   this.setYScale();
  // }

  setXScale() {
    console.log('setting X Scale...');
    let x = d3.scaleBand()
      .domain(d3.range(0,this.state.data.length))
      .range([0,this.props.width]);

    this.setState({ xScale: x});
  }

  componentWillMount() {
    this.setYScale();
    this.setXScale();
  }

  render() {
    const chart = ReactFauxDOM.createElement('div');

    let tooltip = d3.select('body').append('div')
      .style('position', 'absolute')
      .style('background', '#cccccc')
      .style('opacity', '0')
      .style('padding', '10px')
      .style('border', '1px#000000 solid')
      .style('border-radius', '5px')

    d3.select(chart).append('svg')
      .attr('width', this.props.width)
      .attr('height', this.props.height)
      .style('background', this.props.chartBg)
      .selectAll('rect')
      .data(this.state.data)
      .enter().append('rect')
        .style('fill', this.props.barColor)
        .attr('width', this.props.barWidth)
        .attr('height', (d) => {
          //return d;
          return this.state.yScale(d);
        })
        .attr('x', (d, i) => {
          //return i * (this.props.barWidth + this.props.barOffset);
          return this.state.xScale(i);
        })
        .attr('y', (d) => {
          //return this.props.height -d;
          return this.props.height - this.state.yScale(d);
        })
        .on('mouseover', (d) => {
          //console.log(d);
          tooltip.style('opacity', 1);
          tooltip.html(d)
            .style('left', (d3.event.pageX)+ 'px')
            .style('top', (d3.event.pageY)+ 'px')
        })
        .on('mouseout', (d) => {
          tooltip.style('opacity', 0);
        })

    return chart.toReact();
  }
}

export default BarChart;
