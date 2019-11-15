import * as d3 from 'd3';
import { getMapData } from '../api';

export const baseMapEffect = () => {
  const svg = d3.select('svg#geodata');
  // Get the height and width, in pixels for the SVG element in the document
  const { height, width } = document
    .querySelector('svg#geodata')
    .getBoundingClientRect();

  // Create a new projection function
  const projection = d3.geoAlbers();
  // const projection = d3.geoMercator();
  getMapData().then(geoData => {
    // Adjust the projection to fit the width and height of the SVG element
    projection.rotate(0).fitExtent(
      [
        [-300, -500],
        [width, height]
      ],
      geoData
    );
    // Create a GeoPath function from the projection
    const path = d3.geoPath().projection(projection);
    // Append paths to the SVG, and decribe its 'd' attribute using the geo-path function
    svg
      .append('g')
      // .attr('style', 'transform: rotate(0.5turn)')
      .selectAll('path')
      .data(geoData.features)
      .enter()
      .append('path')
      .attr('fill', 'none')
      .attr('stroke', d => {
        switch (d.geometry.type) {
          case 'Point':
            return 'rgba(0,0,0,0)';
          case 'LineString':
            return 'green';
          case 'MultiLineString':
            return 'blue';
          case 'Polygon':
            return '#606060';
          default:
            return 'red';
        }
      })
      .attr('stroke-width', '0.5px')
      .attr('d', feature => path(feature));
  });
};

const STORE = {};

const renderGeoData = view => geoData => {
  STORE.geoData = geoData;
  view
    .append('path')
    .attr('fill', 'none')
    .attr('stroke', 'silver')
    .attr('d', () => {
      const path = geoData.links.map(link => {
        const [x0, x1, x2] = link.x;
        const [y0, y1, y2] = link.y;
        return `M${x0},${y0} L${x1},${y1} L${x2},${y2}`;
      });
      return path.join(' ');
    });

  view
    .append('g')
    .selectAll('circle')
    .data(geoData.nodes)
    .enter()
    .append('circle')
    .attr('fill', 'silver')
    .attr('r', '4')
    .attr('cx', node => node.coords[0])
    .attr('cy', node => node.coords[1]);

  view
    .append('g')
    // .attr('style', 'transform: rotate(0.5turn)')
    .selectAll('text')
    .data(geoData.nodes)
    .enter()
    .append('text')
    .text(node => node.addr)
    .attr('style', 'font-size: 8px;')
    .attr('x', node => node.coords[0])
    .attr('y', node => node.coords[1]);
};

const mockMapEffect = () => {
  const svg = d3.select('svg#geodata');
  const view = svg.select('g#view');
  // Get the height and width, in pixels for the SVG element in the document
  const { height, width } = document
    .querySelector('svg#geodata')
    .getBoundingClientRect();

  const render = renderGeoData(view);
  if (STORE.geoData) {
    render(STORE.geoData);
  } else {
    getMapData(width - 20, height).then(render);
  }
};

// export default baseMapEffect;
export default mockMapEffect;
