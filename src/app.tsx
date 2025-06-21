const React = {
  createElement: (tag, props, ...children) => {
    if (typeof tag === 'function') {
      return tag(props, ...children);
    }

    const el = {
      tag,
      props,
      children
    };
    
    return el;
  }
};

// reRender 함수 추가
// const reRender = () => {
//   const rootNode = document.getElementById('myapp'); 
//   rootNode.innerHTML = '';
//   render(<App />, document.getElementById('myapp'));
// };

const reRender = () => { 
  console.log('reRender-ing :)'); 
  const rootNode = document.getElementById('myapp'); 
  // 이미 렌더링된 내용을 재설정/정리 
  rootNode.innerHTML = ''; 
  // 전역 상태 커서를 재설정: 자체 세터와 리렌더링 주기를 가진 완전히 별도의 상태를 생성
  myAppStateCursor = 0;
   // 그런 다음 렌더링 Fresh 
  render(<App />, rootNode); 
};

const render = (el, container) => {
  let domEl;

  if (typeof el === 'string' || typeof el === 'number') {  // number 타입도 처리
    domEl = document.createTextNode(el.toString());  // 모든 primitive 값을 문자열로 변환
    container.appendChild(domEl);
    return;
  }

  domEl = document.createElement(el.tag);

  if (el.props) {
    Object.keys(el.props).forEach(prop => {
      // 이벤트 핸들러 처리 : onchange 부분 구현
      if (prop.toLowerCase().startsWith('on')) {
        const eventName = prop.toLowerCase().substring(2);
        domEl.addEventListener(eventName, el.props[prop]);
      } else {
        domEl[prop] = el.props[prop];
      }
    });
  }

  if (el.children) {
    el.children.forEach(child => {
      render(child, domEl);
    });
  }

  container.appendChild(domEl);
};

const myAppState = [];
let myAppStateCursor = 0;

const useState = (initialState) => {
  const stateCursor = myAppStateCursor;
  myAppState[stateCursor] = myAppState[stateCursor] || initialState;
  console.log(
    `useState is initialized at cursor ${stateCursor} with value:`,
    myAppState
  );
  const setState = (newState) => {
    console.log(
      `setState is called at cursor ${stateCursor} with newState value:`,
      newState
    );
    myAppState[stateCursor] = newState;
    reRender();
  };
  myAppStateCursor++;
  // console.log(`stateDump`, myAppState);
  return [myAppState[stateCursor], setState];
};


// ---- 애플리케이션 ---
const Title = (props) => (
  <h2>안녕하세요 {props.name}!</h2>
);

const App = () => { 
  const [name, setName] = useState('Arindam');
  const [count, setCount] = useState(0);
   return ( 
    <div draggable> 
      <h2>안녕하세요 {name} !</h2> 
      <p>저는 단락입니다</p> 
      <input 
        type="text" 
        value={name} 
        onchange={(e) => setName(e.target.value)}
       /> 
       <h2> 카운터 값: {count.toString()}</h2> 
      <button onclick={() => setCount(count + 1)}>+1</button> 
      <button onclick={() => setCount(count - 1)}>-1</button>
    </div> 
  ); 
};

render(<App />, document.getElementById('myapp')); 