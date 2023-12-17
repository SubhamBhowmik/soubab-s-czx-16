import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Welcome from "./Pages/Welcome/Welcome";
import OtpVerfication from "./Components/OtpVerfication";
import PhoneAuth from "./Components/PhoneAuth";
import ProfileDrawer from "./Components/ProfileDrawer";
import MyProfilePage from "./Components/MyProfilePage";
import Tour from "./Pages/Tour";
function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact component={Welcome} />
          <Route path="/otp-verification" exact component={OtpVerfication} />
          {/* <Route path="/demo" exact component={ProfileDrawer} /> */}
          <Route path="/profile" component={ProfileDrawer} />
          <Route path="/tour" component={Tour} />

          {/* Add more routes here */}
        </Switch>
      </Router>
    </>
  );
}

export default App;
