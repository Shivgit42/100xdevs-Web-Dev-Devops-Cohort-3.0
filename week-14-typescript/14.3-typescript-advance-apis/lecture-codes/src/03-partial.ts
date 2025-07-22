interface User2 {
  id: string;
  name: string;
  age: number;
  email: string;
  password: string;
}

type userProfile = Pick<User1, "name" | "age" | "password">;

type updateProfileOptional = Partial<userProfile>;

function updateUser1(updatedProps: userProfile) {
  return (
    "Name: " +
    updatedProps.name +
    " Age: " +
    updatedProps.age +
    " Passwords: " +
    updatedProps.password
  );
}

console.log(updateUser1({ name: "shivam", age: 21, password: "123" }));
