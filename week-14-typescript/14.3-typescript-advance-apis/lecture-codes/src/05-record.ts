type User4 = {
  id: string;
  username: string;
};

type Users = Record<string, User4>;

const users: Users = {
  "asa@12": {
    id: "asa@12",
    username: "ashok",
  },
  "msd@12": {
    id: "msd@12",
    username: "monik",
  },
};

console.log(users["asa@12"]);
