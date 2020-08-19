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
  const maxHistory = 5;
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
            .attr('opacity', (d) => 1 - d.weight / maxHistory);

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
    if (inputHistory.length === maxHistory) inputHistory.pop();

    const newNode = { id: input, data: input };

    setChartData((prevData) => {
      let newData = { ...prevData };

      const inputAlreadyInGraph = prevData.nodes.some(
        (e) => e.id === newNode.id
      );

      if (!inputAlreadyInGraph) newData.nodes.push(newNode);

      let updatedLinks = []; // keep track of which previous inputs have already been updated

      inputHistory.forEach((prevInput, ndx) => {
        if (
          // don't need to update yourself
          prevInput.id !== newNode.id &&
          // only update links once
          !updatedLinks.includes(prevInput.id)
        ) {
          // look through the links and update weight with average if we find a match
          newData.links = newData.links.map((e) => {
            if (
              (e.source === prevInput.id && e.target === newNode.id) ||
              (e.source === newNode.id && e.target === prevInput.id)
            ) {
              e.weight = (e.weight + ndx) / 2;
              updatedLinks.push(prevInput.id);
            }

            return e;
          });

          // if we didn't update this link (meaning it didn't exist), create a link
          if (!updatedLinks.includes(prevInput.id)) {
            newData.links.push({
              source: prevInput.id,
              target: newNode.id,
              weight: ndx,
            });
          }
        }
      });

      return newData;
    });

    inputHistory.unshift(newNode);
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
          {inputHistory.map((i, ndx) => (
            <li key={i.id + ndx}>{i.data}</li>
          ))}
        </ul>
      </div>
      <main className='-5' ref={svgRef}></main>
    </>
  );
};

export default InsightGraph;
