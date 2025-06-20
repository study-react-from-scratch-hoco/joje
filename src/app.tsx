// ---- 도서관 ---
const React = {
  createElement: (tag, props, ...children) => {
    // ReactComponent인 경우 (함수인 경우)
    if (typeof tag === 'function') {
      return tag(props, ...children);
    }

    // ReactElement인 경우 (일반 HTML 태그인 경우)
    const el = {
      tag, //HTML 태그 이름(div, h2, p, input 등)
      props, //속성들(draggable, type 등)
      children //자식 요소들(h2, p, input 등)
    };
    
    console.log('Created Virtual DOM:', el);
    return el;
  }
};

// ---- 애플리케이션 ---
// ReactComponent 예시
const Title = (props) => (
  <h2>안녕하세요 {props.name}!</h2>
);

// ReactComponent를 사용하는 App
const App = (
  <div draggable>
    <Title name="React" />
    <p>나는 단락이에요</p>
    <input type="text" />
  </div>
);

console.log('최종 App의 Virtual DOM:', App); 