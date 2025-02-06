import React, { useRef, useState } from 'react';

function MyComponent({ count }) {
  console.log('MyComponent re-rendered!');
  return <div>Count: {count}</div>;
}

function RefDemo() {
  const countRef = useRef(0); // Biến ref, không gây re-render
  const [renderCount, setRenderCount] = useState(0); // Biến state, gây re-render

  // Tăng giá trị ref (không gây re-render)
  const increment = () => {
    countRef.current += 1;
    console.log('Giá trị countRef:', countRef.current);
  };

  // Gây re-render
  const forceRender = () => {
    setRenderCount(renderCount + 1);
  };

  // Reset cả ref và state
  const reset = () => {
    countRef.current = 0;
    setRenderCount(0);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <p>Giá trị countRef (không render): {countRef.current}</p>
      <p>Số lần render: {renderCount}</p>
      <button onClick={increment}>Increment (Không render)</button>
      <button onClick={forceRender} style={{ margin: '0 10px' }}>
        Force Render
      </button>
      <button onClick={reset}>Reset</button>

      {/* Sử dụng MyComponent */}
      <MyComponent count={renderCount} />
    </div>
  );
}

export default RefDemo;
