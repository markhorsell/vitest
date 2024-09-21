

import '@testing-library/jest-dom/vitest';
import ResizeObserver from 'resize-observer-polyfill';
import { server } from './mocks/server';

beforeAll(()=>{
  server.listen()
})
afterEach(()=>{
  server.resetHandlers()
})
afterAll(()=>{
  server.close()
})

global.ResizeObserver=ResizeObserver;

window.HTMLElement.prototype.scrollIntoView = vi.fn();
window.HTMLElement.prototype.hasPointerCapture = vi.fn();
window.HTMLElement.prototype.releasePointerCapture = vi.fn();

Object.defineProperty(window, 'matchMedia', {
    writable: true,
   // eslint-disable-next-line 
    value: (query: any) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => {},
    })
  });