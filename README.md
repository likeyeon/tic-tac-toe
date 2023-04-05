# tic-tac-toe | React Practice
리액트 찍먹을 위해 [공식문서](https://ko.reactjs.org/tutorial/tutorial.html#lifting-state-up)를 참고하면서 만든 미니 게임

<img src="https://user-images.githubusercontent.com/94125863/229985090-21c860d7-56c5-4319-af74-9f6c17e9e8cc.gif"  width="40%" height="40%"/>

## 📚 What I Learn
#### ✔️ 컴포넌트란? `JSX` 문법을 사용하여 재사용 가능한 `Element`를 반환하는 함수 또는 클래스 <br>
**클래스형 컴포넌트**는 `React.Component`를 상속받고 `render()`메서드를 통해 `JSX`를 반환
```javascript
// functional components
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// class components
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

#### ✔️ `props`와 `state`
**React에서 구성 요소가 데이터를 받거나 처리하고 보내기 위해 사용됨.**
- **State**는 내부 (컴포넌트)에서 생성하고 활동하고, 데이터를 변경할 수 있음.<br>
- **Props**는 외부(부모 컴포넌트)에서 상속 받는 데이터이며, 데이터를 변경할 수 없음.
```javascript
function Square(props) {
    return (
      <button className=square onClick = {props.onClick}>
        {props.value}
      </button>
    );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        key={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}/>
    );
  }
```

#### ✔️ 클래스형 컴포넌트는 항상 `props`로 기본 `constructor`를 호출해야 한다.
클래스형 컴포넌트에서 상태 관리를 위해 `state`를 선언 할 때에는 **`constructor` 내부에서 `this.state`를 설정한다.**
```javascript
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
    };
  }
```
#### ✔️ 같은 컴포넌트 혹은 `JSX` 요소들을 반복하여 랜더링하면 `key Warning` 오류 발생
	Warning: Each child in a list should have a unique "key" prop.
**`key` 값을 설정해주면 오류 해결**
- ⚠️ 간혹 배열의 인덱스를 기본값으로 사용하기도 하는데 생성, 제거, 수정 등 **동적인 리스트를 사용한다면 반드시 unique한 `key` 값을 설정**해야 한다.
```javascript
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
  ```
  
## 💡 느낀점
- `Vanilla JS` 를 이용할 때 반복되는 코드 작성의 불편함을 `React`의 컴포넌트 재사용 기능으로 보완할 수 있는 점이 좋았다.<br>
- `state`와 `props`의 상태관리를 통해 업데이트 되는 값만 렌더링할 수 있는 점이 굉장히 효율적이라고 느꼈다.<br>
- 리액트의 기초를 다지기 위해 클래스형 컴포넌트 방식으로 공부를 하였는데, 함수형 컴포넌트는 어떻게 달라질 지 기대가 된다.

