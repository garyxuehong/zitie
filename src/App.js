import React, { useState } from "react";
import "./App.css";
function toPinYin(ch) {
  return "";
}

const CELL_COUNT = 8;

const CH_PAD = <span dangerouslySetInnerHTML={{ __html: "&nbsp;" }} />;

const sample = `《咏鹅》
唐·骆宾王
鹅，鹅，鹅，
曲项向天歌。
白毛浮绿水，
红掌拨清波。 
`;

class AppContainer extends React.Component {
  render() {
    return <App />;
  }
}

function App() {
  let [text, updateText] = useState(sample);
  let [data, updateData] = useState(prepareData(sample));
  function prepareData(t) {
    const data = t
      .trim()
      .split("\n")
      .map((line) => {
        return pad(line.split("")).map((ch) => {
          return { ch, py: "" };
        });
      });
    return data;
  }
  function convertData(t) {
    const newData = prepareData(t);
    newData.forEach(line=>{
      line.forEach(async c=>{
        c.py = await toPinYin(c.ch);
      });
    });
    updateData(newData);
  }
  function onTextChange(e) {
    const newText = e.target.value;
    updateText(newText);
    convertData(newText);
  }
  return (
    <>
      <div className="source">
        <textarea
          rows="20"
          cols="10"
          value={text}
          onInput={onTextChange}
          onChange={onTextChange}
        />
      </div>
      <div className="preview">
        {data.map((l, i) => <Line key={i} line={l} />)}
      </div>
    </>
  );
}

function Line({ line }) {
  return (
    <div className="line">
      {line.map((c, i) => (
        <Cell key={i} c={c} />
      ))}
    </div>
  );
}

function pad(arChars) {
  const topad = CELL_COUNT - arChars.length;
  for (let i = 0; i < topad; i++) {
    arChars.push(CH_PAD);
  }
  return arChars;
}

function Cell({ c }) {
  return (
    <div className="cell">
      <div className="dline" />
      <div className="dline">{c.py}</div>
      <div className="dline" />
      <div className="cellInner">
        <div className="cellHorizontal" />
        <div className="cellVertical" />
        {c.ch}
      </div>
    </div>
  );
}

export default AppContainer;
