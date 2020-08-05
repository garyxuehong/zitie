import React from "react";
import "./App.css";

const sample = `《咏鹅》
唐·骆宾王
鹅，鹅，鹅，
曲项向天歌。
白毛浮绿水，
红掌拨清波。 
`;

function App() {
  return (
    <div className="App">
      <div className="source">
        <textarea readOnly={true} value={sample} />
      </div>
      <div className="preview">
        {sample.split("\n").map((l, i) => (
          <Line key={i} line={l} />
        ))}
      </div>
    </div>
  );
}

function Line({ line }) {
  return (
    <div className="line">
      {line.split("").map((c, i) => (
        <Cell key={i} ch={c} />
      ))}
    </div>
  );
}

function Cell({ ch }) {
  return <div className="cell">{ch}</div>;
}

export default App;
