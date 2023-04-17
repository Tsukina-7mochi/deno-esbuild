import './someModule.ts';
import './style.scss';
import App from './App.tsx';
import ReactDOM from 'react-dom';

globalThis.addEventListener('load', () => {
  document.querySelector('button')?.addEventListener('click', () => {
    window.alert('Hello esbuild!');
  });

  const reactRoot = document.getElementById('reactRoot');
  console.log(reactRoot);
  if (!reactRoot) {
    throw Error('Failed to get #reactRoot');
  }

  ReactDOM.render(App(), reactRoot);
});
