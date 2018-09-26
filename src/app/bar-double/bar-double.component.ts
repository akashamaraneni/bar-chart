import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';

import { STATISTICS } from '../shared/statistics';

@Component({
  selector: 'bar-double',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './bar-double.component.html',
  styleUrls: ['./bar-double.component.css']
})

export class BarDoubleComponent implements OnInit {

  title = 'Bar Chart';

  public width: number;
  public height: number;
  public margin = { top: 10, right: 50, bottom: 30, left: 50 };

  public x: any;
  public y: any;
  public svg: any;
  public g: any;

  public start = 0;
  public start_max = STATISTICS.length;
  public show = 23;
  public data: any;

  public showRightArrow = true;
  public showLeftArrow = false;

  constructor() { }

  ngOnInit() {
    this.redrawChart();
  }

  public redrawChart() {
    this.data = STATISTICS.slice(this.start, this.show + this.start);
    this.initSvg();
    this.initAxis();
    this.drawAxis();
    this.drawBars();
    this.drawLines();
  }

  // For canvas size
  public initSvg() {
    this.svg = d3.select('svg');
    this.svg.selectAll("*").remove();
    this.width = +this.svg.attr('width') - this.margin.left - this.margin.right + 20;
    this.height = 275 - this.margin.top - this.margin.bottom;
    this.g = this.svg.append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }

  // For initializing x-axis and y-axis
  public initAxis() {
    this.x = d3Scale.scaleBand().rangeRound([0, this.width]).padding(0.1).align(0.1);
    this.y = d3Scale.scaleLinear().rangeRound([this.height, 0]);
    this.x.domain(this.data.map((d) => d.letter));
    this.y.domain([0, d3Array.max(this.data, (d) => d.frequency)]);
  }

  // To draw the x and y axis lines
  public drawAxis() {
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
  public drawBars() {
    let tooltip = d3.select("body").append("div").attr("class", "toolTip");
    let bars = this.g.selectAll('.bar')
      .data(this.data)
      .enter().append('g')
      .attr('class', 'bar');
    bars.append("rect").attr('class', 'back')
      .attr('x', (d) => this.x(d.letter))
      .attr('y', 0)
      .attr('width', 20)
      .attr('height', this.height)
      .attr('fill', '#EDEEF1');
    bars.append("rect")
      .attr('x', (d) => this.x(d.letter))
      .attr('y', (d) => this.y(d.frequency))
      .attr('width', 20)
      .attr('height', (d) => this.height - this.y(d.frequency))
      .on("mousemove", function (d) {
        let keyObjectArray = Object.keys(d);
        tooltip
          .style("left", d3.event.pageX - 50 + "px")
          .style("top", d3.event.pageY - 70 + "px")
          .style("display", "inline-block")
          .html(keyObjectArray[0] + ":" + d[keyObjectArray[0]] + "<br>" + keyObjectArray[1] + ":" + d[keyObjectArray[1]]);
      })
      .on("mouseout", function (d) { tooltip.style("display", "none"); });
  }

  // For moving chart towards right
  public moveRight() {
    if (this.show + this.start === this.start_max) {
      this.showRightArrow = false;
      return;
    }
    this.start++;
    this.redrawChart();
    if (this.start > 0)
      this.showLeftArrow = true;
  }

  // For moving chart towards left
  public moveLeft() {
    if (this.start === 0) {
      this.showLeftArrow = false;
      return;
    }
    this.start--;
    this.redrawChart();
    if (this.start < this.start_max)
      this.showRightArrow = true;
  }

  //For drawing line and add text at the end of the line
  public drawLines() {
    this.g.append('line')
      .attr('x1', 0)
      .attr('y1', 95)
      .attr('x2', this.width - 20)
      .attr('y2', 95)
      .attr('stroke', 'red')
    this.g.append('text')
      .attr('class', 'barsEndlineText')
      .attr('text-anchor', 'middle')
      .attr("x", this.width + 5)
      .attr("y", 95)
      .text('Akash')
  }
}