import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  useRoutes,
} from "react-router-dom";
import SignIn from './SignIn';
import CreateAccount from './CreateAccount';
import ContactUs from './ContactUs';
import Home from './Home.js';
import CalendarPage1 from './CalendarPage1.js';
import CalendarPage2 from './CalendarPage2.js';
import MakeSession from './MakeSession';
import ShowSessions from './ShowSessions';
import ShowMySessions from './ShowMySessions';
import GDPR from './GDPR';
import Landing from './Landing';
import AddFriends from './AddFriends';
import UserSettings from './UserSettings';

const App = () => {
  let routes = useRoutes([
    { path: "/", element: <Landing /> },
    { path: "/sign-in", element: <SignIn /> },
    { path: "/privacy-policy", element: <GDPR /> },
    { path: "/create-account", element: <CreateAccount /> },
    { path: "/home", element: <Home /> },
    { path: "/contact-us", element: <ContactUs /> },
    { path: "/create-session", element: <MakeSession /> },
    { path: "/look-by-date", element: <CalendarPage1 /> },
    { path: "/look-by-time", element: <CalendarPage2 /> },
    { path: "/show-sessions", element: <ShowSessions />},
    { path: "/show-my-sessions", element: <ShowMySessions />},
    { path: "/settings", element: <UserSettings />},
    { path: "/add-friends", element: <AddFriends />},
  ]);
  return routes;
};

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;