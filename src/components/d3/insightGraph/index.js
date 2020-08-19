import React, {
  useRef,
  useCallback,
  useState,
  useEffect,
  useMemo,
} from 'react';
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
  const [nextId, setNextId] = useState(1);
  const svgRef = useRef();

  const [chartData, setChartData] = useState({
    nodes: [{ id: 0 }],
    links: [],
  });

  const color = useMemo(() => scaleOrdinal(schemeTableau10), []);

  useEffect(() => {
    const svg = select(svgRef.current)
      .append('svg')
      .style('width', '100vw')
      .style('height', '100vh')
      .attr('viewBox', [-300, -200, 600, 400]);

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
      Object.assign(select(svgRef.current).node(), {
        update({ nodes, links }) {
          console.log(nodes, links);
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
    console.log('use effect', chart, chartData);
    if (chart) {
      chart.update(chartData);
    }
  }, [chart, chartData.nodes.length, chartData.links.length]);

  useEffect(() => {
    console.log('chart data changed', chartData);
  }, [chartData]);

  const addItem = useCallback(() => {
    setChartData((prevData) => {
      let newData = { nodes: prevData.nodes, links: prevData.links };

      const id = nextId;
      setNextId((id) => id + 1);

      newData.links.push({
        source: id,
        target:
          newData.nodes[Math.floor(Math.random() * newData.nodes.length)].id,
      });
      newData.nodes.push({ id });

      return newData;
    });
  }, [chart, nextId]);

  return (
    <>
      <button className='absolute' onClick={addItem}>
        add
      </button>
      <main className='-5' ref={svgRef}></main>
    </>
  );
};

export default InsightGraph;
