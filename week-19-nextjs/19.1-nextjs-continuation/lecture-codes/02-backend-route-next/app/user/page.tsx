import axios from "axios";

export default async function User() {
  const response = await axios.get("http://localhost:3000/api/v1/user/details");

  const data = response.data;

  return (
    <div className="flex flex-col min-h-screen justify-center">
      <div className="flex justify-center">
        <div className="border rounded-sm p-6">
          <div>Name: {data.username}</div>
          <div>Email: {data.email}</div>
        </div>
      </div>
    </div>
  );
}
