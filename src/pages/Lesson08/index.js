import React from "react";
import LessonPage from "../../components/LessonPage";
import Chart from "../../components/Chart08";
import instruction from "./instruction.md";
import { arrayReplaceAt } from "markdown-it/lib/common/utils";



const convertData = (input) => {
  let nodes = [], links = [];
  let tag = [], pairs;
  let pairSet = new Set();
  let pairNum = {};
  input.map(data1 => {
    for(let i = 0; i < data1.tags.length; i++) {
      for(let j = i+1; j < data1.tags.length; j++) {
        let maxS = data1.tags[i], minS = data1.tags[j];
        if(minS > maxS) {
          //swap
          let tmp = maxS;
          maxS = minS;
          minS = tmp;
        }

        if(pairSet.has(minS+','+maxS)) {
          pairNum[minS+','+maxS]++;
          //console.log("####43421431241251");
        } else {
          pairNum[minS+','+maxS] = 0;
          pairSet.add(minS+','+maxS);
        }

      }
    }

  });

  
 
  pairs = Array.from(pairSet);
  //console.log(pairs);
  //console.log(pairNum);
  pairs.map(data => {
    if(pairNum[data] >= 1) {
      let idx = data.indexOf(',');
      links.push({source:data.substring(0, idx), target:data.substring(idx+1, data.length)});
      tag.push(data.substring(0, idx)); tag.push(data.substring(idx+1, data.length));
    }

    //console.log(pairNum[data.source+','+data.target]);
  });

  Array.from(new Set(tag)).map(data => {
    nodes.push({id:data});
  });
  console.log({nodes, links});
  return {nodes, links}; // ここを作りましょう！
};

const Lesson = () => {
  return (
    <LessonPage
      answerUrl="/answer08"
      convertData={convertData}
      dataUrl="data/qiita-articles.json"
      instruction={instruction}
      title="Lesson 08"
      Chart={Chart}
    />
  );
};

export default Lesson;
