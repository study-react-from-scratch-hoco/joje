// ---- 도서관 ---
const React = {
  createElement: (tag, props, ...children) => {
    // ReactComponent인 경우 (함수인 경우)
    if (typeof tag === 'function') {
      return tag(props, ...children);
    }

    // ReactElement인 경우 (일반 HTML 태그인 경우)
    const el = {
      tag,
      props,
      children
    };
    
    console.log('Created Virtual DOM:', el);
    return el;
  }
};

// Virtual DOM을 실제 DOM으로 변환하는 렌더 함수
const render = (el, container) => {
  // domEl은 텍스트노드가 될 수도, HTML 엘리먼트가 될 수도 있어서 let 사용
  let domEl;

  // 문자열이면 텍스트 노드로 처리
  // 더 이상의 처리가 필요 없으므로 return으로 종료
  if (typeof el === 'string') {
    domEl = document.createTextNode(el);
    container.appendChild(domEl);
    return;
  }

  // Virtual DOM의 tag 속성으로 실제 DOM 엘리먼트 생성
  domEl = document.createElement(el.tag);

  // Virtual DOM의 props를 실제 DOM 엘리먼트의 속성으로 설정
  if (el.props) {
    Object.keys(el.props).forEach(prop => {
      domEl[prop] = el.props[prop];
    });
  }

  // 자식 요소가 있으면 재귀적으로 처리
  // 자식이 여러 개일 수 있으므로 forEach로 순회
  if (el.children) {
    el.children.forEach(child => {
      render(child, domEl);  // 재귀적으로 자식 요소도 렌더링
    });
  }

  // 생성된 DOM 엘리먼트를 부모 컨테이너에 추가
  container.appendChild(domEl);
};

// ---- 애플리케이션 ---
// React 컴포넌트: props를 받아서 재사용 가능한 UI 조각을 반환하는 함수
const Title = (props) => (
  <h2>안녕하세요 {props.name}!</h2>
);

// Virtual DOM 트리 구성
// - Title 컴포넌트를 재사용하며 props로 데이터 전달
// - 이 구조가 render 함수를 통해 실제 DOM으로 변환됨
const App = (
  <div draggable>
    <Title name="React" />
    <p>나는 단락이에요</p>
    <input type="text" />
  </div>
);

// Virtual DOM을 실제 DOM으로 변환하여 화면에 렌더링
render(App, document.getElementById('myapp')); 