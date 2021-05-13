
import React from "react";
import LessonPage from "../../components/LessonPage";
import Chart from "../../components/Chart10";
import instruction from "./instruction.md";
let seen = new Map();

function dfs(g, node) {
  seen[node] = true;
  for(let i = 0; i < g[node].length; i++) {
    if(seen[g[node][i]] === true) continue;
    dfs(g, g[node][i]);
  }
}

const convertData = (input) => {

  let graph = new Map();
  let graphv = new Map();
  const maxRadiud = 20;
  let maxF = -1;
  let minF = 10000000000;
  input.nodes.map(data => {
    graph[data.id] = [];
    graphv[data.id]  = [];
    maxF = Math.max(maxF, data.frequency);
    minF = Math.min(minF, data.frequency);
    seen[data.id] = false;
  });

  input.links.map(data => {
    graphv[data.source].push(data.target);

    graph[data.source].push(data.target);
    graph[data.target].push(data.source);
  });

  dfs(graphv, "福島");
  let newNodes = [], newLinks = [];
  input.nodes.map(data => {
    let obj = data;
    if(graph[data.id].length > 1) {
      obj['radius'] =  (18 / (maxF-minF))*(data.frequency-minF) + 2;
      if(seen[data.id] === true) {
        obj['color'] = 'red';
      } else {
        obj['color'] = 'blue';
      }
      obj.num = graph[data.id].length;
      newNodes.push(obj);
    }

  });

  input.links.map(data => {
    if(graph[data.target].length > 1 && graph[data.source].length > 1) {
      newLinks.push(data);
    }
  });

  console.log(input.nodes);
  console.log(input.links);
  console.log(newNodes);
  console.log(newLinks);
  return { nodes: newNodes, links: newLinks}; // ここを作りましょう！
};

const Lesson = () => {
  return (
    <LessonPage
      answerUrl="/answer10"
      convertData={convertData}
      dataUrl="data/topic-graph.json"
      instruction={instruction}
      title="Lesson 10"
      Chart={Chart}
    />
  );
};

export default Lesson;
