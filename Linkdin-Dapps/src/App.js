import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import Test from "./components/Test";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/home">
             <Header />
            <Home />
          </Route>
          <Route path="/my-network">
             <Header />
             <Test />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
