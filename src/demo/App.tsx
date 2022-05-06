import { useEffect, useRef, useState } from 'react';
import { CanvasTextEditor, EventType } from '../core/CanvasTextEditor';
import styles from './App.module.scss';

function App() {
  const container = useRef<HTMLDivElement>(null);
  let editor: CanvasTextEditor;
  const [color, setColor] = useState('#000000');

  useEffect(() => {
    if (container.current) {
      editor = new CanvasTextEditor(container.current, {left: 100, top: 100});
      editor.on(EventType.colorChange, (val: string) => {
        setColor(val);
      });
    }
    return () => editor && editor.destructor();
  }, []);

  const handleColorChange = (val: string) => {
    setColor(color);
    editor.setColor(val);
  };

  return (
    <>
      <input type="color" value={color} onChange={evt => handleColorChange(evt.target.value)}/>
      <div ref={container}>
        <canvas width="800" height="600" className={styles.canvas}/>
      </div>
    </>
  );
}

export default App;
