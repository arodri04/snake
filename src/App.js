import React, { Component } from "react";
import Snakepieces from "./Snakepiece";
import Food from "./Food.js";
import "./App.css";

const getRandomFood = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return [x, y];
};

const initialState = {
  direction: "RIGHT",
  speed: 200,
  food: getRandomFood(),
  snakepieces: [[0, 0], [2, 0]]
};

class App extends Component {
  state = initialState;

  componentDidMount() {
    setInterval(this.snakeMove, this.state.speed);
    document.onkeydown = this.onKeyDown;
  }

  componentDidUpdate() {
    this.isOutOfBounds();

    this.isBittin();
    this.snakeEat();
  }

  onKeyDown = e => {
    e = e || window.event;
    switch (e.keyCode) {
      case 37:
        this.setState({ direction: "LEFT" });
        break;

      case 38:
        this.setState({ direction: "UP" });
        break;

      case 39:
        this.setState({ direction: "RIGHT" });
        break;

      case 40:
        this.setState({ direction: "DOWN" });
        break;
    }
  };

  snakeMove = () => {
    let dots = [...this.state.snakepieces];
    let head = dots[dots.length - 1];

    switch (this.state.direction) {
      case "LEFT":
        head = [head[0] - 2, head[1]];
        break;
      case "RIGHT":
        head = [head[0] + 2, head[1]];
        break;
      case "UP":
        head = [head[0], head[1] - 2];
        break;
      case "DOWN":
        head = [head[0], head[1] + 2];
        break;
    }

    dots.push(head);
    dots.shift();
    this.setState({
      snakepieces: dots
    });
  };

  snakeEat() {
    let head = this.state.snakepieces[this.state.snakepieces.length - 1];
    let food = this.state.food;
    if (head[0] == food[0] && head[1] == food[1]) {
      this.setState({ food: getRandomFood() });
      this.enlargeSnake();
      this.faster();
    }
  }

  enlargeSnake() {
    let newSnake = [...this.state.snakepieces];
    newSnake.unshift([]);
    this.setState({
      snakepieces: newSnake
    });
  }

  faster() {
    let nspeed = this.state.speed - 10;

    this.setState({ speed: nspeed });
  }

  isBittin() {
    let snake = [...this.state.snakepieces];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach(dot => {
      if (head[0] == dot[0] && head[1] == dot[1]) {
        this.onGameOver();
      }
    });
  }

  isOutOfBounds() {
    let head = this.state.snakepieces[this.state.snakepieces.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      this.onGameOver();
    }
  }

  onGameOver() {
    alert(`Game Over. Score is ${this.state.snakepieces.length}`);
    this.setState(initialState);
  }

  render() {
    return (
      <div>
        <div className="screen">
          <Snakepieces snakepieces={this.state.snakepieces} />
          <Food dot={this.state.food} />
        </div>
        Score: {this.state.snakepieces.length - 2}
      </div>
    );
  }
}

export default App;
