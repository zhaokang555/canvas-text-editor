import { FormEvent, useEffect, useRef, useState } from 'react';
import { CanvasTextEditor } from '../core/CanvasTextEditor';
import styles from './App.module.scss';

function App() {
  const container = useRef<HTMLDivElement>(null);
  let editor: CanvasTextEditor;

  useEffect(() => {
    if (container.current) {
      editor = new CanvasTextEditor(container.current, {left: 100, top: 100});
    }
  }, []);

  const handleColorChange = (evt: FormEvent<HTMLInputElement>) => {
    editor.setColor((evt.target as HTMLInputElement).value);
  };

  return (
    <>
      <input type="color" onChange={handleColorChange}/>
      <div ref={container}>
        <canvas width="800" height="600" className={styles.canvas}/>
      </div>
    </>
  );
}

export default App;
