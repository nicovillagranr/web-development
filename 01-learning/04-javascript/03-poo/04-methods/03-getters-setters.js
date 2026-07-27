class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  get area() { return this.width * this.height; }

  set dimensions({ width, height }) {
    this.width = width;
    this.height = height;
  }
}

const rect = new Rectangle(4, 5);
rect.dimensions = { width: 8, height: 3 };
console.log('[getters-setters]', rect.area);
