interface User1 {
  id: string;
  name: string;
  age: number;
  email: string;
  password: string;
}

type UpdateProps = Pick<User1, "name" | "age" | "password">;

function updateUser(updatedProps: UpdateProps) {
  return (
    "Name: " +
    updatedProps.name +
    " Age: " +
    updatedProps.age +
    " Passwords: " +
    updatedProps.password
  );
}

console.log(updateUser({ name: "shivam", age: 21, password: "123" }));
