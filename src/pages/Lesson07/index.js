import React from "react";
import LessonPage from "../../components/LessonPage";
import Chart from "../../components/Chart07";
import instruction from "./instruction.md";

function getStringFromDate(date) {
  let year_str = date.getFullYear();
  let month_str = 1 + date.getMonth();
  let day_str = date.getDate();

  month_str = ('0' + month_str).slice(-2);
  day_str = ('0' + day_str).slice(-2);
  

  let format_str = 'YYYY-MM-DD';
  format_str = format_str.replace(/YYYY/g, year_str);
  format_str = format_str.replace(/MM/g, month_str);
  format_str = format_str.replace(/DD/g, day_str);

  return format_str;
}

const convertData = (input) => {
  let tmp = [];
  let res = [];
  input.map(data => {
    let datetmp = data["createdAt"];
    datetmp = datetmp.slice(0, 10) + 'T' + datetmp.slice(11, datetmp.length);
    let localtime = new Date(datetmp);
    localtime.setHours(localtime.getHours()+9);
    tmp.push({isRetweet: data.isRetweet, date:getStringFromDate(localtime)});
  });

  console.log(tmp);

  let data1 = {}, data2 = {};
  tmp.map(data => {
    if(data.isRetweet) {
      data1[data.date] = 0;
    } else {
      data2[data.date] = 0;
    }
  });

  tmp.map(data => {
    if(data.isRetweet) {
      data1[data.date] ++;
    } else {
      data2[data.date] ++;
    }
  });

  console.log(data1); console.log(data2);
  console.log(data1.length);

  let dataArray = [];

  Object.keys(data2).forEach(function (key) {
    dataArray.push({x: key, y:data2[key]});
  });
  res.push({id:"retweet", data:dataArray});

  Object.keys(data1).forEach(function (key) {
    dataArray.push({x: key, y:data1[key]});
  });
  res.push({id:"tweet", data:dataArray});

  return res; // ここを作りましょう！
};

const Lesson = () => {
  return (
    <LessonPage
      answerUrl="/answer07"
      convertData={convertData}
      dataUrl="data/covid19-tweets.json"
      instruction={instruction}
      title="Lesson 07"
      Chart={Chart}
    />
  );
};

export default Lesson;
