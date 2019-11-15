/*global L */
import React, { useEffect } from 'react';
import styled from 'styled-components';
// import * as d3 from 'd3';
// import selection from 'd3-selection';
import { getMapData } from '../api';

const Div = styled.div`
  border: solid thin silver;
  height: 50vh;
`;

const Map = props => {
  useEffect(() => {
    getMapData()
      .then(geoData => {
        const lmap = L.map('mapid', { renderer: L.svg() }).setView(
          [174.45092, -36.669451],
          10
        );
        L.tileLayer(
          'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}',
          {
            foo: 'bar',
            attribution:
              'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
          }
        ).addTo(lmap);
        const mapLayer = L.geoJSON().addTo(lmap);
        // L.geoJSON(geoData.features).addTo(lmap);
        mapLayer.addData(geoData.features);
        L.marker([174.45092, -36.669451]).addTo(lmap);
      })
      .catch(err => console.log(err));
  }, []);

  return <Div id='mapid'></Div>;
};

export default Map;
