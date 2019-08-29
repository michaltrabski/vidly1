import React, { Component } from "react";
import Movies from "./components/movies";

class App extends Component {
  render() {
    return (
      <main className="container mt-5">
        <Movies />
      </main>
    );
  }
}

export default App;
