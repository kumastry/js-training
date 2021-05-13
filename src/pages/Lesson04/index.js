import React from "react";
import LessonPage from "../../components/LessonPage";
import Chart from "../../components/Chart04";
import instruction from "./instruction.md";

const convertData = (input) => {
  let speciesArray = [];
  input.map(data => {
    speciesArray.push(data.species);
  });

  const speci = Array.from(new Set(speciesArray));
  let res = [];
  for(let i = 0; i < speci.length; i++) {
    let data = [];
    for(let j = 0; j < input.length; j++) {
      if(input[j].species == speci[i]) {
        data.push({x:input[j].sepalLength, y:input[j].petalWidth});
      }
    }
    res.push({id:speci[i], data:data});
  }

  return res;
};

const Lesson = () => {
  return (
    <LessonPage
      answerUrl="/answer04"
      dataUrl="data/iris.json"
      convertData={convertData}
      instruction={instruction}
      title="Lesson 04"
      Chart={Chart}
    />
  );
};

export default Lesson;
