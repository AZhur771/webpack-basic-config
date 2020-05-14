import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  render() {
    return (
      <header>
        <h1>{this.props.title}</h1>
      </header>
    );
  }
}

const container = document.getElementById("root");
const title = "Hello, world!";

ReactDOM.render(<App title={title} />, container);
