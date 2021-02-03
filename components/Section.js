export default class Section {
  constructor({ data, renderer }, containerSelector) {
    this._items = data;
    this._renderer = renderer;
    
    this._container = document.querySelector(containerSelector);
  }
  
  renderItems() {
    this._items.forEach((item) => {
      this._container.append(this._renderer(item));
    });
  }
  
  addItem(item) {
    this._container.prepend(this._renderer(item));
  }
}

