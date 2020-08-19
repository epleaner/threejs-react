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
  const radius = 8;
  const [inputHistory, setInputHistory] = useState([]);
  const [input, setInput] = useState('');
  const [chart, setChart] = useState();
  const svgRef = useRef();

  const [chartData, setChartData] = useState({
    nodes: [],
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

    let link = svg.append('g').attr('stroke', '#000').selectAll('line');

    let circle = svg.append('g').selectAll('g');

    function ticked() {
      circle.attr('transform', (d) => `translate(${d.x}, ${d.y})`);

      link
        .attr('x1', (d) => d.source.x)
        .attr('y1', (d) => d.source.y)
        .attr('x2', (d) => d.target.x)
        .attr('y2', (d) => d.target.y);
    }

    setChart(
      Object.assign(select(svgRef.current).node(), {
        update({ nodes, links }) {
          // Make a shallow copy to protect against mutation, while
          // recycling old nodes to preserve position and velocity.
          const old = new Map(circle.data().map((d) => [d.id, d]));
          nodes = nodes.map((d) => Object.assign(old.get(d.id) || {}, d));
          links = links.map((d) => Object.assign({}, d));

          circle = circle
            .data(nodes, (d) => d.id)
            .join((enter) => enter.append('g').attr('data', (d) => d.data));

          circle
            .append('circle')
            .attr('r', 8)
            .attr('stroke', '#fff')
            .attr('stroke-width', 1.5)
            .attr('fill', (d) => color(d.id));

          circle
            .append('text')
            .text((d) => d.id)
            .attr('fill', (d) => color(d.id))
            .attr('dy', radius * 3)
            .attr('font-size', '1rem')
            .attr('text-anchor', 'middle');

          link = link
            .data(links, (d) => [d.source, d.target])
            .join('line')
            .attr('opacity', (d) => d.weight / inputHistory.length);

          simulation.nodes(nodes);
          simulation.force('link').links(links);
          simulation.alpha(1).restart();
        },
      })
    );

    return () => {
      select(svg).remove();
    };
  }, [color, inputHistory]);

  useEffect(() => {
    if (chart) {
      chart.update(chartData);
    }
  }, [chart, chartData.nodes.length, chartData.links.length]);

  const addItem = useCallback(() => {
    if (inputHistory.length === 5) inputHistory.shift();

    const newNode = { id: input, data: input };

    setChartData((prevData) => {
      let newData = { ...prevData };

      newData.nodes.push(newNode);

      inputHistory.forEach((prev, ndx) =>
        newData.links.push({
          source: prev.id,
          target: newNode.id,
          weight: ndx + 1,
        })
      );

      return newData;
    });

    inputHistory.push(newNode);
    setInputHistory(inputHistory);
    setInput('');
  }, [chart, input, inputHistory]);

  return (
    <>
      <div className='absolute'>
        <div>
          <input value={input} onChange={(e) => setInput(e.target.value)} />
          <button disabled={!input.length} onClick={addItem}>
            add
          </button>
        </div>
        <ul>
          {inputHistory.map((i) => (
            <li key={i.id}>{i.data}</li>
          ))}
        </ul>
      </div>
      <main className='-5' ref={svgRef}></main>
    </>
  );
};

export default InsightGraph;
