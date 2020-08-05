import React, { useState } from "react";
import "./App.css";

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
  text = text.trim();
  return (
    <>
      <div className="source">
        <textarea
          rows="20"
          cols="10"
          value={text}
          onInput={(e) => e.target.value && updateText(e.target.value)}
          onChange={(e) => e.target.value && updateText(e.target.value)}
        />
      </div>
      <div className="preview">
        {text && text.split("\n").map((l, i) => <Line key={i} line={l} />)}
      </div>
    </>
  );
}

function Line({ line }) {
  return (
    <div className="line">
      {pad(line.split("")).map((c, i) => (
        <Cell key={i} ch={c} />
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

function Cell({ ch }) {
  return (
    <div className="cell">
      <div className="dline1" />
      <div className="dline2" />
      <div className="cellInner">
        <div className="cellHorizontal" />
        <div className="cellVertical" />
        {ch}
      </div>
    </div>
  );
}

export default AppContainer;
