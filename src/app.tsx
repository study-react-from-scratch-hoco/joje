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
const reRender = () => {
  console.log('reRender-ing : ', myAppState);
  const rootNode = document.getElementById('myapp'); 
  // 이미 렌더링된 내용을 재설정/정리 
  rootNode.innerHTML = ''; // 기존에 있던 걸 지우고 새로 넣음. 그래서 새 값이 적용 안됨.
  render(<App />, document.getElementById('myapp'));
};

const render = (el, container) => {
  let domEl;

  if (typeof el === 'string') {
    domEl = document.createTextNode(el);
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

let myAppState; //기존의 state를 외부에서 선언
const useState = (initialState) => { 
  // let state = initialState; 
  // console.log('initialState : ', initialState)
  myAppState = myAppState || initialState; // 초기화 아니면 useState 값 넣어줌.
  const setState = (newState) => {
    myAppState = newState;
    console.log('newState : ', newState)
    // 상태가 변경되면 UI를 다시 렌더링 => 화면에 <App /> 를 렌더링 그래서 추가됨. 그래서 새 값이 렌더링 중에 삭제되고 UI 추가됨.
    reRender();
  }
  console.log('myAppState : ', myAppState)
  return [myAppState, setState]; 
};

// ---- 애플리케이션 ---
const Title = (props) => (
  <h2>안녕하세요 {props.name}!</h2>
);

const App = () => { 
  const [name, setName] = useState('Arindam');
   return ( 
    <div draggable> 
      <h2>안녕하세요 {name} !</h2> 
      <p>저는 단락입니다</p> 
      <input 
        type="text" 
        value={name} 
        onchange={(e) => setName(e.target.value)}
       /> 
    </div> 
  ); 
};

render(<App />, document.getElementById('myapp')); 