import React, { Component } from 'react';
import ReactDOM from "react-dom";
import Grid from "./components/grid";
import Buttons from "./components/buttons";
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

  selectBox = (row, col) => {
    let gridClone = arrayClone(this.state.gridFull);
    gridClone[row][col] = !gridClone[row][col];
    this.setState({
      gridFull: gridClone
    });
  }

  populate = () => {
    let gridClone = arrayClone(this.state.gridFull);
    for(var i=0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        if(Math.floor(Math.random() *4) == 1) {
          gridClone[i][j] = true;
        }
      } 
    }
    this.setState({
      gridFull: gridClone
    });
  }

  playButton = () => {
    clearInterval(this.interval);
    this.interval = setInterval(this.play, this.speed);
  }

  pauseButton = () => {
    clearInterval(this.interval);
  }

  clear = () => {
    this.setState({
      gridFull: Array(this.rows).fill(Array(this.cols).fill(false)),
      generation: 0
    });
    this.pauseButton();
  }

  slow = () => {
    this.speed = 1000;
    this.playButton();
  }

  fast = () => {
    this.speed = 100;
    this.playButton();
  }

  play = () => {
    let grid = this.state.gridFull;
    let grid2 = arrayClone(this.state.gridFull);

    for(let i=0; i < this.rows; i++) {
      for(let j=0; j < this.cols; j++) {
        let neighbours = 0;
        if (i > 0) if (grid[i - 1][j]) neighbours++; // Top
        if (i > 0 && j > 0) if (grid[i - 1][j - 1]) neighbours++; // Top Left (diagonally)
        if (i > 0 && j < this.cols - 1) if (grid[i - 1][j + 1]) neighbours++; // Top Right (diagonally)
        if (j < this.cols - 1) if (grid[i][j + 1]) neighbours++; // Right
        if (j > 0) if (grid[i][j - 1]) neighbours++; // Left
        if (i < this.rows - 1) if (grid[i + 1][j]) neighbours++; // Bottom
        if (i < this.rows - 1 && j > 0) if (grid[i + 1][j - 1]) neighbours++; // Bottom Left (diagonally)
        if (i < this.rows - 1 && this.cols - 1) if (grid[i + 1][j + 1]) neighbours++; // Bottom Right (diagonally)
        if (grid[i][j] && (neighbours < 2 || neighbours > 3)) grid2[i][j] = false;
        if (!grid[i][j] && neighbours === 3) grid2[i][j] = true;
      }
    }

    this.setState({
      gridFull: grid2,
      generation: this.state.generation + 1
    })
  }

  gridSize = (size) => {
    switch (size) {
      case "1":
        this.rows = 10;
        this.cols = 20;
        break;
      case "2":
        this.rows = 30;
        this.cols = 50;
        break;
      default:
        this.rows = 50;
        this.cols = 70;
    }
    this.clear();
  }

  componentDidMount() {
    this.populate();
    this.playButton();  
  }

  render() {
    return (
      <div>
        <h1>Game of Life</h1>
        <Buttons playButton={this.playButton} pauseButton={this.pauseButton} clear={this.clear} slow={this.slow} fast={this.fast} populate={this.populate} gridSize={this.gridSize} />
        <Grid gridFull={ this.state.gridFull } rows={ this.rows } cols={ this.cols } selectBox={ this.selectBox }/>
        <h2>Generations: { this.state.generation } </h2>
      </div>
    );
  }
}

function arrayClone(arr) {
  return JSON.parse(JSON.stringify(arr));
}

ReactDOM.render(<App/>, document.getElementById('root'));