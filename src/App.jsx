import React from "react";
import Registration from "./Components/Pages/Registration";
import { createBrowserRouter, RouterProvider } from "react-router";
import Login from "./Components/Pages/Login";
import Home from "./Components/Pages/Home";
import Test from "./Components/Pages/Test";
import { store } from "./store";
import { Provider } from "react-redux";
import Messages from "./Components/Pages/Message";
import Settings from "./Components/Pages/Settings";
import { Toaster, toast } from "sonner";
import MsgRemovePopup from "./Components/Popup/MsgRemovePopup";

const router = createBrowserRouter([
  {
    path: "/registration",
    element: <Registration />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/test",
    element: <Test />,
  },
  {
    path: "/messages",
    element: <Messages />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
  {
    path: "/MsgRemovePopup",
    element: <MsgRemovePopup />,
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
