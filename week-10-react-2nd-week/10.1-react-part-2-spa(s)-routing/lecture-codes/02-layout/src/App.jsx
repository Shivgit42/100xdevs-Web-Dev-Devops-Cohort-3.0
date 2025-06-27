import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  Outlet,
} from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
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
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function Layout() {
  return (
    <div style={{ height: "100vh" }}>
      <Header />
      <div style={{ height: "90vh", backgroundColor: "red" }}>
        <Outlet />
      </div>
      footer
    </div>
  );
}

function Header() {
  return (
    <div>
      <Link to={"/"}>Allen </Link>|{" "}
      <Link to={"/neet/online-coaching-class-11"}>Class11</Link> |{" "}
      <Link to={"/neet/online-coaching-class-12"}>Class12</Link>
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
