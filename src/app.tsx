const React = {
  createElement: (tag, props, ...children) => {
    if (typeof tag === 'function') {
      try {
        return tag(props, ...children);
      } catch ({ promise, key }) {
        // Promise가 throw되면 여기서 캐치
        promise.then((value) => {
          resourceCache[key] = value;  // 결과를 캐시에 저장
          reRender();  // UI 다시 렌더링
        });
        // 대체 UI 반환 - 현재 로딩 중인 리소스의 key를 표시
        return { tag: 'h2', props: null, children: [`이미지 로딩 중... (key: ${key})`] };
      }
    }

    const el = {
      tag,
      props,
      children
    };
    
    return el;
  }
};

// 타입 정의
interface ResourceCache {
  [key: string]: string;
}

interface ResourceTasks {
  [key: string]: () => Promise<string>;
}

interface Photos {
  photo1: string;
  photo2: string;
}

const reRender = () => { 
  console.log('reRender-ing :)'); 
  const rootNode = document.getElementById('myapp'); 
  rootNode.innerHTML = ''; 
  myAppStateCursor = 0;
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
  return [myAppState[stateCursor], setState];
};

// ---- 원격 API ---- // 
const photoURL = 'https://picsum.photos/200'; 
const getMyAwesomePic = () => { 
  return new Promise<string>((resolve, reject) => { 
    setTimeout(() => resolve(photoURL), 1500); 
  }); 
};

// Suspense를 위한 리소스 캐시 및 생성 함수
const resourceCache: ResourceCache = {}; 

// 여러 리소스를 한번에 처리하는 함수
const createResources = (tasks: ResourceTasks): Photos => {
  // 이미 모든 리소스가 캐시에 있는지 확인
  const allCached = Object.keys(tasks).every(key => resourceCache[key]);
  if (allCached) {
    return Object.keys(tasks).reduce((acc, key) => {
      acc[key] = resourceCache[key];
      return acc;
    }, {} as Photos);
  }

  // 아직 로드되지 않은 리소스가 있다면
  const promises = Object.entries(tasks).map(([key, task]) => {
    if (resourceCache[key]) return Promise.resolve();
    return task().then(value => {
      resourceCache[key] = value;
    });
  });

  throw { 
    promise: Promise.all(promises),
    key: Object.keys(tasks).join(',')
  };
};

const createResource = (asyncTask: () => Promise<string>, key: string): string => { 
  if (resourceCache[key]) return resourceCache[key]; 
  throw { promise: asyncTask(), key };
};

// ---- 애플리케이션 ---
const Title = (props: { name: string }) => (
  <h2>안녕하세요 {props.name}!</h2>
);

const App = () => { 
  const [name, setName] = useState('Arindam'); 
  const [count, setCount] = useState(0);

  // 여러 리소스를 한번에 요청
  const photos = createResources({
    photo1: getMyAwesomePic,
    photo2: getMyAwesomePic
  });

  return ( 
    <div draggable> 
      <h2>안녕하세요 {name}님!</h2> 
      <p>저는 단락입니다</p> 
      <input 
        type="text" 
        value={name} 
        onchange={(e) => setName(e.target.value)} 
      /> 
      <h2> 카운터 값: {count}</h2> 
      <button onclick={() => setCount(count + 1)}>+1</button> 
      <button onclick={() => setCount(count - 1)}>-1</button> 
      <h2>저희 사진 앨범</h2> 
      <img src={photos.photo1} alt="Photo1" /> 
      <img src={photos.photo2} alt="Photo2" />
    </div> 
  ); 
};

render(<App />, document.getElementById('myapp')); 