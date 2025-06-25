import { useEffect, useState } from "react";

const UserData = () => {
  const [users, setUsers] = useState([]); // array to store user data
  const [isLoading, setIsLoading] = useState(true); // boolean to track loading state
  const [error, setError] = useState(null); //state to store error handling message if any

  useEffect(() => {
    async function getUsersData() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        console.log(data);
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    getUsersData();
  }, []);

  return (
    <div>
      {/* Display the title of the page */}
      <h1>User Data</h1>

      {/* Display loading message if data is still being fetched */}
      {isLoading && <p>loading...</p>}

      {/* Display error message if any error occurs while fetching */}
      {error && <p>Error: {error}</p>}

      {/* if data is loaded and no error occured, display the list of users */}
      {!isLoading && !error && (
        <ul>
          {users.map(
            (
              user // json data is in an array form so this is how for loop is used in react
            ) => (
              <li key={user.id}>
                {/* react expect a unique key when these types of data are there, ex. users, list of comments, list of posts */}
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>City: {user.address.city}</p>
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
};

export default UserData;
