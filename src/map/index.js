import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import mapEffect from './mapEffect';

const Div = styled.div`
  border: solid thin silver;
  height: 50vh;
`;

const txtStyle = { fontSize: '20px', fontWeight: 'bold', anchorText: 'center' };

const Map = props => {
  const { map, setMapZoom } = props;
  // const [d, setD] = useState('M0,0 L50,50 L50,100 Z');
  useEffect(mapEffect, []);
  const zoomIn = () => setMapZoom((map.zoom *= 1.5));
  const zoomOut = () => setMapZoom((map.zoom /= 1.5));
  const transform = `scale(${map.zoom}) translate(100%, 100%)`;

  return (
    <Div>
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
    return { map };
  },
  { setMapZoom }
)(Map);
