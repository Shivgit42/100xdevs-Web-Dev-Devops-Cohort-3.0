interface People1 {
  name: string;
  age: number;
  // greet: () => string;
}

class Manager implements People1 {
  constructor(public name: string, public age: number) {
    this.name = name;
    this.age = age;
  }
}

let user1 = new Manager("shivam", 21);
console.log(user1.name);
