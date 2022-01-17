import { useEffect, useRef } from 'react';
import { CanvasTextEditor } from '../core/CanvasTextEditor';

function App() {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvas.current) {
      new CanvasTextEditor(canvas.current);
    }
  }, []);

  return (
    <div>
      <canvas ref={canvas} width="800" height="600"/>
    </div>
  );
}

export default App;
