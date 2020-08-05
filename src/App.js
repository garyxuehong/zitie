import React, { useState } from "react";
import "./App.css";
import pinyin from "chinese-to-pinyin";

console.log(pinyin("我"));

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

function tryPinyin(ch) {
  try {
    return pinyin(ch);
  } catch (e) {
    return "";
  }
}

function prepareData(t) {
  const data = t
    .trim()
    .split("\n")
    .map((line) => {
      return pad(line.split("")).map((ch) => {
        return { ch, py: tryPinyin(ch) };
      });
    });
  return data;
}

function App() {
  let [text, updateText] = useState(sample);
  let [data, updateData] = useState(prepareData(sample));
  function onTextChange(e) {
    const newText = e.target.value;
    updateText(newText);
    updateData(prepareData(text));
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
        {data.map((l, i) => (
          <Line key={i} line={l} />
        ))}
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
      <div className="dline dlinepy">{c.py}</div>
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
