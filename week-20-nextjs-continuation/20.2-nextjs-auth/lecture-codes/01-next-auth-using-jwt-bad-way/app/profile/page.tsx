import axios from "axios";

export default async function Profile() {
  const res = await axios.get("http://localhost:3000/api/profile", {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });

  const profilePicture = res.data.avatarUrl;

  return <div>{profilePicture}</div>;
}
