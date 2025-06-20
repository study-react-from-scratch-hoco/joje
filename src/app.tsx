// ---- 도서관 ---
const React = {
  createElement: (tag, props, ...children) => {
    // Virtual DOM 객체를 생성하여 반환
    const el = {
      tag, //HTML 태그 이름(div, h2, p, input 등)
      props, //속성들(draggable, type 등)
      children //자식 요소들(h2, p, input 등)
    };
    
    console.log('Created Virtual DOM:', el); // 콘솔에 찍으면 가상 돔 객체 출력
    return el;
  }
};

// ---- 애플리케이션 ---
const App = (
    <div draggable>
      <h2>Hello React!</h2>
      <p>I am a pargraph</p>
      <input type="text" />
    </div>
  );

console.log(App); 