import React from "react";
import Registration from "./Components/Pages/Registration";
import { createBrowserRouter, RouterProvider } from "react-router";
import Login from "./Components/Pages/Login";
import Home from "./Components/Pages/Home";
import Test from "./Components/Pages/Test";
import store from "./store";
import { Provider } from "react-redux";

const router = createBrowserRouter([
  {
    path: "/registration",
    element: <Registration />,
  },
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/Home",
    element: <Home />,
  },
  {
    path: "/test",
    element: <Test />,
  },
]);

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;
