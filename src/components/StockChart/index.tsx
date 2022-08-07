import { useCallback } from "react";
import Canvas from "./Canvas";
import { maxBy, minBy } from "lodash";
import * as d3 from "d3-scale";

export interface Bucket {
  time: number;
  openingPrice: number;
  highestPrice: number;
  lowestPrice: number;
  closingPrice: number;
}

export type Props = {
  width: number;
  height: number;
  margin?: {
    left: number;
    right: number;
    top: number;
    bottom: number;
  };
  buckets: Bucket[];
  options: {
    scale: number
    gridColor?: string;
    bullColor?: string;
    bearColor?: string;
    bullCandle?: string;
  };
};

const StockChart = ({
  width,
  height,
  margin: { left, right, top, bottom } = {
    left: 30,
    right: 50,
    top: 30,
    bottom: 30,
  },
  buckets,
  ...props
}: Props) => {

  const draw = useCallback((ctx: CanvasRenderingContext2D) => {
    const maxPrice = maxBy(buckets, (d: Bucket) => d.highestPrice)?.highestPrice || 0;
    const minPrice = minBy(buckets, (d: Bucket) => d.lowestPrice)?.lowestPrice || 0;

    const xMin = left;
    const yMin = top;

    const xMax = width - right;
    const yMax = height - bottom;

    const translatePosition = {
      x: ctx.canvas.width / 2,
      y: ctx.canvas.height / 2,
    };

    const xScale = d3
      .scaleBand()
      .domain(buckets.map((b) => b.time.toString()))
      .range([xMin, xMax])
      .padding(0.3);

    const yScale = d3
      .scaleLinear()
      .domain([minPrice, maxPrice])
      .range([yMax, yMin]);

    const ticks = yScale.ticks(5);

    // Background
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = props.options?.gridColor || "#131722";
    ctx.fillRect(0, 0, width, height);

    ctx.save();
    ctx.setTransform(props.options.scale, 0, 0, props.options.scale, -(props.options.scale - 1) * translatePosition.x, -(props.options.scale - 1) * translatePosition.y);

    // Draw Y-axis(price)
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.moveTo(xMax, yMin);
    ctx.lineTo(xMax, yMax);
    ctx.stroke();

    // Draw Y-ticks
    ticks.forEach((t) => {
      const y = yScale(t);

      ctx.strokeStyle = "white";
      ctx.fillStyle = "white";

      ctx.beginPath();
      ctx.moveTo(xMax, y);
      ctx.lineTo(xMax + 10, y);
      ctx.stroke();
      ctx.fillText(t.toString(), xMax + 12, y + 3);
    });

    // Draw Candlesticks
    buckets.forEach((b) => {
      const timeX = xScale(b.time.toString()) || 0;
      const lineX = timeX + xScale.bandwidth() / 2;
      const highestPriceY = yScale(b.highestPrice);
      const openingPriceY = yScale(b.openingPrice);
      const closingPriceY = yScale(b.closingPrice);
      const lowestPriceY = yScale(b.lowestPrice);
      const isRed = b.closingPrice > b.openingPrice;
      const color = isRed ? (props.options?.bullColor || "red") : (props.options?.bearColor || "green");

      ctx.strokeStyle = color;
      ctx.fillStyle = color;

      // Line
      ctx.beginPath();
      ctx.moveTo(lineX, highestPriceY);
      ctx.lineTo(lineX, lowestPriceY);
      ctx.stroke();

      // Bar
      ctx.fillRect(
        timeX,
        isRed ? closingPriceY : openingPriceY,
        xScale.bandwidth(),
        isRed ? openingPriceY - closingPriceY : closingPriceY - openingPriceY
      );
    });

    ctx.restore();
  }, [props.options, left, top, width, right, height, bottom, buckets]);

  return (<Canvas width={width} height={height} draw={draw} />);
};

export default StockChart;
