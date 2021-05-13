
import React from "react";
import LessonPage from "../../components/LessonPage";
import Chart from "../../components/Chart10";
import instruction from "./instruction.md";
let seen = new Map();

function dfs(graph, node) {
  seen[node] = true;
  for(let i = 0; i < graph[node].length; i++) {
    if(seen[graph[node][i]] === true) continue;
    seen[graph[node][i]] = true;
    dfs(graph, graph[node][i]);
  }
}
const convertData = (input) => {

  let graph = new Map();
  const maxRadiud = 20;
  let maxF = -1;
  input.nodes.map(data => {
    graph[data.id] = [];
    maxF = Math.max(maxF, data.frequency);
    seen[data.id] = false;
  });

  input.links.map(data => {
    graph[data.source].push(data.target);
  });

  let isRed = new Map();
  //dfs(graph, "福島");
  let newNodes = [], newLinks = [];
  input.nodes.map(data => {
    let obj = data;
    if(graph[data.id].length > 1) {
      obj['radius'] = 10;
      if(seen[data.id] === true) {
        obj['color'] = 'red';
      } else {
        obj['color'] = 'blue';
      }
      
    }
    obj.num = graph[data.id].length;
    newNodes.push(obj);
  });

  input.links.map(data => {
    if(graph[data.target].length <= 1 || graph[data.source].length <= 1) {

    } else {
      newLinks.push(data);
    }
  });

  console.log(input.nodes);
  console.log(newNodes);
  console.log(newLinks);
  return { nodes: [], links: [] }; // ここを作りましょう！
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
