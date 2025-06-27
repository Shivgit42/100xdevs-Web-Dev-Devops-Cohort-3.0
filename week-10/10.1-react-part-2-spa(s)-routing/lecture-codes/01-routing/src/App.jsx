import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Link to={"/"}>Allen </Link>|{" "}
        <Link to={"/neet/online-coaching-class-11"}>Class11</Link> |{" "}
        <Link to={"/neet/online-coaching-class-12"}>Class12</Link>
        <Routes>
          <Route
            path="/neet/online-coaching-class-11"
            element={<Class11Program />}
          />
          <Route
            path="/neet/online-coaching-class-12"
            element={<Class12Program />}
          />
          <Route path="/" element={<Landing />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function ErrorPage() {
  return <div>Sorry no page found</div>;
}

function Class11Program() {
  return <div>Class 11th content</div>;
}
function Class12Program() {
  const navigate = useNavigate();
  return (
    <div>
      Class 12th content
      <button onClick={() => navigate("/")}>Go back to landing page</button>
    </div>
  );
}
function Landing() {
  return <div>Welcome to allen!</div>;
}

export default App;
