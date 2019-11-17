import * as d3 from 'd3';
const renderLinks = (view, links) => {
  view
    .append('path')
    .attr('fill', 'none')
    .attr('stroke', 'silver')
    .attr('d', () => {
      const path = links.map(link => {
        const [x0, x1, x2] = link.x;
        const [y0, y1, y2] = link.y;
        return `M${x0},${y0} L${x1},${y1} L${x2},${y2}`;
      });
      return path.join(' ');
    });
};

const renderNodes = (view, nodes) => {
  view
    .append('g')
    .selectAll('circle')
    .data(nodes)
    .join('circle')
    .attr('fill', 'silver')
    .attr('r', '4')
    .attr('cx', node => node.coords[0])
    .attr('cy', node => node.coords[1]);

  view
    .append('g')
    .selectAll('text')
    .data(nodes)
    .join('text')
    .text(node => node.addr)
    .attr('style', 'font-size: 8px;')
    .attr('x', node => node.coords[0])
    .attr('y', node => node.coords[1]);
};

const renderTour = (view, tour) => {
  console.log('render tour', tour);
  if (!tour) return;
  if (tour.length < 2) return; //can't reduce small array
  const path = [];
  tour.reduce((src, tgt) => {
    console.log(src.addr, '-->', tgt.addr);
    const [x0, y0] = src.coords;
    const [x2, y2] = tgt.coords;
    path.push(`M${x0},${y0}`);
    if (x0 >= x2 && y0 < y2) {
      path.push(`L${x0},${y2}`);
    } else if (x0 >= x2 && y0 >= y2) {
      path.push(`L${x2},${y0}`);
    } else if (x0 < x2 && y0 >= y2) {
      path.push(`L${x0},${y2}`);
    } else {
      path.push(`L${x2},${y0}`);
    }
    path.push(`L${x2},${y2}`);
    return tgt;
  });
  view
    .append('path')
    .attr('fill', 'none')
    .attr('stroke', 'blue')
    .attr('d', path.join(' '));
};

const renderGeoData = (divSelector, geoData) => {
  console.log('renderGeoData', divSelector, geoData);
  if (!geoData) return;
  const div = d3.select(divSelector);
  if (!div) return;
  div.selectAll('svg').remove();
  const svg = div.append('svg');
  svg.attr('width', '2400');
  svg.attr('height', '1800');
  const view = svg.append('g').attr('id', 'view');
  if (!view) return;
  renderLinks(view, geoData.links);
  renderNodes(view, geoData.nodes);
  renderTour(view, geoData.tour); //if present

  svg.call(
    d3.zoom().on('zoom', () => {
      view.attr('transform', d3.event.transform);
    })
  );
  return view;
};

export default renderGeoData;
