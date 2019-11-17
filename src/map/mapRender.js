import * as d3 from 'd3';

const renderGeoData = (divSelector, geoData) => {
  if (!geoData) return;
  const div = d3.select(divSelector);
  if (!div) return;
  div.selectAll('svg').remove();
  const svg = div.append('svg');
  svg.attr('width', '2400');
  svg.attr('height', '1800');
  const view = svg.append('g');
  if (!view) return;
  console.log('rendering');
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
    .join('circle')
    .attr('fill', 'silver')
    .attr('r', '4')
    .attr('cx', node => node.coords[0])
    .attr('cy', node => node.coords[1]);

  view
    .append('g')
    .selectAll('text')
    .data(geoData.nodes)
    .join('text')
    .text(node => node.addr)
    .attr('style', 'font-size: 8px;')
    .attr('x', node => node.coords[0])
    .attr('y', node => node.coords[1]);

  svg.call(
    d3.zoom().on('zoom', () => {
      view.attr('transform', d3.event.transform);
    })
  );
  return view;
};

export default renderGeoData;
