import React, { useState } from "react";
import "./App.css";

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
  const [text, updateText] = useState(sample);
  return (
    <>
      <div className="source">
        <textarea
          rows="20"
          cols="10"
          value={text}
          onInput={(e) => e.target.value && updateText(e.target.value)}
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
      {line.split("").map((c, i) => (
        <Cell key={i} ch={c} />
      ))}
    </div>
  );
}

function Cell({ ch }) {
  return <div className="cell">{ch}</div>;
}

export default AppContainer;
