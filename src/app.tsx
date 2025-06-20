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

const useState = (initialState) => { 
  let state = initialState; 
  console.log('initialState : ', initialState)
  const setState = (newState) => {
    state = newState;
    console.log('newState : ', newState)
  }
  console.log('state : ', state)
  return [state, setState]; 
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