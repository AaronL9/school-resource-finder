import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// pages
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Home from "./pages/Home";
import RootLayout from "./layout/RootLayout";
import SubmitReviewer from './pages/SubmitReviewer'
import Favorites from './pages/Favorites'
import MessageUs from './pages/MessageUs'
import Faqs from './pages/Faqs'
import Setting from "./pages/Setting";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Login />} />
      <Route path="register" element={<Registration />} />
      <Route path="student" element={<RootLayout />}>
        <Route path="home" element={<Home />} />
        <Route path="submit" element={<SubmitReviewer />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="message" element={<MessageUs />} />
        <Route path="faqs" element={<Faqs />} />
        <Route path="settings" element={<Setting />} />
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
