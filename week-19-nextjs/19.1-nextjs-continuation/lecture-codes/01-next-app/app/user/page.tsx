import axios from "axios";

export default async function User() {
  const response = await axios.get(
    "https://week-13-offline.kirattechnologies.workers.dev/api/v1/user/details"
  );

  await new Promise((resolve) => setTimeout(resolve, 3000));
  const data = response.data;

  return (
    <div className="flex flex-col min-h-screen justify-center">
      <div className="flex justify-center">
        <div className="border rounded-sm p-6">
          <div>Name: {data.name}</div>
          <div>Email: {data.email}</div>
        </div>
      </div>
    </div>
  );
}
