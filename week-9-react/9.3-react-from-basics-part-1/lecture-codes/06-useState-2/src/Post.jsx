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

export default PostComponent;
