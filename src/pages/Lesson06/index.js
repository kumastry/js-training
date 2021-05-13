import React from "react";
import LessonPage from "../../components/LessonPage";
import Chart from "../../components/Chart06";
import instruction from "./instruction.md";

const convertData = (input) => {
  let res = [];
  input.map(data => {
    let obj = {};
    if(data.gender == "男性") {
      obj.color = "blue";
    } else {
      obj.color = "red";
    }

    obj.gender = data.gender;
    obj.weight = data.x;
    obj.height = data.y;
    const meter = data.y / 100.0;
    obj.bmi = data.x / (meter * meter);
    res.push(obj);
  });

  return res; // ここを作りましょう！
};

const Lesson = () => {
  return (
    <LessonPage
      answerUrl="/answer06"
      convertData={convertData}
      dataUrl="data/size-and-weight.json"
      instruction={instruction}
      title="Lesson 06"
      Chart={Chart}
    />
  );
};

export default Lesson;
