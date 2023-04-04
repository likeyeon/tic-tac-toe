import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Square(props) {
    return (
      <button className={props.className} onClick = {props.onClick}>
        {props.value}
      </button>
    );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        key={i}
        className = {
          this.props.squareStyle !== "square" ? 
          (this.props.squareStyle.includes(i) ? "square color" : "square") : "square"
        }
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}/>
    );
  }

  render() {
    let boards = [[0,1,2],[3,4,5],[6,7,8]];
    return (
      boards.map((a) => {
        return (
          <div className="board-row" key={a[0]}>
          {a.map((b) => {
            return (
              this.renderSquare(b)
            )
          })}
          </div>
        );
      })
    )
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
      sortFlag: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i])
      return;
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        // 개선1 : 행(=row)과 열(=col)을 추가
        row : Math.floor(i / 3) + 1,
        col : i % 3 + 1,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    })
  }

  sortClick() {
    this.setState({
      sortFlag: !this.state.sortFlag,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    let moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move + '(' + step.row + ', ' + step.col + ')':
        'Go to game start';
      // 현재 순서와 일치하는 인덱스(=move)의 버튼 텍스트를 볼드 처리
      const bold = (move === this.state.stepNumber ? 'bold' : 'normal');
      return (
        <li key={move}>
          <button
            className={bold}
            onClick={() => this.jumpTo(move)}>{desc}
          </button>
        </li>
      );
    })
    let status;
    if (!current.squares.includes(null) && winner === null)
      status = "무승부";
    else if (winner)
      status = 'Winner: ' + (!this.state.xIsNext ? 'X' : 'O');
    else
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

    let sort; // 정렬 변수
    sort = this.state.sortFlag ? '오름차순' : '내림차순';

    if (!this.state.sortFlag) // 내림차순의 경우 li의 순서 반대로 바뀜
      moves.reverse();

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squareStyle={winner ? winner : "square"}
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button onClick={() => this.sortClick()}>{sort}</button>
          <ol reversed={!this.state.sortFlag}>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);

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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) { // 승리의 조건을 맞춘 경우
      const squaresWin = [a,b,c];
      return squaresWin;
    }
  }
  return null;
}
