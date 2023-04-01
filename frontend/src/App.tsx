import styles from "./App.module.css";

// Components
import Root from "./components/layout/Root";

// Pages
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Profile from "./pages/Profile/Profile";
import EditProfile from "./pages/EditProfile/EditProfile";
import CreatePost from "./pages/Post/CreatePost";
import EditPost from "./pages/Post/EditPost";

import { 
  createBrowserRouter, 
  createRoutesFromElements, 
  RouterProvider, 
  Route,
  Navigate
} from "react-router-dom";

// Hooks
import { useAuth } from "./hooks/useAuth";

function App() {
  const { auth } = useAuth();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index path="/" element={<Home />} />
        <Route path="/post" element={auth ? <CreatePost /> : <Navigate to="/login" />} />
        <Route path="/post/:id/edit" element={auth ? <EditPost /> : <Navigate to="/login" />} />
        <Route path="/users/" element={auth ? <EditProfile /> : <Navigate to="/" />} />
        <Route path="/users/:id" element={auth ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/login" element={!auth ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!auth ? <Register /> : <Navigate to="/" />} />
      </Route>
    )
  );

  return (
    <div className={styles.app}>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
