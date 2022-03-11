import { useEffect, useRef } from 'react';
import { CanvasTextEditor } from '../core/CanvasTextEditor';

function App() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (container.current) {
      new CanvasTextEditor(container.current, {left: 100, top: 100});
    }
  }, []);

  return (
    <div ref={container}></div>
  );
}

export default App;
