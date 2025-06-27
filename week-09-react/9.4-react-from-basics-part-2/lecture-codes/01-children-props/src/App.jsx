function App() {
  return (
    <div style={{ display: "flex" }}>
      <Card>
        <div>hi there</div>
      </Card>
      <Card>
        <div style={{ color: "green" }}>
          {" "}
          What do you want to post
          <input type="text" />{" "}
        </div>
      </Card>
    </div>
  );
}

function Card({ children }) {
  return (
    <div
      style={{
        background: "black",
        borderRadius: 10,
        color: "white",
        padding: 10,
        margin: 10,
      }}
    >
      Topbar
      {children}
      Bottom footer
    </div>
  );
}

export default App;

//* Alternative code with different Card usage pattern:

// function App() {
//     return (
//         <div style={{ display: "flex" }}>
//             {/* Render Card with inline content passed as innerContent prop */}
//             <Card
//                 innerContent={
//                     <div style={{ color: "green" }}>
//                         What do you want to post
//                         <br />
//                         <br />
//                         <input type="text" />
//                     </div>
//                 }
//             />

//             {/* Render Card with a string passed as innerContent */}
//             <Card innerContent="Hi there" />
//         </div>
//     );
// }

//? Define the Card component that receives innerContent prop and renders it inside the styled div
// function Card({ innerContent }) {
//     return (
//         <div
//             style={{
//                 background: "black",
//                 color: "white",
//                 borderRadius: 10,
//                 padding: "10px",
//                 margin: "10px",
//                 boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)",
//             }}
//         >
//             {innerContent}
//         </div>
//     );
// }

// export default App;
//
