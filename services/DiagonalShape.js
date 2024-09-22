// DiagonalShape.js
import React from 'react';
import Svg, { Polygon } from 'react-native-svg';

const DiagonalShape = ({ width, height, fill }) => (
  <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
    <Polygon points={`0,0 ${width},0 ${width - 20},${height} 20,${height}`} fill={fill} />
  </Svg>
);

export default DiagonalShape;
