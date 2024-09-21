import { Navigate } from "react-router-dom";
// main layout
import Contact from "./Components/Contact/Contact";
import AddContact from "./Components/AddContact/AddContact";
import EditContact from "./Components/EditContact/EditContact";
import NotFound from "./Pages/NotFound/NotFound";
import Home from "./Layout/Home/Home";
const routes = [
  {
    path: "/",
    element: <Home />,
    children: [
      { path: "", element: <Navigate to="/contact" replace={true} /> },
      { path: "/contact", element: <Contact /> },
      { path: "/addcontact", element: <AddContact /> },
      { path: "/editcontact", element: <EditContact /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  { path: "*", element: <NotFound /> },
];
export default routes;
