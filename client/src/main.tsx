import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Suppress ResizeObserver loop completed with undelivered notifications
const resizeObserverErrReporter = window.ResizeObserver;
window.ResizeObserver = class ResizeObserver extends resizeObserverErrReporter {
  constructor(callback: ResizeObserverCallback) {
    const wrappedCallback: ResizeObserverCallback = (entries, observer) => {
      window.requestAnimationFrame(() => {
        callback(entries, observer);
      });
    };
    super(wrappedCallback);
  }
};

// Also suppress the error globally
const originalError = console.error;
console.error = (...args: any[]) => {
  if (typeof args[0] === 'string' && args[0].includes('ResizeObserver loop completed with undelivered notifications')) {
    return;
  }
  originalError.apply(console, args);
};

createRoot(document.getElementById("root")!).render(<App />);
