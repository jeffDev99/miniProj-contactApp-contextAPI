// main layout
import Contact from "./Components/Contact/Contact";
import NotFound from "./Pages/NotFound/NotFound"
import Home from "./Layout/Home/Home";
const routes = [
  {
    path: "/",
    element: <Home />,
    children: [
      { path: "", element: <Contact /> },
      { path: "/contact", element: <Contact /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  { path: "*", element: <NotFound /> }
];
export default routes;
