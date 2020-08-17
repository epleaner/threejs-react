import React, { useRef, useState, useEffect, useMemo } from 'react';
import { scaleOrdinal } from 'd3-scale';
import { schemeTableau10 } from 'd3-scale-chromatic';
import { select } from 'd3-selection';
import {
  forceSimulation,
  forceManyBody,
  forceLink,
  forceX,
  forceY,
} from 'd3-force';

const InsightGraph = () => {
  const [chart, setChart] = useState();
  const svgRef = useRef();

  const color = useMemo(() => scaleOrdinal(schemeTableau10), []);

  useEffect(() => {
    const svg = select(svgRef.current)
      .append('div')
      // Container class to make it responsive.
      .classed('svg-container', true)
      .attr('display', 'inline-block')
      .attr('position', 'relative')
      .attr('width', '100%')
      .attr('padding-bottom', '100%')
      .attr('vertical-align', 'top')
      .attr('overflow', 'hidden')
      .append('svg')
      // Class to make it responsive.
      .classed('svg-content-responsive', true)
      // Responsive SVG needs these 2 attributes and no width and height attr.
      .attr('preserveAspectRatio', 'xMinYMin meet')
      .attr('viewBox', '-300 -200 600 600')
      .attr('display', 'inline-block')
      .attr('position', 'absolute')
      .attr('top', '10px')
      .attr('left', '0');

    const simulation = forceSimulation()
      .force('charge', forceManyBody().strength(-1000))
      .force(
        'link',
        forceLink()
          .id((d) => d.id)
          .distance(200)
      )
      .force('x', forceX())
      .force('y', forceY())
      .on('tick', ticked);

    let link = svg
      .append('g')
      .attr('stroke', '#000')
      .attr('stroke-width', 1.5)
      .selectAll('line');

    let node = svg
      .append('g')
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5)
      .selectAll('circle');

    function ticked() {
      node.attr('cx', (d) => d.x).attr('cy', (d) => d.y);

      link
        .attr('x1', (d) => d.source.x)
        .attr('y1', (d) => d.source.y)
        .attr('x2', (d) => d.target.x)
        .attr('y2', (d) => d.target.y);
    }

    setChart(
      Object.assign(svg.node(), {
        update({ nodes, links }) {
          // Make a shallow copy to protect against mutation, while
          // recycling old nodes to preserve position and velocity.
          const old = new Map(node.data().map((d) => [d.id, d]));
          nodes = nodes.map((d) => Object.assign(old.get(d.id) || {}, d));
          links = links.map((d) => Object.assign({}, d));

          node = node
            .data(nodes, (d) => d.id)
            .join((enter) =>
              enter
                .append('circle')
                .attr('r', 8)
                .attr('fill', (d) => color(d.id))
            );

          link = link.data(links, (d) => [d.source, d.target]).join('line');

          simulation.nodes(nodes);
          simulation.force('link').links(links);
          simulation.alpha(1).restart();
        },
      })
    );

    return () => {
      select(svg).remove();
    };
  }, [color]);

  useEffect(() => {
    if (chart) {
      chart.update({
        nodes: [{ id: 'a' }, { id: 'b' }, { id: 'c' }],
        links: [
          { source: 'a', target: 'b' },
          { source: 'b', target: 'c' },
          { source: 'c', target: 'a' },
        ],
      });
    }
  }, [chart]);

  return <main ref={svgRef}></main>;
};

export default InsightGraph;
