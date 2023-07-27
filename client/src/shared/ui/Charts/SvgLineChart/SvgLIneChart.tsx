// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useMemo } from 'react';

const STROKE = 2;

const transform = (value, inputRange, outputRange) => {
  const [inputMin, inputMax] = inputRange;
  const [outputMin, outputMax] = outputRange;
  const inputDiff = inputMax - inputMin;
  const outputDiff = outputMax - outputMin;
  return ((value - inputMin) * outputDiff) / inputDiff + outputMin;
};

const LineChart = ({ data, width, height, precision, horizontalGuides, fontSize }) => {
  const transformOrigin = `scale(1,-1) translate(0,-${height})`;
  const maximumYFromData = Math.max(...data.map((d) => d.y));
  const maximumXFromData = Math.max(...data.map((d) => d.x));
  const digits = maximumYFromData.toFixed(precision).length + 1;
  const padding = (fontSize + digits) * 3;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;
  const points = data
    .map((element) => {
      const x = transform(element.x, [0, maximumXFromData], [padding, width - padding]);
      const y = transform(element.y, [0, maximumYFromData], [padding, height - padding]);
      return `${x},${y}`;
    })
    .join(' ');

  const Axis = ({ points }) => (
    <polyline fill="none" stroke="#333" strokeWidth={STROKE} points={points} />
  );

  const XAxis = () => {
    const startX = padding;
    const startY = padding;
    const endX = width - padding;
    const endY = padding;
    return <Axis points={`${startX},${startY} ${endX},${endY}`} />;
  };

  const YAxis = () => {
    const startX = padding;
    const startY = padding;
    const endX = padding;
    const endY = height - padding;
    return <Axis points={`${startX},${startY} ${endX},${endY}`} />;
  };

  // const VerticalGuides = () => {
  //   return new Array(verticalGuides - 1).fill(0).map((x, i) => {
  //     const startX = padding + (chartWidth / verticalGuides) * (i + 1);
  //     const startY = padding;
  //     const endX = padding + (chartWidth / verticalGuides) * (i + 1);
  //     const endY = height - padding;
  //     const points = `${startX},${startY} ${endX},${endY}`;
  //     return <polyline key={points} fill="none" stroke="#ccc" strokeWidth=".5" points={points} />;
  //   });
  // };

  const HorizontalGuides = () => {
    const delimiter = Math.floor(horizontalGuides / 7);
    let counter = 1;
    return new Array(Math.floor(horizontalGuides) - 1)
      .fill(0)
      .map((_, index) => {
        if (index % counter !== 0) return null;
        const startX = padding;
        const startY = padding + (chartHeight / horizontalGuides) * (index + 1);
        const endX = width - padding;
        const endY = padding + (chartHeight / horizontalGuides) * (index + 1);
        const points = `${startX},${startY} ${endX},${endY}`;
        counter = counter + delimiter;
        return (
          <polyline
            key={points}
            fill="none"
            stroke="#CCC"
            strokeWidth=".5"
            points={points}
            opacity="0.3"
          />
        );
      })
      .filter(Boolean);
  };

  const LabelsYAxis = () => {
    const delimiter = Math.floor(horizontalGuides / 7);
    let counter = 1;
    return new Array(Math.floor(horizontalGuides) + 1)
      .fill(0)
      .map((_, index) => {
        if (index % counter !== 0) return null;
        const value = parseFloat(maximumYFromData * (index / horizontalGuides)).toFixed(precision);
        const xFontAdjust = value.length * fontSize * 0.6;
        const x = padding - xFontAdjust;
        const yFontAdjust = fontSize / 3;
        const y =
          transform(index, [0, horizontalGuides], [padding + chartHeight, padding]) + yFontAdjust;
        counter = counter + delimiter;
        return (
          <text
            key={index}
            x={x}
            y={y}
            style={{
              fill: '#808080',
              fontSize,
              fontFamily: 'Helvetica',
            }}
          >
            {value}
          </text>
        );
      })
      .filter(Boolean);
  };

  const LabelsXAxis = () => {
    const y = height - padding + fontSize * 1.5;
    return data.map((element, index) => {
      const x =
        transform(element.x, [0, maximumXFromData], [padding, padding + chartWidth]) - fontSize / 2;
      return (
        <text
          key={index}
          x={x}
          y={y}
          style={{
            fill: '#808080',
            fontSize,
            fontFamily: 'Helvetica',
          }}
        >
          {element.label}
        </text>
      );
    });
  };

  return (
    <>
      <svg
        // ref={setSvg}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        // onMouseMove={handleMouseMove}
      >
        <g transform={transformOrigin}>
          <XAxis />

          <YAxis />

          {/* {verticalGuides && <VerticalGuides />} */}
          {horizontalGuides && <HorizontalGuides />}
          <polyline fill="none" stroke="#F34C44" strokeWidth={STROKE} points={points} />
        </g>
        <LabelsYAxis />
        <LabelsXAxis />
      </svg>
    </>
  );
};

export function SvgLineChart({ data }) {
  if (!data.length) return null;
  console.log('data', data);

  const HEIGHT = 400;
  const WIDTH = HEIGHT * 1.618;

  const maxHorizontalGuidesCount = useMemo(
    () => Math.max(...data.map((d) => d.y)) / 100,
    [data.length]
  );
  const maxVerticalGuidesCount = useMemo(() => Math.max(...data.map((d) => d.x)), [data.length]);

  return (
    <LineChart
      data={data}
      width={WIDTH}
      height={HEIGHT}
      precision={2}
      fontSize={12}
      horizontalGuides={maxHorizontalGuidesCount}
      verticalGuides={maxVerticalGuidesCount}
    />
  );
}
