import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    const cols = [[]];
    for (let i = 0, y = 0; i < 9; i++) {
      if (i % 3 === 0 && i !== 0) {
        y++;
        cols.push([]);
      }
      cols[y].push(this.renderSquare(i));
    }
    const rows = [];
    for (let i = 0; i < 3; i++) {
      rows.push(<div className="board-row">
        {cols[i]}
      </div>);
    }

    return (
      <div>
        {rows}
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        coords: null,
      }],
      stepNumber: 0,
      xIsNext: true,
      asc: true,
    };
  }

  handleClickOnSquare(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    const row = i < 3 ? 1 : i < 6 ? 2 : 3;
    const col = i % 3 + 1;
    this.setState({
      history: [...history, {
        squares: squares,
        coords: [row, col]
      }],
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  sortMoves() {
    this.setState({ asc: !this.state.asc });
  }

  render() {
    const { history, asc } = this.state;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const text = move ?
        'Go to move #' + move + ' (' + step.coords.join(':') + ')' :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={e => {
            this.jumpTo(move);
            const buttons = document.querySelectorAll('ol button');
            buttons.forEach(button => button.style = '');
            e.target.style.fontWeight = 'bold';
          }}>{text}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    let sorted, sortText;
    if (asc) {
      sorted = moves;
      sortText = 'Sort desc';
    } else {
      sorted = moves.sort((a, b) => b.key - a.key);
      sortText = 'Sort asc';
    }      
    const sort = <button
      onClick={() => this.sortMoves()}
      style={{marginLeft:'30px'}}
      >
        {sortText}
      </button>;

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClickOnSquare(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{sorted}</ol>
          <div>{history.length > 1 && sort}</div>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);