import React from "react";
import LessonPage from "../../components/LessonPage";
import Chart from "../../components/Chart05";
import instruction from "./instruction.md";

const convertData = (input) => {
  let tmp = [];
  let res = [];
  let maxhei = -1;
  let minhei = 1000;
  for(let i = 0; i < input.length; i++) {
    tmp.push({gender:input[i].gender, height:Math.round(input[i].y)});
    maxhei = Math.max(maxhei, tmp[i].height);
    minhei = Math.min(minhei, tmp[i].height);
  }

  console.log(tmp);
  let heiobjM = {};
  let heiobjF = {}
  for(let i = minhei; i <= maxhei; i++) {
    heiobjM[String(i)] = 0;
    heiobjF[String(i)] = 0;
  }

  for(let i = 0; i < tmp.length; i++) {
    if(tmp[i].gender == "男性") {
      heiobjM[String(tmp[i].height)]++;
    } else {
      heiobjF[String(tmp[i].height)]++;
    }
  }

  for(let i = minhei; i <= maxhei; i++) {
    res.push({"bin":String(i), "男性": heiobjM[String(i)], "女性":heiobjF[String(i)]});
  }

  console.log(res);
  return res; // ここを作りましょう！
  
};

const Lesson = () => {
  return (
    <LessonPage
      answerUrl="/answer05"
      convertData={convertData}
      dataUrl="data/size-and-weight.json"
      instruction={instruction}
      title="Lesson 05"
      Chart={Chart}
    />
  );
};

export default Lesson;
