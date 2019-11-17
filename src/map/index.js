import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import renderGeoData from './mapRender';
// import usePanning from './usePanning';

const Div = styled.div`
  border: solid thin silver;
  height: ${props => props.height || '50vh'};
`;

const Button = styled.div`
  font-size: 20px;
  font-weight: bold;
  width: 30px;
  height: 30px;
  display: inline-block;
  background-color: #ddd;
  text-align: center;
  border: solid thin silver;
  cursor: pointer;
`;

const Btn = props => {
  const { children, onClick, ...rest } = props;
  return (
    <foreignObject {...rest} width='30' height='30'>
      <Button onClick={onClick}>{children}</Button>
    </foreignObject>
  );
};

const Map = props => {
  const {
    data,
    zoom,
    x,
    y,
    setMapZoom,
    setMapX,
    setMapY,
    height = '50vh',
    children
  } = props;

  useEffect(() => {
    renderGeoData('g#view', data);
  }, [data]);

  const zoomOut = () => setMapZoom(zoom / 1.5);
  const zoomIn = () => setMapZoom(zoom * 1.5);
  const moveUp = () => setMapY(y + 20 / zoom);
  const moveDn = () => setMapY(y - 20 / zoom);
  const moveLt = () => setMapX(x + 20 / zoom);
  const moveRt = () => setMapX(x - 20 / zoom);

  const transform = `translate(${x}%, ${y}%) scale(${zoom}) `;
  return (
    <Div height={height}>
      <svg style={{ width: '100%', height: '100%' }} id='geodata'>
        <g id='view' style={{ transform }}></g>
        <Btn x='0' y='0' onClick={zoomIn}>
          &#x002b;
        </Btn>
        <Btn x='0' y='30' onClick={zoomOut}>
          &#x2212;
        </Btn>
        <Btn x='35' y='30' onClick={moveLt}>
          &#x2190;
        </Btn>
        <Btn x='65' y='30' onClick={moveRt}>
          &#x2192;
        </Btn>
        <Btn x='50' y='0' onClick={moveUp}>
          &#x2191;
        </Btn>
        <Btn x='50' y='60' onClick={moveDn}>
          &#x2193;
        </Btn>
        {children}
      </svg>
    </Div>
  );
};

const setMapZoom = zoom => ({
  type: 'MAP_SET_ZOOM',
  payload: zoom
});
const setMapX = x => ({
  type: 'MAP_SET_X',
  payload: x
});
const setMapY = y => ({
  type: 'MAP_SET_Y',
  payload: y
});

export default connect(
  state => {
    const { map } = state;
    return { ...map };
  },
  { setMapZoom, setMapX, setMapY }
)(Map);
