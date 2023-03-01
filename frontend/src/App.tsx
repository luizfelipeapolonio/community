import styles from "./App.module.css";

// Components
import Root from "./components/layout/Root";

// Pages
import Home from "./pages/Home/Home";

import { 
  createBrowserRouter, 
  createRoutesFromElements, 
  RouterProvider, 
  Route 
} from "react-router-dom";

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index path="/" element={<Home />} />
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
