import * as d3 from 'd3';

const renderGeoData = (viewSelector, geoData) => {
  const view = d3.select(viewSelector);
  // view.removeAll();
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

  // d3.select('svg').call(
  // const svg = d3.select('svg');
  // svg.call(
  //   d3.zoom().on('zoom', () => {
  //     // view.attr('transform', d3.event.transform);
  //     svg.attr('transform', d3.event.transform);
  //   })
  // );
  return view;
};

export default renderGeoData;
