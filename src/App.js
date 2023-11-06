import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Welcome from "./Pages/Welcome/Welcome";
function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact component={Welcome} />

          {/* Add more routes here */}
        </Switch>
      </Router>
    </>
  );
}

export default App;
