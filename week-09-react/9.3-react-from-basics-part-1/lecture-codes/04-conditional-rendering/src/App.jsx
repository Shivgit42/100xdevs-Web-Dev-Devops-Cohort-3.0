import { useState } from "react";

function App() {
  return (
    <>
      <ToggleComponent />
      <div
        style={{
          backgroundColor: "#dfe6e9",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ display: "flex", gap: 20, flexDirection: "column" }}>
          <div>
            <PostComponent
              name={"Shivam"}
              subtitle={"20 followers"}
              time={"2m ago"}
              image={
                "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg"
              }
              description={
                "What to know how to win big? Check out how these folks won $6000 in bounties."
              }
            />
          </div>

          <div>
            <PostComponent
              name={"Harkirat"}
              subtitle={"Promoted"}
              image={
                "https://appx-wsb-gcp-mcdn.akamai.net.in/subject/2023-01-17-0.17044360120951185.jpg"
              }
              description={
                "How to get hired in 2024? I lost my Job in 2023, this is the roadmap I followed to get hired in 2024."
              }
            />
          </div>

          <div>
            <PostComponent
              name={"Doraemon"}
              subtitle={200}
              time={"18m ago"}
              image={
                "https://images.squarespace-cdn.com/content/v1/54fc8146e4b02a22841f4df7/1497832653543-F9EH524VOZ7ELRAFXIEV/Doraemon-12-1024x576.jpg"
              }
              description={
                "I have magical gadjects that can be used in any circumstances."
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}

const ToggleComponent = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div>
      <button onClick={() => setIsVisible(!isVisible)}>Toggle Message</button>
      {isVisible ? <p>hi there</p> : null}
    </div>
  );
};

function PostComponent({ name, subtitle, time, image, description }) {
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
          style={{ width: 40, height: 40, borderRadius: 40 }}
          src={image}
          alt=""
        />
        <div style={{ fontSize: 12, marginLeft: 10 }}>
          <b>{name}</b>
          <div>{subtitle}</div>
          {time !== undefined ? (
            <div style={{ display: "flex", gap: 5 }}>
              <div>{time}</div>
              <img
                style={{ width: 10, height: 10 }}
                src="https://img.freepik.com/premium-vector/clock-vector-icon_712079-433.jpg"
                alt=""
              />
            </div>
          ) : null}
        </div>
      </div>
      <div style={{ fontSize: 14 }}>{description}</div>
    </div>
  );
}

export default App;
