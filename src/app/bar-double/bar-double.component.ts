import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';


@Component({
  selector: 'bar-double',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './bar-double.component.html',
  styleUrls: ['./bar-double.component.css']
})

export class BarDoubleComponent implements OnInit {

  @Input() title = 'Bar Chart';
  @Input() chartWidth = 960;
  @Input() chartHeight = 500;
  @Input() margin = { top: 0, right: 50, bottom: 0, left: 50 };
  @Input() barData;
  @Input() barsCount = 5;
  @Input() lineValue
  @Input() lineText
  @Input() lineColor

  private x: any;
  private y: any;
  private svg: any;
  private g: any;

  private start = 0;
  private start_max: number;
  private data: any;

  private barsCountRightArrow = true;
  private barsCountLeftArrow = false;

  private height: number;
  private width: number;

  constructor() { }

  ngOnInit() {
    this.start_max = this.barData.length;
    this.redrawChart();
  }

  private redrawChart() {
    this.data = this.barData.slice(this.start, this.barsCount + this.start);
    this.initSvg();
    this.initAxis();
    this.drawAxis();
    this.drawBars();
    this.drawLines();
  }

  // For canvas size
  private initSvg() {
    this.svg = d3.select('svg');
    this.svg.selectAll("*").remove();
    this.width = this.chartWidth - this.margin.left - this.margin.right + 20;
    this.height = this.chartHeight - this.margin.top - this.margin.bottom;
    this.svg.attr('width', this.width + 50);
    this.svg.attr('height', this.height + this.margin.top + this.margin.bottom + 20);
    // this.width = +this.svg.attr('width') - this.margin.left - this.margin.right + 20;
    // this.height = 275 - this.margin.top - this.margin.bottom;
    this.g = this.svg.append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }

  // For initializing x-axis and y-axis
  private initAxis() {
    let keyObjectArray = Object.keys(this.data[0]);
    this.x = d3Scale.scaleBand().rangeRound([0, this.width]).padding(0.1).align(0.1);
    this.y = d3Scale.scaleLinear().rangeRound([this.height, 0]);
    this.x.domain(this.data.map((d) => d[keyObjectArray[0]]));
    this.y.domain([0, d3Array.max(this.data, (d) => d[keyObjectArray[1]])]);
  }

  // To draw the x and y axis lines
  private drawAxis() {
    const xAxis = d3Axis.axisBottom(this.x).tickPadding(5);
    const yAxis = d3Axis.axisLeft(this.y)
      //   .tickFormat(function (d) {
      //     console.log(d/d3Array.max(this.data, (d) => d.frequency)*100);
      //     return Math.round(d/d3Array.max(this.data, (d) => d.frequency)*100);
      // })
      .ticks(6)
    this.g.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(xAxis);
    this.g.append('g')
      .attr('class', 'y axis')
      .call(yAxis)
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .text('');
  }

  // For drawing bars
  private drawBars() {
    let tooltip = d3.select("body").append("div").attr("class", "toolTip");
    let displayTooltip = function (d) {
      let keyObjectArray = Object.keys(d);
      tooltip
        .style("left", d3.event.pageX - 50 + "px")
        .style("top", d3.event.pageY - 70 + "px")
        .style("display", "inline-block")
        .html(keyObjectArray[0] + ":" + d[keyObjectArray[0]] + "<br>" + keyObjectArray[1] + ":" + d[keyObjectArray[1]]);
    }
    let hideTooltip = function (d) { tooltip.style("display", "none"); }
    let bars = this.g.selectAll('.bar')
      .data(this.data)
      .enter().append('g')
      .attr('class', 'bar');
    bars.append("rect").attr('class', 'back')
      .attr('x', (d) => this.x(d.letter))
      .attr('y', 0)
      .attr('width', 20)
      .attr('height', this.height)
      .attr('fill', '#EDEEF1')
      .on("mousemove", displayTooltip)
      .on("mouseout", hideTooltip);
    bars.append("rect")
      .attr('x', (d) => this.x(d.letter))
      .attr('y', (d) => this.y(d.frequency))
      .attr('width', 20)
      .attr('height', (d) => this.height - this.y(d.frequency))
      .on("mousemove", displayTooltip)
      .on("mouseout", hideTooltip);
  }

  // For moving chart towards right
  private moveRight() {
    if (this.barsCount + this.start === this.start_max) {
      this.barsCountRightArrow = false;
      return;
    }
    this.start++;
    this.redrawChart();
    if (this.start > 0)
      this.barsCountLeftArrow = true;
  }

  // For moving chart towards left
  private moveLeft() {
    if (this.start === 0) {
      this.barsCountLeftArrow = false;
      return;
    }
    this.start--;
    this.redrawChart();
    if (this.start < this.start_max)
      this.barsCountRightArrow = true;
  }

  //For drawing line and add text at the end of the line
  private drawLines() {
    this.g.append('line')
      .attr('x1', 0)
      .attr('y1', this.lineValue)
      .attr('x2', this.width - 20)
      .attr('y2', this.lineValue)
      .attr('stroke', this.lineColor)
    this.g.append('text')
      .attr('class', 'barsEndlineText')
      .attr('text-anchor', 'middle')
      .attr("x", this.width + 5)
      .attr("y", this.lineValue)
      .text(this.lineText)
  }
}