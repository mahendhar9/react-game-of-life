import React, { Component } from 'react';
import ReactDOM from "react-dom";
import Grid from "./components/grid";
import './index.css';

class App extends Component {
  constructor() {
    super();
    this.speed = 100;
    this.rows = 30;
    this.cols = 50;

    this.state = {
      generation: 0,
      gridFull: Array(this.rows).fill(Array(this.cols).fill(false))
    }
  }

  selectBox = () => {

  }
  
  render() {
    return (
      <div>
        <h1>Game of Life</h1>
        <Grid gridFull={ this.state.gridFull } rows={ this.rows } cols={ this.cols } selectBox={ this.selectBox }/>
        <h2>Generations: { this.state.generation } </h2>
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));