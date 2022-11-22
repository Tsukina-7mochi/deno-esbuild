import './someModule.ts';
import './style.scss';

globalThis.addEventListener('click', () => {
  document.querySelector('button')?.addEventListener('click', () => {
    window.alert("Hello esbuild!")
  });
});
