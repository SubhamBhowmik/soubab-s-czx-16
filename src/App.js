import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Welcome from "./Pages/Welcome/Welcome";
import OtpVerfication from "./Components/OtpVerfication";
function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact component={Welcome} />
          <Route path="/otp-verification" exact component={OtpVerfication} />

          {/* Add more routes here */}
        </Switch>
      </Router>
    </>
  );
}

export default App;
