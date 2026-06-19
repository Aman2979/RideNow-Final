import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Userlogin from "./pages/Userlogin.jsx";
import Captainlogin from "./pages/Captainlogin.jsx";
import UserSignup from "./pages/UserSignup.jsx";
import "./App.css";
import UserProvider from "./Context/UserContext.jsx"; // Import the provider
import CaptainSignup from "./pages/CaptainSignup.jsx";
import Start from "./pages/Start.jsx";
import UserLogout from "./pages/Userlogout.jsx";
import UserProtectWrapper from "./pages/UserProtectWrapper.jsx";
import CaptainProtectWrapper from "./pages/CaptainProtectWrapper.jsx";
import CaptainDataProvider from "./Context/CaptainContex";
import CaptionHome from "./pages/CaptionHome.jsx";
import Captionlogout from "./pages/Captionlogout.jsx";
import Riding from "./pages/Riding.jsx"
import CaptainRiding from "./pages/CaptainRiding.jsx";
import SocketProvider from "./Context/SocketContext.jsx";
import { useNavigate } from "react-router-dom";
import PaymentSuccess from "./pay/PaymentSuccess.jsx";
import PaymentCancel from "./pay/PaymentCancel.jsx"
import FeedbackForm from "./feedback/Feedbackform.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/start" />,
  },
  {
    path: "/success",
    element: <PaymentSuccess />,
  },
  {
    path: "/cancel",
    element: <PaymentCancel />,
  },
  {
    path:"/feedback",
    element:<FeedbackForm />
  },
  {
    path: "/start",
    element: <Start />,
  },
  {
    path: "/userlogin",
    element: (
      <UserProvider>
        {" "}
        <Userlogin />
      </UserProvider>
    ),
  },
  {
    path: "/riding",
    element: <Riding />,
  },

  {
    path: "/usersignup",
    element: (
      <UserProvider>
        <UserSignup />{" "}
      </UserProvider>
    ),
  },
  {
    path: "/captainlogin",
    element: (
      <CaptainDataProvider>
        <Captainlogin />
      </CaptainDataProvider>
    ),
  },

  {
    path: "/captainriding",
    element: (
      <CaptainDataProvider>
        <CaptainRiding />
      </CaptainDataProvider>
    ),
  },

  {
    path: "/captainhome",
    element: (
      <CaptainDataProvider>
        <CaptainProtectWrapper>
          <CaptionHome />
        </CaptainProtectWrapper>
      </CaptainDataProvider>
    ),
  },
  {
    path: "/captainsignup",
    element: (
      <CaptainDataProvider>
        <CaptainSignup />
      </CaptainDataProvider>
    ),
  },
  {
    path: "/captainlogout",
    element: <Captionlogout />,
  },
  {
    path: "/userlogout",
    element: (
      <UserProvider>
        <UserLogout />
      </UserProvider>
    ),
  },

  {
    path: "/Home",
    element: (
      <UserProvider>
        <UserProtectWrapper>
          <Home />
        </UserProtectWrapper>
      </UserProvider>
    ), // Correct use of wrapping component for protection
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SocketProvider>
      <RouterProvider router={router} />
    </SocketProvider>
  </StrictMode>,
);
