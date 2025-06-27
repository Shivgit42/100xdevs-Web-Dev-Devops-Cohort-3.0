const ProfileCardComponent = () => {
  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: 20,
        borderColor: "gray",
        padding: 20,
        borderWidth: 1,
        margin: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          margin: 0,
        }}
      >
        <img
          style={{ width: 60, height: 60, borderRadius: 20, marginBottom: 10 }}
          src="https://appx-wsb-gcp-mcdn.akamai.net.in/subject/2023-01-17-0.17044360120951185.jpg"
          alt=""
        />

        <b>Harkirat Singh</b>
        <span>Working with WebRTC</span>
      </div>
      <div
        style={{
          marginTop: 25,
          fontSize: 15,
        }}
      >
        <p style={{ display: "flex", justifyContent: "space-between" }}>
          <span>Profile viewers</span>
          <span style={{ color: "blue" }}>41,903</span>
        </p>
        <p style={{ display: "flex", justifyContent: "space-between" }}>
          <span>Post impressions</span>
          <span style={{ color: "blue" }}>1,313</span>
        </p>
      </div>
    </div>
  );
};

export default ProfileCardComponent;
