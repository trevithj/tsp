import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import renderGeoData from './mapRender';

const Div = styled.div`
  border: solid thin silver;
  height: ${props => props.height || '50vh'};
`;

const txtStyle = { fontSize: '20px', fontWeight: 'bold', anchorText: 'center' };

const Map = props => {
  const { data, zoom, setMapZoom } = props;
  // const [d, setD] = useState('M0,0 L50,50 L50,100 Z');
  // useEffect(mapEffect, [map.data]);
  useEffect(() => {
    renderGeoData('g#view', data);
  }, [data]);
  const zoomIn = () => setMapZoom(zoom * 1.5);
  const zoomOut = () => setMapZoom(zoom / 1.5);
  const transform = `scale(${zoom}) translate(100%, 100%)`;
  console.log(transform);
  return (
    <Div height='50vh'>
      <svg style={{ width: '100%', height: '100%' }} id='geodata'>
        <g id='view' style={{ transform }}></g>
        <text x='0' y='20' style={txtStyle} onClick={zoomIn}>
          +
        </text>
        <text x='0' y='40' style={txtStyle} onClick={zoomOut}>
          -
        </text>
      </svg>
    </Div>
  );
};

const setMapZoom = zoom => ({
  type: 'MAP_SET_ZOOM',
  payload: zoom
});

export default connect(
  state => {
    const { map } = state;
    return { data: map.data, zoom: map.zoom };
  },
  { setMapZoom }
)(Map);
