/*!
 * External js:
 * MoveTo https://github.com/hsnaydd/moveTo MIT
 * lite-youtube-embed https://github.com/paulirish/lite-youtube-embed MIT
 */
/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
class Tabs {
  constructor(root) {
    this.root = root;
    this.head = this.root.querySelector(':scope > [data-head]');
    this.list = this.root.querySelector(':scope > [data-list]');
    this.buttons = new Map([...this.list.querySelectorAll(':scope > [data-target]')].map(entry => [entry.dataset.target, entry]));
    this.containers = new Map([...this.root.querySelectorAll(':scope > [data-tab]')].map(entry => [entry.dataset.tab, entry]));
    this.salt = Math.random().toString(36).slice(2);
    this.current = null;
    this.active = null;
  }
  static create(element) {
    const instance = new Tabs(element);
    instance.init();
    return instance;
  }
  select(name) {
    const keys = [...this.buttons.keys()];
    for (const [key, button] of this.buttons.entries()) {
      if (key === name) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    }
    for (const [key, container] of this.containers.entries()) {
      if (key === name) {
        container.classList.add('active');
      } else {
        container.classList.remove('active');
      }
    }
    this.active = keys.indexOf(name);
  }
  init() {
    const keys = [...this.buttons.keys()];
    this.list.setAttribute('role', 'tablist');
    this.list.addEventListener('keydown', event => {
      if (event.code === 'Home') {
        event.preventDefault();
        this.buttons.get(keys[0]).focus();
      }
      if (event.code === 'End') {
        event.preventDefault();
        this.buttons.get(keys[keys.length - 1]).focus();
      }
      if (event.code === 'ArrowLeft') {
        event.preventDefault();
        this.buttons.get(keys[Math.max(0, this.current - 1)]).focus();
      }
      if (event.code === 'ArrowRight') {
        event.preventDefault();
        this.buttons.get(keys[Math.min(keys.length - 1, this.current + 1)]).focus();
      }
    });
    for (const [key, button] of this.buttons.entries()) {
      button.setAttribute('tabindex', '0');
      button.setAttribute('id', `button_${this.salt}_${key}`);
      button.setAttribute('role', 'tab');
      button.setAttribute('aria-controls', `container_${this.salt}_${key}`);
      button.addEventListener('click', event => {
        event.preventDefault();
        this.select(key);
      });
      button.addEventListener('focus', event => {
        this.current = keys.indexOf(key);
      });
      button.addEventListener('keypress', event => {
        if (event.code === 'Enter' || event.code === 'Space') {
          event.preventDefault();
          this.select(key);
        }
      });
    }
    for (const [key, container] of this.containers.entries()) {
      container.setAttribute('id', `container_${this.salt}_${key}`);
      container.setAttribute('role', 'tabpanel');
      container.setAttribute('aria-labelledby', `button_${this.salt}_${key}`);
    }
    this.select(keys[0]);
  }
}
const containers = document.querySelectorAll('[data-tabs]');
for (const container of containers) {
  const tabs = Tabs.create(container);
}
/******/ })()
;
//# sourceMappingURL=tabs.js.map