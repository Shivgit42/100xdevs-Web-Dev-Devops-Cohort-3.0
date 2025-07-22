class Shape {
  area = () => {
    console.log("hi there");
  };
}

class Rectangle extends Shape {
  width: number;
  height: number;

  constructor() {
    super();
    this.width = 1;
    this.height = 2;
  }
}

let r = new Rectangle();
console.log(r.area());
