import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// pages
import Welcome from "./pages/Welcome";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Home from "./pages/Home";
import RootLayout from "./layout/RootLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Welcome />}></Route>
      <Route path="register" element={<Registration />} />
      <Route path="login" element={<Login />} />
      <Route path="student" element={<RootLayout />}>
        <Route path="home" element={<Home />} />
      </Route>
    </>
  )
);

function App() {
  const styledPath = ["/", "/register", "/login"];
  const path = location.pathname;
  console.log(path);
  if (!styledPath.includes(path)) {
    document.body.style.background = "white";
  }
  return <RouterProvider router={router} />;
}

export default App;
