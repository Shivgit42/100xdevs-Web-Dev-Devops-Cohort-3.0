function App() {
  return (
    <div
      style={{
        backgroundColor: "#dfe6e9",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div>
        <PostComponent />
        <br />
        <PostComponent />
        <br />
        <PostComponent />
      </div>
    </div>
  );
}

function PostComponent() {
  return (
    <div
      style={{
        width: 250,
        backgroundColor: "white",
        borderRadius: 10,
        borderColor: "gray",
        borderWidth: 1,
        padding: 20,
      }}
    >
      <div style={{ display: "flex" }}>
        <img
          style={{ width: 30, height: 30, borderRadius: 20 }}
          src="https://appx-wsb-gcp-mcdn.akamai.net.in/subject/2023-01-17-0.17044360120951185.jpg"
          alt=""
        />
        <div style={{ fontSize: 10, marginLeft: 10 }}>
          <b>100xdevs</b>

          <div>23,888 followers</div>
          <div>12m</div>
        </div>
      </div>
      <div style={{ fontSize: 14 }}>
        What to know how to win big? Check out how these folks won $6000 in
        bounties.
      </div>
    </div>
  );
}

export default App;
