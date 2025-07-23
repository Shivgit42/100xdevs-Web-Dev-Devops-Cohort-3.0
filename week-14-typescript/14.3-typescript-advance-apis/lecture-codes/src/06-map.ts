//? This is a javascript concept

// another way to write or create objects

type User5 = {
  id: string;
  username: string;
};

const users1 = new Map<string, User5>();

users1.set("asa@12", { id: "asa@12", username: "ashok" });
users1.set("msd@12", { id: "msd@12", username: "monik" });

const user = users1.get("asa@12");
