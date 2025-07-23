type User3 = {
  name: string;
  age: number;
};

const user3: Readonly<User3> = {
  name: "shivam",
  age: 21,
};

// user3.name = 21;

//use case

interface Config {
  endpoint: string;
  apiKey: string;
}

const config: Readonly<Config> = {
  endpoint: "https://api.example.com",
  apiKey: "abcdef123456",
};

// config.apiKey = 'newkey'; // Error: Cannot assign to 'apiKey' because it is a read-only property.
