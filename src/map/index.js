import React, { useEffect } from 'react';
import renderGeoData from './mapRender';
import styled from 'styled-components';

const Div = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative; /*allow absolute positioning of children */
`;
const Map = props => {
  const { data, children } = props;
  const renderMap = () => {
    renderGeoData('div#theMap', data);
  };
  useEffect(renderMap, [data]);
  console.log('Map render');
  return <Div id='theMap'>{children}</Div>;
};

export default Map;

export const MapDiv = styled.div`
  border: solid thin silver;
  height: ${props => props.height || '50vh'};
`;
